---
title: "MapPolygonSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mappolygonseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A map series of polygons, such as countries or regions.

Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapPolygonSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: MapSankeySeries, NightSeries, PixelMapSeries

## Settings and related interfaces

- Settings: `IMapPolygonSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapPolygonSeriesPrivate`
- Data item fields: `IMapPolygonSeriesDataItem`

## Properties

Public properties (not settings):

- **mapPolygons** (`ListTemplate<MapPolygon>`) — default `new ListTemplate<MapPolygon>` — All polygons of the series. Configure them through `mapPolygons.template`.
