---
title: "MapSankeySeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mapsankeyseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A map series of Sankey-style flow bands between places, each as wide as its value. The bands are polygons on the map, so they follow it as it is panned, zoomed and rotated.

_Since 5.17.0._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-sankey-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapSankeySeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapPolygonSeries → MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapSankeySeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapSankeySeriesPrivate`
- Data item fields: `IMapSankeySeriesDataItem`

## Properties

Public properties (not settings):

- **nodes** (`MapSankeyNodes`) — The nodes at the ends of the bands. They are made from the link data; set `nodes.data.setAll([...])` to give them names and fills of your own. Style them via `nodes.mapPolygons.template`.
