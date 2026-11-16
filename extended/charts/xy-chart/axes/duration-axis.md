---
title: "Duration axis"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/duration-axis/"
scraped: "2026-11-16"
---

A duration axis is used to plot numeric values that signify time duration rather than absolute values. In an essence a duration axis is basically a value axis with differently formatted labels and grid arranged in different increments.

## Base unit

The values that need to be plotted as durations are represented as numbers.

Axis needs to know what they mean.

For example, if we have a value 60, does that mean 60 seconds, minutes, or maybe years?

That's where `baseUnit` setting comes in. We can set it to `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, or `"year"` to indicate what time units our values use.

TypeScript:

```ts
let yAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  baseUnit:"hour",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
```

JavaScript:

```js
var yAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  baseUnit:"hour",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
```

The above will mean that numeric values should be treated as hours, e.g. a value of 60 will mean 60 hours.

If `baseUnit` is not set for axis, it will use a `baseUnit` set on a [global duration formatter](https://docs.amcharts.com/v5/concepts/formatters/formatting-durations/).

## Label format

Duration axis will follow formatting rules set in a global duration formatter.

If `durationFormat` is set on a global formatter, it will be used for all labels. E.g.:

TypeScript:

```ts
root.numberFormatter.set("durationFormat", "mm:ss");
```

JavaScript:

```js
root.numberFormatter.set("durationFormat", "mm:ss");
```

If it's not set, the axis will choose a specific duration format which is suitable for specific base unit and scope of the values of the axis.

For more information, refer to "Formatting durations: [Default format](https://docs.amcharts.com/v5/concepts/formatters/formatting-durations/#default-format)".

## Example

Example: [Duration axis](https://docs.amcharts.com/embeds/v5/duration-axis/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

var data = [
  { date: new Date(2021, 0, 1).getTime(), duration: 600 },
  { date: new Date(2021, 0, 2).getTime(), duration: 100 },
  { date: new Date(2021, 0, 3).getTime(), duration: 120 },
  { date: new Date(2021, 0, 4).getTime(), duration: 420 },
  { date: new Date(2021, 0, 5).getTime(), duration: 500 },
  { date: new Date(2021, 0, 6).getTime(), duration: 600 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.DurationAxis.new(root, {
    baseUnit: "minute",
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "duration",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```
