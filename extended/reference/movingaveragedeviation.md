---
title: "MovingAverageDeviation"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/movingaveragedeviation/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import MovingAverageDeviation
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: ChartIndicator

> **Note:** This class also inherits all settings, properties, methods, and events from ChartIndicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **decreasingColor** (`Color`) — Decreasing color.
- **increasingColor** (`Color`) — Increasing color.
- **type** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — Default "simple" Type of the moving average.
- **unit** (`"points" | "percent"`) — Default "points" How units are calculated.

## Properties

- **series** (`ColumnSeries`) — Indicator series.
