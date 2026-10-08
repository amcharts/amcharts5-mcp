---
title: "IAxisPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentPrivate
All ancestors: IComponentPrivate, IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5xy.IAxisPrivate` (`import type { IAxisPrivate } from "@amcharts/amcharts5/xy"`)

## Private settings

- **name** (`"value" | "date" | "category"`) — _(internal)_
- **updateScrollbar** (`boolean`) — _(internal)_
- **maxZoomFactor** (`number`) — _(internal)_
- **tooltipPosition** (`number`) — Position on the axis (`0` to `1`) the tooltip points to.
- **cellWidth** (`number`) — Distance in pixels between grid lines (read-only). Approximate on a `DateAxis`, whose grid can be uneven. Watch it to resize or hide labels so they don't overlap.

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerPrivate")`) for types, defaults and descriptions.

- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
