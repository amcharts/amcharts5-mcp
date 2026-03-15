---
title: "AxisRendererCurveY"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderercurvey/"
scraped: "2026-03-15"
---

Renderer for CurveChart "vertical" axes.

## Import

```javascript
// Import AxisRendererCurveY
import * as am5timeline from "@amcharts/amcharts5/timeline"
```

## Inheritance

Extends: AxisRenderer

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRenderer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **axisLength** (`undefined | number`) — Default 60 Axis length in pixels. SerpentineChart and SpiralChart will ignore this setting as they calculate axis length by the yAxisRadius setting of a chart itself.
- **axisLocation** (`undefined | number`) — Default 0.5 Relative location of the axis on the chart: 0-1. 0 - start 1 - end
- **rotateLabels** (`undefined | false | true`) — Default false Should axis labels rotation should be adjusted to the axis rotation?
- **xRenderer** (`AxisRendererCurveX`) — X-axis renderer. This setting is required.

## Properties

- **chart** (`CurveChart | undefined`) — Chart this renderer is for.
- **labels** (`ListTemplate`) — Default new ListTemplate<AxisLabelRadial> A TemplateList with all the labels attached to the axis. labels.template can be used to configure appearance of the labels.
