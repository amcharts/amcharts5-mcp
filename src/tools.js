// ---------------------------------------------------------------------------
// Tool + resource registration — shared by the stdio server and the Worker.
//
// registerTools(server, content) attaches every amCharts 5 tool and resource to
// an McpServer instance. `content` is the { docs, extendedDocs, examples } shape
// produced by buildContent(). No filesystem / transport assumptions live here.
// ---------------------------------------------------------------------------

import { z } from "zod";
import { CHART_TYPE_MAP, chartKeyOf, extractImportBlock, firstMatchIndex, lineMatchCount, rankContent, searchDocs, singularOf, SPLIT_OVER, splitSubsections } from "./content.js";
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

// A docs path from what an agent holds: a docs address
// ("https://docs.amcharts.com/v5/concepts/events/#adding-a-handler", the
// page's Markdown ".../v5/concepts/events.md", or the address before the docs
// moved, "https://www.amcharts.com/docs/v5/concepts/events/#Global_events"),
// a site path ("/v5/concepts/events", "/docs/v5/concepts/events") or the
// tools' own form ("concepts/events", "skill/xy.md"). Returns the tools' form.
function docPathFromInput(input) {
  return String(input ?? "").trim()
    .replace(/[?#].*$/, "")
    .replace(/^(https?:\/\/)?((www|docs)\.)?amcharts\.com(?=\/|$)/i, "")
    .replace(/^\/+/, "")
    .replace(/^(docs\/)?v5(\/|$)/i, "")
    .replace(/\/+$/, "")
    .replace(/\.md$/i, "");
}

// The demo slug of an amcharts.com demo address ("…/demos/sankey-diagram/")
// The docs pages' embedded demos, kept as examples of their own
// (scripts/docs-demos.mjs)
const DOCS_DEMOS = "docs-demos";
const DOCS_DEMO = /docs\.amcharts\.com\/embeds\/v5\/([^/?#]+)/i;

function demoSlug(input) {
  const m = /amcharts\.com\/demos\/([^/?#]+)/i.exec(String(input ?? ""));
  return m ? m[1].toLowerCase() : null;
}

// What the server says about itself when a client connects (MCP serverInfo;
// title, description, icons and websiteUrl are in the 2025-11-25 spec).
// Clients that read them can show them on a connector's card. The icon is
// served by the Worker (cloudflare/icon.png).
export function serverInfo(version) {
  return {
    name: "amcharts5",
    title: "amCharts 5",
    version,
    description: "Docs, code examples and API reference for amCharts 5, the JavaScript library for charts and maps.",
    websiteUrl: "https://docs.amcharts.com/v5/ai/mcp/",
    icons: [{ src: "https://mcp.amcharts.com/icon.png", mimeType: "image/png", sizes: ["256x256"] }],
  };
}

// An amcharts.com address in a text: a demo, a docs page, the docs' new host
// (Markdown around it, a code span's backtick or bold's asterisks, ends it)
const AMCHARTS_LINK = /(?:https?:\/\/)?(?:[\w-]+\.)*amcharts\.com\/[^\s)"'<>\]`*]*/gi;

// User text echoed back in a reply, capped so a huge query can't balloon it
const echo = (s) => { s = String(s ?? ""); return s.length > 200 ? s.slice(0, 200) + "…" : s; };

// A paragraph that opens with a bold lead named `needle` ("plain html, no
// bundler" finds "**Plain HTML, no bundler.** Load the …"), up to the next
// bold lead or heading outside code: { name, section, text }, or null
function boldLead(doc, asked) {
  // "Plain HTML, no bundler.", "**Plain HTML, no bundler.**" and a lead with
  // `code` in it all compare as plain words
  const plain = (t) => t.toLowerCase().replace(/[*`]/g, "").trim().replace(/[.:]$/, "").trim();
  const needle = plain(asked);
  if (needle.length < 4) return null;
  const leadOf = (line) => {
    const m = /^\*\*([^*]+)\*\*/.exec(line);
    return m ? m[1].trim().replace(/[.:]$/, "").trim() : null;
  };
  for (const pass of [(t) => plain(t) === needle, (t) => plain(t).startsWith(needle)]) {
    for (const section of doc.sections) {
      const lines = section.body.split("\n");
      let fenced = false;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*```/.test(lines[i])) fenced = !fenced;
        const name = !fenced && leadOf(lines[i]);
        if (!name || !pass(name.toLowerCase())) continue;
        const out = [lines[i]];
        let inCode = false;
        for (let j = i + 1; j < lines.length; j++) {
          if (/^\s*```/.test(lines[j])) inCode = !inCode;
          if (!inCode && (/^#{1,6}\s/.test(lines[j]) || leadOf(lines[j]))) break;
          out.push(lines[j]);
        }
        return { name, section: section.heading, text: out.join("\n").trim() };
      }
    }
  }
  return null;
}

// The example get_quick_start returns: a section "Example …" holding an HTML
// page, the one whose title names what was asked ("funnel", "semi-circle",
// "force-directed") or else the first; null when the reference has none
function pickExample(doc, asked) {
  const examples = doc.sections.filter(s => /^Example\b/i.test(s.heading) && /```html/.test(s.body));
  if (!examples.length) return null;
  const asWords = String(asked ?? "").trim().toLowerCase().replace(/[\s_-]+/g, " ").replace(/ (charts?|diagrams?|graphs?)$/, "");
  if (!asWords) return { example: examples[0], named: false };
  // the words as asked, then singular ("funnels")
  const named = [asWords, singularOf(asWords, " ")].map(w => EXAMPLE_WORDS[w] || w).map(w => {
    const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    return examples.find(s => re.test(s.heading.toLowerCase().replace(/[\s_-]+/g, " ")));
  }).find(Boolean);
  if (named) return { example: named, named: true };
  // A longer request ("real-time line chart with a date axis"): the example
  // whose title has the most of its words
  const wordsOf = (s) => new Set(s.toLowerCase().replace(/[^a-z0-9%\s-]/g, " ").split(/[\s_-]+/).map(w => singularOf(w, " "))
    .filter(w => w.length > 2 && !FILLER_WORDS.has(w) && !/^(chart|diagram|graph|plot|example)$/.test(w)));
  const wanted = wordsOf(asWords);
  let closest = null, most = 0;
  for (const s of examples) {
    const title = wordsOf(s.heading.replace(/^Example\s*\d*:\s*/i, ""));
    const count = [...wanted].filter(w => title.has(w)).length;
    if (count > most) { closest = s; most = count; }
  }
  return { example: closest || examples[0], named: false, closest: !!closest };
}

// Frameworks asked for as a chart type, and their docs pages
// (getting-started/integrations/<page>)
const FRAMEWORK_PAGES = {
  "react": "react", "reactjs": "react", "react js": "react",
  "next": "next-js", "nextjs": "next-js", "next js": "next-js",
  "vue": "vue", "vuejs": "vue", "vue js": "vue", "vue 3": "vue", "vue3": "vue",
  "nuxt": "nuxt", "nuxtjs": "nuxt", "nuxt js": "nuxt",
  "angular": "angular", "svelte": "sveltekit", "sveltekit": "sveltekit",
  "react native": "react-native", "reactnative": "react-native", "expo": "react-native",
};
const FRAMEWORK_NAMES = { "react": "React", "next-js": "Next.js", "vue": "Vue", "nuxt": "Nuxt", "angular": "Angular", "sveltekit": "Svelte", "react-native": "React Native" };

// Mistakes agents made with a working example in hand (each checked in a
// browser): said where they copy from, as many never read SKILL.md's rules
const WHEN_ADAPTING = `\n\n**When you adapt this:** a \`Label\` you create with \`{placeholders}\` in its text needs \`populateText: true\`. \`"#,###"\` doesn't round (\`6,708.044\`): use \`"#,###."\` for whole numbers. Add \`template.events.on()\` before \`data.setAll()\`: pie and funnel slices, hierarchy nodes and map polygons are made when the data is set, and a listener added later never reaches them.`;

// The first argument that has a value ("" doesn't)
const firstGiven = (...values) => values.find(v => v != null && String(v).trim() !== "");

// Words that don't name a kind of chart: a request of only these is not a demo's name
const NOT_A_CHART_NAME = new Set(["a", "an", "and", "the", "of", "on", "in", "for", "to", "with", "by", "multi", "series", "time", "date", "value", "axis",
  "data", "label", "legend", "grid", "tooltip", "color", "colour", "zoom", "hover", "image", "animated", "simple", "mixed", "combined", "gradient", "negative",
  "chart", "graph", "diagram", "plot", "export", "exporting", "bullets"]);

// Keywords whose example has another word in its title
const EXAMPLE_WORDS = { "speedometer": "gauge", "meter": "gauge", "point map": "point markers", "org chart": "tree", "tree map": "treemap" };

// A reference's "More examples" section: its longer complete examples, which
// live in the MCP's examples. Each bullet is "- <title>: `get_example(path: "…")`".
function moreExamples(doc) {
  const section = doc.sections.find(s => /^More examples$/i.test(s.heading));
  if (!section) return [];
  return [...section.body.matchAll(/^- (.+?): `get_example\(path: "([^"]+)"\)`/gm)].map(m => ({ title: m[1], path: m[2] }));
}

// The "More examples" entry whose title names what was asked, if any: the
// whole phrase ("map sankey"), or else a chart-type word of it ("rotating
// globe", "bollinger band"), the entry with the most of the asked words
// winning ("map sankey oil")
function moreExampleNamed(extra, asked) {
  const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/[\s_\-–—]+/g, " ");
  const words = norm(asked).replace(/ (charts?|diagrams?|graphs?)$/, "");
  if (!words) return null;
  const has = (title, w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(norm(title));
  // a word in the title as asked or singular ("globes"; "bands" in "Bollinger Bands")
  const hasEither = (title, w) => has(title, w) || has(title, singularOf(w, " "));
  const whole = extra.find(e => hasEither(e.title, words));
  if (whole) return whole;
  const each = words.split(" ").filter(w => w && !FILLER_WORDS.has(w));
  const isKind = (w) => Object.hasOwn(CHART_TYPE_MAP, w) && !FAMILY_WORDS.has(w);
  const kinds = each.filter(w => isKind(w) || isKind(singularOf(w, " ")));
  let best = null, most = 0;
  for (const e of extra) {
    if (!kinds.some(w => hasEither(e.title, w))) continue;
    const count = each.filter(w => hasEither(e.title, w)).length;
    if (count > most) { best = e; most = count; }
  }
  return best;
}

// Words that don't tell examples apart ("globe with map sankey")
const FILLER_WORDS = new Set(["a", "an", "and", "the", "of", "on", "in", "for", "to", "with", "by"]);

// Keywords that name a whole family: its first example is the right answer
const FAMILY_WORDS = new Set(["xy", "pie", "map", "world map", "geo", "geographic", "country", "hierarchy", "flow", "radar", "polar",
  "stock", "financial", "trading", "timeline", "time line", "curve", "gantt", "project timeline", "wordcloud", "word cloud", "tag cloud", "venn"]);

// The inline script of an example page, unindented
function scriptOf(body) {
  const m = /<script>\s*\n([\s\S]*?)<\/script>/.exec(body);
  if (!m) return "";
  const lines = m[1].replace(/\s+$/, "").split("\n");
  const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^\s*/)[0].length));
  return lines.map(l => l.slice(indent)).join("\n");
}

// A page's text without the title line it opens with, when the answer prints
// that title itself
function withoutTitle(content, title) {
  // The title line may follow front matter (SKILL.md's), which stays
  const body = String(content).replace(/^(\s*---\n[\s\S]*?\n---\n)?(\s*#\s+(.+)\n)/, (all, front, line, t) =>
    (t.trim().toLowerCase() === String(title).trim().toLowerCase() ? (front || "") : all));
  return body.replace(/^\s+/, "");
}

// A result count from what an agent passed: 0, -1 or 1e9 still gives a usable list
const resultCount = (n, fallback) => Math.max(1, Math.min(50, Number.isFinite(n) ? Math.floor(n) : fallback));

// --- Overviews of long references -------------------------------------------
// A reference longer than OVERVIEW_CAP characters is answered with an
// overview: as many of its parts as fit in the cap, in document order, then a
// list of the parts left out, each one fetchable by get_section. The 2026-10
// eval measured the long references (SKILL.md, map.md) as half of all input
// tokens, because every later step of an answer reads them again.
export const OVERVIEW_CAP = 12000;
// "Example 1: …", "Example: Spiral chart", "amCharts 5 XY Charts — Working Examples"
const isExampleSection = (heading) => /^Example\b|Working Examples$/i.test(heading || "");

export { SPLIT_OVER, splitSubsections };

// The lines of `body` that end past character `from` and match the most
// query terms, best first, then put back in their order in the text. A long
// line is quoted from just before its first matching word.
function matchingLines(body, from, query, max, width) {
  const found = [];
  let offset = 0;
  for (const line of body.split("\n")) {
    const start = offset;
    offset += line.length + 1;
    if (start + line.length <= from) continue;
    // A line the excerpt cuts: only its part past the cut is new
    const cut = Math.max(0, from - start);
    let text = line.slice(cut).trim();
    if (!text) continue;
    const n = lineMatchCount(text, query);
    if (!n) continue;
    let clipped = cut > 0;
    if (text.length > width) {
      const at = Math.max(0, firstMatchIndex(text, query) - 40);
      text = text.slice(at, at + width);
      clipped = clipped || at > 0;
    }
    found.push({ start, n, text: (clipped ? "…" : "") + text });
  }
  return found
    .sort((a, b) => b.n - a.n || a.start - b.start)
    .slice(0, max)
    .sort((a, b) => a.start - b.start)
    .map((l) => l.text);
}

// The parts an overview is made of: each ## section, or for a long section
// with ### subsections, its opening text and each subsection
function overviewUnits(doc) {
  const units = [];
  for (const s of doc.sections) {
    const body = s.body.trim();
    if (!s.heading && (!body || body.startsWith("---"))) continue; // front matter
    const subs = splitSubsections(s.body);
    if (s.body.length > SPLIT_OVER && subs.some((p) => p.heading)) {
      for (const p of subs) units.push({ section: s.heading, heading: p.heading, text: p.text });
    } else if (body) {
      // an empty section is only a divider ("Working Examples" before the examples)
      units.push({ section: s.heading, heading: null, text: body });
    }
  }
  return units;
}

// The overview text, or null when the doc fits in `cap`. `file` is what
// get_section takes for this doc ("map", "SKILL", "reference/ixyseriessettings").
export function overviewOf(doc, { file, label, cap = OVERVIEW_CAP, title = true }) {
  if (doc.content.length <= cap) return null;
  const units = overviewUnits(doc);
  const shown = new Set();
  let used = 0;
  let full = false;
  for (const u of units) {
    // Worked examples are long code; they always go to the list
    if (isExampleSection(u.section)) continue;
    // The first parts, in order, until one doesn't fit; everything after is listed
    const size = u.text.length + (u.heading || u.section).length + 8;
    if (!full && used + size <= cap) { shown.add(u); used += size; } else full = true;
  }
  let text = title ? `# ${doc.title}\n` : "";
  text += `*(source: ${label}.md. An overview: ${used.toLocaleString("en-US")} of ${doc.content.length.toLocaleString("en-US")} characters. The parts not shown are listed at the end.)*\n\n`;
  let openSection = null;
  for (const u of units) {
    if (!shown.has(u)) continue;
    if (u.section !== openSection) {
      // the doc's own title section is already the heading above
      if (!(u.section === doc.title && title)) text += `## ${u.section}\n`;
      openSection = u.section;
    }
    text += u.heading ? `### ${u.heading}\n${u.text}\n\n` : `${u.text}\n\n`;
  }
  const rest = units.filter((u) => !shown.has(u) && (u.heading || u.section));
  text += `---\n\n## Not shown in this overview\n\n`;
  text += `get_section("${file}", heading) returns each of these in full (the heading is matched case-insensitively):\n`;
  const chars = (n) => `${n.toLocaleString("en-US")} characters`;
  for (const u of rest) {
    if (u.heading) {
      text += `- "${u.heading}" (in "${u.section}", ${chars(u.text.length)})\n`;
    } else {
      // get_section on a section heading returns the whole section, subsections included
      const whole = doc.sections.find((s) => s.heading === u.section);
      const split = whole && units.some((v) => v.section === u.section && v.heading);
      text += `- "${u.section}" (${split ? "the whole section, " : ""}${chars(whole ? whole.body.trim().length : u.text.length)})\n`;
    }
  }
  return text.trim();
}

// Searches about map files get pointed at list_geodata, which has every name.
const GEODATA_QUERY_RE = /geo ?data|congressional|am5geodata|\b(?:low|high)\.js\b/i;
const GEODATA_HINT = "\n\n> Looking for a map file? list_geodata(filter) lists every geodata file (world, countries, regions, US congressional packs per Congress) with its CDN path, global name and ES import.";
const geodataHint = (query) => (GEODATA_QUERY_RE.test(query) ? GEODATA_HINT : "");

export function registerTools(server, content) {
  const { docs, extendedDocs, examples } = content;

  // Directories read a tool's display name from the top-level `title` or from
  // `annotations.title` (Claude's directory portal): give both, from one title.
  const registerTool = (name, config, handler) =>
    server.registerTool(name, { ...config, annotations: { title: config.title, ...config.annotations } }, handler);

  // Resolve any identifier a search result prints — "skill/SKILL.md",
  // "skill/xy", "SKILL", "xy.md", "extended/charts/xy-chart/cursor",
  // "charts/xy-chart/cursor", "reference/xycursor" — to a doc. Search results
  // label their source exactly this way, so an agent can paste the label
  // straight into get_section / get_doc.
  function resolveDoc(id) {
    let key = docPathFromInput(id);
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

  // Examples by their amcharts.com demo slug, and by their own last path part
  // (every key that has it: a shared name resolves only when it is unique)
  const exampleByDemo = new Map();
  const exampleBySlug = new Map();
  for (const [key, ex] of examples) {
    const demo = demoSlug(ex.source);
    if (demo) exampleByDemo.set(demo, key);
    const slug = key.split("/").pop().toLowerCase();
    exampleBySlug.set(slug, [...(exampleBySlug.get(slug) || []), key]);
  }

  // Resolve an example from its key ("examples/flow/sankey-diagram"), the key
  // without "examples/" ("flow/sankey-diagram"), its demo address
  // ("https://www.amcharts.com/demos/sankey-diagram/"), or a unique last part
  // ("sankey-diagram").
  function resolveExample(input) {
    const demo = demoSlug(input);
    if (demo && exampleByDemo.has(demo)) return exampleByDemo.get(demo);
    // A docs page's embedded demo ("https://docs.amcharts.com/embeds/v5/<slug>/")
    const embed = DOCS_DEMO.exec(String(input ?? ""));
    if (embed) {
      const k = `examples/${DOCS_DEMOS}/${embed[1].toLowerCase()}`;
      return examples.has(k) ? k : null;
    }
    // Any other address is not an example name: its last part ("map-chart" of
    // a docs page) must not pick a demo of the same name
    if (!demo && /:\/\/|amcharts\.com\//i.test(String(input ?? ""))) return null;
    const key = String(input ?? "").trim().replace(/[?#].*$/, "").replace(/^\/+|\/+$/g, "").replace(/\.md$/i, "");
    if (examples.has(key)) return key;
    if (examples.has(`examples/${key}`)) return `examples/${key}`;
    const bySlug = exampleBySlug.get(key.split("/").pop().toLowerCase()) || [];
    if (bySlug.length === 1) return bySlug[0];
    // A name shared with a docs page's demo means the amcharts.com demo
    const main = bySlug.filter((k) => !k.startsWith(`examples/${DOCS_DEMOS}/`));
    return main.length === 1 ? main[0] : null;
  }

  // Keys sharing an example name, for a not-found message ("pie-chart" is both
  // a demo and a JSON config)
  const examplesNamed = (input) =>
    exampleBySlug.get(String(input ?? "").trim().replace(/[?#].*$/, "").replace(/^\/+|\/+$/g, "").replace(/\.md$/i, "").split("/").pop().toLowerCase()) || [];

  // An example as get_example returns it
  function exampleText(key) {
    const ex = examples.get(key);
    let text = `# ${ex.title}\n`;
    text += `*Category: ${ex.category}*\n`;
    if (ex.source) text += `*Source: ${ex.source}*\n`;
    return text + `\n${withoutTitle(ex.content, ex.title)}`;
  }

  // An example with what to watch for when adapting its code (a JSON config has no code)
  const exampleWithNote = (key) => exampleText(key) + (key.startsWith("examples/json-configs/") ? "" : WHEN_ADAPTING);

  // A framework asked for as a chart type ("react", "Next.js"): SKILL.md's
  // Frameworks section, with the framework's docs page. Null for anything else.
  function frameworkAnswer(asked) {
    const w = String(asked ?? "").trim().toLowerCase().replace(/\./g, " ").replace(/[\s_-]+/g, " ").replace(/ (app|apps|component|components|chart|charts)$/, "").replace(/ v?\d+( \d+)*$/, "").trim();
    const page = Object.hasOwn(FRAMEWORK_PAGES, w) ? FRAMEWORK_PAGES[w] : null;
    const section = page && docs.get("SKILL")?.sections.find(s => /^Frameworks\b/.test(s.heading));
    if (!section) return null;
    return `# amCharts 5 in ${FRAMEWORK_NAMES[page]}\n\n"${echo(String(asked).trim())}" is a framework, not a chart type: use amCharts' package for it, as below. ` +
      `For the chart itself, call get_quick_start with the chart type and format "esm" (e.g. get_quick_start("column", "esm")), and put its code that follows \`am5.Root.new()\` in the setup function. ` +
      `${FRAMEWORK_NAMES[page]}'s docs page: get_doc("getting-started/integrations/${page}").\n\n## ${section.heading}\n\n${section.body.trim()}`;
  }

  // The amcharts.com demo a request names. One word must be the whole title
  // but for "chart" and the like ("candlestick" is "Candlestick Chart", not
  // "network" for "Network Waterfall Chart"), two words must start it ("heat
  // map"), three or more may be anywhere in it ("drill down pie"). Not the docs
  // pages' demos or the JSON configs.
  function demoNamed(asked) {
    const norm = (s) => String(s ?? "").trim().toLowerCase().replace(/[\s_\-–—/]+/g, " ");
    const bare = (s) => { while (/ (charts?|diagrams?|graphs?|plots?)$/.test(s)) s = s.replace(/ \S+$/, ""); return s; };
    const words = bare(norm(asked)).replace(/^heatmap$/, "heat map");
    if (!words || words.length > 120) return null; // longer than any title
    const count = words.split(" ").length;
    if (words.split(" ").every(w => NOT_A_CHART_NAME.has(w) || NOT_A_CHART_NAME.has(singularOf(w, " ")))) return null;
    const forms = [...new Set([words, singularOf(words, " ")])];
    const found = [];
    for (const [key, ex] of examples) {
      if (!/^examples\/[^/]+\/[^/]+$/.test(key) || key.startsWith(`examples/${DOCS_DEMOS}/`) || key.startsWith("examples/json-configs/")) continue;
      const title = norm(ex.title);
      const whole = forms.includes(bare(title));
      const starts = forms.some(f => `${title} `.startsWith(`${f} `));
      const within = forms.some(f => ` ${title} `.includes(` ${f} `));
      if (whole || (count >= 2 && starts) || (count >= 3 && within)) found.push({ key, title: ex.title, whole, starts, length: title.length });
    }
    found.sort((a, b) => (b.whole - a.whole) || (b.starts - a.starts) || (a.length - b.length) || a.key.localeCompare(b.key));
    return found[0] || null;
  }

  // get_quick_start's answer from a demo: the demo, as get_example gives it
  function demoQuickStart(demo, more) {
    const body = exampleText(demo.key).split("\n").slice(1).join("\n").trim();
    return `# Quick Start: ${demo.title}\n*(source: the amCharts demo get_example(path: "${demo.key}"))*\n\n${body}${WHEN_ADAPTING}${more}`;
  }

  // A link someone pasted (Figma, for one, invites "a link from amCharts" as
  // context): the first amcharts.com address in a text that is a demo or a
  // docs page, and which call gets what it points to. Null when there is none
  // (other amcharts.com addresses, e.g. the CDN's, are passed over).
  function linkPointer(text) {
    for (const m of String(text ?? "").matchAll(AMCHARTS_LINK)) {
      const pointer = pointerFor(m[0].replace(/[.,;:!?]+$/, ""));
      if (pointer) return pointer;
    }
    return null;
  }

  function pointerFor(link) {
    if (/(?:docs\.amcharts\.com|amcharts\.com\/docs)\/v4(?:[/?#]|$)/i.test(link)) {
      return `${link} is from the amCharts 4 docs; this server covers amCharts 5. search_all finds the amCharts 5 docs on the same topic.`;
    }
    const v4 = /amcharts\.com\/demos-v4\/([^/?#]+)/i.exec(link);
    if (v4) {
      const name = v4[1].toLowerCase().replace(/-v4$/, "");
      const v5 = exampleByDemo.get(name) || resolveExample(name);
      return `${link} is an amCharts 4 demo; this server covers amCharts 5.` +
        (v5 ? ` The amCharts 5 version is get_example(path: "${v5}").` : " search_all finds the closest amCharts 5 examples.");
    }
    if (DOCS_DEMO.test(link)) {
      const key = resolveExample(link);
      return key
        ? `${link} is the demo "${examples.get(key).title}" from the amCharts docs: its full code is get_example(path: "${key}").`
        : `${link} is a docs demo this server doesn't have; search_all finds similar examples.`;
    }
    if (demoSlug(link)) {
      const key = resolveExample(link);
      return key
        ? `${link} is the amCharts demo "${examples.get(key).title}": its full code is get_example(path: "${key}").`
        : `${link} is an amCharts demo this server doesn't have; search_all finds similar examples.`;
    }
    if (!/(?:docs\.amcharts\.com\/v5|amcharts\.com\/docs\/v5)(?:[/?#.]|$)/i.test(link)) return null;
    const key = docPathFromInput(link);
    if (key.startsWith("reference/") && extendedDocs.has(key)) {
      return `${link} is the API reference of ${extendedDocs.get(key).title}: get_api_reference(className: "${key.slice("reference/".length)}").`;
    }
    if (!key) return `${link} is the amCharts 5 docs home: get_core_reference gives the essentials, list_chart_types the chart types, search_all anything else.`;
    const resolved = resolveDoc(key);
    if (!resolved) return `${link} is a docs page this server doesn't have; search_all with the page's topic finds the nearest content.`;
    const { doc, label } = resolved;
    // A section anchor, new ("#date-formats") or old ("#Date_formats"): the heading it names
    const anchor = (/#(.+)$/.exec(link) || [])[1];
    if (anchor) {
      const flat = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      let a = anchor; try { a = decodeURIComponent(anchor); } catch {}
      const heading = [...doc.content.matchAll(/^#{2,4}\s+(.+?)\s*$/gm)].map((h) => h[1]).find((h) => flat(h) === flat(a));
      if (heading) return `${link} is the section "${heading}" of the docs page "${doc.title}": get_section(file: "${label}", heading: ${JSON.stringify(heading)}), or the whole page with get_doc(path: "${label}").`;
    }
    return `${link} is the docs page "${doc.title}": get_doc(path: "${label}").`;
  }

  // A search query with a pasted link in it: the link's pointer, and the
  // words besides the link to search for ("" when the query is just the link)
  function splitLink(query) {
    const pointer = linkPointer(query);
    if (!pointer) return { pointer: null, rest: query };
    const rest = String(query).replace(AMCHARTS_LINK, " ").replace(/[()<>[\]`*]+/g, " ").replace(/\s+/g, " ").trim();
    return { pointer, rest: /[a-z]{3}/i.test(rest) ? rest : "" };
  }

  // --- Tool: list_chart_types ---
  registerTool(
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
  registerTool(
    "get_chart_reference",
    {
      title: "Get chart reference",
      description: `Get the reference documentation for a specific amCharts 5 chart type. A reference longer than ${OVERVIEW_CAP.toLocaleString("en-US")} characters comes as an overview: its first parts in full and a list of the others, each of which get_section returns. With \`full: true\` it is the whole file. The chart type keywords are listed by list_chart_types.`,
      inputSchema: {
        chartType: z.string().describe("Chart type keyword, e.g. 'pie', 'sankey', 'xy', 'treemap', 'map', 'radar', 'stock', 'gantt', 'venn', 'wordcloud', 'timeline', 'flow', 'hierarchy', 'ui-elements'"),
        full: z.boolean().optional().default(false).describe("true: the whole reference, however long. false (default): an overview when it is long."),
      },
      annotations: READ_ONLY,
    },
    async ({ chartType, full }) => {
      // "react", "Next.js": the framework's package and pattern
      const framework = frameworkAnswer(chartType);
      if (framework) return { content: [{ type: "text", text: framework }] };
      const key = chartKeyOf(chartType);
      const doc = docs.get(key);
      if (!doc) {
        const available = [...new Set(Object.values(CHART_TYPE_MAP))].sort().join(", ");
        return {
          content: [{ type: "text", text: `No reference found for "${echo(chartType)}". Available: ${available}` }],
        };
      }
      const text = (!full && overviewOf(doc, { file: key, label: `skill/${key}` })) || doc.content;
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_core_reference ---
  registerTool(
    "get_core_reference",
    {
      title: "Get core reference (setup, themes, pitfalls)",
      description: `Get the core amCharts 5 reference (SKILL.md) — covers setup, colors, themes, legends, tooltips, events, data, adapters, disposal, and common pitfalls. It is the base for every chart type; the chart-specific references build on it. It comes as an overview: its first sections, up to ${OVERVIEW_CAP.toLocaleString("en-US")} characters, and a list of the others, each of which get_section("SKILL", heading) returns. With \`full: true\` it is the whole file.`,
      inputSchema: {
        full: z.boolean().optional().default(false).describe(`true: the whole SKILL.md (about ${(Math.round((docs.get("SKILL")?.content.length || 0) / 1000) * 1000).toLocaleString("en-US")} characters). false (default): the overview.`),
      },
      annotations: READ_ONLY,
    },
    async ({ full }) => {
      const doc = docs.get("SKILL");
      if (!doc) {
        return { content: [{ type: "text", text: "Core SKILL.md not found." }] };
      }
      const text = (!full && overviewOf(doc, { file: "SKILL", label: "skill/SKILL" })) || doc.content;
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: search_docs ---
  registerTool(
    "search_docs",
    {
      title: "Search docs",
      description: "Search the curated amCharts 5 skill docs (SKILL.md + chart references) for a keyword or topic, returning matching sections ranked by relevance. By default it searches only the skill layer. With scope 'all' it also searches the extended docs, the per-class API reference and the code examples. Per-setting defaults (e.g. tooltip background cornerRadius, axis tick `visible` default, cursor line strokeDasharray) are in the extended docs and the API reference, which search_all, get_api_reference and get_doc also return.",
      inputSchema: {
        query: z.string().describe("Search query, e.g. 'legend', 'axis label rotation', 'tooltip format', 'data processor'"),
        maxResults: z.number().optional().default(5).describe("Maximum number of results to return (default 5, 1 to 50)"),
        scope: z.enum(["skill", "all"]).optional().default("skill").describe("'skill' (default) searches only the curated skill docs; 'all' also searches the extended docs / per-class API reference where settings and defaults live, and the code examples."),
      },
      annotations: READ_ONLY,
    },
    async ({ query: asked, maxResults: askedMax, scope }) => {
      const maxResults = resultCount(askedMax, 5);
      // A pasted amcharts.com link: where it points comes first, then results
      // for the words besides it, if any
      const { pointer, rest: query } = splitLink(asked);
      if (pointer && !query) return { content: [{ type: "text", text: pointer }] };
      const lead = pointer ? `> ${pointer}\n\n` : "";
      const results = searchDocs(content, query, maxResults, scope);
      if (results.length === 0) {
        const hint = scope === "skill"
          ? ` Nothing in the skill docs — retry with scope:'all' to include the API reference, or use search_all.`
          : "";
        return { content: [{ type: "text", text: `${lead}No results found for "${echo(query)}".${hint}${geodataHint(query)}` }] };
      }

      // Per-result excerpt budget. When only one or two sections match, the
      // whole point is to read them — grow the budget instead of cutting the
      // answer off.
      const budget = results.length <= 2 ? 6000 : 2000;

      let text = `${lead}# Search results for "${echo(query)}" (scope: ${scope})\n\n`;
      for (const r of results) {
        // Examples aren't sections of a doc: label them by their example path
        // and point at get_example for the full code.
        const isExample = r.kind === "example";
        const id = isExample ? r.file : `${r.kind}/${r.file}`;
        text += isExample ? `## [example] ${r.docTitle}\n` : `## ${r.docTitle}${r.section ? ` → ${r.section}` : ""}${r.heading ? ` → ${r.heading}` : ""}\n`;
        text += `*(source: ${id}.md, relevance: ${r.score})*\n\n`;
        let body = r.body;
        if (body.length > budget) {
          // The excerpt is a fixed-size head, so the line that matched the
          // query may lie past the cut. Quote the matching lines beyond the
          // head so the answer is never lost, and print the exact call that
          // returns the full section.
          const head = body.slice(0, budget);
          const beyond = matchingLines(body, budget, query, 8, 400);
          body = head + (isExample
            ? `\n\n...(truncated — full example: get_example(path: "${r.file}"))`
            : `\n\n...(truncated — full section: get_section(file: "${id}", heading: ${JSON.stringify(r.heading)}))`);
          if (beyond.length) {
            body += `\n\nMatching lines beyond the excerpt:\n` + beyond.map(l => `> ${l}`).join("\n");
          }
        }
        text += body + "\n\n---\n\n";
      }
      // The npm package ships the same skill text in docs/, so an agent that
      // read it there gets nothing new here: say where else to look
      const wider = scope === "skill"
        ? "These are sections of the amCharts 5 skill, the same text the @amcharts/amcharts5 npm package has in docs/. For the full docs, the API reference and the code examples, use search_all or scope: \"all\".\n"
        : "";
      return { content: [{ type: "text", text: text + wider + geodataHint(query) }] };
    }
  );

  // --- Tool: get_section ---
  registerTool(
    "get_section",
    {
      title: "Get doc section",
      description: "Get the full text of one section of a doc by heading, for example a section that a search_docs or search_all result shows truncated. `file` accepts the source label exactly as search results print it ('skill/SKILL.md', 'skill/xy', 'extended/charts/xy-chart/cursor', 'reference/xycursor') as well as a bare skill file name ('SKILL', 'xy', 'map').",
      inputSchema: {
        file: z.string().optional().describe("Doc identifier: a skill file ('SKILL', 'xy', 'pie', 'map') or a source label from search results ('skill/SKILL.md', 'extended/concepts/events', 'reference/xycursor'). '.md' and 'skill/' / 'extended/' prefixes are optional."),
        chartType: z.string().optional().describe("The same as `file`, for a chart type's reference ('hierarchy', 'xy'), as get_chart_reference takes it."),
        heading: z.string().describe("Section heading to retrieve (case-insensitive substring), e.g. 'Core setup pattern', 'Axis types', 'Common pitfalls', 'Recent API changes'. A ### subsection heading returns just that subsection, and a bold lead (e.g. 'Plain HTML, no bundler') its paragraphs."),
      },
      annotations: READ_ONLY,
    },
    async ({ file: fileArg, chartType, heading }) => {
      // `chartType` as get_chart_reference names it ("treemap" is in "hierarchy")
      const named = firstGiven(fileArg, chartType);
      const file = named === fileArg || docs.has(String(named ?? "").trim()) ? named : chartKeyOf(named);
      if (file == null || !String(file).trim()) {
        return { content: [{ type: "text", text: `Name the doc in \`file\` (a skill file such as "SKILL", "xy", "hierarchy", or a source label from search results), with the section's \`heading\`.` }], isError: true };
      }
      const resolved = resolveDoc(file);
      if (!resolved) {
        const skillFiles = [...docs.keys()].map(k => `skill/${k}`).join(", ");
        return { content: [{ type: "text", text: `File "${file}" not found.\n\nSkill files: ${skillFiles}\n\nExtended docs use their path, e.g. 'charts/xy-chart/cursor', 'concepts/events', 'reference/xycursor' (with or without an 'extended/' prefix). Use search_docs / search_all to find one.` }] };
      }
      const { doc, label } = resolved;

      // In order: an exact ## heading; an exact ### heading in a long section
      // (the subsections an overview lists); a ## heading containing the text;
      // a ### heading containing it. A ### match returns just that subsection.
      const needle = heading.trim().toLowerCase();
      const subs = doc.sections.flatMap(s => splitSubsections(s.body).filter(p => p.heading).map(p => ({ ...p, section: s.heading, long: s.body.length > SPLIT_OVER })));
      const exactSection = doc.sections.find(s => s.heading.toLowerCase() === needle);
      const exactSub = !exactSection && subs.find(p => p.long && p.heading.toLowerCase() === needle);
      const section = exactSection || (!exactSub && doc.sections.find(s => s.heading.toLowerCase().includes(needle)));
      const sub = exactSub || (!section && subs.find(p => p.heading.toLowerCase().includes(needle)));
      if (section) {
        return { content: [{ type: "text", text: `# ${section.heading}\n*(source: ${label}.md)*\n\n${section.body}` }] };
      }
      if (sub) {
        return { content: [{ type: "text", text: `# ${sub.heading}\n*(source: ${label}.md, in "${sub.section}")*\n\n${sub.text}` }] };
      }
      // Skill text also points to bold leads ("**Plain HTML, no bundler.** …") by name
      const lead = boldLead(doc, needle);
      if (lead) {
        return { content: [{ type: "text", text: `# ${lead.name}\n*(source: ${label}.md, in "${lead.section}")*\n\n${lead.text}` }] };
      }
      const available = doc.sections.map(s => s.heading).filter(Boolean).join("\n- ");
      return {
        content: [{ type: "text", text: `Section "${heading}" not found in ${label}.md.\n\nAvailable sections:\n- ${available}` }],
      };
    }
  );

  // --- Tool: get_quick_start ---
  registerTool(
    "get_quick_start",
    {
      title: "Get quick-start template",
      description: "Get a quick-start template for a specific chart type — a minimal working example ready to customize.",
      inputSchema: {
        chartType: z.string().describe("Chart type, e.g. 'pie', 'line', 'bar', 'map', 'sankey', 'treemap'"),
        format: z.enum(["html", "esm"]).optional().default("html").describe("Output format: 'html' for script tags (cdn.amcharts.com, with the npm-CDN equivalent on jsDelivr/unpkg for pages that may load only from npm CDNs), 'esm' for ES module imports"),
      },
      annotations: READ_ONLY,
    },
    async ({ chartType, format }) => {
      // "react", "Next.js": the framework's package and pattern
      const framework = frameworkAnswer(chartType);
      if (framework) return { content: [{ type: "text", text: framework }] };
      const key = chartKeyOf(chartType);
      const doc = docs.get(key);
      if (!doc) {
        // A demo named so ("dumbbell" → "Dumbbell Plot")
        const demo = demoNamed(chartType);
        if (demo) {
          const esm = format === "esm" ? ` It loads amCharts with script tags: with ES modules, import the same packages instead (\`index.js\` is \`@amcharts/amcharts5\`, \`xy.js\` is \`@amcharts/amcharts5/xy\`, \`themes/Animated.js\` is \`@amcharts/amcharts5/themes/Animated\`).` : "";
          return { content: [{ type: "text", text: demoQuickStart(demo, `\n\nThis is an amCharts demo.${esm} More like it: search_all(${JSON.stringify(echo(chartType.trim()))}); the chart types: list_chart_types.`) }] };
        }
        return {
          content: [{ type: "text", text: `No reference or demo found for "${echo(chartType)}". search_all(${JSON.stringify(echo(String(chartType).trim()))}) searches the docs and examples; list_chart_types lists the chart types.` }],
        };
      }
      if (key === "ui-elements") {
        return { content: [{ type: "text", text: `UI elements (buttons, sliders, scrollbars, modals) are not a chart type: they go on any chart. get_chart_reference("ui-elements") has them; for a chart to start from, call get_quick_start with a chart type (list_chart_types lists them).` }] };
      }

      // Grab the imports section first so we can exclude it from the setup match.
      const importSection = doc.sections.find(s =>
        /import/i.test(s.heading)
      );

      // A complete, runnable example: the one whose title names what was asked
      // ("funnel", "donut", "chord"), else the reference's first. html gives the
      // page as it is; esm the page's script under the ES module imports.
      const { example, named, closest } = pickExample(doc, chartType) || {};
      if (example) {
        const others = doc.sections.filter(s => s !== example && /^Example\b/i.test(s.heading) && /```html/.test(s.body));
        // The reference's longer examples, kept in the MCP's examples
        const extra = moreExamples(doc);
        const longer = extra.length ? ` Longer examples: ${extra.map(e => `${e.title}: get_example(path: "${e.path}")`).join("; ")}.` : "";
        const more = others.length
          ? `\n\nOther examples here: ${others.map(s => `get_section("${key}", ${JSON.stringify(s.heading)})`).join(", ")}.${longer} The whole reference: get_chart_reference("${key}").`
          : `\n\n${longer ? longer.trim() + " " : ""}The whole reference: get_chart_reference("${key}").`;
        // Asked for a type no example here shows ("candlestick", "waterfall"): say so,
        // or name the longer example that shows it ("map sankey")
        const asked = chartType.trim().toLowerCase().replace(/[\s_-]+/g, " ");
        // the family's own words, also as "world maps" or "World Map chart"
        const plain = singularOf(asked.replace(/ (charts?|diagrams?|graphs?)$/, ""), " ");
        const family = [asked, plain].some(a => a === key || FAMILY_WORDS.has(a));
        const longerNamed = !named && moreExampleNamed(extra, chartType);
        // else an amCharts demo named so ("stacked column" → "Stacked Column Chart"):
        // the demo itself, or under ES modules a pointer to it
        const demo = !named && !family && !longerNamed ? demoNamed(chartType) : null;
        if (demo && format !== "esm") return { content: [{ type: "text", text: demoQuickStart(demo, more) }] };
        const unnamed = longerNamed
          ? `> The complete example for "${echo(chartType.trim())}" is "${longerNamed.title}": get_example(path: "${longerNamed.path}"). Below is this reference's first example.\n\n`
          : demo
          ? `> The complete example for "${echo(chartType.trim())}" is the amCharts demo "${demo.title}": get_example(path: "${demo.key}"). It loads amCharts with script tags; below is this reference's first example under ES module imports.\n\n`
          : !named && !family
            ? `> No example in this reference shows "${echo(chartType.trim())}"; this is ${closest ? "the closest" : "its first"}. How to make one: get_chart_reference("${key}") or search_all("${echo(chartType.trim())}").\n\n`
            : "";
        const title = `# Quick Start: ${example.heading.replace(/^Example\s*\d*:\s*/i, "")}\n*(source: skill/${key}.md, ${doc.title}: "${example.heading}")*\n\n${unnamed}`;
        if (format === "esm") {
          const esm = importSection ? extractImportBlock(importSection.body, "esm") : "";
          const code = scriptOf(example.body);
          if (esm && code) {
            // Geodata the example uses beyond what the reference imports
            const imported = new Set([...esm.matchAll(/import\s+(?:\*\s+as\s+)?(\w+)/g)].map(m => m[1]));
            const geodata = [...new Set(code.match(/\bam5geodata_\w+/g) || [])].filter(n => !imported.has(n))
              .map(n => `import ${n} from "@amcharts/amcharts5-geodata/${n.slice("am5geodata_".length).replace(/_/g, "/")}";`);
            // The page's elements the code looks up: the chart's div, and e.g. a stock toolbar's
            const ids = [...new Set([...example.body.matchAll(/<div id="([^"]+)"/g)].map(m => m[1]))];
            const div = ids.length ? `\n\nThe code draws into ${ids.map(id => `\`<div id="${id}">\``).join(" and ")} on the page${ids.includes("chartdiv") ? `; the chart's div needs a height (e.g. \`style="height: 500px"\`)` : ""}.` : "";
            const text = title + `## Imports (ES modules)\n${esm}\n` + (geodata.length ? "```js\n" + geodata.join("\n") + "\n```\n" : "") +
              `\n## Code\n\`\`\`js\n${code}\n\`\`\`${div}${WHEN_ADAPTING}${more}${FRAMEWORK_NOTE}`;
            return { content: [{ type: "text", text }] };
          }
        } else {
          // The npm-CDN pointer from the reference's script-tag imports
          const cdn = importSection ? extractImportBlock(importSection.body, "html") : "";
          const pointer = cdn.split(/```[\s\S]*?```/).join("\n").split("\n").map(l => l.trim()).filter(Boolean).join("\n");
          return { content: [{ type: "text", text: title + example.body.trim() + (pointer ? `\n\n${pointer}` : "") + WHEN_ADAPTING + more }] };
        }
      }

      // A JSON config: where it goes, then the first complete config
      if (key === "json") {
        const where = doc.sections.find(s => /^Where a config goes/i.test(s.heading));
        const complete = doc.sections.find(s => /^Complete configs/i.test(s.heading));
        const first = complete && splitSubsections(complete.body).find(p => p.heading);
        if (where && first) {
          const text = `# Quick Start: ${doc.title}\n*(source: skill/json.md)*\n\n## ${where.heading}\n${where.body.trim()}\n\n## ${first.heading}\n${first.text}\n\n` +
            `The rules a config follows, and more complete configs: get_chart_reference("json").`;
          return { content: [{ type: "text", text }] };
        }
      }

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
  registerTool(
    "search_all",
    {
      title: "Search all content",
      description: "Search across all amCharts 5 content: skill references, full documentation, and code examples. For broad searches across everything.",
      inputSchema: {
        query: z.string().describe("Search query, e.g. 'react integration', 'date axis formatting', 'stacked bar example'. An amcharts.com link (a demo or a docs page) is answered with the call that returns it."),
        maxResults: z.number().optional().default(10).describe("Maximum results (default 10, 1 to 50)"),
      },
      annotations: READ_ONLY,
    },
    async ({ query: asked, maxResults: askedMax }) => {
      const maxResults = resultCount(askedMax, 10);
      // A pasted amcharts.com link: where it points comes first, then results
      // for the words besides it, if any
      const { pointer, rest: query } = splitLink(asked);
      if (pointer && !query) return { content: [{ type: "text", text: pointer }] };
      const lead = pointer ? `> ${pointer}\n\n` : "";
      const { total, results } = rankContent(content, query, { maxResults });
      if (results.length === 0) {
        return { content: [{ type: "text", text: `${lead}No results found for "${echo(query)}".${geodataHint(query)}` }] };
      }

      const TYPE_LABEL = { skill: "skill", extended: "docs", example: "example" };
      let text = `${lead}# Search results for "${echo(query)}" (${total} total, showing ${results.length})\n\n`;
      for (const r of results) {
        const source = r.kind === "skill" ? `skill/${r.file}` : r.file;
        text += `## [${TYPE_LABEL[r.kind]}] ${r.docTitle}${r.section ? ` → ${r.section}` : ""}${r.heading ? ` → ${r.heading}` : ""}\n`;
        text += `*Source: ${source} | Relevance: ${r.score}*\n\n`;
        text += r.body.slice(0, 300);
        // The answer is often further down (an example's prose comes before
        // its code): quote the lines that match the query best, and the call
        // that returns the whole text
        const beyond = r.body.length > 300 ? matchingLines(r.body, 300, query, 3, 200) : [];
        if (beyond.length) {
          const full = r.kind === "example"
            ? `get_example(path: "${r.file}")`
            : r.heading
              ? `get_section(file: "${r.kind}/${r.file}", heading: ${JSON.stringify(r.heading)})`
              : `get_doc(path: "${r.kind === "skill" ? `skill/${r.file}` : r.file}")`;
          text += `\n\nMatching lines further on (full text: ${full}):\n` + beyond.map((l) => `> ${l}`).join("\n");
        }
        text += "\n\n---\n\n";
      }
      return { content: [{ type: "text", text: text + geodataHint(query) }] };
    }
  );

  // --- Tool: get_doc ---
  registerTool(
    "get_doc",
    {
      title: "Get doc page",
      description: "Get a full documentation page — an extended doc by path, or a skill file by 'skill/<name>'. Paths are the source labels that search_docs and search_all print.",
      inputSchema: {
        path: z.string().describe("Doc path, e.g. 'charts/xy-chart/cursor', 'concepts/events', 'getting-started/integrations/react', 'reference/xycursor' (per-class API), or a skill file such as 'skill/SKILL.md' / 'skill/xy'. A docs address works too ('https://docs.amcharts.com/v5/concepts/events/', its '.md', or the older www.amcharts.com/docs/v5/ form); a demo address returns that demo's example. A class's full settings and defaults are in its API reference (get_api_reference)."),
      },
      annotations: READ_ONLY,
    },
    async ({ path: docPath }) => {
      // A demo address: the demo's example
      const exampleKey = demoSlug(docPath) && resolveExample(docPath);
      if (exampleKey) return { content: [{ type: "text", text: `*(${echo(docPath)} is a demo: its example, as get_example returns it)*\n\n${exampleText(exampleKey)}` }] };
      const key = docPathFromInput(docPath);
      // Extended docs take precedence for bare paths; 'skill/…' always means the skill layer.
      const resolved = key.startsWith("skill/")
        ? resolveDoc(key)
        : (extendedDocs.has(key) ? { doc: extendedDocs.get(key), label: `extended/${key}` } : resolveDoc(key));
      if (!resolved) {
        const pointer = linkPointer(docPath);
        if (pointer) return { content: [{ type: "text", text: pointer }] };
        // List available top-level paths
        const paths = [...extendedDocs.keys()];
        const topLevel = [...new Set(paths.map(p => p.split("/")[0]))].sort();
        return {
          content: [{ type: "text", text: `Doc "${key}" not found.\n\nAvailable top-level sections: skill, ${topLevel.join(", ")}\n\nSkill files: ${[...docs.keys()].map(k => `skill/${k}`).join(", ")}\n\nUse search_all to find the right path.` }],
        };
      }
      const { doc, label } = resolved;
      return { content: [{ type: "text", text: `# ${doc.title}\n*(source: ${label}.md)*\n\n${withoutTitle(doc.content, doc.title)}` }] };
    }
  );

  // --- Tool: get_api_reference ---
  registerTool(
    "get_api_reference",
    {
      title: "Get API reference",
      description: "Get the per-class API reference for an amCharts 5 class: the class page plus its settings table (with defaults) and, optionally, its private/read-only settings. It is generated from the library's typings, so it has the exact setting names and default values (e.g. tooltip background cornerRadius, axis tick `visible` default). Takes a class name in any casing, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'AxisRendererX'.",
      inputSchema: {
        className: z.string().optional().describe("amCharts 5 class name, e.g. 'XYCursor', 'Tooltip', 'PieSeries', 'ColumnSeries', 'AxisRendererX'. Casing/punctuation are ignored. Its reference address works too: 'https://docs.amcharts.com/v5/reference/xycursor/'."),
        name: z.string().optional().describe("The same as `className`."),
        includePrivate: z.boolean().optional().default(false).describe("Also include the private (read-only / internal) settings table. Default false."),
      },
      annotations: READ_ONLY,
    },
    async ({ className: classArg, name: nameArg, includePrivate }) => {
      const className = firstGiven(classArg, nameArg);
      if (className == null) {
        return { content: [{ type: "text", text: `Name the class in \`className\`, e.g. "XYCursor". search_all finds the right class.` }], isError: true };
      }
      // Normalize: "XYCursor" / "xy-cursor" / "XY Cursor" → "xycursor"; an
      // address or path ("…/docs/v5/reference/xycursor/") gives its last part
      // and a namespaced name ("am5xy.XYChart") its class name
      const name = /\//.test(className) ? docPathFromInput(className).split("/").pop() : className.trim().replace(/^am5\w*\./i, "");
      const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");
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
  registerTool(
    "list_examples",
    {
      title: "List examples",
      description: "List all available amCharts 5 code examples, optionally filtered by category.",
      inputSchema: {
        category: z.string().optional().describe("Filter by category, e.g. 'column-bar', 'line-area', 'pie-donut', 'maps', 'flow', 'hierarchy', 'stock', 'gantt', 'gauges', 'radar-polar', 'timeline', 'funnel-pyramid', 'json-configs' (complete JSON configs from the amCharts npm package), or 'docs-demos' (the demos embedded in the docs pages). A word of a category works too ('gauge', 'line', 'pie'). Without it, all categories are listed."),
        type: z.string().optional().describe("The same as `category`."),
      },
      annotations: READ_ONLY,
    },
    async ({ category: categoryArg, type }) => {
      const category = firstGiven(categoryArg, type);
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

      const wanted = category.trim().toLowerCase();
      const allCats = [...new Set([...examples.values()].map(e => e.category))];
      // The category as named, or else the one with this word in its name
      // ("gauge" is gauges, "line" is line-area, "pie" is pie-donut)
      const word = singularOf(wanted.replace(/[\s_]+/g, "-").replace(/-(charts?|diagrams?|graphs?)$/, ""));
      const cat = allCats.find(c => c.toLowerCase() === wanted) ?? allCats.find(c => c.toLowerCase().split("-").some(p => singularOf(p) === word));
      const matching = [...examples.entries()]
        .filter(([, ex]) => ex.category === cat)
        .sort((a, b) => a[1].title.localeCompare(b[1].title));

      if (matching.length === 0) {
        const cats = [...new Set([...examples.values()].map(e => e.category))].sort();
        return { content: [{ type: "text", text: `No examples in category "${echo(category)}".\n\nAvailable: ${cats.join(", ")}` }] };
      }

      let text = `# ${matching[0][1].category} examples (${matching.length})\n\n`;
      for (const [key, ex] of matching) {
        text += `- **${ex.title}** — \`${key}\`\n`;
      }
      text += "\nUse get_example with the path to get the full code.";
      return { content: [{ type: "text", text }] };
    }
  );

  // --- Tool: get_example ---
  registerTool(
    "get_example",
    {
      title: "Get example",
      description: "Get the full code for a specific amCharts 5 example/demo, by its path or its amcharts.com demo address. Paths are listed by list_examples and printed in search results.",
      inputSchema: {
        path: z.string().optional().describe("Example path, e.g. 'examples/flow/sankey-diagram', 'examples/pie-donut/donut-chart', 'examples/maps/drill-down-map', or a demo address such as 'https://www.amcharts.com/demos/sankey-diagram/'"),
        name: z.string().optional().describe("The same as `path`, or a demo's name, e.g. 'sankey-diagram', 'stacked column'."),
      },
      annotations: READ_ONLY,
    },
    async ({ path: pathArg, name }) => {
      const exPath = firstGiven(pathArg, name);
      if (exPath == null) {
        return { content: [{ type: "text", text: `Name the example in \`path\`, e.g. "examples/flow/sankey-diagram". list_examples lists them; search_all finds them by what they show.` }], isError: true };
      }
      const key = resolveExample(exPath);
      if (!key) {
        // An address is answered by where it points, not by its last part
        // ("…/flow-charts/sankey-diagram/" is a docs page, not two examples)
        const isAddress = /:\/\/|amcharts\.com\//i.test(String(exPath ?? ""));
        const named = isAddress ? [] : examplesNamed(exPath);
        const pointer = linkPointer(exPath);
        // A demo's name in words ("stacked column"): that demo
        const demo = !isAddress && named.length <= 1 && !pointer ? demoNamed(String(exPath).replace(/^examples\//, "")) : null;
        if (demo) return { content: [{ type: "text", text: exampleWithNote(demo.key) }] };
        const words = isAddress ? "" : String(exPath).trim().replace(/^examples\//, "").replace(/[/_-]+/g, " ").trim();
        const hint = words ? `search_all(${JSON.stringify(echo(words))}) finds examples by what they show. ` : "";
        const text = named.length > 1
          ? `"${echo(exPath)}" names ${named.length} examples: ${named.map((k) => `\`${k}\``).join(", ")}. Use the full path.`
          : pointer || `Example "${echo(exPath)}" not found. ${hint}Use list_examples to browse available examples.`;
        return { content: [{ type: "text", text }] };
      }
      return { content: [{ type: "text", text: exampleWithNote(key) }] };
    }
  );

  // --- Tool: list_geodata ---
  registerTool(
    "list_geodata",
    {
      title: "List geodata (map files)",
      description: "List amCharts 5 geodata (map) files with each one's CDN path, script global name and ES module import: world maps, continents, every country map, regional packs (US states and counties, Canada, Mexico) and the US congressional-district packs, which are versioned per Congress (congressional120 = 120th Congress is the newest). Also the data/countries2 and lang/* helper files. It gives the exact file path and global name that map code needs. Where the geodata package has a dist/ folder, the answer also gives its unpkg address, for pages that may load only from npm CDNs.",
      inputSchema: {
        filter: z.string().optional().describe("Words that must all match (case-insensitive) a map's path, label, group, ISO code or pack, e.g. 'germany', 'FR', 'region/canada', 'usa counties', 'congressional120', 'congressional whole country', 'continents', 'countries2'. A file or global name ('usaCongressionalLow', 'am5geodata_worldLow') works too. Without it, the result is an overview."),
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
