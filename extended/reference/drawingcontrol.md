---
title: "DrawingControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/drawingcontrol/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A `StockToolbar` control that turns drawing mode on, with a row of controls for picking the tool and its colors, lines and fonts.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/drawing-control/

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

## Methods

- `addLine(tool: "Horizontal Line" | "Horizontal Ray" | "Vertical Line", panel: StockPanel, point: IPoint): void` — Adds a horizontal line, horizontal ray or vertical line drawing through a point, without the pointer. Parameters: `tool`: Drawing tool; `panel`: Panel; `point`: Point relative to the root. _Since 5.10.2._
- `clearDrawings(): void` — Deletes all drawings made with the control's tools. _Since 5.3.9._
- `serializeDrawings(output?: "object" | "string", indent?: string): Array<unknown> | string` — Serializes all drawings of the chart into an array of objects (`output: "object"`) or into JSON (`"string"`, the default). Parameters: `output`: Output format; `indent`: Line indent in JSON. Returns: Serialized drawings _Since 5.3.0._ Docs: https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/
- `setEraser(active: boolean): void` — Turns erasing on or off: while on, a click on a drawing deletes it. Parameters: `active`: Eraser active. _Since 5.3.9._
- `unserializeDrawings(data: string | Array<any>): void` — Adds drawings to the chart from data made by `serializeDrawings()`. Parameters: `data`: Serialized data. _Since 5.3.0._ Docs: https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
