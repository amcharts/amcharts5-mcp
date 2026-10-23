# amCharts 5 MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that gives AI assistants on-demand access to the complete amCharts 5 knowledge base: **160+ documentation pages**, **350+ code examples** (including 60+ complete JSON configs), and **1,300+ API reference pages**.

Works with **Claude Code**, **Claude Desktop**, **Cursor**, **Windsurf**, **VS Code + GitHub Copilot**, and any other MCP-compatible AI tool.

## Why?

Instead of loading the entire amCharts reference into the AI's context window, the MCP server lets the AI **query exactly what it needs** — a specific chart type reference, a code example, or an API lookup. This means better answers with less context waste.

## Quick Start

The easiest way is the **hosted server** — no install, just add one URL. Prefer to
run it yourself? See [Local install](#local-install-npx) below.

### Hosted (no install) — recommended

Point your AI client at:

```
https://mcp.amcharts.com/mcp
```

The amCharts 5 docs are also on [Context7](https://context7.com/amcharts/amcharts5) as `/amcharts/amcharts5`.

**Claude Code**

```bash
claude mcp add --transport http amcharts5 https://mcp.amcharts.com/mcp
```

**Claude (claude.ai, Desktop)** — add amCharts 5 from the [Connectors Directory](https://claude.ai/directory/amcharts). Or Settings → Connectors → **Add custom connector**, then paste `https://mcp.amcharts.com/mcp`.

**Cursor** — `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "amcharts5": {
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}
```

**VS Code + GitHub Copilot** — `.vscode/mcp.json`:

```json
{
  "servers": {
    "amcharts5": {
      "type": "http",
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}
```

**Windsurf** — `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "amcharts5": {
      "serverUrl": "https://mcp.amcharts.com/mcp"
    }
  }
}
```

**ChatGPT** (also on the Free plan) — open [Plugins](https://chatgpt.com/plugins) → **+** → **Add custom MCP server**. Give it a name, set the URL to `https://mcp.amcharts.com/mcp` and Authentication to **No authentication**, then **Create as a plugin**. In a chat, type **@amCharts** to use it.

**Cline** (VS Code extension) — open the **MCP Servers** panel → **Remote Servers**, paste `https://mcp.amcharts.com/mcp`, or add to its MCP settings JSON:

```json
{
  "mcpServers": {
    "amcharts5": {
      "type": "streamableHttp",
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}
```

**Clients that only support local (stdio) servers** (e.g. Zed, Continue, Amazon Q Developer) — bridge to the hosted URL with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote). Use this as the server's run command in the client's config:

```bash
npx mcp-remote https://mcp.amcharts.com/mcp
```

For example, in a `command`/`args` style config:

```json
{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.amcharts.com/mcp"]
    }
  }
}
```

Any other MCP client that accepts a remote server URL works too — use the `/mcp`
endpoint (Streamable HTTP) or `/sse` (legacy SSE). For URL-only clients that still
expect a command, use the `mcp-remote` bridge shown above.

## Local install (npx)

Prefer running it yourself? The server is also published to npm and runs over stdio.

### Claude Code

For **all projects** (global, recommended):

```bash
claude mcp add -s user amcharts5 -- npx -y @amcharts/amcharts5-mcp
```

For **current project only**:

```bash
claude mcp add amcharts5 -- npx -y @amcharts/amcharts5-mcp
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": ["-y", "@amcharts/amcharts5-mcp"]
    }
  }
}
```

### Cursor

Create or edit `.cursor/mcp.json` in your project root (or `~/.cursor/mcp.json` for global):

```json
{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": ["-y", "@amcharts/amcharts5-mcp"]
    }
  }
}
```

### Windsurf

Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": ["-y", "@amcharts/amcharts5-mcp"]
    }
  }
}
```

### VS Code + GitHub Copilot

Create or edit `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "amcharts5": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@amcharts/amcharts5-mcp"]
    }
  }
}
```

### Other MCP-compatible tools

For any other tool that supports MCP (Cline, Continue, Amazon Q, Zed, etc.), configure it to run:

```bash
npx -y @amcharts/amcharts5-mcp
```

### Run locally (for development)

```bash
git clone https://github.com/amcharts/amcharts5-mcp.git
cd amcharts5-mcp
npm install
npm start
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_core_reference` | Get core amCharts 5 docs — setup, themes, colors, events, common pitfalls. An overview: its first sections, up to 12,000 characters, and a list of the others; `full: true` for the whole file |
| `get_chart_reference` | Get the reference for a chart type (e.g. "pie", "sankey", "xy"). One longer than 12,000 characters comes as an overview with the rest listed for `get_section`; `full: true` for the whole file |
| `list_chart_types` | List all available chart types and their keywords |
| `search_docs` | Search the skill reference docs by keyword (`scope: "all"` adds the full docs, API reference and examples) |
| `search_all` | Search across **everything** — skill docs, full documentation, and code examples |
| `get_doc` | Get a full documentation page (e.g. "charts/xy-chart/axes", "concepts/events") |
| `get_section` | Get a specific section from a reference file by heading (a `###` subsection heading returns just that subsection) |
| `get_quick_start` | Get a minimal working template for any chart type |
| `list_examples` | Browse all 350+ examples, optionally filtered by category |
| `get_example` | Get the full code for a specific example |
| `get_api_reference` | Get the API reference for a class, interface or function — settings with their defaults, events, inheritance and the import line |
| `list_geodata` | Find map (geodata) files — world, continents, countries, regional packs and the per-Congress US congressional district packs — with each file's CDN path, script global and ES import |

