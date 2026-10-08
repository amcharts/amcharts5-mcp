---
title: "IXYCursorEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixycursorevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerEvents
All ancestors: IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5xy.IXYCursorEvents` (`import type { IXYCursorEvents } from "@amcharts/amcharts5/xy"`)

## Events

- **selectended** (`{ originalEvent: IPointerEvent; target: XYCursor; }`) — A drag across the plot area ended, zooming or selecting (`behavior` is set).
- **selectstarted** (`{ originalEvent: IPointerEvent; target: XYCursor; }`) — The pointer was pressed on the plot area, starting a zoom or selection (`behavior` is set).
- **cursormoved** (`{ point: IPoint; target: XYCursor; originalEvent?: IPointerEvent; }`) — The cursor moved over the plot area.
- **cursorhidden** (`{ target: XYCursor; }`) — The cursor was hidden as the pointer left the plot area.
- **selectcancelled** (`{ originalEvent: IPointerEvent; target: XYCursor; }`) — A press on the plot area was released without moving past `moveThreshold`, so no zoom or selection happened (`behavior` is set). _Since 5.4.7._

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteEvents")`) for types, defaults and descriptions.

- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
