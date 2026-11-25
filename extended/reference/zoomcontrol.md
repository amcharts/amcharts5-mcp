---
title: "ZoomControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/zoomcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Buttons that zoom a `MapChart` in and out, set as its `zoomControl`. A home button is there too, hidden by default.

Docs: https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.ZoomControl.new(root, { /* settings */ });
```

## Inheritance

Extends: ZoomTools → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IZoomControlSettings` — get_api_reference shows it after this page
- Private settings: `IZoomControlPrivate`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
