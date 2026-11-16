---
title: "Circular labels"
source: "https://docs.amcharts.com/embeds/v5/circular-labels/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/percent-charts/pie-chart/pie-series"]
---

A demo from the docs page "Pie series" (get_doc(path: "charts/percent-charts/pie-chart/pie-series")).

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

var chart = root.container.children.push(am5percent.PieChart.new(root, {}));

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 60000
  },
  {
    country: "UK",
    sales: 80000
  },
  {
    country: "Belgium",
    sales: 68000
  },
  {
    country: "Germany",
    sales: 80000
  },
  {
    country: "Netherlands",
    sales: 70000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country",
    alignLabels: false
  })
);

series.data.setAll(data);

series.labels.template.setAll({
  fontSize: 12,
  text: "{category}",
  textType: "circular",
  inside: true,
  radius: 10,
  fill: am5.color(0xffffff)
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
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
