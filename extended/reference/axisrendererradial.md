---
title: "AxisRendererRadial"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrendererradial/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
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
