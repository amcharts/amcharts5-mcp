---
title: "CurveChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/curvechart/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A timeline chart along any curve: the X axis runs along the `points` of its `AxisRendererCurveX`, and the Y axis across it. Also the base of `SerpentineChart` and `SpiralChart`.

It is experimental and does not support everything an `XYChart` does.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.CurveChart.new(root, { /* settings */ });
```

## Inheritance

Extends: XYChart → SerialChart → Chart → Container → Sprite → Entity → Settings
Extended by: SerpentineChart, SpiralChart

## Settings and related interfaces

- Settings: `ICurveChartSettings` — get_api_reference shows it after this page
- Private settings: `ICurveChartPrivate`

## Properties

Public properties (not settings):

- **curveContainer** (`Container`) — Container at the center of the plot area with the axes, grid, series, bullets and cursor.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYChart")`) for signatures and descriptions.

- _XYChart_: handleWheel, zoomOut
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
