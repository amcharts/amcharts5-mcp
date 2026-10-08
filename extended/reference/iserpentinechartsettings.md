---
title: "ISerpentineChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iserpentinechartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ICurveChartSettings
All ancestors: ICurveChartSettings, IXYChartSettings, ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5timeline.SerpentineChart` (see its page for the class)
TypeScript: `am5timeline.ISerpentineChartSettings` (`import type { ISerpentineChartSettings } from "@amcharts/amcharts5/timeline"`)

## Settings

- **orientation** (`"horizontal" | "vertical"`) — default `"vertical"` _(theme)_ — Which way the serpentine winds: `"vertical"` stacks horizontal runs from top to bottom, `"horizontal"` places vertical runs from left to right.
- **levelCount** (`number`) — default `3` _(theme)_ — Number of runs, joined by half-circle turns.
- **yAxisRadius** (`Percent`) — default `50%` — Length of the Y axis, as a percent of the distance between neighboring runs.
- **startLocation** (`number`) — default `0` _(theme)_ — How far into the first run the line starts: `0` uses the whole run, `1` none of it.
- **endLocation** (`number`) — default `1` _(theme)_ — How far along the last run the line goes: `0` none of it, `1` the whole run.

## Inherited settings with a different default on SerpentineChart

- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — _from ISerialChartSettings_ — The `ColorSet` series take their colors from. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **paddingBottom** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `16` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ICurveChartSettings")`) for types, defaults and descriptions.

- _ICurveChartSettings_: cursor
- _IXYChartSettings_: arrangeTooltips, maxTooltipDistance, maxTooltipDistanceBy, panX, panY, pinchZoomX, pinchZoomY, scrollbarX, scrollbarY, strokeDasharrays, strokeWidths, wheelStep, wheelX, wheelY, wheelZoomPositionX, wheelZoomPositionY
- _ISerialChartSettings_: patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
