---
title: "IPictorialStackedSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipictorialstackedseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPyramidSeriesSettings
All ancestors: IPyramidSeriesSettings, IFunnelSeriesSettings, IPercentSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.PictorialStackedSeries` (see its page for the class)
TypeScript: `am5percent.IPictorialStackedSeriesSettings` (`import type { IPictorialStackedSeriesSettings } from "@amcharts/amcharts5/percent"`)

## Settings

- **svgPath** (`string`) — An SVG path that will define the shape of the pictorial series. Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/pictorial-stacked-series/#Shape_of_the_series

## Inherited settings with a different default on PictorialStackedSeries

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{valuePercentTotal.formatNumber('0.00p')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **sequencedInterpolation** (`boolean`) — default `true` _(theme)_ — _from ISeriesSettings_ — Shows and hides the data items one after another instead of all at once, including in the initial animation. Works in XY and percent series. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPyramidSeriesSettings")`) for types, defaults and descriptions.

- _IPyramidSeriesSettings_: bottomWidth, topWidth, valueIs
- _IFunnelSeriesSettings_: alignLabels, bottomRatio, endLocation, ignoreZeroValues, orientation, startLocation
- _IPercentSeriesSettings_: categoryField, colors, fillField, patterns
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
