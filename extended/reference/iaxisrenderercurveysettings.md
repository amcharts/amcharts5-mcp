---
title: "IAxisRendererCurveYSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderercurveysettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IAxisRendererSettings
All ancestors: IAxisRendererSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5timeline.AxisRendererCurveY` (see its page for the class)
TypeScript: `am5timeline.IAxisRendererCurveYSettings` (`import type { IAxisRendererCurveYSettings } from "@amcharts/amcharts5/timeline"`)

## Settings

- **axisLength** (`number`) — default `60` _(theme)_ — Length of the axis in pixels. On a `CurveChart`, it is scaled along with the X renderer's `points`. `SerpentineChart` and `SpiralChart` ignore it and work the length out from their own `yAxisRadius`.
- **xRenderer** (`AxisRendererCurveX`) — Renderer of the X axis. It is set automatically when this renderer is the X renderer's `yRenderer`.
- **axisLocation** (`number`) — default `0.5` _(theme)_ — Where on this axis the X axis line runs: `0` at its start, `1` at its end. At `0.5`, the axis reaches out equally to both sides of the line.
- **rotateLabels** (`boolean`) — default `false` _(theme)_ — Rotates the labels to the direction of the X axis line at its start, where this axis's labels are.

## Inherited settings with a different default on AxisRendererCurveY

- **crisp** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Draws the element sharply, with minimal anti-aliasing: its position is rounded to whole pixels, and `strokeWidth` is adjusted to the device pixel ratio, so lines may look thinner than expected. NOTE: it may not work well on several elements that are meant to fit together exactly. _Since 5.3.0._
- **minGridDistance** (`number`) — default `20` _(theme)_ — _from IAxisRendererSettings_ — The smallest distance between grid lines, in pixels. The axis spaces its grid, and so its labels, at least this far apart. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Grid_density
- **stroke** (`Color`) — default `root.interfaceColors.get("grid")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **strokeOpacity** (`number`) — default `0` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IAxisRendererSettings")`) for types, defaults and descriptions.

- _IAxisRendererSettings_: cellEndLocation, cellStartLocation, inversed, minorGridEnabled, minorLabelsEnabled, pan, panSensitivity
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
