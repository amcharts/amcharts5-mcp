---
title: "IFlowNodesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflownodessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.FlowNodes` (see its page for the class)
TypeScript: `am5flow.IFlowNodesSettings` (`import type { IFlowNodesSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **unknownField** (`string`) — default `"unknown"` — Field in data that marks a node as "unknown" (`true`): a hidden placeholder that its links fade out toward.
- **nameField** (`string`) — default `"id"` — Field in data that holds the node's name.
- **disabledField** (`string`) — Field in data that, when `true`, makes the node start toggled off, with its links hidden. _Since 5.4.2._
- **fillField** (`string`) — default `"fill"` — Field in data that holds the node's color.
- **colors** (`ColorSet`) — default `ColorSet.new(root, {})` _(theme)_ — `ColorSet` that gives each node its color, unless the data sets one.
- **patterns** (`PatternSet`) — A `PatternSet` that series will use to apply to its nodes. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Pattern_sets
- **animationDuration** (`number`) — Animation duration in ms.
- **animationEasing** (`(t: Time) => Time`) — Easing function to use for node animations.

## Inherited settings with a different default on FlowNodes

- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sumOutgoing.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
