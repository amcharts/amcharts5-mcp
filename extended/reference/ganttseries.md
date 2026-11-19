---
title: "GanttSeries"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ganttseries/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Series of a `Gantt` chart: draws the task bars, their progress and the links between tasks, and lets the user drag and resize them.

_Since 5.14.0._ Docs: https://docs.amcharts.com/v5/charts/gantt/#gantt-series

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.GanttSeries.new(root, { /* settings */ });
```

## Inheritance

Extends: ColumnSeries → BaseColumnSeries → XYSeries → Series → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttSeriesSettings` — get_api_reference shows it after this page
- Private settings: `IGanttSeriesPrivate`
- Data item fields: `IGanttSeriesDataItem`

## Properties

Public properties (not settings):

- **connectorArrow** (`Triangle`) — Arrowhead at the pointer end of `connectorLine`, while the user draws a link.
- **connectorLine** (`Line`) — Dashed line shown while the user draws a link between two tasks.
- **containers** (`ListTemplate<Container>`) — Containers, one per task, with the grips, bullets and progress elements of its bar.
- **endBullets** (`ListTemplate<Circle>`) — Circles at the end of the bars; dragging from one draws a link to another task.
- **endGrips** (`ListTemplate<Rectangle>`) — Grips for dragging the end of the bars.
- **gantt** (`Gantt`) — A reference to the parent `Gantt` chart.
- **links** (`ListTemplate<Link>`) — The `Link` lines between tasks. Clicking a link selects it, and a second click deletes it.
- **linksContainer** (`Container`) — A container that holds all the links between tasks.
- **maskedContainers** (`ListTemplate<Container>`) — Containers, masked to the bar's shape, with each task's progress rectangle and progress grip.
- **progressGrips** (`ListTemplate<Triangle>`) — Triangles at the bottom of the bars, dragged to set each task's progress.
- **progressRectangles** (`ListTemplate<Rectangle>`) — Rectangles that show progress by covering the part of each bar not yet done with a diagonal line pattern.
- **startBullets** (`ListTemplate<Circle>`) — Circles at the start of the bars. Hidden until a link being drawn hovers a task it can end on.
- **startGrips** (`ListTemplate<Rectangle>`) — Grips for dragging the start of the bars.
- **zeroRectangles** (`ListTemplate<RoundedRectangle>`) — Diamonds shown instead of bars for tasks with zero duration.

## Methods

- `disposeDataItem(dataItem: DataItem<this["_dataItemSettings"]>): void` — Disposes a data item with all its elements and links. Parameters: `dataItem`: Data item.
- `disposeLinks(dataItem: DataItem<IGanttSeriesDataItem>): void` — Removes all links from and to a task. Parameters: `dataItem`: Data item.
- `getDataItemDuration(dataItem: DataItem<IGanttSeriesDataItem>): number` — Returns a task's duration in `durationUnit` units, without the weekends and holidays it spans (see `excludeWeekends`). Parameters: `dataItem`: Data item. Returns: Duration in units
- `getDepth(dataItem: DataItem<IGanttSeriesDataItem>): number` — Returns how deep a task is in the hierarchy: `0` for a top-level task. Parameters: `dataItem`: Data item. Returns: Depth level
- `getEndValue(openValue: number, duration: number): number` — Returns the end of a task with the given start and duration. With `excludeWeekends`, weekends and holidays don't count toward the duration. Parameters: `openValue`: Start timestamp in milliseconds; `duration`: Duration in `durationUnit` units. Returns: End timestamp in milliseconds
- `getHolidayCount(start: number, end: number): number` — Counts the `durationUnit` steps between two timestamps that fall on weekends or holidays, leaving out those at the very end of the range. Parameters: `start`: Start timestamp in milliseconds; `end`: End timestamp in milliseconds. Returns: Count of holiday units
- `getOpenValue(openValue: number): number` — Returns a task start moved off weekends and holidays to the next working unit. With `excludeWeekends` off, returns it unchanged. Parameters: `openValue`: Start timestamp in milliseconds. Returns: Adjusted start timestamp
- `getUnitDuration(): number` — Returns the length of one `durationUnit` in milliseconds. Returns: Duration in milliseconds
- `hideDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Hides a task's bar, with its grips, bullets and links. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise
- `isCollapsed(dataItem: DataItem<IGanttSeriesDataItem>): boolean` — Checks whether the task is hidden inside a collapsed parent task, at any level above it. Parameters: `dataItem`: Data item. Returns: Inside a collapsed parent?
- `isHoliday(value: number): boolean` — Checks whether a timestamp falls on one of the `weekends` days or a `holidays` date. Always `false` while `excludeWeekends` is off. Parameters: `value`: Timestamp in milliseconds. Returns: `true` on a weekend or holiday
- `showDataItem(dataItem: DataItem<this["_dataItemSettings"]>, duration?: number): Promise<void>` — Shows a task's bar, with its grips, bullets and links. Parameters: `dataItem`: Data item; `duration`: Animation duration in milliseconds. Returns: Promise

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("BaseColumnSeries")`) for signatures and descriptions.

- _BaseColumnSeries_: createAxisRange
- _XYSeries_: hide, hideTooltip, resetExtremes, show, showDataItemTooltip
- _Series_: addBullet, endIndex, openUrl, startIndex
- _Component_: getDataItemById, makeDataItem, markDirtyValues, pushDataItem, updateData
- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
