---
title: "IChordSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichordsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowSettings
All ancestors: IFlowSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.Chord` (see its page for the class)
TypeScript: `am5flow.IChordSettings` (`import type { IChordSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **padAngle** (`number`) — default `1` _(theme)_ — Gap between adjacent nodes, in degrees.
- **radius** (`number | Percent`) — default `am5.percent(90)` _(theme)_ — Outer radius of the node ring, in pixels or percent. A percent is of half the smaller side of the series' area, so `100%` fills it.
- **nodeWidth** (`number`) — default `10` _(theme)_ — Thickness of the node ring, in pixels, measured inward from `radius`.
- **startAngle** (`number`) — default `0` _(theme)_ — Angle where the first node starts, in degrees: `0` is at the right, `-90` at the top. Nodes follow clockwise. Dragging a node changes it.
- **sort** (`"none" | "ascending" | "descending"`) — default `"none"` _(theme)_ — How to sort nodes by their value. `"none"` keeps the order of the data.

## Inherited settings with a different default on Chord

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **paddingBottom** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowSettings")`) for types, defaults and descriptions.

- _IFlowSettings_: hiddenSize, minHiddenValue, minSize, nodePadding, sourceIdField, targetIdField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
