---
title: "Trix"
type: "class"
source: "https://docs.amcharts.com/v5/reference/trix/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Trix indicator: the percentage change of a triple exponential moving average of `field` over `period`, with a signal line. Drawn in a panel of its own.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Trix.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ITrixSettings` — get_api_reference shows it after this page
- Private settings: `ITrixPrivate`
- Events: `ITrixEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — Series of the Trix line.
- **signalSeries** (`LineSeries`) — Series of the signal line.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ChartIndicator")`) for signatures and descriptions.

- _ChartIndicator_: hide, show
- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
