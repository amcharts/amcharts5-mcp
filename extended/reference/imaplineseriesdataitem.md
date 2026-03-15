---
title: "IMapLineSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaplineseriesdataitem/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IMapSeriesDataItem
Extended by: IGraticuleSeriesDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from IMapSeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **geometry** (`LineString | MultiLineString`) — GeoJSON geometry of the line.
- **lineType** (`"curved" | "straight"`) — Default "curved" A line type. "curved" (default) - connects points using shortest distance, which will result in curved lines based on map projection. "straight" - connects points using visually straight lines, and will not cross the -180/180 longitude. @since 5.2.32
- **mapLine** (`MapLine`) — Related MapLine object.
- **pointsToConnect** (`Array`) — An array of data items from MapPointSeries to use as line end-points. Note, fixed points can not be used here.
