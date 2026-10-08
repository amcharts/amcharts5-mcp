---
title: "IHeatLegendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iheatlegendsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.HeatLegend` (see its page for the class)
TypeScript: `am5.IHeatLegendSettings` (`import type { IHeatLegendSettings } from "@amcharts/amcharts5"`)

## Settings

- **startColor** (`Color`) — Color at the start of the scale (the lowest value).
- **endColor** (`Color`) — Color at the end of the scale (the highest value).
- **startOpacity** (`number`) — default `1` — Opacity at the start of the scale (the lowest value). _Since 5.14.0._
- **endOpacity** (`number`) — default `1` — Opacity at the end of the scale (the highest value). _Since 5.14.0._
- **startValue** (`number`) — default `0` _(code fallback)_ — The lowest value, at the start of the scale.
- **endValue** (`number`) — default `1` _(code fallback)_ — The highest value, at the end of the scale.
- **startText** (`string`) — Text of the start label. If not set, it shows `startValue`.
- **endText** (`string`) — Text of the end label. If not set, it shows `endValue`.
- **stepCount** (`number`) — default `1` _(theme)_ — Number of color steps. At `1` the scale is a smooth gradient. Docs: https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/#Gradient_or_steps
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the scale: `"horizontal"` runs from start on the left to end on the right, `"vertical"` from start at the bottom to end at the top. Docs: https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/#Orientation

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
