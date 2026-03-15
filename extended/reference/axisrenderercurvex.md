---
title: "AxisRendererCurveX"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderercurvex/"
scraped: "2026-03-15"
---

Renderer for CurveChart "horizontal" axes.

## Import

```javascript
// Import AxisRendererCurveX
import * as am5timeline from "@amcharts/amcharts5/timeline"
```

## Inheritance

Extends: AxisRenderer

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRenderer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **points** (`Array`) — Array of control points to draw axis along.
- **rotateLabels** (`undefined | false | true`) — If labels rotation should be adjusted to the axis rotation

## Properties

- **axisFills** (`ListTemplate`) — Default new ListTemplate<Slice> A list of fills in the axis. axisFills.template can be used to configure axis fills.
- **chart** (`CurveChart | undefined`) — Chart this renderer is for.
- **labels** (`ListTemplate`) — Default new ListTemplate<AxisLabelRadial> A list of labels in the axis. labels.template can be used to configure labels.
- **pointDistance** (`Array`) — Default []
- **pointPostion** (`Array`) — Default []
