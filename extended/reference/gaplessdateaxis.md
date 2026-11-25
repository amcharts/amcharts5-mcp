---
title: "GaplessDateAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/gaplessdateaxis/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A `DateAxis` that leaves out periods without data, such as weekends, so the data items sit side by side.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/gapless-date-axis/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.GaplessDateAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: DateAxis → ValueAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGaplessDateAxisSettings` — get_api_reference shows it after this page
- Private settings: `IGaplessDateAxisPrivate`
- Events: `IGaplessDateAxisEvents`
- Data item fields: `IGaplessDateAxisDataItem`

## Methods

- `positionToValue(position: number): number` — Converts a position on the axis (`0` to `1`) to a value (timestamp). Parameters: `position`: Relative position. Returns: Value
- `valueToIndex(value: number): number` — Returns the index, among the axis's dates, of the date at or before a timestamp. Parameters: `value`: Value. Returns: Index
- `valueToPosition(value: number): number` — Converts a value (timestamp) to a position on the axis (`0` to `1`). Parameters: `value`: Value. Returns: Relative position
- `zoomToDates(start: Date, end: Date, duration?: number): void` — Zooms the axis to the range between two dates. Parameters: `start`: Start Date; `end`: End Date; `duration`: Animation duration in milliseconds.
- `zoomToValues(start: number, end: number, duration?: number): void` — Zooms the axis to the range between two timestamps, in milliseconds, kept within the axis's range. Parameters: `start`: Start value; `end`: End value; `duration`: Animation duration in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DateAxis")`) for signatures and descriptions.

- _DateAxis_: baseDuration, baseMainDuration, baseMainInterval, dateToPosition, getCellWidthPosition, getGroupInterval, getIntervalMax, getIntervalMin, getSeriesItem, getTooltipText, positionToDate
- _ValueAxis_: basePosition, baseValue, getX, getY
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
