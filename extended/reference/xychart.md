---
title: "XYChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xychart/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A chart with X and Y axes, for line, column, scatter and other XY series.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.XYChart.new(root, { /* settings */ });
```

## Inheritance

Extends: SerialChart → Chart → Container → Sprite → Entity → Settings
Extended by: CurveChart, RadarChart, StockPanel

## Settings and related interfaces

- Settings: `IXYChartSettings` — get_api_reference shows it after this page
- Private settings: `IXYChartPrivate`
- Events: `IXYChartEvents`

## Properties

Public properties (not settings):

- **axisHeadersContainer** (`Container`) — default `Container.new()` — Container that holds the axis headers. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
- **bottomAxesContainer** (`Container`) — default `Container.new()` — Container below the plot area that holds the X axes. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **gridContainer** (`Container`) — default `Container.new()` — Container in the plot area that holds the axes' grid, below the series. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **leftAxesContainer** (`Container`) — default `Container.new()` — Container left of the plot area that holds the Y axes. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **plotContainer** (`Container`) — default `Container.new()` — The plot area, which holds the series, grid and bullets. It comes with a `background` already set: to change the plot area's fill or outline, configure `plotContainer.get("background")`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **plotsContainer** (`Container`) — default `Container.new()` — Container that holds `plotContainer` and, over it, `topPlotContainer`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **rightAxesContainer** (`Container`) — default `Container.new()` — Container right of the plot area that holds the Y axes with `opposite` renderers. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **topAxesContainer** (`Container`) — default `Container.new()` — Container above the plot area that holds the X axes with `opposite` renderers. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **topGridContainer** (`Container`) — default `Container.new()` — Container in the plot area that holds the axis grid drawn above the series, such as axis ranges with `above` set. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **topPlotContainer** (`Container`) — default `Container.new()` — Container over `plotContainer` for elements drawn on top of the plot area, such as the zoom-out button. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **xAxes** (`ListAutoDispose<Axis<AxisRenderer>>`) — The chart's X (horizontal) axes.
- **yAxes** (`ListAutoDispose<Axis<AxisRenderer>>`) — The chart's Y (vertical) axes.
- **yAxesAndPlotContainer** (`Container`) — default `Container.new()` — Container in the middle of the chart that holds the Y axes and the plot area. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/xy-chart-containers/
- **zoomOutButton** (`Button`) — default `Button.new()` — Button that zooms the chart out, shown while any axis is zoomed in. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Zoom_out_button
