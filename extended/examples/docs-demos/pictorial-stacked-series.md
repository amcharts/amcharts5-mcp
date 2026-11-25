---
title: "Pictorial stacked series"
source: "https://docs.amcharts.com/embeds/v5/pictorial-stacked-series/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/percent-charts/sliced-chart/pictorial-stacked-series"]
---

A demo from the docs page "Pictorial stacked series" (get_doc(path: "charts/percent-charts/sliced-chart/pictorial-stacked-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
var shape =
  "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z";

var series = chart.series.push(
  am5percent.PictorialStackedSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    svgPath: shape
  })
);

series.data.setAll(data);

series.labels.template.set("visible", false);
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
