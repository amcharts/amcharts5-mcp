---
title: "IMapSankeySeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapsankeyseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPolygonSeriesDataItem
All ancestors: IMapPolygonSeriesDataItem, IMapSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5map.IMapSankeySeriesDataItem` (`import type { IMapSankeySeriesDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **sourceId** (`string`) — Id of the polygon in `polygonSeries` the link starts from, at its geographic centroid. Also the id of the source node.
- **targetId** (`string`) — Id of the polygon in `polygonSeries` the link ends at, at its geographic centroid. Also the id of the target node.
- **sourceLongitude** (`number`) — Longitude the link starts at, when `sourceId` names no polygon.
- **sourceLatitude** (`number`) — Latitude the link starts at, when `sourceId` names no polygon.
- **targetLongitude** (`number`) — Longitude the link ends at, when `targetId` names no polygon.
- **targetLatitude** (`number`) — Latitude the link ends at, when `targetId` names no polygon.
- **value** (`number`) — The link's value: its band is as wide as its share of the largest value.
- **waypoints** (`IGeoPoint[]`) — Points the band passes through on its way, in order.
- **controlPointDistance** (`number`) — `controlPointDistance` for this link, instead of the series'.
- **controlPointDistanceSource** (`number`) — `controlPointDistanceSource` for this link, instead of the series'.
- **controlPointDistanceTarget** (`number`) — `controlPointDistanceTarget` for this link, instead of the series'.
- **sourceNode** (`DataItem<IMapSankeyNodesDataItem>`) — The node the link starts from.
- **targetNode** (`DataItem<IMapSankeyNodesDataItem>`) — The node the link ends at.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPolygonSeriesDataItem")`) for types, defaults and descriptions.

- _IMapPolygonSeriesDataItem_: geometry, mapPolygon
- _IMapSeriesDataItem_: geometryType
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
