---
title: "Date axis"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/"
scraped: "2026-11-16"
---

Date axis is used to display date-based data with a natural time scale.

## Data order

> **Important:** Date axis expects series data to be sorted in ascending order. Otherwise, chart will be prone to all kinds of plotting anomalies.

## Data granularity

The single most important setting for a date axis is `baseInterval` which describes granularity of data used in the chart.

The value of `baseInterval` is an object of type `ITimeInterval` which has two keys:

* `timeUnit` - what time unit is used in data.
* `count` - number of time units.

For example, if we have daily data (one data item per day), we'd set up axis like this:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

The `timeUnit` can be one of the following: `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`.

> **Note:** A lot of of other aspects and functionality of a date axis depends on a value of `baseInterval` as we will see throughout this tutorial.

> **Important:** For month-based date axes, the value of `count` for `baseInterval` must be a divider of 12, i.e. `1`, `2`, `3`, `4`, `6`, `12`, `24`, etc.

## Grid granularity

### How it functions?

Date axis' will choose where and how to display its grid based on available space.

The axis renderer's setting `minGridDistance` controls how close together grid (and related ticks/labels) elements can be.

This determines theoretical number of grid lines a grid can display.

When axis calculates that number it will check how far those grid lines are in terms of time.

This will determine the granularity of the time units that grid uses.

For example, let's say our chart displays 30 days worth of daily data.

If our chart is wide enough to comfortably display all 30 grid lines, it will display a grid line for each day.

However, if the chart does not fit all 30 of days, it will revert to some bigger time intervals, like displaying a grid line every two days.

If that still not enough to display grids spaced out enough, it will revert to displaying grid every three, four, or five days, then weeks, months, etc.

The granularity depends on current date range of the axis, meaning that it will update dynamically when zooming the chart in and out:

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/granularity_day5.png "Zoomed out chart. Grid granularity at 5 days.")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/granularity_day1.png "Zooming in. Granularity is reverting to 1 day.")

### Customizing grid granularity

We can control to what time intervals we want grid of the date axis to switch by setting its `gridIntervals` setting.

It's an array of `ITimeInterval` objects, each specifying an allowed option for grid lines.

