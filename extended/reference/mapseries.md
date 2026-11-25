---
title: "MapSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mapseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for map series.

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: MapLineSeries, MapPointSeries, MapPolygonSeries, MapRasterSeries

## Settings and related interfaces

- Settings: `IMapSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapSeriesPrivate`
- Events: `IMapSeriesEvents`
- Data item fields: `IMapSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`MapChart`) — The chart the series belongs to.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, getSummary, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
