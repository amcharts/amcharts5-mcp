---
title: "IZoomableContainerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/izoomablecontainersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.ZoomableContainer` (see its page for the class)
TypeScript: `am5.IZoomableContainerSettings` (`import type { IZoomableContainerSettings } from "@amcharts/amcharts5"`)

## Settings

- **maxZoomLevel** (`number`) — default `32` _(theme)_ — Highest zoom level, as the scale of the contents.
- **minZoomLevel** (`number`) — default `1` _(theme)_ — Lowest zoom level, as the scale of the contents.
- **zoomStep** (`number`) — default `2` _(theme)_ — Factor each zoom in or out (a button or a wheel step) multiplies or divides the zoom level by.
- **pinchZoom** (`boolean`) — default `true` _(theme)_ — Enables zooming with a two-finger pinch on touch devices.
- **animationDuration** (`number`) — default `600` _(theme)_ — Duration of zoom animations in milliseconds.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing function of zoom animations.
- **maxPanOut** (`number`) — default `0.4` _(theme)_ — How far the zoomed-in contents can be panned out of view, as a fraction of their width and height.

## Inherited settings with a different default on ZoomableContainer

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **wheelable** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Makes the element receive mouse wheel events. While the pointer is over it, the wheel no longer scrolls the page.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
