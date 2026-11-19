---
title: "XYChartScrollbar"
type: "class"
source: "https://docs.amcharts.com/v5/reference/xychartscrollbar/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A scrollbar with a small preview chart in it. Add axes and series to its `chart` to draw the preview.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/#scrollbar-with-chart-preview

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.XYChartScrollbar.new(root, { /* settings */ });
```

## Inheritance

Extends: Scrollbar → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IXYChartScrollbarSettings` — get_api_reference shows it after this page
- Private settings: `IXYChartScrollbarPrivate`

## Properties

Public properties (not settings):

- **chart** (`XYChart`) — The preview chart inside the scrollbar. It does not react to the pointer.
- **overlay** (`Graphics`) — Shading drawn over the parts of the preview outside the selected range.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
