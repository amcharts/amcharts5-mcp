---
title: "StochasticMomentumIndex"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stochasticmomentumindex/"
scraped: "2026-03-15"
---

An implementation of a StockChart indicator.
@since 5.5.3

## Import

```javascript
// Import StochasticMomentumIndex
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: OverboughtOversold

> **Note:** This class also inherits all settings, properties, methods, and events from OverboughtOversold (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **dPeriod** (`undefined | number`) — D period.
- **emaColor** (`Color`) — A color for "ema" line.
- **emaPeriod** (`undefined | number`) — EMA period.
- **kPeriod** (`undefined | number`) — K period.

## Properties

- **emaSeries** (`LineSeries`) — Indicator series.
