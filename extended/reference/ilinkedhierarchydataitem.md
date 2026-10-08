---
title: "ILinkedHierarchyDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilinkedhierarchydataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IHierarchyDataItem
All ancestors: IHierarchyDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.ILinkedHierarchyDataItem` (`import type { ILinkedHierarchyDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **children** (`DataItem<ILinkedHierarchyDataItem>[]`) — Data items of the child nodes.
- **parent** (`DataItem<ILinkedHierarchyDataItem>`) — Data item of the parent node.
- **node** (`LinkedHierarchyNode`) — The node element.
- **circle** (`Circle`) — The node's circle.
- **outerCircle** (`Circle`) — The ring around the node's circle, shown when the node has children.
- **parentLink** (`HierarchyLink`) — The link to the parent node.
- **links** (`HierarchyLink[]`) — All links that start or end at this node, `linkWith` ones included.
- **childLinks** (`HierarchyLink[]`) — Links that start at this node: to its children and to the nodes in its `linkWith`.
- **linkWith** (`string[]`) — IDs of other nodes this node is linked with, besides its parent and children.
- **d3HierarchyNode** (`d3hierarchy.HierarchyPointNode<ILinkedHierarchyDataObject>`) — _(internal)_

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IHierarchyDataItem")`) for types, defaults and descriptions.

- _IHierarchyDataItem_: category, childData, depth, disabled, fill, fillPattern, label, sum, value, valuePercent, valuePercentTotal, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
