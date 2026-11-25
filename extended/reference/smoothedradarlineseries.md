---
title: "SmoothedRadarLineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/smoothedradarlineseries/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A line series for a `RadarChart` that draws a smooth curve through its data points.

## Import

```js
import * as am5radar from "@amcharts/amcharts5/radar";

am5radar.SmoothedRadarLineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: RadarLineSeries → LineSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISmoothedRadarLineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ISmoothedRadarLineSeriesPrivate`
- Data item fields: `ISmoothedRadarLineSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYSeries")`) for signatures and descriptions.

- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, endIndex, getSummary, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
