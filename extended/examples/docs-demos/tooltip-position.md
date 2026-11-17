---
title: "Tooltip position"
source: "https://docs.amcharts.com/embeds/v5/tooltip-position/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/tooltips"]
---

A demo from the docs page "Tooltips" (get_doc(path: "concepts/common-elements/tooltips")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
    //cursor: am5xy.XYCursor.new(root, {})
  })
);

// var cursor = chart.get("cursor");

// cursor.lineX.setAll({
//   visible: false
// });

// cursor.lineY.setAll({
//   visible: false
// });

var data = [
  {
    year: "2021",
    value: 20
  },
  {
    year: "2022",
    value: 26
  },
  {
    year: "2023",
    value: 28
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    startLocation: 0.1,
    endLocation: 0.9,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "year"
  })
);

series.columns.template.setAll({
  tooltipX: am5.percent(100),
  tooltipY: am5.percent(0),
  tooltipText: "{categoryX}: {valueY}"
});

series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
