---
title: "Duration axis"
source: "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/duration-axis/"
scraped: "2026-03-15"
---

A duration axis is used to plot numeric values that signify time duration rather than absolute values. In an essence a duration axis is basically a value axis with differently formatted labels and grid arranged in different increments.

## Base unit

The values that need to be plotted as durations are represented as numbers.

Axis needs to know what they mean.

For example, if we have a value 60, does that mean 60 seconds, minutes, or maybe years?

That's where `baseUnit` setting comes in. We can set it to `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, or `"year"` to indicate what time units our values use.

let yAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  baseUnit:"hour",
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  baseUnit:"hour",
  renderer: am5xy.AxisRendererY.new(root, {})
}));

The above will mean that numeric values should be treated as hours, e.g. a value of 60 will mean 60 hours.

If `baseUnit` is not set for axis, it will use a `baseUnit` set on a [global duration formatter](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/).

## Label format

Duration axis will follow formatting rules set in a global duration formatter.

If `durationFormat` is set on a global formatter, it will be used for all labels. E.g.:

root.numberFormatter.set("durationFormat", "mm:ss");

root.numberFormatter.set("durationFormat", "mm:ss");

If it's not set, the axis will choose a specific duration format which is suitable for specific base unit and scope of the values of the axis.

For more information, refer to "Formatting durations: [Default format](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/#Default_format)".

## Example


