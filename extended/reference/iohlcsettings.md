---
title: "IOHLCSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iohlcsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ICandlestickSettings
All ancestors: ICandlestickSettings, IRoundedRectangleSettings, IRectangleSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.OHLC` (see its page for the class)
TypeScript: `am5xy.IOHLCSettings` (`import type { IOHLCSettings } from "@amcharts/amcharts5/xy"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on OHLC

- **cornerRadiusBL** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the bottom-left corner in pixels.
- **cornerRadiusBR** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the bottom-right corner in pixels.
- **cornerRadiusTL** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the top-left corner in pixels.
- **cornerRadiusTR** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the top-right corner in pixels.
- **fillOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the fill, from `0` (transparent) to `1` (opaque).
- **height** (`number | Percent`) — default `am5.percent(80)` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **isMeasured** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **role** (`Role`) — default `"figure"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Roles
- **strokeOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).
- **width** (`number | Percent`) — default `am5.percent(80)` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ICandlestickSettings")`) for types, defaults and descriptions.

- _ICandlestickSettings_: highX0, highX1, highY0, highY1, lowX0, lowX1, lowY0, lowY1, orientation
- _IRectangleSettings_: containStroke
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
