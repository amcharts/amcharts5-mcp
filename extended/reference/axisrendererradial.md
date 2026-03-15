---
title: "AxisRendererRadial"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrendererradial/"
scraped: "2026-03-15"
---

Renderer for radial axes.

## Import

```javascript
// Import AxisRendererRadial
import * as am5radar from "@amcharts/amcharts5/radar"
```

## Inheritance

Extends: AxisRenderer

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRenderer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **axisAngle** (`undefined | number`) — @todo am: needs description
- **endAngle** (`undefined | number`) — Series end angle. If not set, will use chart's endAngle. Click here for more info
- **innerRadius** (`number | Percent`) — Inner radius of the axis. If set in percent, it will be relative to chart's own innerRadius. If value is negative, inner radius will be calculated from the outer edge. Click here for more info
- **radius** (`number | Percent`) — Outer radius of the axis. If set in percent, it will be relative to chart's own radius. Click here for more info
- **startAngle** (`undefined | number`) — Series start angle. If not set, will use chart's startAngle. Click here for more info

## Properties

- **chart** (`RadarChart | undefined`) — Chart this renderer is for.
- **labels** (`ListTemplate`) — Default new ListTemplate<AxisLabelRadial> A TemplateList with all the labels attached to the axis. labels.template can be used to configure appearance of the labels.
