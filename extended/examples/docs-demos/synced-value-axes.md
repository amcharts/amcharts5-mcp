---
title: "Synced value axes"
source: "https://docs.amcharts.com/embeds/v5/synced-value-axes/"
category: "docs-demos"
scraped: "2026-11-18"
docsPages: ["charts/xy-chart/axes/value-axis"]
---

A demo from the docs page "Value axis" (get_doc(path: "charts/xy-chart/axes/value-axis")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
  })
);

// Data
var data = [
  {
    year: "2021",
    europe: 250,
    namerica: 25,
    asia: 2.1
  },
  {
    year: "2022",
    europe: 260,
    namerica: 27,
    asia: 2.2
  },
  {
    year: "2023",
    europe: 280,
    namerica: 29,
    asia: 2.4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeriesAndAxis(name, fieldName) {
  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );

  if (chart.yAxes.indexOf(yAxis) > 0) {
    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
  }

  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
    })
  );

  yAxis.get("renderer").labels.template.set("fill", series.get("fill"));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();
}

makeSeriesAndAxis("Europe", "europe");
makeSeriesAndAxis("North America", "namerica");
makeSeriesAndAxis("Asia", "asia");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
