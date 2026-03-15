---
title: "XYChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xychart/"
scraped: "2026-03-15"
---

Creates an XY chart.

## Import

```javascript
// Import XYChart
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: SerialChart
Extended by: RadarChart, StockPanel, CurveChart

> **Note:** This class also inherits all settings, properties, methods, and events from SerialChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **arrangeTooltips** (`undefined | false | true`) — Default true If set to false the chart will not check for overlapping of multiple tooltips, and will not arrange them to not overlap. Will work only if chart has an XYCursor enabled. Click here for more info
- **cursor** (`XYCursor`) — Chart's cursor. Click here for more info
- **maxTooltipDistance** (`undefined | number`) — If not set (default), cursor will show tooltips for all data items in the same category/date. If set, cursor will select closest data item to pointer (mouse or touch) and show tooltip for it. It will also show tooltips for all data items that are within X pixels range (as set in maxTooltipDistance). Tooltips for data items farther then X pixels, will not be shown. NOTE: set it to -1 to ensure only one tooltip is displayed, even if there are multiple data items in the same place. Click here for more info
- **maxTooltipDistanceBy** (`"xy" | "x" | "y"`) — Indicates how the distance should be measured when assessing distance between tooltips as set in maxTooltipDistance. Click here for more info @since 5.2.6
- **panX** (`undefined | false | true`) — If this is set to true, users will be able to pan the chart horizontally by dragging plot area. Click here for more info
- **panY** (`undefined | false | true`) — If this is set to true, users will be able to pan the chart vertically by dragging plot area. Click here for more info
- **pinchZoomX** (`undefined | false | true`) — Default false If set to true, using pinch gesture on the chart's plot area will zoom chart horizontally. NOTE: this setting is not supported in a RadarChart. Click here for more info @since 5.1.8
- **pinchZoomY** (`undefined | false | true`) — Default false If set to true, using pinch gesture on the chart's plot area will zoom chart vertically. NOTE: this setting is not supported in a RadarChart. Click here for more info @since 5.1.8
- **scrollbarX** (`Scrollbar`) — horizontal scrollbar. Click here for more info
- **scrollbarY** (`Scrollbar`) — Vertical scrollbar.
- **wheelStep** (`undefined | number`) — Default 0.25 Indicates the relative "speed" of the mouse wheel.
- **wheelX** (`"zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none"`) — Indicates what happens when mouse wheel is spinned horizontally while over plot area. Click here for more info
- **wheelY** (`"zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none"`) — Indicates what happens when mouse wheel is spinned vertically while over plot area. Click here for more info
- **wheelZoomPositionX** (`undefined | number`) — If set, will use this relative position as a "center" for mouse wheel horizontal zooming instead of actual cursor position. Click here for more info @since 5.2.11
- **wheelZoomPositionY** (`undefined | number`) — If set, will use this relative position as a "center" for mouse wheel vertical zooming instead of actual cursor position. Click here for more info @since 5.2.11

## Properties

- **axisHeadersContainer** (`Container`) — Default Container.new() A Container axis headers are stored in. Click here for more info
- **bottomAxesContainer** (`Container`) — Default Container.new() A Container located on bottom of the chart, used to store bottom horizontal axes. Click here for more info
- **gridContainer** (`Container`) — Default Container.new() A Container axis grid elements are stored in. Click here for more info
- **leftAxesContainer** (`Container`) — Default Container.new() A Container located on left of the chart, used to store left-hand vertical axes. Click here for more info
- **plotContainer** (`Container`) — Default Container.new() A Container located in the middle of the chart, used to store actual plots (series). NOTE: plotContainer will automatically have its background preset. If you need to modify background or outline for chart's plot area, you can use plotContainer.get("background") for that.* Click here for more info
- **plotsContainer** (`Container`) — Default Container.new() A Container located in the middle of the chart, used to store plotContainer and topPlotContainer Click here for more info
- **rightAxesContainer** (`Container`) — Default Container.new() A Container located on right of the chart, used to store right-hand vertical axes. Click here for more info
- **topAxesContainer** (`Container`) — Default Container.new() A Container located on top of the chart, used to store top horizontal axes. Click here for more info
- **topGridContainer** (`Container`) — Default Container.new() A Container axis background grid elements are stored in. Click here for more info
- **topPlotContainer** (`Container`) — Default Container.new() A Container used for any elements that need to be displayed over regular plotContainer. Click here for more info
- **xAxes** (`ListAutoDispose`) — Default new ListAutoDispose() A list of horizontal axes.
- **yAxes** (`ListAutoDispose`) — Default new ListAutoDispose() A list of vertical axes.
- **yAxesAndPlotContainer** (`Container`) — Default Container.new() A Container located in the middle the chart, used to store vertical axes and plot area container. Click here for more info
