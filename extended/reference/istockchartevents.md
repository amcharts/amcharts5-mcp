---
title: "IStockChartEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockchartevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerEvents
All ancestors: IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5stock.IStockChartEvents` (`import type { IStockChartEvents } from "@amcharts/amcharts5/stock"`)

## Events

- **drawingsupdated** (`{}`) — A drawing was added, changed or removed.
- **indicatorsupdated** (`{}`) — An indicator was added or removed, or one of its editable settings changed.
- **drawingadded** (`{ drawingId: string; series: DrawingSeries; index: number; }`) — A drawing was added. _Since 5.9.0._
- **drawingremoved** (`{ drawingId: string; series: DrawingSeries; index: number; }`) — A drawing was removed. _Since 5.9.0._
- **drawingselected** (`{ drawingId: string; series: DrawingSeries; index: number; }`) — A drawing was selected. _Since 5.9.0._
- **drawingunselected** (`{ drawingId: string; series: DrawingSeries; index: number; }`) — A drawing was unselected. _Since 5.9.0._

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteEvents")`) for types, defaults and descriptions.

- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
