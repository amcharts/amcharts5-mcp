---
title: "IFlowPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesPrivate
All ancestors: ISeriesPrivate, IComponentPrivate, IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5flow.IFlowPrivate` (`import type { IFlowPrivate } from "@amcharts/amcharts5/flow"`)

## Private settings

- **valueSum** (`number`) — Sum of all data items' values (with `calculateAggregates`).
- **valueLow** (`number`) — Lowest value of all data items (with `calculateAggregates`).
- **valueHigh** (`number`) — Highest value of all data items (with `calculateAggregates`).

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesPrivate")`) for types, defaults and descriptions.

- _ISeriesPrivate_: adjustedStartIndex, baseValueSeries, chart, customValueAbsoluteSum, customValueAverage, customValueClose, customValueCount, customValueHigh, customValueLow, customValueOpen, customValueSum, endIndex, startIndex, valueAbsoluteSum, valueAverage, valueClose, valueCount, valueOpen
- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
