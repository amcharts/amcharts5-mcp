---
title: "OverboughtOversold"
type: "class"
source: "https://docs.amcharts.com/v5/reference/overboughtoversold/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for indicators with overbought and oversold levels, drawn in a panel of their own.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.OverboughtOversold.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings
Extended by: CommodityChannelIndex, RelativeStrengthIndex, StochasticMomentumIndex, StochasticOscillator, WilliamsR

## Settings and related interfaces

- Settings: `IOverboughtOversoldSettings` — get_api_reference shows it after this page
- Private settings: `IOverboughtOversoldPrivate`
- Events: `IOverboughtOversoldEvents`

## Properties

Public properties (not settings):

- **middle** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the middle line, halfway between the two levels.
- **overBought** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the overbought line.
- **overBoughtRange** (`ILineSeriesAxisRange`) — Axis range that colors the part of the series above `overBought`.
- **overSold** (`DataItem<IValueAxisDataItem>`) — Y axis data item of the oversold line.
- **overSoldRange** (`ILineSeriesAxisRange`) — Axis range that colors the part of the series below `overSold`.
- **series** (`LineSeries`) — The indicator's series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ChartIndicator")`) for signatures and descriptions.

- _ChartIndicator_: hide, show
- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
