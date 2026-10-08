---
title: "Line Chart with Scroll and Zoom"
source: "https://www.amcharts.com/demos/line-chart-with-scroll-and-zoom/"
category: "line-area"
scraped: "2026-10-08"
---

Five and a half years of daily values. The scrollbar on top holds a small copy of the whole line, so you can see where you are while you zoom into a few weeks.

When a scrollbar preview helps: Zoom into years of daily data and the big picture is gone. A preview in the scrollbar keeps it on screen, with the zoomed part highlighted, and moving to another stretch takes one drag.

Good for:
- Long daily or hourly series: prices, traffic, sensors
- Finding one event and zooming into it
- Dashboards where people explore on their own

Think twice when:
- Short series that fit the width: skip the scrollbar
- Small screens: the preview takes height from the chart
- Printed charts, where nobody can drag

Prompt: Create a zoomable line chart of about 2,000 daily values with a horizontal scrollbar that holds a miniature preview of the whole series. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot to pan...
  panY: true,       // ...in any direction
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag over the plot pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

// the next day's data point, a few points up or down from the last
function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);

  am5.time.add(date, "day", 1);
  return { date: date.getTime(), value: value };
}

// count days of data in a row
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
  baseInterval: { timeUnit: "day", count: 1 }, // one data point per day
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // faint grid lines between the main ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
}));

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
    labelText: "{valueY}" // the hovered value
  })
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // a scrollbar above the plot, with a preview of the data...
  height: 60                 // ...60px tall
}));

// the scrollbar holds a small chart of its own: these axes and series draw its preview of the data
var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { // one point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // faint grid lines between the main ones
    minGridDistance: 70     // at least 70px between date labels
  })
}));

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "value",
  valueXField: "date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

var data = generateDatas(2000);
series.data.setAll(data);
sbSeries.data.setAll(data); // the preview gets the same data

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
