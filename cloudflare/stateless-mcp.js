// /mcp without sessions. The tools are read-only and keep nothing between
// requests, so each request gets its own server and nothing is stored. A client
// that still sends a session ID is answered as usual.
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { usageOf, writeUsage } from "./usage.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "mcp-session-id",
  "Access-Control-Max-Age": "86400",
};

const errorResponse = (status, code, message, headers = {}) =>
  new Response(JSON.stringify({ jsonrpc: "2.0", error: { code, message }, id: null }), {
    status,
    headers: { "content-type": "application/json", ...CORS_HEADERS, ...headers },
  });

// Counts each connection and tool call when its answer goes out
function countUsage(transport, dataset, userAgent) {
  const pending = new Map();
  const receive = transport.onmessage;
  transport.onmessage = (message, extra) => {
    const usage = usageOf(message, userAgent);
    if (usage && message.id !== undefined) pending.set(message.id, usage);
    return receive?.(message, extra);
  };
  const send = transport.send.bind(transport);
  transport.send = (message, options) => {
    if (pending.has(message.id)) {
      writeUsage(dataset, "mcp", pending.get(message.id), message.error || message.result?.isError ? "error" : "ok");
      pending.delete(message.id);
    }
    return send(message, options);
  };
}

export async function serveStatelessMcp(request, createServer, usageDataset) {
  if (request.method === "OPTIONS") return new Response(null, { headers: CORS_HEADERS });
  // The server never sends anything on its own, so there is no stream to open
  // and no session to end. The MCP spec allows 405 for both.
  if (request.method !== "POST") return errorResponse(405, -32000, "Method not allowed", { Allow: "POST" });

  let server;
  try {
    server = createServer();
    const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    await server.connect(transport);
    if (usageDataset) countUsage(transport, usageDataset, request.headers.get("user-agent"));
    const response = await transport.handleRequest(request);
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(CORS_HEADERS)) headers.set(name, value);
    // Read before closing: closing the server ends the transport's response.
    const body = response.body ? await response.arrayBuffer() : null;
    return new Response(body, { status: response.status, headers });
  } catch (error) {
    // The name only: a message could quote the request.
    console.error("MCP request failed:", error?.name);
    return errorResponse(500, -32603, "Internal error");
  } finally {
    await server?.close().catch(() => {});
  }
}
