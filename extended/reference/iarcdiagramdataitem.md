---
title: "IArcDiagramDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iarcdiagramdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowDataItem
All ancestors: IFlowDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5flow.IArcDiagramDataItem` (`import type { IArcDiagramDataItem } from "@amcharts/amcharts5/flow"`)

## Data item fields

- **link** (`ArcDiagramLink`) — The link element.
- **source** (`DataItem<IArcDiagramNodesDataItem>`) — Source node data item.
- **target** (`DataItem<IArcDiagramNodesDataItem>`) — Target node data item.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowDataItem")`) for types, defaults and descriptions.

- _IFlowDataItem_: d3SankeyLink, fill, sourceId, targetId, value, valueWorking
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
