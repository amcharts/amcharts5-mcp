---
title: "Simple Pie Chart"
source: "https://www.amcharts.com/demos/simple-pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
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

Prompt: Create a basic pie chart of seven sample categories, each slice in its own color, with labels around the pie and tooltips showing each category’s share. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout // a legend added to the chart would go below the pie
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category"
}));

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" },
]);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
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
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
