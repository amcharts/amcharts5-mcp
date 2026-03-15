---
title: "IGanttCategoryAxisDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttcategoryaxisdataitem/"
scraped: "2026-03-15"
---

Inheritance
IGanttCategoryAxisDataItem extends ICategoryAxisDataItem.
IGanttCategoryAxisDataItem is not extended by any other symbol.
Properties


        above        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IAxisDataItem
If set to true, the grid and axis fill of this data item will be drawn above series.
 NOTE: this needs to be set before crating an axis range. Updating this dynamically won't have any effect.
 NOTE: if you need all grid to be drawn above series, you can brig it to front with chart.gridContainer.toFront();.

## Inheritance

Extends: ICategoryAxisDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ICategoryAxisDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **children** (`Array`) — Children of this category, if any.
- **collapsed** (`undefined | false | true`) — A flag indicating whether the category is collapsed.
- **color** (`Color`) — Color of a task.
- **container** (`Container`) — A container that holds all other elements of a axis label - label, controls, grip, etc.
- **controlsContainer** (`Container`) — A container that holds progress pie and duration stepper.
- **customColor** (`Color`) — Custom color for the task, if any.
- **duration** (`undefined | number`) — Duration of the task (in days or other units, depending on durationUnit setting of a Gantt).
- **durationStepper** (`NumericStepper`) — A stepper that allows to change task duration.
- **grip** (`Rectangle`) — A grip for dragging the category.
- **name** (`undefined | string`) — Displayed name of a category.
- **parent** (`DataItem`) — A reference to the parent category data item.
- **parentId** (`undefined | string`) — Parent id of data item.
- **progress** (`undefined | number`) — Progress of the task, from 0 to 1. If this item has children, this will be the average of all children's progress.
- **progressPie** (`ProgressPie`) — A progress pie that shows progress of the task.
- **seriesDataItem** (`DataItem`) — A reference to the series data item.
- **taskBullet** (`Button`) — A bullet to the left of a label (circle or triangle, if it has children)
