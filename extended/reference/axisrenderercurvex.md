---
title: "AxisRendererCurveX"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderercurvex/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Renderer for the X axis of a `CurveChart`, which runs along the line given in `points`.

_Since 5.12.0._ Docs: https://www.amcharts.com/docs/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.AxisRendererCurveX.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IAxisRendererCurveXSettings` — get_api_reference shows it after this page
- Private settings: `IAxisRendererCurveXPrivate`

## Properties

Public properties (not settings):

- **axisFills** (`ListTemplate<Slice>`) — The axis fills: bands between neighboring grid lines, across the whole Y axis. Configure them through `axisFills.template`.
- **chart** (`CurveChart`) — Chart this renderer is for.
- **labels** (`ListTemplate<AxisLabel>`) — The axis labels. Configure them through `labels.template`.
- **pointDistance** (`number[]`)
- **pointPostion** (`number[]`)
