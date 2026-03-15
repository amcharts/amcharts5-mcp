---
title: "Pictorial Fraction Chart"
source: "https://www.amcharts.com/demos/pictorial-fraction-chart/"
category: "funnel-pyramid"
scraped: "2026-03-15"
---

Pictorial fraction chart is a great way to visualize fractions of a whole using an image depicting that whole as a visual aid. For example, you can visually demonstrate the ingredients of a product using the product's image as a container.
Pie and sliced charts
Funnel, pyramid, and pictorial charts
Pictorial stacked series

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,
  orientation: "vertical",
  valueField: "value",
  categoryField: "category",
  svgPath:
    "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"
}));

series.labelsContainer.set("width", 100);
series.ticks.template.set("location", 0.6);


// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { category: "B", value: 40 },
  { category: "A", value: 60 }
]);


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
chart.set("layout", root.verticalLayout);

var legend = chart.children.moveValue(am5.Legend.new(root, {
  paddingBottom: 15,
  paddingTop: 15,
  x: am5.percent(50),
  dx: -150,
  centerX: am5.p50
}), 0);

legend.markers.template.setAll({ width: 30, height: 30 });
legend.markerRectangles.template.setAll({
  cornerRadiusBL: 20,
  cornerRadiusBR: 20,
  cornerRadiusTL: 20,
  cornerRadiusTR: 20
});

legend.data.setAll(series.dataItems);


// Play  initial se ries animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
