---
title: "MapPointSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mappointseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A map series of points, shown as bullets. A point sits at a longitude and latitude, in a polygon, or on a line.

Docs: https://docs.amcharts.com/v5/charts/map-chart/map-point-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.MapPointSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: ClusteredPointSeries

## Settings and related interfaces

- Settings: `IMapPointSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IMapPointSeriesPrivate`
- Data item fields: `IMapPointSeriesDataItem`

## Methods

- `markDirtyValues(dataItem: DataItem<this["_dataItemSettings"]>): void` — Redraws the series, and places the bullets of `dataItem` again. Parameters: `dataItem`: Data item whose bullets to place. _Since 5.0.21._
- `zoomToDataItem(dataItem: DataItem<IMapPointSeriesDataItem>, zoomLevel: number, rotate?: boolean): Animation<any> | undefined` — Zooms the map to a point, centered. Parameters: `dataItem`: Data item of the point; `zoomLevel`: Zoom level; `rotate`: Also rotate the map to bring the point to the middle, as on a globe. Returns: Zoom level animation
- `zoomToDataItems(dataItems: Array<DataItem<IMapPointSeriesDataItem>>, rotate?: boolean): Animation<any> | undefined` — Zooms the map to fit several points. Parameters: `dataItems`: Data items of the points; `rotate`: Also rotate the map to bring the middle of their bounds to the middle of the view. Returns: Zoom level animation _Since 5.5.6._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, getSummary, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
