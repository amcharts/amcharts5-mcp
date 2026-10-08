---
title: "Simple Column Chart"
source: "https://www.amcharts.com/demos/simple-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart gives each period its own bar standing on the axis, so the highs and lows stand out. This one holds three weeks of daily values, with a scrollbar to zoom in on a few days.

When a column chart works: Columns suit values counted per period, like sales per day or visitors per week: each column is a total of its own, and the eye compares their heights at once. Keep the value axis at zero, as here, so a column twice as tall means twice as much.

Good for:
- Daily, weekly or monthly totals
- A few dozen periods, zoomed in when needed
- Spotting the busiest and quietest days

Think twice when:
- Hundreds of periods: the columns get thin, so use a line
- Values that don’t count up from zero, like temperatures: use a line
- Several measures per period: cluster or stack the columns

Prompt: Create a zoomable column chart of three weeks of daily values on a date axis, with a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel", ["minor"]).setAll({
  dy:1 // minor axis labels 1px lower
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
  panX: false,     // a drag doesn't pan: the cursor zooms with it
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  paddingLeft:0    // no gap at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // a drag across the plot zooms in to those days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// random data: one value a day, from tomorrow on
var date = new Date();
date.setHours(0, 0, 0, 0); // start at midnight
var value = 60;            // the first value

function generateData() {
  // a random step up or down from the day before, never below 10
  value = Math.max(10, Math.round(value + Math.random() * 30 - 15));
  am5.time.add(date, "day", 1); // the next day
  return {
    date: date.getTime(),
    value: value
  };
}

// a list of count days of data
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
  // no panning past the first and the last day
  maxDeviation: 0,
  baseInterval: { // one column a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled:true,  // fainter grid lines between the labeled days...
    minorLabelsEnabled:true // ...with smaller labels of their own
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

// the minor labels between the main ones show just the day or the month number
xAxis.set("minorDateFormats", {
  "day":"dd",
  "month":"MM"
});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // columns start at zero, so their heights compare truly
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // hover a column for its value
  })
}));

series.columns.template.setAll({ strokeOpacity: 0 }) // no outline

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

var data = generateDatas(21); // three weeks
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
