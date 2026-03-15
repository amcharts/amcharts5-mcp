---
title: "Gantt"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/gantt/"
scraped: "2026-03-15"
---

Creates a Gantt chart.

## Import

```javascript
// Import Gantt
import * as am5gantt from "@amcharts/amcharts5/gantt"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for series. Click here for more info
- **durationUnit** (`"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`) — Default "day" A unit to be used for when calculating "duration" of Gantt items. Click here for more information
- **editable** (`undefined | false | true`) — Default true If set to true, the user will be able to edit the chart via UI.
- **excludeWeekends** (`undefined | false | true`) — If set to true, weekends will be excluded from the chart. Click here for more information
- **gridIntervals** (`undefined | object`) — Grid intervals. Click here for more info
- **holidays** (`Array`) — An array of dates to treat as a holiday. Click here for more information
- **linkNewTasks** (`undefined | false | true`) — Default true If this is set to true, when a new task is added, it will be automatically linked to the previous task.
- **sidebarWidth** (`number | Percent`) — Default 30% An absolute or relative width of the left-side category column. Click here for more information
- **snapThreshold** (`undefined | number`) — Default 0.5 A relative vertical cell position to treat as the threshold for snapping bars. Available range of values: 0 (left) to 1 (right). This will be used when resizing or dragging a bar. If the position is bigger than snapThreshold the bar will snap to the right, if it is smaller than snapThreshold, it will snap to the left. Click here for more information
- **weekends** (`Array`) — Default [0, 6] An array of weekend days, e.g. [0, 6] for Sunday and Saturday. Click here for more information

## Properties

- **addButton** (`Button`) — Default this.controls.children.push(Button.new(this._root, { themeTags: ["add", "plus"], tooltip: this.root.systemTooltip, icon: Graphics.new(this._root, { themeTags: ["icon"] }) })) The Button element to add new tasks.
- **clearButton** (`ConfirmButton`) — Default this.controls.children.push(ConfirmButton.new(this._root, { themeTags: ["clear", "secondary", "confirm"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip, active: false })) The Button element to clear all tasks.
- **collapseButton** (`Button`) — Default this.controls.children.push(Button.new(this._root, { themeTags: ["collapse", "secondary", "fixedwidth"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip })) The Button elements to collapse all tasks.
- **colorPicker** (`ColorPicker`) — Default this.children.push(ColorPicker.new(this._root, { visible: false })) The ColorPicker element to select colors for tasks.
- **colorPickerButton** (`ColorPickerButton`) — Default this.controls.children.push(ColorPickerButton.new(this._root, { disableOpacity: true, tooltip: this.root.systemTooltip })) The ColorPickerButton element to select colors for tasks.
- **controls** (`Container`) — Default Container.new(this._root, { themeTags: ["controls"], layout: this._root.horizontalLayout, }) Controls (add, color picker, expand, collaps, clear buttons) container.
- **editButton** (`Button`) — Default this.controls.children.push(Button.new(this._root, { themeTags: ["edit", "secondary", "fixedwidth"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip })) The Button element to toggle edit mode. @since 5.14.1
- **expandButton** (`Button`) — Default this.controls.children.push(Button.new(this._root, { themeTags: ["expand", "secondary", "fixedwidth"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip })) The Button elements to expand and collapse all tasks.
- **fitButton** (`Button`) — Default this.zoomControls.children.push(Button.new(this._root, { themeTags: ["fit", "secondary", "zoombutton"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip })) The Button element to horizontally fit visible tasks into a view.
- **linkButton** (`Button`) — Default this.controls.children.push(Button.new(this._root, { themeTags: ["link", "secondary", "fixedwidth"], icon: Graphics.new(this._root, { themeTags: ["icon"] }), tooltip: this.root.systemTooltip })) The Button element to toggle linkNewTasks setting.
- **scrollbarX** (`Scrollbar`) — Default Scrollbar.new(this._root, { orientation: "horizontal" }) A scrollbar for horizontal scrolling.
- **scrollbarY** (`Scrollbar`) — Default Scrollbar.new(this._root, { orientation: "vertical" }) A scrollbar for vertical scrolling.
- **series** (`GanttSeries`) — A reference to the GanttSeries that shows the Gantt tasks bars.
- **xAxis** (`GanttDateAxis`) — A reference to the GanttDateAxis used as the main X-axis.
- **xAxisMinor** (`GanttDateAxis`) — A reference to the GanttDateAxis used as the secondary X-axis.
- **xyChart** (`XYChart`) — A reference to the XYChart that holds the Gantt chart.
- **yAxis** (`GanttCategoryAxis`) — A reference to the GanttCategoryAxis used as the Y-axis.
- **zoomControls** (`Container`) — Default Container.new(this._root, { themeTagsSelf: ["zoomcontrols"] })
