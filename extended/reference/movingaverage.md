---
title: "MovingAverage"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/movingaverage/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import MovingAverage
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Indicator
Extended by: BollingerBands, MovingAverageEnvelope

> **Note:** This class also inherits all settings, properties, methods, and events from Indicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **offset** (`undefined | number`) — Default 0 Offset.
- **type** (`"simple" | "weighted" | "exponential" | "dema" | "tema"`) — Default "simple" Type of the moving average.

## Properties

- **series** (`LineSeries`) — Indicator series.
