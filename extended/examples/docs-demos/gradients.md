---
title: "Gradients"
source: "https://docs.amcharts.com/embeds/v5/gradients/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/colors-gradients-and-patterns/gradients"]
---

A demo from the docs page "Gradients" (get_doc(path: "concepts/colors-gradients-and-patterns/gradients")).

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
  am5xy.ColumnSeries.new(root, {
    name: "Series #1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);

series1.data.setAll(data);

series1.columns.template.set(
  "fillGradient",
  am5.LinearGradient.new(root, {
    stops: [
      {
        color: am5.color(0xff621f)
      },
      {
        color: am5.color(0x946b49)
      }
    ],

    rotation: 90
  })
);

series1.columns.template.setAll({
  strokeOpacity: 0
});

// Create series
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

series2.columns.template.set(
  "fillGradient",
  am5.LinearGradient.new(root, {
    stops: [
      {
        color: am5.color(0x297373)
      },
      {
        color: am5.color(0x946b49)
      }
    ],

    rotation: 90
  })
);

series2.columns.template.setAll({
  strokeOpacity: 0
});

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
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
