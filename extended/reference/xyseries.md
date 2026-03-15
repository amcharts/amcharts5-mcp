---
title: "XYSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xyseries/"
scraped: "2026-03-15"
---

A base class for all XY chart series.

## Import

```javascript
// Import XYSeries
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Series
Extended by: BaseColumnSeries, LineSeries

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **baseAxis** (`IXYAxis`) — Base axis for the series. A base axis will dictate direction series plot. Click here for more info
- **categoryXField** (`undefined | string`) — Input data field for X category. Click here for more info
- **categoryYField** (`undefined | string`) — Input data field for Y category. Click here for more info
- **exactLocationX** (`undefined | false | true`) — Default false If this is set to true, data items will ignore locationX setting but will place the data point at exact X value. This works with DateAxis only. On a ColumnSeries/CandlestickSeries this setting will affect bullets only. @since 5.13.0
- **exactLocationY** (`undefined | false | true`) — Default false If this is set to true, data items will ignore locationX setting but will place the data point at exact Y value. This works with DateAxis only. On a ColumnSeries/CandlestickSeries this setting will affect bullets only. @since 5.13.0
- **excludeFromTotal** (`undefined | false | true`) — Default false Exclude series values when calculating totals for category/interval.
- **groupDataCallback** (`undefined | ( dataItem: DataItem, interval: ITimeInterval) => void`) — A custom function to call when grouping data items. Click here for more info @since 5.1.11
- **groupDataDisabled** (`undefined | false | true`) — If set to true data items for this series won't be grouped even if the groupData: true is set on a related DateAxis. @since 5.0.19
- **groupDataWithOriginals** (`undefined | false | true`) — Default false If set to true, when data is grouped, the originals setting of the group data items will be populated by the original (source) data items that fall into the group. Please note that if groupDataCallback is set, this setting is ignored as originals will always be included, regardless of the value. @since 5.1.11
- **highLocationX** (`undefined | number`) — Default 0.5 Horizontal location of the high data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **highLocationY** (`undefined | number`) — Default 0.5 Vertical location of the high data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **highValueXField** (`undefined | string`) — Input data field for X high value. Click here for more info
- **highValueXGrouped** (`"open" | "close" | "high" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating X high values from several data items.
- **highValueXShow** (`"highValueXWorking" | "highValueXChange" | "highValueXChangePercent" | "highValueXChangeSelection" | "highValueXChangeSelectionPercent" | "highValueXChangePrevious" | "highValueXChangePreviousPercent"`) — Display data field for X high value.
- **highValueYField** (`undefined | string`) — Input data field for Y high value. Click here for more info
- **highValueYGrouped** (`"open" | "close" | "high" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating X high values from several data items.
- **highValueYShow** (`"highValueYWorking" | "highValueYChange" | "highValueYChangePercent" | "highValueYChangeSelection" | "highValueYChangeSelectionPercent" | "highValueYChangePrevious" | "highValueYChangePreviousPercent"`) — Display data field for Y low value.
- **ignoreMinMax** (`undefined | false | true`) — Default false If set to true this series will be ignored when calculating scale of the related axes.
- **legendRangeLabelText** (`undefined | string`) — Text to use for series legend label when no particular category/interval is selected.
- **legendRangeValueText** (`undefined | string`) — Text to use for series legend value label when no particular category/interval is selected.
- **locationX** (`undefined | number`) — Default 0.5 Horizontal location of the data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
- **locationY** (`undefined | number`) — Default 0.5 Vertical location of the data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end. Click here for more info
- **lowLocationX** (`undefined | number`) — Default 0.5 Horizontal location of the low data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **lowLocationY** (`undefined | number`) — Default 0.5 Vertical location of the low data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **lowValueXField** (`undefined | string`) — Input data field for X low value. Click here for more info
- **lowValueXGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating X low values from several data items.
- **lowValueXShow** (`"lowValueXWorking" | "lowValueXChange" | "lowValueXChangePercent" | "lowValueXChangeSelection" | "lowValueXChangeSelectionPercent" | "lowValueXChangePrevious" | "lowValueXChangePreviousPercent"`) — Display data field for X low value.
- **lowValueYField** (`undefined | string`) — Input data field for Y low value. Click here for more info
- **lowValueYGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating Y low values from several data items.
- **lowValueYShow** (`"lowValueYWorking" | "lowValueYChange" | "lowValueYChangePercent" | "lowValueYChangeSelection" | "lowValueYChangeSelectionPercent" | "lowValueYChangePrevious" | "lowValueYChangePreviousPercent"`) — Display data field for Y low value.
- **maskBullets** (`undefined | false | true`) — If set to true, series bullets will be masked by plot area.
- **minBulletDistance** (`undefined | number`) — Minimal distance between data items in pixels. If data items are closer than this, bullets are turned off to avoid overcrowding. Click here for more info
- **openCategoryXField** (`undefined | string`) — Display data field for X category. Click here for more info
- **openCategoryYField** (`undefined | string`) — Display data field for Y category. Click here for more info
- **openLocationX** (`undefined | number`) — Default 0.5 Horizontal location of the open data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **openLocationY** (`undefined | number`) — Default 0.5 Vertical location of the open data point relative to its cell. 0 - beginning, 0.5 - middle, 1 - end.
- **openValueXField** (`undefined | string`) — Input data field for X open value. Click here for more info
- **openValueXGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Display data field for Y open value. Click here for more info
- **openValueXShow** (`"openValueXWorking" | "openValueXChange" | "openValueXChangePercent" | "openValueXChangeSelection" | "openValueXChangeSelectionPercent" | "openValueXChangePrevious" | "openValueXChangePreviousPercent"`) — Display data field for X open value. Click here for more info
- **openValueYField** (`undefined | string`) — Input data field for X open value. Click here for more info
- **openValueYGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Display data field for Y open value. Click here for more info
- **openValueYShow** (`"openValueYWorking" | "openValueYChange" | "openValueYChangePercent" | "openValueYChangeSelection" | "openValueYChangeSelectionPercent" | "openValueYChangePrevious" | "openValueYChangePreviousPercent"`) — Display data field for Y open value. Click here for more info
- **seriesTooltipTarget** (`"series" | "bullet"`) — Default "series" Whether series' tooltip should inherit its color from series or its first bullet.
- **snapTooltip** (`undefined | false | true`) — If set to true XYCursor will show closest data item from series even if it is outside currently hovered date axis interval. This setting is relevant only if baseAxis is a date axis.
- **stackToNegative** (`undefined | false | true`) — Whether to stack negative values from zero (true) or from whatever previous series value is (false). Click here for more info
- **stacked** (`undefined | false | true`) — If set to true series will be stacked to other series that also have this setting set to true. NOTE: for series stack properly, all stacked series must have same number of data items with the same timestamp/category. Click here for more info
- **tooltipDataItem** (`DataItem`) — A DataItem that is being used for current tooltip, e.g. by a chart cursor. @since 5.1.2
- **tooltipPositionX** (`"open" | "value" | "low" | "high"`) — Default "value" Indicates horizontal position at which to show series' tooltip at. @since 5.0.16
- **tooltipPositionY** (`"open" | "value" | "low" | "high"`) — Default "value" Indicates vertical position at which to show series' tooltip at. @since 5.0.16
- **useSelectionExtremes** (`undefined | false | true`) — If set to true series will use selection extremes when calculating their min and max values of the axis. Useful for stacked series. @since 5.10.11
- **valueXField** (`undefined | string`) — Input data field for X value. Click here for more info
- **valueXGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating X values from several data items. Click here for more info
- **valueXShow** (`"valueXWorking" | "valueXChange" | "valueXChangePercent" | "valueXChangeSelection" | "valueXChangeSelectionPercent" | "valueXChangePrevious" | "valueXChangePreviousPercent" | "valueXTotal" | "valueXTotalPercent" | "valueXSum"`) — Display data field for X value. Click here for more info
- **valueYField** (`undefined | string`) — Input data field for Y value. Click here for more info
- **valueYGrouped** (`"open" | "close" | "low" | "high" | "average" | "sum" | "extreme"`) — Indicates what aggregate value to use for collective data item, when aggregating X values from several data items. Click here for more info
- **valueYShow** (`"valueYWorking" | "valueYChange" | "valueYChangePercent" | "valueYChangeSelection" | "valueYChangeSelectionPercent" | "valueYChangePrevious" | "valueYChangePreviousPercent" | "valueYTotal" | "valueYTotalPercent" | "valueYSum"`) — Display data field for Y value. Click here for more info
- **xAxis** (`IXYAxis`) — X axis series uses. IMPORTANT: xAxis needs to be set when creating the series. Updating this setting on previously created series object will not work.

## Properties

- **axisRanges** (`List`) — Default new List() A list of axis ranges that affect the series. Click here for more info
- **chart** (`XYChart | undefined`) — (no description)
- **mainContainer** (`Container`) — Default Container.new() A Container that us used to put series' elements in.
- **mainDataItems** (`Array`) — A list of series's main (ungrouped) data items.
