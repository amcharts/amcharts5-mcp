---
title: "DrawingSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/drawingseries/"
scraped: "2026-03-15"
---

Data item
DrawingSeries uses data items of type IDrawingSeriesDataItem.

## Import

```javascript
// Import DrawingSeries
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: LineSeries
Extended by: SimpleLineSeries, PolylineSeries, DoodleSeries, EllipseSeries

> **Note:** This class also inherits all settings, properties, methods, and events from LineSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **field** (`"open" | "value" | "low" | "high"`) — Default "value" Value field to use when snapping data or calculating averages/regresions/etc.
- **fillColor** (`Color`) — Color of the fills.
- **fillOpacity** (`undefined | number`) — Opacity of the fills (0-1).
- **selectorPadding** (`undefined | number`) — Default 5 Padding of a selector rectangle (how many pixels will be added to each side around the drawing when it's selected)
- **series** (`XYSeries`) — XYSeries used for drawing.
- **strokeColor** (`Color`) — Color of the lines/borders.
- **strokeDasharray** (`Array`) — Dash information for lines/borders.
- **strokeOpacity** (`undefined | number`) — Opacity of the lines/borders (0-1).
- **strokeWidth** (`undefined | number`) — Width of the lines/borders in pixels.
- **xAxis** (`DateAxis`) — X-Axis.

## Properties

- **circles** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Circle._new(this._root, { }, [this.circles.template]), ))
- **grips** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Container._new(this._root, { themeTags: ["grip"], setStateOnChildren: true, draggable: true }, [this.grips.template]), ))
- **outerCircles** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Circle._new(this._root, { themeTags: ["outline"] }, [this.outerCircles.template]), ))
- **selectors** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Rectangle._new(this._root, { themeTags: ["selector"] }, [this.selectors.template]), ))
