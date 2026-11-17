---
title: "ClockHand"
type: "class"
source: "https://docs.amcharts.com/v5/reference/clockhand/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A gauge needle for a `RadarChart`. Set it as the `sprite` of an axis data item's `AxisBullet`, and it points at that data item's value.

Docs: https://docs.amcharts.com/v5/charts/radar-chart/gauge-charts/#clock-hands

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.ClockHand.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IClockHandSettings` — get_api_reference shows it after this page
- Private settings: `IClockHandPrivate`

## Properties

Public properties (not settings):

- **hand** (`Graphics`) — default `Graphics.new()` — The hand itself, a tapered shape from `innerRadius` to `radius`.
- **pin** (`Graphics`) — default `Graphics.new()` — The pin: a circle at the center, of `pinRadius`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