Date axis will use the most granular interval that satisfies [grid density restrictions](https://docs.amcharts.com/v5/charts/xy-chart/axes/#grid-density).

For example, let's restrict grid to just days and months:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    gridIntervals: [
      { timeUnit: "day", count: 1 },
      { timeUnit: "month", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    gridIntervals: [
      { timeUnit: "day", count: 1 },
      { timeUnit: "month", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

### Default grid intervals

The default value for `gridIntervals` is:

```json
[
  { timeUnit: "millisecond", count: 1 },
  { timeUnit: "millisecond", count: 5 },
  { timeUnit: "millisecond", count: 10 },
  { timeUnit: "millisecond", count: 50 },
  { timeUnit: "millisecond", count: 100 },
  { timeUnit: "millisecond", count: 500 },
  { timeUnit: "second", count: 1 },
  { timeUnit: "second", count: 5 },
  { timeUnit: "second", count: 10 },
  { timeUnit: "second", count: 30 },
  { timeUnit: "minute", count: 1 },
  { timeUnit: "minute", count: 5 },
  { timeUnit: "minute", count: 10 },
  { timeUnit: "minute", count: 15 },
  { timeUnit: "minute", count: 30 },
  { timeUnit: "hour", count: 1 },
  { timeUnit: "hour", count: 3 },
  { timeUnit: "hour", count: 6 },
  { timeUnit: "hour", count: 12 },
  { timeUnit: "day", count: 1 },
  { timeUnit: "day", count: 2 },
  { timeUnit: "day", count: 3 },
  { timeUnit: "day", count: 4 },
  { timeUnit: "day", count: 5 },
  { timeUnit: "week", count: 1 },
  { timeUnit: "month", count: 1 },
  { timeUnit: "month", count: 2 },
  { timeUnit: "month", count: 3 },
  { timeUnit: "month", count: 6 },
  { timeUnit: "year", count: 1 },
  { timeUnit: "year", count: 2 },
  { timeUnit: "year", count: 5 },
  { timeUnit: "year", count: 10 },
  { timeUnit: "year", count: 50 },
  { timeUnit: "year", count: 100 },
  { timeUnit: "year", count: 200 },
  { timeUnit: "year", count: 500 },
  { timeUnit: "year", count: 1000 },
  { timeUnit: "year", count: 2000 },
  { timeUnit: "year", count: 5000 },
  { timeUnit: "year", count: 10000 },
  { timeUnit: "year", count: 100000 }
]
```

### Labels and ticks

The granularity of grid also may affect how related labels and ticks are placed.

For more information about how to position labels/ticks with their `location` and `multiLocation` settings, visit "[XY chart axes: Location of axis elements](https://docs.amcharts.com/v5/charts/xy-chart/axes/#location-of-axis-elements)" tutorial.

## Date formats

### Labels

The current grid granularity determines the date/time format of the labels, too.

Instead of using date format as set in a [global date formatter](https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/#formatter-object), date axis defines own list of formats, suitable for each time unit a grid interval its grid can have.

#### Label date formats

The formats used for each time unit are set in date axis' `dateFormats` setting.

It's an object with a key corresponding to each time unit ( `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`) with a value corresponding to its format.

Here's how it looks like by default, with International English locale:

```json
{
  "millisecond": "mm:ss SSS",
  "second": "HH:mm:ss",
  "minute": "HH:mm",
  "hour": "HH:mm",
  "day": "MMM dd",
  "week": "MMM dd",
  "month": "MMM",
  "year": "yyyy"
}
```

We can easily change the formats as needed:

TypeScript:

```ts
xAxis.get("dateFormats")["day"] = "MM/dd";
```

JavaScript:

```js
xAxis.get("dateFormats")["day"] = "MM/dd";
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/granularity_day5-1.png "Default format")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/dateaxis_dateformat.png "`dateFormats` modified")

#### Period change date formats

A label representing start of a period, e.g. start of the month when grid uses daily time unit, will be formatted according to different format, by default.

We can turn this behavior off by setting `markUnitChange` setting to `false` on a date axis.

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    markUnitChange: false,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    markUnitChange: false,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

We can also override the date format for such labels.

Similarly to `dateFormats` there's another setting: `periodChangeDateFormats`.

Formats from `periodChangeDateFormats` will be used only for the period beginning labels, like for January 1st in the following example.

TypeScript:

```ts
xAxis.get("periodChangeDateFormats")["day"] = "MMM";
```

JavaScript:

```js
xAxis.get("periodChangeDateFormats")["day"] = "MMM";
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/granularity_day5-1.png "Default format")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/dateaxis_periodchangedateformats.png "Both label and period label formats customized")

Example: [Formatting date axis labels](https://docs.amcharts.com/embeds/v5/formatting-date-axis-labels/). Its code: get_example(path: "examples/docs-demos/formatting-date-axis-labels").

#### Minor grid formats

If you have "[minor grid](https://docs.amcharts.com/v5/charts/xy-chart/axes/#minor-grid)" enabled, its labels (if enabled) will be formatted using the same date formats as the regular axis labels.

Should we nee to, we can specify different formats using axis' setting `minorDateFormats`.

Contrary to other date format lists (e.g. `dateFormats`), this setting is not pre-set to anything, so we need to set it to an object:

TypeScript:

```ts
xAxis.set("minorDateFormats") = {
  millisecond: "ff",
  second: "ss",
  minute: "mm",
  hour: "hh",
  day: "dd",
  week: "dd",
  month: "MM",
  year: "yyyy"
};
```

JavaScript:

```js
xAxis.set("minorDateFormats") = {
  millisecond: "ff",
  second: "ss",
  minute: "mm",
  hour: "hh",
  day: "dd",
  week: "dd",
  month: "MM",
  year: "yyyy"
};
```

### Axis tooltip

There are a few aspects and settings that will affect date format shown in a date axis tooltip. This section will examine those.

#### Base interval based format

Axis will use the date format suitable for the granularity of the data (as set via `baseInterval`) for its tooltip (when [used with cursor](https://docs.amcharts.com/v5/charts/xy-chart/cursor/#axis-tooltips)).

There are defaults set for each available `baseInterval` that provides the best experience.

For example, by default, with daily data granularity, we may have axis labels showing "Jan 1", "Jan 2", etc.

Tooltip would show a more descriptive information for those, i.e. "Jan 1, 2022", "Jan 2, 2022".

These can be overridden using date axis' `tooltipDateFormats` setting.

It works exactly the same way as [label formats](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/#label-date-formats), i.e. by setting appropriate base interval key:

TypeScript:

```ts
xAxis.get("tooltipDateFormats")["day"] = "MM/dd";
```

JavaScript:

```js
xAxis.get("tooltipDateFormats")["day"] = "MM/dd";
```

Here's how defaults look like in International English locale:

```json
{
  "millisecond": "mm:ss SSS MMM dd, yyyy",
  "second": "HH:mm:ss MMM dd, yyyy",
  "minute": "HH:mm MMM dd, yyyy",
  "hour": "HH:mm MMM dd, yyyy",
  "day": "MMM dd, yyyy",
  "week": "MMM dd, yyyy",
  "month": "MMM yyyy",
  "year": "yyyy"
}
```

#### Fixed tooltip format

If we do not want to define different format for each base interval, we can also override it with a single setting: `tooltipDateFormat`.

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    tooltipDateFormat: "MMM d, yyyy",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    tooltipDateFormat: "MMM d, yyyy",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

#### Time offset

A date axis is divided into cells by grid in certain increments. For example there might be a grid line every hour.

Normally, an axis tooltip will display timestamp representing cell's beginning - same as corresponding axis tooltip, even if it does not correspond with the actual position of the cursor line.

This is controlled by axis' `tooltipIntervalOffset` setting.

It's a numeric value denoting how timestamp used for the tooltip should be offset relatively to the length of the cell.

The default of `-0.5` ensures that the tooltip uses a cell's beginning timestamp.

Resetting it to `0` (zero) would make it display timestamp from the actual position of the cursor's line.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/tooltipIntervalOffset_-05.png "`tooltipIntervalOffset: -0.5` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/tooltipIntervalOffset_0.png "`tooltipIntervalOffset: 0`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/tooltipIntervalOffset_05.png "`tooltipIntervalOffset: 0.5`")

## Time zones

A date axis shows dates in the chart's time zone, which is the user's own unless the root element sets another. With `root.timezone` set, the axis follows that zone:

* Grid lines fall at that zone's midnight, hours, weeks, and months.
* Labels and the axis tooltip show date and time in that zone.
* Data items are grouped by that zone's days, weeks, and months.
* Where its clocks change for daylight saving, a day is 23 or 25 hours long.

> **More info:** For how to set it, see "[Root element: Time zone](https://docs.amcharts.com/v5/getting-started/root-element/#time-zone)". To see it in action, check out the "[Time Zones and Daylight Saving](https://www.amcharts.com/demos/time-zones-and-daylight-saving/)" demo.

## Axis date scope

Date axis will automatically calculate its scope (start and end date/time) from the data of actual series that are using it.

There are a few ways to override those start and end timestamps.

### Custom scope

We can set start date using `min` setting of the axis. Similarly, end date can be overridden using `max`.

Those are numeric values of timestamps:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    min: new Date(2021, 0, 1).getTime(),
    max: new Date(2021, 1, 1).getTime(),
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    min: new Date(2021, 0, 1).getTime(),
    max: new Date(2021, 1, 1).getTime(),
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

> **Note:** `new Date(2021, 0, 1)` is midnight in the user's own time zone. If the chart uses UTC (`root.utc = true`), use `Date.UTC(2021, 0, 1)` instead; if it sets `root.timezone`, use the timestamp of midnight in that zone, or the axis will start at an odd hour.

The above will make date axis display scale from Jan 1st to Feb 1st, 2021.

We can specify both `min` and `max`, or just one of them. If either `min` or `max` is not set, the axis will use automatically-calculated value for it.

### Relative scope extension

We can also make date axis expand its scope relatively to automatically-calculated range, using its `extraMin` and `extraMax` settings.

Those are relative values indicating how much of the automatically-calculated value range to add to either `min` or `max`.

For example, `extraMax: 0.1` will make axis expand its scope by 10 past last data item.

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

## Dynamic data item grouping

Date axis can also orchestrate dynamic grouping of series data items.

It works like this: when there are more data items in currently selected time scope, it aggregates data items into larger representative data items.

For example, if we have a year worth of data - 365 days - it can aggregate those into weeks, or 52 data items.

Using grouping, a chart can handle hundreds of thousands of data items, without sacrificing performance and readability of the chart.

Data grouping is also dynamic. If user zooms in, and time scope changes, chart may revert to showing more granular data.

Here's a very basic chart with data grouping and 50K data points:

Example: [Data grouping](https://docs.amcharts.com/embeds/v5/data-grouping/). Its code: get_example(path: "examples/docs-demos/data-grouping").

### Enabling grouping

To enable grouping simply set axis' `groupData` setting to `true`:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

### Grouping threshold

Grouping occurs when there's a number of intervals in current scope is bigger than threshold value, which is 500 by default.

Please note that this is number of intervals, not actual data items.

For example, let's say we have a daily data (`baseInterval: { timeUnit: "day" }`) which spans 10 years.

That means \~3650 base intervals, which is way more than 500.

Grouping kicks in.

The chart now tries to group into weeks, resulting in \~520 weeks, which is still more than 500.

The chart now goes on to months, which gives us just 120 aggregate data items. Threshold is bigger, so that's how the chart will be shown: in monthly increments.

If zoom changes, the chart will re-evaluate the current range and number of intervals in it, and will adjust granularity of displayed data items as necessary.

The threshold can be change using `groupCount` setting:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupCount: 300,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupCount: 300,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

### Grouping intervals

The groups into which the chart will try to group data items is set via `groupIntervals` setting, with the default being this:

```json
groupIntervals: [
  { timeUnit: "millisecond", count: 1 },
  { timeUnit: "millisecond", count: 10 },
  { timeUnit: "millisecond", count: 100 },
  { timeUnit: "second", count: 1 },
  { timeUnit: "second", count: 10 },
  { timeUnit: "minute", count: 1 },
  { timeUnit: "minute", count: 10 },
  { timeUnit: "hour", count: 1 },
  { timeUnit: "day", count: 1 },
  { timeUnit: "week", count: 1 },
  { timeUnit: "month", count: 1 },
  { timeUnit: "year", count: 1 }
]
```

Let's say we don't want to group data items into weeks, or anything smaller than day, we can do this:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [

      { timeUnit: "day", count: 1 },
      { timeUnit: "month", count: 1 },
      { timeUnit: "year", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [

      { timeUnit: "day", count: 1 },
      { timeUnit: "month", count: 1 },
      { timeUnit: "year", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

### Forcing group interval

We can also force the chart to group data items into specific interval, regardless if the threshold (`groupCount`) hasn't been passed.

The setting `groupInterval` is for that:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupInterval: { timeUnit: "month", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupInterval: { timeUnit: "month", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

The above will force grouping into months.

> **Important:** For `groupInterval` to work, the equivalent interval dfinition must be present in `groupIntervals` array.

### Aggregation function

When several data items are grouped, a date axis calculates aggregate values to represent the joint data item.

By default, it will use value from the last data item in group for aggregate data item value, and open value from the first data item for aggregate open value.

Let's examine specific case. Here's a data for data items that go into a single group:

```json
{ date: 1638451170000, value: 120 },
{ date: 1638451190000, value: 90 },
{ date: 1638451190000, value: 145 }
```

For data like that, we probably have the following data fields set up for our series:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    valueXField: "date",
    valueYField: "value"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    valueXField: "date",
    valueYField: "value"
  })
);
```

When the three data items are grouped into a single one, the value for it will be `145` (last data item's value), and the open value `120` (first data point's value).

There's a number of functions that can be used to change aggregation mechanism, each represented by a setting like like `valueYGrouped` and `openValueYGrouped`.

Basically each `*Field` setting has a counterpart `*Grouped` setting.

For example, if we want to calculate aggregate values for `valueYField` as averages from all data items in group, we'd set `valueYGrouped` to `"average"`.

Possible values for any of the aggregate-function settings are: `"open"`, `"close"`, `"low"`, `"high"`, `"average"`, `"sum"`, `"extreme"`.

The following will make series sum up all values from a group, rather than use the last value:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value",
    valueYGrouped: "sum"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value",
    valueYGrouped: "sum"
  })
);
```

For series, that use more than one value, several `*Grouped` settings can be used as well:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",

    valueYField: "value",
    valueYGrouped: "high",

    openValueYField: "open",
    openValueYGrouped: "low"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",

    valueYField: "value",
    valueYGrouped: "high",

    openValueYField: "open",
    openValueYGrouped: "low"
  })
);
```

The above will make columns float starting with the lowest open value and ending with the highest close value.

### Custom aggregation functions

If the built-in aggregation functions are not enough, we can define out own that applies custom logic when calculating aggregate values for grouped data items.

`XYSeries` does have a setting for that: `groupDataCallback`.

We can set it to a function, which will receive group data item as well as the time interval items are grouped into.

The custom function can then do whatever it needs to do to analyze source data items, and modify the end values of the aggregate data item.

TypeScript:

```ts
let series = chart.series.push( 
  am5xy.LineSeries.new(root, { 
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    groupDataWithOriginals: true,
    groupDataCallback: function(dataItem, interval) {
      dataItem.set("valueY", dataItem.get("originals").length)
      dataItem.set("valueYWorking", dataItem.get("originals").length)
    }
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.LineSeries.new(root, { 
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    groupDataWithOriginals: true,
    groupDataCallback: function(dataItem, interval) {
      dataItem.set("valueY", dataItem.get("originals").length)
      dataItem.set("valueYWorking", dataItem.get("originals").length)
    }
  }) 
);
```

The above example replaces actual group value with the number of source data items that comprise the group.

The data item received by custom grouping function contains `originals` setting, which holds a list of all source data items.

If we need to calculate our custom value based on original values, we can iterate through that list to do our calculations.

TypeScript:

```ts
let series = chart.series.push( 
  am5xy.LineSeries.new(root, { 
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    groupDataWithOriginals: true,
    groupDataCallback: function(dataItem, interval) {
      let originals = dataItem.get("originals");
      let high = -10000;
      for (var i = 0; i < originals.length; i++) {
        if (dataItem.get("valueY") > high) {
          high = dataItem.get("valueY");
        }
      }
      dataItem.set("valueY", high)
      dataItem.set("valueYWorking", high)
    }
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.LineSeries.new(root, { 
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    groupDataWithOriginals: true,
    groupDataCallback: function(dataItem, interval) {
      var originals = dataItem.get("originals");
      var high = -10000;
      for (var i = 0; i < originals.length; i++) {
        if (dataItem.get("valueY") > high) {
          high = dataItem.get("valueY");
        }
      }
      dataItem.set("valueY", high)
      dataItem.set("valueYWorking", high)
    }
  }) 
);
```

The above will iterate through "originals" to determine highest value, then use it as a group value.

> **Important:** For `originals` to be included in the related data items, series needs its `groupWithOriginals: true` set.

Example: [Custom data grouping function](https://docs.amcharts.com/embeds/v5/custom-data-grouping-function/). Its code: get_example(path: "examples/docs-demos/custom-data-grouping-function").

### Selectively disabling grouping

Setting `groupData: true` on a date axis will automatically enable grouping for all series attached to it.

We can selectively disable grouping for individual series by setting its `groupDataDisabled`.

TypeScript:

```ts
// Grouping enabled
let series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value"
  })
);

// Grouping disabled
let series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value",
    groupDataDisabled: true
  })
);
```

JavaScript:

```js
// Grouping enabled
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value"
  })
);

// Grouping disabled
var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueXField: "date",
    valueYField: "value",
    groupDataDisabled: true
  })
);
```

### Performance implications

While being powerful tool, data grouping introduces it's own layer of calculations, that can reduce performance of the charts.

In chart setups with a lot of series, or dashboards with a lot of charts that use data grouping, data pre-processing might take significant strain on the CPU.

To optimize the performance, we can follow these guidelines:

#### 1) Use correct data granularity

Make sure that [the `baseInterval` setting](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/#data-granularity) is set to an absolute highest setting that suits the actual data.

#### 2) Tweak group intervals

Normally, series will calculate its aggregate values for all available [grouping intervals](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/#grouping-intervals).

For some data sets some of the intervals might not be applicable and needed.

We can tweak `groupIntervals` list to include only those intervals we absolutely need data grouped to, and save on unnecessary calculations.

For example, if we have a few days worth of minute-based data, it could be enough to let the the series group its data to maximum of an hour:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [
      { timeUnit: "hour", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [
      { timeUnit: "hour", count: 1 }
    ],
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

## Zooming

### Zooming to date range

We can use date axis' method `zoomToDates()` to zoom the axis to specific date range:

TypeScript:

```ts
xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
```

JavaScript:

```js
xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
```

### Pre-zooming

Once data is loaded on some series the date axis gets its scope of dates from, we can use `zoomToDates` to pre-zoom it to some date range:

TypeScript:

```ts
series.events.once("datavalidated", function(ev) {
  ev.target.get("xAxis").zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
});
```

JavaScript:

```js
series.events.once("datavalidated", function(ev) {
  ev.target.get("xAxis").zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
});
```

Read more about pre-zooming using series events in "[Zoom and pan: Pre-zooming axes](https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#pre-zooming-axes)".

## Events

Date axis does not have specific events that are triggered when it is zoomed.

Instead, we can use private setting change events on `selectionMin` and `selectionMax` private settings:

TypeScript:

```ts
xAxis.onPrivate("selectionMin", function(value, target) {
  var start = new Date(value);
  console.log("Start date changed:", start);
});

