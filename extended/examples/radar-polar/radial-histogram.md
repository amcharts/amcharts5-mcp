---
title: "Radial Histogram"
source: "https://www.amcharts.com/demos/radial-histogram/"
category: "radar-polar"
scraped: "2026-10-08"
---

A column chart bent into a ring: twenty bars stand around an open middle, each in its own color, with a gap at the top for the scale.

When a radial histogram works: Bent around a circle, a column chart takes less width and catches the eye, which suits a dashboard tile or an infographic. The bars grow outwards, so the outer ones look bigger than they are: for careful comparisons, keep the columns straight.

Good for:
- Dashboards and infographics with little width
- Cycles: hours of the day, months, days of the year
- Twenty or more bars that would crowd a row

Think twice when:
- Exact comparisons: straight columns are easier
- A few bars: a plain column chart is clearer
- Long category names: there is little room around the ring

Prompt: Create a radial histogram of 20 numbered categories with random values: columns around most of a circle with a hole in the middle, each in its own color, with the value scale in the gap at the top. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,    // no dragging the plot around
  panY: false,
  wheelX: "none", // the wheel doesn't zoom...
  wheelY: "none", // ...so the page scrolls past the chart
  // almost a full circle, with a 12-degree gap at the top
  startAngle: -84,
  endAngle: 264,
  innerRadius: am5.percent(40) // a hole in the middle, 40% of the radius
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
const cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on some columns
}));
cursor.lineY.set("forceHidden", true); // no circle through the pointer, only the line from the center

// Add scrollbar, under the chart (opposite), hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true,
  exportable: false, // left out of exported images
  forceHidden: true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 30 // at least 30px between the column labels
});

xRenderer.grid.template.set("forceHidden", true); // no lines between the columns

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // can't be zoomed or panned past the first or last column
  categoryField: "category",
  renderer: xRenderer
}));

var yRenderer = am5radar.AxisRendererRadial.new(root, {});
yRenderer.labels.template.set("centerX", am5.p50); // value labels centered on the axis line

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0, // the columns start at zero
  renderer: yRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  name: "Series 1",
  // on load the columns grow one after another
  sequencedInterpolation: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category",
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadius: 5,
  tooltipText: "{categoryX}: {valueY}" // the column's number and its value
});

// Set data
var data = [];

// 20 columns, numbered 1 to 20, with random values from 0 to 100
for (var i = 1; i < 21; i++) {
  data.push({ category: i, value: Math.round(Math.random() * 100) });
}

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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
