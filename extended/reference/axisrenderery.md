---
title: "AxisRendererY"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrenderery/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Renderer for a vertical (Y) axis.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/#axis-renderer

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.AxisRendererY.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings
Extended by: GanttCategoryAxisRenderer

## Settings and related interfaces

- Settings: `IAxisRendererYSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererYPrivate`

## Properties

Public properties (not settings):

- **labelTemplate** (`Template<AxisLabel>`)
- **thumb** (`Rectangle`) — The area over the labels that the user drags to zoom the axis when `pan` is `"zoom"`. It shows on hover.

## Methods

- `positionToCoordinate(position: number): number` — Converts a position on the axis (`0` to `1`, `0` being the bottom unless `inversed`) to a pixel coordinate from the axis's top edge, taking zoom into account. Parameters: `position`: Position (0-1). Returns: Coordinate (px)
- `positionToPoint(position: number): IPoint` — Converts a position on the axis (`0` to `1`) to a point in pixels, relative to the axis. Parameters: `position`: Position. Returns: Point

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
