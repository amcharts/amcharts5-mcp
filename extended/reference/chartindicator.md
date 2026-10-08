---
title: "ChartIndicator"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chartindicator/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for `StockChart` indicators drawn in a panel of their own.

Docs: https://www.amcharts.com/docs/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings
Extended by: AccumulationDistribution, AccumulativeSwingIndex, Aroon, AverageTrueRange, AwesomeOscillator, BullBearPower, ChaikinMoneyFlow, ChaikinOscillator, DisparityIndex, HeikinAshi, MACD, MedianPrice, Momentum, MovingAverageDeviation, OnBalanceVolume, OverboughtOversold, PVT, StandardDeviation, Trix, TypicalPrice, Volume

## Settings and related interfaces

- Settings: `IChartIndicatorSettings` — get_api_reference shows it after this page
- Private settings: `IChartIndicatorPrivate`
- Events: `IChartIndicatorEvents`

## Properties

Public properties (not settings):

- **cursor** (`XYCursor`)
- **legend** (`StockLegend`)
- **panel** (`StockPanel`) — The panel the indicator is drawn in.
- **xAxis** (`DateAxis<AxisRenderer>`) — X axis of the indicator's panel.
- **yAxis** (`ValueAxis<AxisRenderer>`) — Y axis of the indicator's panel.
