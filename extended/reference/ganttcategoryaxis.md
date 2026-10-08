---
title: "GanttCategoryAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttcategoryaxis/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

The vertical axis of a `Gantt` chart: the editable task list, with subtasks, duration steppers and progress pies.

_Since 5.14.0._ Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Category_vertical_axis

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
