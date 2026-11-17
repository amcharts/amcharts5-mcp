---
title: "NightSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/nightseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Shades the part of a map where it is night, with the twilight in steps, and shows the sun.

Set `sunDate` (e.g. `"now"`) or `sunPosition`. The night is styled through `mapPolygons.template`: `fill`, and `fillOpacity` for how dark full night is.

_Since 5.21.0._ Docs: https://docs.amcharts.com/v5/charts/map-chart/night-series/

## Import

```js
import * as am5map from "@amcharts/amcharts5/map";

am5map.NightSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: MapPolygonSeries → MapSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `INightSeriesSettings` — get_api_reference shows it after this page
- Private settings: `INightSeriesPrivate`
- Data item fields: `INightSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("MapPolygonSeries")`) for signatures and descriptions.

- _MapPolygonSeries_: getPolygonByGeoPoint, getPolygonByPoint, markDirtyValues, zoomToDataItem, zoomToDataItems
- _Series_: addBullet, endIndex, hideDataItem, openUrl, showDataItem, startIndex
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
