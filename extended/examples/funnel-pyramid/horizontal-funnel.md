---
title: "Horizontal Funnel"
source: "https://www.amcharts.com/demos/horizontal-funnel/"
category: "funnel-pyramid"
scraped: "2026-11-25"
---

A funnel turned on its side, so the stages read left to right like a timeline. The slices slope into each other and carry their own labels.

When to turn a funnel sideways: A horizontal funnel fits wide, short spaces, like a strip across a dashboard or the top of a report, and reads left to right like a timeline. The labels turn to fit the slices, so keep the stage names short.

Good for:
- Wide dashboard rows
- Processes people think of as a timeline
- A few stages with short names

Think twice when:
- Long stage names: a vertical funnel has room for them
- Phones held upright: the funnel gets very thin
- Many stages: the last slices get too narrow to label

Prompt: Create a horizontal funnel chart of seven sample categories running from left to right, with each slice sloping to the height of the next one, labels on the slices and a legend. Use the Animated and ResponsiveMax themes and the amCharts 5 library.

The demo's page on amcharts.com adds controls that are not part of this code: Taper, Gap between slices, Labels, Legend, Legend position.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(
  am5percent.SlicedChart.new(root, {
    layout: root.verticalLayout // the legend goes below the funnel
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#series
var series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    // labels sit on the slices instead of in a row beside the funnel
    alignLabels: false,
    orientation: "horizontal", // the funnel runs from left to right
    valueField: "value",
    categoryField: "category",
    // each slice narrows to the height of the next one, giving the funnel its shape
    bottomRatio: 1
  })
);

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#setting-data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" }
]);

// Play initial series animation
// https://docs.amcharts.com/v5/concepts/animations/#animation-of-series
series.appear();

// Create legend
// https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50,       // ...at the middle of the chart
    marginTop: 15,    // 15px of space above...
    marginBottom: 15  // ...and below the legend
  })
);

legend.data.setAll(series.dataItems);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  ariaLabel: "Horizontal funnel chart of seven values, from the largest at the left to the smallest at the right. Tab to the slices, then move between them with the up and down arrow keys"
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
