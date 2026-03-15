---
title: "PolylineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/polylineseries/"
scraped: "2026-03-15"
---

Draws a multi-point line (polyline).
Data item
PolylineSeries uses data items of type IPolylineSeriesDataItem.

## Import

```javascript
// Import PolylineSeries
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: DrawingSeries
Extended by: LabelSeries, IconSeries

> **Note:** This class also inherits all settings, properties, methods, and events from DrawingSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **fillShape** (`undefined | false | true`) — Default false Show a closed color-filled shape instead of polyline. @since 5.9.0
- **pointCount** (`undefined | number`) — Number of pre-defined points in a shape. The shape will finish drawing once number is reached. @since 5.9.0
