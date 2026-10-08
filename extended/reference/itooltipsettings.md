---
title: "ITooltipSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itooltipsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Tooltip` (see its page for the class)
TypeScript: `am5.ITooltipSettings` (`import type { ITooltipSettings } from "@amcharts/amcharts5"`)

## Settings

- **labelText** (`string`) — Text of the tooltip's label. It can hold data placeholders, such as `{valueY}`.
- **labelHTML** (`string`) — HTML content of the tooltip's label, shown in place of `labelText`. _Since 5.2.11._
- **labelAriaLabel** (`string`) — A screen reader content for the label. Used in conjuction with `readerAnnounce`. If it is set to `true`, and `labelAriaLabel` is set, its contents will be read out by a screen reader when tooltip is shown or its data item changes. Otherwise, regular `labelText` (or `text` set directly on tooltip label) will be used for screen reader announcement. _Since 5.9.2._
- **pointerOrientation** (`"left" | "right" | "horizontal" | "vertical" | "up" | "down"`) — default `"vertical"` _(theme)_ — Which way the tooltip's pointer points: `"down"` puts the tooltip above the point, `"up"` below it, `"left"` to its right and `"right"` to its left. `"vertical"` and `"horizontal"` pick the side that has room. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Orientation
- **getFillFromSprite** (`boolean`) — default `true` _(theme)_ — Gives the background the `fill` of the `tooltipTarget` (its `stroke`, if it has no fill). Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Colors
- **getFillGradientFromSprite** (`boolean`) — default `false` — Gives the background the `fillGradient` of the `tooltipTarget`. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Colors
- **getLabelFillFromSprite** (`boolean`) — default `false` — Gives the label text the `fill` of the `tooltipTarget` (its `stroke`, if it has no fill). Needs `autoTextColor: false`, which otherwise overrides it. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Colors
- **getStrokeFromSprite** (`boolean`) — default `false` _(theme)_ — Gives the background's stroke the `fill` of the `tooltipTarget` (its `stroke`, if it has no fill). Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Colors
- **bounds** (`IBounds`) — Area to keep the tooltip within, in pixels relative to the root. If not set, the whole chart area.
- **autoTextColor** (`boolean`) — default `true` _(theme)_ — Picks a light or dark text color, whichever reads better on the background.
- **pointTo** (`IPoint`) — The point the tooltip points to, relative to the root.
- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration in milliseconds of the tooltip's move to a new position, e.g. from one target to another.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing function of the tooltip's moves. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **tooltipTarget** (`Sprite`) — The element the tooltip is shown for.
- **keepTargetHover** (`boolean`) — Keeps the target element hovered while the pointer is over the tooltip itself. _Since 5.2.14._
- **readerAnnounce** (`boolean`) — default `false` — If set to `true` the tooltip contents will be read out by a screen reader when displayed or changed. _Since 5.9.2._

## Inherited settings with a different default on Tooltip

- **centerX** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `x` position, and that it rotates and scales around: pixels from its left edge, or a percent of its width.
- **centerY** (`number | Percent`) — default `am5.p50` _(theme)_ — _from ISpriteSettings_ — The point of the element that is placed at its `y` position, and that it rotates and scales around: pixels from its top edge, or a percent of its height.
- **exportable** (`boolean`) — default `false` _(theme)_ — _from ISpriteSettings_ — If `false`, the element is left out of exported images of the chart.
- **marginBottom** (`number`) — default `5` _(theme)_ — _from ISpriteSettings_ — Bottom margin in pixels.
- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `9` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **position** (`"absolute" | "relative"`) — default `"absolute"` _(theme)_ — _from ISpriteSettings_ — Positioning of the element. `"absolute"` leaves the element out of its parent's layout and size: it is placed by its `x` and `y` only.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
