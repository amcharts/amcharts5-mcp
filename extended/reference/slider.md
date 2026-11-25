---
title: "Slider"
type: "class"
source: "https://docs.amcharts.com/v5/reference/slider/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A slider with a single grip, for picking one value from `0` to `1`, which it keeps in `start`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Slider.new(root, { /* settings */ });
```

## Inheritance

Extends: Scrollbar → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISliderSettings` — get_api_reference shows it after this page
- Private settings: `ISliderPrivate`
- Events: `ISliderEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
