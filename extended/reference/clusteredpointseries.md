---
title: "ClusteredPointSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/clusteredpointseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A `MapPointSeries` that groups points close together on screen into clusters. Clusters are worked out again whenever the zoom level changes.

_Since 5.5.6._ Docs: https://www.amcharts.com/docs/v5/charts/map-chart/clustered-point-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.ClusteredPointSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapPointSeries → MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IClusteredPointSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IClusteredPointSeriesPrivate`
- Data item fields: `IClusteredPointSeriesDataItem`

## Properties

Public properties (not settings):

- **clusteredDataItems** (`DataItem<IClusteredDataItem>[]`)
