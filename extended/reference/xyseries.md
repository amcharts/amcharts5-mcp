---
title: "XYSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/xyseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for all XY chart series.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/series/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: Series → Component → Container → Sprite → Entity → Settings
Extended by: BaseColumnSeries, LineSeries

## Settings and related interfaces

- Settings: `IXYSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IXYSeriesPrivate`
- Events: `IXYSeriesEvents`
- Data item fields: `IXYSeriesDataItem`

## Properties

Public properties (not settings):

- **axisRanges** (`List<this["_axisRangeType"]>`) — Axis ranges of the series, added with `createAxisRange()`. Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
- **chart** (`XYChart`) — The chart the series belongs to.
- **mainContainer** (`Container`) — default `Container.new()` — Container that holds the series' elements, such as its lines or columns.
- **mainDataItems** (`DataItem<this["_dataItemSettings"]>[]`) — The series' original data items, before any grouping by a `DateAxis`.

## Methods

- `createAxisRange(axisDataItem: DataItem<IAxisDataItem>): this["_axisRangeType"]` — Adds an axis range to the series and returns it. Make its data item with the axis's `makeDataItem()`. Parameters: `axisDataItem`: Axis data item. Returns: Axis range Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
- `hide(duration?: number): Promise<void>` — Hides the series. Parameters: `duration`: Duration of animation in milliseconds. Returns: Animation promise
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a data item, animating its values to the value axis's base value. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `hideTooltip(): Promise<void> | undefined` — Hides the element's `Tooltip`.
- `resetExtremes(): void` — Clears the series' cached minimum and maximum values, which the axes use for their scale.
- `show(duration?: number): Promise<void>` — Shows the series. Parameters: `duration`: Duration of animation in milliseconds. Returns: Animation promise
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a data item, animating its values back from the base value. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `showDataItemTooltip(dataItem: DataItem<this["_dataItemSettings"]> | undefined): void` — Shows the series' tooltip for a data item, and shows that data item in the legend. Parameters: `dataItem`: Data item, or `undefined` to clear the tooltip.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Series")`) for signatures and descriptions.

- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