xAxis.onPrivate("selectionMax", function(value, target) {
  var end = new Date(value);
  console.log("End date changed:", end);
});
```

JavaScript:

```js
xAxis.onPrivate("selectionMin", function(value, target) {
  var start = new Date(value);
  console.log("Start date changed:", start);
});

xAxis.onPrivate("selectionMax", function(value, target) {
  var end = new Date(value);
  console.log("End date changed:", end);
});
```

Example: [Date axis zoom events](https://docs.amcharts.com/embeds/v5/date-axis-zoom-events/). Its code: get_example(path: "examples/docs-demos/date-axis-zoom-events").

## Gapless date axis

There's a special version of the category axis, called "gapless date axis", or `GaplessDateAxis`.

In a nutshell it's a `DateAxis` that removes time periods that there is no data for.

It can be used to display irregularly-spaced date-based data, where maintaining natural time scale is not important, e.g. removing weekends from the axis, because there is not data for those days.

For more information, please refer to "[Gapless date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/gapless-date-axis/)" tutorial.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/dateaxis.png "Regular date axis with irregular data")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/date-axis/categorydateaxis.png "Category date axis with irregular data")

## Related tutorials

* [Additional axis tooltip to display totals](https://docs.amcharts.com/v5/tutorials/additional-axis-tooltip-to-display-totals/)
* [Location of items on date axis and date-based series](https://docs.amcharts.com/v5/tutorials/location-of-items-on-date-axis-and-date-based-series/)
* [Different bullet styling of grouped data items](https://docs.amcharts.com/v5/tutorials/different-bullet-styling-of-grouped-data-items/)
* [Axis zoom end event](https://docs.amcharts.com/v5/tutorials/axis-zoom-end-event/)
* [Dual date axis with both month and year labels](https://docs.amcharts.com/v5/tutorials/dual-date-axis-with-both-month-and-year-labels/)
* [Show a range of dates in a tooltip of a DateAxis when grouping data](https://docs.amcharts.com/v5/tutorials/show-a-range-of-dates-in-a-tooltip-of-a-dateaxis-when-grouping-data/)
