---
title: "Candlestick series"
source: "https://docs.amcharts.com/embeds/v5/candlestick-series/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/xy-chart/series/candlestick-series"]
---

A demo from the docs page "Candlestick and OHLC series" (get_doc(path: "charts/xy-chart/series/candlestick-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    layout: root.verticalLayout,
    maxtooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    open: 1200,
    high: 1205,
    low: 1198,
    close: 1202
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    open: 1204,
    high: 1204,
    low: 1197,
    close: 1199
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    open: 1188,
    high: 1191,
    low: 1183,
    close: 1189
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    open: 1194,
    high: 1197,
    low: 1189,
    close: 1195
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    open: 1189,
    high: 1198,
    low: 1189,
    close: 1196
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    open: 1197,
    high: 1200,
    low: 1196,
    close: 1196
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    open: 1207,
    high: 1208,
    low: 1202,
    close: 1202
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    open: 1212,
    high: 1213,
    low: 1206,
    close: 1209
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    open: 1206,
    high: 1208,
    low: 1197,
    close: 1201
  }
];

// Create Y-axis
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
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});

series
  .get("tooltip")
  .label.set(
    "text",
    "[bold]{valueX.formatDate()}[/]\nOpen: {openValueY}\nHigh: {highValueY}\nLow: {lowValueY}\nClose: {valueY}"
  );
series.data.setAll(data);

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);
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
