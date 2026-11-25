---
title: "PixelMapSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/pixelmapseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Shows the polygons of a map as a grid of pixels.

Each pixel takes the fill of the polygon it falls in, so heat rules, `templateField` and states work as in `MapPolygonSeries`. The polygons stay, invisible, to handle tooltips, hover and clicks.

Pixels have no outline by default. Set `strokeWidth` (and `stroke`) on `mapPolygons.template` to outline each pixel in its polygon's stroke.

In SVG export (`renderToSVG`) each polygon's flat pixels are a group with the polygon's `id` and `data-name`. Export just the pixels with `am5.renderToSVG(series.pixels)`.

Pixels lie on the surface of the map, so on a globe they turn and shrink towards the edge. With `uniform: true` they sit on an even grid on screen instead.

_Since 5.21.0._ Docs: https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.PixelMapSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapPolygonSeries → MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPixelMapSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPixelMapSeriesPrivate`
- Data item fields: `IPixelMapSeriesDataItem`

## Properties

Public properties (not settings):

- **pixels** (`Graphics`) — The element that draws all pixels.

## Methods

- `getPolygonByPoint(point: IPoint): MapPolygon | undefined` — Returns the polygon whose pixel cell, or column, is at a point. Parameters: `point`: Point in pixels, relative to the root. Returns: Polygon
- `markDirtyValues(dataItem: DataItem<this["_dataItemSettings"]>): void` — Redraws the pixels of `dataItem`, laying them out again if its geometry changed. Parameters: `dataItem`: Data item whose pixels to redraw.
- `pixelCount(): number` — Returns the number of pixels in the grid.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("MapPolygonSeries")`) for signatures and descriptions.

- _MapPolygonSeries_: getPolygonByGeoPoint, zoomToDataItem, zoomToDataItems
- _Series_: addBullet, endIndex, getSummary, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
