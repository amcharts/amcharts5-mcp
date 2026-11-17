---
title: "MACross"
type: "class"
source: "https://docs.amcharts.com/v5/reference/macross/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Moving Average Cross indicator: a slow (`period`) and a fast (`fastPeriod`) simple moving average of `field`, drawn over the main series.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MACross.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMACrossSettings` — get_api_reference shows it after this page
- Private settings: `IMACrossPrivate`
- Events: `IMACrossEvents`

## Properties

Public properties (not settings):

- **fastSeries** (`LineSeries`) — Series of the fast moving average.
- **series** (`LineSeries`) — Series of the slow moving average.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Indicator")`) for signatures and descriptions.

- _Indicator_: hide, markDataDirty, setCustomData, show
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
