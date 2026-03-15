---
title: "IMapPointSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappointseriesdataitem/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IMapSeriesDataItem
Extended by: IClusteredPointSeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IMapSeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoRotate** (`undefined | false | true`) — Automatically rotate the point bullet to face the direction of the line it is attached to.
- **autoRotateAngle** (`undefined | number`) — The angle will be added to the automatically-calculated angle. Can be used to reverse the direction.
- **fixed** (`undefined | false | true`) — Default false If set to true, the point will be drawn according to its x and y coordinates, not its latitude and longitude. Fixed points will not move together with map, and can not be used to connect points on a MapLineSeries. @since 5.2.34
- **geometry** (`Point | MultiPoint`) — GeoJSON geometry of the point.
- **latitude** (`undefined | number`) — Latitude.
- **lineDataItem** (`DataItem`) — A data item from a MapLineSeries the point is attached to.
- **lineId** (`undefined | string`) — An ID of a MapLine the point is attached to.
- **longitude** (`undefined | number`) — Longitude.
- **point** (`IPoint`) — Point (in pixels) of a data item
- **polygonDataItem** (`DataItem`) — A data item from a MapPolygonSeries to use for positioning of the point.
- **polygonId** (`undefined | string`) — An ID of the MapPolygon to use for centering the point.
- **positionOnLine** (`undefined | number`) — Relative position (0-1) on the MapLine to place point on.
