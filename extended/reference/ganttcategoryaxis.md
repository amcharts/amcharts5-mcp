---
title: "GanttCategoryAxis"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ganttcategoryaxis/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

The vertical axis of a `Gantt` chart: the editable task list, with subtasks, duration steppers and progress pies.

_Since 5.14.0._ Docs: https://docs.amcharts.com/v5/charts/gantt/#category-vertical-axis

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.GanttCategoryAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: CategoryAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttCategoryAxisSettings` — get_api_reference shows it after this page
- Private settings: `IGanttCategoryAxisPrivate`
- Events: `IGanttCategoryAxisEvents`
- Data item fields: `IGanttCategoryAxisDataItem`

## Properties

Public properties (not settings):

- **axisResizer** (`Rectangle`)
- **gantt** (`Gantt`) — A reference to the parent `Gantt` chart.
- **xButton** (`Button`) — The delete button shown on the selected task.

## Methods

- `collapseAll(): void` — Collapses all tasks.
- `deleteAll(): void` — Deletes all tasks, from the axis and from the series.
- `deleteDataItem(dataItem: DataItem<IGanttCategoryAxisDataItem>, child?: boolean): void` — Deletes a task with its subtasks, from the axis and from the series, after animating it out. Parameters: `dataItem`: Task data item; `child`: `true` when the task goes along with its parent (used internally).
- `disposeDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Disposes a data item. Parameters: `dataItem`: Data item to dispose.
- `expandAll(): void` — Expands all tasks.
- `getSeriesDataItem(dataItem: DataItem<IGanttCategoryAxisDataItem>): DataItem<IGanttSeriesDataItem> | undefined` — Returns the task's data item in the `GanttSeries`. Parameters: `dataItem`: Task data item of this axis. Returns: Series data item
- `hideDataItem(dataItem: DataItem<IGanttCategoryAxisDataItem>): Promise<void>` — Hides a task's row. Parameters: `dataItem`: Data item. Returns: Promise
- `markDirtyTree(): void`
- `selectDataItem(dataItem?: DataItem<IGanttCategoryAxisDataItem>): void` — Selects a task and shows its delete button; an already selected task is unselected. Does nothing while the Gantt is not `editable`. Parameters: `dataItem`: Task data item.
- `setDataItemColor(dataItem?: DataItem<IGanttCategoryAxisDataItem>, c?: Color): void` — Sets the `customColor` of a task and its subtasks. A color equal to the task's own `color`, or none, clears it. Parameters: `dataItem`: Task data item; `c`: Color.
- `showDataItem(dataItem: DataItem<IGanttCategoryAxisDataItem>): Promise<void>` — Shows a task's row. Parameters: `dataItem`: Data item. Returns: Promise
- `toggleCollapse(dataItem: DataItem<IGanttCategoryAxisDataItem>, collapse?: boolean, duration?: number): void` — Collapses or expands a task's subtasks, at all levels below it. Parameters: `dataItem`: Task data item; `collapse`: `true` to collapse, `false` to expand; `duration`: Animation duration in milliseconds.
- `toggleProgressPie(dataItem?: DataItem<IGanttCategoryAxisDataItem>, value?: number): void` — Toggles a task between done and its previous progress, as a click on its progress pie does: progress below `1` animates to `1`, and `1` back to the previous value. For a task with subtasks, it toggles them all. Parameters: `dataItem`: Task data item; `value`: Progress to animate to instead, `0` to `1`.
- `unselectDataItems(): void` — Unselects the selected task and hides the delete button.
- `zoom(start: number, end: number, duration?: number): Animation<this["_settings"]["start"]> | Animation<this["_settings"]["end"]> | undefined` — Zooms the axis to a range given as positions from `0` (start of the axis) to `1` (end). Parameters: `start`: Relative start; `end`: Relative end; `duration`: Duration of the zoom animation in milliseconds. Returns: Zoom animation

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("CategoryAxis")`) for signatures and descriptions.

- _CategoryAxis_: axisPositionToIndex, categoryToIndex, categoryToPosition, endIndex, getCellWidthPosition, getSeriesItem, getTooltipText, getX, getY, indexToPosition, startIndex, zoomToCategories, zoomToIndexes
- _Axis_: coordinateToPosition, createAxisRange, toAxisPosition, toGlobalPosition, updateTooltip
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
