---
title: "IRadialLabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iradiallabelsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILabelSettings
All ancestors: ILabelSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.RadialLabel` (see its page for the class)
TypeScript: `am5.IRadialLabelSettings` (`import type { IRadialLabelSettings } from "@amcharts/amcharts5"`)

## Settings

- **radius** (`number`) — default `0` _(theme)_ — Distance in pixels from `baseRadius`: outward, or inward when `inside` is `true`. A negative value goes the other way.
- **baseRadius** (`number | Percent`) — default `am5.p100` _(theme)_ — Where the label sits across the arc it belongs to, such as a slice: a percent, `0%` being the inner edge and `100%` the outer one, or pixels from the inner edge.
- **labelAngle** (`number`) — default `0` _(code fallback)_ — Angle in degrees of the label's position around the center: `0` points right, and angles grow clockwise. Usually set by the series.
- **orientation** (`"inward" | "outward" | "auto"`) — default `"auto"` _(theme)_ — Which way the text faces with `textType` `"circular"`: `"inward"`, `"outward"`, or `"auto"` to pick whichever reads better at its angle. With `"radial"`, `"auto"` turns text on the left half so that it does not read upside down.
- **inside** (`boolean`) — default `false` _(theme)_ — Places the label inside the arc instead of outside: `radius` then counts inward.
- **textType** (`"regular" | "circular" | "radial" | "aligned" | "adjusted"`) — default `"regular"` _(theme)_ — How the label is placed: • `"regular"` - horizontal, at its position on the arc. • `"circular"` - curved along the arc. • `"radial"` - rotated to run along the radius. • `"aligned"` - horizontal, lined up in columns with the other labels. • `"adjusted"` - horizontal, moved outward so that its edge, not its center, is at its position. **IMPORTANT!** In a `PieSeries`, `alignLabels` (`true` by default) overrides `textType`. To use a type other than `"aligned"`, also set `alignLabels: false` on the series.
- **kerning** (`number`) — default `0` — Extra spacing between characters in pixels, for `"circular"` text.

## Inherited settings with a different default on RadialLabel

- **centerX** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **textAlign** (`"start" | "end" | "left" | "right" | "center"`) — default `"center"` _(theme)_ — _from ILabelSettings_ — Horizontal alignment of the text's lines.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILabelSettings")`) for types, defaults and descriptions.

- _ILabelSettings_: baselineRatio, breakWords, direction, ellipsis, fill, fillGradient, fillOpacity, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, ignoreFormatting, lineHeight, maxChars, minScale, opacity, oversizedBehavior, populateText, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, text, textBaseline, textDecoration
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
