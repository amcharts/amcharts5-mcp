---
title: "CategoryAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/categoryaxis/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

An axis of named categories, each taking an equal share of the axis unless `cellSizeField` sets their sizes.

Docs: https://docs.amcharts.com/v5/charts/xy-chart/axes/category-axis/

## Import

```js
import * as am5xy from "@amcharts/amcharts5/xy";

am5xy.CategoryAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: Axis → Component → Container → Sprite → Entity → Settings
Extended by: CategoryDateAxis, GanttCategoryAxis

## Settings and related interfaces

- Settings: `ICategoryAxisSettings` — get_api_reference shows it after this page
- Private settings: `ICategoryAxisPrivate`
- Events: `ICategoryAxisEvents`
- Data item fields: `ICategoryAxisDataItem`

## Methods

- `axisPositionToIndex(position: number): number` — Returns the index of the category at a position on the axis. Parameters: `position`: Position (`0` to `1`). Returns: Category index
- `categoryToIndex(category: string): number` — Returns an index of a category. Parameters: `category`: Category to look up. Returns: Index
- `categoryToPosition(category: string): number` — Returns the position (`0` to `1`) of the middle of a category on the axis. Parameters: `category`: Category to look up. Returns: Position
- `endIndex(): number` — Returns the index after the last category in view.
- `getCellWidthPosition(): number` — Returns the distance between two grid lines as a share of the visible part of the axis. Returns: Distance (`0` to `1`) _Since 5.2.30._
- `getSeriesItem(series: XYSeries, position: number): DataItem<IXYSeriesDataItem> | undefined` — Returns the series data item of the category at a position on the axis. Parameters: `series`: Series; `position`: Position on the axis (`0` to `1`). Returns: Data item
- `getTooltipText(position: number, _adjustPosition?: boolean): string | undefined` — Returns the text the axis tooltip shows at a position: the axis's `tooltipText`, or else the text of the tooltip's or the category's label. Parameters: `position`: Position on the axis (`0` to `1`). Returns: Tooltip text
- `getX(value: string): number` — Returns the X coordinate in pixels of the middle of a category. Parameters: `value`: Category. Returns: X coordinate
- `getY(value: string): number` — Returns the Y coordinate in pixels of the middle of a category. Parameters: `value`: Category. Returns: Y coordinate
- `indexToPosition(index: number, location?: number, final?: boolean): number` — Converts a category index to a position on the axis (`0` to `1`). Parameters: `index`: Index; `location`: Location within the category, from `0` (start) to `1` (end); `0.5` if not set; `final`: Use the cell sizes running animations head for, and ignore `deltaPosition`. Returns: Position
- `startIndex(): number` — Returns the index of the first category in view.
- `zoomToCategories(startCategory: string, endCategory: string, duration?: number): void` — Zooms the axis to show the categories from `startCategory` to `endCategory`, both included. Parameters: `startCategory`: First category; `endCategory`: Last category; `duration`: Animation duration in milliseconds.
- `zoomToIndexes(start: number, end: number, duration?: number): void` — Zooms the axis to show the categories from index `start` up to, but not including, `end`. Parameters: `start`: Start index; `end`: End index (not included); `duration`: Animation duration in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Axis")`) for signatures and descriptions.

- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip, zoom
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
