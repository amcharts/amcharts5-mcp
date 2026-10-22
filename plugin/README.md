# amCharts 5

Build charts and maps with [amCharts 5](https://www.amcharts.com/), the JavaScript charting library, with your AI assistant. The plugin bundles two things:

- **The amCharts 5 skill.** Rules and working patterns for every chart type in the library:
  - XY charts (line, column, area, candlestick, scatter), pie and funnel charts, maps;
  - hierarchy charts (treemap, sunburst, force-directed), flow charts (Sankey, chord);
  - radar charts and gauges, stock charts, Gantt charts, timelines, word clouds and Venn diagrams.

  It also covers setup, themes, colors, legends, tooltips, exporting, JSON configs, and amCharts' packages for React, Vue, Angular, Svelte and React Native. It lists the mistakes that code written from older knowledge makes most often. The assistant reads the skill when a request is about amCharts or a chart it can build, and opens a chart type's reference only when it needs it.
- **The amCharts MCP server** at `https://mcp.amcharts.com/mcp`. It gives the assistant:
  - the amCharts 5 documentation;
  - 290+ working code examples;
  - the API reference for every class, generated from the library's typings;
  - the list of map files.

  All its tools are read-only.

## Using it

Ask for a chart, for example:

- "Make a stacked column chart of monthly sales by region, with a legend."
- "Show a world map with a bubble for each of our offices."
- "Add a date axis with a scrollbar to this line chart."

The assistant writes amCharts 5 code for your page or app, and looks up the documentation, examples or API reference when it needs more.

amCharts 5 itself is free to use with a small amCharts logo on each chart; a [commercial license](https://www.amcharts.com/online-store/) removes the logo.

## What the plugin sends, and privacy

The skill is text: it runs nothing and sends nothing. The MCP server receives the assistant's tool requests, such as a search phrase, a chart type or a doc path. Neither part needs an account or asks for personal data.

- **Tool requests** are used only to build the answer, and are not logged or stored. A response is kept in the session's storage only until it has been delivered (so a dropped stream can resume), then deleted.
- **Session storage:** the server keeps the AI app's MCP initialize message in the session's storage. That message holds what the app says about itself (its name and version, and whatever else it puts there), the protocol version and the app's MCP capabilities. All of the session's storage is deleted when the app ends the session, or 24 hours after its last request.
- **Logs:** the server keeps no request logs. It runs on Cloudflare Workers, and Cloudflare processes each request, including its IP address, to deliver it. Error and warning messages are logged and kept for up to 7 days; they hold no request contents or tool arguments.

The details are in the [Privacy section of the server's README](https://github.com/amcharts/amcharts5-mcp#privacy) and in the [amCharts privacy policy](https://www.amcharts.com/privacy-policy/).

## More

- **amCharts and AI:** https://www.amcharts.com/docs/v5/ai/
- **Source:** this folder is generated from the [amCharts 5 skill](https://github.com/amcharts/amcharts5-skill) and this repository, which also holds the MCP server.
- **Issues:** https://github.com/amcharts/amcharts5-mcp/issues
- **License:** MIT (this plugin). amCharts 5 has its own license, described above.
