---
title: "IAxisTickSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisticksettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ITickSettings
All ancestors: ITickSettings, ILineSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.AxisTick` (see its page for the class)
TypeScript: `am5xy.IAxisTickSettings` (`import type { IAxisTickSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **location** (`number`) — default `0.5` _(theme)_ — Where the tick sits within its cell, from `0` (start) to `1` (end). A cell is a category, a date period, or the span of an axis range. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Location_of_axis_elements
- **multiLocation** (`number`) — default `0` _(theme)_ — Used instead of `location` when a grid step spans several units, such as 5 days, or when only every few categories get a tick. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Multi_location
- **inside** (`boolean`) — Draws the tick inside the plot area. If not set, the renderer's `inside` applies. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Labels_ticks_inside_plot_area
- **minPosition** (`number`) — default `0` — Hides the tick when it is closer to the start of the visible part of the axis than this, from `0` to `1`: `0.1` hides ticks in the first 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Start_end_labels_and_ticks
- **maxPosition** (`number`) — default `1` — Hides the tick when it is closer to the end of the visible part of the axis than this, from `0` to `1`: `0.9` hides ticks in the last 10%. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Start_end_labels_and_ticks

## Inherited settings with a different default on AxisTick

- **crisp** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Draws the element sharply, with minimal anti-aliasing: its position is rounded to whole pixels, and `strokeWidth` is adjusted to the device pixel ratio, so lines may look thinner than expected. NOTE: it may not work well on several elements that are meant to fit together exactly. _Since 5.3.0._
- **isMeasured** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **stroke** (`Color`) — default `root.interfaceColors.get("grid")` _(theme)_ — _from IGraphicsSettings_ — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **strokeOpacity** (`number`) — default `1` _(theme)_ — _from IGraphicsSettings_ — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).
- **visible** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — Whether the element is shown. Unlike `show()` and `hide()`, it does not animate.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ITickSettings")`) for types, defaults and descriptions.

- _ITickSettings_: length
- _ILineSettings_: points, segments
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, strokeDasharray, strokeDashoffset, strokeGradient, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
