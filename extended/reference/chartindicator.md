---
title: "ChartIndicator"
type: "class"
source: "https://docs.amcharts.com/v5/reference/chartindicator/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for `StockChart` indicators drawn in a panel of their own.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

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

## Methods

- `hide(duration?: number): Promise<any>` — Hides the element and returns a `Promise` that resolves when its hiding animations finish.
- `show(duration?: number): Promise<any>` — Shows the element and returns a `Promise` that resolves when its showing animations finish.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Indicator")`) for signatures and descriptions.

- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
