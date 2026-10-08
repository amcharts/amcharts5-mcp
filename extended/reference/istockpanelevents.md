---
title: "IStockPanelEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockpanelevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYChartEvents
All ancestors: IXYChartEvents, ISerialChartEvents, IChartEvents, IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: not exported by name from the package.

## Events

- **moved** (`{ oldIndex: number; newIndex: number; }`) — The panel was moved up or down. _Since 5.9.2._
- **closed** (`{}`) — The panel was closed, just before it is removed from the chart. _Since 5.9.2._
- **expanded** (`{}`) — The panel was expanded to fill the chart, hiding the other panels. _Since 5.9.2._
- **collapsed** (`{}`) — The panels returned to normal, showing the hidden ones again. _Since 5.9.2._

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYChartEvents")`) for types, defaults and descriptions.

- _IXYChartEvents_: pancancelled, panended, panstarted, wheelended
- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
