## MCP Server

The amCharts 5 MCP (Model Context Protocol) server gives AI assistants on-demand access to the full amCharts documentation. Instead of loading everything into context upfront, the AI queries only what it needs — a specific chart type reference, a search for "tooltip formatting", or a quick-start template. This means better answers with less context waste.

It works with **Claude Code**, **Claude Desktop**, **Cursor**, and any MCP-compatible tool.

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

### Installing for Claude Desktop / Cursor

Add to your MCP configuration file (`claude_desktop_config.json` or Cursor MCP settings):

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

### Available tools

Once installed, the AI assistant gets access to these tools:

| Tool | What it does |
|------|-------------|
| `list_chart_types` | List all available chart types and their keywords |
| `get_chart_reference` | Get full reference docs for a specific chart type (e.g. "pie", "sankey", "treemap") |
| `get_core_reference` | Get core amCharts 5 docs — setup, themes, colors, events, common pitfalls |
| `search_docs` | Search across all docs by keyword or topic |
| `get_section` | Get a specific section from any reference file |
| `get_quick_start` | Get a minimal working template for any chart type |

### MCP server vs. Skill files

Both approaches provide the AI with amCharts documentation, but they work differently:

|  | Skill files | MCP server |
|---|---|---|
| **How it works** | Loads full reference docs into context | AI queries only what it needs on demand |
| **Context usage** | Higher — entire skill loaded upfront | Lower — only relevant sections fetched |
| **Setup** | Copy files into project or editor config | Single install command |
| **Works with** | Any AI tool (Claude, ChatGPT, Cursor, Copilot, etc.) | MCP-compatible tools (Claude Code, Claude Desktop, Cursor) |
| **Best for** | Editors without MCP support | Claude Code, Claude Desktop, Cursor |
| **Stays up to date** | Manual update needed | `npm update` pulls latest |

> **Recommendation:** If your tool supports MCP, use the MCP server. If not, use the skill files. You can also use both — the MCP server uses the same content as the skill files.
