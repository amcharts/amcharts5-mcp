---
title: "ICandlestickSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icandlesticksettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IRoundedRectangleSettings
All ancestors: IRoundedRectangleSettings, IRectangleSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.Candlestick` (see its page for the class)
TypeScript: `am5xy.ICandlestickSettings` (`import type { ICandlestickSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **lowX0** (`number`) — X where the low wick starts, at the body, in pixels relative to the candle. Set by the series.
- **lowY0** (`number`) — Y where the low wick starts, at the body, in pixels relative to the candle. Set by the series.
- **lowX1** (`number`) — X where the low wick ends, at the low value, in pixels relative to the candle. Set by the series.
- **lowY1** (`number`) — Y where the low wick ends, at the low value, in pixels relative to the candle. Set by the series.
- **highX0** (`number`) — X where the high wick starts, at the body, in pixels relative to the candle. Set by the series.
- **highY0** (`number`) — Y where the high wick starts, at the body, in pixels relative to the candle. Set by the series.
- **highX1** (`number`) — X where the high wick ends, at the high value, in pixels relative to the candle. Set by the series.
- **highY1** (`number`) — Y where the high wick ends, at the high value, in pixels relative to the candle. Set by the series.
- **orientation** (`"horizontal" | "vertical"`) — Which way the candle runs: `"vertical"` when the values are on the Y axis, `"horizontal"` when they are on the X axis. Set by the series.

## Inherited settings with a different default on Candlestick

- **cornerRadiusBL** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the bottom-left corner in pixels.
- **cornerRadiusBR** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the bottom-right corner in pixels.
- **cornerRadiusTL** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the top-left corner in pixels.
- **cornerRadiusTR** (`number`) — default `0` _(theme)_ — _from IRoundedRectangleSettings_ — Radius of the top-right corner in pixels.
- **fillOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the fill, from `0` (transparent) to `1` (opaque).
- **height** (`number | Percent`) — default `am5.percent(50)` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **isMeasured** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **role** (`Role`) — default `"figure"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Roles
- **strokeOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).
- **width** (`number | Percent`) — default `am5.percent(50)` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IRectangleSettings")`) for types, defaults and descriptions.

- _IRectangleSettings_: containStroke
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
