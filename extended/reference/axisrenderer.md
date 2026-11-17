---
title: "AxisRenderer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrenderer/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Base class for axis renderers, which draw an axis's line, labels, ticks, grid and fills. Not used on its own.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/#axis-renderer

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: Graphics → Sprite → Entity → Settings
Extended by: AxisRendererCircular, AxisRendererCurveX, AxisRendererCurveY, AxisRendererRadial, AxisRendererX, AxisRendererY

## Settings and related interfaces

- Settings: `IAxisRendererSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererPrivate`

## Properties

Public properties (not settings):

- **axis** (`Axis<this>`) — The axis this renderer draws.
- **axisFills** (`ListTemplate<Graphics>`) — The axis's fills: bands between grid lines. Configure them all through `axisFills.template`; they are hidden by default.
- **chart** (`XYChart`) — The chart the renderer is used in.
- **grid** (`ListTemplate<Grid>`) — The axis's grid lines. Configure them all through `grid.template`.
- **labels** (`ListTemplate<AxisLabel>`) — The axis's labels. Configure them all through `labels.template`.
- **thumb** (`Graphics`) — The area over the labels that the user drags to zoom the axis when `pan` is `"zoom"`. It shows on hover.
- **ticks** (`ListTemplate<AxisTick>`) — The axis's ticks. Configure them all through `ticks.template`; they are hidden by default.

## Methods

- `axisLength(): number` — Returns the length of the axis in pixels.
- `positionToCoordinate(position: number): number` — Converts a position on the axis (`0` to `1`) to a pixel coordinate along it, taking zoom into account. On an X axis, it is measured from the left edge. Parameters: `position`: Position (0-1). Returns: Coordinate (px)
- `processAxis(): void`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
