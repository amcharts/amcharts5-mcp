---
title: "Trix"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/trix/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import Trix
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: ChartIndicator

> **Note:** This class also inherits all settings, properties, methods, and events from ChartIndicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **signalColor** (`Color`) — Signal color.
- **signalPeriod** (`undefined | number`) — A value for "signal" period.

## Properties

- **series** (`LineSeries`) — Indicator series.
- **signalSeries** (`LineSeries`) — Indicator series for the signal.
