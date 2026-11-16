---
title: "Pie chart with scrollable legend"
source: "https://docs.amcharts.com/embeds/v5/pie-chart-with-scrollable-legend/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/containers","concepts/legend"]
---

A demo from the docs pages "Containers" (get_doc(path: "concepts/common-elements/containers")) and "Legend" (get_doc(path: "concepts/legend")).

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
    layout: root.horizontalLayout
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
  },
  {
    country: "Netherlands",
    sales: 90000
  },
  {
    country: "Portugal",
    sales: 25000
  },
  {
    country: "Germany",
    sales: 70000
  },
  {
    country: "Austria",
    sales: 75000
  },
  {
    country: "Belgium",
    sales: 40000
  },
  {
    country: "Poland",
    sales: 60000
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
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

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerY: am5.percent(50),
    y: am5.percent(50),
    layout: root.verticalLayout,
    height: am5.percent(100),
    verticalScrollbar: am5.Scrollbar.new(root, {
      orientation: "vertical"
    })
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
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
