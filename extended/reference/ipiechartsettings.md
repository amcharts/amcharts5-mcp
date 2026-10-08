---
title: "IPieChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipiechartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPercentChartSettings
All ancestors: IPercentChartSettings, ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.PieChart` (see its page for the class)
TypeScript: `am5percent.IPieChartSettings` (`import type { IPieChartSettings } from "@amcharts/amcharts5/percent"`)

## Settings

- **radius** (`number | Percent`) — default `am5.percent(80)` _(theme)_ — Outer radius of the pie, in pixels or percent. A percent is of the largest radius that fits the chart for its `startAngle` and `endAngle`. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Pie_radius
- **innerRadius** (`number | Percent`) — Inner radius of the pie, in pixels or percent of `radius`; any non-zero value makes a donut. A negative number is pixels in from the outer radius. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Pie_radius
- **startAngle** (`number`) — default `-90` _(theme)_ — Angle where the pie starts, in degrees: `0` is at the right, `-90` at the top, and angles grow clockwise. The chart uses it to fit and center the pie; the series' own `startAngle` sets where its slices start, so set both. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Start_end_angles
- **endAngle** (`number`) — default `270` _(theme)_ — Angle where the pie ends, in degrees. Like `startAngle`, it fits and centers the pie; set the series' `endAngle` to match. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Start_end_angles

## Inherited settings with a different default on PieChart

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISerialChartSettings")`) for types, defaults and descriptions.

- _ISerialChartSettings_: colors, patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
