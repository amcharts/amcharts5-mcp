import { spawn } from "child_process";
import { readFileSync, readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { rejectBrokenJson } from "./cloudflare/sse-guard.js";
import { rejectUnknownSession } from "./cloudflare/session-guard.js";
import { serveStatelessMcp } from "./cloudflare/stateless-mcp.js";
import { TOOL_NAMES, appOf } from "./cloudflare/usage.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadContentFromDisk } from "./src/content-fs.js";
import { registerTools, serverInfo, SERVER_INSTRUCTIONS } from "./src/tools.js";

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

// The hosted server's answer to broken JSON on the legacy SSE endpoint
const sseMessage = new Request("https://mcp.test/sse/message", { method: "POST", body: "SECRETWORD payroll" });
const brokenJson = await rejectBrokenJson(sseMessage, () => sseMessage.json()).catch(e => new Response(e.message, { status: 500 }));
const brokenJsonText = await brokenJson.text();
const otherError = await rejectBrokenJson(sseMessage, () => { throw new Error("other"); }).catch(e => e.message);
const otherRoute = await rejectBrokenJson(new Request("https://mcp.test/sse"), () => { throw new SyntaxError("other route"); }).catch(e => e.message);
const guardInRoute = /rejectBrokenJson\(request, \(\) => AmCharts5MCP\.serveSSE\("\/sse"\)/.test(readFileSync(`${ROOT}/cloudflare/index.js`, "utf8"));

// The hosted server's answer to a session ID it never issued
const sessionGuard = (path, method, headers = {}) => {
  const url = new URL(`https://mcp.test${path}`);
  return rejectUnknownSession(new Request(url, { method, headers }), url, { idFromString: (id) => { if (id !== "issued") throw new TypeError("invalid"); } });
};
const madeUpIds = [sessionGuard("/sse/message?sessionId=made-up", "POST"), sessionGuard("/sse?sessionId=made-up", "GET")];
const otherSessionRequests = [
  sessionGuard("/sse", "GET"), sessionGuard("/sse/message?sessionId=issued", "POST"), sessionGuard("/sse/message?sessionId=made-up", "OPTIONS"),
];
const workerSource = readFileSync(`${ROOT}/cloudflare/index.js`, "utf8");
const sessionGuardRoutes = workerSource.match(/return rejectUnknownSession\(request, url, env\.MCP_OBJECT\) \|\| /g)?.length;

// The hosted /mcp: no sessions, a server per request
const hostedContent = loadContentFromDisk();
const hostedServer = () => {
  const server = new McpServer(serverInfo("0"), { instructions: SERVER_INSTRUCTIONS });
  registerTools(server, hostedContent);
  return server;
};
const hosted = async (method, body, headers = {}, createServer = hostedServer) => {
  const response = await serveStatelessMcp(new Request("https://mcp.test/mcp", {
    method,
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...headers },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  }), createServer);
  const text = await response.text();
  let json = null;
  try { json = JSON.parse(text); } catch {}
  return { status: response.status, headers: response.headers, text, json };
};
const hostedCall = { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "pie" } } };
const hostedInit = await hosted("POST", { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } } });
const hostedNoInit = await hosted("POST", hostedCall, { "mcp-protocol-version": "2025-06-18" });
const hostedOldId = await hosted("POST", hostedCall, { "mcp-protocol-version": "2025-06-18", "mcp-session-id": "f".repeat(64) });
const hostedGet = await hosted("GET", undefined, { "mcp-session-id": "f".repeat(64) });
const hostedDelete = await hosted("DELETE", undefined, { "mcp-session-id": "f".repeat(64) });
const hostedPreflight = await hosted("OPTIONS");
const hostedBroken = await hosted("POST", "SECRETWORD payroll");
const hostedLogged = [];
const consoleError = console.error;
console.error = (...args) => hostedLogged.push(args.join(" "));
const hostedFailure = await hosted("POST", hostedCall, {}, () => { throw new Error("SECRETWORD"); });
console.error = consoleError;

// Version pins in everything the server serves match the library this repo is pinned to
const libraryVersion = JSON.parse(readFileSync(`${ROOT}/node_modules/@amcharts/amcharts5/package.json`, "utf8")).version;
const servedFiles = ["extended", "amcharts5-skill/amcharts5-skill"].flatMap(dir =>
  readdirSync(`${ROOT}/${dir}`, { recursive: true }).filter(f => /\.(md|json)$/.test(String(f))).map(f => `${ROOT}/${dir}/${f}`));
const servedTexts = [...servedFiles, `${ROOT}/amcharts5-skill/cursorrules`].map(file => ({ file: file.slice(ROOT.length + 1), text: readFileSync(file, "utf8") }));
const stalePins = servedTexts.flatMap(({ file, text }) => [
  ...text.matchAll(/(?:@amcharts\/amcharts5@|ajax\/libs\/amcharts5\/|cdn\.amcharts\.com\/lib\/version\/)(\d+\.\d+\.\d+)/g),
  ...(/SKILL\.md$|cursorrules$/.test(file) ? text.matchAll(/(?:Latest release covered here: \*\*|New in )(\d+\.\d+\.\d+)/g) : []),
].filter(m => m[1] !== libraryVersion).map(m => `${file}: ${m[1]}`));
const geodataPins = new Set(servedTexts.flatMap(({ text }) => [...text.matchAll(/@amcharts\/amcharts5-geodata@(\d+\.\d+\.\d+)/g)].map(m => m[1])));
const toolsSource = readFileSync(`${ROOT}/src/tools.js`, "utf8");

