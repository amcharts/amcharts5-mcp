---
title: "VoronoiTreemap"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/voronoitreemap/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A weighted Voronoi treemap: nodes as polygon cells sized by value, each inside its parent's cell. Many items with very different values lay out poorly; group the small ones into an "Other" item.

_Since 5.4.0._ Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/voronoi-treemap/

## Import

```js
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

am5hierarchy.VoronoiTreemap.new(root, { /* settings */ });
```

## Inheritance

Extends: Hierarchy → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IVoronoiTreemapSettings` — get_api_reference shows it after this page
- Private settings: `IVoronoiTreemapPrivate`
- Data item fields: `IVoronoiTreemapDataItem`

## Properties

Public properties (not settings):

- **polygons** (`ListTemplate<Polygon>`) — List of node polygons; configure them all through `polygons.template`.
- **voronoi** (`any`)
