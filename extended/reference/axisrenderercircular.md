---
title: "AxisRendererCircular"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderercircular/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
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
