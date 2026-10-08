---
title: "ICategoryDateAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icategorydateaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ICategoryAxisSettings
All ancestors: ICategoryAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.CategoryDateAxis` (see its page for the class)
TypeScript: `am5xy.ICategoryDateAxisSettings` (`import type { ICategoryDateAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **baseInterval** (`ITimeInterval`) — The time interval of the data, such as `{ timeUnit: "day", count: 1 }` for daily data. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Data_granularity
- **gridIntervals** (`ITimeInterval[]`) — default computed at runtime _(theme)_ — Intervals the grid and labels can be placed at, from shortest to longest. The axis uses the shortest that keeps grid lines at least `minGridDistance` apart. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Grid_granularity
- **markUnitChange** (`boolean`) — default `true` _(theme)_ — Formats labels where a new period begins, such as the first day of a month, with `periodChangeDateFormats` instead of `dateFormats`.
- **dateFormats** (`{ [index: string]: string; }`) — default computed at runtime _(theme)_ — Date formats for labels, by the time unit of the grid, such as `"day"`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats
- **periodChangeDateFormats** (`{ [index: string]: string; }`) — default computed at runtime _(theme)_ — Date formats, by time unit, for labels where a new period begins (see `markUnitChange`). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Date_formats
- **tooltipDateFormat** (`string`) — Date format for the axis tooltip. If not set, the one in `dateFormats` for the time unit of `baseInterval` is used. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ICategoryAxisSettings")`) for types, defaults and descriptions.

- _ICategoryAxisSettings_: categoryField, cellSizeField, endLocation, fillRule, idField, startLocation
- _IAxisSettings_: baseValue, bullet, end, fixAxisSize, maxDeviation, maxZoomCount, maxZoomFactor, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
