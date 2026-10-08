---
title: "StochasticOscillator"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stochasticoscillator/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Stochastic Oscillator indicator: where the price is within the high-low range of the last `period` data items, from `0` to `100`, with a slow line averaging it. Drawn in a panel of its own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.StochasticOscillator.new(root, { /* settings */ });
```

## Inheritance

Extends: OverboughtOversold → ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IStochasticOscillatorSettings` — get_api_reference shows it after this page
- Private settings: `IStochasticOscillatorPrivate`
- Events: `IStochasticOscillatorEvents`

## Properties

Public properties (not settings):

- **slowSeries** (`LineSeries`) — Series of the slow (%D) line.
