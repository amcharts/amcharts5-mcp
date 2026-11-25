---
title: "Sliced chart with multiple series"
source: "https://docs.amcharts.com/embeds/v5/sliced-chart-with-multiple-series/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/percent-charts/sliced-chart"]
---

A demo from the docs page "Funnel, pyramid, and pictorial charts" (get_doc(path: "charts/percent-charts/sliced-chart")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
var series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    name: "Series",
    valueField: "applicants",
    categoryField: "stage",
    orientation: "vertical"
  })
);

series.data.setAll(data);
series.labels.template.set("visible", false);

var series2 = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    valueField: "applicants",
    categoryField: "stage",
    orientation: "vertical"
  })
);

series2.data.setAll(data);
series2.labels.template.set("visible", false);
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
