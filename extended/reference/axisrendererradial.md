---
title: "AxisRendererRadial"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrendererradial/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Renderer for an axis that runs out from the center of a `RadarChart`.

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.AxisRendererRadial.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAxisRendererRadialSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererRadialPrivate`

## Properties

Public properties (not settings):

- **chart** (`RadarChart`) — The chart this renderer is for.
- **labels** (`ListTemplate<AxisLabelRadial>`) — default `new ListTemplate<AxisLabelRadial>` — Labels of the axis. Configure them through `labels.template`.

## Methods

- `axisLength(): number` — Returns the axis length in pixels, from its inner to its outer radius. Returns: Length
- `positionToCoordinate(position: number): number` — Converts a relative position on the axis to a distance from its inner radius. Parameters: `position`: Position (0-1). Returns: Distance in pixels
- `positionToPoint(position: number): IPoint` — Converts a relative position on the axis to a point on the axis line. Parameters: `position`: Position (0-1). Returns: Point relative to the chart's center

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
