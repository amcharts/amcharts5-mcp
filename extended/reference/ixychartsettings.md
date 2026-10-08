---
title: "IXYChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixychartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISerialChartSettings
All ancestors: ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.XYChart` (see its page for the class)
TypeScript: `am5xy.IXYChartSettings` (`import type { IXYChartSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **scrollbarX** (`Scrollbar`) — Horizontal scrollbar that zooms and pans the X axes. It goes above the plot area, or below it with the scrollbar's `opposite` set. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
- **scrollbarY** (`Scrollbar`) — Vertical scrollbar that zooms and pans the Y axes. It goes right of the plot area, or left of it with the scrollbar's `opposite` set.
- **strokeWidths** (`number[]`) — Stroke widths in pixels for line series to cycle through, by each series' index in `series`. Helps tell lines apart without color. _Since 5.20.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **strokeDasharrays** (`(number | number[])[]`) — Dash patterns for line series to cycle through, by each series' index in `series`. Each entry is a `strokeDasharray` value; `0` or an empty array draws a solid line. _Since 5.20.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **panX** (`boolean`) — default `false` _(theme)_ — Lets the user pan the chart horizontally by dragging the plot area. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Panning
- **panY** (`boolean`) — default `false` _(theme)_ — Lets the user pan the chart vertically by dragging the plot area. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Panning
- **wheelX** (`"none" | "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY"`) — What scrolling the wheel horizontally over the plot area does: zoom or pan along X, Y or both. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Mouse_wheel_behavior
- **wheelY** (`"none" | "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY"`) — What scrolling the wheel vertically over the plot area does: zoom or pan along X, Y or both. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Mouse_wheel_behavior
- **wheelStep** (`number`) — default `0.25` _(theme)_ — How far one wheel step zooms or pans, as a share of the visible range.
- **cursor** (`XYCursor`) — The chart's cursor. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
- **maxTooltipDistance** (`number`) — Limits the cursor's series tooltips to the one closest to the pointer, plus any within this many pixels of it. `-1` shows only the closest one, even when others are at the same spot. If not set, every series shows its tooltip. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#tooltips
- **maxTooltipDistanceBy** (`"xy" | "x" | "y"`) — default `"xy"` _(code fallback)_ — How `maxTooltipDistance` measures distance: `"xy"` by straight distance, `"x"` or `"y"` along one direction only. _Since 5.2.6._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#tooltips
- **arrangeTooltips** (`boolean`) — default `true` _(theme)_ — Moves the series tooltips shown by the cursor apart vertically so they don't overlap. Works only with a `cursor`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/#tooltips
- **pinchZoomX** (`boolean`) — default `false` _(theme)_ — Zooms the chart horizontally with a pinch gesture on the plot area. Not supported in a `RadarChart`. _Since 5.1.8._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Pinch_zoom
- **pinchZoomY** (`boolean`) — default `false` _(theme)_ — Zooms the chart vertically with a pinch gesture on the plot area. Not supported in a `RadarChart`. _Since 5.1.8._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Pinch_zoom
- **wheelZoomPositionX** (`number`) — Position (0-1) to zoom the X axes around with the wheel, instead of the pointer's position: `0` keeps the start of the visible range in place, `1` the end. _Since 5.2.11._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Mouse_wheel_behavior
- **wheelZoomPositionY** (`number`) — Position (0-1) to zoom the Y axes around with the wheel, instead of the pointer's position: `0` keeps the start of the visible range in place, `1` the end. _Since 5.2.11._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Mouse_wheel_behavior

## Inherited settings with a different default on XYChart

- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — _from ISerialChartSettings_ — The `ColorSet` series take their colors from. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **paddingBottom** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISerialChartSettings")`) for types, defaults and descriptions.

- _ISerialChartSettings_: patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
