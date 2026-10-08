---
title: "ISliceSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/islicesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Slice` (see its page for the class)
TypeScript: `am5.ISliceSettings` (`import type { ISliceSettings } from "@amcharts/amcharts5"`)

## Settings

- **radius** (`number`) — default `0` _(code fallback)_ — Outer radius in pixels.
- **arc** (`number`) — default `0` _(code fallback)_ — Size of the slice in degrees, clockwise from `startAngle`. A negative value runs counterclockwise.
- **innerRadius** (`number`) — default `0` _(code fallback)_ — Inner radius in pixels. A negative value is measured inwards from `radius`.
- **startAngle** (`number`) — default `0` _(code fallback)_ — Start angle in degrees: `0` points right, and angles run clockwise.
- **cornerRadius** (`number`) — Corner radius in pixels.
- **shiftRadius** (`number`) — default `0` _(theme)_ — How far in pixels the slice is pulled out from the center, along its middle angle.
- **dRadius** (`number`) — default `0` _(theme)_ — Pixels added to `radius`; can be negative.
- **dInnerRadius** (`number`) — default `0` _(theme)_ — Pixels added to `innerRadius`; can be negative.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
