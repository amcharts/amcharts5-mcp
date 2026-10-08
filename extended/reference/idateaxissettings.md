---
title: "IDateAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idateaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IValueAxisSettings
All ancestors: IValueAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.DateAxis` (see its page for the class)
TypeScript: `am5xy.IDateAxisSettings` (`import type { IDateAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **baseInterval** (`ITimeInterval`) — The time interval of the data, such as `{ timeUnit: "day", count: 1 }` for daily data. Each data item takes up one such period on the axis. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Data_granularity
- **startLocation** (`number`) — default `0` _(theme)_ — Where within the first period the axis starts, from `0` (its start) to `1` (its end): `0.5` cuts off the first half of the first period.
- **endLocation** (`number`) — default `1` _(theme)_ — Where within the last period the axis ends, from `0` (its start) to `1` (its end): `0.5` cuts off the second half of the last period.
- **groupData** (`boolean`) — default `false` _(theme)_ — Groups data items into longer intervals from `groupIntervals` whenever more than `groupCount` of them would be in view, and back as the chart zooms in. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **groupCount** (`number`) — default `500` _(theme)_ — Most data items to show at once before `groupData` groups them into a longer interval. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **groupInterval** (`ITimeInterval`) — Groups data into this interval at any zoom, when `groupData` is on. It must be one of `groupIntervals`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **groupIntervals** (`ITimeInterval[]`) — default `[{ timeUnit: "millisecond", count: 1 }, { timeUnit: "millisecond", count: 10 }, { timeUnit: "millisecond", count: 100 }, { timeUnit: "second", count: 1 }, { timeUnit: "second", count: 10 }, { timeU…` _(theme)_ — Intervals `groupData` can group data into, from shortest to longest. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **gridIntervals** (`ITimeInterval[]`) — default computed at runtime _(theme)_ — Intervals the grid and labels can be placed at, from shortest to longest. The axis uses the shortest that keeps grid lines at least `minGridDistance` apart. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Grid_granularity
- **markUnitChange** (`boolean`) — default `true` _(theme)_ — Formats labels where a new period begins, such as the first day of a month, with `periodChangeDateFormats` instead of `dateFormats`.
- **dateFormats** (`{ [index: string]: string | Intl.DateTimeFormatOptions; }`) — default computed at runtime _(theme)_ — Date formats for labels, by the time unit of the grid, such as `"day"`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats
- **minorDateFormats** (`{ [index: string]: string | Intl.DateTimeFormatOptions; }`) — Date formats for minor grid labels, by time unit. If not set, `dateFormats` is used. _Since 5.6.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Minor_grid_formats
- **periodChangeDateFormats** (`{ [index: string]: string | Intl.DateTimeFormatOptions; }`) — default computed at runtime _(theme)_ — Date formats, by time unit, for labels where a new period begins (see `markUnitChange`). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats
- **tooltipDateFormat** (`string | Intl.DateTimeFormatOptions`) — Date format for the axis tooltip. Overrides `tooltipDateFormats`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Axis_tooltip
- **tooltipDateFormats** (`{ [index: string]: string | Intl.DateTimeFormatOptions; }`) — default `{ "millisecond": root.language.translate("_date_millisecond_full"), "second": root.language.translate("_date_second_full"), "minute": root.language.translate("_date_minute_full"), "hour": root.lang…` _(theme)_ — Date formats for the axis tooltip, by the time unit of the current base interval (the group interval while data is grouped). _Since 5.1.4._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Axis_tooltip
- **tooltipIntervalOffset** (`number`) — Shifts the date the axis tooltip shows, in base intervals, from `-1` to `1`. If not set, it is minus `tooltipLocation` (`-0.5` by default), so a tooltip pointing at the middle of a period shows the period's start. _Since 5.1.4._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Axis_tooltip
- **skipFirstMinor** (`boolean`) — default `true` _(theme)_ — Skips the minor grid line and label that would fall on each main grid line. _Since 5.14.0._
- **weekLabelLocation** (`number`) — default `0` _(theme)_ — Where labels sit within their cell, from `0` (start) to `1` (end), when the grid is in weeks. Replaces the labels' `location` then. _Since 5.14.0._

## Inherited settings with a different default on DateAxis

- **maxZoomFactor** (`number`) — default `null` _(theme)_ — _from IAxisSettings_ — Roughly how many times the axis can be zoomed in. A `CategoryAxis` ignores it and zooms in as far as `minZoomCount` categories; a `DateAxis` set to `null` (its default) zooms in as far as `minZoomCount` base intervals.
- **strictMinMax** (`boolean`) — default `true` _(theme)_ — _from IValueAxisSettings_ — Makes the scale start and end exactly at `min` and `max`, or where they aren't set, at the lowest and highest series values, without rounding. The axis then also stops rescaling to the values in view as the chart zooms. To rescale to the exact values in view, use `strictMinMaxSelection` instead. `extraMin` and `extraMax` still add padding. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IValueAxisSettings")`) for types, defaults and descriptions.

- _IValueAxisSettings_: autoZoom, baseValue, calculateTotals, extraMax, extraMin, extraTooltipPrecision, fillRule, logarithmic, max, maxPrecision, min, numberFormat, strictMinMaxSelection, syncWithAxis, syncZeros, tooltipNumberFormat, treatZeroAs
- _IAxisSettings_: bullet, end, fixAxisSize, maxDeviation, maxZoomCount, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
