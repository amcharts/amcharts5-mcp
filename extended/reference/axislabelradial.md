---
title: "AxisLabelRadial"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axislabelradial/"
scraped: "2026-03-15"
---

Draws a label on a circular axis.

## Import

```javascript
// Import AxisLabelRadial
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: RadialLabel

> **Note:** This class also inherits all settings, properties, methods, and events from RadialLabel (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **location** (`undefined | number`) — Relative location of the label within the cell. 0 - beginning, 0.5 - middle, 1 - end.
- **maxPosition** (`undefined | number`) — Default 0 The maximum relative position within visible axis scope the label can appear on. E.g. 0.9 will mean that label will not be shown if it's closer to the end of the axis than 10%.
- **minPosition** (`undefined | number`) — Default 0 The minimum relative position within visible axis scope the label can appear on. E.g. 0.1 will mean that label will not be shown if it's closer to the beginning of the axis than 10%.
- **multiLocation** (`undefined | number`) — Relative location of the label within the cell when it spans multiple intervals. 0 - beginning, 0.5 - middle, 1 - end.
