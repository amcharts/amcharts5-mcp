---
title: "RadarChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/radarchart/"
scraped: "2026-03-15"
---

Radar chart.

## Import

```javascript
// Import RadarChart
import * as am5radar from "@amcharts/amcharts5/radar"
```

## Inheritance

Extends: XYChart

> **Note:** This class also inherits all settings, properties, methods, and events from XYChart (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **cursor** (`RadarCursor`) — RadarCursor instance. Click here for more info
- **endAngle** (`undefined | number`) — Default 270 Chart end angle in degress. Click here for more info
- **innerRadius** (`number | Percent`) — Inner radius of the chart. Can be set in pixels or percent, relative to outer radius. Setting to negative number will mean pixels from outer radius. Click here for more info
- **radius** (`number | Percent`) — Default 80% Outer radius of the chart. Can be set in pixels or percent, relative to available space. Click here for more info
- **startAngle** (`undefined | number`) — Default -90 Chart start angle in degress. Click here for more info

## Properties

- **radarContainer** (`Container`) — Default Container.new() Container where radar-related elements go.
