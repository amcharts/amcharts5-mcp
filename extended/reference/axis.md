---
title: "Axis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/axis/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A base class for all axes.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/#adding-axes

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";
```

## Inheritance

Extends: Component → Container → Sprite → Entity → Settings
Extended by: CategoryAxis, ValueAxis

## Settings and related interfaces

- Settings: `IAxisSettings` — get_api_reference shows it after this page
- Private settings: `IAxisPrivate`
- Events: `IAxisEvents`
- Data item fields: `IAxisDataItem`

## Properties

Public properties (not settings):

- **axisHeader** (`Container`) — A container for extra content, such as a legend, a label or an icon. It sits above a Y axis, and to the left of an X axis. Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-headers/
- **axisRanges** (`List<DataItem<this["_dataItemSettings"]>>`) — The axis's ranges: highlighted values or spans, each with its own grid, label and fill. Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
- **bulletsContainer** (`Container`) — Holds the axis's bullets.
- **chart** (`XYChart`) — The chart the axis belongs to.
- **ghostLabel** (`AxisLabel`) — An invisible label that keeps room for the axis's widest label, so the axis doesn't shrink while zooming (see `fixAxisSize`). Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/value-axis/#ghost-label
- **gridContainer** (`Container`) — Holds the axis's grid and fills, drawn below the series.
- **labelsContainer** (`Container`) — Holds the axis's labels and ticks.
- **minorDataItems** (`DataItem<this["_dataItemSettings"]>[]`) — Data items of the minor grid.
- **series** (`this["_seriesType"][]`) — A list of series using this axis.
- **topGridContainer** (`Container`) — Holds the grid and fills of axis ranges set to be drawn `above` the series.

## Methods

- `coordinateToPosition(coordinate: number): number` — Converts a pixel coordinate along the axis, from its left or top edge, to a position on the axis (`0` to `1`), taking zoom into account. Parameters: `coordinate`: Coordinate in pixels. Returns: Position on the axis
- `createAxisRange(axisDataItem: DataItem<IAxisDataItem>): DataItem<this["_dataItemSettings"]>` — Adds a data item, made with `axis.makeDataItem()`, as an axis range and returns it. Parameters: `axisDataItem`: Axis data item. Returns: Axis range Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
- `getCellWidthPosition(): number` — Returns the distance between two grid lines as a share of the visible part of the axis. Returns: Distance (`0` to `1`)
- `getSeriesItem(series: XYSeries, position: number, location?: number): DataItem<IXYSeriesDataItem> | undefined` — Returns the series data item closest to a position on the axis. Parameters: `series`: Series; `position`: Position on the axis (`0` to `1`); `location`: Location within the cell (`0` to `1`), used by a `DateAxis`. Returns: Data item
- `getTooltipText(position: number, adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position. Parameters: `position`: Position on the axis (`0` to `1`); `adjustPosition`: `false` skips a `DateAxis`'s shift by `tooltipIntervalOffset`. Returns: Tooltip text
- `toAxisPosition(position: number): number` — Converts a position in the plot area (`0` to `1`, from its left or top edge) to a position on the axis, taking zoom and `inversed` into account. Parameters: `position`: Position in the plot area. Returns: Position on the axis
- `toGlobalPosition(position: number): number` — Converts a position on the axis to a position in the plot area (`0` to `1`, from its left or top edge): the opposite of `toAxisPosition`. Parameters: `position`: Position on the axis. Returns: Position in the plot area _Since 5.4.2._
- `updateTooltip(): void` — Moves the axis tooltip, and the series tooltips it drives, to the cursor's current position. Call it after changing the zoom from code.
- `zoom(start: number, end: number, duration?: number, priority?: "start" | "end"): Animation<this["_settings"]["start"]> | Animation<this["_settings"]["end"]> | undefined` — Zooms the axis to the range between `start` and `end`, where `0` is the start of the axis and `1` the end. The range is kept within `maxDeviation`, `maxZoomFactor`, `minZoomCount` and `maxZoomCount`. Parameters: `start`: Start position (`0` to `1`); `end`: End position (`0` to `1`); `duration`: Animation duration in milliseconds; `interpolationDuration` if not set; `priority`: Which end to keep when the limits change the range; `"end"` if not set. Returns: Zoom animation, if any

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Component")`) for signatures and descriptions.

- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
