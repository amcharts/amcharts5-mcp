---
title: "RadarChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/radarchart/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

An XY chart drawn in a circle: one axis runs around it (`AxisRendererCircular`), the other out from the center (`AxisRendererRadial`). Also used for gauges.

Docs: https://docs.amcharts.com/v5/charts/radar-chart/

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.RadarChart.new(root, { /* settings */ });
```

## Inheritance

Extends: XYChart → SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IRadarChartSettings` — get_api_reference shows it after this page
- Private settings: `IRadarChartPrivate`

## Properties

Public properties (not settings):

- **radarContainer** (`Container`) — default `Container.new()` — Container at the chart's center that holds its axes, grid, series and cursor.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYChart")`) for signatures and descriptions.

- _XYChart_: handleWheel, zoomOut
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
