---
title: "ILegendDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilegenddataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: not exported by name from the package.

## Data item fields

- **itemContainer** (`Container`) — The `Container` that holds all elements of the legend item.
- **marker** (`Container`) — The marker's container.
- **markerRectangle** (`RoundedRectangle`) — The rectangle of the default marker.
- **label** (`Label`) — The label with the item's name.
- **valueLabel** (`Label`) — The label with the item's value.
- **fill** (`Color`) — Marker fill color.
- **stroke** (`Color`) — Marker stroke (outline) color.
- **name** (`string`) — Name of the legend item.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
