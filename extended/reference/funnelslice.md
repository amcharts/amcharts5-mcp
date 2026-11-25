---
title: "FunnelSlice"
type: "class"
source: "https://docs.amcharts.com/v5/reference/funnelslice/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A slice of a `FunnelSeries` or `PyramidSeries`: a trapezoid whose sides can curve. The links between slices are also drawn with it.

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.FunnelSlice.new(root, { /* settings */ });
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IFunnelSliceSettings` — get_api_reference shows it after this page
- Private settings: `IFunnelSlicePrivate`

## Methods

- `getPoint(locationX: number, locationY: number): IPoint`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
