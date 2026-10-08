---
title: "IXYChartEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixychartevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISerialChartEvents
All ancestors: ISerialChartEvents, IChartEvents, IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5xy.IXYChartEvents` (`import type { IXYChartEvents } from "@amcharts/amcharts5/xy"`)

## Events

- **panstarted** (`{ originalEvent: IPointerEvent; }`) — The pointer was pressed on the plot area, starting a pan (`panX` or `panY` is set). _Since 5.0.4._
- **panended** (`{ originalEvent: IPointerEvent; }`) — The pointer was released, ending a pan. _Since 5.0.4._
- **pancancelled** (`{ originalEvent: IPointerEvent; }`) — The pointer was pressed on the plot area and released without moving, so nothing was panned. `panended` follows it. _Since 5.2.19._
- **wheelended** (`{}`) — A zoom or pan by the wheel finished. _Since 5.0.4._

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteEvents")`) for types, defaults and descriptions.

- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
