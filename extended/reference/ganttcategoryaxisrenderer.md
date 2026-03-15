---
title: "GanttCategoryAxisRenderer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttcategoryaxisrenderer/"
scraped: "2026-03-15"
---

Renderer for GanttCategoryAxis axes.

## Import

```javascript
// Import GanttCategoryAxisRenderer
import * as am5gantt from "@amcharts/amcharts5/gantt"
```

## Inheritance

Extends: AxisRendererY

> **Note:** This class also inherits all settings, properties, methods, and events from AxisRendererY (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **axis** (`GanttCategoryAxis`) — (no description)
- **containers** (`ListTemplate`) — Default new ListTemplate<Container> A TemplateList with all the containers attached to the axis. This container holds all the elements of axis item - label, grip, task bullet, controls, etc.
- **controlsContainers** (`ListTemplate`) — Default new ListTemplate<Container> A TemplateList with all the controls containers attached to the axis. This container holds all the controls of axis item - duration stepper, progress pie, etc.
- **durationSteppers** (`ListTemplate`) — Default new ListTemplate<NumericStepper> A TemplateList with all the duration steppers attached to the axis. Duration steppers are used to set and show duration of tasks.
- **grips** (`ListTemplate`) — Default new ListTemplate<Rectangle> A TemplateList with all the grips attached to the axis. Dragging by the grips allows to rearrange the axis items.
- **labels** (`ListTemplate`) — Default new ListTemplate<AxisLabelRadial> A TemplateList with all the labels attached to the axis. labels.template can be used to configure appearance of the labels.
- **progressPies** (`ListTemplate`) — Default new ListTemplate<ProgressPie> A TemplateList with all the progress pies attached to the axis. Progress pies are used to show progress of tasks.
- **taskBullets** (`ListTemplate`) — Default new ListTemplate<Button> A TemplateList with all the task bullets attached to the axis. Task bullets are shown to the left of the label. If a task doesn't have children it will show circle. Otherwise it will show rectangle which is clickable and can be used to toggle collapse/expand of the task.
