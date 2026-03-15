# amCharts 5 MCP Server

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that gives AI assistants on-demand access to amCharts 5 documentation, examples, and API reference.

Works with **Claude Code**, **Claude Desktop**, **Cursor**, and any other MCP-compatible AI tool.

## Why?

Instead of loading the entire amCharts reference into the AI's context window, the MCP server lets the AI **query exactly what it needs** — a specific chart type reference, a search for "tooltip formatting", or a quick-start template. This means better answers with less context waste.

## Quick Start

### Claude Code

```bash
claude mcp add amcharts5 -- npx -y @amcharts/amcharts5-mcp
```

### Claude Desktop / Cursor

Add to your MCP config (`claude_desktop_config.json` or Cursor settings):

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
| `list_chart_types` | List all available chart types and their keywords |
| `get_chart_reference` | Get full reference docs for a chart type (e.g. "pie", "sankey", "xy") |
| `get_core_reference` | Get core amCharts 5 docs — setup, themes, colors, events, common pitfalls |
| `search_docs` | Search across all docs by keyword or topic |
| `get_section` | Get a specific section by heading name from any reference file |
| `get_quick_start` | Get a minimal working example for a chart type (HTML or ESM format) |

## Example Usage

Once connected, your AI assistant can:

- **"Build me a pie chart"** → AI calls `get_quick_start("pie")` and adapts the template
- **"How do I format axis labels?"** → AI calls `search_docs("axis label format")`
- **"Show me the full radar chart API"** → AI calls `get_chart_reference("radar")`
- **"What chart types are available?"** → AI calls `list_chart_types()`

## Content

The server indexes the [amCharts 5 AI Skill](https://github.com/amcharts/amcharts5-skill) documentation covering:

- **Core**: setup, themes, colors, legends, tooltips, events, data, adapters, disposal
- **XY charts**: line, area, bar, column, candlestick, scatter, stacked
- **Pie & Sliced**: pie, donut, funnel, pyramid
- **Maps**: world, country, choropleth, bubble map, point map
- **Hierarchy**: treemap, sunburst, force-directed, pack, partition
- **Flow**: Sankey, chord, arc diagram
- **Radar**: radar, spider, polar, gauge
- **Stock**: financial/trading charts
- **Timeline**: serpentine, spiral, curve
- **Gantt**: project timelines
- **Word Cloud & Venn**
- **UI Elements**: buttons, sliders, steppers, color pickers

## License

MIT
