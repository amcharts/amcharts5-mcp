---
title: "IGanttCategoryAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttcategoryaxisdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ICategoryAxisDataItem
All ancestors: ICategoryAxisDataItem, IAxisDataItem, IComponentDataItem
TypeScript: not exported by name from the package.

## Data item fields

- **container** (`Container`) — Container for the whole row of the task list: grip, task bullet, label and controls.
- **controlsContainer** (`Container`) — Container for the task's duration stepper and progress pie.
- **grip** (`Rectangle`) — The grip for dragging the task to another place in the list.
- **taskBullet** (`Button`) — The bullet left of the label: a triangle that collapses and expands the subtasks, or a circle if there are none.
- **progressPie** (`ProgressPie`) — The pie that shows the task's progress.
- **children** (`DataItem<IGanttCategoryAxisDataItem>[]`) — Subtasks of this task, if any.
- **parentId** (`string`) — ID of the parent task.
- **parent** (`DataItem<IGanttCategoryAxisDataItem>`) — The parent task's data item.
- **progress** (`number`) — Progress of the task, from `0` to `1`. For a task with subtasks, the average of theirs.
- **durationStepper** (`NumericStepper`) — The stepper that shows and changes the task's duration.
- **collapsed** (`boolean`) — Whether the task's subtasks are collapsed.
- **duration** (`number`) — Duration of the task in the Gantt's `durationUnit` units.
- **color** (`Color`) — Color of the task, from data, from the Gantt's `colors` or from the parent task.
- **customColor** (`Color`) — Color the user picked for the task, if any. It takes precedence over `color`.
- **name** (`string`) — Name of the task, shown in its label.
- **deleting** (`boolean`) — _(internal)_
- **seriesDataItem** (`DataItem<IGanttSeriesDataItem>`) — The task's data item in the `GanttSeries`.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ICategoryAxisDataItem")`) for types, defaults and descriptions.

- _ICategoryAxisDataItem_: category, categoryLocation, cellSize, deltaPosition, endCategory, endCategoryLocation, finalCellSize, id, index
- _IAxisDataItem_: above, axisFill, bullet, grid, isRange, label, tick
- _IComponentDataItem_: visible
