---
title: "PieChart"
type: "class"
source: "https://docs.amcharts.com/v5/reference/piechart/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A pie or donut chart. Several `PieSeries` in one chart split the space between `innerRadius` and `radius` into concentric rings, unless they set their own radii.

Docs: https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.PieChart.new(root, { /* settings */ });
```

## Inheritance

Extends: PercentChart → SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPieChartSettings` — get_api_reference shows it after this page
- Private settings: `IPieChartPrivate`

## Methods

- `innerRadius(series?: PieSeries): number` — Returns the inner radius in pixels, of the whole pie or of one series. Parameters: `series`: Series to get the inner radius of. Returns: Radius in pixels
- `radius(series?: PieSeries): number` — Returns the outer radius in pixels, of the whole pie or of one series. Parameters: `series`: Series to get the radius of. Returns: Radius in pixels

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
