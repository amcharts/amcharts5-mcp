// A session ID this server never issued can't name a session. Waking a Durable
// Object for one would create storage, so it is answered here. idFromString
// throws for an ID that wasn't created by this namespace.
export function rejectUnknownSession(request, url, namespace) {
  if (request.method === "OPTIONS") return null;
  const sessionId = url.pathname === "/mcp" ? request.headers.get("mcp-session-id") : url.searchParams.get("sessionId");
  if (!sessionId) return null;
  try {
    namespace.idFromString(sessionId);
    return null;
  } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32001, message: "Session not found" }, id: null }), {
      status: 404,
      headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
    });
  }
}
