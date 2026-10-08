---
title: "ISlicedChartSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/islicedchartsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPercentChartSettings
All ancestors: IPercentChartSettings, ISerialChartSettings, IChartSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.SlicedChart` (see its page for the class)
TypeScript: `am5percent.ISlicedChartSettings` (`import type { ISlicedChartSettings } from "@amcharts/amcharts5/percent"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on SlicedChart

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **paddingBottom** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISerialChartSettings")`) for types, defaults and descriptions.

- _ISerialChartSettings_: colors, patterns
- _IContainerSettings_: background, html, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
