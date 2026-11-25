---
title: "Stacked axes"
source: "https://docs.amcharts.com/embeds/v5/stacked-axes/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/xy-chart/axes"]
---

A demo from the docs page "Axes" (get_doc(path: "charts/xy-chart/axes")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    value2: 14200
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    value2: 4500
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    value2: 10000
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    value2: 8000
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    value2: 9200
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 801,
    value2: 11400
  }
];

// Craete Y-axes
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis1.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Value",
    fontWeight: "500"
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Volume",
    fontWeight: "500"
  })
);

// Stack Y-axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

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
function createSeries(name, field, yAxis) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      clustered: false
    })
  );

  series.data.setAll(data);
}

createSeries("Series #1", "value", yAxis1);
createSeries("Series #2", "value2", yAxis2);
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
