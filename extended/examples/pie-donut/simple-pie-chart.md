---
title: "Simple Pie Chart"
source: "https://www.amcharts.com/demos/simple-pie-chart/"
category: "pie-donut"
scraped: "2026-11-25"
---

A pie chart with nothing extra: seven values, seven slices, and no legend or settings in the way. A clean starting point for your own.

What a pie chart needs: Just a list of categories and their values. The chart works out each slice’s share of the total, so the numbers can be counts, money or hours. They only need to describe parts of one whole.

Good for:
- A quick look at how something splits
- Data straight from a spreadsheet: one column of names, one of numbers
- A first draft to style later

Think twice when:
- Negative values: a slice can’t be smaller than nothing
- Numbers that overlap, like survey answers where people could pick several
- The same split across several years: use stacked columns

Prompt: Create a basic pie chart of seven sample categories, each slice in its own color, with labels around the pie and tooltips showing each category’s share. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Hole size, Pie size, Rounded corners, Labels, Start angle, End angle, Slice shift.

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
  layout: root.verticalLayout // a legend added to the chart would go below the pie
}));

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category"
}));

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#setting-data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" },
]);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  ariaLabel: "Pie chart of seven values and their share. Tab to the slices, then move between them with the up and down arrow keys"
});
// the slices: one Tab stop (a focusable group), the arrow keys step through them; Enter pulls one out
series.slices.template.setAll({
  focusable: true,
  focusableGroup: "slices",
  hoverOnFocus: true, // a focused slice shows its tooltip
  ariaLabel: "{category}: {value}, {valuePercentTotal.formatNumber('0.0')}%"
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
