---
title: "IProgressPieSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iprogresspiesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.ProgressPie` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **value** (`number`) — default `0` _(code fallback)_ — Progress from `0` to `1`.
- **radius** (`number | Percent`) — default `am5.p100` _(theme)_ — Outer radius in pixels, or as a percent of half the smaller of the pie's width and height.
- **innerRadius** (`number | Percent`) — default `am5.percent(85)` _(theme)_ — Inner radius in pixels, or as a percent of `radius`.
- **numberFormat** (`string`) — default `"#."` _(theme)_ — Number format for the label, which shows `value` times 100.

## Inherited settings with a different default on ProgressPie

- **centerX** (`number | Percent`) — default `am5.percent(-50)` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.percent(-50)` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **height** (`number | Percent`) — default `50` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **width** (`number | Percent`) — default `50` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
