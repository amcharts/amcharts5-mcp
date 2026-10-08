---
title: "Line Graph"
source: "https://www.amcharts.com/demos/line-graph/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart joins values in time order, so the trend shows at a glance. This one holds 1,200 days of values, and you can zoom into any stretch of them.

When a line chart works: A line chart is the first choice for anything measured over time: it shows direction, speed and turning points in one look. It stays readable with long series, like these 1,200 days, where columns would merge into a solid block.

Good for:
- Prices, traffic or sales over months and years
- Long daily series, with zoom for the detail
- Spotting trends, peaks and dips

Think twice when:
- Categories with no order, like countries: use a bar chart
- A handful of values: columns compare them more clearly
- Ten lines or more: they tangle, so highlight one or split them up

Prompt: Create a zoomable line chart of about three years of daily values, with a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot sideways to pan through the dates
  panY: true,      // and up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  pinchZoomX:true, // pinch with two fingers to zoom the dates on a touch screen
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // dragging the plot pans the chart instead of selecting a range to zoom
  behavior: "none"
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

// one day's point: the value moves randomly by up to 5 from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

// an array of count daily points
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
  // lets the chart pan up to 20% past the first and last date
  maxDeviation: 0.2,
  baseInterval: { // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled:true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

// Hide a date label that would stick out past the right edge of the chart
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    // drag along the value axis labels to zoom it in and out
    pan:"zoom"
  })
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
    labelText: "{valueY}" // the tooltip shows the point's value
  })
}));

// The area under the line is there but clear; raise its opacity to fill it
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a bar above the plot to zoom and scroll through the dates
}));

// Set data
var data = generateDatas(1200);
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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
