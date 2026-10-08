---
title: "Funnel Chart"
source: "https://www.amcharts.com/demos/funnel-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A funnel chart shows how a number shrinks as people move through the steps of a process. Here, a month in an online store, from 10,000 visits to 2,300 payments.

When a funnel chart works: A funnel fits a process where each step keeps only part of the one before: visitors who become buyers, applicants who get hired. The narrowing shows at once where most people drop out, here between viewing a product and adding it to the cart.

Good for:
- Sales and sign-up funnels
- Hiring, from applications to offers
- Finding the step where most people leave

Think twice when:
- Steps that aren’t a sequence: a bar chart compares them better
- Two funnels to compare, like this month and last: try grouped bars
- Counts that can grow from one step to the next: a funnel reads as always narrowing

Prompt: Create a vertical funnel chart of a month in an online store, with five stages from visiting the store to paying, each as wide as its count and joined to the next by a see-through link. Add a legend that hides a stage when clicked. Use the Animated and Responsive themes and the amCharts 5 library.

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
  // labels sit on the slices instead of in a column beside the funnel
  alignLabels: false,
  orientation: "vertical", // the funnel runs from top to bottom
  valueField: "value",
  categoryField: "category"
}));

// Each stage shows how many people got that far
series.labels.template.set("text", "{category}: {value}"); // as "Paid: 2,300"

// Set data: a month in an online store, from first visit to payment
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { value: 10000, category: "Visited the store" },
  { value: 7600, category: "Viewed a product" },
  { value: 4200, category: "Added to cart" },
  { value: 2900, category: "Started checkout" },
  { value: 2300, category: "Paid" }
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

// The slices already show the numbers, so the legend lists the stages only
legend.valueLabels.template.set("forceHidden", true);

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