## Example Usage

Once connected, your AI assistant can:

- **"Build me a pie chart"** → AI calls `get_quick_start("pie")` and adapts the template
- **"How do I format date axis labels?"** → AI calls `search_all("date axis label format")`
- **"Show me the Sankey diagram example"** → AI calls `get_example("examples/flow/sankey-diagram")`
- **"What settings does XYChart support?"** → AI calls `get_doc("reference/xychart")`
- **"How do I integrate with React?"** → AI calls `get_doc("getting-started/integrations/react")`, which covers the `@amcharts/amcharts5-react` package
- **"What chart types are available?"** → AI calls `list_chart_types()`
- **"Map the current US congressional districts"** → AI calls `list_geodata("congressional whole country")`

## Content

The server includes **1,900+ documents**:

- **160+ documentation pages** — getting started, chart guides, concepts (themes, events, adapters, data binding, animations, accessibility, etc.), and framework integration guides for amCharts' React, Vue, Angular, Svelte and React Native packages (with Next.js, Nuxt, SvelteKit, React Router and Remix 3)
- **350+ code examples** — 290+ working demos across 16 categories including column/bar, line/area, pie/donut, maps, hierarchy, flow, radar/polar, stock, gauges, Gantt, timeline, and more, plus 60+ complete JSON configs from the amCharts npm package
- **1,300+ API reference pages** — every class, interface and function in the amCharts 5 library, generated from the release's typings: settings with their real defaults (theme rules included), events, properties, data item fields, the inheritance chain and the import line
- **670+ geodata entries** — every map in `@amcharts/amcharts5-geodata`, for `list_geodata`
- **Curated skill reference** — quick-start templates, chart-specific guides and a guide to writing JSON configs, from the [amCharts 5 AI Skill](https://github.com/amcharts/amcharts5-skill)

## Security

- **Read-only tools.** Every tool reads the bundled amCharts documentation and returns text. No tool writes files, runs commands or fetches URLs.
- **The hosted endpoint has no authentication, by design.** `https://mcp.amcharts.com/mcp` serves the same public documentation as amcharts.com. There are no accounts, API keys, user data or write operations behind it.
  - It runs on Cloudflare Workers.
  - MCP session state is kept in a Durable Object, as the MCP agents framework requires. It is deleted when the session ends, or 24 hours after its last request.
  - Per-request logs (Workers invocation logs) are off. Only error messages are logged, and they hold no tool arguments. See "Privacy" below.
- **Local install.** The npm package runs over stdio on your machine and reads only the content bundled in it; it makes no network requests. Its only runtime dependencies are `@modelcontextprotocol/sdk` and `zod`.
- **Maintainer scripts.** The scripts in `scripts/` (the demo and docs scrapers, the API reference generator) are not part of the npm package and never run in the server.
- **Reporting a vulnerability:** https://www.amcharts.com/report-vulnerability/

## Privacy

Neither the hosted server nor the npm package needs an account or asks for personal data.

- **Hosted server** (`https://mcp.amcharts.com/mcp`):
  - **What your AI app sends:** a search phrase, a chart type, a doc path. These are used only to build the answer, and are not logged or stored. A response is kept in the session's storage only until it has been delivered (so a dropped stream can resume), then deleted.
  - **Session record:** when an AI app connects, the server keeps its MCP initialize message in the session's storage. That message holds what the app says about itself (its name and version, and whatever else it puts there), the protocol version and the app's MCP capabilities. All of the session's storage is deleted when the app ends the session, or 24 hours after its last request.
  - **Logs:** the server keeps no request logs (Workers invocation logs are off). It runs on Cloudflare Workers, and Cloudflare processes each request, including its IP address, to deliver it. Error and warning messages are logged and kept for up to 7 days; they hold no request contents or tool arguments.
- **npm package:** it runs on your computer over stdio and sends nothing to amCharts or anyone else.
- **Policy and questions:** see the [amCharts privacy policy](https://www.amcharts.com/privacy-policy/), or write to contact@amcharts.com.

## License

MIT
