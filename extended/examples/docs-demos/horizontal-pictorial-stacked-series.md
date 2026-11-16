---
title: "Horizontal pictorial stacked series"
source: "https://docs.amcharts.com/embeds/v5/horizontal-pictorial-stacked-series/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/percent-charts/sliced-chart/pictorial-stacked-series"]
---

A demo from the docs page "Pictorial stacked series" (get_doc(path: "charts/percent-charts/sliced-chart/pictorial-stacked-series")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.SlicedChart.new(root, {
    layout: root.horizontalLayout
  })
);

// Define data
var data = [
  {
    stage: "Stage #1",
    applicants: 100
  },
  {
    stage: "Stage #2",
    applicants: 70
  },
  {
    stage: "Stage #3",
    applicants: 35
  },
  {
    stage: "Stage #4",
    applicants: 10
  }
];

// Create series
var horizontalShape =
  "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";

var series = chart.series.push(
  am5percent.PictorialStackedSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal",
    svgPath: horizontalShape
  })
);

series.data.setAll(data);

series.labels.template.set("visible", false);
series.ticks.template.set("visible", false);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
