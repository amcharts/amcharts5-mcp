---
title: "IForceDirectedSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iforcedirectedsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILinkedHierarchySettings
All ancestors: ILinkedHierarchySettings, IHierarchySettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5hierarchy.ForceDirected` (see its page for the class)
TypeScript: `am5hierarchy.IForceDirectedSettings` (`import type { IForceDirectedSettings } from "@amcharts/amcharts5/hierarchy"`)

## Settings

- **nodePadding** (`number`) — default `0` — Room in pixels kept free around each node. It applies to both nodes of a pair, so neighbouring nodes stay at least twice this far apart.
- **centerStrength** (`number`) — default `0.8` _(theme)_ — Pull of every node toward the center of the chart; a negative value pushes nodes away from it. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **manyBodyStrength** (`number`) — default `-14` _(theme)_ — Force between all nodes, scaled by each node's radius: a negative value pushes them apart, a positive one pulls them together. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **linkWithStrength** (`number`) — default `0.5` _(theme)_ — A force that attracts (or pushes back) nodes that are linked together via `linkWithField`. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **velocityDecay** (`number`) — default `0.5` _(theme)_ — Resistance acting against node speed. The greater the value, the more "sluggish" the nodes will be. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **initialFrames** (`number`) — default `500` _(theme)_ — Length of how long initial force simulation would run in frames. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **showOnFrame** (`number`) — default `10` _(theme)_ — If set to a number will wait X number of frames before revealing the tree. Can be used to hide initial animations where nodes settle into their places. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Layout_and_force_simulation
- **minRadius** (`number | Percent`) — default `am5.percent(1)` _(theme)_ — Radius of the circle of the node with the smallest value, in pixels or percent of the series' average side ((width + height) / 2). Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Sizing_nodes
- **maxRadius** (`number | Percent`) — default `am5.percent(8)` _(theme)_ — Radius of the circle of the node with the largest value, in pixels or percent of the series' average side ((width + height) / 2). Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Sizing_nodes
- **xField** (`string`) — Field in data that holds a fixed X position for the node, in pixels or percent of the series' width. Such a node doesn't move along X. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Fixed_nodes
- **yField** (`string`) — Field in data that holds a fixed Y position for the node, in pixels or percent of the series' height. Such a node doesn't move along Y. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Fixed_nodes

## Inherited settings with a different default on ForceDirected

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sum.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **maskContent** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Clips all content that goes outside the container's bounds.
- **singleBranchOnly** (`boolean`) — default `false` _(theme)_ — _from IHierarchySettings_ — Collapses the other branches when a branch is opened. `Sunburst` ignores this setting and always works as if it is `true`.
- **upDepth** (`number`) — default `Infinity` _(theme)_ — _from IHierarchySettings_ — Number of parent levels that stay visible above the selected node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Drill_down
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILinkedHierarchySettings")`) for types, defaults and descriptions.

- _ILinkedHierarchySettings_: linkWithField
- _IHierarchySettings_: animationDuration, animationEasing, categoryField, childDataField, colors, disabledField, downDepth, fillField, initialDepth, parentIdField, patterns, selectedDataItem, sort, topDepth, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
