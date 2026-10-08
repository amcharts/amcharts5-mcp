---
title: "ISpritePrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispriteprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntityPrivate
TypeScript: `am5.ISpritePrivate` (`import type { ISpritePrivate } from "@amcharts/amcharts5"`)

## Private settings

- **customData** (`any`) — _(internal)_
- **deform** (`IDeform`) — _(internal)_ A 2x2 transform applied around the element's position after its rotation and scale.
- **x** (`number`) — _(internal)_
- **y** (`number`) — _(internal)_
- **width** (`number`) — _(internal)_
- **height** (`number`) — _(internal)_
- **visible** (`boolean`) — _(internal)_
- **showingTooltip** (`boolean`) — `true` while the element shows its tooltip.
- **touchHovering** (`boolean`) — _(internal)_
- **focusElement** (`{ dom: HTMLDivElement; disposers: Array<IDisposer>; }`) — _(internal)_
- **tooltipTarget** (`Graphics`) — An element whose tooltip point and colors the tooltip uses, in place of this element's.
- **list** (`ListTemplate<Sprite>`) — _(internal)_
- **maxWidth** (`number`) — _(internal)_
- **maxHeight** (`number`) — _(internal)_
- **minWidth** (`number`) — _(internal)_
- **minHeight** (`number`) — _(internal)_
- **focusable** (`boolean`) — If set to `false`, its tabindex will be set to -1, so it does not get focused with TAB, regardless whether its public setting `focusable` is set to `true`. _Since 5.3.16._
- **focusExcluded** (`boolean`) — _(internal)_ If set to `true`, the sprite gets no focus element, so it is left out of keyboard navigation and screen readers even if `focusable` is `true`. Used for map objects that their series leaves out with `include` or `exclude`.
- **focusOutOfView** (`boolean`) — _(internal)_ If set to `true`, the sprite is outside the visible area (e.g. a map object panned or zoomed away): it is not a TAB stop, but screen readers can still read it.
- **trustBounds** (`boolean`) — Checks that the pointer is within the element's bounds before dispatching `"pointerover"`. This prevents ghost tooltips that sometimes appear while the pointer moves over interactive elements. It is `true` by default on `Rectangle` and `Circle`. _Since 5.5.0._
- **lastTooltipCoords** (`IPoint`) — The last point the tooltip was shown at, so it is not shown again at the same place. _Since 5.11.3._
