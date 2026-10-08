---
title: "ISeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IComponentSettings
All ancestors: IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Series` (see its page for the class)
TypeScript: `am5.ISeriesSettings` (`import type { ISeriesSettings } from "@amcharts/amcharts5"`)

## Settings

- **name** (`string`) — Name of the series.
- **idField** (`string`) — A key to look up in data for an id of the data item.
- **urlField** (`string`) — A key to look up in data for a URL to open when the data item's element (a bullet, column, slice, map polygon or map line) is clicked. Links are off until this is set. _Since 5.20.7._ _Note:_ Linked elements: bullet sprites of every series, `BaseColumnSeries` columns (column, candlestick, OHLC, Gantt…), `PercentSeries` slices (pie, funnel, pyramid, pictorial), Venn slices, `MapPolygon` (also NightSeries polygons) and `MapLine` — not hierarchy nodes, flow nodes/links, word-cloud labels or MapSankey nodes. A linked element gets `cursorOverStyle: "pointer"` unless you set one yourself. Script URLs (`javascript:`, `data:`, `vbscript:`) are never opened. Can be set after the data; a URL added later (e.g. `data.setIndex()`) links too. Clicks go through the public `series.openUrl(dataItem)` method — override it to intercept links.
- **linkTarget** (`string`) — default `"_self"` — Where a data item's URL opens: `"_self"` for the same window, `"_blank"` for a new tab, or a named window / frame. A chart embedded in an iframe usually wants `"_blank"` or `"_top"`. _Since 5.20.7._ _Note:_ `"_blank"` opens the page with `noopener`.
- **valueField** (`string`) — A key to look up in data for a numeric value of the data item. Some series draw their elements by it; heat rules can use it too.
- **customValueField** (`string`) — A key to look up in data for an extra numeric value of the data item (`customValue`), e.g. for heat rules.
- **legendLabelText** (`string`) — Text template for the item's label in a `Legend`.
- **legendValueText** (`string`) — Text template for the item's value label in a `Legend`.
- **sequencedInterpolation** (`boolean`) — Shows and hides the data items one after another instead of all at once, including in the initial animation. Works in XY and percent series. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **sequencedDelay** (`number`) — Extra delay in milliseconds between the animations of consecutive data items, with `sequencedInterpolation`. Docs: https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
- **heatRules** (`IHeatRule[]`) — Heat rules to apply to the series' elements. A rule without `minValue` and `maxValue` needs `calculateAggregates` to find the value range. Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
- **calculateAggregates** (`boolean`) — Makes the series compute aggregate values, such as sums, averages, lows, highs and changes. Enable it only if they are used, e.g. in tooltips, data fields or heat rules.
- **stroke** (`Color`) — Series stroke color. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **fill** (`Color`) — Series fill color. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Series_colors
- **fillPattern** (`Pattern`) — Series fill pattern. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/
- **fillGradient** (`Gradient`) — Series fill gradient. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **strokeGradient** (`Gradient`) — Series stroke gradient. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **legendDataItem** (`DataItem<ILegendDataItem>`) — The series' data item in a `Legend`.
- **excludeFromAggregate** (`string[]`) — Fields to leave out of `calculateAggregates`, to save work where their aggregates are not needed. _Since 5.14.4._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentSettings")`) for types, defaults and descriptions.

- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
