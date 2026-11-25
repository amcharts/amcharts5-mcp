---
title: "Donut Chart"
source: "https://www.amcharts.com/demos/donut-chart/"
category: "pie-donut"
scraped: "2026-11-25"
---

A pie chart with the middle cut out. It shows how a whole splits into parts, and the hole holds the total: here, a $3,000 monthly budget.

When a donut chart works: A donut chart answers one question: how is a total divided? Each slice is a share of the whole, so it reads best with a handful of slices and one clear winner.

Good for:
- Budget, revenue or spending by category
- Survey answers and market share
- Progress towards one goal, with the number in the middle

Think twice when:
- More than six or seven slices: the small ones become unreadable
- Shares that are close to each other: a bar chart shows small differences better
- Change over time: use a line or column chart

Prompt: Create a donut chart of a monthly household budget split into six spending categories, with the category names curved along the ring, the total written in the hole, and a legend. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Hole size, Rounded corners, Labels, Start angle, End angle, Slice shift, Legend, Legend position.

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
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout, // the legend goes below the donut
  innerRadius: am5.percent(55) // a hole 55% of the radius turns the pie into a donut
}));

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  alignLabels: false // labels stay on their slices, not lined up in columns at the sides
}));

// Labels follow the curve of the ring; the values are in the tooltips and the legend
series.labels.template.setAll({
  textType: "circular",
  text: "{category}", // just the name
  centerX: 0,         // no centering shift: the curved text keeps to its slice...
  centerY: 0          // ...instead of moving by half its own size
});

series.slices.template.setAll({
  // name, amount and share of the total, as "Food: $540 (18.0%)"
  tooltipText: "{category}: ${value} ({valuePercentTotal.formatNumber('0.0')}%)"
});

// The total, in the hole
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/
series.children.push(am5.Label.new(root, {
  text: "[fontSize:13px]Monthly budget[/]\n[bold fontSize:26px]${valueSum.formatNumber('#,###')}[/]",
  // fills in {valueSum} from the series the label belongs to
  populateText: true,
  textAlign: "center",      // the two lines centered on each other
  centerX: am5.percent(50), // the label's middle on the donut's center
  centerY: am5.percent(50)
}));

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#setting-data
series.data.setAll([
  { value: 1050, category: "Housing" },
  { value: 540, category: "Food" },
  { value: 420, category: "Transport" },
  { value: 390, category: "Savings" },
  { value: 330, category: "Health" },
  { value: 270, category: "Leisure" }
]);

// Create legend
// https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart
  marginTop: 15,            // 15px of space above...
  marginBottom: 15          // ...and below the legend
}));

legend.data.setAll(series.dataItems);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  ariaLabel: "Donut chart of a $3,000 monthly budget in six categories. Tab to the slices, then move between them with the up and down arrow keys"
});
// the slices: one Tab stop (a focusable group), the arrow keys step through them; Enter pulls one out
series.slices.template.setAll({
  focusable: true,
  focusableGroup: "slices",
  hoverOnFocus: true, // a focused slice shows its tooltip
  ariaLabel: "{category}: ${value}, {valuePercentTotal.formatNumber('0.0')}%"
});
// the legend: one Tab stop too, after the slices; the arrow keys step through its items, and Enter hides or shows one
legend.itemContainers.template.setAll({
  focusableGroup: "legend",
  tabindexOrder: 10 // the chart's parts are focused in this order, from low to high (0 if not set)
});

// Play initial series animation
// https://docs.amcharts.com/v5/concepts/animations/#animation-of-series
series.appear(1000, 100);
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
