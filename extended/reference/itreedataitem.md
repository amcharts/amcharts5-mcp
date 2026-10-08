---
title: "ITreeDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreedataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILinkedHierarchyDataItem
All ancestors: ILinkedHierarchyDataItem, IHierarchyDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5hierarchy.ITreeDataItem` (`import type { ITreeDataItem } from "@amcharts/amcharts5/hierarchy"`)

## Data item fields

- **children** (`DataItem<ITreeDataItem>[]`) — Data items of the child nodes.
- **parent** (`DataItem<ITreeDataItem>`) — Parent data item.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ILinkedHierarchyDataItem")`) for types, defaults and descriptions.

- _ILinkedHierarchyDataItem_: childLinks, circle, d3HierarchyNode, links, linkWith, node, outerCircle, parentLink
- _IHierarchyDataItem_: category, childData, depth, disabled, fill, fillPattern, label, sum, value, valuePercent, valuePercentTotal, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
