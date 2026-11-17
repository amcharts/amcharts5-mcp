---
title: "Timeline chart"
source: "https://docs.amcharts.com/embeds/v5/timeline-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/timeline"]
---

A demo from the docs page "Timeline chart" (get_doc(path: "charts/timeline")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(am5timeline.CurveChart.new(root, {}));

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105
  }
];

// Create axes
var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  axisLocation: 0,
  axisLength: 150
});

var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
  points: [
    { x: 0, y: -300 },
    { x: 300, y: -300 },
    { x: 346.9, y: -296.3 },
    { x: 392.7, y: -285.3 },
    { x: 436.2, y: -267.3 },
    { x: 476.3, y: -242.7 },
    { x: 512.1, y: -212.1 },
    { x: 542.7, y: -176.3 },
    { x: 567.3, y: -136.2 },
    { x: 585.3, y: -92.7 },
    { x: 596.3, y: -46.9 },
    { x: 600, y: 0 },
    { x: 596.3, y: 46.9 },
    { x: 585.3, y: 92.7 },
    { x: 567.3, y: 136.2 },
    { x: 542.7, y: 176.3 },
    { x: 512.1, y: 212.1 },
    { x: 476.3, y: 242.7 },
    { x: 436.2, y: 267.3 },
    { x: 392.7, y: 285.3 },
    { x: 346.9, y: 296.3 },
    { x: -300, y: 300 },
    { x: -346.9, y: 296.3 },
    { x: -392.7, y: 285.3 },
    { x: -436.2, y: 267.3 },
    { x: -476.3, y: 242.7 },
    { x: -512.1, y: 212.1 },
    { x: -542.7, y: 176.3 },
    { x: -567.3, y: 136.2 },
    { x: -585.3, y: 92.7 },
    { x: -596.3, y: 46.9 },
    { x: -600, y: 0 },
    { x: -596.3, y: -46.9 },
    { x: -585.3, y: -92.7 },
    { x: -567.3, y: -136.2 },
    { x: -542.7, y: -176.3 },
    { x: -512.1, y: -212.1 },
    { x: -476.3, y: -242.7 },
    { x: -436.2, y: -267.3 },
    { x: -392.7, y: -285.3 },
    { x: -346.9, y: -296.3 },
    { x: 0, y: -300 }
  ],

  yRenderer: yRenderer,
  rotateLabels: true
});

xRenderer.labels.template.setAll({
  paddingTop: 40
});

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: yRenderer
  })
);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: xRenderer
  })
);

// Create series
var series = chart.series.push(
  am5timeline.CurveColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.columns.template.setAll({
  width: am5.percent(70)
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// Add cursor
var cursor = chart.set(
  "cursor",
  am5timeline.CurveCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis,
    yAxis: yAxis
  })
);

series.appear(1000);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
