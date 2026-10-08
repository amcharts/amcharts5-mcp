---
title: "IAxisLabelRadialSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxislabelradialsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IRadialLabelSettings
All ancestors: IRadialLabelSettings, ILabelSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.AxisLabelRadial` (see its page for the class)
TypeScript: `am5xy.IAxisLabelRadialSettings` (`import type { IAxisLabelRadialSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **location** (`number`) — Where the label sits within its cell, from `0` (start) to `1` (end). A cell is a category, a date period, or the span of an axis range.
- **multiLocation** (`number`) — Used instead of `location` when a grid step spans several units, such as 5 days, or when only every few categories get a label.
- **minPosition** (`number`) — default `0` — Hides the label when it is closer to the start of the visible part of the axis than this, from `0` to `1`: `0.1` hides labels in the first 10%.
- **maxPosition** (`number`) — default `1` — Hides the label when it is closer to the end of the visible part of the axis than this, from `0` to `1`: `0.9` hides labels in the last 10%.

## Inherited settings with a different default on AxisLabelRadial

- **centerX** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **textAlign** (`"start" | "end" | "left" | "right" | "center"`) — default `"center"` _(theme)_ — _from ILabelSettings_ — Horizontal alignment of the text's lines.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IRadialLabelSettings")`) for types, defaults and descriptions.

- _IRadialLabelSettings_: baseRadius, inside, kerning, labelAngle, orientation, radius, textType
- _ILabelSettings_: baselineRatio, breakWords, direction, ellipsis, fill, fillGradient, fillOpacity, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, ignoreFormatting, lineHeight, maxChars, minScale, opacity, oversizedBehavior, populateText, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, text, textBaseline, textDecoration
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
