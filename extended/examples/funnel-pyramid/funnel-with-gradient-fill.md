---
title: "Funnel with Gradient Fill"
source: "https://www.amcharts.com/demos/funnel-with-gradient-fill/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

A funnel where every slice is dark at the edges and light in the middle, so it looks round, like a stack of tubes. The shading is made from each slice’s own color, so it follows any theme.

When a gradient helps: A gradient adds depth without adding colors: each slice gets a highlight and two darker edges, all made from its own color. It helps a funnel stand out on a landing page or a slide. The numbers read the same as in a flat funnel, so choose it for the look.

Good for:
- Landing pages and presentations
- Infographics that need some depth
- Brand palettes: the shading adapts to any color

Think twice when:
- Dense dashboards: flat color is calmer
- Black-and-white print: the dark edges can merge
- Small charts, where the shading turns muddy

Prompt: Create a vertical funnel chart of seven sample categories where each slice has a horizontal gradient of its own color, darker at the edges and brighter in the middle, for a softly rounded look, with labels on the slices and a legend. Use the Animated and Responsive themes and the amCharts 5 library.

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
    alignLabels: false,      // labels sit on the slices, not in a column beside the funnel
    orientation: "vertical", // the funnel runs from top to bottom
    valueField: "value",
    categoryField: "category"
  })
);

// make fills gradients
series.slices.template.setAll({
  strokeOpacity: 0, // no outline
  fillGradient: am5.LinearGradient.new(root, {
    // left to right: darker at the edges, lighter in the middle, so each slice looks rounded
    rotation: 0,
    stops: [{ brighten: -0.15 }, { brighten: 0.2 }, { brighten: -0.15 }]
  })
});

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
