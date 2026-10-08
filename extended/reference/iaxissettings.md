---
title: "IAxisSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxissettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentSettings
All ancestors: IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.Axis` (see its page for the class)
TypeScript: `am5xy.IAxisSettings` (`import type { IAxisSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **renderer** (`R`) — The renderer that draws the axis line, labels, ticks, grid and fills: `AxisRendererX` for a horizontal axis, `AxisRendererY` for a vertical one. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/#Axis_renderer
- **start** (`number`) — default `0` _(theme)_ — Start of the visible (zoomed) part of the axis: `0` is the start of the axis, `1` the end. Set it to pre-zoom: `0.1` hides the first 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Pre_zooming_axes
- **end** (`number`) — default `1` _(theme)_ — End of the visible (zoomed) part of the axis: `0` is the start of the axis, `1` the end. Set it to pre-zoom: `0.9` hides the last 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Pre_zooming_axes
- **maxZoomFactor** (`number`) — default `1000` _(theme)_ — Roughly how many times the axis can be zoomed in. A `CategoryAxis` ignores it and zooms in as far as `minZoomCount` categories; a `DateAxis` set to `null` (its default) zooms in as far as `minZoomCount` base intervals.
- **maxZoomCount** (`number`) — default `Infinity` _(theme)_ — Most cells to show at a time, such as categories on a `CategoryAxis` or `baseInterval` periods on a `DateAxis`. The axis can't be zoomed out any further. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Limiting_zoom_scope
- **minZoomCount** (`number`) — default `1` _(theme)_ — Fewest cells to show at a time, such as categories on a `CategoryAxis` or `baseInterval` periods on a `DateAxis`. The axis can't be zoomed in any further. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Limiting_zoom_scope
- **baseValue** (`number`) — Base value of the axis.
- **panX** (`boolean`) — default `true` _(theme)_ — `false` keeps this axis in place when the chart is panned horizontally, by dragging or with the mouse wheel. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Excluding_axes_from_pan_or_zoom
- **panY** (`boolean`) — default `true` _(theme)_ — `false` keeps this axis in place when the chart is panned vertically, by dragging or with the mouse wheel. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Excluding_axes_from_pan_or_zoom
- **zoomX** (`boolean`) — default `true` _(theme)_ — `false` keeps this axis as it is when the mouse wheel zooms the chart horizontally. The cursor, scrollbars and pinch still zoom it; use `zoomable` to stop those too. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Excluding_axes_from_pan_or_zoom
- **zoomY** (`boolean`) — default `true` _(theme)_ — `false` keeps this axis as it is when the mouse wheel zooms the chart vertically. The cursor, scrollbars and pinch still zoom it; use `zoomable` to stop those too. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Excluding_axes_from_pan_or_zoom
- **zoomable** (`boolean`) — default `true` _(code fallback)_ — `false` makes `zoom()` do nothing, so the cursor, scrollbars, pinch and mouse wheel can't zoom or scroll the axis. Dragging the plot area still pans it.
- **maxDeviation** (`number`) — default `0.1` _(theme)_ — How far past its ends the axis can be zoomed or panned, as a share of the visible range: `0.1` is 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Over_zooming
- **tooltip** (`Tooltip`) — Tooltip that shows the axis value at the cursor's position.
- **tooltipLocation** (`number`) — default `0.5` _(theme)_ — Where within a cell the tooltip snaps to when `snapTooltip` is on: `0` the cell's start, `0.5` its middle, `1` its end.
- **snapTooltip** (`boolean`) — default `true` _(theme)_ — Snaps the tooltip to `tooltipLocation` in the cell under the cursor, instead of following the cursor exactly.
- **fixAxisSize** (`boolean`) — default `true` _(theme)_ — Keeps the axis from shrinking as zooming changes the visible labels: it keeps room for the widest label shown so far.
- **bullet** (`(root: Root, axis: Axis<AxisRenderer>, dataItem: DataItem<IAxisDataItem>) => AxisBullet`) — Function that creates an `AxisBullet` for each of the axis's cells, such as each category. Axis ranges get none. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Axis_bullets
- **minorAxisFillsEnabled** (`boolean`) — Creates axis fills for the cells of the minor grid too, not only the main one. The `fillRule` still decides which of them show. _Since 5.14.0._
- **zoomOut** (`boolean`) — default `true` _(theme)_ — `false` leaves the axis out of the chart's zoom-out: the zoom-out button doesn't reset it, and zooming it doesn't show the button. _Since 5.14.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentSettings")`) for types, defaults and descriptions.

- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
