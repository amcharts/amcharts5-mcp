---
title: "IVennDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivenndataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5venn.IVennDataItem` (`import type { IVennDataItem } from "@amcharts/amcharts5/venn"`)

## Data item fields

- **intersections** (`string[]`) — Categories of the circles this data item is the overlap of. Set only for overlaps.
- **category** (`string`) — The circle's category, which overlaps refer to in `intersections`.
- **slice** (`Graphics`) — The shape that shows the data item: a circle, or the area where circles overlap.
- **label** (`Label`) — The slice's label.
- **legendDataItem** (`DataItem<ILegendDataItem>`) — The data item's entry in a legend.
- **fill** (`Color`) — Fill color used for the slice and related elements, e.g. legend marker.
- **fillPattern** (`Pattern`) — Fill pattern used for the slice and related elements, e.g. legend marker. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
