---
title: "CurveColumnSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/curvecolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A column series for a `CurveChart`, `SerpentineChart` or `SpiralChart`. Its columns bend along the curve.

_Since 5.12.0._ Docs: https://docs.amcharts.com/v5/charts/timeline/

## Import

```js
import * as am5timeline from "@amcharts/amcharts5/timeline";

am5timeline.CurveColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ICurveColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ICurveColumnSeriesPrivate`
- Data item fields: `ICurveColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **chart** (`CurveChart`) — The chart the series belongs to.
- **columns** (`ListTemplate<Polygon>`) — The columns, drawn as polygons that follow the curve. Configure them through `columns.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("BaseColumnSeries")`) for signatures and descriptions.

- _BaseColumnSeries_: createAxisRange, hideDataItem, showDataItem
- _XYSeries_: hide, hideTooltip, resetExtremes, show, showDataItemTooltip
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
