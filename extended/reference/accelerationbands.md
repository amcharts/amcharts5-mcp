---
title: "AccelerationBands"
type: "class"
source: "https://docs.amcharts.com/v5/reference/accelerationbands/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Acceleration Bands indicator: bands above the high and below the low that widen as the high-low range grows, and their middle line, each averaged over `period`. Drawn over the main series.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.AccelerationBands.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAccelerationBandsSettings` — get_api_reference shows it after this page
- Private settings: `IAccelerationBandsPrivate`
- Events: `IAccelerationBandsEvents`

## Properties

Public properties (not settings):

- **lowerBandSeries** (`LineSeries`) — Series of the lower band.
- **upperBandSeries** (`LineSeries`) — Series of the upper band.

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
