---
title: "DrawingControl"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/drawingcontrol/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A `StockToolbar` control that turns drawing mode on, with a row of controls for picking the tool and its colors, lines and fonts.

Docs: https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DrawingControl.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IDrawingControlSettings` — get_api_reference shows it after this page
- Private settings: `IDrawingControlPrivate`
- Events: `IDrawingControlEvents`

## Properties

Public properties (not settings):

- **drawingSeries** (`{ [index: string]: DrawingSeries[]; }`) — The drawing series of each tool, keyed by tool name. _Since 5.8.0._
