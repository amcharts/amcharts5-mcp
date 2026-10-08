---
title: "IVoronoiTreemapSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivoronoitreemapsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IHierarchySettings
All ancestors: IHierarchySettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5hierarchy.VoronoiTreemap` (see its page for the class)
TypeScript: `am5hierarchy.IVoronoiTreemapSettings` (`import type { IVoronoiTreemapSettings } from "@amcharts/amcharts5/hierarchy"`)

## Settings

- **shapeType** (`"rectangle" | "polygon"`) — default `"polygon"` _(theme)_ — Outline of the whole diagram: `"polygon"`, a round shape of `cornerCount` corners, or `"rectangle"`, which fills the series' area. Docs: https://www.amcharts.com/docs/v5/charts/hierarchy/voronoi-treemap/#Diagram_type _Note:_ Renamed from `type` in 5.18.0 (`type` still works).
- **type** (`"rectangle" | "polygon"`) — _(internal)_ Type of the diagram's shape. Left for backward compatibility. Please use `shapeType` instead.
- **cornerCount** (`number`) — default `120` — Number of corners of the outline when `shapeType` is `"polygon"`. The default `120` looks like a circle.
- **minWeightRatio** (`number`) — default `0.005` _(theme)_ — Smallest weight a cell may have, as a fraction of the largest. Lighter cells are enlarged to it, so they no longer show their true value. Very small values can make the layout flicker.
- **convergenceRatio** (`number`) — default `0.005` _(theme)_ — How closely the cell areas must match their values before the layout stops: it stops once the cells' summed area error is below this fraction of the total area. Smaller values are more precise but slower.
- **maxIterationCount** (`number`) — default `100` _(theme)_ — Most iterations the layout runs, even if `convergenceRatio` is not reached yet. More iterations give finer results but take longer.

## Inherited settings with a different default on VoronoiTreemap

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{sum.formatNumber('#.#')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **maskContent** (`boolean`) — default `true` _(theme)_ — _from IContainerSettings_ — Clips all content that goes outside the container's bounds.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IHierarchySettings")`) for types, defaults and descriptions.

- _IHierarchySettings_: animationDuration, animationEasing, categoryField, childDataField, colors, disabledField, downDepth, fillField, initialDepth, parentIdField, patterns, selectedDataItem, singleBranchOnly, sort, topDepth, upDepth, valueField
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
