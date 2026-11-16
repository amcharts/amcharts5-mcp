---
title: "LineSeries with open data fields"
source: "https://docs.amcharts.com/embeds/v5/lineseries-with-open-data-fields/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/series/line-series"]
---

A demo from the docs page "Line series" (get_doc(path: "charts/xy-chart/series/line-series")).

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
    openValue: 200
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    openValue: 400
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    openValue: 950
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    openValue: 700
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    openValue: 720
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
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      openValueYField: openField
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value", "openValue");
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
