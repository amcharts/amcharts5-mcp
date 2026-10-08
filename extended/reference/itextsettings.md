---
title: "ITextSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itextsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISpriteSettings
All ancestors: ISpriteSettings, IEntitySettings
Settings of: `am5.Text` (see its page for the class)
TypeScript: `am5.ITextSettings` (`import type { ITextSettings } from "@amcharts/amcharts5"`)

## Settings

- **text** (`string`) — default `""` _(code fallback)_
- **fill** (`Color`)
- **fillGradient** (`Gradient`) — Fill gradient. _Since 5.10.1._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **fillOpacity** (`number`) — default `1` _(code fallback)_
- **textAlign** (`"start" | "end" | "left" | "right" | "center"`)
- **fontFamily** (`string`)
- **fontSize** (`string | number`)
- **fontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`)
- **fontStyle** (`"normal" | "italic" | "oblique"`)
- **fontVariant** (`"normal" | "small-caps"`)
- **textDecoration** (`"underline" | "line-through"`)
- **shadowColor** (`Color`)
- **shadowBlur** (`number`)
- **shadowOffsetX** (`number`)
- **shadowOffsetY** (`number`)
- **shadowOpacity** (`number`)
- **lineHeight** (`number | Percent`)
- **baselineRatio** (`number`)
- **opacity** (`number`) — default `1` _(theme)_ — Opacity, from `0` (transparent) to `1` (opaque).
- **direction** (`"ltr" | "rtl"`)
- **textBaseline** (`"top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"`)
- **oversizedBehavior** (`"none" | "hide" | "fit" | "wrap" | "wrap-no-break" | "truncate"`) — default `"none"` _(code fallback)_
- **breakWords** (`boolean`) — default `false` _(code fallback)_
- **ellipsis** (`string`)
- **minScale** (`number`) — default `0` _(code fallback)_
- **populateText** (`boolean`)
- **ignoreFormatting** (`boolean`) — default `false` _(code fallback)_
- **maxChars** (`number`)

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteSettings")`) for types, defaults and descriptions.

- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
