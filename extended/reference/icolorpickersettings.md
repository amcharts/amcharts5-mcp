---
title: "IColorPickerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolorpickersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5plugins_colorPicker.ColorPicker` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **colorButton** (`ColorPickerButton`) — The `ColorPickerButton` whose color the picker edits. Setting it opens the picker with the button's color, and changes show on the button at once; `undefined` closes the picker.
- **hue** (`number`) — default `0` _(code fallback)_ — Hue of the selected color, `0` to `1`; the hue slider sets it. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/filters/
- **color** (`Color`) — The selected color.
- **colorOpacity** (`number`) — default `1` _(code fallback)_ — Opacity of the selected color, `0` to `1`.
- **backgroundColor** (`Color`) — default `am5.color(0xffffff)` _(code fallback)_ — Color of what the picker sits on, white if not set. It outlines the color square and shows through the opacity slider's grip.

## Inherited settings with a different default on ColorPicker

- **background** (`Graphics`) — default `RoundedRectangle.new(root, { strokeOpacity: 1, fillOpacity: 1, shadowBlur: 8, shadowColor: am5.color(0x000000), shadowOpacity: 0.3, shadowOffsetX: 2, shadowOffsetY: 2, fill: am5.color(0xffffff), })` _(theme)_ — _from IContainerSettings_ — Element drawn behind the container's content, sized to fill the container. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Background
- **centerX** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **exportable** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element is left out of exported images of the chart.
- **paddingBottom** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.
- **width** (`number | Percent`) — default `250` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.
- **x** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — X position in the parent: pixels from its left edge, or a `Percent` of its inner width, measured from inside its left padding.
- **y** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — Y position in the parent: pixels from its top edge, or a `Percent` of its inner height, measured from inside its top padding.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
