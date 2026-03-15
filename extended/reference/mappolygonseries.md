---
title: "MapPolygonSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mappolygonseries/"
scraped: "2026-03-15"
---

Creates a map series for displaying polygons.

## Import

```javascript
// Import MapPolygonSeries
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: MapSeries

> **Note:** This class also inherits all settings, properties, methods, and events from MapSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **reverseGeodata** (`undefined | false | true`) — Default false If set to true, the order of coordinates in GeoJSON will be flipped. Some GeoJSON software produces those in reverse order, so if your custom map appears garbled, try this setting. @since 5.2.42

## Properties

- **mapPolygons** (`ListTemplate`) — Default new ListTemplate<MapPolygon> A ListTemplate of all polygons in series. mapPolygons.template can also be used to configure polygons.
