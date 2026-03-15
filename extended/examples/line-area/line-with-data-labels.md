---
title: "Line with Data Labels"
source: "https://www.amcharts.com/demos/line-with-data-labels/"
category: "line-area"
scraped: "2026-03-15"
---

Line series in amCharts can have labels displayed near data points, the same as any other series type. Labels are added in the same way as regular bullets, by attaching them to individual data points. You can customize the appearance and position of the labels, including their font, size, color, and alignment. Additionally, you can add a background, border, or padding to make the labels stand out. This allows you to effectively highlight values or provide additional context directly on the chart.
XY chart
Line series
Bullets

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true
}));

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 60,
  minorGridEnabled: true
});

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 30 },
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}),
  extraMin: 0.01,
  extraMax: 0.01,
  tooltipLocation: 0
}));

var yRenderer = am5xy.AxisRendererY.new(root, {});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: yRenderer
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "timestamp",
  locationX: 0,
  fill: am5.color(0xc83830),
  stroke: am5.color(0xc83830),
  seriesTooltipTarget: "bullet",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));

series.bullets.push(function () {
  var circleTemplate = am5.Template.new({
    radius: 6,
    templateField: "bulletSettings",
    fill: series.get("fill"),
    strokeWidth: 2,
    stroke: root.interfaceColors.get("background")
  })

  var circle = am5.Circle.new(root, {}, circleTemplate);

  return am5.Bullet.new(root, {
    sprite: circle,
    locationX: 0
  });
});

series.bullets.push(function () {
  var label = am5.Label.new(root, {
    populateText: true,
    text: "{valueY}",
    centerX: am5.p50,
    centerY: 30,
    fontSize: 10,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 6,
    paddingRight: 6,
    fill: am5.Color.brighten(series.get("fill"), -0.1),
  });

  label.set("background", am5.RoundedRectangle.new(root, {
    fill: am5.color(0xffffff),
    fillOpacity: 0.75,
    cornerRadiusBL: 3,
    cornerRadiusBR: 3,
    cornerRadiusTL: 3,
    cornerRadiusTR: 3,
    stroke: series.get("fill"),
  }));

  return am5.Bullet.new(root, {
    sprite: label,
    locationX: 0
  });
});


var data = [{
  "timestamp": new Date(2020, 0, 1, 22, 30).getTime(),
  "value": 99.71
}, {
  "timestamp": new Date(2020, 0, 1, 23, 0).getTime(),
  "value": 99.13
}, {
  "timestamp": new Date(2020, 0, 1, 23, 30).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2020, 0, 2, 0, 0).getTime(),
  "value": 101
}, {
  "timestamp": new Date(2020, 0, 2, 0, 30).getTime(),
  "value": 99.95
}, {
  "timestamp": new Date(2020, 0, 2, 1, 0).getTime(),
  "value": 100.9
}, {
  "timestamp": new Date(2020, 0, 2, 1, 30).getTime(),
  "value": 100.39
}, {
  "timestamp": new Date(2020, 0, 2, 2, 0).getTime(),
  "value": 101.1
}, {
  "timestamp": new Date(2020, 0, 2, 2, 30).getTime(),
  "value": 101.45
}, {
  "timestamp": new Date(2020, 0, 2, 3, 0).getTime(),
  "value": 101.15
}, {
  "timestamp": new Date(2020, 0, 2, 3, 30).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2020, 0, 2, 4, 0).getTime(),
  "value": 101.55
}, {
  "timestamp": new Date(2020, 0, 2, 4, 30).getTime(),
  "value": 101.7
}, {
  "timestamp": new Date(2020, 0, 2, 5, 0).getTime(),
  "value": 100.5
}, {
  "timestamp": new Date(2020, 0, 2, 5, 30).getTime(),
  "value": 100.92
}, {
  "timestamp": new Date(2020, 0, 2, 6, 0).getTime(),
  "value": 102.2
}];

series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
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
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
