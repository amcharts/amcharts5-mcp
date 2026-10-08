---
title: "ITreemapDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreemapdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IHierarchyDataItem
All ancestors: IHierarchyDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.ITreemapDataItem` (`import type { ITreemapDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **children** (`DataItem<ITreemapDataItem>[]`) — List of child node data items.
- **parent** (`DataItem<ITreemapDataItem>`) — Data item of parent node.
- **d3HierarchyNode** (`d3hierarchy.HierarchyRectangularNode<IHierarchyDataObject>`) — _(internal)_
- **rectangle** (`RoundedRectangle`) — The node's rectangle.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IHierarchyDataItem")`) for types, defaults and descriptions.

- _IHierarchyDataItem_: category, childData, depth, disabled, fill, fillPattern, label, node, sum, value, valuePercent, valuePercentTotal, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
