---
title: "AxisRendererX"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrendererx/"
scraped: "2026-03-15"
---

Used to render horizontal axis.

## Import

```javascript
// Import AxisRendererX
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: AxisRenderer
Extended by: GanttDateAxisRenderer

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRenderer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **inside** (`undefined | false | true`) — Default false If set to true, all axis elements (ticks, labels) will be drawn inside plot area. Click here for more info
- **opposite** (`undefined | false | true`) — Default false If set to true the axis will be drawn on the opposite side of the plot area. Click here for more info

## Properties

- **labelTemplate** (`Template`) — (no description)
- **thumb** (`Rectangle`) — Default Rectangle.new(this._root, { width: p100, isMeasured: false, themeTags: ["axis", "x", "thumb", "zoomgrip"] })
