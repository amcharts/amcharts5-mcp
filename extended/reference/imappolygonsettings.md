---
title: "IMapPolygonSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imappolygonsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapPolygon` (see its page for the class)
TypeScript: `am5map.IMapPolygonSettings` (`import type { IMapPolygonSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **geometry** (`MultiPolygon | Polygon`) — The polygon's shape, as GeoJSON geometry.
- **precision** (`number`) — default `0.5` _(theme)_ — How far, in pixels, the drawn edges may stray from the curves the projection bends them into (d3-geo's resampling precision). Smaller is more accurate but slower.
- **pixelHeight** (`number`) — Height of this polygon's columns in a `PixelMapSeries`, from `0` to `1` of the series' `columnHeight`. Set it with heat rules (`key: "pixelHeight"`) or `templateField`. When set, it is used instead of the height the series works out from the polygon's value. The series' `pixelHeightFunction` overrides it. _Since 5.21.0._

## Inherited settings with a different default on MapPolygon

- **fill** (`Color`) — default `root.interfaceColors.get("primaryButton")` _(theme)_ — _from IGraphicsSettings_ — Fill color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **fillOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the fill, from `0` (transparent) to `1` (opaque).
- **isMeasured** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **role** (`Role`) — default `"figure"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Roles
- **stroke** (`Color`) — default `root.interfaceColors.get("background")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **strokeOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).
- **strokeWidth** (`number`) — default `0.2` _(theme)_ — _from IGraphicsSettings_ — Width of the stroke (border or line) in pixels.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fillGradient, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
