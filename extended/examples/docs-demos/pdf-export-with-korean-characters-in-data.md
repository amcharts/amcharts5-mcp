---
title: "PDF export with Korean characters in data"
source: "https://docs.amcharts.com/embeds/v5/pdf-export-with-korean-characters-in-data/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/exporting-pdf"]
---

A demo from the docs page "Exporting PDF" (get_doc(path: "concepts/exporting/exporting-pdf")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

// Define data
var data = [
  {
    category: "연구",
    value: 450
  },
  {
    category: "마케팅",
    value: 1200
  },
  {
    category: "분포",
    value: 1850
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.data.setAll(data);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  title: "나의 멋진 차트",
  pdfOptions: {
    includeData: true,
    addURL: false,
    font: am5fonts_notosans_kr
  }
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
- https://cdn.amcharts.com/lib/5/fonts/notosans-kr.js
