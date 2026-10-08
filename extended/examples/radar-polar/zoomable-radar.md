---
title: "Zoomable Radar"
source: "https://www.amcharts.com/demos/zoomable-radar/"
category: "radar-polar"
scraped: "2026-10-08"
---

A radar chart of stacked columns that zooms every way: drag around the ring, scroll, or use the two scrollbars. Here, a year of website visits by where they came from.

Why zoom a radar chart: A full circle squeezes every category into a thin slice. Zooming opens a few of them up to the whole ring: the horizontal scrollbar picks the months, the vertical one stretches the values out from the middle. The full year stays one click away, behind the zoom-out button.

Good for:
- Months, hours or directions with many slices
- Small values next to big ones: zoom the scale
- Exploring: overview first, then the detail

Think twice when:
- A handful of categories: they fit without zoom
- Printed reports, where nobody can zoom
- Exact comparisons: stacked bars line up better

Prompt: Create a zoomable radar chart of stacked columns showing website visits per month by source (search, direct, social and email). Zoom with the mouse wheel, by dragging around the ring, or with scrollbars for the months and the values. Use the amCharts 5 library with its Responsive theme.

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

// Data: visits to a website per month, in thousands, by where the visitors came from
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [
  { month: "Jan", search: 42, direct: 18, social: 12, email: 6 },
  { month: "Feb", search: 45, direct: 19, social: 14, email: 7 },
  { month: "Mar", search: 51, direct: 21, social: 15, email: 9 },
  { month: "Apr", search: 48, direct: 20, social: 17, email: 8 },
  { month: "May", search: 53, direct: 22, social: 19, email: 9 },
  { month: "Jun", search: 47, direct: 20, social: 22, email: 7 },
  { month: "Jul", search: 41, direct: 17, social: 24, email: 6 },
  { month: "Aug", search: 39, direct: 16, social: 23, email: 6 },
  { month: "Sep", search: 55, direct: 23, social: 18, email: 10 },
  { month: "Oct", search: 58, direct: 24, social: 16, email: 11 },
  { month: "Nov", search: 64, direct: 27, social: 15, email: 14 },
  { month: "Dec", search: 60, direct: 25, social: 13, email: 12 }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false, // no panning by dragging
  panY: false,
  wheelX: "panX", // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX" // ...and the vertical wheel zooms in on some of the months
}));

// Add cursor: dragging across the chart zooms in on the months in between
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false); // no circle following the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 20 // months can be 20px apart before labels are skipped
});
xRenderer.labels.template.setAll({
  radius: 10 // month names 10px outside the circle
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // no panning past January or December
  categoryField: "month",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's month on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5radar.AxisRendererRadial.new(root, {})
}));

// Create series: one stacked column series per source of visits
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, field) {
  var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
    stacked: true, // each source sits on top of the one before
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    categoryXField: "month"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}: {valueY}k visits"
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Search", "search");
createSeries("Direct", "direct");
createSeries("Social", "social");
createSeries("Email", "email");

// Add scrollbars: the horizontal one picks months, the vertical one zooms the values
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

xAxis.data.setAll(data);

// Animate chart
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
