---
title: "StochasticMomentumIndex"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stochasticmomentumindex/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Stochastic Momentum Index indicator: where the price is relative to the middle of the high-low range of the last `period` data items, smoothed and scaled to `-100` to `100`. Drawn in a panel of its own.

_Since 5.5.3._ Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StochasticMomentumIndex.new(root, { /* settings */ });
```

## Inheritance

Extends: OverboughtOversold → ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStochasticMomentumIndexSettings` — get_api_reference shows it after this page
- Private settings: `IStochasticMomentumIndexPrivate`
- Events: `IStochasticMomentumIndexEvents`

## Properties

Public properties (not settings):

- **emaSeries** (`LineSeries`) — Series of the signal line (`emaPeriod`).
