---
title: "Adding tooltips to pie chart slice labels"
source: "https://docs.amcharts.com/embeds/v5/adding-tooltips-to-pie-chart-slice-labels/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/tooltips"]
---

A demo from the docs page "Tooltips" (get_doc(path: "concepts/common-elements/tooltips")).

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
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 160000
  },
  {
    country: "United Kingdom",
    sales: 80000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.labels.template.set("tooltipText", "{category}: {value}");

series.labels.template.setup = function (target) {
  target.set(
    "background",
    am5.Rectangle.new(root, {
      fill: am5.color(0x000000),
      fillOpacity: 0
    })
  );
};

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
