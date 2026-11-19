---
title: "Gantt"
type: "class"
source: "https://docs.amcharts.com/v5/reference/gantt/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A Gantt chart: a task list on the left and the tasks' bars, links and progress on a timeline.

_Since 5.14.0._ Docs: https://docs.amcharts.com/v5/charts/gantt/

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.Gantt.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttSettings` — get_api_reference shows it after this page
- Private settings: `IGanttPrivate`
- Events: `IGanttEvents`

## Properties

Public properties (not settings):

- **addButton** (`Button`) — Button that adds a new task, as a subtask of the selected task if there is one.
- **clearButton** (`ConfirmButton`) — Button that deletes all tasks, once the user confirms.
- **collapseButton** (`Button`) — Button that collapses all tasks.
- **colorPicker** (`ColorPicker`) — The color picker opened by `colorPickerButton`. It colors the selected task.
- **colorPickerButton** (`ColorPickerButton`) — Button that opens `colorPicker` to choose a task color.
- **controls** (`Container`) — Toolbar container with the add, color picker, expand, collapse, link, edit and clear buttons.
- **editButton** (`Button`) — Toggle button for the `editable` setting. Hidden by default. _Since 5.14.1._
- **expandButton** (`Button`) — Button that expands all tasks.
- **fitButton** (`Button`) — Button that zooms the date axis to fit the tasks currently in view.
- **linkButton** (`Button`) — Toggle button for the `linkNewTasks` setting.
- **scrollbarX** (`Scrollbar`) — A scrollbar for horizontal scrolling.
- **scrollbarY** (`Scrollbar`) — A scrollbar for vertical scrolling.
- **series** (`GanttSeries`) — The `GanttSeries` that draws the task bars.
- **xAxis** (`GanttDateAxis<GanttDateAxisRenderer>`) — The upper date axis, with the larger time units. The series uses it.
- **xAxisMinor** (`GanttDateAxis<GanttDateAxisRenderer>`) — The lower date axis, with the finer time units. Clicking it marks a date.
- **xyChart** (`XYChart`) — The `XYChart` inside the Gantt that holds the axes and the series.
- **yAxis** (`GanttCategoryAxis<GanttCategoryAxisRenderer>`) — The `GanttCategoryAxis` that lists the tasks on the left.
- **zoomControls** (`Container`) — Container with the fit and zoom-out buttons, at the top right of the plot area.
- **zoomOutButton** (`Button`) — Button that zooms the date axis fully out.

## Methods

- `addNewTask(name?: string, start?: number, duration?: number, parentId?: string, progress?: number, linkToPrevious?: boolean): void` — Adds a new task, with an ID generated for it, and scrolls the task list to it. Parameters: `name`: Task name; `"New Task"` if not given; `start`: Start timestamp in milliseconds; if not given, the end of the parent or of the last task; `duration`: Duration in `durationUnit` units; `parentId`: ID of the parent task; the selected task if not given; `progress`: Initial progress, `0` to `1`; `linkToPrevious`: Link the previous task to this one; `linkNewTasks` if not given.
- `clearAll(): void` — Deletes all tasks and date marks, restarts the colors and resets the timeline to start today.
- `markDate(date: number): void` — Marks a date with a dashed line across the plot area, as a click on the lower date axis does. Parameters: `date`: Timestamp in milliseconds.
- `unmarkDate(date: number): void` — Removes the mark of a date set by `markDate()` or a click. Parameters: `date`: Timestamp in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Container")`) for signatures and descriptions.

- _Container_: allChildren, contentHeight, contentWidth, eachChildren, innerHeight, innerWidth, scrollToChild
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
