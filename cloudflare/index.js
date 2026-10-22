// ---------------------------------------------------------------------------
// Cloudflare Worker entry — remote MCP server.
//
// Exposes the same amCharts 5 tools as the stdio server (src/index.js) over a
// public HTTPS URL, so users can connect by pasting a URL into their AI client
// instead of installing the npm package.
//
//   Streamable HTTP transport:  https://<host>/mcp
//   SSE transport (legacy):     https://<host>/sse
//
// Content is bundled at build time (cloudflare/content.generated.js) and parsed by
// the same buildContent() the stdio server uses — single source of truth.
// ---------------------------------------------------------------------------

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { JSONRPCMessageSchema } from "@modelcontextprotocol/sdk/types.js";
import { McpAgent } from "agents/mcp";
import { buildContent } from "../src/content.js";
import { registerTools } from "../src/tools.js";
import { version, skillFiles, extendedFiles, geodata } from "./content.generated.js";

// Parse once per isolate (module scope), not per request.
const content = buildContent({ skillFiles, extendedFiles, geodata });

// A session's storage is deleted this long after its last request (seconds).
// The IDLE_TTL_SECONDS var overrides it, e.g. `wrangler dev --var IDLE_TTL_SECONDS:15`.
const IDLE_TTL_SECONDS = 24 * 60 * 60;
const IDLE_CLEANUP_KEY = "idleCleanupId";

export class AmCharts5MCP extends McpAgent {
  server = new McpServer({
    name: "amcharts5",
    version,
  });

  async init() {
    registerTools(this.server, content);
  }

  // Every Streamable HTTP request opens a connection to the session's
  // Durable Object, and every legacy SSE message arrives here: both count
  // as activity.
  async onConnect(conn, ctx) {
    await this.rearmIdleCleanup();
    return super.onConnect(conn, ctx);
  }

  async onSSEMcpMessage(sessionId, messageBody, extraInfo) {
    await this.rearmIdleCleanup();
    // A malformed message is rejected here: the library would log its parse
    // error, which can name fields from the request body.
    if (!JSONRPCMessageSchema.safeParse(messageBody).success) {
      return new Error("Invalid JSON-RPC message");
    }
    return super.onSSEMcpMessage(sessionId, messageBody, extraInfo);
  }

  // Moves the session's one idle cleanup to IDLE_TTL_SECONDS from now.
  // Bookkeeping only: a failure here is logged, never fails the request.
  async rearmIdleCleanup() {
    try {
      const previous = await this.ctx.storage.get(IDLE_CLEANUP_KEY);
      if (previous) await this.cancelSchedule(previous);
      const configured = Number(this.env?.IDLE_TTL_SECONDS);
      const ttl = configured > 0 ? configured : IDLE_TTL_SECONDS;
      const task = await this.schedule(ttl, "idleCleanup");
      await this.ctx.storage.put(IDLE_CLEANUP_KEY, task.id);
    } catch (error) {
      console.error("Idle cleanup could not be scheduled:", error?.message);
    }
  }

  // No request for IDLE_TTL_SECONDS: end the session as if the client had
  // sent DELETE. That removes the initialize message at once, so requests
  // with this session ID get 404 from now on, and deletes all of the
  // session's storage in a fresh alarm (destroy() → storage.deleteAll()).
  async idleCleanup() {
    if (typeof this._cf_terminateSession === "function") {
      await this._cf_terminateSession();
    } else if (typeof this._cf_scheduleDestroy === "function") {
      await this._cf_scheduleDestroy();
      await this.ctx.storage.delete("initializeRequest");
    } else {
      await this.destroy();
    }
  }
}

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);

    // OpenAI's plugin directory verifies the domain by fetching this token
    // (the OPENAI_APPS_CHALLENGE var in wrangler.jsonc): only the token, as
    // plain text.
    if (url.pathname === "/.well-known/openai-apps-challenge") {
      const token = String(env.OPENAI_APPS_CHALLENGE || "").trim();
      return token
        ? new Response(token, { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } })
        : new Response("Not found", { status: 404 });
    }

    if (url.pathname === "/mcp") {
      return AmCharts5MCP.serve("/mcp").fetch(request, env, ctx);
    }
    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return AmCharts5MCP.serveSSE("/sse").fetch(request, env, ctx);
    }
    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        "amCharts 5 MCP server.\n\n" +
        "Connect your AI client to:\n" +
        `  ${url.origin}/mcp   (Streamable HTTP)\n` +
        `  ${url.origin}/sse   (SSE, legacy)\n`,
        { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }
    return new Response("Not found", { status: 404 });
  },
};
