---
title: "DrawingToolControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/drawingtoolcontrol/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A dropdown for picking a drawing tool. Created by `DrawingControl`; not meant to be used on its own.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.DrawingToolControl.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IDrawingToolControlSettings` — get_api_reference shows it after this page
- Private settings: `IDrawingToolControlPrivate`
- Events: `IDrawingToolControlEvents`

## Methods

- `setTool(tool: DrawingTools): void` — Shows a tool on the button. Does not dispatch `selected`. Parameters: `tool`: Tool.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
