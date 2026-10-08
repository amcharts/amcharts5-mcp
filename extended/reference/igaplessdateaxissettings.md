---
title: "IGaplessDateAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igaplessdateaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDateAxisSettings
All ancestors: IDateAxisSettings, IValueAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.GaplessDateAxis` (see its page for the class)
TypeScript: `am5xy.IGaplessDateAxisSettings` (`import type { IGaplessDateAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on GaplessDateAxis

- **maxZoomFactor** (`number`) — default `null` _(theme)_ — _from IAxisSettings_ — Roughly how many times the axis can be zoomed in. A `CategoryAxis` ignores it and zooms in as far as `minZoomCount` categories; a `DateAxis` set to `null` (its default) zooms in as far as `minZoomCount` base intervals.
- **strictMinMax** (`boolean`) — default `true` _(theme)_ — _from IValueAxisSettings_ — Makes the scale start and end exactly at `min` and `max`, or where they aren't set, at the lowest and highest series values, without rounding. The axis then also stops rescaling to the values in view as the chart zooms. To rescale to the exact values in view, use `strictMinMaxSelection` instead. `extraMin` and `extraMax` still add padding. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDateAxisSettings")`) for types, defaults and descriptions.

- _IDateAxisSettings_: baseInterval, dateFormats, endLocation, gridIntervals, groupCount, groupData, groupInterval, groupIntervals, markUnitChange, minorDateFormats, periodChangeDateFormats, skipFirstMinor, startLocation, tooltipDateFormat, tooltipDateFormats, tooltipIntervalOffset, weekLabelLocation
- _IValueAxisSettings_: autoZoom, baseValue, calculateTotals, extraMax, extraMin, extraTooltipPrecision, fillRule, logarithmic, max, maxPrecision, min, numberFormat, strictMinMaxSelection, syncWithAxis, syncZeros, tooltipNumberFormat, treatZeroAs
- _IAxisSettings_: bullet, end, fixAxisSize, maxDeviation, maxZoomCount, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
