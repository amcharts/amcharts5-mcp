---
title: "IFlowDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5flow.IFlowDataItem` (`import type { IFlowDataItem } from "@amcharts/amcharts5/flow"`)

## Data item fields

- **value** (`number`) — Link value.
- **valueWorking** (`number`) — _(internal)_
- **link** (`FlowLink`) — The link element drawn for this data item.
- **fill** (`Color`) — Link's color.
- **d3SankeyLink** (`d3sankey.SankeyLink<d3sankey.SankeyExtraProperties, d3sankey.SankeyExtraProperties>`) — _(internal)_
- **targetId** (`string`) — ID of the target node.
- **sourceId** (`string`) — ID of the source node.
- **source** (`DataItem<IFlowNodesDataItem>`) — Data item of the source node.
- **target** (`DataItem<IFlowNodesDataItem>`) — Data item of the target node.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
