---
title: "BollingerBands"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/bollingerbands/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import BollingerBands
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: MovingAverage

> **Note:** This class also inherits all settings, properties, methods, and events from MovingAverage (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **lowerColor** (`Color`) — A color for lower section.
- **standardDeviations** (`undefined | number`) — A value of standard deviations.
- **upperColor** (`Color`) — A color for upper section.

## Properties

- **lowerBandSeries** (`LineSeries`) — Indicator series for the lower band.
- **upperBandSeries** (`LineSeries`) — Indicator series for the upper band.
