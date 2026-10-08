---
title: "IEditableLabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ieditablelabelsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILabelSettings
All ancestors: ILabelSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.EditableLabel` (see its page for the class)
TypeScript: `am5.IEditableLabelSettings` (`import type { IEditableLabelSettings } from "@amcharts/amcharts5"`)

## Settings

- **editOn** (`"click" | "rightclick" | "middleclick" | "dblclick" | "none"`) — default `"click"` _(theme)_ — Which click starts editing: `"click"`, `"dblclick"`, `"rightclick"` or `"middleclick"`. With `"none"`, only setting `active` to `true` does.
- **multiLine** (`boolean`) — default `true` _(theme)_ — Allows line breaks in the text. With `false`, ENTER finishes editing. _Since 5.9.6._

## Inherited settings with a different default on EditableLabel

- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **themeTags** (`string[]`) — default `["editablelabel"]` _(theme)_ — _from IEntitySettings_ — Tags that theme rules can target. They also count for the element's children, so a rule can match a child by a tag of its parent. Docs: https://www.amcharts.com/docs/v5/concepts/themes/

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILabelSettings")`) for types, defaults and descriptions.

- _ILabelSettings_: baselineRatio, breakWords, direction, ellipsis, fill, fillGradient, fillOpacity, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, ignoreFormatting, lineHeight, maxChars, minScale, opacity, oversizedBehavior, populateText, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, text, textAlign, textBaseline, textDecoration
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTagsSelf, userData
