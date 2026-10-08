---
title: "IClockHandSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iclockhandsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5radar.ClockHand` (see its page for the class)
TypeScript: `am5radar.IClockHandSettings` (`import type { IClockHandSettings } from "@amcharts/amcharts5/radar"`)

## Settings

- **topWidth** (`number`) — default `1` _(theme)_ — Width of the hand's tip in pixels.
- **bottomWidth** (`number`) — default `10` _(theme)_ — Width of the hand's base in pixels.
- **radius** (`number | Percent`) — default `am5.percent(90)` _(theme)_ — Distance from the center to the hand's tip, in pixels or as a percent of the chart's radius. A negative value is measured in from the chart's radius.
- **innerRadius** (`number | Percent`) — default `0` — Distance from the center to the hand's base, in pixels or as a percent of the chart's radius. A negative number of pixels is measured back from the tip.
- **pinRadius** (`number | Percent`) — default `10` _(theme)_ — Radius of the pin, the circle at the center, in pixels or as a percent of the chart's radius.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
