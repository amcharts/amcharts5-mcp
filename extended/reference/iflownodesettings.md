---
title: "IFlowNodeSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iflownodesettings/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.FlowNode` (see its page for the class)
TypeScript: `am5flow.IFlowNodeSettings` (`import type { IFlowNodeSettings } from "@amcharts/amcharts5/flow"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on FlowNode

- **cursorOverStyle** (`string`) — default `"pointer"` _(theme)_ — _from ISpriteSettings_ — CSS cursor to show while the pointer is over the element, e.g. `"pointer"`. Docs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
- **role** (`Role`) — default `"img"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://docs.amcharts.com/v5/concepts/accessibility/#roles
- **setStateOnChildren** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Applies every state set on the container to its children too. Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/
- **toggleKey** (`"none" | "disabled" | "active"`) — default `"disabled"` _(theme)_ — _from ISpriteSettings_ — Setting that a click or tap toggles between `true` and `false`: `"active"` or `"disabled"`. `"none"` turns toggling off.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, direction, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaDescription, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
