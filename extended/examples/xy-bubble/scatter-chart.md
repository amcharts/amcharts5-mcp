---
title: "Scatter Chart"
source: "https://www.amcharts.com/demos/scatter-chart/"
category: "xy-bubble"
scraped: "2026-03-15"
---

Scatter Chart (also known as Scatter Plot, Scatterplot, Scatter graph, Scattergram, Scatter Diagram) is used to display values in a two-dimensional coordinate system. Each point's location is determined by one of its coordinates on one axis of the chart and the other coordinate on another axis.
Key implementation details
In amCharts 5 any element can be a bullet. In this case we're plotting a custom Graphics elements (triangles) as bullets.
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
  wheelY: "zoomXY",
  pinchZoomX:true,
  pinchZoomY:true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {}),
  autoZoom: false
}));

xAxis.ghostLabel.set("forceHidden", true);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}),
  autoZoom: false
}));

yAxis.ghostLabel.set("forceHidden", true);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "ay",
  valueXField: "ax",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX} y:{valueY}"
  })
}));


// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series0.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series0.get("fill"),
    width: 15,
    height: 13
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});


// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "by",
  valueXField: "bx",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX} y:{valueY}"
  })
}));

series0.strokes.template.set("strokeOpacity", 0);
series1.strokes.template.set("strokeOpacity", 0);

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series1.get("fill"),
    width: 15,
    height: 13,
    rotation: 180
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// trend series
var trendSeries0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series0.get("stroke")
}));

trendSeries0.data.setAll([
  { x: 1, y: 2 },
  { x: 12, y: 11 }
])

var trendSeries1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series1.get("stroke")
}));

trendSeries1.data.setAll([
  { x: 1, y: 1 },
  { x: 12, y: 19 }
])

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series0, series1]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));


var data = [{
  "ax": 1,
  "ay": 0.5,
  "bx": 1,
  "by": 2.2
}, {
  "ax": 2,
  "ay": 1.3,
  "bx": 2,
  "by": 4.9
}, {
  "ax": 3,
  "ay": 2.3,
  "bx": 3,
  "by": 5.1
}, {
  "ax": 4,
  "ay": 2.8,
  "bx": 4,
  "by": 5.3
}, {
  "ax": 5,
  "ay": 3.5,
  "bx": 5,
  "by": 6.1
}, {
  "ax": 6,
  "ay": 5.1,
  "bx": 6,
  "by": 8.3
}, {
  "ax": 7,
  "ay": 6.7,
  "bx": 7,
  "by": 10.5
}, {
  "ax": 8,
  "ay": 8,
  "bx": 8,
  "by": 12.3
}, {
  "ax": 9,
  "ay": 8.9,
  "bx": 9,
  "by": 14.5
}, {
  "ax": 10,
  "ay": 9.7,
  "bx": 10,
  "by": 15
}, {
  "ax": 11,
  "ay": 10.4,
  "bx": 11,
  "by": 18.8
}, {
  "ax": 12,
  "ay": 11.7,
  "bx": 12,
  "by": 19
}]

series0.data.setAll(data);
series1.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);

trendSeries0.appear(1000);
trendSeries1.appear(1000);

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
