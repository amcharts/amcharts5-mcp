---
title: "PyramidSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/pyramidseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A pyramid series for a `SlicedChart`: one shape, `topWidth` wide at the top and `bottomWidth` at the bottom, cut into slices by value. `bottomRatio` has no effect here.

Docs: https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/pyramid-series/

## Import

```js
import * as am5percent from "@amcharts/amcharts5/percent";

am5percent.PyramidSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: FunnelSeries → PercentSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: PictorialStackedSeries

## Settings and related interfaces

- Settings: `IPyramidSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IPyramidSeriesPrivate`
- Data item fields: `IPyramidSeriesDataItem`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("FunnelSeries")`) for signatures and descriptions.

- _FunnelSeries_: hideDataItem, showDataItem
- _PercentSeries_: hide, hoverDataItem, show, unhoverDataItem
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
