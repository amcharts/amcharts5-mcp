---
title: "HeatLegend"
type: "class"
source: "https://docs.amcharts.com/v5/reference/heatlegend/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A legend that shows a color scale from `startColor` to `endColor`, with the values at its ends.

Docs: https://docs.amcharts.com/v5/concepts/legend/heat-legend/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.HeatLegend.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IHeatLegendSettings` — get_api_reference shows it after this page
- Private settings: `IHeatLegendPrivate`

## Properties

Public properties (not settings):

- **endLabel** (`Label`) — The `Label` at the end of the scale.
- **labelContainer** (`Container`) — The `Container` that holds the start and end labels.
- **markerContainer** (`Container`) — The `Container` that holds the markers.
- **markers** (`ListTemplate<RoundedRectangle>`) — The rectangles that make up the scale: one per step, or one with a gradient when `stepCount` is `1`.
- **startLabel** (`Label`) — The `Label` at the start of the scale.

## Methods

- `showValue(value: number, text?: string, color?: Color): void` — Shows the tooltip, pointing at a value on the scale. Parameters: `value`: Value to point at; `text`: Tooltip text; the formatted value if not given; `color`: Tooltip background color; the value's color on the scale if not given.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
