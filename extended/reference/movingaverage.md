---
title: "MovingAverage"
type: "class"
source: "https://docs.amcharts.com/v5/reference/movingaverage/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Moving Average indicator: a line over the main series, averaging `field` over the last `period` data items.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.MovingAverage.new(root, { /* settings */ });
```

## Inheritance

Extends: Indicator → Container → Sprite → Entity → Settings
Extended by: BollingerBands, MovingAverageEnvelope

## Settings and related interfaces

- Settings: `IMovingAverageSettings` — get_api_reference shows it after this page
- Private settings: `IMovingAveragePrivate`
- Events: `IMovingAverageEvents`

## Properties

Public properties (not settings):

- **series** (`LineSeries`) — The indicator's series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Indicator")`) for signatures and descriptions.

- _Indicator_: hide, markDataDirty, setCustomData, show
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
