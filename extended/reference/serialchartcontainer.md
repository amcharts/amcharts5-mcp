---
title: "SerialChartContainer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/serialchartcontainer/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A chart for series of any kind, such as a force-directed tree, that can be zoomed and panned: its series sit in a `ZoomableContainer`.

_Since 5.20.2._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.SerialChartContainer.new(root, { /* settings */ });
```

## Inheritance

Extends: SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISerialChartContainerSettings` — get_api_reference shows it after this page
- Private settings: `ISerialChartContainerPrivate`
- Events: `ISerialChartContainerEvents`

## Properties

Public properties (not settings):

- **zoomableContainer** (`ZoomableContainer`) — The `ZoomableContainer` that holds the series and their bullets, so they can be zoomed and panned. _Note:_ Theme tag `serialchartcontainer`: the default theme sets `wheelable: false`, `pinchZoom: false` and `maskContent: true` on it.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
