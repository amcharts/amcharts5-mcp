---
title: "PieSeries slice colors via data"
source: "https://docs.amcharts.com/embeds/v5/pieseries-slice-colors-via-data/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/settings/template-fields"]
---

A demo from the docs page "Template fields" (get_doc(path: "concepts/settings/template-fields")).

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
    sales: 100000,
    sliceSettings: {
      fill: am5.color(0xd6e681),
      stroke: am5.color(0xd6e681)
    }
  },

  {
    country: "Spain",
    sales: 160000,
    sliceSettings: {
      fill: am5.color(0xbabf95),
      stroke: am5.color(0xbabf95)
    }
  },

  {
    country: "United Kingdom",
    sales: 80000,
    sliceSettings: {
      fill: am5.color(0xc4ad83),
      stroke: am5.color(0xc4ad83)
    }
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

series.slices.template.setAll({
  templateField: "sliceSettings"
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
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
