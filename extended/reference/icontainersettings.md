---
title: "IContainerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icontainersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISpriteSettings
All ancestors: ISpriteSettings, IEntitySettings
Settings of: `am5.Container` (see its page for the class)
TypeScript: `am5.IContainerSettings` (`import type { IContainerSettings } from "@amcharts/amcharts5"`)

## Settings

- **paddingLeft** (`number`) — default `0` _(code fallback)_ — Left padding in pixels.
- **paddingRight** (`number`) — default `0` _(code fallback)_ — Right padding in pixels.
- **paddingTop** (`number`) — default `0` _(code fallback)_ — Top padding in pixels.
- **paddingBottom** (`number`) — default `0` _(code fallback)_ — Bottom padding in pixels.
- **background** (`Graphics`) — Element drawn behind the container's content, sized to fill the container. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Background
- **layout** (`Layout`) — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout
- **mask** (`Graphics`) — An element whose shape clips the container's children. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Masks
- **maskContent** (`boolean`) — Clips all content that goes outside the container's bounds.
- **interactiveChildren** (`boolean`) — default `true` _(theme)_ — Makes every descendant, not just direct children, interactive when the container itself is interactive.
- **setStateOnChildren** (`boolean`) — default `false` _(theme)_ — Applies every state set on the container to its children too. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#States
- **verticalScrollbar** (`Scrollbar`) — A `Scrollbar` that scrolls the content vertically when it does not fit in the container. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Scrollbar
- **reverseChildren** (`boolean`) — Lays out the children in reverse order. _Since 5.1.1._
- **html** (`string`) — default `""` _(code fallback)_ — HTML content of the container. It can hold data placeholders, such as `{category}`. _Since 5.2.11._ Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/html-content/

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteSettings")`) for types, defaults and descriptions.

- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
