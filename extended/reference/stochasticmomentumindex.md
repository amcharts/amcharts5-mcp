---
title: "StochasticMomentumIndex"
type: "class"
source: "https://docs.amcharts.com/v5/reference/stochasticmomentumindex/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Stochastic Momentum Index indicator: where the price is relative to the middle of the high-low range of the last `period` data items, smoothed and scaled to `-100` to `100`. Drawn in a panel of its own.

_Since 5.5.3._ Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

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

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ChartIndicator")`) for signatures and descriptions.

- _ChartIndicator_: hide, show
- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
