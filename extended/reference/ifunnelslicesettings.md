---
title: "IFunnelSliceSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ifunnelslicesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.FunnelSlice` (see its page for the class)
TypeScript: `am5percent.IFunnelSliceSettings` (`import type { IFunnelSliceSettings } from "@amcharts/amcharts5/percent"`)

## Settings

- **topWidth** (`number`) — default `0` _(code fallback)_ — Width of the slice's top edge (its left edge when horizontal), in pixels.
- **bottomWidth** (`number`) — default `0` _(code fallback)_ — Width of the slice's bottom edge (its right edge when horizontal), in pixels.
- **orientation** (`"horizontal" | "vertical"`) — `"vertical"` for a slice of a top-to-bottom series, `"horizontal"` for one of a left-to-right series.
- **expandDistance** (`number`) — default `0` _(code fallback)_ — Curves the slice's sides outward, by a fraction of its height (its width when horizontal); a negative value curves them inward. `0` keeps them straight.
- **cornerRadiusTL** (`number`) — Radius of the top-left corner in pixels. _Since 5.11.2._
- **cornerRadiusTR** (`number`) — Radius of the top-right corner in pixels. _Since 5.11.2._
- **cornerRadiusBR** (`number`) — Radius of the bottom-right corner in pixels. _Since 5.11.2._
- **cornerRadiusBL** (`number`) — Radius of the bottom-left corner in pixels. _Since 5.11.2._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
