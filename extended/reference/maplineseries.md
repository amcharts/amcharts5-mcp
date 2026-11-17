---
title: "MapLineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/maplineseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A map series of lines, such as routes: from GeoJSON geometries, or connecting the points of a `MapPointSeries`.

Docs: https://docs.amcharts.com/v5/charts/map-chart/map-line-series/

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

## Methods

- `markDirtyValues(dataItem: DataItem<this["_dataItemSettings"]>): void` — Redraws the series, and the line of `dataItem`, rebuilding its geometry from `pointsToConnect` if set. Parameters: `dataItem`: Data item whose line to redraw. _Since 5.0.21._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
