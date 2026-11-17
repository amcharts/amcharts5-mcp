---
title: "Gradients with line series"
source: "https://docs.amcharts.com/embeds/v5/gradients-with-line-series/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/colors-gradients-and-patterns/gradients"]
---

A demo from the docs page "Gradients" (get_doc(path: "concepts/colors-gradients-and-patterns/gradients")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    category: "Q1",
    value1: 1000,
    value2: 588
  },
  {
    category: "Q2",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Q3",
    value1: 850,
    value2: 1230
  },
  {
    category: "Q4",
    value1: 1100,
    value2: 800
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
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
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);

series1.data.setAll(data);

series1.fills.template.set(
  "fillGradient",
  am5.LinearGradient.new(root, {
    stops: [
      {
        opacity: 1
      },
      {
        opacity: 0.5
      }
    ],

    rotation: 90
  })
);

series1.fills.template.setAll({
  visible: true,
  fillOpacity: 1
});

series1.strokes.template.setAll({
  strokeWidth: 2
});
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 250px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
