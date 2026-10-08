---
title: "Pie Chart with Legend"
source: "https://www.amcharts.com/demos/pie-chart-with-legend/"
category: "pie-donut"
scraped: "2026-10-08"
---

A pie chart with a legend under it. The legend names every slice and works as a switch: click an item and the pie redraws without it.

Legend or labels?: Labels next to the slices are the quickest to read, but they crowd the chart when names are long or slices are thin. A legend moves the names out of the way, and lets people switch slices off to see how the rest share the total.

Good for:
- Long category names
- Many small slices that labels can’t fit
- Letting people leave out a part, like Other

Think twice when:
- Two or three slices: label them directly
- Colors that look alike: matching them to the legend gets hard
- Small screens: a legend under the pie makes the pie smaller

Prompt: Create a pie chart of seven sample categories with labels around the pie and a legend; clicking a legend item hides or shows its slice. Use the amCharts 5 library with its Responsive theme.

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
  layout: root.verticalLayout // the pie and the legend stacked top to bottom
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

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart's width
  marginTop: 15,            // 15px above...
  marginBottom: 15          // ...and below it
}));

legend.data.setAll(series.dataItems); // one legend item per slice

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
