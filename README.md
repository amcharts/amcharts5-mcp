# amCharts 5 MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that gives AI assistants on-demand access to the complete amCharts 5 knowledge base: **141 documentation pages**, **283 code examples**, and **1,098 class API references**.

Works with **Claude Code**, **Claude Desktop**, **Cursor**, **Windsurf**, **VS Code + GitHub Copilot**, and any other MCP-compatible AI tool.

[![amCharts 5 Server MCP server](https://glama.ai/mcp/servers/amcharts/amcharts5-mcp/badges/card.svg)](https://glama.ai/mcp/servers/amcharts/amcharts5-mcp)

## Why?

Instead of loading the entire amCharts reference into the AI's context window, the MCP server lets the AI **query exactly what it needs** — a specific chart type reference, a code example, or an API lookup. This means better answers with less context waste.

## Quick Start

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
| `get_core_reference` | Get core amCharts 5 docs — setup, themes, colors, events, common pitfalls |
| `get_chart_reference` | Get full reference for a chart type (e.g. "pie", "sankey", "xy") |
| `list_chart_types` | List all available chart types and their keywords |
| `search_docs` | Search the skill reference docs by keyword |
| `search_all` | Search across **everything** — skill docs, full documentation, and code examples |
| `get_doc` | Get a full documentation page (e.g. "charts/xy-chart/axes", "concepts/events") |
| `get_section` | Get a specific section from a reference file by heading |
| `get_quick_start` | Get a minimal working template for any chart type |
| `list_examples` | Browse all 283 examples, optionally filtered by category |
| `get_example` | Get the full code for a specific example |

## Example Usage

Once connected, your AI assistant can:

- **"Build me a pie chart"** → AI calls `get_quick_start("pie")` and adapts the template
- **"How do I format date axis labels?"** → AI calls `search_all("date axis label format")`
- **"Show me the Sankey diagram example"** → AI calls `get_example("examples/flow/sankey-diagram")`
- **"What settings does XYChart support?"** → AI calls `get_doc("reference/xychart")`
- **"How do I integrate with React?"** → AI calls `get_doc("getting-started/integrations/react")`
- **"What chart types are available?"** → AI calls `list_chart_types()`

## Content

The server includes **1,500+ documents**:

- **141 documentation pages** — getting started, chart guides, concepts (themes, events, adapters, data binding, animations, accessibility, etc.), and framework integration guides (React, Angular, Vue, Next.js, Svelte, and more)
- **283 code examples** — working demos across 16 categories including column/bar, line/area, pie/donut, maps, hierarchy, flow, radar/polar, stock, gauges, Gantt, timeline, and more
- **1,098 class API references** — every class in the amCharts 5 library with its settings, properties, methods, events, and inheritance chain
- **Curated skill reference** — quick-start templates and chart-specific guides from the [amCharts 5 AI Skill](https://github.com/amcharts/amcharts5-skill)

## License

MIT