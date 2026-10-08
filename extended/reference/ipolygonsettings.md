---
title: "IPolygonSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipolygonsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Polygon` (see its page for the class)
TypeScript: `am5.IPolygonSettings` (`import type { IPolygonSettings } from "@amcharts/amcharts5"`)

## Settings

- **points** (`IPoint[]`) — The polygon's corners, in pixels. When they change, the polygon morphs from its old shape to the new one.
- **coordinates** (`number[][]`) — The corners as `[x, y]` pairs, in pixels. They replace `points`.
- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration in milliseconds of the morph when `points` change.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing function of the morph. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
