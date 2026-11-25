---
title: "Pyramid Chart"
source: "https://www.amcharts.com/demos/pyramid-chart/"
category: "funnel-pyramid"
scraped: "2026-11-25"
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

Prompt: Create a pyramid chart of seven sample categories with the largest at the base, where each level’s area, not its height, matches its share, with labels and a legend. Use the Animated and ResponsiveMax themes and the amCharts 5 library.

The demo's page on amcharts.com adds controls that are not part of this code: Size slices by, Top width, Labels, Legend, Legend position.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// Create chart
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout // the legend goes under the pyramid
}));

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#series
var series = chart.series.push(am5percent.PyramidSeries.new(root, {
  orientation: "vertical", // an upright pyramid, slices stacked top to bottom
  valueField: "value",
  categoryField: "category"
}));

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#setting-data
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
// https://docs.amcharts.com/v5/concepts/animations/#animation-of-series
series.appear();

// Create legend
// https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart
  marginTop: 15,            // 15px of space above the legend...
  marginBottom: 15          // ...and below it
}));

// the legend reversed back, so it lists One first
legend.data.setAll(am5.array.copy(series.dataItems).reverse());

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  ariaLabel: "Pyramid chart of seven values, from the largest at the base to the smallest at the tip. Tab to the levels, then move between them with the up and down arrow keys"
});
// the slices: one Tab stop (a focusable group), the arrow keys step through them
series.slices.template.setAll({
  focusable: true,
  focusableGroup: "slices",
  ariaLabel: "{category}: {value}, {valuePercentTotal.formatNumber('0.0')}%"
});
// the legend: one Tab stop too, after the slices; the arrow keys step through its items, and Enter hides or shows one
legend.itemContainers.template.setAll({
  focusableGroup: "legend",
  tabindexOrder: 10 // the chart's parts are focused in this order, from low to high (0 if not set)
});

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
