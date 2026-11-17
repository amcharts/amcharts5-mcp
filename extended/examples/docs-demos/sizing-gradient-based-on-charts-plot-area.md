---
title: "Sizing gradient based on chart's plot area"
source: "https://docs.amcharts.com/embeds/v5/sizing-gradient-based-on-charts-plot-area/"
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
    value: 300
  },
  {
    category: "Marketing",
    value: 500
  },
  {
    category: "Sales",
    value: 650
  }
];

// Create Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 1000,
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
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.strokes.template.set("strokeOpacity", 0);

series.fills.template.setAll({
  visible: true,
  fillOpacity: 1,
  fillGradient: am5.LinearGradient.new(root, {
    stops: [
      {
        color: am5.color(0xff0000)
      },
      {
        color: am5.color(0x00ff00)
      }
    ],

    //target: chart.plotContainer,
    rotation: 90
  })
});

series.data.setAll(data);

// series.columns.template.setAll({
//   strokeOpacity: 0
// });
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 90vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
