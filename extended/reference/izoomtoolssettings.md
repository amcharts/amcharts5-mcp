---
title: "IZoomToolsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/izoomtoolssettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.ZoomTools` (see its page for the class)
TypeScript: `am5.IZoomToolsSettings` (`import type { IZoomToolsSettings } from "@amcharts/amcharts5"`)

## Settings

- **target** (`IZoomable`) — The element the buttons zoom, such as a `ZoomableContainer`: anything with `zoomIn()`, `zoomOut()` and `goHome()` methods.

## Inherited settings with a different default on ZoomTools

- **centerX** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **paddingBottom** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **x** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — X position in the parent: pixels from its left edge, or a `Percent` of its inner width, measured from inside its left padding.
- **y** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Y position in the parent: pixels from its top edge, or a `Percent` of its inner height, measured from inside its top padding.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingLeft, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
