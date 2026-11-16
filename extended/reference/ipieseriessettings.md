---
title: "IPieSeriesSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/ipieseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

## Inheritance

Extends: IPercentSeriesSettings
All ancestors: IPercentSeriesSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5percent.PieSeries` (see its page for the class)
TypeScript: `am5percent.IPieSeriesSettings` (`import type { IPieSeriesSettings } from "@amcharts/amcharts5/percent"`)

## Settings

- **radius** (`number | Percent`) — Outer radius of the series, in pixels or percent, measured out from the chart's `innerRadius`: `100%` reaches the chart's `radius`. When not set, the chart's series share that space equally as concentric rings.
- **innerRadius** (`number | Percent`) — Inner radius of the series, in pixels or percent, measured the same way as `radius`. A negative number is pixels in from the series' outer radius, when the chart has no `innerRadius`.
- **startAngle** (`number`) — default `-90` _(theme)_ — Angle where the first slice starts, in degrees: `0` is at the right, `-90` at the top, and slices follow clockwise. Set the chart's `startAngle` to match, so the pie is fitted and centered for it.
- **endAngle** (`number`) — default `270` _(theme)_ — Angle where the last slice ends, in degrees. Set the chart's `endAngle` to match.
- **autoLabels** (`boolean`) — default `false` — Fits the labels into the chart, a step at a time as room runs out: • The pie moves aside so each side gets the room its widest label needs, then gets smaller, down to half the chart's shorter side. • Then a label too wide for its column wraps onto up to three lines where the column has height to spare, and is shortened where it has not. • Then the labels of the smallest slices are hidden where a column cannot hold them all, and a side too narrow for readable labels shows none. • When no label fits, all are hidden and the pie keeps its size and place. Labels also get the chart's full height. A label put in the middle of a donut, in the series' or the chart's `seriesContainer` children (a total, say), is made smaller where it would not fit the hole, unless its own `maxWidth`, `maxHeight` or `oversizedBehavior` is set. With `alignLabels: false`, labels stay next to their slices: the pie gets smaller for them, down to half the chart's shorter side, then a label too wide for the room it has wraps onto up to three lines or is shortened (curved labels are not), and where two still overlap, or one would be cut off at the chart's edge, the smaller slice's label is hidden. A `maxWidth` on the labels template is the most a label may take. With `oversizedBehavior: "truncate"` there, labels are only shortened; with `"wrap"`, they are shortened only where wrapping does not fit; with `"fit"`, `"hide"` or `"none"`, they are not narrowed. A label whose own `maxWidth` or `oversizedBehavior` is set is not narrowed either. Labels in the series' bullets are hidden where they would overlap or be cut off, as on other series. _Since 5.22.0._ Docs: https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/pie-series/#labels-that-dont-fit

## Inherited settings with a different default on PieSeries

- **height** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Height in pixels, or a `Percent` of the parent's inner height. In a vertical layout, a percent height is a share of the height the other children leave.
- **legendLabelText** (`string`) — default `"{category}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — default `"{valuePercentTotal.formatNumber('0.00p')}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's value label in a `Legend`.
- **width** (`number | Percent`) — default `am5.p100` _(theme)_ — _from ISpriteSettings_ — Width in pixels, or a `Percent` of the parent's inner width. In a horizontal layout, a percent width is a share of the width the other children leave.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPercentSeriesSettings")`) for types, defaults and descriptions.

- _IPercentSeriesSettings_: alignLabels, categoryField, colors, fillField, patterns
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, direction, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
