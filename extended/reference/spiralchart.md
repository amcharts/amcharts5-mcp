---
title: "SpiralChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/spiralchart/"
scraped: "2026-03-15"
---

A spiral chart.
 For this chart to work, it needs curve points provided via renderer of its X-axis.
 Note: it is an experimental chart type and does not support all the functionality of the XYChart.

## Import

```javascript
// Import SpiralChart
import * as am5timeline from "@amcharts/amcharts5/timeline"
```

## Inheritance

Extends: CurveChart

> **Note:** This class also inherits all settings, properties, methods, and events from CurveChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **endAngle** (`undefined | number`) — End angle of the spiral in degrees. default 0
- **innerRadius** (`Percent`) — Default 60% Inner radius of the spiral in percent.
- **levelCount** (`undefined | number`) — Default 3 Numer of spiral circles.
- **startAngle** (`undefined | number`) — Default -90 Start angle of the spiral in degrees.
