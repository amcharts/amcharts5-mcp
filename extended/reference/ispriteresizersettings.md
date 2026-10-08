---
title: "ISpriteResizerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispriteresizersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.SpriteResizer` (see its page for the class)
TypeScript: `am5.ISpriteResizerSettings` (`import type { ISpriteResizerSettings } from "@amcharts/amcharts5"`)

## Settings

- **sprite** (`Sprite`) — The element to resize and rotate. Setting it shows the resizer around the element; unsetting it hides the resizer.
- **spriteTemplate** (`Template<Sprite>`) — A `Template` that gets the new scale and rotation instead of `sprite` itself.
- **rotationStep** (`number`) — default `10` _(theme)_ — Rotation snaps to multiples of this many degrees.

## Inherited settings with a different default on SpriteResizer

- **isMeasured** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element's bounds are not measured, so it takes no part in its parent's layout or size.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
