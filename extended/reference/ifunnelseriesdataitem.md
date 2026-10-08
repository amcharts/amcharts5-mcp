---
title: "IFunnelSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ifunnelseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPercentSeriesDataItem
All ancestors: IPercentSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5percent.IFunnelSeriesDataItem` (`import type { IFunnelSeriesDataItem } from "@amcharts/amcharts5/percent"`)

## Data item fields

- **slice** (`FunnelSlice`) — The slice element.
- **link** (`FunnelSlice`) — The link element that joins this slice to the next one.
- **index** (`number`) — Data item's index.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IPercentSeriesDataItem")`) for types, defaults and descriptions.

- _IPercentSeriesDataItem_: category, fill, fillPattern, label, legendDataItem, tick, valuePercentTotal
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
