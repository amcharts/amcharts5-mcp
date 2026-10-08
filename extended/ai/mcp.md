---
title: "amCharts MCP Server"
source: "https://www.amcharts.com/docs/v5/ai/mcp/"
scraped: "2026-10-08"
---

The amCharts 5 MCP Server gives your AI assistant on-demand access to 1,500+ documents: documentation pages, working code examples, and class API references. It queries only what it needs, keeping your context lean and your code accurate.

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that lets AI tools connect to external data sources. Instead of relying solely on training data, the AI can fetch current documentation and examples in real time. Most popular tools already support it, including Claude Code, Claude Desktop, claude.ai, ChatGPT, Cursor, Windsurf, VS Code with GitHub Copilot, Codex CLI, Gemini CLI, and Cline.

You can connect in one of two ways: the **hosted server** (just add a URL, nothing to install) or a **local install** via npm.

## Installation

### Hosted server (no install)

The simplest option: point your AI client at our hosted endpoint. No package to install, and it always runs the latest version.

https://mcp.amcharts.com/mcp

Pick your tool below. Each snippet registers the server under the name `amcharts5`.

**Claude Code** - one command:

claude mcp add --transport http amcharts5 https://mcp.amcharts.com/mcp

Add `-s user` after `add` to make it available in all projects instead of just the current one.

**Claude Desktop / claude.ai** - go to **Settings > Connectors > Add custom connector**, then paste `https://mcp.amcharts.com/mcp`.

**ChatGPT** (Plus/Pro/Business/Enterprise, with connectors or developer mode enabled) - **Settings > Connectors > Add custom connector**, then paste the same URL.

**Cursor** - add to `.cursor/mcp.json` (or `~/.cursor/mcp.json` for all projects):

