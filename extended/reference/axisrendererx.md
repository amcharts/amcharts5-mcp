---
title: "AxisRendererX"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axisrendererx/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

Renderer for a horizontal (X) axis.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/#axis-renderer

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.AxisRendererX.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings
Extended by: GanttDateAxisRenderer

## Settings and related interfaces

- Settings: `IAxisRendererXSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererXPrivate`

## Properties

Public properties (not settings):

- **labelTemplate** (`Template<AxisLabel>`)
- **thumb** (`Rectangle`) — The area over the labels that the user drags to zoom the axis when `pan` is `"zoom"`. It shows on hover.
