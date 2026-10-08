---
title: "IGridSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igridsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.Grid` (see its page for the class)
TypeScript: `am5xy.IGridSettings` (`import type { IGridSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **location** (`number`) — default `0` _(theme)_ — Where the grid line sits within its cell, from `0` (start) to `1` (end). A cell is a category, a date period, or the span of an axis range. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Location_of_axis_elements

## Inherited settings with a different default on Grid

- **crisp** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Draws the element sharply, with minimal anti-aliasing: its position is rounded to whole pixels, and `strokeWidth` is adjusted to the device pixel ratio, so lines may look thinner than expected. NOTE: it may not work well on several elements that are meant to fit together exactly. _Since 5.3.0._
- **stroke** (`Color`) — default `root.interfaceColors.get("grid")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **strokeOpacity** (`number`) — default `0.15` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
