---
title: "IValueAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisSettings
All ancestors: IAxisSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.ValueAxis` (see its page for the class)
TypeScript: `am5xy.IValueAxisSettings` (`import type { IValueAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **min** (`number`) — Lowest value of the axis scale, instead of the lowest series value. The axis may round it to fit its grid, unless `strictMinMax` is `true`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope
- **max** (`number`) — Highest value of the axis scale, instead of the highest series value. The axis may round it to fit its grid, unless `strictMinMax` is `true`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope
- **strictMinMax** (`boolean`) — default `false` _(theme)_ — Makes the scale start and end exactly at `min` and `max`, or where they aren't set, at the lowest and highest series values, without rounding. The axis then also stops rescaling to the values in view as the chart zooms. To rescale to the exact values in view, use `strictMinMaxSelection` instead. `extraMin` and `extraMax` still add padding. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Custom_scope
- **strictMinMaxSelection** (`boolean`) — default `false` _(code fallback)_ — Rescales the axis to exactly the lowest and highest values in view as the chart zooms, without rounding. Keeps series of derived values, such as `valueYChangeSelection`, from jumping around. Has no effect with `strictMinMax`, which stops the rescaling. `extraMin` and `extraMax` still add padding. _Since 5.1.11._
- **logarithmic** (`boolean`) — default `false` _(theme)_ — Uses a logarithmic scale. It can show only values above zero; see `treatZeroAs`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Logarithmic_scale
- **treatZeroAs** (`number`) — On a `logarithmic` axis, the value to plot zero and negative values at, since the scale can't show them. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Logarithmic_scale
- **extraMin** (`number`) — default `0` _(code fallback)_ — Extends the scale below the lowest value by this share of the value range: with values from `0` to `1000`, `0.1` starts the axis at `-100` (before rounding to the grid). If not set, a `logarithmic` axis without `strictMinMax` uses `0.1`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Relative_scope_extension
- **extraMax** (`number`) — default `0` _(code fallback)_ — Extends the scale above the highest value by this share of the value range: with values from `0` to `1000`, `0.1` ends the axis at `1100` (before rounding to the grid). If not set, a `logarithmic` axis without `strictMinMax` uses `0.2`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Relative_scope_extension
- **baseValue** (`number`) — default `0` _(theme)_ — The value columns grow from, splitting "positive" from "negative" values. Its grid line gets the `"base"` theme tag. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Base_value
- **maxPrecision** (`number`) — Most decimal places the labels may have. It also limits the grid step: `0` allows whole-number steps only. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Label_format
- **fillRule** (`(dataItem: DataItem<IValueAxisDataItem>) => void`) — default `(function)` _(theme)_ — Function that decides which axis fills show; it is called for each grid step. The default fills every other step. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Axis_fills
- **numberFormat** (`string`) — Number format for the labels. If not set, the number formatter's default format is used, with as many decimals as the grid step needs. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Label_format
- **tooltipNumberFormat** (`string | Intl.NumberFormatOptions`) — Number format for the axis tooltip. If not set, `numberFormat` is used. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Tooltip_number_format
- **extraTooltipPrecision** (`number`) — default `0` _(code fallback)_ — Extra decimal places for the axis tooltip, beyond those of the labels: with labels like `1.1` and `1.2`, `1` lets the tooltip show `1.15`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Tooltip_number_format
- **calculateTotals** (`boolean`) — Calculates totals across the axis's series for each data item in view: `valueYTotal`, `valueYSum` and `valueYTotalPercent` (or the `valueX` ones on an X axis), as used by 100% stacked charts. Series with `excludeFromTotal` are left out. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Calculated_values
- **syncWithAxis** (`ValueAxis<AxisRenderer>`) — Another `ValueAxis` whose grid this axis lines up with, by adjusting its own scale. A perfect match isn't always possible. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Syncing_grid
- **syncZeros** (`boolean`) — default `false` — Lines up this axis's zero with the zero of `syncWithAxis`, spreading the other grid lines above and below it. Needs zero within the range of `syncWithAxis`, which has to extend to each side where this axis has values. _Since 5.16.2._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Syncing_grid
- **autoZoom** (`boolean`) — default `true` _(theme)_ — Rescales the axis to fit the values in view as the chart zooms along the other axis. Works only when that axis is not a plain `ValueAxis`: a `DateAxis` or a `CategoryAxis`, for example. _Since 5.2.20._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisSettings")`) for types, defaults and descriptions.

- _IAxisSettings_: bullet, end, fixAxisSize, maxDeviation, maxZoomCount, maxZoomFactor, minorAxisFillsEnabled, minZoomCount, panX, panY, renderer, snapTooltip, start, tooltip, tooltipLocation, zoomable, zoomOut, zoomX, zoomY
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
