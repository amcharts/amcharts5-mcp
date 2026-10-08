---
title: "IXYCursorPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixycursorprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerPrivate
All ancestors: IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5xy.IXYCursorPrivate` (`import type { IXYCursorPrivate } from "@amcharts/amcharts5/xy"`)

## Private settings

- **point** (`IPoint`) — Current X/Y coordinates of the cursor.
- **positionX** (`number`) — Current horizontal position relative to the plot area (0-1).
- **positionY** (`number`) — Current vertical position relative to the plot area (0-1).
- **downPositionX** (`number`) — Horizontal position (0-1) where the current selection started.
- **downPositionY** (`number`) — Vertical position (0-1) where the current selection started.
- **lastPoint** (`IPoint`) — The last point the cursor moved to, relative to the root.

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerPrivate")`) for types, defaults and descriptions.

- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
