---
title: "IDurationAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idurationaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IValueAxisSettings
All ancestors: IValueAxisSettings, IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.DurationAxis` (see its page for the class)
TypeScript: `am5xy.IDurationAxisSettings` (`import type { IDurationAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **baseUnit** (`TimeUnit`) — default `"second"` _(theme)_ — The time unit the data's values are in: with `"second"`, a value of `90` is 1 minute 30 seconds. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/#Base_unit

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IValueAxisSettings")`) for types, defaults and descriptions.

- _IValueAxisSettings_: autoZoom, baseValue, calculateTotals, extraMax, extraMin, extraTooltipPrecision, fillRule, logarithmic, max, maxPrecision, min, numberFormat, strictMinMax, strictMinMaxSelection, syncWithAxis, syncZeros, tooltipNumberFormat, treatZeroAs
- _IAxisSettings_: bullet, end, fixAxisSize, maxDeviation, maxZoomCount, maxZoomFactor, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
