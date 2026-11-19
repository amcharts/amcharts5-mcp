---
title: "XYChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/xychart/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A chart with X and Y axes, for line, column, scatter and other XY series.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/

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

- **axisHeadersContainer** (`Container`) — default `Container.new()` — Container that holds the axis headers. Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-headers/
- **bottomAxesContainer** (`Container`) — default `Container.new()` — Container below the plot area that holds the X axes. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **gridContainer** (`Container`) — default `Container.new()` — Container in the plot area that holds the axes' grid, below the series. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **leftAxesContainer** (`Container`) — default `Container.new()` — Container left of the plot area that holds the Y axes. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **plotContainer** (`Container`) — default `Container.new()` — The plot area, which holds the series, grid and bullets. It comes with a `background` already set: to change the plot area's fill or outline, configure `plotContainer.get("background")`. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **plotsContainer** (`Container`) — default `Container.new()` — Container that holds `plotContainer` and, over it, `topPlotContainer`. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **rightAxesContainer** (`Container`) — default `Container.new()` — Container right of the plot area that holds the Y axes with `opposite` renderers. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **topAxesContainer** (`Container`) — default `Container.new()` — Container above the plot area that holds the X axes with `opposite` renderers. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **topGridContainer** (`Container`) — default `Container.new()` — Container in the plot area that holds the axis grid drawn above the series, such as axis ranges with `above` set. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **topPlotContainer** (`Container`) — default `Container.new()` — Container over `plotContainer` for elements drawn on top of the plot area, such as the zoom-out button. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **xAxes** (`ListAutoDispose<Axis<AxisRenderer>>`) — The chart's X (horizontal) axes.
- **yAxes** (`ListAutoDispose<Axis<AxisRenderer>>`) — The chart's Y (vertical) axes.
- **yAxesAndPlotContainer** (`Container`) — default `Container.new()` — Container in the middle of the chart that holds the Y axes and the plot area. Docs: https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/
- **zoomOutButton** (`Button`) — default `Button.new()` — Button that zooms the chart out, shown while any axis is zoomed in. Docs: https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#zoom-out-button

## Methods

- `handleWheel(event: { originalEvent: WheelEvent; point: IPoint; target: Container; }): void` — Zooms or pans the chart for a wheel event, as set in `wheelX` and `wheelY`. The chart calls it for the wheel over the plot area; call it yourself to give other elements of the chart the same wheel behavior. Parameters: `event`: Wheel event, with `point` relative to the root.
- `inPlot(point: IPoint): boolean` — Checks if a point is within the plot area. Parameters: `point`: Point relative to the plot area. Returns: `true` if the point is within the plot area
- `zoomOut(): void` — Zooms the chart fully out, on every axis whose `zoomOut` is not `false`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
