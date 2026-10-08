---
title: "ISankeyNodesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isankeynodessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowNodesSettings
All ancestors: IFlowNodesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.SankeyNodes` (see its page for the class)
TypeScript: `am5flow.ISankeyNodesSettings` (`import type { ISankeyNodesSettings } from "@amcharts/amcharts5/flow"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on SankeyNodes

- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sumOutgoing.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowNodesSettings")`) for types, defaults and descriptions.

- _IFlowNodesSettings_: animationDuration, animationEasing, colors, disabledField, fillField, nameField, patterns, unknownField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
