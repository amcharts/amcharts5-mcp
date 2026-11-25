---
title: "MapSankeySeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mapsankeyseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A map series of Sankey-style flow bands between places, each as wide as its value. The bands are polygons on the map, so they follow it as it is panned, zoomed and rotated.

_Since 5.17.0._ Docs: https://docs.amcharts.com/v5/charts/map-chart/map-sankey-series/

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

## Methods

- `getGeoPoint(dataItem: DataItem<IMapSankeySeriesDataItem>, location: number): IGeoPoint | undefined` — Returns the geographic point at a position along a band's center line. Parameters: `dataItem`: Data item of the link; `location`: Position from `0` (source) to `1` (target). Returns: Geographic point
- `getPathLength(dataItem: DataItem<IMapSankeySeriesDataItem>): number` — Returns the approximate length of a band's center line, in radians of arc on the globe. Useful for making an animation's duration fit the distance. Parameters: `dataItem`: Data item of the link. Returns: Length in radians
- `getPoint(dataItem: DataItem<IMapSankeySeriesDataItem>, location: number): IOrientationPoint` — Returns the point at a position along a band's center line, relative to the map's area, and the line's angle there in degrees. Parameters: `dataItem`: Data item of the link; `location`: Position from `0` (source) to `1` (target). Returns: Point in pixels, and angle

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("MapPolygonSeries")`) for signatures and descriptions.

- _MapPolygonSeries_: getPolygonByGeoPoint, getPolygonByPoint, markDirtyValues, zoomToDataItem, zoomToDataItems
- _Series_: addBullet, endIndex, getSummary, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
