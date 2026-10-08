---
title: "IGanttSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5gantt.Gantt` (see its page for the class)
TypeScript: `am5gantt.IGanttSettings` (`import type { IGanttSettings } from "@amcharts/amcharts5/gantt"`)

## Settings

- **editable** (`boolean`) — default `true` _(theme)_ — Lets the user add, move, resize, link, recolor and delete tasks. When `false`, the toolbar's editing buttons, grips and bullets are hidden.
- **durationUnit** (`"second" | "minute" | "hour" | "day" | "week" | "month" | "year"`) — default `"day"` _(theme)_ — Time unit of task durations. It is also the base interval of the date axes and the unit bars snap to. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Duration_units
- **weekends** (`number[]`) — default `[0, 6]` _(theme)_ — Days of the week that are not working days: `0` is Sunday, `6` Saturday. The lower date axis shades them when it shows days. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Weekends_and_holidays
- **holidays** (`Date[]`) — Dates that are not working days. Each covers the 24 hours from its time. Used only while `excludeWeekends` is on. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Weekends_and_holidays
- **excludeWeekends** (`boolean`) — default `true` — Task durations count working days only: a task that would start on one of the `weekends` days or on a `holidays` date starts on the next working day, and its duration skips them. Set to `false` to count every day. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Weekends_and_holidays
- **sidebarWidth** (`number | Percent`) — default `am5.percent(30)` _(theme)_ — Width of the task list on the left, in pixels or as a percent of the chart's width. It is never narrower than the task axis's `minWidth` (100 pixels if not set). Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Category_axis_width
- **snapThreshold** (`number`) — default `0.5` _(theme)_ — Where within a time unit a dragged or resized bar edge snaps to the next unit: `0` is the unit's start, `1` its end. A bar's start snaps forward once past `snapThreshold`, its end once past `1 - snapThreshold`, so `0.5` snaps both to the nearest unit. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Snapping_behavior
- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — Colors for top-level tasks that have no `color` in data. Subtasks take their parent's color. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **gridIntervals** (`{ [index: string]: ITimeInterval[]; }`) — default `{ year: [{ timeUnit: "week", count: 1 }, { timeUnit: "month", count: 1 }, { timeUnit: "month", count: 2 }, { timeUnit: "month", count: 6 }], month: [{ timeUnit: "week", count: 1 }, { timeUnit: "wee…` _(theme)_ — Grid intervals of the lower date axis for each time unit of the upper axis's grid: while the upper axis shows weeks, the lower one picks from the `week` list, and so on. Docs: https://www.amcharts.com/docs/v5/charts/gantt/#Timeline_horizontal_axis
- **linkNewTasks** (`boolean`) — default `true` _(theme)_ — Links each newly added task to the previous task at the same level.

## Inherited settings with a different default on Gantt

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **layout** (`Layout`) — default `root.verticalLayout` _(theme)_ — _from IContainerSettings_ — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
