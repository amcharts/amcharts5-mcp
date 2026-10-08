---
title: "IComponentSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icomponentsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Component` (see its page for the class)
TypeScript: `am5.IComponentSettings` (`import type { IComponentSettings } from "@amcharts/amcharts5"`)

## Settings

- **interpolationDuration** (`number`) — default `0` _(theme)_ — Duration in milliseconds of the animation from old values to new ones, e.g. when data changes. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animating_data_values
- **interpolationEasing** (`$ease.Easing`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing function of the animation from old values to new ones. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
