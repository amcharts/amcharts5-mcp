---
title: "IArcDiagramSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iarcdiagramsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowSettings
All ancestors: IFlowSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.ArcDiagram` (see its page for the class)
TypeScript: `am5flow.IArcDiagramSettings` (`import type { IArcDiagramSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **orientation** (`"horizontal" | "vertical"`) — default `"horizontal"` _(theme)_ — Puts the nodes in a row along the bottom with arcs above them (`"horizontal"`), or in a column on the left with arcs to the right (`"vertical"`). Set it when creating the series; it can't be changed later.
- **minRadius** (`number`) — default `5` _(theme)_ — Smallest radius of a node circle, in pixels. The largest follows from the space available.
- **radiusKey** (`"none" | "sum" | "sumIncoming" | "sumOutgoing"`) — default `"sum"` _(theme)_ — Node value that sizes the circles: `"sum"` (all links), `"sumIncoming"`, `"sumOutgoing"`, or `"none"` for circles all the same size.
- **animationDuration** (`number`) — default `0` _(code fallback)_ — Duration of the animation that moves nodes to new positions when values change, for example after a node is toggled, in milliseconds.
- **animationEasing** (`Easing`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of the node animation set by `animationDuration`.

## Inherited settings with a different default on ArcDiagram

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **nodePadding** (`number`) — default `5` _(theme)_ — _from IFlowSettings_ — Gap between adjacent nodes, in pixels: `10` in a `Sankey`, `5` in an `ArcDiagram`. A `Chord` uses `padAngle` instead.
- **paddingBottom** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowSettings")`) for types, defaults and descriptions.

- _IFlowSettings_: hiddenSize, minHiddenValue, minSize, nodeWidth, sourceIdField, targetIdField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
