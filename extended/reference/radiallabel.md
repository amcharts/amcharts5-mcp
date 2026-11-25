---
title: "RadialLabel"
type: "class"
source: "https://docs.amcharts.com/v5/reference/radiallabel/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A label placed around a center at an angle and radius, such as a pie slice's label. It can also curve along the arc (`textType`).

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.RadialLabel.new(root, { /* settings */ });
```

## Inheritance

Extends: Label → Container → Sprite → Entity → Settings
Extended by: AxisLabelRadial

## Settings and related interfaces

- Settings: `IRadialLabelSettings` — get_api_reference shows it after this page
- Private settings: `IRadialLabelPrivate`

## Methods

- `baseRadius(): number` — Returns the radius in pixels that `baseRadius` points to. Returns: Base radius
- `radius(): number` — Returns the label's radius in pixels: the base radius plus the `radius` adjustment. Returns: Radius

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Label")`) for signatures and descriptions.

- _Label_: getAccessibleText, getText
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
