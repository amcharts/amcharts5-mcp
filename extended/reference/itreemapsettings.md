---
title: "ITreemapSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itreemapsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IHierarchySettings
All ancestors: IHierarchySettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5hierarchy.Treemap` (see its page for the class)
TypeScript: `am5hierarchy.ITreemapSettings` (`import type { ITreemapSettings } from "@amcharts/amcharts5/hierarchy"`)

## Settings

- **nodePaddingInner** (`number`) — Gap between neighboring nodes, in pixels. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **nodePaddingOuter** (`number`) — default `0` _(code fallback)_ — Gap between a node's edges and the nodes inside it, in pixels; for the top node, that is the gap to the chart's edges. Overrides `nodePaddingTop`, `nodePaddingRight`, `nodePaddingBottom` and `nodePaddingLeft`. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **nodePaddingTop** (`number`) — Gap between a node's top edge and the nodes inside it, in pixels. Ignored if `nodePaddingOuter` is set. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **nodePaddingBottom** (`number`) — Gap between a node's bottom edge and the nodes inside it, in pixels. Ignored if `nodePaddingOuter` is set. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **nodePaddingLeft** (`number`) — Gap between a node's left edge and the nodes inside it, in pixels. Ignored if `nodePaddingOuter` is set. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **nodePaddingRight** (`number`) — Gap between a node's right edge and the nodes inside it, in pixels. Ignored if `nodePaddingOuter` is set. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/treemap/#Margins
- **layoutAlgorithm** (`"binary" | "squarify" | "slice" | "dice" | "sliceDice"`) — default `"squarify"` _(theme)_ — How the rectangles are laid out: `"squarify"` keeps them close to squares, `"binary"` splits the space in balanced halves, `"slice"` stacks them top to bottom, `"dice"` places them left to right, and `"sliceDice"` alternates between the two from level to level.

## Inherited settings with a different default on Treemap

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sum.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **maskContent** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Clips all content that goes outside the container's bounds.
- **upDepth** (`number`) — default `0` _(theme)_ — _from IHierarchySettings_ — Number of parent levels that stay visible above the selected node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Drill_down
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IHierarchySettings")`) for types, defaults and descriptions.

- _IHierarchySettings_: animationDuration, animationEasing, categoryField, childDataField, colors, disabledField, downDepth, fillField, initialDepth, parentIdField, patterns, selectedDataItem, singleBranchOnly, sort, topDepth, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
