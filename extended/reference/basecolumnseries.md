---
title: "BaseColumnSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/basecolumnseries/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Base class for column-based series: `ColumnSeries`, `CandlestickSeries`, `OHLCSeries` and `RadarColumnSeries`.

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: ColumnSeries, CurveColumnSeries, RadarColumnSeries

## Settings and related interfaces

- Settings: `IBaseColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IBaseColumnSeriesPrivate`
- Data item fields: `IBaseColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **columns** (`ListTemplate<Graphics>`) — Columns of the series. Configure them all through `columns.template`.

## Methods

- `createAxisRange(axisDataItem: DataItem<IAxisDataItem>): this["_axisRangeType"]` — Adds an axis range to the series and returns it. Make its data item with the axis's `makeDataItem()`. Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a data item, along with its column. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a data item, along with its column. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("XYSeries")`) for signatures and descriptions.

- _XYSeries_: hide, hideTooltip, resetExtremes, show, showDataItemTooltip
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
