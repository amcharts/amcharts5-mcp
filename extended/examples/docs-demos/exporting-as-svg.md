---
title: "Exporting as SVG"
source: "https://docs.amcharts.com/embeds/v5/exporting-as-svg/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/exporting-svg"]
---

A demo from the docs page "Exporting to SVG" (get_doc(path: "concepts/exporting/exporting-svg")).

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

// Create axes
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

// Set data
var data = [
  { category: "Research", value: 1000 },
  { category: "Marketing", value: 1200 },
  { category: "Sales", value: 850 },
  { category: "Support", value: 600 }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Add export menu: "SVG" is among the image formats
// https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

// Open the menu to show the options
exporting.get("menu").open();

// Make stuff animate on load
series.appear(1000);
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
