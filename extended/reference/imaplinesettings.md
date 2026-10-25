---
title: "IMapLineSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/imaplinesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapLine` (see its page for the class)
TypeScript: `am5map.IMapLineSettings` (`import type { IMapLineSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **geometry** (`LineString | MultiLineString`) — The line's path, as GeoJSON geometry. A third value in a point's coordinates is its height in metres, used once `altitude` is set.
- **precision** (`number`) — default `0.5` _(theme)_ — How far, in pixels, the drawn line may stray from the curve the projection bends it into (d3-geo's resampling precision). Smaller is more accurate but slower.
- **altitude** (`number`) — default `0` _(code fallback)_ — Raises the line above the surface so it arcs like a trajectory: each leg, from one point to the next, rises this many metres in its middle. `400000` is about the height of the International Space Station. Once it is set (`0` included), every point of the line sits at its own height: the third value of its coordinates, or the `altitude` of the map point it connects, in metres too. Between points the height changes evenly, and this arc is added on top, so `0` follows the heights alone. A negative height goes below the surface: inside a globe, hidden where the globe covers it. Without `altitude`, the line stays on the surface. On flat maps height goes up the screen. Does not apply to `lineType: "straight"`. _Since 5.21.0._

## Inherited settings with a different default on MapLine

- **role** (`Role`) — default `"figure"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://docs.amcharts.com/v5/concepts/accessibility/#roles
- **stroke** (`Color`) — default `root.interfaceColors.get("grid")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
