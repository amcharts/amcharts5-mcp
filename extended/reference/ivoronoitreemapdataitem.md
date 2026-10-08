---
title: "IVoronoiTreemapDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivoronoitreemapdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IHierarchyDataItem
All ancestors: IHierarchyDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.IVoronoiTreemapDataItem` (`import type { IVoronoiTreemapDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **children** (`DataItem<IVoronoiTreemapDataItem>[]`) — Data items of child nodes.
- **parent** (`DataItem<IVoronoiTreemapDataItem>`) — Data item of the parent node.
- **polygon** (`Polygon`) — The node's polygon.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IHierarchyDataItem")`) for types, defaults and descriptions.

- _IHierarchyDataItem_: category, childData, d3HierarchyNode, depth, disabled, fill, fillPattern, label, node, sum, value, valuePercent, valuePercentTotal, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
