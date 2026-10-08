---
title: "IButtonSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibuttonsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Button` (see its page for the class)
TypeScript: `am5.IButtonSettings` (`import type { IButtonSettings } from "@amcharts/amcharts5"`)

## Settings

- **label** (`Label`) — A `Label` shown on the button. A label it replaces is disposed.
- **icon** (`Graphics`) — A `Graphics` shown on the button as its icon. An icon it replaces is disposed.

## Inherited settings with a different default on Button

- **focusable** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Can element be focused, i.e. selected using TAB key. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/#Focusing_elements
- **interactive** (`boolean`) — default `true` _(theme)_ — _from ISpriteSettings_ — Makes the element respond to the pointer. Adding a pointer event listener to it turns this on.
- **interactiveChildren** (`boolean`) — default `false` _(theme)_ — _from IContainerSettings_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **layout** (`Layout`) — default `root.horizontalLayout` _(theme)_ — _from IContainerSettings_ — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout
- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **setStateOnChildren** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Applies every state set on the container to its children too. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#States

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, mask, maskContent, reverseChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
