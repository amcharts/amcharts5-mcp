// ---------------------------------------------------------------------------
// Tool + resource registration — shared by the stdio server and the Worker.
//
// registerTools(server, content) attaches every amCharts 5 tool and resource to
// an McpServer instance. `content` is the { docs, extendedDocs, examples } shape
// produced by buildContent(). No filesystem / transport assumptions live here.
// ---------------------------------------------------------------------------

import { z } from "zod";
import { CHART_TYPE_MAP, extractImportBlock, lineMatchesQuery, rankContent, searchDocs } from "./content.js";
import { listGeodata } from "./geodata.js";

// Every tool only reads the bundled content (skill, docs, examples, reference,
// geodata index): no writes, no network, no side effects, same answer for the
// same input. Directories (Claude Connectors, OpenAI) check these hints.
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

// Appended to ES-module quick starts: in a framework app the chart code goes
// into the framework package's setup function, which gets the root.
const FRAMEWORK_NOTE = `

## In a React, Vue, Angular, Svelte or React Native app
Use amCharts' package for the framework: \`@amcharts/amcharts5-react\`, \`-vue\`, \`-angular\` or \`-svelte\`. It creates and disposes the root, and works with server rendering. Its setup function receives \`root\`, so put the code above that follows \`am5.Root.new(...)\` inside it, e.g. in React \`const { ref, result } = useAmChart((root) => { /* the chart */ return { series }; }, []);\` with \`<div ref={ref} style={{ height: "500px" }} />\`. Deps such as \`[data]\` make the chart again from scratch; to change data in place, return what you need and update it through \`result\`. \`@amcharts/amcharts5-react-native\` takes the chart code as a string instead. Details: \`get_section("SKILL", "Frameworks")\`, and \`get_doc("getting-started/integrations/react")\` (also \`vue\`, \`angular\`, \`sveltekit\`, \`next-js\`, \`nuxt\`, \`react-native\`).`;

// User text echoed back in a reply, capped so a huge query can't balloon it
const echo = (s) => { s = String(s ?? ""); return s.length > 200 ? s.slice(0, 200) + "…" : s; };

// Searches about map files get pointed at list_geodata, which has every name.
const GEODATA_QUERY_RE = /geo ?data|congressional|am5geodata|\b(?:low|high)\.js\b/i;
const GEODATA_HINT = "\n\n> Looking for a map file? list_geodata(filter) lists every geodata file (world, countries, regions, US congressional packs per Congress) with its CDN path, global name and ES import.";
const geodataHint = (query) => (GEODATA_QUERY_RE.test(query) ? GEODATA_HINT : "");

