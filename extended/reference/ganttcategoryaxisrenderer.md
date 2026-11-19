---
title: "GanttCategoryAxisRenderer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ganttcategoryaxisrenderer/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Renderer for a `GanttCategoryAxis`: draws each task's row with its grip, task bullet, editable label, duration stepper and progress pie.

_Since 5.14.0._ Docs: https://docs.amcharts.com/v5/charts/gantt/#category-vertical-axis

## Import

```js
import * as am5gantt from "@amcharts/amcharts5/gantt";

am5gantt.GanttCategoryAxisRenderer.new(root, { /* settings */ });
```

## Inheritance

Extends: AxisRendererY → AxisRenderer → Graphics → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IGanttCategoryAxisRendererSettings` — get_api_reference shows it after this page
- Private settings: `IGanttCategoryAxisRendererPrivate`

## Properties

Public properties (not settings):

- **axis** (`GanttCategoryAxis<this>`) — The axis this renderer draws.
- **containers** (`ListTemplate<Container>`) — Row containers, each holding a task's grip, task bullet, label and controls. Dragging one moves the task in the list.
- **controlsContainers** (`ListTemplate<Container>`) — Containers for each task's duration stepper and progress pie.
- **durationSteppers** (`ListTemplate<NumericStepper>`) — Steppers that show and set each task's duration, in `durationUnit` units.
- **grips** (`ListTemplate<Rectangle>`) — Grips at the left of the rows, for dragging tasks to reorder them or to move them under another task.
- **labels** (`ListTemplate<EditableAxisLabel>`) — The task name labels, which the user can edit. Configure them through `labels.template`.
- **progressPies** (`ListTemplate<ProgressPie>`) — Pies that show each task's progress. Clicking one toggles the task between done and its previous progress.
- **taskBullets** (`ListTemplate<Button>`) — Bullets left of the labels: a triangle that collapses and expands a task's subtasks, or a circle for a task without any.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("AxisRendererY")`) for signatures and descriptions.

- _AxisRendererY_: positionToCoordinate, positionToPoint
- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
