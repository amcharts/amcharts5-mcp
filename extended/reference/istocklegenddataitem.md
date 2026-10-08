---
title: "IStockLegendDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istocklegenddataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILegendDataItem
All ancestors: ILegendDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5stock.IStockLegendDataItem` (`import type { IStockLegendDataItem } from "@amcharts/amcharts5/stock"`)

## Data item fields

- **closeButton** (`Button`) — The item's close `Button`. Compared series and indicators drawn over the main series show it, so the user can remove them.
- **settingsButton** (`Button`) — The item's settings `Button`, which opens the settings modal for the indicator or series.
- **panel** (`StockPanel`) — The `StockPanel` the item belongs to.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ILegendDataItem")`) for types, defaults and descriptions.

- _ILegendDataItem_: fill, itemContainer, label, marker, markerRectangle, name, stroke, valueLabel
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
