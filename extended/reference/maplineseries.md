---
title: "MapLineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/maplineseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A map series of lines, such as routes: from GeoJSON geometries, or connecting the points of a `MapPointSeries`.

Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapLineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: GraticuleSeries

## Settings and related interfaces

- Settings: `IMapLineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapLineSeriesPrivate`
- Data item fields: `IMapLineSeriesDataItem`

## Properties

Public properties (not settings):

- **mapLines** (`ListTemplate<MapLine>`) — default `new ListTemplate<MapLine>` — All lines of the series. Configure them through `mapLines.template`.
