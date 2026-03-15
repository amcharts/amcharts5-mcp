---
title: "GanttCategoryAxis"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttcategoryaxis/"
scraped: "2026-03-15"
---

A category axis that is used as a Y (vertical) axis for Gantt charts.

## Import

```javascript
// Import GanttCategoryAxis
import * as am5gantt from "@amcharts/amcharts5/gantt"
```

## Inheritance

Extends: CategoryAxis

> **Note:** This class also inherits all settings, properties, methods, and events from CategoryAxis (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **childCellSize** (`undefined | number`) — Default 0.8 Size of child categories relative to the top-level cell height. (0 - 1) Click here for more info
- **childShift** (`undefined | number`) — Default 25 A shift in pixels to apply to child categories. Click here for more info
- **collapsedField** (`undefined | string`) — Default "collapsed" A field in data that holds status whether the category is collapsed. Click here for more info
- **colorField** (`undefined | string`) — Default "color" Field of a category color
- **minCellHeight** (`undefined | number`) — Default 70 A minimal height of the cell in pixels. Click here for more info
- **nameField** (`undefined | string`) — Default "name" Field of a category name
- **parentIdField** (`undefined | string`) — Default "parentId" A field in data that holds parent id. Click here for more info
- **selectedDataItem** (`DataItem`) — Currently selected category data item, if any.

## Properties

- **axisResizer** (`Rectangle`) — (no description)
- **gantt** (`Gantt`) — A reference to the parent Gantt chart.
