---
title: "ISeriesPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iseriesprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentPrivate
All ancestors: IComponentPrivate, IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5.ISeriesPrivate` (`import type { ISeriesPrivate } from "@amcharts/amcharts5"`)

## Private settings

- **chart** (`Chart`) — _(internal)_
- **startIndex** (`number`)
- **endIndex** (`number`)
- **adjustedStartIndex** (`number`)
- **valueAverage** (`number`) — Average of all data items' values (with `calculateAggregates`).
- **valueCount** (`number`) — Number of data items with a value (with `calculateAggregates`).
- **valueSum** (`number`) — Sum of all data items' values (with `calculateAggregates`).
- **valueAbsoluteSum** (`number`) — Sum of the absolute values of all data items (with `calculateAggregates`).
- **valueLow** (`number`) — Lowest value of all data items (with `calculateAggregates`).
- **valueHigh** (`number`) — Highest value of all data items (with `calculateAggregates`).
- **valueOpen** (`number`) — Value of the first data item that has one (with `calculateAggregates`).
- **valueClose** (`number`) — Value of the last data item that has one (with `calculateAggregates`).
- **customValueAverage** (`number`)
- **customValueCount** (`number`)
- **customValueSum** (`number`)
- **customValueAbsoluteSum** (`number`)
- **customValueLow** (`number`)
- **customValueHigh** (`number`)
- **customValueOpen** (`number`)
- **customValueClose** (`number`)
- **baseValueSeries** (`Series`)

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerPrivate")`) for types, defaults and descriptions.

- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
