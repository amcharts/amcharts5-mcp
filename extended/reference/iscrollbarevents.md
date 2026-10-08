---
title: "IScrollbarEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iscrollbarevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerEvents
All ancestors: IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5.IScrollbarEvents` (`import type { IScrollbarEvents } from "@amcharts/amcharts5"`)

## Events

- **rangechanged** (`{ start: number; end: number; grip?: "start" | "end"; }`) — The selected range (`start` or `end`) changed.
- **released** (`{}`) — The pointer was released after pressing a grip or the thumb.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteEvents")`) for types, defaults and descriptions.

- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
