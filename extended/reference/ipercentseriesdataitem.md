---
title: "IPercentSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipercentseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5percent.IPercentSeriesDataItem` (`import type { IPercentSeriesDataItem } from "@amcharts/amcharts5/percent"`)

## Data item fields

- **valuePercentTotal** (`number`) — The item's share of the series total, in percent (`25` for 25%).
- **category** (`string`) — The item's category name.
- **slice** (`Graphics`) — Slice visual element.
- **label** (`Label`) — Slice label.
- **tick** (`Tick`) — Slice tick.
- **legendDataItem** (`DataItem<ILegendDataItem>`) — The item's entry in a legend.
- **fill** (`Color`) — Color of the slice and the elements that follow it, such as the legend marker.
- **fillPattern** (`Pattern`) — Pattern used for the slice and related elements, e.g. legend marker. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
