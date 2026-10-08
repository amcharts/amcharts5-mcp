---
title: "ITreeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILinkedHierarchySettings
All ancestors: ILinkedHierarchySettings, IHierarchySettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5hierarchy.Tree` (see its page for the class)
TypeScript: `am5hierarchy.ITreeSettings` (`import type { ITreeSettings } from "@amcharts/amcharts5/hierarchy"`)

## Settings

- **orientation** (`"horizontal" | "vertical"`) — default `"vertical"` _(theme)_ — Direction the tree grows in: `"vertical"` from top to bottom, `"horizontal"` from left to right.
- **inversed** (`boolean`) — default `false` — Flips the tree, so it grows from bottom to top, or from right to left when horizontal. _Since 5.2.4._
- **clustered** (`boolean`) — default `false` — Uses a cluster layout (dendrogram), which lines up all leaf nodes at the same depth. _Since 5.16.2._
- **nodeSeparation** (`(a: DataItem<ITreeDataItem>, b: DataItem<ITreeDataItem>) => number`) — Function that returns the spacing between two neighboring nodes, given their data items. Without it, siblings get `1` and other neighbors `2`. _Since 5.16.2._
- **fitNodes** (`boolean`) — default `false` — Lays out only the visible nodes, so they spread out to fill the chart while other nodes are hidden or collapsed. _Since 5.18.0._

## Inherited settings with a different default on Tree

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sum.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **maskContent** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Clips all content that goes outside the container's bounds.
- **paddingBottom** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `20` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.
- **singleBranchOnly** (`boolean`) — default `false` _(theme)_ — _from IHierarchySettings_ — Collapses the other branches when a branch is opened. `Sunburst` ignores this setting and always works as if it is `true`.
- **upDepth** (`number`) — default `Infinity` _(theme)_ — _from IHierarchySettings_ — Number of parent levels that stay visible above the selected node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Drill_down
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILinkedHierarchySettings")`) for types, defaults and descriptions.

- _ILinkedHierarchySettings_: linkWithField
- _IHierarchySettings_: animationDuration, animationEasing, categoryField, childDataField, colors, disabledField, downDepth, fillField, initialDepth, parentIdField, patterns, selectedDataItem, sort, topDepth, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
