---
title: "IFunnelSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ifunnelseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPercentSeriesSettings
All ancestors: IPercentSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.FunnelSeries` (see its page for the class)
TypeScript: `am5percent.IFunnelSeriesSettings` (`import type { IFunnelSeriesSettings } from "@amcharts/amcharts5/percent"`)

## Settings

- **bottomRatio** (`number`) — default `0` — Narrows the bottom edge of each slice toward the width of the next slice: `0` keeps it as wide as the top, making a rectangle, `1` makes it as wide as the next slice, making a trapezoid. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/#Slice_bottom_width
- **orientation** (`"horizontal" | "vertical"`) — default `"vertical"` _(theme)_ — Orientation of the series. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series_orientation
- **ignoreZeroValues** (`boolean`) — default `false` — Leaves out items with a zero value: no slice, label or tick, and no space for them.
- **alignLabels** (`boolean`) — default `true` _(theme)_ — Lines the labels up in a column to the right of the slices (a row below them when horizontal), joined to them by ticks. `false` puts each label over its slice.
- **startLocation** (`number`) — default `0` _(theme)_ — Relative location within area available to series where it should start. `0` - beginning, `1` - end, or any intermediate value. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/#Start_end_locations
- **endLocation** (`number`) — default `1` _(theme)_ — Relative location within area available to series where it should end. `0` - beginning, `1` - end, or any intermediate value. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/funnel-series/#Start_end_locations

## Inherited settings with a different default on FunnelSeries

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{valuePercentTotal.formatNumber('0.00p')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **sequencedInterpolation** (`boolean`) — default `true` _(theme)_ — _from ISeriesSettings_ — Shows and hides the data items one after another instead of all at once, including in the initial animation. Works in XY and percent series. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPercentSeriesSettings")`) for types, defaults and descriptions.

- _IPercentSeriesSettings_: categoryField, colors, fillField, patterns
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
