---
title: "AxisTick"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axistick/"
scraped: "2026-03-15"
---

Draws an axis tick.

## Import

```javascript
// Import AxisTick
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Tick

> **Note:** This class also inherits all settings, properties, methods, and events from Tick (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **inside** (`boolean | undefined`) — Default false If set to true the tick will be shown inside plot area. Click here for more info
- **location** (`undefined | number`) — Relative location of the tick within the cell. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
- **maxPosition** (`undefined | number`) — Default 1 The maximum relative position within visible axis scope the tick can appear on. E.g. 0.9 will mean that tick will not be shown if it's closer to the end of the axis than 10%. Click here for more info
- **minPosition** (`undefined | number`) — Default 0 The minimum relative position within visible axis scope the tick can appear on. E.g. 0.1 will mean that tick will not be shown if it's closer to the beginning of the axis than 10%. Click here for more info
- **multiLocation** (`undefined | number`) — Relative location of the tick within the cell when it spans multiple intervals. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
