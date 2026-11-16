---
title: "Chart with oversized labels"
source: "https://docs.amcharts.com/embeds/v5/chart-with-oversized-labels/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/labels"]
---

A demo from the docs page "Labels" (get_doc(path: "concepts/common-elements/labels")).

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
    category: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
    value: 1000
  },
  {
    category: "Morbi id ex eros ut ut commodo diam eu auctor",
    value: 1200
  },
  {
    category: "Nullam libero odio convallis eget leo at vehicula finibus ipsum",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis.get("renderer").labels.template.setAll({
  visible: false
});

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "wrap",
  textAlign: "center",
  maxWidth: 150
});

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.data.setAll(data);
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
