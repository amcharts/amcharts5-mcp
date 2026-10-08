---
title: "IClusteredPointSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclusteredpointseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapPointSeriesDataItem
All ancestors: IMapPointSeriesDataItem, IMapSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5map.IClusteredPointSeriesDataItem` (`import type { IClusteredPointSeriesDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **groupId** (`string`) — Id of the point's group: it clusters only with points of the same group.
- **cluster** (`DataItem<IClusteredDataItem>`) — The cluster the point is in, if any.
- **dx** (`number`) — How far, in pixels, scattering moved the bullet horizontally.
- **dy** (`number`) — How far, in pixels, scattering moved the bullet vertically.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapPointSeriesDataItem")`) for types, defaults and descriptions.

- _IMapPointSeriesDataItem_: altitude, autoRotate, autoRotateAngle, clipped, fixed, geometry, latitude, lineDataItem, lineId, longitude, point, polygonDataItem, polygonId, positionOnLine
- _IMapSeriesDataItem_: geometryType, value
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
