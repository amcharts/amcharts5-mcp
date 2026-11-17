---
title: "Scrollbar"
type: "class"
source: "https://docs.amcharts.com/v5/reference/scrollbar/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A control for selecting a range, such as the zoom of a chart's axes: the grips resize the range, the thumb between them moves it.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Scrollbar.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings
Extended by: Slider, XYChartScrollbar

## Settings and related interfaces

- Settings: `IScrollbarSettings` — get_api_reference shows it after this page
- Private settings: `IScrollbarPrivate`
- Events: `IScrollbarEvents`

## Properties

Public properties (not settings):

- **endGrip** (`Button`) — The grip that drags the end of the range.
- **startGrip** (`Button`) — The grip that drags the start of the range.
- **thumb** (`RoundedRectangle`) — The draggable bar between the grips, which moves the selected range. Double-clicking it selects the full range.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
