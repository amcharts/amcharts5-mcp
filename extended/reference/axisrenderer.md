---
title: "AxisRenderer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class for axis renderers, which draw an axis's line, labels, ticks, grid and fills. Not used on its own.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/#Axis_renderer

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
