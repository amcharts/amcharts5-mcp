---
title: "Chart with an HTML title"
source: "https://docs.amcharts.com/embeds/v5/chart-with-an-html-title/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/html-content"]
---

A demo from the docs page "HTML content" (get_doc(path: "concepts/common-elements/html-content")).

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
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series1.data.setAll(data);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #2",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// Add an HTML-enabled title
chart.children.unshift(
  am5.Label.new(root, {
    html: '<div style="text-align: center;"><img src="https://www.amcharts.com/lib/amcharts.svg" width="100" /><p style="font-size: 20px;">Investment breakdown</p></div>',
    x: am5.percent(50),
    centerX: am5.percent(50),
    paddingTop: 0,
    paddingBottom: 0
  })
);
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
