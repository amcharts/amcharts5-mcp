---
title: "IGraphicsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igraphicssettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISpriteSettings
All ancestors: ISpriteSettings, IEntitySettings
Settings of: `am5.Graphics` (see its page for the class)
TypeScript: `am5.IGraphicsSettings` (`import type { IGraphicsSettings } from "@amcharts/amcharts5"`)

## Settings

- **fill** (`Color`) — Fill color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **stroke** (`Color`) — Stroke (border or line) color. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/
- **fillPattern** (`Pattern`) — Fill pattern. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/
- **strokePattern** (`Pattern`) — Stroke (border or line) pattern. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/
- **fillGradient** (`Gradient`) — Fill gradient. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **strokeGradient** (`Gradient`) — Stroke (border or line) gradient. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **strokeDasharray** (`number | number[]`) — Dash pattern of the stroke (border or line): lengths in pixels of dashes and gaps, e.g. `[4, 2]`. A single number makes dashes and gaps of that length. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Dashed_lines
- **strokeDashoffset** (`number`) — Stroke (border or line) dash offset. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Dashed_lines
- **fillOpacity** (`number`) — Opacity of the fill, from `0` (transparent) to `1` (opaque).
- **strokeOpacity** (`number`) — Opacity of the stroke (border or line), from `0` (transparent) to `1` (opaque).
- **strokeWidth** (`number`) — default `1` _(theme)_ — Width of the stroke (border or line) in pixels.
- **nonScalingStroke** (`boolean`) — default `false` — Keeps the stroke width the same when the element's `scale` changes. A parent's scale still affects it.
- **draw** (`(display: IGraphics, graphics: Graphics) => void`) — Drawing function. Must use renderer (`display` parameter) methods to draw. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/graphics/#Custom_draw_functions
- **blendMode** (`BlendMode`) — default `BlendMode.NORMAL ("source-over")` — _(internal)_ Rendering mode. Docs: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
- **svgPath** (`string`) — SVG path data (as in the `d` attribute of a `<path>`) to draw the shape from. Docs: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- **shadowColor** (`Color`) — Color of the element's shadow. It shows only when `shadowBlur`, `shadowOffsetX` or `shadowOffsetY` is set too. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowBlur** (`number`) — Blurriness of the shadow: the bigger the number, the blurrier the shadow. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetX** (`number`) — Horizontal shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetY** (`number`) — Vertical shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOpacity** (`number`) — Opacity of the shadow, from `0` to `1`. If not set, the shadow takes the opacity of the element's fill. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **lineJoin** (`"miter" | "round" | "bevel"`) — default `"miter"` — Shape of the joints of a multi-point line. _Since 5.2.10._ Docs: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
- **lineCap** (`"round" | "butt" | "square"`) — default `"butt"` — Shape of the end points of lines. _Since 5.10.8._ Docs: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteSettings")`) for types, defaults and descriptions.

- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
