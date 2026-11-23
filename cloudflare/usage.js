// Anonymous usage counts in Workers Analytics Engine: how many connections and
// tool calls, from which kind of app, with which result. Every value is a label
// from a fixed list. Nothing a client wrote is stored: no search phrase, chart
// type, tool argument, app name, IP address or session ID.
export const TOOL_NAMES = new Set([
  "list_chart_types", "get_chart_reference", "get_core_reference", "search_docs",
  "get_section", "get_quick_start", "search_all", "get_doc", "get_api_reference",
  "list_examples", "get_example", "list_geodata",
]);

export function appOf(...names) {
  for (const name of names) {
    if (typeof name !== "string") continue;
    const text = name.toLowerCase();
    // Cursor reports itself as "cursor-vscode", so it comes before VS Code
    if (text.includes("cursor")) return "cursor";
    if (/claude|anthropic/.test(text)) return "claude";
    if (/chatgpt|openai/.test(text)) return "chatgpt";
    if (/visual studio code|vscode|vs code|copilot/.test(text)) return "vscode";
  }
  return "other";
}

// What to count for one JSON-RPC message: a new connection, a tool call, or nothing
export function usageOf(message, userAgent) {
  if (message?.method === "initialize") {
    return { app: appOf(message.params?.clientInfo?.name, userAgent), kind: "connection", tool: "" };
  }
  if (message?.method === "tools/call") {
    const tool = message.params?.name;
    return { app: appOf(userAgent), kind: "tool", tool: TOOL_NAMES.has(tool) ? tool : "unknown" };
  }
  return null;
}

// Counting must never affect a request
export function writeUsage(dataset, route, usage, result) {
  if (!dataset || !usage) return;
  try {
    dataset.writeDataPoint({ indexes: [usage.app], blobs: [route, usage.kind, usage.tool, result], doubles: [1] });
  } catch {}
}
