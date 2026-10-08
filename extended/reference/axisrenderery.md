---
title: "AxisRendererY"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderery/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Renderer for a vertical (Y) axis.

Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/#Axis_renderer

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