// The hosted server's usage counts: fixed labels only
const usageRows = [];
const counted = async (body, userAgent, dataset = { writeDataPoint: (row) => usageRows.push(row) }) => {
  const response = await serveStatelessMcp(new Request("https://mcp.test/mcp", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream", "mcp-protocol-version": "2025-06-18", "user-agent": userAgent },
    body: JSON.stringify(body),
  }), hostedServer, dataset);
  await response.text();
  return response.status;
};
const initializeAs = (name) => ({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name, version: "1" } } });
await counted(initializeAs("claude-code SECRETWORD"), "SECRETWORD");
await counted({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "search_all", arguments: { query: "SECRETWORD" } } }, "ChatGPT SECRETWORD");
await counted({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "SECRETWORD", arguments: {} } }, "cursor-vscode/1.0");
await counted({ jsonrpc: "2.0", id: 4, method: "tools/list" }, "claude-code");
const oddClientName = await counted(initializeAs({ toString: 1 }), "x");
const usageDown = await counted(hostedCall, "claude-code", { writeDataPoint() { throw new Error("down"); } });
const registeredTools = [...toolsSource.matchAll(/registerTool\(\s*"([a-z_]+)"/g)].map(m => m[1]);
const cancelledBatch = await hosted("POST", [hostedCall, { jsonrpc: "2.0", method: "notifications/cancelled", params: { requestId: 2 } }], { "mcp-protocol-version": "2025-03-26" });
const cancelWithId = await hosted("POST", { jsonrpc: "2.0", id: 7, method: "notifications/cancelled", params: { requestId: 1 } }, { "mcp-protocol-version": "2025-03-26" });

let step = 0;
const tests = [
  // Step 0: Initialize
  {
    send: { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0.0" } } },
    check: (r) => {
      const s = r.result?.serverInfo || {};
      const told = r.result?.instructions || "";
      return s.name === "amcharts5" && s.title === "amCharts 5" && s.websiteUrl && s.description && s.icons?.[0]?.src === "https://mcp.amcharts.com/icon.png"
        && told.includes("get_quick_start") && told.includes("don't apply to other chart libraries") && told.length < 1200
        ? "PASS" : `FAIL (${JSON.stringify(s)}; instructions: ${told.length} chars)`;
    },
    label: "Initialize server (name, title, description, website, icon, short instructions)",
  },
  // Step 1: List tools
  {
    send: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    check: (r) => {
      const tools = r.result?.tools || [];
      // Directories read the display name from `title` or `annotations.title`
      const titled = tools.filter((t) => t.title && t.annotations?.title === t.title && t.annotations.readOnlyHint === true);
      return tools.length === 12 && titled.length === 12 ? `PASS (12 tools, all titled)` : `FAIL (${tools.length} tools, ${titled.length} titled)`;
    },
    label: "List tools (expect 12, each with title and annotations.title)",
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
  // Step 9d: the esm quick start points to the framework packages; html does not
  {
    send: { jsonrpc: "2.0", id: 40, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "pie", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("@amcharts/amcharts5-react") && text.includes("useAmChart((root)") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('pie','esm') — framework package note",
  },
  {
    send: { jsonrpc: "2.0", id: 41, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "pie", format: "html" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("Quick Start") && !text.includes("useAmChart") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('pie','html') — no framework note",
  },
  // Step 9f: amcharts.com addresses work where a doc path or example path goes
  // (the docs moved to docs.amcharts.com in October 2026; old addresses still work)
  {
    send: { jsonrpc: "2.0", id: 44, method: "tools/call", params: { name: "get_doc", arguments: { path: "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Formatting dates") ? "PASS" : "FAIL",
    label: "get_doc(old amcharts.com/docs URL)",
  },
  {
    send: { jsonrpc: "2.0", id: 60, method: "tools/call", params: { name: "get_doc", arguments: { path: "https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/#date-formats" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Formatting dates") ? "PASS" : "FAIL",
    label: "get_doc(docs.amcharts.com URL with an anchor)",
  },
  {
    send: { jsonrpc: "2.0", id: 61, method: "tools/call", params: { name: "get_doc", arguments: { path: "https://docs.amcharts.com/v5/concepts/events.md" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Events") ? "PASS" : "FAIL",
    label: "get_doc(docs.amcharts.com Markdown URL)",
  },
  {
    send: { jsonrpc: "2.0", id: 62, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "https://docs.amcharts.com/v5/reference/xycursor/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# XYCursor") ? "PASS" : "FAIL",
    label: "get_api_reference(docs.amcharts.com reference URL)",
  },
  // Pasted amcharts.com links: each tool a model may try points at the call that has it
  {
    send: { jsonrpc: "2.0", id: 63, method: "tools/call", params: { name: "search_all", arguments: { query: "https://www.amcharts.com/demos/sankey-diagram/" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('get_example(path: "examples/flow/sankey-diagram")') && !text.includes("# Search results") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "search_all(a demo address) → its example",
  },
  {
    send: { jsonrpc: "2.0", id: 64, method: "tools/call", params: { name: "search_all", arguments: { query: "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('get_section(file: "extended/charts/xy-chart/axes/date-axis", heading: "Date formats")') ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "search_all(an old docs address with a section) → get_section",
  },
  {
    send: { jsonrpc: "2.0", id: 65, method: "tools/call", params: { name: "search_docs", arguments: { query: "https://docs.amcharts.com/v5/reference/xycursor/ line color", scope: "all" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("> ") && text.includes('get_api_reference(className: "xycursor")') && text.includes('# Search results for "line color"') ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "search_docs(a reference address and words) → pointer, then results for the words",
  },
  {
    send: { jsonrpc: "2.0", id: 66, method: "tools/call", params: { name: "get_doc", arguments: { path: "https://www.amcharts.com/demos/sankey-diagram/" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("# Sankey Diagram") && text.includes("```") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_doc(a demo address) → the demo's example",
  },
  {
    send: { jsonrpc: "2.0", id: 67, method: "tools/call", params: { name: "get_example", arguments: { path: "https://www.amcharts.com/demos-v4/sankey-diagram-v4/" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("amCharts 4 demo") && text.includes('get_example(path: "examples/flow/sankey-diagram")') ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "get_example(an amCharts 4 demo address) → its amCharts 5 version",
  },
  {
    send: { jsonrpc: "2.0", id: 68, method: "tools/call", params: { name: "get_example", arguments: { path: "https://docs.amcharts.com/v5/charts/map-chart/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").includes('get_doc(path: "extended/charts/map-chart")') ? "PASS" : "FAIL",
    label: "get_example(a docs address) → get_doc",
  },
  {
    send: { jsonrpc: "2.0", id: 69, method: "tools/call", params: { name: "get_example", arguments: { path: "https://www.amcharts.com/demos/rotating-moon/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Rotating Moon") ? "PASS" : "FAIL",
    label: "get_example(one of the demos added in 1.9.4)",
  },
  {
    send: { jsonrpc: "2.0", id: 70, method: "tools/call", params: { name: "search_all", arguments: { query: "I load https://cdn.amcharts.com/lib/5/index.js and want `https://docs.amcharts.com/v5/concepts/events/`" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").includes('https://docs.amcharts.com/v5/concepts/events/ is the docs page "Events": get_doc(path: "extended/concepts/events")') ? "PASS" : `FAIL (${(r.result?.content?.[0]?.text || "").slice(0, 160)})`,
    label: "search_all(a CDN link, then a docs link in backticks) → the docs link's pointer",
  },
  {
    send: { jsonrpc: "2.0", id: 71, method: "tools/call", params: { name: "get_example", arguments: { path: "https://docs.amcharts.com/v5/concepts/no-such-page/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").includes("a docs page this server doesn't have") ? "PASS" : "FAIL",
    label: "get_example(a docs page the server lacks) → says so",
  },
  {
    send: { jsonrpc: "2.0", id: 45, method: "tools/call", params: { name: "get_doc", arguments: { path: "/docs/v5/concepts/events/#Global_events" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Events") ? "PASS" : "FAIL",
    label: "get_doc(site path with docs/v5 and an anchor)",
  },
  {
    send: { jsonrpc: "2.0", id: 46, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "https://www.amcharts.com/docs/v5/reference/xycursor/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# XYCursor") ? "PASS" : "FAIL",
    label: "get_api_reference(reference page URL)",
  },
  {
    send: { jsonrpc: "2.0", id: 47, method: "tools/call", params: { name: "get_example", arguments: { path: "https://www.amcharts.com/demos/sankey-diagram/" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Sankey Diagram\n") ? "PASS" : "FAIL",
    label: "get_example(demo page URL)",
  },
  {
    send: { jsonrpc: "2.0", id: 48, method: "tools/call", params: { name: "get_example", arguments: { path: "flow/sankey-diagram" } } },
    check: (r) => (r.result?.content?.[0]?.text || "").startsWith("# Sankey Diagram\n") ? "PASS" : "FAIL",
    label: "get_example(path without examples/)",
  },
  // Step 9g: the npm package's JSON configs are served as examples
  {
    send: { jsonrpc: "2.0", id: 49, method: "tools/call", params: { name: "get_example", arguments: { path: "examples/json-configs/flow-sankey" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const json = /```json\n([\s\S]*?)\n```/.exec(text);
      let type = "";
      try { type = JSON.parse(json[1]).type; } catch {}
      return type && text.includes("plugins/json.js") ? `PASS (type ${type})` : "FAIL";
    },
    label: "get_example(json-configs/flow-sankey) — a parseable config with its scripts",
  },
  {
    send: { jsonrpc: "2.0", id: 50, method: "tools/call", params: { name: "list_examples", arguments: { category: "json-configs" } } },
    check: (r) => {
      const m = /json-configs examples \((\d+)\)/.exec(r.result?.content?.[0]?.text || "");
      return m && Number(m[1]) >= 60 ? `PASS (${m[1]} configs)` : "FAIL";
    },
    label: "list_examples('json-configs') — the npm package's configs",
  },
  // Step 9h: the skill's JSON config reference, reachable by chart type and by search
  {
    send: { jsonrpc: "2.0", id: 51, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "json" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      // an overview: the rules in full, the complete configs and maps listed
      return text.startsWith("# JSON Configs") && text.includes("### 1. Every amCharts object") && text.includes('- "Complete configs"') && text.includes('- "Maps"') ? "PASS" : "FAIL";
    },
    label: "get_chart_reference('json') — the JSON config reference (overview)",
  },
  {
    send: { jsonrpc: "2.0", id: 52, method: "tools/call", params: { name: "search_all", arguments: { query: "amCharts JSON config", maxResults: 5 } } },
    check: (r) => {
      const first = ((r.result?.content?.[0]?.text || "").split("\n").find((l) => l.startsWith("## ")) || "");
      return first.includes("[skill] JSON Configs") ? "PASS (JSON reference first)" : `FAIL (first: ${first})`;
    },
    label: "search_all('amCharts JSON config') — the JSON reference ranks first, not the 62 configs",
  },
  // Step 9e: the framework docs and the skill's Frameworks section are served
  {
    send: { jsonrpc: "2.0", id: 42, method: "tools/call", params: { name: "get_doc", arguments: { path: "getting-started/integrations/react-native" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("@amcharts/amcharts5-react-native") && /\|\s*`licenses`\s*\|/.test(text) ? "PASS" : "FAIL";
    },
    label: "get_doc('getting-started/integrations/react-native') — new page, props table",
  },
  {
    send: { jsonrpc: "2.0", id: 43, method: "tools/call", params: { name: "get_section", arguments: { file: "SKILL", heading: "Frameworks" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("attachAmChart") && text.includes("AmChartDirective") ? "PASS" : "FAIL";
    },
    label: "get_section('SKILL', 'Frameworks') — framework packages",
  },
  // Step 10: List resources
  {
    send: { jsonrpc: "2.0", id: 11, method: "resources/list", params: {} },
    check: (r) => {
      const count = r.result?.resources?.length || 0;
      return count >= 12 ? `PASS (${count} resources)` : `FAIL (${count} resources)`;
    },
    label: "List resources (expect 14 doc files)",
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
      return text.includes("Recent API changes") && text.includes("Latest release covered here") ? "PASS (label resolves)" : "FAIL";
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
  // Long references come as an overview; get_section returns the parts left out
  {
    send: { jsonrpc: "2.0", id: 53, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "map" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("## Not shown in this overview")) return `FAIL (no overview, ${text.length} chars)`;
      if (text.length > 16000) return `FAIL (${text.length} chars)`;
      return text.includes("## Core setup") && text.includes('- "Globe (orthographic projection)"') ? `PASS (${text.length} chars)` : "FAIL (core setup shown / globe listed)";
    },
    label: "get_chart_reference('map') — an overview with the rest listed",
  },
  {
    send: { jsonrpc: "2.0", id: 54, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "map", full: true } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.length > 60000 && !text.includes("## Not shown in this overview") ? `PASS (${text.length} chars)` : `FAIL (${text.length} chars)`;
    },
    label: "get_chart_reference('map', full: true) — the whole file",
  },
  {
    send: { jsonrpc: "2.0", id: 55, method: "tools/call", params: { name: "get_section", arguments: { file: "map", heading: "MapLineSeries" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# MapLineSeries") && text.includes('in "Series types"') && text.length < 4000 ? `PASS (${text.length} chars)` : `FAIL (${text.slice(0, 80)})`;
    },
    label: "get_section('map', 'MapLineSeries') — a ### subsection on its own",
  },
  {
    send: { jsonrpc: "2.0", id: 56, method: "tools/call", params: { name: "get_section", arguments: { file: "map", heading: "Series types" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Series types") && text.includes("### MapLineSeries") ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_section('map', 'Series types') — a ## heading still returns the whole section",
  },
  {
    send: { jsonrpc: "2.0", id: 57, method: "tools/call", params: { name: "get_core_reference", arguments: {} } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.length < 16000 && text.includes("## Critical rules") && text.includes('- "Common pitfalls"') ? `PASS (${text.length} chars)` : `FAIL (${text.length} chars)`;
    },
    label: "get_core_reference — an overview, Common pitfalls listed",
  },
  {
    send: { jsonrpc: "2.0", id: 58, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "venn" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return !text.includes("## Not shown in this overview") && text.length > 9000 ? `PASS (whole, ${text.length} chars)` : `FAIL (${text.length} chars)`;
    },
    label: "get_chart_reference('venn') — a short reference comes whole",
  },
  {
    send: { jsonrpc: "2.0", id: 59, method: "tools/call", params: { name: "get_section", arguments: { file: "json", heading: "Complete configs" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('"type": "PieChart"') && text.includes('"type": "Sankey"') ? `PASS (${text.length} chars)` : "FAIL";
    },
    label: "get_section('json', 'Complete configs') — the configs the overview lists",
  },
  // Step 15: queries that failed AI agents in a blind benchmark (2026-11),
  // each with the section that answers it
  {
    send: { jsonrpc: "2.0", id: 72, method: "tools/call", params: { name: "search_docs", arguments: { query: "map polygon tooltip for countries without data, heat legend start end value labels", maxResults: 4 } } },
    check: (r) => skillRank(r, /^## .* → Choropleth \(heat map\) via heat rules$/, 1),
    label: "search_docs(no-data tooltips, heat legend labels) → map.md Choropleth first",
  },
  {
    send: { jsonrpc: "2.0", id: 73, method: "tools/call", params: { name: "search_docs", arguments: { query: "parent header label", maxResults: 4 } } },
    check: (r) => skillRank(r, /^## .* → Treemap$/, 1),
    label: "search_docs('parent header label') → the treemap's group headers",
  },
  {
    send: { jsonrpc: "2.0", id: 74, method: "tools/call", params: { name: "search_all", arguments: { query: "legend value without cursor legendRangeValueText valueYClose", maxResults: 5 } } },
    check: (r) => searchRank(r, /^skill\/xy$/, 1),
    label: "search_all(legend value without a cursor) → xy.md Legend first",
  },
  {
    send: { jsonrpc: "2.0", id: 75, method: "tools/call", params: { name: "search_all", arguments: { query: "number format examples numberFormat formatNumber", maxResults: 5 } } },
    check: (r) => searchRank(r, /^(skill\/SKILL|concepts\/formatters\/formatting-numbers)$/, 2),
    label: "search_all(number format examples) → Number formats or the formatting-numbers page",
  },
  {
    send: { jsonrpc: "2.0", id: 76, method: "tools/call", params: { name: "search_all", arguments: { query: "axis value to pixel coordinate", maxResults: 5 } } },
    check: (r) => searchRank(r, /^skill\/xy$/, 1),
    label: "search_all('axis value to pixel coordinate') → xy.md Value to pixel",
  },
  {
    send: { jsonrpc: "2.0", id: 77, method: "tools/call", params: { name: "search_all", arguments: { query: "candlestick legend valueYClose calculateAggregates", maxResults: 3 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /Matching lines further on \(full text: get_(example|section)\(/.test(text) ? "PASS" : "FAIL (no matching lines past the excerpt)";
    },
    label: "search_all — quotes the matching lines past a result's excerpt",
  },
  {
    send: { jsonrpc: "2.0", id: 78, method: "tools/call", params: { name: "search_docs", arguments: { query: "disable axis zoom animation interpolationDuration", maxResults: 3 } } },
    check: (r) => skillRank(r, /^## .* → Performance: big data, fast updates, no animation$/, 1),
    label: "search_docs(disable axis zoom animation) → SKILL.md Performance",
  },
  {
    send: { jsonrpc: "2.0", id: 79, method: "tools/call", params: { name: "search_all", arguments: { query: "performance tips big data disable animations", maxResults: 5 } } },
    check: (r) => searchRank(r, /^skill\/SKILL$/, 1),
    label: "search_all('performance tips big data disable animations') → SKILL.md Performance",
  },
  {
    send: { jsonrpc: "2.0", id: 80, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "xy", format: "html" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("https://cdn.amcharts.com/lib/5/xy.js") && text.includes("cdn.jsdelivr.net/npm/@amcharts/amcharts5@") ? "PASS" : "FAIL (no npm-CDN pointer)";
    },
    label: "get_quick_start('xy', html) — the amCharts CDN tags and the npm-CDN pointer",
  },
  {
    send: { jsonrpc: "2.0", id: 81, method: "tools/call", params: { name: "search_all", arguments: { query: "number format rounding", maxResults: 3 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      // Each result: its excerpt, then "Matching lines further on". No quote may repeat the excerpt.
      const repeats = text.split("\n---\n").filter((block) => {
        const [excerpt, quotes] = block.split("Matching lines further on");
        if (!quotes) return false;
        return quotes.split("\n").some((l) => l.startsWith("> ") && l.length > 40 && excerpt.includes(l.slice(2, 60).replace(/^…/, "")));
      });
      return repeats.length ? `FAIL (${repeats.length} result(s) quote text the excerpt shows)` : "PASS";
    },
    label: "search_all — the quoted lines don't repeat the excerpt",
  },
  // From amcharts-d3-b3's audit of the tools (2026-11-15)
  {
    send: { jsonrpc: "2.0", id: 82, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "funnel", format: "html" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Funnel chart") && text.includes("<!DOCTYPE html>") && text.includes("cdn.jsdelivr.net/npm/@amcharts/amcharts5@") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('funnel', html) — the funnel example page, with the npm-CDN pointer",
  },
  {
    send: { jsonrpc: "2.0", id: 83, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "xy", format: "html" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return !text.includes("/* axis */") && text.includes("am5xy.XYChart.new") && text.includes('<div id="chartdiv">') ? "PASS" : "FAIL (a skeleton, not a runnable page)";
    },
    label: "get_quick_start('xy', html) — a runnable page, not the /* axis */ skeleton",
  },
  {
    send: { jsonrpc: "2.0", id: 84, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "treemap", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("import * as am5hierarchy") && text.includes("am5hierarchy.Treemap.new") && !text.includes("<script") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('treemap', esm) — the example's code under ES module imports",
  },
  {
    send: { jsonrpc: "2.0", id: 85, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "US map", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('import am5geodata_usaLow from "@amcharts/amcharts5-geodata/usaLow";') && text.includes("am5geodata_usaLow") ? "PASS" : "FAIL";
    },
    label: "get_quick_start('US map', esm) — imports the geodata its example uses",
  },
  {
    send: { jsonrpc: "2.0", id: 86, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "usaLow" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("1 match") && text.includes("am5geodata_usaLow") ? "PASS" : "FAIL";
    },
    label: "list_geodata('usaLow') — the one map, though the name is short",
  },
  {
    send: { jsonrpc: "2.0", id: 87, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "am5xy.XYChart" } } },
    check: (r) => ((r.result?.content?.[0]?.text || "").startsWith("# XYChart") ? "PASS" : "FAIL"),
    label: "get_api_reference('am5xy.XYChart') — a namespaced name",
  },
  {
    send: { jsonrpc: "2.0", id: 88, method: "tools/call", params: { name: "get_section", arguments: { file: "SKILL", heading: "Plain HTML, no bundler" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Plain HTML, no bundler") && text.includes("cdn.jsdelivr.net/npm/@amcharts/amcharts5@") && !text.includes("**Bundling.**") ? "PASS" : "FAIL";
    },
    label: "get_section('SKILL', 'Plain HTML, no bundler') — a bold lead, up to the next one",
  },
  {
    send: { jsonrpc: "2.0", id: 89, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: " Word Cloud " } } },
    check: (r) => ((r.result?.content?.[0]?.text || "").startsWith("# Word Cloud") ? "PASS" : "FAIL"),
    label: "get_chart_reference(' Word Cloud ') — trimmed, several words",
  },
  {
    send: { jsonrpc: "2.0", id: 90, method: "tools/call", params: { name: "search_docs", arguments: { query: "legend", maxResults: 0 } } },
    check: (r) => {
      const n = ((r.result?.content?.[0]?.text || "").match(/\n## /g) || []).length;
      return n === 1 ? "PASS" : `FAIL (${n} results)`;
    },
    label: "search_docs(maxResults: 0) — exactly one result",
  },
  {
    send: { jsonrpc: "2.0", id: 91, method: "tools/call", params: { name: "list_examples", arguments: { category: "Maps" } } },
    check: (r) => ((r.result?.content?.[0]?.text || "").startsWith("# maps examples (") ? "PASS" : "FAIL"),
    label: "list_examples('Maps') — a category in any casing",
  },
  {
    send: { jsonrpc: "2.0", id: 92, method: "tools/call", params: { name: "get_doc", arguments: { path: "skill/xy" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const h1 = text.split("\n").filter((l) => /^# /.test(l));
      return h1.length >= 1 && h1[0] !== h1[1] ? "PASS" : `FAIL (${h1.slice(0, 2).join(" | ")})`;
    },
    label: "get_doc('skill/xy') — the page title once",
  },
  {
    send: { jsonrpc: "2.0", id: 93, method: "tools/list", params: {} },
    check: (r) => {
      const d = r.result?.tools?.find((t) => t.name === "get_core_reference")?.inputSchema?.properties?.full?.description || "";
      const said = Number((/about ([\d,]+) characters/.exec(d) || [])[1]?.replace(/,/g, ""));
      const real = readFileSync(new URL("./amcharts5-skill/amcharts5-skill/SKILL.md", import.meta.url), "utf8").length;
      return Math.abs(said - real) <= 1500 ? "PASS" : `FAIL (says ${said}, is ${real})`;
    },
    label: "get_core_reference — the size it states is SKILL.md's",
  },
  {
    send: { jsonrpc: "2.0", id: 94, method: "tools/call", params: { name: "get_example", arguments: { path: "examples/json-configs/xy-smoothed-line" } } },
    check: (r) => {
      const h1 = (r.result?.content?.[0]?.text || "").split("\n").filter((l) => /^# /.test(l));
      return h1.length >= 1 && h1[0] !== h1[1] ? "PASS" : `FAIL (${h1.slice(0, 2).join(" | ")})`;
    },
    label: "get_example(a JSON config) — the title once",
  },
  {
    send: { jsonrpc: "2.0", id: 95, method: "tools/call", params: { name: "get_doc", arguments: { path: "skill/SKILL" } } },
    check: (r) => {
      const h1 = (r.result?.content?.[0]?.text || "").split("\n").filter((l) => /^# /.test(l));
      return h1.length >= 1 && h1[0] !== h1[1] ? "PASS" : `FAIL (${h1.slice(0, 2).join(" | ")})`;
    },
    label: "get_doc('skill/SKILL') — the title once, after the front matter",
  },
  {
    send: { jsonrpc: "2.0", id: 96, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "json" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("## Where a config goes") && text.includes('"type": "XYChart"') ? "PASS" : "FAIL";
    },
    label: "get_quick_start('json') — where a config goes and a complete config",
  },
  {
    send: { jsonrpc: "2.0", id: 97, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "ukLow, ukHigh" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("1 match") && text.includes("am5geodata_ukLow") ? "PASS" : "FAIL";
    },
    label: "list_geodata('ukLow, ukHigh') — two file names of one map",
  },
  {
    send: { jsonrpc: "2.0", id: 98, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "stock", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('`<div id="chartcontrols">`') && text.includes('`<div id="chartdiv">`') ? "PASS" : "FAIL (the toolbar's div is not named)";
    },
    label: "get_quick_start('stock', esm) — names every div the code looks up",
  },
  {
    send: { jsonrpc: "2.0", id: 99, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "column with line" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('No example in this reference is named "column with line"') ? "PASS" : "FAIL (an unrelated example, unannounced)";
    },
    label: "get_quick_start('column with line') — no example or demo is named so: says the example is not one",
  },
  {
    send: { jsonrpc: "2.0", id: 100, method: "tools/call", params: { name: "search_all", arguments: { query: "map polygon no data tooltip", maxResults: 3, scope: "skill" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const hit = text.split("\n## ").find((h) => h.split("\n")[0].includes("→ MapPolygonSeries"));
      if (!hit) return "FAIL (no MapPolygonSeries hit)";
      const title = hit.split("\n")[0];
      if (!title.includes("→ Series types → MapPolygonSeries")) return `FAIL (no parent section: ${title})`;
      // the same hit's pointer takes the subsection heading alone
      return hit.includes('heading: "MapPolygonSeries (countries, regions)"') ? "PASS" : "FAIL (the hit's get_section pointer is not the subsection heading alone)";
    },
    label: "search_all — a subsection hit names its parent section",
  },
  {
    send: { jsonrpc: "2.0", id: 101, method: "tools/call", params: { name: "search_docs", arguments: { query: "bullets in a JSON config", maxResults: 4 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const titles = text.split("\n").filter((l) => l.startsWith("## "));
      return titles.some((t) => t.endsWith("→ The rules → 7. Bullets")) ? "PASS" : `FAIL (${titles.slice(0, 2).join(" | ")})`;
    },
    label: "search_docs — a subsection hit names its parent section",
  },
  {
    send: { jsonrpc: "2.0", id: 102, method: "tools/call", params: { name: "search_docs", arguments: { query: "amCharts 5 skill overview when to use", maxResults: 4 } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const titles = text.split("\n").filter((l) => l.startsWith("## "));
      const bare = titles.find((t) => /→\s*$/.test(t));
      if (bare) return `FAIL (a title ends with an arrow: ${bare})`;
      return titles.includes("## amCharts 5") ? "PASS" : `FAIL (no untitled SKILL.md hit: ${titles.slice(0, 2).join(" | ")})`;
    },
    label: "search_docs — a section without a heading gets no trailing arrow",
  },
  {
    send: { jsonrpc: "2.0", id: 103, method: "tools/call", params: { name: "get_doc", arguments: { path: "charts/map-chart/clustered-point-series" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (text.length > 30000) return `FAIL (${text.length} chars: demo code left in the page)`;
      return text.includes('get_example(path: "examples/docs-demos/') ? "PASS" : "FAIL (no pointer to the page's demos)";
    },
    label: "get_doc — a page's embedded demos are pointers, not code",
  },
  {
    send: { jsonrpc: "2.0", id: 104, method: "tools/call", params: { name: "get_example", arguments: { path: "https://docs.amcharts.com/embeds/v5/stacked-column-chart-100/" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("A demo from the docs page") && text.includes("## JavaScript") && text.includes("## Required resources") ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "get_example(a docs demo's embed address) → the demo, with its docs page",
  },
  {
    send: { jsonrpc: "2.0", id: 105, method: "tools/call", params: { name: "get_example", arguments: { path: "sankey-diagram" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("*Category: flow*") ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "get_example — a name shared with a docs demo means the amcharts.com demo",
  },
  {
    send: { jsonrpc: "2.0", id: 106, method: "tools/call", params: { name: "get_example", arguments: { path: "https://docs.amcharts.com/v5/charts/flow-charts/sankey-diagram/" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('get_doc(path: "extended/charts/flow-charts/sankey-diagram")') ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "get_example(a docs address ending in a shared example name) → get_doc",
  },
  {
    send: { jsonrpc: "2.0", id: 107, method: "tools/call", params: { name: "get_api_reference", arguments: { className: "ValueAxis" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("## Methods")) return "FAIL (no Methods section)";
      if (!text.includes("`zoomToValues(start: number, end: number, duration?: number): void`")) return "FAIL (zoomToValues signature missing)";
      return text.includes("## Other inherited methods") ? "PASS" : "FAIL (no inherited methods list)";
    },
    label: "get_api_reference('ValueAxis') — its methods, with signatures, and the inherited ones by name",
  },
  {
    send: { jsonrpc: "2.0", id: 108, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "europe" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("npm CDN (AI sandboxes, strict CSPs): https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@")) return `FAIL (no jsDelivr base: ${text.slice(0, 200)})`;
      return /not jsDelivr/.test(text) ? "FAIL (still says not jsDelivr)" : "PASS";
    },
    label: "list_geodata — the npm-CDN base is jsDelivr (unpkg serves the same path)",
  },
  {
    // Docs demos must not call am5.addLicense(), and no served file may carry a key-shaped string.
    send: { jsonrpc: "2.0", id: 109, method: "tools/call", params: { name: "get_example", arguments: { path: "examples/docs-demos/synced-value-axes" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes("am5.Root.new")) return `FAIL (demo not served: ${text.slice(0, 120)})`;
      if (/addLicense/.test(text)) return "FAIL (the demo still sets a license)";
      const key = /["'`]AM5[CMSG][^"'`\s]{5,}["'`]/;
      const found = [];
      const walk = (dir) => {
        for (const e of readdirSync(dir, { withFileTypes: true })) {
          const p = dir + "/" + e.name;
          if (e.isDirectory()) walk(p);
          else if (/\.(md|json|js)$/.test(e.name) && key.test(readFileSync(p, "utf8"))) found.push(p.slice(ROOT.length + 1));
        }
      };
      for (const d of ["extended", "amcharts5-skill/amcharts5-skill", "plugin"]) walk(ROOT + "/" + d);
      if (key.test(readFileSync(ROOT + "/amcharts5-skill/cursorrules", "utf8"))) found.push("amcharts5-skill/cursorrules");
      return found.length ? `FAIL (license keys in ${found.join(", ")})` : "PASS";
    },
    label: "no license key the library would accept in the docs demos, docs, skill or plugin",
  },
  {
    // The longest examples moved from the references to the MCP's examples: a quick start
    // asked for one points to it, and lists the others
    send: { jsonrpc: "2.0", id: 110, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "map sankey" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      if (!text.includes('The complete example for "map sankey" is') || !text.includes('get_example(path: "examples/maps/map-sankey-coffee-supply-chain")')) return `FAIL (${text.slice(0, 200)})`;
      return text.includes('get_example(path: "examples/maps/globe-with-animated-flight-path")') ? "PASS" : "FAIL (the other longer examples aren't listed)";
    },
    label: "get_quick_start('map sankey') — names the moved Map Sankey example and lists the longer ones",
  },
  {
    send: { jsonrpc: "2.0", id: 111, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "globe" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('The complete example for "globe" is') && text.includes('get_example(path: "examples/maps/globe-with-animated-flight-path")')
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('globe') — the map reference, naming the moved globe example",
  },
  {
    send: { jsonrpc: "2.0", id: 112, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "map sankey oil" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /^> The complete example for "map sankey oil" is "Map Sankey — Oil[^\n]*get_example\(path: "examples\/maps\/map-sankey-oil-export-flows"\)/m.test(text)
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('map sankey oil') — names the moved example with the most of the asked words",
  },
  {
    send: { jsonrpc: "2.0", id: 113, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "bollinger band" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /^> The complete example for "bollinger band" is [^\n]*get_example\(path: "examples\/stock\/stock-chart-with-volume-and-bollinger-bands"\)/m.test(text)
        && !text.includes("No example in this reference is named")
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('bollinger band') — a chart-type word of the phrase names the moved example",
  },
  {
    send: { jsonrpc: "2.0", id: 114, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "world map" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("<title>World Choropleth Map</title>") && !text.includes("No example in this reference is named")
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('world map') — the map reference's first example, without a 'No example' note",
  },
  {
    send: { jsonrpc: "2.0", id: 115, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "World Map charts" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("<title>World Choropleth Map</title>") && !text.includes("No example in this reference is named")
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('World Map charts') — the family words with a trailing 'charts', without a 'No example' note",
  },
  {
    send: { jsonrpc: "2.0", id: 116, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "stocks" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Stock & Financial Charts") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_chart_reference('stocks') — a plural reaches the reference its singular does",
  },
  {
    send: { jsonrpc: "2.0", id: 117, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "word clouds" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("(source: skill/wordcloud.md") && !text.includes("No reference found") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('word clouds') — a plural of several words",
  },
  {
    send: { jsonrpc: "2.0", id: 118, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "funnels" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Funnel") && !text.includes("No example in this reference is named") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('funnels') — the example named by the singular",
  },
  {
    send: { jsonrpc: "2.0", id: 119, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "globes" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /^> The complete example for "globes" is [^\n]*get_example\(path: "examples\/maps\/globe-with-animated-flight-path"\)/m.test(text)
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('globes') — the moved example named by the singular",
  },
  {
    send: { jsonrpc: "2.0", id: 120, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "bubble maps" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Map with point markers (bubble map)") && !text.includes("No example in this reference is named")
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('bubble maps') — the singular 'bubble map' (a map) wins over 'bubble' (an XY chart)",
  },
  // A demo named as asked, where the reference has no such example: the demo
  {
    send: { jsonrpc: "2.0", id: 121, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "stacked column" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Stacked Column Chart\n") && text.includes('get_example(path: "examples/column-bar/stacked-column-chart")') && /stacked: true/.test(text)
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('stacked column') — the Stacked Column Chart demo, not the plain column example",
  },
  {
    send: { jsonrpc: "2.0", id: 122, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "candlestick" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Candlestick Chart\n") && text.includes("CandlestickSeries") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('candlestick') — the Candlestick Chart demo",
  },
  {
    send: { jsonrpc: "2.0", id: 123, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "stacked column", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('the amCharts demo "Stacked Column Chart": get_example(path: "examples/column-bar/stacked-column-chart")') && text.includes("## Imports (ES modules)")
        ? "PASS" : `FAIL (${text.slice(0, 300)})`;
    },
    label: "get_quick_start('stacked column', esm) — names the demo, and gives the reference's example under ES module imports",
  },
  {
    send: { jsonrpc: "2.0", id: 124, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "dumbbell" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Dumbbell Plot\n") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('dumbbell') — no reference has it, a demo does",
  },
  // A framework asked for as a chart type: the Frameworks section
  {
    send: { jsonrpc: "2.0", id: 125, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "react", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# amCharts 5 in React") && text.includes("useAmChart") && text.includes('get_doc("getting-started/integrations/react")')
        ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('react') — the React package and pattern, not 'No reference found'",
  },
  // get_section takes a chart type as get_chart_reference does
  {
    send: { jsonrpc: "2.0", id: 126, method: "tools/call", params: { name: "get_section", arguments: { chartType: "treemap", heading: "Common configuration" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Common configuration") && text.includes("skill/hierarchy.md") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_section(chartType: 'treemap') — the hierarchy reference's section",
  },
  // Many geodata matches: the ones past the first 25 a line each
  {
    send: { jsonrpc: "2.0", id: 127, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "usa counties" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const missing = ["region/usa/al", "region/usa/dc", "region/usa/tx", "region/usa/wy"].filter(p => !text.includes(p));
      return !missing.length && !/more, refine the filter/.test(text) ? "PASS" : `FAIL (missing ${missing.join(", ")})`;
    },
    label: "list_geodata('usa counties') — every state's county map",
  },
  // get_example by `name`, and by a demo's name in words
  {
    send: { jsonrpc: "2.0", id: 128, method: "tools/call", params: { name: "get_example", arguments: { name: "stacked column" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Stacked Column Chart\n") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_example(name: 'stacked column') — the demo of that name",
  },
  {
    send: { jsonrpc: "2.0", id: 129, method: "tools/call", params: { name: "get_example", arguments: { name: "flight-routes" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Flight Routes Map\n") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_example(name: 'flight-routes') — hyphens for spaces, part of the demo's title",
  },
  {
    send: { jsonrpc: "2.0", id: 130, method: "tools/call", params: { name: "get_example", arguments: { name: "purple-unicorn" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("not found") && text.includes('search_all("purple unicorn")') ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_example(name: 'purple-unicorn') — no such demo: points to search_all with the words",
  },
  {
    send: { jsonrpc: "2.0", id: 131, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "q".repeat(2000) } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("No reference or demo found") && text.length < 700 ? "PASS" : `FAIL (${text.length} chars)`;
    },
    label: "get_quick_start(2,000 characters) — the answer doesn't repeat them",
  },
  // list_examples by a word of the category, and by `type`
  {
    send: { jsonrpc: "2.0", id: 132, method: "tools/call", params: { name: "list_examples", arguments: { type: "gauge" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# gauges examples") && text.includes("examples/gauges/angular-gauge") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "list_examples(type: 'gauge') — the gauges category",
  },
  {
    send: { jsonrpc: "2.0", id: 133, method: "tools/call", params: { name: "list_examples", arguments: { category: "pie" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# pie-donut examples") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "list_examples('pie') — the pie-donut category",
  },
  {
    send: { jsonrpc: "2.0", id: 134, method: "tools/call", params: { name: "list_examples", arguments: { category: "banana" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith('No examples in category "banana"') && text.includes("column-bar") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "list_examples('banana') — no such category: lists the categories",
  },
  // A word that isn't a demo's name gets no demo
  ...[["network", "Network Waterfall"], ["legend", "Heat Map with Legend"], ["export", "Oil Export"], ["with", "Gauge with Bands"], ["multi series", "Multi-Series Map"]].map(([word, wrong], i) => ({
    send: { jsonrpc: "2.0", id: 135 + i, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: word } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return !text.startsWith(`# Quick Start: ${wrong}`) && !text.includes(`(source: the amCharts demo`) ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: `get_quick_start('${word}') — no demo that only has the word in its title`,
  })),
  {
    send: { jsonrpc: "2.0", id: 140, method: "tools/call", params: { name: "get_example", arguments: { path: "timeline" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("not found") && !text.startsWith("# Map Timeline") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_example('timeline') — a category's name is not a demo",
  },
  {
    send: { jsonrpc: "2.0", id: 141, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "real-time line chart with scrolling date axis" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Multi-series line chart") && text.includes("this is the closest") ? "PASS" : `FAIL (${text.slice(0, 200)})`;
    },
    label: "get_quick_start('real-time line chart with scrolling date axis') — the closest example, a line chart",
  },
  {
    send: { jsonrpc: "2.0", id: 142, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "usa county" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      const missing = ["region/usa/tx", "region/usa/ak", "region/usa/la", "region/usa/dc"].filter(p => !text.includes(p));
      return !missing.length ? "PASS" : `FAIL (missing ${missing.join(", ")})`;
    },
    label: "list_geodata('usa county') — the county maps, with the states that call them something else",
  },
  {
    send: { jsonrpc: "2.0", id: 143, method: "tools/call", params: { name: "list_geodata", arguments: { filter: "counties" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return !text.includes("Jamaica") && !text.includes("Andorra") ? "PASS" : "FAIL (parishes of other countries)";
    },
    label: "list_geodata('counties') — other countries' parishes are not counties",
  },
  {
    send: { jsonrpc: "2.0", id: 144, method: "tools/call", params: { name: "get_example", arguments: { path: "", name: "stacked column" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Stacked Column Chart\n") && text.includes("populateText: true") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_example(path: '', name) — the argument with a value, and what to watch for when adapting",
  },
  {
    send: { jsonrpc: "2.0", id: 145, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "Svelte 5" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# amCharts 5 in Svelte") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('Svelte 5') — a framework with its version",
  },
  {
    send: { jsonrpc: "2.0", id: 146, method: "tools/call", params: { name: "get_api_reference", arguments: { name: "XYCursor" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("XYCursor") && !text.includes("No API reference found") && !r.error ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_api_reference(name: 'XYCursor') — name is the same as className",
  },
  {
    send: { jsonrpc: "2.0", id: 147, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "tree map" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Treemap") && !text.includes("No example in this reference") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('tree map') — the Treemap example",
  },
  {
    send: { jsonrpc: "2.0", id: 148, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "time line" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("(source: skill/timeline.md") && !text.includes("No example in this reference") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('time line') — the timeline reference",
  },
  // A longer request: the chart it starts with
  ...[["funnel chart with legend", "# Quick Start: Funnel"], ["bubble chart with legend", "# Quick Start: Bubble Chart"], ["heatmap with legend", "# Quick Start: Heat Map with Legend"], ["candlestick chart with volume", "# Quick Start: Candlestick Chart"], ["org chart", "# Quick Start: Force-directed tree"], ["pie of a pie", "# Quick Start: Pie of a Pie"]].map(([asked, start], i) => ({
    send: { jsonrpc: "2.0", id: 149 + i, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: asked } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith(start) ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: `get_quick_start('${asked}') — the chart the request names`,
  })),
  {
    send: { jsonrpc: "2.0", id: 156, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "word cloud from a sentence" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes("(source: skill/wordcloud.md") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('word cloud from a sentence') — the word cloud reference",
  },
  {
    send: { jsonrpc: "2.0", id: 157, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "stacked bar", format: "esm" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Horizontal bar chart") && text.includes("closest example under ES module imports") && !text.includes("first example") ? "PASS" : `FAIL (${text.slice(0, 320)})`;
    },
    label: "get_quick_start('stacked bar', esm) — the bar example, and the note says it is the closest",
  },
  {
    send: { jsonrpc: "2.0", id: 158, method: "tools/call", params: { name: "get_example", arguments: { path: "maps" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.includes('list_examples(category: "maps")') ? "PASS" : `FAIL (${text.slice(0, 160)})`;
    },
    label: "get_example('maps') — a category: names list_examples",
  },
  // A longer request: the example with the most of its words, not just its first words
  ...[["map with markers", "# Quick Start: Map with point markers"], ["map with lines", "# Quick Start: US map with connection lines"], ["radar with columns", "# Quick Start: Radar column chart"], ["sankey with vertical orientation", "# Quick Start: Vertical Sankey"], ["pie chart with center label", "# Quick Start: Donut chart with center label"], ["line chart with stacked area", "# Quick Start: Stacked area chart"], ["chart showing treemap", "# Quick Start: Treemap"]].map(([asked, start], i) => ({
    send: { jsonrpc: "2.0", id: 159 + i, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: asked } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith(start) ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: `get_quick_start('${asked}') — the example with the most of the words`,
  })),
  {
    send: { jsonrpc: "2.0", id: 166, method: "tools/call", params: { name: "get_chart_reference", arguments: { chartType: "bubbles for map" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return /^# Map/i.test(text) ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_chart_reference('bubbles for map') — a family named after the preposition stays that family",
  },
  {
    send: { jsonrpc: "2.0", id: 167, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "heat map of usa" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return !text.startsWith("# Quick Start: Heat Map with Legend") && text.includes("(source: skill/map.md") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('heat map of usa') — the map reference, not the XY heat map demo",
  },
  {
    send: { jsonrpc: "2.0", id: 168, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType: "bubble map of earthquakes" } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith("# Quick Start: Map with point markers (bubble map)") ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: "get_quick_start('bubble map of earthquakes') — a bubble map before a bubble chart",
  },
  ...[
    [169, "tree map of sales", "Treemap", "a treemap, not the tree its first word is in"],
    [170, "us map of sales", "World choropleth map", "a place doesn't pick the example with lines"],
    [171, "world map of population", "World choropleth map", "not the clustered points demo"],
    [172, "world map with markers", "Map with point markers (bubble map)", "what it shows decides, not the place"],
    [173, "us map with lines", "US map with connection lines", "the lines example when lines are asked for"],
    [174, "speedometer for a dashboard", "Gauge with colored bands", "the chart it starts with still breaks a tie"],
    [175, "constructor of pie", "Basic pie chart with legend", "a name every JavaScript object has is only a word"],
  ].map(([id, chartType, title, why]) => ({
    send: { jsonrpc: "2.0", id, method: "tools/call", params: { name: "get_quick_start", arguments: { chartType } } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return text.startsWith(`# Quick Start: ${title}\n`) ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: `get_quick_start('${chartType}') — ${why}`,
  })),
  {
    send: { jsonrpc: "2.0", id: 176, method: "ping" },
    check: () => brokenJson.status === 400 && !brokenJsonText.includes("SECRETWORD") && otherError === "other" && otherRoute === "other route" && guardInRoute ? "PASS" : `FAIL (${brokenJson.status} ${brokenJsonText.slice(0, 80)}, ${otherError}, ${otherRoute}, in route: ${guardInRoute})`,
    label: "hosted server: broken JSON on /sse/message gets 400 without quoting the body; other errors and routes are untouched",
  },
  ...[
    [177, "search_all", { query: "a".repeat(2001) }, "query"],
    [178, "get_section", { file: "SKILL", heading: "a".repeat(2001) }, "heading"],
    [179, "list_geodata", { filter: "a".repeat(2001) }, "filter"],
  ].map(([id, name, args, arg]) => ({
    send: { jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args } },
    check: (r) => {
      const text = r.result?.content?.[0]?.text || "";
      return r.result?.isError && text.startsWith(`\`${arg}\` is too long`) && text.length < 120 ? "PASS" : `FAIL (${text.slice(0, 120)})`;
    },
    label: `${name}: a ${arg} over 2,000 characters gets a short error`,
  })),
  {
    send: { jsonrpc: "2.0", id: 180, method: "tools/call", params: { name: "search_all", arguments: { query: "a".repeat(2000) } } },
    check: (r) => r.result && !r.result.isError ? "PASS" : `FAIL (${(r.result?.content?.[0]?.text || "").slice(0, 120)})`,
    label: "search_all: a query of exactly 2,000 characters is still answered",
  },
  {
    send: { jsonrpc: "2.0", id: 181, method: "ping" },
    check: () => madeUpIds.every(r => r?.status === 404) && sessionGuardRoutes === 1 ? "PASS" : `FAIL (${madeUpIds.map(r => r?.status)}, routes: ${sessionGuardRoutes})`,
    label: "hosted server: a session ID it never issued gets 404 on the SSE routes, before any Durable Object",
  },
  {
    send: { jsonrpc: "2.0", id: 182, method: "ping" },
    check: () => otherSessionRequests.every(r => r === null) ? "PASS" : `FAIL (${otherSessionRequests.map(r => r?.status)})`,
    label: "hosted server: issued session IDs, requests without one and CORS preflights pass through",
  },
  {
    send: { jsonrpc: "2.0", id: 183, method: "ping" },
    check: () => hostedInit.status === 200 && hostedInit.json?.result?.instructions === SERVER_INSTRUCTIONS && !hostedInit.headers.has("mcp-session-id") && /serveStatelessMcp\(request, createServer, env\.USAGE\)/.test(workerSource) && !/AmCharts5MCP\.serve\("\/mcp"\)/.test(workerSource) ? "PASS" : `FAIL (${hostedInit.status} ${hostedInit.text.slice(0, 100)})`,
    label: "hosted /mcp: initialize answers with the instructions and no session ID",
  },
  {
    send: { jsonrpc: "2.0", id: 184, method: "ping" },
    check: () => [hostedNoInit, hostedOldId].every(r => r.status === 200 && r.json?.result?.content?.[0]?.text?.startsWith("# Quick Start")) ? "PASS" : `FAIL (${hostedNoInit.status} ${hostedOldId.status} ${hostedOldId.text.slice(0, 100)})`,
    label: "hosted /mcp: a tool call needs no session, and a client still sending an old session ID is answered",
  },
  {
    send: { jsonrpc: "2.0", id: 185, method: "ping" },
    check: () => [hostedGet, hostedDelete].every(r => r.status === 405 && r.headers.get("allow") === "POST") && hostedPreflight.status === 200 && hostedPreflight.headers.get("access-control-allow-methods") === "GET, POST, DELETE, OPTIONS" && hostedPreflight.headers.get("access-control-max-age") === "86400" && hostedNoInit.headers.get("access-control-allow-origin") === "*" ? "PASS" : `FAIL (${hostedGet.status} ${hostedDelete.status} ${hostedPreflight.status})`,
    label: "hosted /mcp: GET and DELETE get 405, CORS is what browsers had before",
  },
  {
    send: { jsonrpc: "2.0", id: 186, method: "ping" },
    check: () => hostedBroken.status === 400 && !hostedBroken.text.includes("SECRETWORD") && hostedFailure.status === 500 && hostedFailure.json?.error?.code === -32603 && !hostedFailure.text.includes("SECRETWORD") && !hostedLogged.join(" ").includes("SECRETWORD") ? "PASS" : `FAIL (${hostedBroken.status} ${hostedFailure.status} ${hostedLogged.join(" ").slice(0, 80)})`,
    label: "hosted /mcp: broken JSON and a server failure get a JSON error, and neither answer nor log quotes the text",
  },
  {
    send: { jsonrpc: "2.0", id: 187, method: "ping" },
    check: () => SERVER_INSTRUCTIONS.includes("https://registry.npmjs.org/@amcharts/amcharts5/latest") && SERVER_INSTRUCTIONS.includes("one exact version for every file") && !/\b5\.\d+\.\d+\b/.test(toolsSource) ? "PASS" : "FAIL (no lookup address, or a library version in the instructions or tool descriptions)",
    label: "server instructions: say where to read the newest version, and neither they nor the tool descriptions name one",
  },
  {
    send: { jsonrpc: "2.0", id: 188, method: "ping" },
    check: () => stalePins.length === 0 && geodataPins.size === 1 ? "PASS" : `FAIL (${stalePins.length} pins differ from ${libraryVersion}: ${stalePins.slice(0, 3).join("; ")}; geodata versions: ${[...geodataPins]})`,
    label: "served content: every version pin matches the amCharts version this repo is pinned to, and geodata uses one version",
  },
  {
    send: { jsonrpc: "2.0", id: 189, method: "ping" },
    check: () => {
      const got = usageRows.slice(0, 3).map(r => r.indexes[0]).join(" ");
      const ownIndex = usageRows.every(r => { const [route, kind, tool, result, app] = r.blobs; return r.indexes[0] === [app, route, kind, tool, result].join(":") && r.indexes[0].length <= 96; });
      return got === "claude:mcp:connection::ok chatgpt:mcp:tool:search_all:ok cursor:mcp:tool:unknown:error" && ownIndex ? "PASS" : `FAIL (${got})`;
    },
    label: "usage counts: a connection and tool calls are counted by app, tool and result; tools/list is not",
  },
  {
    send: { jsonrpc: "2.0", id: 190, method: "ping" },
    check: () => usageRows.length >= 3 && !JSON.stringify(usageRows).includes("SECRETWORD") ? "PASS" : `FAIL (${JSON.stringify(usageRows).slice(0, 120)})`,
    label: "usage counts: nothing a client wrote is stored (app name, user agent, tool name, arguments)",
  },
  {
    send: { jsonrpc: "2.0", id: 191, method: "ping" },
    check: () => usageDown === 200 && oddClientName !== 500 && registeredTools.length === TOOL_NAMES.size && registeredTools.every(t => TOOL_NAMES.has(t)) && /writeUsage\(this\.env\?\.USAGE, "sse"/.test(workerSource) ? "PASS" : `FAIL (down ${usageDown}, odd name ${oddClientName}, tools ${registeredTools.length}/${TOOL_NAMES.size})`,
    label: "usage counts: a failed write or an odd client name can't fail a request, every tool is on the list, SSE is counted",
  },
  {
    send: { jsonrpc: "2.0", id: 192, method: "ping" },
    check: () => cancelledBatch.status === 200 && cancelledBatch.text.includes("Quick Start") && cancelWithId.json?.id === 7 && cancelWithId.json?.error?.code === -32601 && appOf("cursor-vscode") === "cursor" && appOf("precursor-app") === "other" ? "PASS" : `FAIL (${cancelledBatch.status} ${cancelledBatch.text.slice(0, 80)})`,
    label: "hosted /mcp: a batch that cancels its own call still gets an answer; only a real Cursor name counts as Cursor",
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

// Rank of the first search_docs result whose "## title → heading" line
// matches `want`; PASS if it is within `within`.
function skillRank(r, want, within) {
  const text = r.result?.content?.[0]?.text || "";
  const headings = text.split("\n").filter(l => l.startsWith("## "));
  const rank = headings.findIndex(h => want.test(h)) + 1;
  if (!rank) return `FAIL (not in the top ${headings.length}: ${headings.slice(0, 3).join(" | ")})`;
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
