---
title: "IXYSeriesEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixyseriesevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesEvents
All ancestors: ISeriesEvents, IComponentEvents, IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5xy.IXYSeriesEvents` (`import type { IXYSeriesEvents } from "@amcharts/amcharts5/xy"`)

## Events

- **datasetchanged** (`{ id: string; }`) — The series switched to another data set, such as data grouped by another interval on a `DateAxis`. `id` names the new set. _Since 5.1.1._

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentEvents")`) for types, defaults and descriptions.

- _IComponentEvents_: datavalidated, valueschanged
- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
