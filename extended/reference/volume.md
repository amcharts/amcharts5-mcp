---
title: "Volume"
type: "class"
source: "https://docs.amcharts.com/v5/reference/volume/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Volume indicator: columns of `volumeSeries`, colored by whether the price closed up or down. Drawn in a panel of its own.

Docs: https://docs.amcharts.com/v5/charts/stock/indicators/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.Volume.new(root, { /* settings */ });
```

## Inheritance

Extends: ChartIndicator → Indicator → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVolumeSettings` — get_api_reference shows it after this page
- Private settings: `IVolumePrivate`
- Events: `IVolumeEvents`

## Properties

Public properties (not settings):

- **series** (`ColumnSeries`) — The indicator's series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ChartIndicator")`) for signatures and descriptions.

- _ChartIndicator_: hide, show
- _Indicator_: markDataDirty, setCustomData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
