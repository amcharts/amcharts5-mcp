---
title: "MapRasterSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/maprasterseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A `MapChart` series that shows an image of the whole world, such as a satellite photo, reprojected to the chart's projection.

The image must be in equirectangular projection. It is redrawn as the map moves: on the GPU (WebGL2) for orthographic, equirectangular, Mercator, Equal Earth and Natural Earth projections, on the CPU otherwise.

The projection needs `invert`. The blend `animateProjection()` runs through has none, so the image is not drawn while that animation plays.

With `nightSrc` and `sunPosition`, it shows day and night: one image where the sun is up, the other where it is down.

The series counts as the whole world in the map's bounds. On a regional map, set `affectsBounds: false` to keep the map fitted to the region.

_Since 5.21.0._ Docs: https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapRasterSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IMapRasterSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapRasterSeriesPrivate`
- Events: `IMapRasterSeriesEvents`
- Data item fields: `IMapRasterSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, getSummary, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
