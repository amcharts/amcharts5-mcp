import { spawn } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(fileURLToPath(import.meta.url));

const server = spawn("node", ["src/index.js"], {
  cwd: ROOT,
  stdio: ["pipe", "pipe", "pipe"],
});

let buffer = "";
server.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  // Each JSON-RPC response is a complete line
  const lines = buffer.split("\n");
  buffer = lines.pop(); // keep incomplete line in buffer
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const msg = JSON.parse(line);
      handleResponse(msg);
    } catch {}
  }
});

server.stderr.on("data", (chunk) => {
  process.stderr.write("[stderr] " + chunk.toString());
});

let step = 0;
const tests = [
  // Step 0: Initialize
  {
    send: { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0.0" } } },
    check: (r) => r.result?.serverInfo?.name === "amcharts5" ? "PASS" : "FAIL",
    label: "Initialize server",
  },
  // Step 1: List tools
  {
    send: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    check: (r) => r.result?.tools?.length === 12 ? `PASS (${r.result.tools.length} tools)` : `FAIL (${r.result?.tools?.length} tools)`,
    label: "List tools (expect 12)",
  },
  // Step 2: list_chart_types
  {
    send: { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "list_chart_types", arguments: {} } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("XY") && text.includes("Pie") && text.includes("Sankey") ? "PASS" : "FAIL";
    },
    label: "list_chart_types — contains XY, Pie, Sankey",
  },
  // Step 3: get_core_reference
  {
    send: { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_core_reference", arguments: {} } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Critical rules") && text.includes("Common pitfalls") ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_core_reference — returns SKILL.md content",
  },
  // Step 4: get_chart_reference for "sankey"
  {
    send: { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "sankey" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Sankey") || text.includes("Flow") ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_chart_reference('sankey') — returns flow docs",
  },
  // Step 5: get_chart_reference for unknown type
  {
    send: { jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "banana" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("No reference found") ? "PASS (graceful error)" : "FAIL";
    },
    label: "get_chart_reference('banana') — graceful error",
  },
  // Step 6: search_docs
  {
    send: { jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "search_docs", arguments: { query: "legend tooltip", maxResults: 3 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Search results") && text.includes("legend") ? `PASS (${(text.match(/---/g)||[]).length} results)` : "FAIL";
    },
    label: "search_docs('legend tooltip') — finds results",
  },
  // Step 7: get_section
  {
    send: { jsonrpc: "2.0", id: 8, method: "tools/call", params: { name: "get_section", arguments: { file: "SKILL", heading: "Common pitfalls" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Common pitfalls") && text.includes("CategoryAxis") ? "PASS" : "FAIL";
    },
    label: "get_section('SKILL', 'Common pitfalls') — returns section",
  },
  // Step 8: get_section not found
  {
    send: { jsonrpc: "2.0", id: 9, method: "tools/call", params: { name: "get_section", arguments: { file: "xy", heading: "nonexistent" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("not found") && text.includes("Available sections") ? "PASS (lists available)" : "FAIL";
    },
    label: "get_section('xy', 'nonexistent') — lists available sections",
  },
  // Step 9: get_quick_start
  {
    send: { jsonrpc: "2.0", id: 10, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "line", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Quick Start") && text.includes("import") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('line', 'esm') — returns template",
  },
  // Step 9b: get_quick_start esm emits real ES module imports, not CDN scripts
  {
    send: { jsonrpc: "2.0", id: 21, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "line", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('import * as am5') && !text.includes("<script") ? "PASS (ESM only)" : "FAIL";
    },
    label: "get_quick_start('line','esm') — ES module imports, no CDN",
  },
  // Step 9c: get_quick_start html emits CDN script tags
  {
    send: { jsonrpc: "2.0", id: 22, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "line", format: "html" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("<script src=") && !text.includes("import * as am5") ? "PASS (CDN only)" : "FAIL";
    },
    label: "get_quick_start('line','html') — CDN scripts, no ESM",
  },
  // Step 10: List resources
  {
    send: { jsonrpc: "2.0", id: 11, method: "resources/list", params: {} },
    check: (r) => {
      const count = r.result?.resources?.length || 0;
      return count >= 12 ? `PASS (${count} resources)` : `FAIL (${count} resources)`;
    },
    label: "List resources (expect 13 doc files)",
  },
  // Step 11: search_all
  {
    send: { jsonrpc: "2.0", id: 12, method: "tools/call", params: { name: "search_all", arguments: { query: "react integration", maxResults: 3 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Search results") && text.includes("react") ? "PASS" : "FAIL";
    },
    label: "search_all('react integration') — finds results",
  },
  // Step 12: get_doc
  {
    send: { jsonrpc: "2.0", id: 13, method: "tools/call", params: { name: "get_doc", arguments: { path: "concepts/events" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Events") || text.includes("event") ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_doc('concepts/events') — returns doc",
  },
  // Step 13: list_examples (all categories)
  {
    send: { jsonrpc: "2.0", id: 14, method: "tools/call", params: { name: "list_examples", arguments: {} } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("column-bar") && text.includes("Total:") ? "PASS" : "FAIL";
    },
    label: "list_examples() — lists categories",
  },
  // Step 14: list_examples (specific category)
  {
    send: { jsonrpc: "2.0", id: 15, method: "tools/call", params: { name: "list_examples", arguments: { category: "flow" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Sankey") || text.includes("sankey") ? "PASS" : "FAIL";
    },
    label: "list_examples('flow') — lists flow examples",
  },
  // Step 15: get_example
  {
    send: { jsonrpc: "2.0", id: 16, method: "tools/call", params: { name: "get_example", arguments: { path: "examples/flow/sankey-diagram" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Sankey") && text.includes("am5") ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_example('examples/flow/sankey-diagram') — returns code",
  },
  // Step 16: get_api_reference (normalization + settings/defaults)
  {
    send: { jsonrpc: "2.0", id: 17, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "XYCursor" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("XYCursor") && /settings/i.test(text) ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_api_reference('XYCursor') — class page + settings",
  },
  // Step 17: get_api_reference graceful not-found with suggestions
  {
    send: { jsonrpc: "2.0", id: 18, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "NotARealClass" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("No API reference found") ? "PASS (graceful error)" : "FAIL";
    },
    label: "get_api_reference('NotARealClass') — graceful error",
  },
  // Step 18: search_docs scope:'all' reaches the extended API reference / defaults
  // (use a setting name that only exists in extended/reference, not the skill).
  {
    send: { jsonrpc: "2.0", id: 19, method: "tools/call", params: { name: "search_docs", arguments: { query: "pointerBaseWidth", maxResults: 5, scope: "all" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Search results") && text.includes("extended/reference/") ? "PASS (reaches extended)" : "FAIL";
    },
    label: "search_docs('pointerBaseWidth', scope:all) — reaches extended reference",
  },
  // Step 19: search_docs default scope stays skill-only
  {
    send: { jsonrpc: "2.0", id: 20, method: "tools/call", params: { name: "search_docs", arguments: { query: "legend", maxResults: 3 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("scope: skill") && !text.includes("extended/") ? "PASS (skill-only)" : "FAIL";
    },
    label: "search_docs('legend') — default scope skill-only",
  },
  // Step 20: get_doc not-found lists the top-level sections it can serve,
  // including the API reference.
  {
    send: { jsonrpc: "2.0", id: 21, method: "tools/call", params: { name: "get_doc", arguments: { path: "no/such/doc" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const sections = (text.match(/Available top-level sections: ([^\n]+)/) || [])[1];
      if (!text.includes("not found") || !sections) return "FAIL (no graceful error)";
      return /\breference\b/.test(sections) ? "PASS (graceful error, lists sections)" : `FAIL (no reference section: ${sections})`;
    },
    label: "get_doc(bad path) — graceful error listing the top-level sections",
  },
  // Step 21: every page is loaded once. A second copy of a doc set under
  // extended/ (a stray generated reference once did this) shows up as the same
  // heading under two sources — or the same source twice.
  {
    send: { jsonrpc: "2.0", id: 22, method: "tools/call", params: { name: "search_all", arguments: { query: "tooltip pointer settings", maxResults: 40 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const hits = [...text.matchAll(/^## \[(\w+)\] (.+)\n\*Source: (\S+) \|/gm)].map(m => ({ title: m[2], source: m[3] }));
      if (!hits.length) return "FAIL (no results)";
      // The same page and heading twice. Different folders can hold pages
      // with the same file name (concepts/exporting, reference/exporting).
      const seen = new Set();
      for (const h of hits) {
        const key = `${h.source}|${h.title}`;
        if (seen.has(key)) return `FAIL (duplicate result: ${h.source} → ${h.title})`;
        seen.add(key);
      }
      return `PASS (${hits.length} distinct results)`;
    },
    label: "search_all — no duplicate results (each page loaded once)",
  },
  // Step 22: get_section accepts the source label exactly as search results
  // print it ("skill/SKILL.md"). Previously every such form was rejected, so a
  // truncated search result could not be expanded.
  {
    send: { jsonrpc: "2.0", id: 23, method: "tools/call", params: { name: "get_section", arguments: { file: "skill/SKILL.md", heading: "Recent API changes" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Recent API changes") && text.includes("5.20") ? "PASS (label resolves)" : "FAIL";
    },
    label: "get_section('skill/SKILL.md', 'Recent API changes') — search label resolves",
  },
  // Step 23: get_section also reaches extended docs by their path.
  {
    send: { jsonrpc: "2.0", id: 24, method: "tools/call", params: { name: "get_section", arguments: { file: "extended/concepts/events", heading: "Settings value change" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Settings value change") && text.includes("on(") ? "PASS (extended path resolves)" : "FAIL";
    },
    label: "get_section('extended/concepts/events', …) — extended path resolves",
  },
  // Step 24: get_doc exposes the skill corpus under 'skill/…'.
  {
    send: { jsonrpc: "2.0", id: 25, method: "tools/call", params: { name: "get_doc", arguments: { path: "skill/SKILL.md" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Critical rules") && text.includes("Common pitfalls") ? "PASS (skill via get_doc)" : "FAIL";
    },
    label: "get_doc('skill/SKILL.md') — skill corpus reachable",
  },
  // Step 25: a truncated search excerpt must say how to fetch the full section
  // and quote matching lines that fell beyond the cut. "Recent API changes" is
  // far longer than the excerpt budget; the bullet-inheritance line sits deep
  // inside it.
  {
    send: { jsonrpc: "2.0", id: 26, method: "tools/call", params: { name: "search_docs", arguments: { query: "bullet Graphics with no paint of its own", maxResults: 5 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("(truncated")) return "FAIL (nothing truncated — budget or fixture changed?)";
      if (!/get_section\(file: "skill\/[^"]+", heading: "[^"]+"\)/.test(text)) return "FAIL (no fetch hint)";
      if (!text.includes("Matching lines beyond the excerpt")) return "FAIL (matching lines not quoted)";
      return "PASS (fetch hint + matching lines)";
    },
    label: "search_docs — truncated excerpt carries fetch hint and matching lines",
  },
  // Step 26: the reference is generated from the installed package, so a class
  // added in 5.21.0 has its settings.
  {
    send: { jsonrpc: "2.0", id: 27, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "NightSeries" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("**twilightSteps**") ? "PASS (NightSeries settings)" : "FAIL (no twilightSteps)";
    },
    label: "get_api_reference('NightSeries') — new 5.21.0 class has its settings",
  },
  // Step 27: defaults follow the theme, including block-form rules on the class
  // (`const rule = r("Label"); rule.setAll({ paddingTop: 8, … })`), which win
  // over IContainerSettings' own default.
  {
    send: { jsonrpc: "2.0", id: 28, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "Label" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /\*\*paddingTop\*\* \(`number`\) — default `8` _\(theme\)_/.test(text) ? "PASS (paddingTop 8 from theme)" : "FAIL (Label paddingTop default not 8)";
    },
    label: "get_api_reference('Label') — paddingTop default 8 from the theme",
  },
  // Step 28: names-only inherited lists stay out of search, so the page that
  // declares a setting is the first reference hit (not every settings page).
  {
    send: { jsonrpc: "2.0", id: 29, method: "tools/call", params: { name: "search_docs", arguments: { query: "autoAppear", maxResults: 50, scope: "all" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const first = (text.match(/source: extended\/reference\/([^.]+)\.md/) || [])[1];
      return first === "ispritesettings" ? "PASS (ispritesettings first)" : `FAIL (first reference hit: ${first})`;
    },
    label: "search_docs('autoAppear', scope:all) — declaring page is the first reference hit",
  },
  // Step 29: an interface that is not a class's settings (and not exported by
  // name) still resolves.
  {
    send: { jsonrpc: "2.0", id: 30, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "IDeclaredAnimation" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (text.includes("No API reference found")) return "FAIL (not found)";
      return text.includes("IDeclaredAnimation") && text.includes("**loops**") ? "PASS (resolves)" : "FAIL (unexpected content)";
    },
    label: "get_api_reference('IDeclaredAnimation') — resolves",
  },
  // Steps 30–34: search ranking. Queries real users asked, each with the page
  // that answers it. Before the shared BM25 ranking these ranked 36th, 5th
  // (after four generic sections), 1st and 4th (after three skill sections).
  // An identifier from an example's code (strokeSettings) must pin the example.
  {
    send: { jsonrpc: "2.0", id: 31, method: "tools/call", params: { name: "search_all", arguments: { query: "line series change color of line segments via data strokeSettings", maxResults: 10 } } },
    check: (r) => searchRank(r, /^examples\/line-area\/line-with-changing-color$/, 3),
    label: "search_all(strokeSettings segments) — exact example in the top 3",
  },
  {
    send: { jsonrpc: "2.0", id: 32, method: "tools/call", params: { name: "search_all", arguments: { query: "draggable playhead on date axis", maxResults: 10 } } },
    check: (r) => searchRank(r, /^examples\/line-area\/line-chart-with-range-slider$/, 5),
    label: "search_all('draggable playhead on date axis') — range-slider example in the top 5",
  },
  {
    send: { jsonrpc: "2.0", id: 33, method: "tools/call", params: { name: "search_all", arguments: { query: "pixel map dots", maxResults: 10 } } },
    check: (r) => searchRank(r, /^examples\/maps\/pixel-map$/, 3),
    label: "search_all('pixel map dots') — pixel-map example in the top 3",
  },
  {
    send: { jsonrpc: "2.0", id: 34, method: "tools/call", params: { name: "search_all", arguments: { query: "PixelMapSeries", maxResults: 10 } } },
    check: (r) => searchRank(r, /^(reference\/pixelmapseries|reference\/ipixelmapseriessettings|charts\/map-chart\/pixel-map-series)$/, 1),
    label: "search_all('PixelMapSeries') — class reference or docs page first",
  },
  // search_docs scope:'all' reaches examples too, and points at get_example.
  {
    send: { jsonrpc: "2.0", id: 35, method: "tools/call", params: { name: "search_docs", arguments: { query: "line series segment color from data strokeSettings templateField", maxResults: 3, scope: "all" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("source: examples/line-area/line-with-changing-color.md")) return "FAIL (example not in the top 3)";
      return text.includes('get_example(path: "examples/line-area/line-with-changing-color")') ? "PASS (example + get_example hint)" : "FAIL (no get_example hint)";
    },
    label: "search_docs(scope:all) — finds the example and points at get_example",
  },
  // Steps 35–36: list_geodata. The US congressional packs are versioned per
  // Congress and the folder names don't say which; the newest must be found.
  {
    send: { jsonrpc: "2.0", id: 36, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "congressional120 whole country" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const want = [
        "geodata/region/usa/congressional120/usaCongressionalLow.js",
        "am5geodata_region_usa_congressional120_usaCongressionalLow",
        "@amcharts/amcharts5-geodata/region/usa/congressional120/usaCongressionalLow",
        "120th Congress",
      ];
      const missing = want.filter(w => !text.includes(w));
      return missing.length ? `FAIL (missing ${missing.join(", ")})` : "PASS (CDN path, global, ESM, Congress)";
    },
    label: "list_geodata('congressional120 whole country') — path, global name, import",
  },
  {
    send: { jsonrpc: "2.0", id: 37, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "congressional" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!/more, refine the filter/.test(text)) return "FAIL (not capped)";
      const packs = ["congressional120/", "congressional2025/", "congressional2022/", "congressional/"].filter(p => text.includes(`region/usa/${p}`));
      if (packs.length !== 4) return `FAIL (packs listed: ${packs.join(", ")})`;
      // The newest pack's whole-country map comes first.
      const first = (text.match(/^- \*\*(\S+)\*\*/m) || [])[1];
      return first === "region/usa/congressional120/usaCongressional" ? "PASS (capped, 4 packs, newest first)" : `FAIL (first entry: ${first})`;
    },
    label: "list_geodata('congressional') — capped, all four packs, newest first",
  },
];

// Rank of the first search_all result whose source matches `want`; PASS if
// it is within `within`.
function searchRank(r, want, within) {
  const text = r.result?.content?.[0]?.text || "";
  const sources = [...text.matchAll(/\*Source: (\S+) \| Relevance/g)].map(m => m[1]);
  const rank = sources.findIndex(s => want.test(s)) + 1;
  if (!rank) return `FAIL (not in the top ${sources.length}: ${sources.slice(0, 3).join(", ")})`;
  return rank <= within ? `PASS (rank ${rank})` : `FAIL (rank ${rank}, want ≤ ${within})`;
}

let failed = 0;

function handleResponse(msg) {
  if (step >= tests.length) return;
  const test = tests[step];
  const result = test.check(msg);
  const passed = result.startsWith("PASS");
  if (!passed) failed++;
  console.log(`${passed ? "✓" : "✗"} Test ${step + 1}/${tests.length}: ${test.label} → ${result}`);
  step++;
  if (step < tests.length) {
    sendNext();
  } else {
    server.kill();
    if (failed > 0) {
      console.error(`\n${failed} of ${tests.length} tests FAILED.`);
      process.exit(1);
    }
    console.log(`\nAll ${tests.length} tests passed.`);
    process.exit(0);
  }
}

function sendNext() {
  const test = tests[step];
  server.stdin.write(JSON.stringify(test.send) + "\n");
}

// Start
sendNext();

// Timeout. Generous: the first search builds the ranking index (about a
// second on an idle machine, several on a loaded CI runner).
setTimeout(() => {
  console.error(`\nTimeout — stuck at test ${step + 1}/${tests.length}: ${tests[step]?.label}`);
  server.kill();
  process.exit(1);
}, 60000);
