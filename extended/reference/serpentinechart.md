---
title: "SerpentineChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/serpentinechart/"
scraped: "2026-03-15"
---

A Serpentine chart.
 For this chart to work, it needs curve points provided via renderer of its X-axis.
 Note: it is an experimental chart type and does not support all the functionality of the XYChart.

## Import

```javascript
// Import SerpentineChart
import * as am5timeline from "@amcharts/amcharts5/timeline"
```

## Inheritance

Extends: CurveChart

> **Note:** This class also inherits all settings, properties, methods, and events from CurveChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **endLocation** (`undefined | number`) — Relative location (0-1) of the end position. @defult 1
- **levelCount** (`undefined | number`) — Default 3 Number of levels in the chart.
- **orientation** (`"horizontal" | "vertical"`) — Default "vertical" Orientation of the serpatine.
- **startLocation** (`undefined | number`) — Relative location (0-1) of the start postion. @defult 0
