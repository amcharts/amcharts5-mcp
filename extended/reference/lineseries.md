---
title: "LineSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/lineseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A series drawn as a line, with an optional fill below it for an area chart.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/series/line-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.LineSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: CurveLineSeries, DrawingSeries, RadarLineSeries, SmoothedXLineSeries, SmoothedXYLineSeries, SmoothedYLineSeries, StepLineSeries

## Settings and related interfaces

- Settings: `ILineSeriesSettings` — get_api_reference shows it after this page
- Private settings: `ILineSeriesPrivate`
- Data item fields: `ILineSeriesDataItem`

## Properties

Public properties (not settings):

- **fills** (`ListTemplate<Graphics>`) — default `new ListTemplate<Graphics>` — Fills below the line segments. They are hidden by default: set `visible` and `fillOpacity` on `fills.template` to show them.
- **strokes** (`ListTemplate<Graphics>`) — default `new ListTemplate<Graphics>` — Line segments of the series. Configure them all, existing ones included, through `strokes.template`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYSeries")`) for signatures and descriptions.

- _XYSeries_: createAxisRange, hide, hideDataItem, hideTooltip, resetExtremes, show, showDataItem, showDataItemTooltip
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
