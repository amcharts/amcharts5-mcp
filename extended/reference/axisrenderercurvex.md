---
title: "AxisRendererCurveX"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrenderercurvex/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Renderer for the X axis of a `CurveChart`, which runs along the line given in `points`.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.AxisRendererCurveX.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAxisRendererCurveXSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererCurveXPrivate`

## Properties

Public properties (not settings):

- **axisFills** (`ListTemplate<Slice>`) — The axis fills: bands between neighboring grid lines, across the whole Y axis. Configure them through `axisFills.template`.
- **chart** (`CurveChart`) — Chart this renderer is for.
- **labels** (`ListTemplate<AxisLabel>`) — The axis labels. Configure them through `labels.template`.
- **pointDistance** (`number[]`)
- **pointPostion** (`number[]`)

## Methods

- `axisLength(): number` — Returns the length of the axis line as drawn, in pixels: the length along `points` times the scale that fits them into the chart. Returns: Length
- `getPoints(positionX: number, positionY: number, endPositionX: number, endPositionY: number): IPoint[]`
- `indexToPosition(index: number): number`
- `pointToPosition(point: IPoint): IPoint`
- `positionToAngle(position: number): number` — Returns the angle in degrees across the axis line at a position: the line's direction there plus 90. Parameters: `position`: Position on the axis, `0` to `1`. Returns: Angle in degrees
- `positionToIndex(position: number): number`
- `positionToPoint(position: number, positionY?: number, doNotFix?: boolean): IPoint` — Converts a position on this axis and one on the Y axis to an X/Y point. Parameters: `position`: Position on this axis, `0` to `1`; `positionY`: Position on the Y axis, `0` to `1`; `doNotFix`: `position` is already relative to the visible (zoomed) range. Returns: Point

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("AxisRenderer")`) for signatures and descriptions.

- _AxisRenderer_: positionToCoordinate
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
