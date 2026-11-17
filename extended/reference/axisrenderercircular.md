---
title: "AxisRendererCircular"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrenderercircular/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Renderer for an axis that runs around a `RadarChart`, from its `startAngle` to its `endAngle`.

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.AxisRendererCircular.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAxisRendererCircularSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererCircularPrivate`

## Properties

Public properties (not settings):

- **axisFills** (`ListTemplate<Slice>`) — default `new ListTemplate<Slice>` — Fills of the axis cells. Configure them through `axisFills.template`.
- **chart** (`RadarChart`) — The chart this renderer is for.
- **labels** (`ListTemplate<AxisLabelRadial>`) — default `new ListTemplate<AxisLabelRadial>` — Labels of the axis. Configure them through `labels.template`.

## Methods

- `axisLength(): number` — Returns the length of the axis's arc in pixels. Returns: Length
- `positionToAngle(position: number): number` — Converts a relative position on the axis to an angle. Parameters: `position`: Position (0-1). Returns: Angle in degrees
- `positionToPoint(position: number): IPoint` — Converts a relative position on the axis to a point on its outer radius. Parameters: `position`: Position (0-1). Returns: Point relative to the chart's center

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("AxisRenderer")`) for signatures and descriptions.

- _AxisRenderer_: positionToCoordinate
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
