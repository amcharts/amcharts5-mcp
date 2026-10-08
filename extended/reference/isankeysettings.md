---
title: "ISankeySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isankeysettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowSettings
All ancestors: IFlowSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.Sankey` (see its page for the class)
TypeScript: `am5flow.ISankeySettings` (`import type { ISankeySettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **orientation** (`"horizontal" | "vertical"`) — default `"horizontal"` _(theme)_ — Direction of the flow: `"horizontal"` from left to right, `"vertical"` from top to bottom.
- **nodeAlign** (`"left" | "right" | "center" | "justify"`) — default `"justify"` _(theme)_ — How nodes are spread across the columns. `"left"` puts each node in the earliest column its links allow, `"right"` in the latest. `"justify"` is like `"left"`, but moves nodes with no outgoing links to the last column; `"center"` is like `"left"`, but moves nodes with no incoming links to the column just before their nearest target.
- **linkTension** (`number`) — default `0.5` _(theme)_ — Tension of the link curves, from `0` to `1`. `1` makes the links straight between their bend points.
- **nodeSort** (`(a: d3sankey.SankeyNodeMinimal<{}, {}>, b: d3sankey.SankeyNodeMinimal<{}, {}>) => number | null`) — _(internal)_ A custom function to use when sorting nodes.
- **linkSort** (`(a: d3sankey.SankeyLinkMinimal<{}, {}>, b: d3sankey.SankeyLinkMinimal<{}, {}>) => number | null`) — Function that orders the links where they meet a node. `null` keeps the order of the data; when not set, links are ordered by the position of the node at their other end. _Since 5.4.4._

## Inherited settings with a different default on Sankey

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **nodePadding** (`number`) — default `10` _(theme)_ — _from IFlowSettings_ — Gap between adjacent nodes, in pixels: `10` in a `Sankey`, `5` in an `ArcDiagram`. A `Chord` uses `padAngle` instead.
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
