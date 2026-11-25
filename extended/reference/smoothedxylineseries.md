---
title: "SmoothedXYLineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/smoothedxylineseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A line series drawn as a smooth curve that can run in any direction, for XY (scatter) charts.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/series/smoothed-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.SmoothedXYLineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Data item fields: `ISmoothedXYLineSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYSeries")`) for signatures and descriptions.

- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
