---
title: "DateAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dateaxis/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A `ValueAxis` subclass.

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.DateAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: ValueAxis → Axis → Component → Container → Sprite → Entity → Settings
Extended by: GanttDateAxis, GaplessDateAxis

## Settings and related interfaces

- Settings: `IDateAxisSettings` — get_api_reference shows it after this page
- Private settings: `IDateAxisPrivate`
- Events: `IDateAxisEvents`
- Data item fields: `IDateAxisDataItem`

## Methods

- `baseDuration(): number` — Returns the duration of the current base interval in milliseconds: the group interval while data is grouped, `baseInterval` otherwise. Returns: Duration
- `baseMainDuration(): number` — Returns the duration of the `baseInterval` setting in milliseconds, whatever the grouping. Returns: Duration
- `dateToPosition(date: Date): number` — Returns the position of a date on the axis (`0` to `1`, regardless of zoom). Parameters: `date`: Date. Returns: Position
- `getCellWidthPosition(): number` — Returns the distance between two grid lines as a share of the visible part of the axis. Returns: Distance (`0` to `1`) _Since 5.2.30._
- `getGroupInterval(duration: number): ITimeInterval` — Returns the interval the axis would group data into to show a time span of `duration`. Parameters: `duration`: Time span in milliseconds. Returns: Group interval _Since 5.2.1._
- `getIntervalMax(interval: ITimeInterval): number` — Returns the axis's maximum with data at `interval`, the `baseInterval` or a group interval. Known only once the axis has shown data at it. Parameters: `interval`: Interval. Returns: Max _Since 5.2.1._
- `getIntervalMin(interval: ITimeInterval): number` — Returns the axis's minimum with data at `interval`, the `baseInterval` or a group interval. Known only once the axis has shown data at it. Parameters: `interval`: Interval. Returns: Min _Since 5.2.1._
- `getSeriesItem(series: XYSeries, position: number, location?: number, snap?: boolean): DataItem<IXYSeriesDataItem> | undefined` — Returns the series data item at a position on the axis: the one whose period contains it, or, with `snap` or the series' `snapTooltip`, the nearest one. Parameters: `series`: Series; `position`: Position on the axis (`0` to `1`); `location`: Location within the period (`0` to `1`); `0.5` if not set; `snap`: Return the nearest data item even if no period contains the position. Returns: Data item
- `getTooltipText(position: number, adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position. Unless `adjustPosition` is `false`, the date is shifted by `tooltipIntervalOffset`. Parameters: `position`: Position on the axis (`0` to `1`); `adjustPosition`: `false` to skip the shift. Returns: Tooltip text
- `positionToDate(position: number): Date` — Returns the date at a position on the axis (`0` to `1`, regardless of zoom). Parameters: `position`: Position. Returns: Date
- `zoomToDates(start: Date, end: Date, duration?: number): void` — Zooms the axis to the range between two dates. Parameters: `start`: Start Date; `end`: End Date; `duration`: Animation duration in milliseconds.
- `zoomToValues(start: number, end: number, duration?: number): void` — Zooms the axis to the range between two timestamps, in milliseconds. Parameters: `start`: Start value; `end`: End value; `duration`: Animation duration in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("ValueAxis")`) for signatures and descriptions.

- _ValueAxis_: basePosition, baseValue, getX, getY, positionToValue, valueToPosition
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
