---
title: "MapPointSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mappointseries/"
scraped: "2026-03-15"
---

Creates a map series for displaying markers on the map.

## Import

```javascript
// Import MapPointSeries
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: MapSeries
Extended by: ClusteredPointSeries

> **Note:** This class also inherits all settings, properties, methods, and events from MapSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **autoScale** (`undefined | false | true`) — Default false If set to true, bullets will resize when zooming the MapChart. @since 5.2.8
- **clipBack** (`undefined | false | true`) — Default true If set to true will hide all points that are in the invisible range of the map. For example on the side of the globe facing away from the viewer when used with Orthographic projection. NOTE: not all projections have invisible side.
- **clipFront** (`undefined | false | true`) — If set to true will hide all points that are in the visible range of the map.
- **fixedField** (`undefined | string`) — A field in data that holds information if this point is fixed or moves with a map.
- **latitudeField** (`undefined | string`) — A field in data that holds point's longitude.
- **longitudeField** (`undefined | string`) — A field in data that holds point's longitude.
- **polygonIdField** (`undefined | string`) — A field in data that holds an ID of the related polygon. If set, the point will be positioned in the visual center of the target polygon.
