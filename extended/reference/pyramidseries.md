---
title: "PyramidSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pyramidseries/"
scraped: "2026-03-15"
---

Creates a pyramid series for use in a SlicedChart.

## Import

```javascript
// Import PyramidSeries
import * as am5percent from "@amcharts/amcharts5/percent"
```

## Inheritance

Extends: FunnelSeries
Extended by: PictorialStackedSeries

> **Note:** This class also inherits all settings, properties, methods, and events from FunnelSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **bottomWidth** (`number | Percent`) — Default 0 The width of the base of the pyramid. Can either be a fixed pixel value or percent relative to the space available to the series. Click here for more info
- **topWidth** (`number | Percent`) — Default 0 The width of the tip of the pyramid. Can either be a fixed pixel value or percent relative to the space available to the series. Click here for more info
- **valueIs** (`"area" | "height"`) — Default "area" Determines calculation mechanism for the slice area based on value. Click here for more info
