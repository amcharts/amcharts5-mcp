---
title: "SerialChartContainer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serialchartcontainer/"
scraped: "2026-09-14"
---

A `SerialChart` whose `seriesContainer` is a `ZoomableContainer`, so that the chart contents can be zoomed and panned.

Unlike the abstract `SerialChart`, this chart attaches its `seriesContainer` to the display tree on its own, so it can be instantiated and used directly — e.g. to make a `ForceDirected`, `Tree` or `Pack` series zoomable/pannable. Bullets sit alongside the series inside the zoomable container, so they zoom and pan with it.

@since 5.20.2

## Import

```javascript
// Import SerialChartContainer — exported from the root module, not a chart package
import * as am5 from "@amcharts/amcharts5"
const chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));
```

## Inheritance

Extends: SerialChart

> **Note:** This class also inherits all settings, properties, methods, and events from SerialChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **zoomTools** (`ZoomTools`) — A ZoomTools instance to add to the chart. When set, its `target` is automatically pointed at the chart's `seriesContainer`.

## Properties

- **zoomableContainer** (`ZoomableContainer`) — Default ZoomableContainer.new() A ZoomableContainer which holds chart's `seriesContainer` so it can be zoomed and panned. Theme tag `serialchartcontainer` (default theme: `wheelable: false`, `pinchZoom: false`, `maskContent: true`).
