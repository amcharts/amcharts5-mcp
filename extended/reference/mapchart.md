---
title: "MapChart"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/mapchart/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A map: geographic data drawn in a projection, which can be zoomed, panned and rotated. Its series draw polygons, lines and points.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapChart.new(root, { /* settings */ });
```

## Inheritance

Extends: SerialChart → Chart → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapChartSettings` — get_api_reference shows it after this page
- Private settings: `IMapChartPrivate`
- Events: `IMapChartEvents`

## Properties

Public properties (not settings):

- **boxZoomSelection** (`Rectangle`) — The box drawn while zooming with `boxZoom`. _Since 5.20.2._ _Note:_ Style its `fill` / `stroke`; the chart sizes and shows it.
