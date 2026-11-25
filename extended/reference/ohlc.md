---
title: "OHLC"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ohlc/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A bar of an `OHLCSeries`: a line from the low to the high value, with ticks marking the open and close values.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/series/candlestick-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.OHLC.new(root, { /* settings */ });
```

## Inheritance

Extends: Candlestick → RoundedRectangle → Rectangle → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IOHLCSettings` — get_api_reference shows it after this page
- Private settings: `IOHLCPrivate`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
