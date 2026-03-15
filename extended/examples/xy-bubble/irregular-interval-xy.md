---
title: "Irregular Interval XY"
source: "https://www.amcharts.com/demos/irregular-interval-xy/"
category: "xy-bubble"
scraped: "2026-03-15"
---

The most popular XY charts, such as Column Chart or Line Chart, are often distributed over a category axis with equal intervals on the X-axis (or Y-axis for Bar Charts). In most cases, this is logical and fits the goals of the visualization just right. In other cases, you want to distribute the graph differently to reflect some particular dataset in the most sensible way.
Key implementation details
In this demo we emulate an irregular interval column chart by using ValueAxis for both axes and then using StepLineSeries for the graph. We alternate fills for the steps to get the column chart appearance.
XY chart
Value axis
Step line series

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
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 50,
  numberFormat: "#,###'km'",
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.get("renderer").grid.template.set("forceHidden", true);
xAxis.get("renderer").labels.template.set("forceHidden", true);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  numberFormat: "#,###'m'",
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));


// Data
var colors = chart.get("colors");
var data = [{
  x: 0,
  y: 400,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(0)
  }
}, {
  x: 14,
  y: 500,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(1)
            }
}, {
  x: 22,
  y: 550,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(0)
  }
}, {
  x: 26,
  y: 750,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(0)
  }
}, {
  x: 29,
  y: 930,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(1)
  }
}, {
  x: 43,
  y: 1020,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(0)
  }
}, {
  x: 50,
  y: 1200,
  fillSettings: {
    fillOpacity: 1,
    visible: true,
    fill: colors.getIndex(1)
  }
}]


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.StepLineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  baseAxis: xAxis,
  valueXField: "x",
  valueYField: "y",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}km: [bold]{valueY}m[/]"
  })
}));

series.strokes.template.setAll({
  visible: false
});

series.fills.template.setAll({
  fillOpacity: 1,
  visible: true,
  templateField: "fillSettings"
});

series.data.setAll(data);

// Create grid/ranges for X axis
for(var i = 0; i < data.length; i++) {
  var value = data[i].x;
  
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });
  
  var range = xAxis.createAxisRange(rangeDataItem);
  
  rangeDataItem.get("label").setAll({
    forceHidden: false,
    text: value + "km"
  });

  rangeDataItem.get("grid").setAll({
    forceHidden: false,
    strokeOpacity: 0.2,
    location: 1
  });
}


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series]
}));


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
chart.appear(1000, 10);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 350px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
