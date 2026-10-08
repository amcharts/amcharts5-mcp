---
title: "HeatLegend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/heatlegend/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A legend that shows a color scale from `startColor` to `endColor`, with the values at its ends.

Docs: https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/

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
