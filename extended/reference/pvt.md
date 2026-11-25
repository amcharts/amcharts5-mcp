---
title: "PVT"
type: "class"
source: "https://docs.amcharts.com/v5/reference/pvt/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Price Volume Trend indicator: a running total of each close's percentage change from the previous one, times volume. Drawn in a panel of its own.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PVT.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPVTSettings` — get_api_reference shows it after this page
- Private settings: `IPVTPrivate`
- Events: `IPVTEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ChartIndicator")`) for signatures and descriptions.

- _ChartIndicator_: hide, show
- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
