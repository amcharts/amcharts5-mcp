---
title: "AxisRenderer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisrenderer/"
scraped: "2026-03-15"
---

Base class for an axis renderer.
 Should not be used on its own.

## Import

```javascript
// Import AxisRenderer
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Graphics
Extended by: AxisRendererY, AxisRendererX, AxisRendererCircular, AxisRendererRadial, AxisRendererCurveX, AxisRendererCurveY

> **Note:** This class also inherits all settings, properties, methods, and events from Graphics (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **cellEndLocation** (`undefined | number`) — Default 1 Indicates relative position where "usable" space of the cell ends. 0 - beginning, 1 - end, or anything in-between. Click here for more info
- **cellStartLocation** (`undefined | number`) — Default 0 Indicates relative position where "usable" space of the cell starts. 0 - beginning, 1 - end, or anything in-between. Click here for more info
- **inversed** (`undefined | false | true`) — Default false Set to true to invert direction of the axis. Click here for more info
- **minGridDistance** (`undefined | number`) — The minimum distance between grid lines in pixels. Click here for more info
- **minorGridEnabled** (`undefined | false | true`) — Default false Re-enable display of skipped grid lines due to lack of space and as per the minGridDistance setting. Not recommended for CategoryAxis with a lot of data items. Click here for more info @since 5.6.0
- **minorLabelsEnabled** (`undefined | false | true`) — Default false Enable labels on minor grid. If you enable labels, grid will be enabled automatically. Click here for more info @since 5.6.0
- **pan** (`"none" | "zoom"`) — Default "none" If set to "zoom" will enable axis zoom by panning it in the axis label area. Works on AxisRendererX and AxisRendererY only. For a better result, set maxDeviation to 1 or so on the Axis. Will not work if inside is set to true. @since 5.0.7
- **panSensitivity** (`undefined | number`) — Default 1 Sensitivity of panning. The higher the number, the more sensitive it is.

## Properties

- **axis** (`Axis`) — An Axis renderer is for.
- **axisFills** (`ListTemplate`) — Default new ListTemplate<Graphics> A list of fills in the axis. axisFills.template can be used to configure axis fills.
- **chart** (`XYChart | undefined`) — Chart the renderer is used in.
- **grid** (`ListTemplate`) — Default new ListTemplate<Grid> A list of grid elements in the axis. grid.template can be used to configure grid.
- **labels** (`ListTemplate`) — Default new ListTemplate<AxisLabel> A list of labels in the axis. labels.template can be used to configure axis labels.
- **thumb** (`Graphics`) — A thumb Graphics to be used for panning the axis (the one which shows under the labels when hovered)
- **ticks** (`ListTemplate`) — Default new ListTemplate<AxisTick> A list of ticks in the axis. ticks.template can be used to configure ticks.
