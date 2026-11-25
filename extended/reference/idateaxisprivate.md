---
title: "IDateAxisPrivate"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/idateaxisprivate/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IValueAxisPrivate
All ancestors: IValueAxisPrivate, IAxisPrivate, IComponentPrivate, IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5xy.IDateAxisPrivate` (`import type { IDateAxisPrivate } from "@amcharts/amcharts5/xy"`)

## Private settings

- **groupInterval** (`ITimeInterval`) — The interval data is currently grouped into, when `groupData` is on.
- **baseInterval** (`ITimeInterval`) — The current base interval: `baseInterval`, or the group interval while data is grouped.
- **autoBaseInterval** (`ITimeInterval`) — The interval worked out from the data when `baseInterval` is not set. _Since 5.24.0._
- **gridInterval** (`ITimeInterval`) — The interval between grid lines at the current zoom.

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IValueAxisPrivate")`) for types, defaults and descriptions.

- _IValueAxisPrivate_: max, maxFinal, min, minFinal, selectionMax, selectionMaxFinal, selectionMin, selectionMinFinal, selectionStepFinal, step, stepDecimalPlaces
- _IAxisPrivate_: cellWidth, maxZoomFactor, name, tooltipPosition, updateScrollbar
- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, drawHidden, focusable, focusDisabled, focusElement, focusExcluded, focusGroupVertical, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
