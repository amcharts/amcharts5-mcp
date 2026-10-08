---
title: "IHierarchySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchysettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5hierarchy.Hierarchy` (see its page for the class)
TypeScript: `am5hierarchy.IHierarchySettings` (`import type { IHierarchySettings } from "@amcharts/amcharts5/hierarchy"`)

## Settings

- **sort** (`"none" | "ascending" | "descending"`) — default `"none"` — How to sort nodes by their value.
- **valueField** (`string`) — Field in data that holds the node's value.
- **categoryField** (`string`) — Field in data that holds the node's category name.
- **childDataField** (`string`) — default `"children"` _(theme)_ — Field in data that holds the array of the node's children.
- **parentIdField** (`string`) — default `"parentId"` _(code fallback)_ — Field in data that holds the parent node's ID, for flat data passed to `setFlatData()`. When not set, `"parentId"` is used. _Since 5.16.2._ Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Flat_data
- **disabledField** (`string`) — Field in data that, when `true`, makes the node start collapsed.
- **fillField** (`string`) — Field in data that holds the node's color.
- **colors** (`ColorSet`) — default `ColorSet.new(root, { step: 2 })` _(theme)_ — `ColorSet` for the node colors: each first-level node takes the next color, and the nodes below it share that color. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Node_colors
- **patterns** (`PatternSet`) — A `PatternSet` to use when assigning patterns for nodes. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Pattern_sets
- **downDepth** (`number`) — default `1` _(theme)_ — Number of child levels a click on a node opens. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Drill_down
- **upDepth** (`number`) — default `Infinity` _(code fallback)_ — Number of parent levels that stay visible above the selected node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Drill_down
- **initialDepth** (`number`) — default `5` _(theme)_ — Number of levels opened below the top level (`topDepth`) when the chart first loads. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Tree_depth
- **topDepth** (`number`) — default `0` — Depth of the first level shown; the levels above it are hidden. For example, `1` hides the root node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Tree_depth
- **singleBranchOnly** (`boolean`) — default `true` _(theme)_ — Collapses the other branches when a branch is opened. `Sunburst` ignores this setting and always works as if it is `true`.
- **selectedDataItem** (`DataItem<IHierarchyDataItem>`) — The selected (drilled-into) node. Set it to drill down to a node. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/#Pre_selected_branch
- **animationDuration** (`number`) — Duration of the drill-down animations, in milliseconds.
- **animationEasing** (`Easing`) — default `am5.ease.out(am5.ease.cubic)` _(theme)_ — Easing of the drill-down animations.

## Inherited settings with a different default on Hierarchy

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sum.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **maskContent** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Clips all content that goes outside the container's bounds.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
