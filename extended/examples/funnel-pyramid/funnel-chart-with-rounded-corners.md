---
title: "Funnel Chart with Rounded Corners"
source: "https://www.amcharts.com/demos/funnel-chart-with-rounded-corners/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A funnel of four rounded, evenly spaced slices, with the labels lined up at the side. Each slice slopes to the width of the next, so the outline stays smooth.

When rounded corners help: Rounded corners and gaps turn a funnel into separate, friendly blocks. They suit a short process with a few clear steps, on a dashboard or a slide. With many steps, the gaps take room the slices need.

Good for:
- Short processes of three to five steps
- Dashboards with a soft, rounded style
- Slides that walk through the steps one by one

Think twice when:
- Ten steps or more: the gaps eat the space
- Values far apart: the small slices get too thin to round
- When the exact drop between steps matters: label the rates

Prompt: Create a vertical funnel chart of four sample stages where each slice slopes down to the width of the next one, with rounded corners and small gaps instead of links, labels with ticks, and a legend. Use the Animated and Responsive themes and the amCharts 5 library.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout // the legend goes below the funnel
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.FunnelSeries.new(root, {
  alignLabels: true,       // the labels line up in a column beside the funnel
  orientation: "vertical", // the funnel runs from top to bottom
  valueField: "value",
  categoryField: "category",
  // each slice narrows to the width of the next one, giving the funnel its shape
  bottomRatio: 1
}));

series.slices.template.setAll({
  cornerRadiusBL: 5, // 5px rounded corners on every slice
  cornerRadiusBR: 5,
  cornerRadiusTL: 5,
  cornerRadiusTR: 5
})
// the links between the slices are hidden but keep their 5px height, a gap between slices
series.links.template.setAll({
  forceHidden: true,
  height: 5
})

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" }
]);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear();

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50,       // ...at the middle of the chart
  marginTop: 15,    // 15px of space above...
  marginBottom: 15  // ...and below the legend
}));

legend.data.setAll(series.dataItems);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
