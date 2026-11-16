---
title: "Right-to-left chart"
source: "https://docs.amcharts.com/embeds/v5/right-to-left-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/locales/right-to-left-support"]
---

A demo from the docs page "Right-to-left support" (get_doc(path: "concepts/locales/right-to-left-support")).

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

// Create root and chart: right to left
var root = am5.Root.new("chartdiv", {
  direction: "rtl"
});

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  { category: "تفاح", value: 501.9 },
  { category: "برتقال", value: 301.9 },
  { category: "موز", value: 201.1 },
  { category: "عنب", value: 165.8 },
  { category: "فراولة", value: 139.9 },
  { category: "كرز", value: 128.3 },
  { category: "مانجو", value: 99.5 },
  { category: "أناناس", value: 60.2 }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "value",
    categoryField: "category"
  })
);

series.labels.template.setAll({
  textAlign: "start",
  text: "[bold]فاكهة[/]\n{category}: {valuePercentTotal.formatNumber('#.#')}%"
});

series.data.setAll(data);

// Add legend: with the root's direction, items go from right to left,
// the marker on the right of each item
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

legend.data.setAll(series.dataItems);
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
