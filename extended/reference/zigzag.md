---
title: "ZigZag"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zigzag/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import ZigZag
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Indicator

> **Note:** This class also inherits all settings, properties, methods, and events from Indicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **depth** (`undefined | number`) — The minimum number of price bars required where there is no secondary high or low.
- **deviation** (`undefined | number`) — Percentage of price movement you want to set as your threshold

## Properties

- **series** (`LineSeries`) — Indicator series.
