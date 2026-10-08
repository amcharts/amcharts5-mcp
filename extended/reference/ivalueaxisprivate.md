---
title: "IValueAxisPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxisprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisPrivate
All ancestors: IAxisPrivate, IComponentPrivate, IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5xy.IValueAxisPrivate` (`import type { IValueAxisPrivate } from "@amcharts/amcharts5/xy"`)

## Private settings

- **min** (`number`) — Current lowest value of the whole axis scale, not just the part in view.
- **max** (`number`) — Current highest value of the whole axis scale, not just the part in view.
- **minFinal** (`number`) — The lowest value of the axis scale once it settles. When the scale changes, `min` animates towards it.
- **maxFinal** (`number`) — The highest value of the axis scale once it settles. When the scale changes, `max` animates towards it.
- **selectionMin** (`number`) — Lowest value of the visible (zoomed) part of the axis. Except on a `DateAxis`, it is rounded down to the grid step.
- **selectionMax** (`number`) — Highest value of the visible (zoomed) part of the axis. Except on a `DateAxis`, it is rounded up to the grid step.
- **selectionMinFinal** (`number`) — The lowest visible value the axis is zooming to. During a zoom animation, `selectionMin` holds the value along the way.
- **selectionMaxFinal** (`number`) — The highest visible value the axis is zooming to. During a zoom animation, `selectionMax` holds the value along the way.
- **selectionStepFinal** (`number`) — The grid step the axis will have once the zoom animation ends.
- **step** (`number`) — Value step between grid lines.
- **stepDecimalPlaces** (`number`) — Decimal places used when formatting axis labels.

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisPrivate")`) for types, defaults and descriptions.

- _IAxisPrivate_: cellWidth, maxZoomFactor, name, tooltipPosition, updateScrollbar
- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
