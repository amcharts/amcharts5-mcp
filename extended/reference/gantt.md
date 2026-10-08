---
title: "Gantt"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/gantt/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A Gantt chart: a task list on the left and the tasks' bars, links and progress on a timeline.

_Since 5.14.0._ Docs: https://www.amcharts.com/docs/v5/charts/gantt/

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
