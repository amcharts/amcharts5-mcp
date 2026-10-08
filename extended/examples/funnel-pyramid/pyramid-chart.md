---
title: "Pyramid Chart"
source: "https://www.amcharts.com/demos/pyramid-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A pyramid stacks the parts of a whole from the largest at the base to the smallest at the top. Each level’s area matches its share; switch to height to compare.

Area or height?: A pyramid narrows towards the top, so a level sized by its height looks smaller than its value. Sized by area, the default, each level takes the share of the pyramid it stands for. Use a pyramid when the parts have an order, from a broad base to a small top.

Good for:
- Levels with a natural order, base to top
- Customer tiers, team levels or price plans
- Showing how much the base outweighs the top

Think twice when:
- Parts with no order: a pie or bar chart fits better
- Exact comparisons: sloped sides make levels hard to measure
- A base that isn’t the biggest part: the shape will mislead

Prompt: Create a pyramid chart of seven sample categories with the largest at the base, where each level’s area, not its height, matches its share, with labels and a legend. Use the Animated and Responsive themes and the amCharts 5 library.

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
  layout: root.verticalLayout // the legend goes under the pyramid
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PyramidSeries.new(root, {
  orientation: "vertical", // an upright pyramid, slices stacked top to bottom
  valueField: "value",
  categoryField: "category"
}));

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
// reversed, so One sits at the wide base and Seven at the tip
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 3, category: "Seven" }
].reverse());

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear();

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart
  marginTop: 15,            // 15px of space above the legend...
  marginBottom: 15          // ...and below it
}));

// the legend reversed back, so it lists One first
legend.data.setAll(am5.array.copy(series.dataItems).reverse());

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
