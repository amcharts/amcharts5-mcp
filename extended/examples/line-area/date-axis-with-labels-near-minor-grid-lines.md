---
title: "Date Axis with Labels Near Minor Grid Lines"
source: "https://www.amcharts.com/demos/date-axis-with-labels-near-minor-grid-lines/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart where every day gets a number on the axis: small day numbers along the bottom, week labels under them, so each point’s date is easy to read.

When to number the minor grid: With only main dates on the axis, readers count grid lines to find a day. Numbering the minor grid lines saves them the counting. It suits short ranges, a month or a few weeks, where each day matters.

Good for:
- Daily figures over a month: sales, visits, sign-ups
- Reports read day by day
- Printed charts, where nobody can hover for a date

Think twice when:
- Ranges of many months: the day numbers stop fitting
- Narrow charts on phones: keep the main labels only
- Charts read for the trend, where the exact day doesn’t matter

Prompt: Create a line chart of a month of daily values on a date axis with two rows of labels: small day numbers on the minor grid lines under every day, and the week labels in a second row below them. Add round bullets, a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

// Put the main date labels in a second row, under the day numbers,
// starting at their grid line, so the two rows never overlap
myTheme.rule("AxisLabel", ["x"]).setAll({
  paddingTop: 20,
  centerX: 0,
  location: 0
});

// Day numbers (minor labels) stay in the first row, centered under each day
myTheme.rule("AxisLabel", ["x", "minor"]).setAll({
  paddingTop: 3,
  centerX: am5.p50,
  location: 0.5
});

// Tweak minor grid opacity
myTheme.rule("Grid", ["minor"]).setAll({
  strokeOpacity: 0.08
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,     // the plot doesn't pan when dragged
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans the days
  wheelY: "zoomX", // the vertical wheel zooms in on them
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom into those days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

var date = new Date(); // today at midnight; the data starts the day after
date.setHours(0, 0, 0, 0);
var value = 100;

// the next day's point: a random step of up to 5 from the last value
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

// that many days in a row
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0, // no panning past the first and last day
  baseInterval: {  // one point per day
    timeUnit: "day",
    count: 1
  },
  // Number every day, including the first day of each week
  skipFirstMinor: false,
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // grid lines for the days between the main labels
    // main labels at least 200px apart; the days between them get minor grid lines and labels
    minGridDistance: 200,
    minorLabelsEnabled: true // and labels for them too
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

xAxis.set("minorDateFormats", {
  day: "dd",  // minor labels show two-digit day numbers...
  month: "MM" // ...or month numbers, when the minor steps are months
});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the hovered day's value
  })
}));

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 5 // 5px dots
});

series.bullets.push(function () {
  var bulletCircle = am5.Circle.new(root, {
    fill: series.get("fill") // in the series color
  }, bulletTemplate);
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  })
})

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // drag its grips to zoom in on a range of days
}));

var data = generateDatas(30); // 30 days of data
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
