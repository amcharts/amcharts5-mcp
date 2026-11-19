---
title: "ColumnSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/columnseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A series that shows values as columns or bars.

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.ColumnSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings
Extended by: CandlestickSeries, GanttSeries

## Settings and related interfaces

- Settings: `IColumnSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IColumnSeriesPrivate`
- Data item fields: `IColumnSeriesDataItem`

## Properties

Public properties (not settings):

- **allColumns** (`Graphics`)
- **allColumnsData** (`{ width: number; height: number; x: number; y: number; lowX0?: number; lowY0?: number; lowX1?: number; lowY1?: number; highX0?: number; highY0?: number; highX1?: number; highY1?: number; stroke?: Color; fill?: Color; strokeWidth: number; strokeOpacity: number; fillOpacity: number; }[]`)
- **columns** (`ListTemplate<RoundedRectangle>`) — Columns of the series. Configure them all, existing ones included, through `columns.template`.

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
