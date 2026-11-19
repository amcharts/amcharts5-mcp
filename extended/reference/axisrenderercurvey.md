---
title: "AxisRendererCurveY"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrenderercurvey/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Renderer for the Y axis of a `CurveChart`, which runs across the X axis line all along it.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.AxisRendererCurveY.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAxisRendererCurveYSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererCurveYPrivate`

## Properties

Public properties (not settings):

- **chart** (`CurveChart`) — Chart this renderer is for.
- **labels** (`ListTemplate<AxisLabelRadial>`) — The axis labels, placed at the start of the X axis line. Configure them through `labels.template`.

## Methods

- `axisLength(): number` — Returns the `axisLength` setting. Returns: Length
- `getPoints(positionX: number, positionY: number, endPositionX: number, endPositionY: number): IPoint[] | undefined`
- `positionToCoordinate(position: number): number` — Converts a position on the axis to a distance in pixels from the start of its visible range. Parameters: `position`: Position. Returns: Pixels
- `positionToPoint(position: number, positionX?: number, doNotFix?: boolean): IPoint` — Converts a position on this axis and one on the X axis to an X/Y point. Parameters: `position`: Position on this axis, `0` to `1`; `positionX`: Position on the X axis, `0` to `1`; `doNotFix`: `positionX` is already relative to the X axis's visible (zoomed) range. Returns: Point

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
