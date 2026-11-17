---
title: "Gradients"
source: "https://docs.amcharts.com/embeds/v5/gradients-2/"
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
    category: "Research",
    value: 588
  },
  {
    category: "Marketing",
    value: 1800
  },
  {
    category: "Sales",
    value: 1230
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
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #2",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.data.setAll(data);

series.columns.template.set(
  "fillGradient",
  am5.LinearGradient.new(root, {
    stops: [
      {
        brighten: 1
      },
      {
        brighten: -0.2
      }
    ],

    rotation: 90
  })
);

series.columns.template.setAll({
  strokeOpacity: 0
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
  height: 350px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
