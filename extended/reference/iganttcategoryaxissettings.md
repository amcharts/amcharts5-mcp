---
title: "IGanttCategoryAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttcategoryaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ICategoryAxisSettings
All ancestors: ICategoryAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5gantt.GanttCategoryAxis` (see its page for the class)
TypeScript: `am5gantt.IGanttCategoryAxisSettings` (`import type { IGanttCategoryAxisSettings } from "@amcharts/amcharts5/gantt"`)

## Settings

- **selectedDataItem** (`DataItem<IGanttCategoryAxisDataItem>`) — The selected task, if any.
- **parentIdField** (`string`) — default `"parentId"` — Field in data that holds the ID of the parent task. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Category_data
- **collapsedField** (`string`) — default `"collapsed"` — Field in data that holds whether the task's subtasks are collapsed. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Category_data
- **childCellSize** (`number`) — default `0.8` _(theme)_ — Row height of a subtask relative to its parent's row, `0` to `1`. Each deeper level shrinks by the same factor again. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Cell_height_for_child_categories
- **childShift** (`number`) — default `25` _(theme)_ — Indent in pixels of a subtask's label, per level of depth. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Cell_height_for_child_categories
- **minCellHeight** (`number`) — default `70` _(theme)_ — Minimum row height in pixels. The axis shows only as many rows as fit at this height; scroll to see the rest. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Cell_height
- **nameField** (`string`) — default `"name"` — Field in data that holds the task name.
- **colorField** (`string`) — default `"color"` — Field in data that holds the task color.

## Inherited settings with a different default on GanttCategoryAxis

- **maxDeviation** (`number`) — default `0` _(theme)_ — _from IAxisSettings_ — How far past its ends the axis can be zoomed or panned, as a share of the visible range: `0.1` is 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Over_zooming
- **zoomOut** (`boolean`) — default `false` _(theme)_ — _from IAxisSettings_ — `false` leaves the axis out of the chart's zoom-out: the zoom-out button doesn't reset it, and zooming it doesn't show the button. _Since 5.14.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ICategoryAxisSettings")`) for types, defaults and descriptions.

- _ICategoryAxisSettings_: categoryField, cellSizeField, endLocation, fillRule, idField, startLocation
- _IAxisSettings_: baseValue, bullet, end, fixAxisSize, maxZoomCount, maxZoomFactor, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
