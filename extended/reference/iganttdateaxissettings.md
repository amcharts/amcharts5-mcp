---
title: "IGanttDateAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttdateaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDateAxisSettings
All ancestors: IDateAxisSettings, IValueAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5gantt.GanttDateAxis` (see its page for the class)
TypeScript: `am5gantt.IGanttDateAxisSettings` (`import type { IGanttDateAxisSettings } from "@amcharts/amcharts5/gantt"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on GanttDateAxis

- **autoZoom** (`boolean`) — default `false` _(theme)_ — _from IValueAxisSettings_ — Rescales the axis to fit the values in view as the chart zooms along the other axis. Works only when that axis is not a plain `ValueAxis`: a `DateAxis` or a `CategoryAxis`, for example. _Since 5.2.20._
- **cursorOverStyle** (`string`) — default `"pointer"` _(theme)_ — _from ISpriteSettings_ — CSS cursor to show while the pointer is over the element, e.g. `"pointer"`. Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
- **dateFormats** (`{ [index: string]: string | Intl.DateTimeFormatOptions; }`) — default `{ hour: root.language.translate("_date_hour_full"), day: root.language.translate("_date_day"), week: defaultDateFormat, month: root.language.translate("_date_month_full"), year: root.language.trans…` _(theme)_ — _from IDateAxisSettings_ — Date formats for labels, by the time unit of the grid, such as `"day"`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats
- **extraMax** (`number`) — default `0.03` _(theme)_ — _from IValueAxisSettings_ — Extends the scale above the highest value by this share of the value range: with values from `0` to `1000`, `0.1` ends the axis at `1100` (before rounding to the grid). If not set, a `logarithmic` axis without `strictMinMax` uses `0.2`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Relative_scope_extension
- **extraMin** (`number`) — default `0.02` _(theme)_ — _from IValueAxisSettings_ — Extends the scale below the lowest value by this share of the value range: with values from `0` to `1000`, `0.1` starts the axis at `-100` (before rounding to the grid). If not set, a `logarithmic` axis without `strictMinMax` uses `0.1`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Relative_scope_extension
- **gridIntervals** (`ITimeInterval[]`) — default `[{ timeUnit: "hour", count: 1 }, { timeUnit: "day", count: 1 }, { timeUnit: "week", count: 1 }, { timeUnit: "month", count: 1 }, { timeUnit: "year", count: 1 }, { timeUnit: "year", count: 2 }, { ti…` _(theme)_ — _from IDateAxisSettings_ — Intervals the grid and labels can be placed at, from shortest to longest. The axis uses the shortest that keeps grid lines at least `minGridDistance` apart. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Grid_granularity
- **markUnitChange** (`boolean`) — default `false` _(theme)_ — _from IDateAxisSettings_ — Formats labels where a new period begins, such as the first day of a month, with `periodChangeDateFormats` instead of `dateFormats`.
- **maxZoomFactor** (`number`) — default `10000000` _(theme)_ — _from IAxisSettings_ — Roughly how many times the axis can be zoomed in. A `CategoryAxis` ignores it and zooms in as far as `minZoomCount` categories; a `DateAxis` set to `null` (its default) zooms in as far as `minZoomCount` base intervals.
- **strictMinMax** (`boolean`) — default `true` _(theme)_ — _from IValueAxisSettings_ — Makes the scale start and end exactly at `min` and `max`, or where they aren't set, at the lowest and highest series values, without rounding. The axis then also stops rescaling to the values in view as the chart zooms. To rescale to the exact values in view, use `strictMinMaxSelection` instead. `extraMin` and `extraMax` still add padding. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope
- **weekLabelLocation** (`number`) — default `0.5` _(theme)_ — _from IDateAxisSettings_ — Where labels sit within their cell, from `0` (start) to `1` (end), when the grid is in weeks. Replaces the labels' `location` then. _Since 5.14.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDateAxisSettings")`) for types, defaults and descriptions.

- _IDateAxisSettings_: baseInterval, endLocation, groupCount, groupData, groupInterval, groupIntervals, minorDateFormats, periodChangeDateFormats, skipFirstMinor, startLocation, tooltipDateFormat, tooltipDateFormats, tooltipIntervalOffset
- _IValueAxisSettings_: baseValue, calculateTotals, extraTooltipPrecision, fillRule, logarithmic, max, maxPrecision, min, numberFormat, strictMinMaxSelection, syncWithAxis, syncZeros, tooltipNumberFormat, treatZeroAs
- _IAxisSettings_: bullet, end, fixAxisSize, maxDeviation, maxZoomCount, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
