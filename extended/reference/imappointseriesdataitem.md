---
title: "IMapPointSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappointseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesDataItem
All ancestors: IMapSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5map.IMapPointSeriesDataItem` (`import type { IMapPointSeriesDataItem } from "@amcharts/amcharts5/map"`)

## Data item fields

- **geometry** (`Point | MultiPoint`) — GeoJSON geometry of the point.
- **longitude** (`number`) — Longitude of the point, in degrees.
- **latitude** (`number`) — Latitude of the point, in degrees.
- **altitude** (`number`) — Height above the ground, in metres: `400000` is about the height of the International Space Station. On flat maps the point rises up the screen. Read from data only when the series sets `altitudeField`. A point on a line takes the line's altitude instead. _Since 5.21.0._
- **positionOnLine** (`number`) — Where on its line the point sits, from `0` (start) to `1` (end).
- **autoRotate** (`boolean`) — Turns the bullet to face the way its line runs. _Note:_ When set, wins over the bullet's `autoRotate`.
- **autoRotateAngle** (`number`) — Degrees added to the angle `autoRotate` works out, such as `180` to face the other way. _Note:_ When set, wins over the bullet's `autoRotateAngle`.
- **lineDataItem** (`DataItem<IMapLineSeriesDataItem>`) — Data item of a line in a `MapLineSeries` to place the point on, at `positionOnLine`.
- **lineId** (`string`) — Id of a line, in any `MapLineSeries` of the chart, to place the point on, at `positionOnLine`.
- **polygonDataItem** (`DataItem<IMapPolygonSeriesDataItem>`) — Data item of a polygon in a `MapPolygonSeries` to place the point at, in its visual center.
- **polygonId** (`string`) — Id of a polygon, in any `MapPolygonSeries` of the chart, to place the point at, in its visual center.
- **fixed** (`boolean`) — default `false` — Places the point by its bullet's own `x` and `y` instead of its longitude and latitude, so it stays put as the map moves. A `MapLineSeries` can't connect fixed points. _Since 5.2.34._
- **point** (`IPoint`) — Where the point is drawn, in pixels, relative to the map's area. Set by the series.
- **clipped** (`boolean`) — _(internal)_

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesDataItem")`) for types, defaults and descriptions.

- _IMapSeriesDataItem_: geometryType, value
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible

## Notes

Since 5.20.6, `lineId`, `positionOnLine`, `autoRotate` and `autoRotateAngle` can be given in data rows (read via the series' `lineIdField`, `positionOnLineField`, `autoRotateField` and `autoRotateAngleField`, which default to those names), e.g. `{ lineId: "jfk-lhr", positionOnLine: 0.5, autoRotate: true }`. `polygonIdField` has no default and must be set for `polygonId` to be read from data.
