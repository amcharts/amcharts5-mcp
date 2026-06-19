// ---------------------------------------------------------------------------
// Shared, transport-agnostic content layer.
//
// Pure logic only — NO filesystem, NO Node built-ins — so this module can be
// bundled into the Cloudflare Worker as-is. The stdio server reads files from
// disk (see content-fs.js) and the Worker imports a pre-generated bundle (see
// scripts/build-worker-content.js); both feed the same buildContent() here so
// the two deployments behave identically.
// ---------------------------------------------------------------------------

/** Chart type aliases → reference file mapping */
export const CHART_TYPE_MAP = {
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

export function parseSections(content) {
  const sections = [];
  const lines = content.split("\n");
  let currentHeading = "";
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

/**
 * Import sections carry two ### sub-blocks: one for ES modules, one for CDN /
 * script tags. Return only the requested one (esm | html), or "" if not found.
 */
export function extractImportBlock(body, format) {
  const lines = body.split("\n");
  const wantEsm = format === "esm";
  let capturing = false;
  let captured = [];
  let sawSub = false;
  for (const line of lines) {
    const sub = line.match(/^###\s+(.+)/);
    if (sub) {
      sawSub = true;
      const h = sub[1].toLowerCase();
      const isEsm = /es module|esm|typescript|import/.test(h);
      // Note: "typescript" contains "script", so match "script tag"/"cdn", not bare "script".
      const isCdn = /cdn|script tag|<script/.test(h);
      capturing = wantEsm ? isEsm : isCdn;
      continue;
    }
    if (capturing) captured.push(line);
  }
  if (!sawSub) return ""; // no sub-blocks → caller falls back to full body
  return captured.join("\n").trim();
}

/**
 * Build the in-memory content structures from raw markdown files.
 *
 * @param {{ skillFiles: Record<string,string>, extendedFiles: Record<string,string> }} raw
 *   skillFiles  — name (no .md) → raw markdown for SKILL.md + references/*.md
 *   extendedFiles — path key (no .md) → raw markdown for everything under extended/
 * @returns {{ docs: Map, extendedDocs: Map, examples: Map }}
 */
export function buildContent({ skillFiles = {}, extendedFiles = {} } = {}) {
  /** @type {Map<string, {title: string, content: string, sections: {heading: string, body: string}[]}>} */
  const docs = new Map();
  /** @type {Map<string, {title: string, content: string, sections: {heading: string, body: string}[], path: string}>} */
  const extendedDocs = new Map();
  /** @type {Map<string, {title: string, category: string, content: string, source: string}>} */
  const examples = new Map();

  // Skill docs (SKILL.md + references/*.md)
  for (const [name, content] of Object.entries(skillFiles)) {
    const titleMatch = content.match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1] : name;
    docs.set(name, { title, content, sections: parseSections(content) });
  }

  // Extended docs + examples (frontmatter-tagged markdown)
  for (const [key, content] of Object.entries(extendedFiles)) {
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const body = fmMatch ? fmMatch[2].trim() : content;
    const fm = fmMatch ? fmMatch[1] : "";
    const titleMatch = fm.match(/title:\s*"(.+?)"/);
    const categoryMatch = fm.match(/category:\s*"(.+?)"/);
    const sourceMatch = fm.match(/source:\s*"(.+?)"/);
    const fallbackTitle = key.split("/").pop();
    const title = titleMatch ? titleMatch[1] : fallbackTitle;

    if (key.startsWith("examples/")) {
      examples.set(key, {
        title,
        category: categoryMatch ? categoryMatch[1] : "",
        content: body,
        source: sourceMatch ? sourceMatch[1] : "",
      });
    } else {
      extendedDocs.set(key, {
        title,
        content: body,
        sections: parseSections(body),
        path: key,
      });
    }
  }

  return { docs, extendedDocs, examples };
}

/**
 * Keyword search over the skill docs and (optionally) the extended docs.
 * @param {{docs: Map, extendedDocs: Map}} content
 */
export function searchDocs(content, query, maxResults = 10, scope = "skill") {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = [];

  // Skill docs (SKILL.md + references/*.md)
  for (const [name, doc] of content.docs) {
    for (const section of doc.sections) {
      const text = (section.heading + " " + section.body).toLowerCase();
      const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
      if (score > 0) {
        results.push({
          file: name,
          source: "skill",
          docTitle: doc.title,
          heading: section.heading,
          body: section.body.trim(),
          // Nudge skill results slightly ahead of extended on ties — the skill
          // is the curated layer; extended is the exhaustive API reference.
          score: score + 0.1,
        });
      }
    }
  }

  // Extended docs (charts/, concepts/, getting-started/, reference/<class>) —
  // this is where the per-class API + defaults live. Only scanned when scope=all.
  if (scope === "all") {
    for (const [key, doc] of content.extendedDocs) {
      for (const section of doc.sections) {
        const text = (section.heading + " " + section.body).toLowerCase();
        const score = terms.reduce((s, t) => s + (text.includes(t) ? 1 : 0), 0);
        if (score > 0) {
          results.push({
            file: key,
            source: "extended",
            docTitle: doc.title,
            heading: section.heading,
            body: section.body.trim(),
            score,
          });
        }
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}
