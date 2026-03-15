#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = join(__dirname, "..", "amcharts5-skill", "amcharts5-skill");
const REFERENCES_DIR = join(SKILL_DIR, "references");

// ---------------------------------------------------------------------------
// Load and index all content at startup
// ---------------------------------------------------------------------------

/** @type {Map<string, {title: string, content: string, sections: {heading: string, body: string}[]}>} */
const docs = new Map();

/** Chart type aliases → reference file mapping */
const CHART_TYPE_MAP = {
  // XY family
  "xy": "xy", "line": "xy", "area": "xy", "bar": "xy", "column": "xy",
  "candlestick": "xy", "ohlc": "xy", "scatter": "xy", "bubble": "xy",
  "stacked": "xy", "stacked-bar": "xy", "stacked-column": "xy",
  "stacked-area": "xy", "range": "xy", "waterfall": "xy",
  // Pie family
  "pie": "pie", "donut": "pie", "funnel": "pie", "pyramid": "pie",
  "semi-circle": "pie", "pictorial": "pie", "sliced": "pie",
  // Map
  "map": "map", "choropleth": "map", "geo": "map", "geographic": "map",
  "world": "map", "country": "map", "bubble-map": "map", "point-map": "map",
  // Hierarchy
  "hierarchy": "hierarchy", "treemap": "hierarchy", "sunburst": "hierarchy",
  "force-directed": "hierarchy", "pack": "hierarchy", "partition": "hierarchy",
  "tree": "hierarchy", "org-chart": "hierarchy",
  // Flow
  "flow": "flow", "sankey": "flow", "chord": "flow", "arc": "flow",
  "alluvial": "flow",
  // Radar
  "radar": "radar", "spider": "radar", "polar": "radar", "gauge": "radar",
  "speedometer": "radar", "meter": "radar",
  // Stock
  "stock": "stock", "financial": "stock", "trading": "stock",
  // Timeline
  "timeline": "timeline", "serpentine": "timeline", "spiral": "timeline",
  "curve": "timeline",
  // Gantt
  "gantt": "gantt", "project-timeline": "gantt",
  // Word cloud
  "wordcloud": "wordcloud", "word-cloud": "wordcloud", "tag-cloud": "wordcloud",
  // Venn
  "venn": "venn",
  // UI
  "ui": "ui-elements", "ui-elements": "ui-elements", "button": "ui-elements",
  "slider": "ui-elements", "controls": "ui-elements",
};

function parseSections(content) {
  const sections = [];
  const lines = content.split("\n");
  let currentHeading = "";
  let currentLevel = 0;
  let currentBody = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      if (level <= 2) {
        // Major section boundary (# or ##)
        if (currentHeading || currentBody.length > 0) {
          sections.push({ heading: currentHeading, body: currentBody.join("\n") });
        }
        currentHeading = title;
        currentLevel = level;
        currentBody = [];
      } else {
        // Sub-heading (###) — include in current section body
        currentBody.push(line);
      }
    } else {
      currentBody.push(line);
    }
  }
  if (currentHeading || currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join("\n") });
  }
  return sections;
}

function loadFile(filePath, name) {
  const content = readFileSync(filePath, "utf-8");
  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : name;
  docs.set(name, { title, content, sections: parseSections(content) });
}

function loadContent() {
  // Load core SKILL.md
  loadFile(join(SKILL_DIR, "SKILL.md"), "SKILL");

  // Load all reference files
  const files = readdirSync(REFERENCES_DIR).filter(f => f.endsWith(".md"));
  for (const file of files) {
    loadFile(join(REFERENCES_DIR, file), file.replace(".md", ""));
  }
}

loadContent();

// ---------------------------------------------------------------------------
// Search helpers
// ---------------------------------------------------------------------------

function searchDocs(query, maxResults = 10) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = [];

  for (const [name, doc] of docs) {
    for (const section of doc.sections) {
      const text = (section.heading + " " + section.body).toLowerCase();
      const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
      if (score > 0) {
        results.push({
          file: name,
          docTitle: doc.title,
          heading: section.heading,
          body: section.body.trim(),
          score,
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "amcharts5",
  version: "1.0.0",
});

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
  "Search across all amCharts 5 documentation for a keyword or topic. Returns matching sections ranked by relevance.",
  {
    query: z.string().describe("Search query, e.g. 'legend', 'axis label rotation', 'tooltip format', 'data processor'"),
    maxResults: z.number().optional().default(5).describe("Maximum number of results to return (default 5)"),
  },
  async ({ query, maxResults }) => {
    const results = searchDocs(query, maxResults);
    if (results.length === 0) {
      return { content: [{ type: "text", text: `No results found for "${query}".` }] };
    }

    let text = `# Search results for "${query}"\n\n`;
    for (const r of results) {
      text += `## ${r.docTitle} → ${r.heading}\n`;
      text += `*(source: ${r.file}.md, relevance: ${r.score})*\n\n`;
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

    // Find the setup/core pattern section
    const setupSection = doc.sections.find(s =>
      /setup|core.*pattern|basic|quick.*start|required.*import/i.test(s.heading)
    );

    if (!setupSection) {
      // Fallback: return first few sections
      const intro = doc.sections.slice(0, 4).map(s => `## ${s.heading}\n${s.body}`).join("\n\n");
      return { content: [{ type: "text", text: intro }] };
    }

    // Also grab the imports section
    const importSection = doc.sections.find(s =>
      /import/i.test(s.heading)
    );

    let text = `# Quick Start: ${doc.title}\n\n`;
    if (importSection && importSection !== setupSection) {
      if (format === "esm") {
        text += `## Imports (ES modules)\n${importSection.body}\n\n`;
      } else {
        text += `## Imports\n${importSection.body}\n\n`;
      }
    }
    text += `## ${setupSection.heading}\n${setupSection.body}`;

    return { content: [{ type: "text", text }] };
  }
);

// ---------------------------------------------------------------------------
// Resources: expose each doc as an MCP resource
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const transport = new StdioServerTransport();
await server.connect(transport);
