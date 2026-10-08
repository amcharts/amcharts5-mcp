---
title: "ISpriteEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispriteevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntityEvents
TypeScript: `am5.ISpriteEvents` (`import type { ISpriteEvents } from "@amcharts/amcharts5"`)

## Events

- **dataitemchanged** (`{ oldDataItem: DataItem<IComponentDataItem> | undefined; newDataItem: DataItem<IComponentDataItem> | undefined; }`) — The element's data item changed.
- **positionchanged** (`{}`) — The element's position changed.
- **boundschanged** (`{}`) — The element's bounds changed.
- **dragstart** (`ISpritePointerEvent`) — Dragging of the element started: the pointer moved more than 5 pixels after pressing on it.
- **dragstop** (`ISpritePointerEvent`) — Dragging of the element stopped.
- **dragged** (`ISpritePointerEvent`) — The element moved while being dragged.
- **click** (`ISpritePointerEvent`) — The element was clicked or tapped. A press and release more than 5 pixels apart is not a click.
- **rightclick** (`ISpritePointerEvent`) — The element was clicked with the right mouse button.
- **middleclick** (`ISpritePointerEvent`) — The element was clicked with the middle mouse button.
- **dblclick** (`ISpritePointerEvent`) — The element was double-clicked or double-tapped. Also dispatched on its parents.
- **pointerover** (`ISpritePointerEvent`) — The pointer moved over the element.
- **pointerout** (`ISpritePointerEvent`) — The pointer left the element.
- **pointerdown** (`ISpritePointerEvent`) — A pointer button was pressed, or a touch started, over the element. Also dispatched on its parents.
- **pointerup** (`ISpritePointerEvent`) — A pointer button was released, or a touch ended, over the element.
- **globalpointerup** (`ISpritePointerEvent`) — A pointer button was released, or a touch ended, anywhere in the window, even outside the chart.
- **globalpointermove** (`ISpritePointerEvent`) — The pointer moved anywhere in the window, even outside the chart.
- **globalpointerdown** (`ISpritePointerEvent`) — A pointer button was pressed, or a touch started, anywhere in the window, even outside the chart.
- **wheel** (`{ originalEvent: WheelEvent; point: IPoint; }`) — The mouse wheel turned while the pointer was over the element. Also dispatched on its parents.
- **focus** (`{ originalEvent: FocusEvent; target: Sprite; }`) — Invoked when element gains focus.
- **blur** (`{ originalEvent: FocusEvent; target: Sprite; }`) — Invoked when element loses focus.
