---
title: "Cursor and legend labels with category axis"
source: "https://docs.amcharts.com/embeds/v5/cursor-and-legend-labels-with-category-axis/"
category: "docs-demos"
scraped: "2026-11-14"
docsPages: ["charts/xy-chart/legend-xy-series"]
---

A demo from the docs page "Legend and XY series" (get_doc(path: "charts/xy-chart/legend-xy-series")).

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
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    category: "Q1",
    value: 1
  },
  {
    category: "Q2",
    value: 3
  },
  {
    category: "Q3",
    value: 2
  },
  {
    category: "Q4",
    value: 1
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

xAxis.data.setAll(data);

// Create series

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "{name}: {categoryX}",
    legendRangeLabelText: "{name}"
  })
);

series.data.setAll(data);

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
