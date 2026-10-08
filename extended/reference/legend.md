---
title: "Legend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/legend/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A list of items, one per series or data item, that can be clicked to show or hide them.

Docs: https://www.amcharts.com/docs/v5/concepts/legend/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Legend.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: StockLegend

## Settings and related interfaces

- Settings: `ILegendSettings` — get_api_reference shows it after this page
- Private settings: `ILegendPrivate`
- Events: `ILegendEvents`
- Data item fields: `ILegendDataItem`

## Properties

Public properties (not settings):

- **itemContainers** (`ListTemplate<Container>`) — The containers of the legend items, one per item.
- **labels** (`ListTemplate<Label>`) — The name labels of the legend items.
- **markerRectangles** (`ListTemplate<RoundedRectangle>`) — The rectangles of the default markers.
- **markers** (`ListTemplate<Container>`) — The markers of the legend items.
- **valueLabels** (`ListTemplate<Label>`) — The value labels of the legend items.
