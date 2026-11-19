---
title: "OHLCSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ohlcseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A series that shows open, high, low and close values as OHLC bars (`OHLC`).

Docs: https://docs.amcharts.com/v5/charts/xy-chart/series/candlestick-series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.OHLCSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: CandlestickSeries → ColumnSeries → BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IOHLCSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IOHLCSeriesPrivate`
- Data item fields: `IOHLCSeriesDataItem`

## Properties

Public properties (not settings):

- **columns** (`ListTemplate<OHLC>`) — default `new ListTemplate<OHLC>` — OHLC bars of the series. Configure them all through `columns.template`.

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
