---
title: "Horizontal Funnel"
source: "https://www.amcharts.com/demos/horizontal-funnel/"
category: "funnel-pyramid"
scraped: "2026-10-08"
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

Prompt: Create a horizontal funnel chart of seven sample categories running from left to right, with each slice sloping to the height of the next one, labels on the slices and a legend. Use the Animated and Responsive themes and the amCharts 5 library.

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
var chart = root.container.children.push(
  am5percent.SlicedChart.new(root, {
    layout: root.verticalLayout // the legend goes below the funnel
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
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
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
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
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear();

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50,       // ...at the middle of the chart
    marginTop: 15,    // 15px of space above...
    marginBottom: 15  // ...and below the legend
  })
);

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
