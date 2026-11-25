---
title: "Clustering ColumnSeries"
source: "https://docs.amcharts.com/embeds/v5/clustering-columnseries/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/xy-chart/series/column-series"]
---

A demo from the docs page "Column series" (get_doc(path: "charts/xy-chart/series/column-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    openValue: 400,
    value2: 1420,
    openValue2: 1300
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    openValue: 500,
    value2: 450,
    openValue2: 200
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    openValue: 600,
    value2: 1000,
    openValue2: 850
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    openValue: 880,
    value2: 800,
    openValue2: 260
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    openValue: 400,
    value2: 920,
    openValue2: 800
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field, openField) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      openValueYField: openField,
      clustered: false
    })
  );

  series.data.setAll(data);
}

createSeries("Series #1", "value", "openValue");
createSeries("Series #2", "value2", "openValue2");
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
