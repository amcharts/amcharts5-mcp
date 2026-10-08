---
title: "IRadarChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradarchartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYChartSettings
All ancestors: IXYChartSettings, ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5radar.RadarChart` (see its page for the class)
TypeScript: `am5radar.IRadarChartSettings` (`import type { IRadarChartSettings } from "@amcharts/amcharts5/radar"`)

## Settings

- **radius** (`number | Percent`) — default `am5.percent(80)` _(theme)_ — Outer radius of the chart, in pixels or as a percent of the largest radius that fits the available space. Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/#Chart_radius
- **innerRadius** (`number | Percent`) — default `0` _(theme)_ — Inner radius of the chart, in pixels or as a percent of the outer radius. A negative value is measured in from the outer radius. Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/#Chart_radius
- **startAngle** (`number`) — default `-90` _(theme)_ — Angle in degrees where the chart's circle starts: `0` points right and angles grow clockwise, so `-90` is the top. Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/#Start_end_angles
- **endAngle** (`number`) — default `270` _(theme)_ — Angle in degrees where the chart's circle ends: `0` points right and angles grow clockwise. Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/#Start_end_angles
- **cursor** (`RadarCursor`) — The chart's cursor. Docs: https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor

## Inherited settings with a different default on RadarChart

- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — _from ISerialChartSettings_ — The `ColorSet` series take their colors from. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **paddingBottom** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYChartSettings")`) for types, defaults and descriptions.

- _IXYChartSettings_: arrangeTooltips, maxTooltipDistance, maxTooltipDistanceBy, panX, panY, pinchZoomX, pinchZoomY, scrollbarX, scrollbarY, strokeDasharrays, strokeWidths, wheelStep, wheelX, wheelY, wheelZoomPositionX, wheelZoomPositionY
- _ISerialChartSettings_: patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
