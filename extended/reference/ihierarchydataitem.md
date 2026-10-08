---
title: "IHierarchyDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchydataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.IHierarchyDataItem` (`import type { IHierarchyDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **value** (`number`) — Value of the node as set in data.
- **valueWorking** (`number`) — _(internal)_
- **valuePercentTotal** (`number`) — The node's value as a percent of the root node's total (`25` for 25%).
- **valuePercent** (`number`) — The node's value as a percent of its parent's (`25` for 25%). _Since 5.2.21._
- **sum** (`number`) — The node's total: its own value if the data gives one, or else the sum of its children's.
- **category** (`string`) — The node's category name.
- **children** (`DataItem<IHierarchyDataItem>[]`) — List of child node data items.
- **childData** (`any[]`) — Raw data of the node's children.
- **parent** (`DataItem<IHierarchyDataItem>`) — Data item of parent node.
- **depth** (`number`) — Depth of the node in the hierarchy: `0` for the root.
- **node** (`HierarchyNode`) — The node element.
- **label** (`Label`) — The node's label.
- **fill** (`Color`) — The node's color: from data (`fillField`), or else the next of `colors` for a first-level node and the parent's color for a deeper one.
- **fillPattern** (`Pattern`) — Node's auto-assigned pattern. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/
- **disabled** (`boolean`) — `true` while the node is collapsed, with its children hidden.
- **d3HierarchyNode** (`d3hierarchy.HierarchyNode<IHierarchyDataObject>`) — _(internal)_

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
