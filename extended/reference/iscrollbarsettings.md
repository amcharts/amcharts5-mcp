---
title: "IScrollbarSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iscrollbarsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Scrollbar` (see its page for the class)
TypeScript: `am5.IScrollbarSettings` (`import type { IScrollbarSettings } from "@amcharts/amcharts5"`)

## Settings

- **orientation** (`"horizontal" | "vertical"`) — Orientation of the scrollbar.
- **start** (`number`) — default `0` _(theme)_ — Start of the selected range, from `0` to `1`: `0` is the left end, or the top on a vertical scrollbar.
- **end** (`number`) — default `1` _(theme)_ — End of the selected range, from `0` to `1`: `1` is the right end, or the bottom on a vertical scrollbar.
- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration in milliseconds of scroll animations, such as after a click on the scrollbar's background.
- **animationEasing** (`(t: Time) => Time`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing function of scroll animations. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Easing_functions
- **opposite** (`boolean`) — default `false` — Puts the scrollbar on the opposite side of the chart: a horizontal scrollbar below the plot area instead of above it, a vertical one on the left instead of the right. It can be changed at any time. Works only for scrollbars set as a chart's `scrollbarX` or `scrollbarY`. _Since 5.20.2._
- **outsideAxes** (`boolean`) — Where the scrollbar sits relative to the axes on its side: `true` beyond them (outermost), `false` between them and the plot area. If not set, the chart decides. It can be changed at any time. Like `opposite`, works only for scrollbars set as a chart's `scrollbarX` or `scrollbarY`. _Since 5.21.0._

## Inherited settings with a different default on Scrollbar

- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
