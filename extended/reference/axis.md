---
title: "Axis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axis/"
scraped: "2026-03-15"
---

A base class for all axes.

## Import

```javascript
// Import Axis
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Component
Extended by: ValueAxis, CategoryAxis

> **Note:** This class also inherits all settings, properties, methods, and events from Component (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseValue** (`undefined | number`) — Base value of the axis.
- **bullet** (`undefined | ( root: Root, axis: Axis, dataItem: DataItem) => AxisBullet`) — A function that will be used to create bullets on each cell. Click here for more info
- **end** (`undefined | number`) — The initial relative zoom end position of the axis. E.g. stting it to 0.9 will pre-zoom axis to 10% from the end. Click here for more info
- **fixAxisSize** (`undefined | false | true`) — Default true If set to true (default) the axis width will stay constant across all zooms, even if actual length of all visible labels changes.
- **maxDeviation** (`undefined | number`) — Default 0.1 A relative distance the axis is allowed to be zoomed/panned beyond its actual scope. Click here for more info
- **maxZoomCount** (`undefined | number`) — Maximum number of axis elements to show at a time. E.g. for a CategoryAxis that would be number of categories. For a DateAxis it would be number of baseInterval. The axis will not allow to be zoomed out beyond this number. Click here for more info
- **maxZoomFactor** (`number | null`) — Default 1000 Maximum number of times the scope of the axis could auto-zoom-in. This is to prevent axis jumping too drastically when scrolling/zooming.
- **minZoomCount** (`undefined | number`) — Minimum number of axis elements to show at a time. E.g. for a CategoryAxis that would be number of categories. For a DateAxis it would be number of baseInterval. The axis will not allow to be zoomed in beyond this number. Click here for more info
- **minorAxisFillsEnabled** (`undefined | false | true`) — Specifies how axis fill should be drawn (if fill rule allows it). @since 5.14.0
- **panX** (`undefined | false | true`) — If set to false the axis will be exempt when chart is panned horizontally, and will keep its current position.` Click here for more info
- **panY** (`undefined | false | true`) — If set to false the axis will be exempt when chart is panned vertically, and will keep its current position.` Click here for more info
- **renderer** (`R`) — A renderer object which is responsible of rendering visible axis elements. Click here for more info
- **snapTooltip** (`undefined | false | true`) — Default true Should tooltip snap to the tooltipLocation (true) or follow cursor.
- **start** (`undefined | number`) — The initial relative zoom start position of the axis. E.g. stting it to 0.1 will pre-zoom axis to 10% from the start. Click here for more info
- **tooltip** (`Tooltip`) — Tooltip element to use for axis.
- **tooltipLocation** (`undefined | number`) — Default 0.5 tooltipLocation indicates which relative place to snap to: 0 beginning, 0.5 - middle, 1 - end.
- **zoomOut** (`undefined | false | true`) — Default true If set to false, the axis will not be zoomed out when the chart's zoom out button is pressed, and vice versa when axis is zoomed, it will not trigger the button to appear. @since 5.14.0
- **zoomX** (`undefined | false | true`) — If set to false the axis will be exempt when chart is zoomed horizontally, and will keep its current zoom/position.` Click here for more info
- **zoomY** (`undefined | false | true`) — If set to false the axis will be exempt when chart is zoomed vertically, and will keep its current zoom/position.` Click here for more info

## Properties

- **axisHeader** (`Container`) — Default new Container A container above the axis that can be used to add additional stuff into it. For example a legend, label, or an icon. Click here for more info
- **axisRanges** (`List`) — Default new List() A list of axis ranges. Click here for more info
- **bulletsContainer** (`Container`) — Default new Container A Container that holds all the axis bullet elements.
- **chart** (`XYChart | undefined`) — A referenece to the the chart the axis belongs to.
- **ghostLabel** (`AxisLabel`) — A control label that is invisible but is used to keep width the width of the axis constant. Click here for more info
- **gridContainer** (`Container`) — Default Container.new() A Container that holds all the axis grid and fill elements.
- **labelsContainer** (`Container`) — Default Container.new() A Container that holds all the axis label elements.
- **minorDataItems** (`Array`) — Default [] Array of minor data items.
- **series** (`Array`) — A list of series using this axis.
- **topGridContainer** (`Container`) — Default Container.new() A Container that holds axis grid elements which goes above the series.
