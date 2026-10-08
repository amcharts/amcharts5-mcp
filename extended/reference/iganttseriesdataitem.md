---
title: "IGanttSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IColumnSeriesDataItem
All ancestors: IColumnSeriesDataItem, IBaseColumnSeriesDataItem, IXYSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5gantt.IGanttSeriesDataItem` (`import type { IGanttSeriesDataItem } from "@amcharts/amcharts5/gantt"`)

## Data item fields

- **container** (`Container`) — Container with the task's grips, bullets and progress elements, which moves with the bar. The bar itself is not in it.
- **maskedContainer** (`Container`) — Container, masked to the bar's shape, with the progress rectangle and progress grip.
- **mask** (`RoundedRectangle`) — The mask of `maskedContainer`, with the bar's corner radii.
- **startBullet** (`Circle`) — Circle at the start of the bar, where a link being drawn can end.
- **endBullet** (`Circle`) — Circle at the end of the bar; dragging from it draws a link to another task.
- **startGrip** (`Rectangle`) — Grip for dragging the start of the bar.
- **endGrip** (`Rectangle`) — Grip for dragging the end of the bar.
- **progressRectangle** (`Rectangle`) — Shows the task's progress by covering the part not yet done with a diagonal line pattern.
- **zeroRectangle** (`RoundedRectangle`) — Diamond shown instead of the bar when the task has zero duration.
- **progressGrip** (`Triangle`) — Triangle dragged along the bar to set the task's progress.
- **progress** (`number`) — Progress of the task, from `0` to `1`.
- **prevProgress** (`number`) — Progress before the last click on the task's progress pie, which a second click restores.
- **duration** (`number`) — Duration of the task in the Gantt's `durationUnit` units.
- **linkTo** (`string[]`) — IDs of the tasks this task links to.
- **links** (`{ [index: string]: Link; }`) — The `Link` lines from this task, keyed by the ID of the task each one goes to.
- **categoryAxisDataItem** (`DataItem<IGanttCategoryAxisDataItem>`) — The task's data item in the `GanttCategoryAxis`.
- **children** (`DataItem<IGanttSeriesDataItem>[]`) — Data items of the subtasks.
- **parent** (`DataItem<IGanttSeriesDataItem>`) — Data item of the parent task, if any.
- **name** (`string`) — Name of the task, from the category axis data.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IBaseColumnSeriesDataItem")`) for types, defaults and descriptions.

- _IBaseColumnSeriesDataItem_: fill, graphics, legendDataItem, rangeGraphics
- _IXYSeriesDataItem_: bottom, categoryX, categoryY, highValueX, highValueXChange, highValueXChangePercent, highValueXChangePrevious, highValueXChangePreviousPercent, highValueXChangeSelection, highValueXChangeSelectionPercent, highValueXWorking, highValueXWorkingClose, highValueXWorkingOpen, highValueY, highValueYChange, highValueYChangePercent, highValueYChangePrevious, highValueYChangePreviousPercent, highValueYChangeSelection, highValueYChangeSelectionPercent, highValueYWorking, highValueYWorkingClose, highValueYWorkingOpen, left, locationX, locationY, lowValueX, lowValueXChange, lowValueXChangePercent, lowValueXChangePrevious, lowValueXChangePreviousPercent, lowValueXChangeSelection, lowValueXChangeSelectionPercent, lowValueXWorking, lowValueXWorkingClose, lowValueXWorkingOpen, lowValueY, lowValueYChange, lowValueYChangePercent, lowValueYChangePrevious, lowValueYChangePreviousPercent, lowValueYChangeSelection, lowValueYChangeSelectionPercent, lowValueYWorking, lowValueYWorkingClose, lowValueYWorkingOpen, openCategoryX, openCategoryY, openLocationX, openLocationY, openValueX, openValueXChange, openValueXChangePercent, openValueXChangePrevious, openValueXChangePreviousPercent, openValueXChangeSelection, openValueXChangeSelectionPercent, openValueXWorking, openValueXWorkingClose, openValueXWorkingOpen, openValueY, openValueYChange, openValueYChangePercent, openValueYChangePrevious, openValueYChangePreviousPercent, openValueYChangeSelection, openValueYChangeSelectionPercent, openValueYWorking, openValueYWorkingClose, openValueYWorkingOpen, originals, point, right, stackToItemX, stackToItemY, top, valueX, valueXChange, valueXChangePercent, valueXChangePrevious, valueXChangePreviousPercent, valueXChangeSelection, valueXChangeSelectionPercent, valueXWorking, valueXWorkingClose, valueXWorkingOpen, valueY, valueYChange, valueYChangePercent, valueYChangePrevious, valueYChangePreviousPercent, valueYChangeSelection, valueYChangeSelectionPercent, valueYWorking, valueYWorkingClose, valueYWorkingOpen
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
