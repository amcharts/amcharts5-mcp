---
title: "Column with Rotated Labels"
source: "https://www.amcharts.com/demos/column-with-rotated-series/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart with its axis labels turned on their side, so eleven country names fit under narrow columns without overlapping. Each column has its own color.

When to turn the labels: Long category names under narrow columns run into each other. Turning them on their side keeps every name readable without shortening it, at the cost of some height under the plot. It works for a dozen or two categories; with many more, a horizontal bar chart reads more easily.

Good for:
- Country, product or team names under narrow columns
- A dozen or two categories
- Rankings from largest to smallest

Think twice when:
- Very long names: a bar chart lays them out level
- Short names that fit level: keep them level, they read faster
- Dozens of categories: show the top ten, or let people zoom

Prompt: Create a column chart comparing eleven countries, each column in its own color, with the country names rotated to run vertically under their columns. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot sideways to pan...
  panY: true,       // ...or up and down
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX",  // the vertical wheel zooms in on the countries
  pinchZoomX: true, // pinch to zoom on touch screens
  paddingLeft: 0,   // the value labels sit at the chart's left edge
  // room on the right, so the last label still fits when the labels are turned to fall right (45 degrees)
  paddingRight: 40
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30,   // a label for every country down to 30px apart
  minorGridEnabled: true // a grid line for every country, even one whose label is skipped
});

// vertical labels that read upward and end 15px below the axis
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

xRenderer.grid.template.setAll({
  // draw each grid line at the end of its country's cell instead of at its start
  location: 1
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,                 // pan up to 30% of the visible range past the first and last country
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the country on the axis
}));

var yRenderer = am5xy.AxisRendererY.new(root, {
  strokeOpacity: 0.1 // a faint axis line
})

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // the values can be panned 30% past their range too
  // columns start at zero, so their heights compare truly
  min: 0,
  renderer: yRenderer
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true, // the columns grow one after another
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the hovered column's value
  }),
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

// rounded top corners, no outline
series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
// Set data
var data = [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1882
}, {
  country: "Japan",
  value: 1809
}, {
  country: "Germany",
  value: 1322
}, {
  country: "UK",
  value: 1122
}, {
  country: "France",
  value: 1114
}, {
  country: "India",
  value: 984
}, {
  country: "Spain",
  value: 711
}, {
  country: "Netherlands",
  value: 665
}, {
  country: "South Korea",
  value: 443
}, {
  country: "Canada",
  value: 441
}];

xAxis.data.setAll(data);
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
