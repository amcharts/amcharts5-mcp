---
title: "MACD"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/macd/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import MACD
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: ChartIndicator

> **Note:** This class also inherits all settings, properties, methods, and events from ChartIndicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **decreasingColor** (`Color`) — Decreasing color.
- **fastPeriod** (`undefined | number`) — A value for "fast" period.
- **increasingColor** (`Color`) — Increasing color.
- **signalColor** (`Color`) — Signal color.
- **signalPeriod** (`undefined | number`) — A value for "signal" period.
- **slowPeriod** (`undefined | number`) — A value for "slow" period.

## Properties

- **differenceSeries** (`ColumnSeries`) — Indicator series for the difference.
- **series** (`LineSeries`) — Indicator series.
- **signalSeries** (`LineSeries`) — Indicator series for the signal.
