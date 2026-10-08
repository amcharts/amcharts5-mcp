---
title: "ISunburstDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isunburstdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPartitionDataItem
All ancestors: IPartitionDataItem, IHierarchyDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.ISunburstDataItem` (`import type { ISunburstDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **children** (`DataItem<ISunburstDataItem>[]`) — Data items of child nodes.
- **parent** (`DataItem<ISunburstDataItem>`) — Data item of the parent node.
- **d3PartitionNode** (`d3hierarchy.HierarchyRectangularNode<ISunburstDataObject>`) — _(internal)_
- **slice** (`Slice`) — The node's slice.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IPartitionDataItem")`) for types, defaults and descriptions.

- _IPartitionDataItem_: d3HierarchyNode, rectangle
- _IHierarchyDataItem_: category, childData, depth, disabled, fill, fillPattern, label, node, sum, value, valuePercent, valuePercentTotal, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