export function registerTools(server, content) {
  const { docs, extendedDocs, examples } = content;

  // Resolve any identifier a search result prints — "skill/SKILL.md",
  // "skill/xy", "SKILL", "xy.md", "extended/charts/xy-chart/cursor",
  // "charts/xy-chart/cursor", "reference/xycursor" — to a doc. Search results
  // label their source exactly this way, so an agent can paste the label
  // straight into get_section / get_doc.
  function resolveDoc(id) {
    let key = String(id || "").trim().replace(/^\/+|\/+$/g, "").replace(/\.md$/i, "");
    if (!key) return null;
    let skillKey = key.startsWith("skill/") ? key.slice("skill/".length) : key;
    if (docs.has(skillKey)) return { doc: docs.get(skillKey), label: `skill/${skillKey}` };
    const extKey = key.startsWith("extended/") ? key.slice("extended/".length) : key;
    if (extendedDocs.has(extKey)) return { doc: extendedDocs.get(extKey), label: `extended/${extKey}` };
    // Case-insensitive skill fallback ("skill" → "SKILL", "Xy" → "xy").
    const lower = skillKey.toLowerCase();
    for (const [name, doc] of docs) {
      if (name.toLowerCase() === lower) return { doc, label: `skill/${name}` };
    }
    return null;
  }

  // --- Tool: list_chart_types ---
  server.registerTool(
    "list_chart_types",
    {
      title: "List chart types",
      description: "List all amCharts 5 chart types with their categories and reference file names",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    async () => {
      const types = {};
      for (const [alias, ref] of Object.entries(CHART_TYPE_MAP)) {
        if (!types[ref]) types[ref] = [];
        types[ref].push(alias);
      }

      let text = "# amCharts 5 — Available Chart Types\n\n";
      for (const [ref, aliases] of Object.entries(types)) {
        const doc = docs.get(ref);
        const title = doc ? doc.title : ref;
        text += `## ${title}\n`;
        text += `Reference: \`${ref}\`\n`;
        text += `Keywords: ${aliases.join(", ")}\n\n`;
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_chart_reference ---
  server.registerTool(
    "get_chart_reference",
    {
      title: "Get chart reference",
      description: "Get the full reference documentation for a specific amCharts 5 chart type. Use list_chart_types first to see available types.",
      inputSchema: { chartType: z.string().describe("Chart type keyword, e.g. 'pie', 'sankey', 'xy', 'treemap', 'map', 'radar', 'stock', 'gantt', 'venn', 'wordcloud', 'timeline', 'flow', 'hierarchy', 'ui-elements'") },
      annotations: READ_ONLY,
    },
    async ({ chartType }) => {
      const key = CHART_TYPE_MAP[chartType.toLowerCase()] || chartType.toLowerCase();
      const doc = docs.get(key);
      if (!doc) {
        const available = [...new Set(Object.values(CHART_TYPE_MAP))].sort().join(", ");
        return {
          content: [{ type: "text", text: `No reference found for "${echo(chartType)}". Available: ${available}` }],
        };
      }
      return { content: [{ type: "text", text: doc.content }] };
    }
  );

  // --- Tool: get_core_reference ---
  server.registerTool(
    "get_core_reference",
    {
      title: "Get core reference (setup, themes, pitfalls)",
      description: "Get the core amCharts 5 reference (SKILL.md) — covers setup, colors, themes, legends, tooltips, events, data, adapters, disposal, and common pitfalls. Read this first before any chart-specific reference.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    async () => {
      const doc = docs.get("SKILL");
      if (!doc) {
        return { content: [{ type: "text", text: "Core SKILL.md not found." }] };
      }
      return { content: [{ type: "text", text: doc.content }] };
    }
  );

  // --- Tool: search_docs ---
  server.registerTool(
    "search_docs",
    {
      title: "Search docs",
      description: "Search the curated amCharts 5 skill docs (SKILL.md + chart references) for a keyword or topic, returning matching sections ranked by relevance. NOTE: by default this scans ONLY the skill layer. The per-class API reference and per-setting DEFAULTS (e.g. tooltip background cornerRadius, axis tick `visible` default, cursor line strokeDasharray) live in the extended docs — pass scope:'all' here (which also searches the code examples), or use search_all / get_api_reference / get_doc, to reach them.",
      inputSchema: {
        query: z.string().describe("Search query, e.g. 'legend', 'axis label rotation', 'tooltip format', 'data processor'"),
        maxResults: z.number().optional().default(5).describe("Maximum number of results to return (default 5)"),
        scope: z.enum(["skill", "all"]).optional().default("skill").describe("'skill' (default) searches only the curated skill docs; 'all' also searches the extended docs / per-class API reference where settings and defaults live, and the code examples."),
      },
      annotations: READ_ONLY,
    },
    async ({ query, maxResults, scope }) => {
      const results = searchDocs(content, query, maxResults, scope);
      if (results.length === 0) {
        const hint = scope === "skill"
          ? ` Nothing in the skill docs — retry with scope:'all' to include the API reference, or use search_all.`
          : "";
        return { content: [{ type: "text", text: `No results found for "${echo(query)}".${hint}${geodataHint(query)}` }] };
      }

      // Per-result excerpt budget. When only one or two sections match, the
      // whole point is to read them — grow the budget instead of cutting the
      // answer off.
      const budget = results.length <= 2 ? 6000 : 2000;

      let text = `# Search results for "${echo(query)}" (scope: ${scope})\n\n`;
      for (const r of results) {
        // Examples aren't sections of a doc: label them by their example path
        // and point at get_example for the full code.
        const isExample = r.kind === "example";
        const id = isExample ? r.file : `${r.kind}/${r.file}`;
        text += isExample ? `## [example] ${r.docTitle}\n` : `## ${r.docTitle} → ${r.heading}\n`;
        text += `*(source: ${id}.md, relevance: ${r.score})*\n\n`;
        let body = r.body;
        if (body.length > budget) {
          // The excerpt is a fixed-size head, so the line that matched the
          // query may lie past the cut. Quote the matching lines beyond the
          // head so the answer is never lost, and print the exact call that
          // returns the full section.
          const head = body.slice(0, budget);
          const beyond = [];
          let offset = 0;
          for (const line of body.split("\n")) {
            const start = offset;
            offset += line.length + 1;
            if (start < budget) continue;
            if (lineMatchesQuery(line, query)) beyond.push(line.trim().slice(0, 400));
            if (beyond.length >= 8) break;
          }
          body = head + (isExample
            ? `\n\n...(truncated — full example: get_example(path: "${r.file}"))`
            : `\n\n...(truncated — full section: get_section(file: "${id}", heading: "${r.heading}"))`);
          if (beyond.length) {
            body += `\n\nMatching lines beyond the excerpt:\n` + beyond.map(l => `> ${l}`).join("\n");
          }
        }
        text += body + "\n\n---\n\n";
      }
      return { content: [{ type: "text", text: text + geodataHint(query) }] };
    }
  );

  // --- Tool: get_section ---
  server.registerTool(
    "get_section",
    {
      title: "Get doc section",
      description: "Get the FULL text of one section of a doc by heading — use it to expand a truncated search_docs / search_all result. `file` accepts the source label exactly as search results print it ('skill/SKILL.md', 'skill/xy', 'extended/charts/xy-chart/cursor', 'reference/xycursor') as well as a bare skill file name ('SKILL', 'xy', 'map').",
      inputSchema: {
        file: z.string().describe("Doc identifier: a skill file ('SKILL', 'xy', 'pie', 'map') or a source label from search results ('skill/SKILL.md', 'extended/concepts/events', 'reference/xycursor'). '.md' and 'skill/' / 'extended/' prefixes are optional."),
        heading: z.string().describe("Section heading to retrieve (case-insensitive substring), e.g. 'Core setup pattern', 'Axis types', 'Common pitfalls', 'Recent API changes'"),
      },
      annotations: READ_ONLY,
    },
    async ({ file, heading }) => {
      const resolved = resolveDoc(file);
      if (!resolved) {
        const skillFiles = [...docs.keys()].map(k => `skill/${k}`).join(", ");
        return { content: [{ type: "text", text: `File "${file}" not found.\n\nSkill files: ${skillFiles}\n\nExtended docs use their path, e.g. 'charts/xy-chart/cursor', 'concepts/events', 'reference/xycursor' (with or without an 'extended/' prefix). Use search_docs / search_all to find one.` }] };
      }
      const { doc, label } = resolved;

      const needle = heading.toLowerCase();
      const section = doc.sections.find(s => s.heading.toLowerCase().includes(needle));
      if (!section) {
        const available = doc.sections.map(s => s.heading).filter(Boolean).join("\n- ");
        return {
          content: [{ type: "text", text: `Section "${heading}" not found in ${label}.md.\n\nAvailable sections:\n- ${available}` }],
        };
      }
      return {
        content: [{ type: "text", text: `# ${section.heading}\n*(source: ${label}.md)*\n\n${section.body}` }],
      };
    }
  );

  // --- Tool: get_quick_start ---
  server.registerTool(
    "get_quick_start",
    {
      title: "Get quick-start template",
      description: "Get a quick-start template for a specific chart type — a minimal working example ready to customize.",
      inputSchema: {
        chartType: z.string().describe("Chart type, e.g. 'pie', 'line', 'bar', 'map', 'sankey', 'treemap'"),
        format: z.enum(["html", "esm"]).optional().default("html").describe("Output format: 'html' for a full HTML page with CDN scripts, 'esm' for ES module imports"),
      },
      annotations: READ_ONLY,
    },
    async ({ chartType, format }) => {
      const key = CHART_TYPE_MAP[chartType.toLowerCase()] || chartType.toLowerCase();
      const doc = docs.get(key);
      if (!doc) {
        return {
          content: [{ type: "text", text: `No reference found for "${echo(chartType)}". Use list_chart_types to see available types.` }],
        };
      }

      // Grab the imports section first so we can exclude it from the setup match.
      const importSection = doc.sections.find(s =>
        /import/i.test(s.heading)
      );

      // Find the setup/core pattern section — must NOT be the imports section
      // (headings like "Required imports" otherwise win and the actual core
      // setup pattern is never shown, making esm/html identical).
      const setupSection = doc.sections.find(s =>
        s !== importSection && /setup|core.*pattern|basic|quick.*start/i.test(s.heading)
      );

      if (!setupSection) {
        // Fallback: return first few sections
        const intro = doc.sections.slice(0, 4).map(s => `## ${s.heading}\n${s.body}`).join("\n\n");
        return { content: [{ type: "text", text: intro + (format === "esm" ? FRAMEWORK_NOTE : "") }] };
      }

      let text = `# Quick Start: ${doc.title}\n\n`;
      if (importSection && importSection !== setupSection) {
        // Import sections contain both an "ES modules" and a "CDN / script tags"
        // sub-block. Emit only the one matching the requested format so esm and
        // html actually differ (instead of relabeling the same body).
        const esm = extractImportBlock(importSection.body, "esm");
        const cdn = extractImportBlock(importSection.body, "html");
        if (format === "esm") {
          text += `## Imports (ES modules)\n${esm || importSection.body}\n\n`;
        } else {
          text += `## Imports (CDN / script tags)\n${cdn || importSection.body}\n\n`;
        }
      }
      text += `## ${setupSection.heading}\n${setupSection.body}`;
      if (format === "esm") text += FRAMEWORK_NOTE;

      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: search_all ---
  server.registerTool(
    "search_all",
    {
      title: "Search all content",
      description: "Search across ALL amCharts 5 content: skill references, full documentation, and code examples. Use this for broad searches across everything.",
      inputSchema: {
        query: z.string().describe("Search query, e.g. 'react integration', 'date axis formatting', 'stacked bar example'"),
        maxResults: z.number().optional().default(10).describe("Maximum results (default 10)"),
      },
      annotations: READ_ONLY,
    },
    async ({ query, maxResults }) => {
      const { total, results } = rankContent(content, query, { maxResults });
      if (results.length === 0) {
        return { content: [{ type: "text", text: `No results found for "${echo(query)}".${geodataHint(query)}` }] };
      }

      const TYPE_LABEL = { skill: "skill", extended: "docs", example: "example" };
      let text = `# Search results for "${echo(query)}" (${total} total, showing ${results.length})\n\n`;
      for (const r of results) {
        const source = r.kind === "skill" ? `skill/${r.file}` : r.file;
        text += `## [${TYPE_LABEL[r.kind]}] ${r.docTitle}${r.heading ? ` → ${r.heading}` : ""}\n`;
        text += `*Source: ${source} | Relevance: ${r.score}*\n\n`;
        text += r.body.slice(0, 300) + "\n\n---\n\n";
      }
      return { content: [{ type: "text", text: text + geodataHint(query) }] };
    }
  );

  // --- Tool: get_doc ---
  server.registerTool(
    "get_doc",
    {
      title: "Get doc page",
      description: "Get a full documentation page — an extended doc by path, or a skill file by 'skill/<name>'. Accepts the source label exactly as search_docs / search_all print it. Use search_all first to find the right path.",
      inputSchema: {
        path: z.string().describe("Doc path, e.g. 'charts/xy-chart/cursor', 'concepts/events', 'getting-started/integrations/react', 'reference/xycursor' (per-class API), or a skill file such as 'skill/SKILL.md' / 'skill/xy'. For a class's full settings + defaults prefer get_api_reference."),
      },
      annotations: READ_ONLY,
    },
    async ({ path: docPath }) => {
      const key = String(docPath || "").replace(/^\/|\/$/g, "").replace(/\.md$/, "");
      // Extended docs take precedence for bare paths; 'skill/…' always means the skill layer.
      const resolved = key.startsWith("skill/")
        ? resolveDoc(key)
        : (extendedDocs.has(key) ? { doc: extendedDocs.get(key), label: `extended/${key}` } : resolveDoc(key));
      if (!resolved) {
        // List available top-level paths
        const paths = [...extendedDocs.keys()];
        const topLevel = [...new Set(paths.map(p => p.split("/")[0]))].sort();
        return {
          content: [{ type: "text", text: `Doc "${key}" not found.\n\nAvailable top-level sections: skill, ${topLevel.join(", ")}\n\nSkill files: ${[...docs.keys()].map(k => `skill/${k}`).join(", ")}\n\nUse search_all to find the right path.` }],
        };
      }
      const { doc, label } = resolved;
      return { content: [{ type: "text", text: `# ${doc.title}\n*(source: ${label}.md)*\n\n${doc.content}` }] };
    }
  );

  // --- Tool: get_api_reference ---
  server.registerTool(
    "get_api_reference",
    {
      title: "Get API reference",
      description: "Get the per-class API reference for an amCharts 5 class — the class page PLUS its settings table (with DEFAULTS) and, optionally, its private/read-only settings. This is the authoritative source for exact setting names and default values (e.g. tooltip background cornerRadius, axis tick `visible` default). Pass a class name in any casing, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'AxisRendererX'.",
      inputSchema: {
        className: z.string().describe("amCharts 5 class name, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'ColumnSeries', 'AxisRendererX'. Casing/punctuation are ignored."),
        includePrivate: z.boolean().optional().default(false).describe("Also include the private (read-only / internal) settings table. Default false."),
      },
      annotations: READ_ONLY,
    },
    async ({ className, includePrivate }) => {
      // Normalize: "XYCursor" / "xy-cursor" / "XY Cursor" → "xycursor"
      const norm = className.toLowerCase().replace(/[^a-z0-9]/g, "");
      const classDoc = extendedDocs.get(`reference/${norm}`);
      const settingsDoc = extendedDocs.get(`reference/i${norm}settings`);
      const privateDoc = extendedDocs.get(`reference/i${norm}private`);

      if (!classDoc && !settingsDoc) {
        // Friendly not-found: suggest close matches among the class pages
        // (reference keys that are NOT i…settings / i…private interface pages).
        const classKeys = [...extendedDocs.keys()]
          .filter(k => k.startsWith("reference/"))
          .map(k => k.slice("reference/".length))
          .filter(k => !k.startsWith("i"));
        const suggestions = classKeys
          .filter(k => k.includes(norm) || norm.includes(k))
          .slice(0, 10);
        let msg = `No API reference found for "${echo(className)}" (normalized "${norm}").`;
        if (suggestions.length) {
          msg += `\n\nDid you mean: ${suggestions.join(", ")}?`;
        }
        msg += `\n\nTip: use search_all to find the right class, or list_chart_types for chart families.`;
        return { content: [{ type: "text", text: msg }] };
      }

      let text = "";
      if (classDoc) {
        text += `# ${classDoc.title}\n\n${classDoc.content}\n\n`;
      }
      if (settingsDoc) {
        text += `\n---\n\n# ${settingsDoc.title} (settings + defaults)\n\n${settingsDoc.content}\n\n`;
      }
      if (includePrivate && privateDoc) {
        text += `\n---\n\n# ${privateDoc.title} (private / read-only)\n\n${privateDoc.content}\n\n`;
      }
      if (!includePrivate && privateDoc) {
        text += `\n---\n\n*Private/read-only settings also exist — call get_api_reference("${echo(className)}", includePrivate: true) to include them.*\n`;
      }
      return { content: [{ type: "text", text: text.trim() }] };
    }
  );

  // --- Tool: list_examples ---
  server.registerTool(
    "list_examples",
    {
      title: "List examples",
      description: "List all available amCharts 5 code examples, optionally filtered by category.",
      inputSchema: {
        category: z.string().optional().describe("Filter by category, e.g. 'column-bar', 'line-area', 'pie-donut', 'maps', 'flow', 'hierarchy', 'stock', 'gantt', 'gauges', 'radar-polar', 'timeline', 'funnel-pyramid'. Omit to list all categories."),
      },
      annotations: READ_ONLY,
    },
    async ({ category }) => {
      if (!category) {
        // List categories with counts
        const cats = {};
        for (const [, ex] of examples) {
          cats[ex.category] = (cats[ex.category] || 0) + 1;
        }
        let text = "# amCharts 5 — Example Categories\n\n";
        for (const [cat, count] of Object.entries(cats).sort((a, b) => a[0].localeCompare(b[0]))) {
          text += `- **${cat}** (${count} examples)\n`;
        }
        text += `\n**Total: ${examples.size} examples**\n`;
        text += "\nUse list_examples with a category to see all examples in that category.";
        return { content: [{ type: "text", text }] };
      }

      const matching = [...examples.entries()]
        .filter(([, ex]) => ex.category === category)
        .sort((a, b) => a[1].title.localeCompare(b[1].title));

      if (matching.length === 0) {
        const cats = [...new Set([...examples.values()].map(e => e.category))].sort();
        return { content: [{ type: "text", text: `No examples in category "${category}".\n\nAvailable: ${cats.join(", ")}` }] };
      }

      let text = `# ${category} examples (${matching.length})\n\n`;
      for (const [key, ex] of matching) {
        text += `- **${ex.title}** — \`${key}\`\n`;
      }
      text += "\nUse get_example with the path to get the full code.";
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_example ---
  server.registerTool(
    "get_example",
    {
      title: "Get example",
      description: "Get the full code for a specific amCharts 5 example/demo. Use list_examples or search_all to find the path.",
      inputSchema: {
        path: z.string().describe("Example path, e.g. 'examples/flow/sankey-diagram', 'examples/pie-donut/donut-chart', 'examples/maps/drill-down-map'"),
      },
      annotations: READ_ONLY,
    },
    async ({ path: exPath }) => {
      const key = exPath.replace(/^\/|\/$/g, "").replace(/\.md$/, "");
      const ex = examples.get(key);
      if (!ex) {
        return { content: [{ type: "text", text: `Example "${key}" not found. Use list_examples to browse available examples.` }] };
      }
      let text = `# ${ex.title}\n`;
      text += `*Category: ${ex.category}*\n`;
      if (ex.source) text += `*Source: ${ex.source}*\n`;
      text += `\n${ex.content}`;
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: list_geodata ---
  server.registerTool(
    "list_geodata",
    {
      title: "List geodata (map files)",
      description: "List amCharts 5 geodata (map) files with each one's CDN path, script global name and ES module import: world maps, continents, every country map, regional packs (US states and counties, Canada, Mexico) and the US congressional-district packs, which are versioned per Congress (congressional120 = 120th Congress is the newest). Also the data/countries2 and lang/* helper files. Use it before writing map code instead of guessing a file or global name.",
      inputSchema: {
        filter: z.string().optional().describe("Words that must all match (case-insensitive) a map's path, label, group, ISO code or pack, e.g. 'germany', 'FR', 'region/canada', 'usa counties', 'congressional120', 'congressional whole country', 'continents', 'countries2'. A file or global name ('usaCongressionalLow', 'am5geodata_worldLow') works too. Omit for an overview."),
      },
      annotations: READ_ONLY,
    },
    async ({ filter }) => ({ content: [{ type: "text", text: listGeodata(content.geodata, filter) }] })
  );

  // -------------------------------------------------------------------------
  // Resources: expose each skill doc as an MCP resource
  // -------------------------------------------------------------------------
  for (const [name, doc] of docs) {
    server.resource(
      name,
      `amcharts://docs/${name}`,
      { description: `amCharts 5 reference: ${doc.title}`, mimeType: "text/markdown" },
      async () => ({
        contents: [{ uri: `amcharts://docs/${name}`, text: doc.content, mimeType: "text/markdown" }],
      })
    );
  }
}
