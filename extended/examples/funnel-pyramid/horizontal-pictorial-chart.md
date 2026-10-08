---
title: "Horizontal Pictorial Chart"
source: "https://www.amcharts.com/demos/horizontal-pictorial-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

Seven values fill a sausage-shaped outline from left to right, each slice as wide as its share. Any SVG path can be the outline.

When to fill a shape sideways: A horizontal pictorial chart suits wide shapes, like a sausage, a train or a battery, and wide spaces such as a banner. The slices split the width, so a shape that bends or tapers makes some slices look bigger than their share.

Good for:
- Wide shapes: batteries, trains, progress bars
- Banners and wide dashboard rows
- Playful infographics

Think twice when:
- Tall, narrow spaces: use an upright shape
- Exact comparisons: the curves distort the slices
- Many small values: the last slices get too thin to label

Prompt: Create a horizontal pictorial stacked chart that fills a sausage-shaped outline from left to right with seven sample categories, each part as wide as its share, with labels below the shape showing the name and the share. Use the Animated and Responsive themes and the amCharts 5 library.

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
  layout: root.verticalLayout,
  paddingLeft: 80, // 80px of space on the left...
  paddingRight: 80 // ...and on the right
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,         // the labels line up in a row under the shape
  orientation: "horizontal", // the slices run from left to right
  valueField: "value",
  categoryField: "category",
  // the shape the slices fill, as SVG path data
  svgPath: "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z"
}));

// each tick starts 80% of the way down its slice, towards the labels below
series.ticks.template.set("location", 0.8);

// The shape is scaled to the chart's width, so the labels under it are kept short:
// name and share on two lines, leaving the height to the shape
series.labels.template.set("text", "{category}\n{valuePercentTotal.formatNumber('0.0p')}");
// the tooltip, as "One: 26.3%"
series.slices.template.set("tooltipText", "{category}: {valuePercentTotal.formatNumber('0.0p')}");

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
