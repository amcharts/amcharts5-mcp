---
title: "IColorPickerButtonSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolorpickerbuttonsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5plugins_colorPicker.ColorPickerButton` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **color** (`Color`)
- **backgroundColor** (`Color`) — default `am5.color(0xffffff)` _(code fallback)_
- **colorOpacity** (`number`) — default `1` _(theme)_
- **disableOpacity** (`boolean`)

## Inherited settings with a different default on ColorPickerButton

- **cursorOverStyle** (`string`) — default `"pointer"` _(theme)_ — _from ISpriteSettings_ — CSS cursor to show while the pointer is over the element, e.g. `"pointer"`. Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
- **height** (`number | Percent`) — default `35` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **marginRight** (`number`) — default `0` _(theme)_ — _from ISpriteSettings_ — Right margin in pixels.
- **width** (`number | Percent`) — default `35` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
