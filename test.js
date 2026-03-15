import { spawn } from "child_process";

const server = spawn("node", ["src/index.js"], {
  cwd: "C:/projects/amcharts5-mcp",
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
    check: (r) => r.result?.tools?.length === 6 ? `PASS (${r.result.tools.length} tools)` : `FAIL (${r.result?.tools?.length} tools)`,
    label: "List tools (expect 6)",
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
  // Step 10: List resources
  {
    send: { jsonrpc: "2.0", id: 11, method: "resources/list", params: {} },
    check: (r) => {
      const count = r.result?.resources?.length || 0;
      return count >= 12 ? `PASS (${count} resources)` : `FAIL (${count} resources)`;
    },
    label: "List resources (expect 13 doc files)",
  },
];

function handleResponse(msg) {
  if (step >= tests.length) return;
  const test = tests[step];
  const result = test.check(msg);
  const icon = result.startsWith("PASS") ? "✓" : "✗";
  console.log(`${icon} Test ${step + 1}/${tests.length}: ${test.label} → ${result}`);
  step++;
  if (step < tests.length) {
    sendNext();
  } else {
    console.log("\nAll tests complete.");
    server.kill();
    process.exit(0);
  }
}

function sendNext() {
  const test = tests[step];
  server.stdin.write(JSON.stringify(test.send) + "\n");
}

// Start
sendNext();

// Timeout
setTimeout(() => {
  console.error(`\nTimeout — stuck at test ${step + 1}/${tests.length}: ${tests[step]?.label}`);
  server.kill();
  process.exit(1);
}, 15000);
