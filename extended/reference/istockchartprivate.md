---
title: "IStockChartPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockchartprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerPrivate
All ancestors: IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5stock.IStockChartPrivate` (`import type { IStockChartPrivate } from "@amcharts/amcharts5/stock"`)

## Private settings

- **settingsModal** (`SettingsModal`) — The `SettingsModal` that edits indicators and series.
- **comparing** (`boolean`) — Whether the chart is in percent scale mode, as set by `setPercentScale()`.
- **comparedSeries** (`XYSeries[]`) — Series added with `addComparingSeries()`.
- **mainAxis** (`DateAxis<AxisRenderer>`) — Date axis of the main series' panel. The date axes of the other panels follow its range.
- **drawingSelectionEnabled** (`boolean`)

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerPrivate")`) for types, defaults and descriptions.

- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, focusable, focusElement, focusExcluded, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
