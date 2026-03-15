---
title: "AxisRendererY"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderery/"
scraped: "2026-03-15"
---

Used to render vertical axis.

## Import

```javascript
// Import AxisRendererY
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: AxisRenderer
Extended by: GanttCategoryAxisRenderer

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRenderer (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **inside** (`undefined | false | true`) — Default false If set to true, all axis elements (ticks, labels) will be drawn inside plot area.
- **opposite** (`undefined | false | true`) — Default false If set to true the axis will be drawn on the opposite side of the plot area. Click here for more info

## Properties

- **labelTemplate** (`Template`) — (no description)
- **thumb** (`Rectangle`) — Default Rectangle.new(this._root, { height: p100, isMeasured: false, themeTags: ["axis", "y", "thumb", "zoomgrip"] })
