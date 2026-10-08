---
title: "AxisRendererCurveY"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderercurvey/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Renderer for the Y axis of a `CurveChart`, which runs across the X axis line all along it.

_Since 5.12.0._ Docs: https://www.amcharts.com/docs/v5/charts/timeline/

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
