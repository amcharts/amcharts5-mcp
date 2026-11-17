---
title: "ValueAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/valueaxis/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

An axis with a numeric scale.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/value-axis/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.ValueAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: Axis → Component → Container → Sprite → Entity → Settings
Extended by: DateAxis, DurationAxis

## Settings and related interfaces

- Settings: `IValueAxisSettings` — get_api_reference shows it after this page
- Private settings: `IValueAxisPrivate`
- Events: `IValueAxisEvents`
- Data item fields: `IValueAxisDataItem`

## Methods

- `basePosition(): number` — Returns the position (`0` to `1`) of the axis's base value. Returns: Base value position
- `baseValue(): number` — Returns the `baseValue` setting, kept within the axis's scale. Returns: Base value
- `getCellWidthPosition(): number` — Returns the distance between two grid lines as a share of the visible part of the axis. Returns: Distance (`0` to `1`)
- `getSeriesItem(series: XYSeries, position: number): DataItem<IXYSeriesDataItem> | undefined` — Returns the series data item whose value is closest to a position on the axis. Parameters: `series`: Series; `position`: Position on the axis (`0` to `1`). Returns: Data item
- `getTooltipText(position: number, _adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position. Parameters: `position`: Position on the axis (`0` to `1`). Returns: Tooltip text
- `getX(value: number, location: number, baseValue: number): number` — Returns the X coordinate in pixels of a value, from the axis's left edge. Parameters: `value`: Numeric value; `location`: Where between `baseValue` (`0`) and `value` (`1`) to measure; `baseValue`: Base value. Returns: X coordinate
- `getY(value: number, location: number, baseValue: number): number` — Returns the Y coordinate in pixels of a value, from the axis's top edge. Parameters: `value`: Numeric value; `location`: Where between `baseValue` (`0`) and `value` (`1`) to measure; `baseValue`: Base value. Returns: Y coordinate
- `positionToValue(position: number): number` — Converts a position on the axis (`0` to `1`, regardless of zoom) to a value. Parameters: `position`: Relative position. Returns: Value
- `valueToPosition(value: number): number` — Converts a value to a position on the axis (`0` to `1`, regardless of zoom). Parameters: `value`: Value. Returns: Relative position
- `zoomToValues(start: number, end: number, duration?: number): void` — Zooms the axis to the range between two values. Parameters: `start`: Start value; `end`: End value; `duration`: Animation duration in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Axis")`) for signatures and descriptions.

- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
