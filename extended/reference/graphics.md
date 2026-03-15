---
title: "Graphics"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/graphics/"
scraped: "2026-03-15"
---

Base class used for drawing shapes.

## Import

```javascript
// Import Graphics
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Sprite
Extended by: Rectangle, Circle, FlowLink, Slice, FunnelSlice, Line, PointedRectangle, Polygon, Ellipse, Star, Triangle, OrthogonalLine, Grid, AxisRenderer, HierarchyLink, MapLine, MapPolygon

> **Note:** This class also inherits all settings, properties, methods, and events from Sprite (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **draw** (`undefined | ( display: IGraphics, graphics: Graphics) => void`) — Drawing function. Must use renderer (display parameter) methods to draw. Click here for more info
- **fill** (`Color`) — Fill color. Click here for more information
- **fillGradient** (`Gradient`) — Fill gradient. Click here for more information
- **fillOpacity** (`undefined | number`) — Opacity of the fill. 0 - fully transparent; 1 - fully opaque.
- **fillPattern** (`Pattern`) — Fill pattern. Click here for more information
- **lineCap** (`"butt" | "round" | "square"`) — Default "butt" This setting determines the shape used to draw the end points of lines. Click here for more info @since 5.10.8
- **lineJoin** (`"miter" | "round" | "bevel"`) — Default "miter" A method to be used on anchor points (joints) of the multi-point line. Click here for more info @since 5.2.10
- **nonScalingStroke** (`undefined | false | true`) — Default false Indicates if stroke of a Graphics should stay the same when it's scale changes. Note, this doesn't take into account parent container scale changes.
- **shadowBlur** (`undefined | number`) — Blurriness of the the shadow. The bigger the number, the more blurry shadow will be. Click here for more info
- **shadowColor** (`Color | null`) — Color of the element's shadow. For this to work at least one of the following needs to be set as well: shadowBlur, shadowOffsetX, shadowOffsetY. Click here for more info
- **shadowOffsetX** (`undefined | number`) — Horizontal shadow offset in pixels. Click here for more info
- **shadowOffsetY** (`undefined | number`) — Vertical shadow offset in pixels. Click here for more info
- **shadowOpacity** (`undefined | number`) — Opacity of the shadow (0-1). If not set, will use the same as fillOpacity of the element. Click here for more info
- **stroke** (`Color`) — Stroke (border or line) color. Click here for more information
- **strokeDasharray** (`number[] | number`) — Stroke (border or line) dash settings. Click here for more information
- **strokeDashoffset** (`undefined | number`) — Stroke (border or line) dash offset. Click here for more information
- **strokeGradient** (`Gradient`) — Stroke (border or line) gradient. Click here for more information
- **strokeOpacity** (`undefined | number`) — Opacity of the stroke (border or line). 0 - fully transparent; 1 - fully opaque.
- **strokePattern** (`Pattern`) — Stroke (border or line) pattern. Click here for more information
- **strokeWidth** (`undefined | number`) — Width of the stroke (border or line) in pixels.
- **svgPath** (`undefined | string`) — Draw a shape using an SVG path. Click here for more information
