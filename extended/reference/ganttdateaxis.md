---
title: "GanttDateAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttdateaxis/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A date axis of a `Gantt` chart. The Gantt has two, both above the plot area: `xAxis` with the larger time units and `xAxisMinor` below it.

_Since 5.14.0._ Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Timeline_horizontal_axis

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.GanttDateAxis.new(root, { /* settings */ });
```

## Inheritance

Extends: DateAxis → ValueAxis → Axis → Component → Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttDateAxisSettings` — get_api_reference shows it after this page
- Private settings: `IGanttDateAxisPrivate`
- Events: `IGanttDateAxisEvents`
- Data item fields: `IGanttDateAxisDataItem`

## Properties

Public properties (not settings):

- **gantt** (`Gantt`) — A reference to the parent `Gantt` chart.
