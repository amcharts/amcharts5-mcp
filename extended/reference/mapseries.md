---
title: "MapSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mapseries/"
scraped: "2026-03-15"
---

Base class for map series.
Data item
MapSeries uses data items of type IMapSeriesDataItem.

## Import

```javascript
// Import MapSeries
import * as am5map from "@amcharts/amcharts5/map"
```

## Inheritance

Extends: Series
Extended by: MapPointSeries, MapLineSeries, MapPolygonSeries

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **affectsBounds** (`undefined | false | true`) — Default true All map series will determine the actual bounds shown in the MapChart. If we need a series to be ignored while calculating the bounds, we can set this to false. Especially useful for background series. @since 5.2.36
- **exclude** (`Array`) — An array of map object ids from geodata to omit when showing the map.
- **geoJSON** (`GeoJSON.GeoJSON`) — Map data in GeoJSON format.
- **geodataNames** (`undefined | object`) — Names of geodata items, such as countries, to replace by from loaded geodata. Can be used to override built-in English names for countries. import am5geodata_lang_ES from '@amcharts5-geodata/lang/es'; // ... map.geodataNames = am5geodata_lang_ES; map.geodataNames = am5geodata_lang_ES; @since 5.1.13 Click here for more info
- **include** (`Array`) — An array of map object ids from geodata to include in the map. If set, only those objects listed in include will be shown.
- **valueField** (`undefined | string`) — A field in series data that will hold map object's numeric value. It can be used in a number of places, e.g. tooltips, heat rules, etc.

## Properties

- **chart** (`MapChart | undefined`) — (no description)
