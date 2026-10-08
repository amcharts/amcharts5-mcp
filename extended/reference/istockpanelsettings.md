---
title: "IStockPanelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockpanelsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYChartSettings
All ancestors: IXYChartSettings, ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.StockPanel` (see its page for the class)
TypeScript: `am5stock.IStockPanelSettings` (`import type { IStockPanelSettings } from "@amcharts/amcharts5/stock"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on StockPanel

- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — _from ISerialChartSettings_ — The `ColorSet` series take their colors from. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **minHeight** (`number`) — default `1` _(theme)_ — _from ISpriteSettings_ — Minimum allowed height in pixels.
- **paddingBottom** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **panX** (`boolean`) — default `true` _(theme)_ — _from IXYChartSettings_ — Lets the user pan the chart horizontally by dragging the plot area. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Panning
- **panY** (`boolean`) — default `true` _(theme)_ — _from IXYChartSettings_ — Lets the user pan the chart vertically by dragging the plot area. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Panning
- **wheelY** (`"none" | "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY"`) — default `"zoomX"` _(theme)_ — _from IXYChartSettings_ — What scrolling the wheel vertically over the plot area does: zoom or pan along X, Y or both. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Mouse_wheel_behavior
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYChartSettings")`) for types, defaults and descriptions.

- _IXYChartSettings_: arrangeTooltips, cursor, maxTooltipDistance, maxTooltipDistanceBy, pinchZoomX, pinchZoomY, scrollbarX, scrollbarY, strokeDasharrays, strokeWidths, wheelStep, wheelX, wheelZoomPositionX, wheelZoomPositionY
- _ISerialChartSettings_: patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
