---
title: "Positioning series bullets by data field"
source: "https://docs.amcharts.com/embeds/v5/positioning-series-bullets-by-data-field/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/bullets"]
---

A demo from the docs page "Bullets" (get_doc(path: "concepts/common-elements/bullets")).

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
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    stroke: color,
    name: "MDXI",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "close",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText:
        "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY},\nmediana: {mediana}"
    })
  })
);

series.bullets.push(function (root, series) {
  return am5.Bullet.new(root, {
    field: "open",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: am5.color(0x000000),
      strokeWidth: 4,
      fill: am5.color(0xffffff)
    })
  });
});

var data = [
  {
    date: new Date(2019, 8, 2).getTime(),
    open: 135.26,
    high: 135.95,
    low: 131.5,
    close: 131.85
  },
  {
    date: new Date(2019, 8, 3).getTime(),
    open: 129.9,
    high: 133.27,
    low: 128.3,
    close: 132.25
  },
  {
    date: new Date(2019, 8, 4).getTime(),
    open: 132.94,
    high: 136.24,
    low: 132.63,
    close: 135.03
  },
  {
    date: new Date(2019, 8, 5).getTime(),
    open: 136.76,
    high: 137.86,
    low: 132.0,
    close: 134.01
  },
  {
    date: new Date(2019, 8, 6).getTime(),
    open: 131.11,
    high: 133.0,
    low: 125.09,
    close: 126.39
  },
  {
    date: new Date(2019, 8, 7).getTime(),
    open: 130.11,
    high: 133.0,
    low: 125.09,
    close: 127.39
  },
  {
    date: new Date(2019, 8, 8).getTime(),
    open: 125.11,
    high: 126.0,
    low: 121.09,
    close: 122.39
  },
  {
    date: new Date(2019, 8, 9).getTime(),
    open: 131.11,
    high: 133.0,
    low: 122.09,
    close: 124.39
  }
];

series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
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
  height: 94vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
