---
title: "GanttSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttseries/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Series of a `Gantt` chart: draws the task bars, their progress and the links between tasks, and lets the user drag and resize them.

_Since 5.14.0._ Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Gantt_series

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
