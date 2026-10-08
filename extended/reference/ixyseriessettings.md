---
title: "IXYSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixyseriessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5xy.XYSeries` (see its page for the class)
TypeScript: `am5xy.IXYSeriesSettings` (`import type { IXYSeriesSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **exactLocationX** (`boolean`) — default `false` — Places data points at their exact date on a `DateAxis` X axis, ignoring `locationX`. When that axis is the base axis, a column then spans exactly from its open date to its date, so it needs an `openValueXField` to have any width. _Since 5.13.0._
- **exactLocationY** (`boolean`) — default `false` — Places data points at their exact date on a `DateAxis` Y axis, ignoring `locationY`. Columns are not affected. _Since 5.13.0._
- **useSelectionExtremes** (`boolean`) — Makes the value axis scale to the series' values within the visible range only, instead of all its values. Useful for stacked series. _Since 5.10.11._
- **minBulletDistance** (`number`) — default `0` _(code fallback)_ — Hides the bullets while data items are, on average, closer than this many pixels to each other along the base axis. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
- **xAxis** (`IXYAxis`) — The X axis the series is plotted against. Must be set when creating the series; it can be switched to another axis of the same type later.
- **yAxis** (`IXYAxis`) — The Y axis the series is plotted against. Must be set when creating the series; it can be switched to another axis of the same type later.
- **stacked** (`boolean`) — default `false` _(code fallback)_ — Stacks the series on the one before it in the chart's `series` that has the same axes and is of the same type. The first series of a stack doesn't need it set. Stacking goes by data item index, so all stacked series need the same data items (dates or categories), in the same order. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Stacked_series
- **stackToNegative** (`boolean`) — default `true` _(theme)_ — When stacking, puts negative values on the negative values below and positive on positive, so the stack grows away from zero both ways. With `false`, each value goes on the one right below it, whatever its sign. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Negative_value_stacking
- **baseAxis** (`IXYAxis`) — The axis the series runs along, such as the category axis of a column series; the other axis holds its values. If not set, the chart picks the Y axis when it is a category or date axis, and the X axis otherwise. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Base_axis
- **valueXField** (`string`) — Data field with the X value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **valueYField** (`string`) — Data field with the Y value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **excludeFromTotal** (`boolean`) — default `false` — Leaves the series out of the totals (`valueYTotal`, `valueYTotalPercent` and the like) that a value axis with `calculateTotals` works out.
- **valueXShow** (`"valueXWorking" | "valueXChange" | "valueXChangePercent" | "valueXChangeSelection" | "valueXChangeSelectionPercent" | "valueXChangePrevious" | "valueXChangePreviousPercent" | "valueXTotal" | "valueXTotalPercent" | "valueXSum"`) — default `"valueXWorking"` _(class default)_ — Which form of the X value the series plots on a `ValueAxis`: the value itself (`"valueXWorking"`), or one worked out from it, such as its change since the first visible data item (`"valueXChangeSelection"`) or its percent of the total (`"valueXTotalPercent"`). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **valueYShow** (`"valueYWorking" | "valueYChange" | "valueYChangePercent" | "valueYChangeSelection" | "valueYChangeSelectionPercent" | "valueYChangePrevious" | "valueYChangePreviousPercent" | "valueYTotal" | "valueYTotalPercent" | "valueYSum"`) — default `"valueYWorking"` _(class default)_ — Which form of the Y value the series plots on a `ValueAxis`: the value itself (`"valueYWorking"`), or one worked out from it, such as its change since the first visible data item (`"valueYChangeSelection"`) or its percent of the total (`"valueYTotalPercent"`). Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **valueXGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"close"` _(theme)_ — How a `DateAxis` with `groupData` combines the X values of the data items it groups into one: `"open"` takes the first, `"close"` the last, `"extreme"` the one farthest from zero, and the rest as named. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **valueYGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"close"` _(theme)_ — How a `DateAxis` with `groupData` combines the Y values of the data items it groups into one: `"open"` takes the first, `"close"` the last, `"extreme"` the one farthest from zero, and the rest as named. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **openValueXField** (`string`) — Data field with the open X value, such as where a horizontal column starts. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openValueYField** (`string`) — Data field with the open Y value, such as where a column starts. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openValueXShow** (`"openValueXWorking" | "openValueXChange" | "openValueXChangePercent" | "openValueXChangeSelection" | "openValueXChangeSelectionPercent" | "openValueXChangePrevious" | "openValueXChangePreviousPercent"`) — default `"openValueXWorking"` _(class default)_ — Which form of the open X value the series plots; see `valueXShow`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openValueYShow** (`"openValueYWorking" | "openValueYChange" | "openValueYChangePercent" | "openValueYChangeSelection" | "openValueYChangeSelectionPercent" | "openValueYChangePrevious" | "openValueYChangePreviousPercent"`) — default `"openValueYWorking"` _(class default)_ — Which form of the open Y value the series plots; see `valueYShow`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openValueXGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"open"` _(theme)_ — How grouping combines the open X values; see `valueXGrouped`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **openValueYGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"open"` _(theme)_ — How grouping combines the open Y values; see `valueYGrouped`. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Dynamic_data_item_grouping
- **lowValueXField** (`string`) — Data field with the low X value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/
- **lowValueYField** (`string`) — Data field with the low Y value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/
- **highValueXField** (`string`) — Data field with the high X value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/
- **highValueYField** (`string`) — Data field with the high Y value. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/
- **lowValueXShow** (`"lowValueXWorking" | "lowValueXChange" | "lowValueXChangePercent" | "lowValueXChangeSelection" | "lowValueXChangeSelectionPercent" | "lowValueXChangePrevious" | "lowValueXChangePreviousPercent"`) — default `"lowValueXWorking"` _(class default)_ — Which form of the low X value the series plots; see `valueXShow`.
- **lowValueYShow** (`"lowValueYWorking" | "lowValueYChange" | "lowValueYChangePercent" | "lowValueYChangeSelection" | "lowValueYChangeSelectionPercent" | "lowValueYChangePrevious" | "lowValueYChangePreviousPercent"`) — default `"lowValueYWorking"` _(class default)_ — Which form of the low Y value the series plots; see `valueYShow`.
- **lowValueXGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"low"` _(class default)_ — How grouping combines the low X values; see `valueXGrouped`.
- **lowValueYGrouped** (`"open" | "high" | "low" | "close" | "average" | "sum" | "extreme"`) — default `"low"` _(class default)_ — How grouping combines the low Y values; see `valueYGrouped`.
- **highValueXShow** (`"highValueXWorking" | "highValueXChange" | "highValueXChangePercent" | "highValueXChangeSelection" | "highValueXChangeSelectionPercent" | "highValueXChangePrevious" | "highValueXChangePreviousPercent"`) — default `"highValueXWorking"` _(class default)_ — Which form of the high X value the series plots; see `valueXShow`.
- **highValueYShow** (`"highValueYWorking" | "highValueYChange" | "highValueYChangePercent" | "highValueYChangeSelection" | "highValueYChangeSelectionPercent" | "highValueYChangePrevious" | "highValueYChangePreviousPercent"`) — default `"highValueYWorking"` _(class default)_ — Which form of the high Y value the series plots; see `valueYShow`.
- **highValueXGrouped** (`"open" | "high" | "close" | "average" | "sum" | "extreme"`) — default `"high"` _(class default)_ — How grouping combines the high X values; see `valueXGrouped`.
- **highValueYGrouped** (`"open" | "high" | "close" | "average" | "sum" | "extreme"`) — default `"high"` _(class default)_ — How grouping combines the high Y values; see `valueYGrouped`.
- **lowLocationX** (`number`) — default `0.5` — Horizontal location of the low data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end.
- **lowLocationY** (`number`) — default `0.5` — Vertical location of the low data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end.
- **highLocationX** (`number`) — default `0.5` — Horizontal location of the high data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end.
- **highLocationY** (`number`) — default `0.5` — Vertical location of the high data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end.
- **categoryXField** (`string`) — Data field with the X category. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **categoryYField** (`string`) — Data field with the Y category. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openCategoryXField** (`string`) — Data field with the X category a column starts at, so that it can span several categories. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **openCategoryYField** (`string`) — Data field with the Y category a column starts at, so that it can span several categories. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Data_fields
- **ignoreMinMax** (`boolean`) — default `false` — Leaves the series out when its axes work out their scale.
- **vcx** (`number`) — default `1` _(class default)_ — _(internal)_
- **vcy** (`number`) — default `1` _(class default)_ — _(internal)_
- **locationX** (`number`) — default `0.5` _(theme)_ — Horizontal location of the data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/line-series/#Data_item_location
- **locationY** (`number`) — default `0.5` _(theme)_ — Vertical location of the data point relative to its cell. `0` - beginning, `0.5` - middle, `1` - end. Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/line-series/#Data_item_location
- **openLocationX** (`number`) — Where in its X axis cell the open data point sits: `0` at the start, `0.5` in the middle, `1` at the end. If not set, `locationX` is used.
- **openLocationY** (`number`) — Where in its Y axis cell the open data point sits: `0` at the start, `0.5` in the middle, `1` at the end. If not set, `locationY` is used.
- **snapTooltip** (`boolean`) — default `false` _(theme)_ — Lets the cursor show the nearest data item even when there is none in the date interval under the pointer. Works only with a `DateAxis`.
- **legendRangeLabelText** (`string`) — Text of the series' legend label while the cursor is not over any of its data items. If not set, `legendLabelText` is used.
- **legendRangeValueText** (`string`) — Text of the series' legend value label while the cursor is not over any of its data items.
- **maskBullets** (`boolean`) — default `true` _(theme)_ — Clips the series' bullets to the plot area.
- **seriesTooltipTarget** (`"series" | "bullet"`) — default `"series"` _(theme)_ — Where the series' tooltip takes its color from: the series (on a column series, the hovered column), or the data item's first bullet.
- **tooltipPositionX** (`"open" | "high" | "low" | "value"`) — default `"value"` — Which of the data item's X values the series' tooltip points at. _Since 5.0.16._
- **tooltipPositionY** (`"open" | "high" | "low" | "value"`) — default `"value"` — Which of the data item's Y values the series' tooltip points at. _Since 5.0.16._
- **groupDataDisabled** (`boolean`) — Keeps the series' data ungrouped even when its `DateAxis` has `groupData` set. _Since 5.0.19._
- **tooltipDataItem** (`DataItem<IXYSeriesDataItem>`) — The data item the series' tooltip currently shows, such as the one under the cursor. _Since 5.1.2._
- **groupDataWithOriginals** (`boolean`) — default `false` — Fills the `originals` of each grouped data item with the source data items it was made from. Always on when `groupDataCallback` is set. _Since 5.1.11._
- **groupDataCallback** (`(dataItem: DataItem<IXYSeriesDataItem>, interval: ITimeInterval) => void`) — Function called for each grouped data item once it is complete, to set values of your own. Its `originals` hold the source data items. _Since 5.1.11._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Custom_aggregation_functions

## Inherited settings with a different default on XYSeries

- **legendLabelText** (`string`) — default `"{name}"` _(theme)_ — _from ISeriesSettings_ — Text template for the item's label in a `Legend`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
