---
title: "IAxisRendererSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.AxisRenderer` (see its page for the class)
TypeScript: `am5xy.IAxisRendererSettings` (`import type { IAxisRendererSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **minGridDistance** (`number`) — The smallest distance between grid lines, in pixels. The axis spaces its grid, and so its labels, at least this far apart. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Grid_density
- **minorGridEnabled** (`boolean`) — default `false` — Draws a fainter minor grid between the main grid lines. On a `CategoryAxis`, it marks the categories that `minGridDistance` left without grid, so avoid it there with many categories. _Since 5.6.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Minor_grid
- **minorLabelsEnabled** (`boolean`) — default `false` — Shows labels on the minor grid too. Turns the minor grid on, unless `minorGridEnabled` is set to `false`. _Since 5.6.0._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Enabling_minor_grid_labels
- **inversed** (`boolean`) — default `false` — Reverses the axis: it runs right to left on X, and top to bottom on Y. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Inversed_axes
- **cellStartLocation** (`number`) — default `0` — Where columns start within each cell, from `0` (the cell's start) to `1` (its end). With `cellEndLocation`, sets how wide columns are and the gap between them. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Cell_start_end_locations
- **cellEndLocation** (`number`) — default `1` — Where columns end within each cell, from `0` (the cell's start) to `1` (its end). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Cell_start_end_locations
- **pan** (`"none" | "zoom"`) — default `"none"` — `"zoom"` lets the user zoom the axis by dragging along its labels. Works best with the axis's `maxDeviation` at about `1`. Only `AxisRendererX` and `AxisRendererY` support it, and not with `inside` set to `true`. _Since 5.0.7._
- **panSensitivity** (`number`) — default `1` — How much dragging along the labels zooms the axis when `pan` is `"zoom"`: higher zooms more.

## Inherited settings with a different default on AxisRenderer

- **crisp** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Draws the element sharply, with minimal anti-aliasing: its position is rounded to whole pixels, and `strokeWidth` is adjusted to the device pixel ratio, so lines may look thinner than expected. NOTE: it may not work well on several elements that are meant to fit together exactly. _Since 5.3.0._
- **stroke** (`Color`) — default `root.interfaceColors.get("grid")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **strokeOpacity** (`number`) — default `0` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
