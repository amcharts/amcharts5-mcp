---
title: "IMapSankeyNodesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapsankeynodesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5map.IMapSankeyNodesDataItem` (`import type { IMapSankeyNodesDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **name** (`string`) — Node name.
- **fill** (`Color`) — Node color.
- **sumIncoming** (`number`) — Sum of values of all incoming links.
- **sumOutgoing** (`number`) — Sum of values of all outgoing links.
- **sum** (`number`) — Sum of values of all links: incoming and outgoing.
- **incomingLinks** (`DataItem<IMapSankeySeriesDataItem>[]`) — A list of incoming link data items.
- **outgoingLinks** (`DataItem<IMapSankeySeriesDataItem>[]`) — A list of outgoing link data items.
- **longitude** (`number`) — Node longitude.
- **latitude** (`number`) — Node latitude.
- **mapPolygon** (`MapPolygon`) — The polygon that shows the node: a circle or a bar.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
