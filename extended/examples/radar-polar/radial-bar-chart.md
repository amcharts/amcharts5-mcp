---
title: "Radial Bar Chart"
source: "https://www.amcharts.com/demos/radial-bar-chart/"
category: "radar-polar"
scraped: "2026-10-08"
---

A stacked bar chart bent into rings: each ring is an age group, and its bar runs around the circle, split by activity. Here, minutes a day spent on the phone.

When a radial bar chart works: Bent into rings, bars take less width and catch the eye, which suits dashboards and infographics. An outer ring is longer than an inner one for the same value, so put the longest bars on the outside and keep the scale in view. For careful comparisons, straight bars are easier to read.

Good for:
- Dashboard tiles and infographics
- A few categories, each with one total
- Totals split into a handful of parts

Think twice when:
- Exact comparisons: outer rings look longer
- Many categories: the inner rings get short
- Long category names: the gap at the top is small

Prompt: Create a stacked radial bar chart of minutes a day spent on the phone by age group and activity (sample data): one ring per age group, the youngest outside, with bars stacked by activity around three quarters of the circle, and a legend of the activities. Use the amCharts 5 library with its Responsive theme.

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

// Data: minutes a day spent on the phone, by age group and activity (sample data)
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [
  { age: "65+", video: 25, social: 15, messaging: 20, games: 10, news: 35 },
  { age: "55-64", video: 35, social: 25, messaging: 25, games: 10, news: 30 },
  { age: "45-54", video: 45, social: 35, messaging: 30, games: 15, news: 25 },
  { age: "35-44", video: 60, social: 50, messaging: 35, games: 20, news: 20 },
  { age: "25-34", video: 80, social: 65, messaging: 40, games: 30, news: 15 },
  { age: "18-24", video: 95, social: 80, messaging: 45, games: 40, news: 10 }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,     // no dragging the plot around
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on part of the scale
  // room around the circle for the minute labels, clear of the legend
  radius: am5.percent(75),
  innerRadius: am5.percent(30), // a hole in the middle, 30% of the radius
  // three quarters of a circle: the empty quarter at the top left holds the age labels
  startAngle: -90,
  endAngle: 180,
  // a vertical layout puts the legend under the chart
  layout: root.verticalLayout
}));

// Every other color of the palette, so the activities stand apart
chart.get("colors").set("step", 2);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on part of the scale
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// The bars run along the circle: minutes a day
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1, // the outer circle, faint
  minGridDistance: 70 // at least 70px between the minute labels
});

xRenderer.labels.template.setAll({
  radius: 10,       // the labels sit 10px outside the circle
  maxPosition: 0.98 // no label at the very end of the scale
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0, // the bars start at zero
  // 10% of room past the longest bar
  extraMax: 0.1,
  numberFormat: "#' min'",           // values shown as "30 min"
  tooltip: am5.Tooltip.new(root, {}) // shows the value under the pointer at the edge
}));

// One ring per age group, the youngest on the outside
var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 10 // small, so every age group keeps its label
});

// the labels end at the top line, in the empty quarter
yRenderer.labels.template.setAll({
  centerX: am5.p100,
  paddingRight: 8,  // 8px from the line
  paddingTop: 0,    // no padding above or below...
  paddingBottom: 0, // ...so the labels fit their rings
  fontSize: 12      // small text, in pixels
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "age",
  renderer: yRenderer
}));

// Create series: one per activity, stacked along each ring
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, field) {
  var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    stacked: true, // each activity starts where the one before it ends
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: field,
    categoryYField: "age"
  }));

  // thin lines in the background color between the stacked pieces
  series.set("stroke", root.interfaceColors.get("background"));
  series.columns.template.setAll({
    width: am5.p100, // each bar fills its ring's whole thickness
    strokeOpacity: 1,
    strokeWidth: 1,
    tooltipText: "{categoryY}, {name}: {valueX} min" // the age group, the activity and its minutes
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Video", "video");
createSeries("Social", "social");
createSeries("Messaging", "messaging");
createSeries("Games", "games");
createSeries("News", "news");


// Add legend: the activities; click one to leave it out
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

yAxis.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
