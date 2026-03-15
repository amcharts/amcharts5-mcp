## MCP Server

The amCharts 5 MCP (Model Context Protocol) server gives AI assistants on-demand access to the complete amCharts 5 knowledge base: documentation, 283 code examples, and 1,098 class API references. Instead of loading everything into context upfront, the AI queries only what it needs — keeping responses fast and accurate.

It works with **Claude Code**, **Claude Desktop**, **Cursor**, **Windsurf**, **VS Code + Copilot**, and any other MCP-compatible tool.

- npm: [@amcharts/amcharts5-mcp](https://www.npmjs.com/package/@amcharts/amcharts5-mcp)
- GitHub: [amcharts/amcharts5-mcp](https://github.com/amcharts/amcharts5-mcp)

### Installing for Claude Code

For **all projects** (global, recommended):

```bash
claude mcp add -s user amcharts5 -- npx -y @amcharts/amcharts5-mcp
```

For **current project only**:

```bash
claude mcp add amcharts5 -- npx -y @amcharts/amcharts5-mcp
```

### Installing for Claude Desktop

Add to your Claude Desktop config file (`claude_desktop_config.json`):

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

### Installing for Cursor

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

### Installing for Windsurf

Edit `~/.codeium/windsurf/mcp_config.json` (or open it via Windsurf settings → Manage MCP Servers → View raw config):

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

### Installing for VS Code + GitHub Copilot

Create or edit `.vscode/mcp.json` in your workspace (or add to your user `settings.json`):

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

For any other tool that supports MCP (Cline, Continue, Amazon Q, Zed, etc.), configure it to run this command:

```bash
npx -y @amcharts/amcharts5-mcp
```

Refer to your tool's documentation for the exact configuration format.

### What's included

The server provides access to **1,500+ documents**:

- **141 documentation pages** — getting started, chart guides, concepts (themes, events, adapters, data binding, animations, accessibility, etc.), and framework integration guides (React, Angular, Vue, Next.js, Svelte, and more).
- **283 code examples** — working demos across 16 categories: column/bar, line/area, pie/donut, maps, hierarchy, flow, radar/polar, stock, gauges, Gantt, timeline, and more. Each example includes full JavaScript, HTML, and CSS.
- **1,098 class API references** — every class in the amCharts 5 library with its settings, properties, methods, events, and inheritance chain.

### Available tools

Once installed, the AI assistant gets access to these tools:

| Tool | What it does |
|------|-------------|
| `get_core_reference` | Get core amCharts 5 docs — setup, themes, colors, events, common pitfalls |
| `get_chart_reference` | Get full reference for a chart type (e.g. "pie", "sankey", "treemap") |
| `list_chart_types` | List all available chart types and their keywords |
| `search_docs` | Search the skill reference docs by keyword |
| `search_all` | Search across **everything** — skill docs, full documentation, and code examples |
| `get_doc` | Get a full documentation page (e.g. "charts/xy-chart/axes", "concepts/events") |
| `get_section` | Get a specific section from a reference file by heading |
| `get_quick_start` | Get a minimal working template for any chart type |
| `list_examples` | Browse all 283 examples, optionally filtered by category |
| `get_example` | Get the full code for a specific example |

### Example usage

Once connected, your AI assistant can do things like:

- **"Build me a pie chart"** — AI calls `get_quick_start("pie")` and adapts the template
- **"How do I format date axis labels?"** — AI calls `search_all("date axis label format")`
- **"Show me the Sankey diagram example"** — AI calls `get_example("examples/flow/sankey-diagram")`
- **"What settings does XYChart support?"** — AI calls `get_doc("reference/xychart")`
- **"How do I integrate with React?"** — AI calls `get_doc("getting-started/integrations/react")`

### MCP server vs. Skill files

Both approaches provide the AI with amCharts documentation, but they work differently:

|  | Skill files | MCP server |
|---|---|---|
| **How it works** | Loads full reference docs into context | AI queries only what it needs on demand |
| **Content** | Curated skill reference | 1,500+ docs, examples, and class API references |
| **Context usage** | Higher — entire skill loaded upfront | Lower — only relevant sections fetched |
| **Setup** | Copy files into project or editor config | Single install command |
| **Works with** | Any AI tool (Claude, ChatGPT, Cursor, Copilot, etc.) | MCP-compatible tools (see install instructions above) |
| **Best for** | Editors without MCP support | Claude Code, Claude Desktop, Cursor, Windsurf, VS Code + Copilot |
| **Stays up to date** | Manual update needed | `npm update` pulls latest |

> **Recommendation:** If your tool supports MCP, use the MCP server — it has much more content and uses context more efficiently. If your tool doesn't support MCP, use the skill files.
