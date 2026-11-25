---
title: "SerpentineChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/serpentinechart/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A timeline that winds back and forth in runs joined by half-circle turns. It builds the X axis line itself, so the X renderer needs no `points`.

It is experimental and does not support everything an `XYChart` does.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.SerpentineChart.new(root, { /* settings */ });
```

## Inheritance

Extends: CurveChart → XYChart → SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISerpentineChartSettings` — get_api_reference shows it after this page
- Private settings: `ISerpentineChartPrivate`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYChart")`) for signatures and descriptions.

- _XYChart_: handleWheel, zoomOut
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