{
  "mcpServers": {
    "amcharts5": {
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}

**Windsurf** - add to `~/.codeium/windsurf/mcp_config.json`:

{
  "mcpServers": {
    "amcharts5": {
      "serverUrl": "https://mcp.amcharts.com/mcp"
    }
  }
}

**VS Code + GitHub Copilot** - add to `.vscode/mcp.json`:

{
  "servers": {
    "amcharts5": {
      "type": "http",
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}

**Codex CLI** (also used by the Codex app and IDE extension) - one command:

codex mcp add amcharts5 --url https://mcp.amcharts.com/mcp

Or add to `~/.codex/config.toml`:

\[mcp\_servers.amcharts5\]
url = "https://mcp.amcharts.com/mcp"

**Gemini CLI** - one command (add `-s user` for all projects):

gemini mcp add --transport http amcharts5 https://mcp.amcharts.com/mcp

Or add to `.gemini/settings.json` (or `~/.gemini/settings.json`):

{
  "mcpServers": {
    "amcharts5": {
      "httpUrl": "https://mcp.amcharts.com/mcp"
    }
  }
}

**Cline** (VS Code extension) - open the **MCP Servers** panel, choose **Remote Servers**, and paste the URL. Or add to its MCP settings JSON:

{
  "mcpServers": {
    "amcharts5": {
      "type": "streamableHttp",
      "url": "https://mcp.amcharts.com/mcp"
    }
  }
}

**Tools that only support local (stdio) servers** (e.g. Zed, Continue, Amazon Q Developer) - bridge to the hosted URL with [mcp-remote](https://www.npmjs.com/package/mcp-remote):

{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": \["-y", "mcp-remote", "https://mcp.amcharts.com/mcp"\]
    }
  }
}

**Any other MCP client** that accepts a remote URL works too. Use the `/mcp` endpoint (Streamable HTTP). If your client only speaks the older SSE transport, use `https://mcp.amcharts.com/sse` instead.

### Local install (npm)

Prefer to run the server yourself - for offline use, or to pin a version? It's published on npm as [`@amcharts/amcharts5-mcp`](https://www.npmjs.com/package/@amcharts/amcharts5-mcp) and runs over stdio. Node.js 18 or newer is required.

#### Claude Code

Run one command to install globally (available in all projects):

claude mcp add -s user amcharts5 -- npx -y @amcharts/amcharts5-mcp

Or install for the current project only (omit `-s user`):

claude mcp add amcharts5 -- npx -y @amcharts/amcharts5-mcp

#### Cursor, Windsurf, Claude Desktop, Gemini CLI, and others

Add the following to your MCP configuration file:

{
  "mcpServers": {
    "amcharts5": {
      "command": "npx",
      "args": \["-y", "@amcharts/amcharts5-mcp"\]
    }
  }
}

Where to find the config file:

Tool

Config file

Scope

**Cursor**

`.cursor/mcp.json` in project root

Per project

**Cursor** (global)

`~/.cursor/mcp.json`

All projects

**Windsurf**

`~/.codeium/windsurf/mcp_config.json`

Global

**Claude Desktop**

`claude_desktop_config.json` - open it from **Settings > Developer > Edit Config**

Global

**Gemini CLI**

`.gemini/settings.json` (project) or `~/.gemini/settings.json` (global)

Either

**Cline**

MCP Servers panel > Configure

Global

#### VS Code + GitHub Copilot

VS Code uses a slightly different format. Create or edit `.vscode/mcp.json` in your workspace:

{
  "servers": {
    "amcharts5": {
      "type": "stdio",
      "command": "npx",
      "args": \["-y", "@amcharts/amcharts5-mcp"\]
    }
  }
}

#### Codex CLI

Codex uses TOML. Run one command:

codex mcp add amcharts5 -- npx -y @amcharts/amcharts5-mcp

Or add to `~/.codex/config.toml`:

\[mcp\_servers.amcharts5\]
command = "npx"
args = \["-y", "@amcharts/amcharts5-mcp"\]

#### Other MCP-compatible tools

For Continue, Amazon Q Developer, Zed, and other tools that support MCP, configure them to run:

npx -y @amcharts/amcharts5-mcp

Check your tool's documentation for the exact config format.

### Check that it works

Most tools list connected servers somewhere in their UI (Claude Code: run `/mcp`; Cursor and VS Code: the MCP settings page shows a green dot next to `amcharts5`). The quickest end-to-end test is to ask the AI something it can only answer by using the server:

Using the amcharts5 MCP server, list the available chart types.

If the reply comes from a tool call rather than memory, you're set. Restart the tool if the server doesn't appear right after adding it - most clients only read the config on startup.

## Available tools

Once installed, the AI gets access to 11 tools for querying amCharts documentation:

Tool

What it does

`get_core_reference`

Core amCharts 5 docs - setup, themes, colors, events, common pitfalls

`get_chart_reference`

Full reference for a chart type (e.g. "pie", "sankey", "treemap", "ui-elements")

`list_chart_types`

List all available chart types and their keywords

`search_docs`

Search the curated skill reference by keyword (or everything, with `scope: "all"`)

`search_all`

Search across **everything** - docs, examples, and API reference

`get_doc`

Get a full documentation page (e.g. "charts/xy-chart/axes", "getting-started/integrations/react")

`get_section`

Get a specific section from a reference file by heading

`get_quick_start`

Get a minimal working template for any chart type, as a full HTML page or ES module code

`get_api_reference`

Per-class API reference with full settings table and default values (e.g. "XYCursor", "Tooltip")

`list_examples`

Browse all 283 examples, optionally filtered by category

`get_example`

Get the full code for a specific example

You don't need to call these tools yourself. The AI decides which tools to use based on your request and fetches the relevant information automatically. If it doesn't, just tell it: "check the amcharts5 MCP server first".

## What's inside

-   **140+ documentation pages** - getting started, chart guides, concepts (themes, events, adapters, data, animations, accessibility), and framework integration guides (React, Angular, Vue, Next.js, Svelte, and more)
-   **280+ code examples** - working demos across 16 categories: column/bar, line/area, pie/donut, maps, hierarchy, flow, radar/polar, stock, gauges, Gantt, timeline, and more
-   **1,000+ class API references** - every class in the library with its settings, defaults, properties, methods, events, and inheritance chain
-   **Curated skill reference** - quick-start templates and chart-specific guides from the [amCharts 5 AI Skill](https://github.com/amcharts/amcharts5-skill)

The hosted server is updated with every amCharts release. For the local install, `npx -y` fetches the latest published version each time the server starts.

## Links

[@amcharts/amcharts5-mcp on npm](https://www.npmjs.com/package/@amcharts/amcharts5-mcp) · [GitHub repository](https://github.com/amcharts/amcharts5-mcp) · [Using AI with amCharts 5](https://www.amcharts.com/docs/v5/ai/)
