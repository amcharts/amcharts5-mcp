---
title: "IInteractionHost"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iinteractionhost/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

What the renderer provides: its DOM element, DOM event to chart coordinates, and a hit test.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **view** (`HTMLElement`)
- **getEvent** (`<A extends IPointerEvent>(originalEvent: A) => IInteractionEvent<A>`)
- **_getHitTarget** (`(point: IPoint, bbox: DOMRect, target: Node | null) => N | undefined | false`) — The object under `point`: `false` over empty chart area, `undefined` outside the chart or when `target` is not the renderer's own element.
