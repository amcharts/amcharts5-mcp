---
title: "MapPolygonSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mappolygonseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A map series of polygons, such as countries or regions.

Docs: https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/

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

## Methods

- `getPolygonByGeoPoint(point: IGeoPoint): MapPolygon | undefined` — Returns the polygon of this series drawn at a geographic point, if any. Parameters: `point`: Geographic point. Returns: Polygon
- `getPolygonByPoint(point: IPoint): MapPolygon | undefined` — Returns the polygon of this series drawn at a point, if any. Parameters: `point`: Point in pixels, relative to the root. Returns: Polygon _Since 5.9.8._
- `markDirtyValues(dataItem: DataItem<this["_dataItemSettings"]>): void` — Redraws the series, and the polygon of `dataItem` from its `geometry`, such as after the geometry was changed in place. Parameters: `dataItem`: Data item whose polygon to redraw. _Since 5.0.21._
- `zoomToDataItem(dataItem: DataItem<IMapPolygonSeriesDataItem>, rotate?: boolean): Animation<any> | undefined` — Zooms the map to fit a polygon, centered. Parameters: `dataItem`: Data item of the polygon; `rotate`: Also rotate the map to bring the polygon's center to the middle, as on a globe. Returns: Zoom level animation Docs: https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zooming-to-clicked-object
- `zoomToDataItems(dataItems: Array<DataItem<IMapPolygonSeriesDataItem>>, rotate?: boolean): Animation<any> | undefined` — Zooms the map to fit several polygons. Parameters: `dataItems`: Data items of the polygons; `rotate`: Also rotate the map to bring the middle of their bounds to the middle of the view. Returns: Zoom level animation _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
