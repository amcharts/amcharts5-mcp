---
title: "IClusteredDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclustereddataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentDataItem
TypeScript: `am5map.IClusteredDataItem` (`import type { IClusteredDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **children** (`DataItem<IMapPointSeriesDataItem>[]`) — Data items of the points in the cluster.
- **bullet** (`Bullet`) — The bullet that shows the cluster.
- **groupId** (`string`) — Group id of the cluster's points.
- **longitude** (`number`) — Longitude of the cluster, in degrees.
- **latitude** (`number`) — Latitude of the cluster, in degrees.
- **altitude** (`number`) — Average altitude of the cluster's data items, in metres. _Since 5.21.0._

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentDataItem")`) for types, defaults and descriptions.

- _IComponentDataItem_: visible
