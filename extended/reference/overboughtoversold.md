---
title: "OverboughtOversold"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/overboughtoversold/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.

## Import

```javascript
// Import OverboughtOversold
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: ChartIndicator
Extended by: CommodityChannelIndex, RelativeStrengthIndex, StochasticMomentumIndex, StochasticOscillator, WilliamsR

> **Note:** This class also inherits all settings, properties, methods, and events from ChartIndicator (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **overBought** (`undefined | number`) — A value for "overbought" threshold.
- **overBoughtColor** (`Color`) — A color for "overbought" section.
- **overSold** (`undefined | number`) — A value for "oversold" threshold.
- **overSoldColor** (`Color`) — A color for "oversold" section.

## Properties

- **middle** (`DataItem`) — (no description)
- **overBought** (`DataItem`) — (no description)
- **overBoughtRange** (`ILineSeriesAxisRange`) — (no description)
- **overSold** (`DataItem`) — (no description)
- **overSoldRange** (`ILineSeriesAxisRange`) — (no description)
- **series** (`LineSeries`) — Indicator series.
