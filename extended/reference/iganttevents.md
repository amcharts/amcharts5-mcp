---
title: "IGanttEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerEvents
All ancestors: IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5gantt.IGanttEvents` (`import type { IGanttEvents } from "@amcharts/amcharts5/gantt"`)

## Events

- **datemarked** (`{ date: number | undefined; dataItem: DataItem<IGanttDateAxisDataItem>; }`) — A date was marked on the lower date axis, by a click or by `markDate()`.
- **dateunmarked** (`{ date: number | undefined; dataItem?: DataItem<IGanttDateAxisDataItem>; }`) — A date mark was removed, by a click or by `unmarkDate()`.
- **valueschanged** (`{}`) — Task values were recalculated, such as after the user edited a task. Dispatched only while `editable` is on.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteEvents")`) for types, defaults and descriptions.

- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
