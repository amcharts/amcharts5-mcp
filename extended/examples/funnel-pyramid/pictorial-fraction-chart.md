---
title: "Pictorial Fraction Chart"
source: "https://www.amcharts.com/demos/pictorial-fraction-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A fraction shown as a picture: the cup is the whole, filled 60% coffee and 40% milk. The shape says what the numbers are about before anyone reads a label.

When a picture beats a pie: A pictorial fraction chart does the job of a two-slice pie, in a shape people know at once. It works best for one simple split when the shape is the subject: a cup for drinks, a battery for charge, a person for people.

Good for:
- One headline split in an infographic
- Shares tied to an object: drinks, fuel, storage
- Posters and social images that must read at a glance

Think twice when:
- More than three or four parts: the bands get thin
- Readers who judge by area: the bands split the height, and the cup narrows
- Comparing several splits: use stacked bars

Prompt: Create a pictorial stacked chart that fills the outline of a coffee cup with two parts, milk on top of coffee, each as tall as its share, with percentage labels and a legend. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout // the legend and the cup stacked top to bottom
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,       // labels line up in a column beside the cup
  orientation: "vertical", // slices stacked top to bottom
  valueField: "value",
  categoryField: "category",
  svgPath: // the cup outline as an SVG path
    "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z"
}));

series.labelsContainer.set("width", 100); // 100px of room for the labels
// ticks start at 60% of a slice's width, a little right of its middle
series.ticks.template.set("location", 0.6);

// Whole percentages, in the labels and the tooltips
series.labels.template.set("text", "{category}: {valuePercentTotal.formatNumber('0p')}");
series.slices.template.set("tooltipText", "{category}: {valuePercentTotal.formatNumber('0p')}");

// Set data: the first item fills the top of the cup
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { category: "Milk", value: 40 },
  { category: "Coffee", value: 60 }
]);

// Add legend, above the cup
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.moveValue(am5.Legend.new(root, {
  paddingBottom: 15,  // 15px above...
  paddingTop: 15,     // ...and below the legend
  x: am5.percent(50), // the legend's middle at the middle of the chart's width
  centerX: am5.p50
}), 0);

legend.markers.template.setAll({ width: 30, height: 30 }); // 30px markers...
legend.markerRectangles.template.setAll({
  cornerRadiusBL: 20, // ...rounded into circles
  cornerRadiusBR: 20,
  cornerRadiusTL: 20,
  cornerRadiusTR: 20
});

// The labels show the shares, so the legend names the parts only
legend.valueLabels.template.set("forceHidden", true);

legend.data.setAll(series.dataItems); // one legend item per slice

// Play initial series animation
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
