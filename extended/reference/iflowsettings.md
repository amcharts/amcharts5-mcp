---
title: "IFlowSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.Flow` (see its page for the class)
TypeScript: `am5flow.IFlowSettings` (`import type { IFlowSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **sourceIdField** (`string`) — Field in data that holds the source node's ID.
- **targetIdField** (`string`) — Field in data that holds the target node's ID.
- **nodeWidth** (`number`) — default `10` — Thickness of the node bars, in pixels. Not used by `ArcDiagram`.
- **nodePadding** (`number`) — Gap between adjacent nodes, in pixels: `10` in a `Sankey`, `5` in an `ArcDiagram`. A `Chord` uses `padAngle` instead.
- **minSize** (`number`) — default `0` _(theme)_ — Smallest size a link is drawn at, as a fraction of the sum of all link values. For example, `0.01` draws every link at least as thick as one holding 1% of the total, so small links and their nodes stay visible. _Since 5.1.5._
- **hiddenSize** (`number`) — default `0.05` _(theme)_ — Size a hidden link keeps in the layout, as a fraction of its value. Links hide when their node is toggled off with a click (`toggleKey: "disabled"` on nodes); a small size keeps that node visible so it can be clicked back on. _Since 5.4.1._ Docs: https://www.amcharts.com/docs/v5/charts/flow-charts/#Node_toggling
- **minHiddenValue** (`number`) — default `0` _(theme)_ — Smallest value a hidden link shrinks to, whatever `hiddenSize` gives. _Since 5.4.1._ Docs: https://www.amcharts.com/docs/v5/charts/flow-charts/#Node_toggling

## Inherited settings with a different default on Flow

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **paddingBottom** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
