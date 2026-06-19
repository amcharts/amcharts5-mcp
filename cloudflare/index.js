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
import { McpAgent } from "agents/mcp";
import { buildContent } from "../src/content.js";
import { registerTools } from "../src/tools.js";
import { version, skillFiles, extendedFiles } from "./content.generated.js";

// Parse once per isolate (module scope), not per request.
const content = buildContent({ skillFiles, extendedFiles });

export class AmCharts5MCP extends McpAgent {
  server = new McpServer({
    name: "amcharts5",
    version,
  });

  async init() {
    registerTools(this.server, content);
  }
}

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);

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
