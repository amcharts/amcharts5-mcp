// ---------------------------------------------------------------------------
// Tool + resource registration — shared by the stdio server and the Worker.
//
// registerTools(server, content) attaches every amCharts 5 tool and resource to
// an McpServer instance. `content` is the { docs, extendedDocs, examples } shape
// produced by buildContent(). No filesystem / transport assumptions live here.
// ---------------------------------------------------------------------------

import { z } from "zod";
import { CHART_TYPE_MAP, extractImportBlock, searchDocs } from "./content.js";

export function registerTools(server, content) {
  const { docs, extendedDocs, examples } = content;

  // --- Tool: list_chart_types ---
  server.tool(
    "list_chart_types",
    "List all amCharts 5 chart types with their categories and reference file names",
    {},
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
  server.tool(
    "get_chart_reference",
    "Get the full reference documentation for a specific amCharts 5 chart type. Use list_chart_types first to see available types.",
    { chartType: z.string().describe("Chart type keyword, e.g. 'pie', 'sankey', 'xy', 'treemap', 'map', 'radar', 'stock', 'gantt', 'venn', 'wordcloud', 'timeline', 'flow', 'hierarchy', 'ui-elements'") },
    async ({ chartType }) => {
      const key = CHART_TYPE_MAP[chartType.toLowerCase()] || chartType.toLowerCase();
      const doc = docs.get(key);
      if (!doc) {
        const available = [...new Set(Object.values(CHART_TYPE_MAP))].sort().join(", ");
        return {
          content: [{ type: "text", text: `No reference found for "${chartType}". Available: ${available}` }],
        };
      }
      return { content: [{ type: "text", text: doc.content }] };
    }
  );

  // --- Tool: get_core_reference ---
  server.tool(
    "get_core_reference",
    "Get the core amCharts 5 reference (SKILL.md) — covers setup, colors, themes, legends, tooltips, events, data, adapters, disposal, and common pitfalls. Read this first before any chart-specific reference.",
    {},
    async () => {
      const doc = docs.get("SKILL");
      if (!doc) {
        return { content: [{ type: "text", text: "Core SKILL.md not found." }] };
      }
      return { content: [{ type: "text", text: doc.content }] };
    }
  );

  // --- Tool: search_docs ---
  server.tool(
    "search_docs",
    "Search the curated amCharts 5 skill docs (SKILL.md + chart references) for a keyword or topic, returning matching sections ranked by relevance. NOTE: by default this scans ONLY the skill layer. The per-class API reference and per-setting DEFAULTS (e.g. tooltip background cornerRadius, axis tick `visible` default, cursor line strokeDasharray) live in the extended docs — pass scope:'all' here, or use search_all / get_api_reference / get_doc, to reach them.",
    {
      query: z.string().describe("Search query, e.g. 'legend', 'axis label rotation', 'tooltip format', 'data processor'"),
      maxResults: z.number().optional().default(5).describe("Maximum number of results to return (default 5)"),
      scope: z.enum(["skill", "all"]).optional().default("skill").describe("'skill' (default) searches only the curated skill docs; 'all' also searches the extended docs / per-class API reference where settings and defaults live."),
    },
    async ({ query, maxResults, scope }) => {
      const results = searchDocs(content, query, maxResults, scope);
      if (results.length === 0) {
        const hint = scope === "skill"
          ? ` Nothing in the skill docs — retry with scope:'all' to include the API reference, or use search_all.`
          : "";
        return { content: [{ type: "text", text: `No results found for "${query}".${hint}` }] };
      }

      let text = `# Search results for "${query}" (scope: ${scope})\n\n`;
      for (const r of results) {
        text += `## ${r.docTitle} → ${r.heading}\n`;
        text += `*(source: ${r.source}/${r.file}.md, relevance: ${r.score})*\n\n`;
        // Truncate very long sections
        const body = r.body.length > 2000 ? r.body.slice(0, 2000) + "\n\n...(truncated)" : r.body;
        text += body + "\n\n---\n\n";
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_section ---
  server.tool(
    "get_section",
    "Get a specific section from an amCharts 5 reference file by heading name. Use search_docs first to find the right section.",
    {
      file: z.string().describe("Reference file name without .md, e.g. 'xy', 'pie', 'SKILL', 'map'"),
      heading: z.string().describe("Section heading to retrieve, e.g. 'Core setup pattern', 'Axis types', 'Common pitfalls'"),
    },
    async ({ file, heading }) => {
      const doc = docs.get(file);
      if (!doc) {
        return { content: [{ type: "text", text: `File "${file}" not found.` }] };
      }

      const section = doc.sections.find(
        s => s.heading.toLowerCase().includes(heading.toLowerCase())
      );
      if (!section) {
        const available = doc.sections.map(s => s.heading).filter(Boolean).join("\n- ");
        return {
          content: [{ type: "text", text: `Section "${heading}" not found in ${file}.md.\n\nAvailable sections:\n- ${available}` }],
        };
      }
      return {
        content: [{ type: "text", text: `# ${section.heading}\n\n${section.body}` }],
      };
    }
  );

  // --- Tool: get_quick_start ---
  server.tool(
    "get_quick_start",
    "Get a quick-start template for a specific chart type — a minimal working example ready to customize.",
    {
      chartType: z.string().describe("Chart type, e.g. 'pie', 'line', 'bar', 'map', 'sankey', 'treemap'"),
      format: z.enum(["html", "esm"]).optional().default("html").describe("Output format: 'html' for a full HTML page with CDN scripts, 'esm' for ES module imports"),
    },
    async ({ chartType, format }) => {
      const key = CHART_TYPE_MAP[chartType.toLowerCase()] || chartType.toLowerCase();
      const doc = docs.get(key);
      if (!doc) {
        return {
          content: [{ type: "text", text: `No reference found for "${chartType}". Use list_chart_types to see available types.` }],
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
        return { content: [{ type: "text", text: intro }] };
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

      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: search_all ---
  server.tool(
    "search_all",
    "Search across ALL amCharts 5 content: skill references, full documentation, and code examples. Use this for broad searches across everything.",
    {
      query: z.string().describe("Search query, e.g. 'react integration', 'date axis formatting', 'stacked bar example'"),
      maxResults: z.number().optional().default(10).describe("Maximum results (default 10)"),
    },
    async ({ query, maxResults }) => {
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const results = [];

      // Search skill docs
      for (const [name, doc] of docs) {
        for (const section of doc.sections) {
          const text = (section.heading + " " + section.body).toLowerCase();
          const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
          if (score > 0) {
            results.push({ source: `skill/${name}`, title: doc.title, heading: section.heading, preview: section.body.slice(0, 300), score: score + 0.1, type: "skill" });
          }
        }
      }

      // Search extended docs
      for (const [key, doc] of extendedDocs) {
        for (const section of doc.sections) {
          const text = (section.heading + " " + section.body).toLowerCase();
          const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
          if (score > 0) {
            results.push({ source: key, title: doc.title, heading: section.heading, preview: section.body.slice(0, 300), score, type: "docs" });
          }
        }
      }

      // Search examples
      for (const [key, ex] of examples) {
        const text = (ex.title + " " + ex.category + " " + ex.content).toLowerCase();
        const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
        if (score > 0) {
          results.push({ source: key, title: ex.title, heading: ex.category, preview: ex.content.slice(0, 300), score, type: "example" });
        }
      }

      results.sort((a, b) => b.score - a.score);
      const top = results.slice(0, maxResults);

      if (top.length === 0) {
        return { content: [{ type: "text", text: `No results found for "${query}".` }] };
      }

      let text = `# Search results for "${query}" (${results.length} total, showing ${top.length})\n\n`;
      for (const r of top) {
        text += `## [${r.type}] ${r.title}${r.heading ? ` → ${r.heading}` : ""}\n`;
        text += `*Source: ${r.source} | Relevance: ${r.score}*\n\n`;
        text += r.preview + "\n\n---\n\n";
      }
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_doc ---
  server.tool(
    "get_doc",
    "Get a full documentation page from the extended amCharts 5 docs. Use search_all first to find the right path.",
    {
      path: z.string().describe("Doc path, e.g. 'charts/xy-chart/cursor', 'concepts/events', 'getting-started/integrations/react', 'reference/xycursor' (per-class API). For a class's full settings + defaults prefer get_api_reference."),
    },
    async ({ path: docPath }) => {
      const key = docPath.replace(/^\/|\/$/g, "").replace(/\.md$/, "");
      const doc = extendedDocs.get(key);
      if (!doc) {
        // List available top-level paths
        const paths = [...extendedDocs.keys()];
        const topLevel = [...new Set(paths.map(p => p.split("/")[0]))].sort();
        return {
          content: [{ type: "text", text: `Doc "${key}" not found.\n\nAvailable top-level sections: ${topLevel.join(", ")}\n\nUse search_all to find the right path.` }],
        };
      }
      return { content: [{ type: "text", text: `# ${doc.title}\n\n${doc.content}` }] };
    }
  );

  // --- Tool: get_api_reference ---
  server.tool(
    "get_api_reference",
    "Get the per-class API reference for an amCharts 5 class — the class page PLUS its settings table (with DEFAULTS) and, optionally, its private/read-only settings. This is the authoritative source for exact setting names and default values (e.g. tooltip background cornerRadius, axis tick `visible` default). Pass a class name in any casing, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'AxisRendererX'.",
    {
      className: z.string().describe("amCharts 5 class name, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'ColumnSeries', 'AxisRendererX'. Casing/punctuation are ignored."),
      includePrivate: z.boolean().optional().default(false).describe("Also include the private (read-only / internal) settings table. Default false."),
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
        let msg = `No API reference found for "${className}" (normalized "${norm}").`;
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
        text += `\n---\n\n*Private/read-only settings also exist — call get_api_reference("${className}", includePrivate: true) to include them.*\n`;
      }
      return { content: [{ type: "text", text: text.trim() }] };
    }
  );

  // --- Tool: list_examples ---
  server.tool(
    "list_examples",
    "List all available amCharts 5 code examples, optionally filtered by category.",
    {
      category: z.string().optional().describe("Filter by category, e.g. 'column-bar', 'line-area', 'pie-donut', 'maps', 'flow', 'hierarchy', 'stock', 'gantt', 'gauges', 'radar-polar', 'timeline', 'funnel-pyramid'. Omit to list all categories."),
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
  server.tool(
    "get_example",
    "Get the full code for a specific amCharts 5 example/demo. Use list_examples or search_all to find the path.",
    {
      path: z.string().describe("Example path, e.g. 'examples/flow/sankey-diagram', 'examples/pie-donut/donut-chart', 'examples/maps/drill-down-map'"),
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
