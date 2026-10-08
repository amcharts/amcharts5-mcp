---
title: "MapSankeyNodes"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mapsankeynodes/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

The nodes of a `MapSankeySeries`, available as its `nodes`.

_Since 5.17.0._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/map-sankey-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapSankeyNodes.new(root, { /* settings */ });
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapSankeyNodesSettings` — get_api_reference shows it after this page
- Private settings: `IMapSankeyNodesPrivate`
- Events: `IMapSankeyNodesEvents`
- Data item fields: `IMapSankeyNodesDataItem`

## Properties

Public properties (not settings):

- **flow** (`MapSankeySeries`) — The series the nodes belong to.
- **mapPolygons** (`ListTemplate<MapPolygon>`) — default `new ListTemplate<MapPolygon>` — Polygons of all nodes. Style them through `mapPolygons.template`.
