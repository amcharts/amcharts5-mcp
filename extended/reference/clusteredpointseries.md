---
title: "ClusteredPointSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/clusteredpointseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A `MapPointSeries` that groups points close together on screen into clusters. Clusters are worked out again whenever the zoom level changes.

_Since 5.5.6._ Docs: https://docs.amcharts.com/v5/charts/map-chart/clustered-point-series/

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

## Methods

- `zoomToCluster(dataItem: DataItem<IClusteredDataItem>, rotate?: boolean): void` — Zooms the map to fit the points of a cluster. Parameters: `dataItem`: Data item of the cluster; `rotate`: Also rotate the map to bring the cluster to the middle, as on a globe. Docs: https://docs.amcharts.com/v5/charts/map-chart/clustered-point-series/#drill-down

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("MapPointSeries")`) for signatures and descriptions.

- _MapPointSeries_: markDirtyValues, zoomToDataItem, zoomToDataItems
- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
