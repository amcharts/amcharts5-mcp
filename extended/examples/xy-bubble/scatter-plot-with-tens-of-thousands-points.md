---
title: "Scatter plot with tens of thousands points"
source: "https://www.amcharts.com/demos/scatter-plot-with-tens-of-thousands-points/"
category: "xy-bubble"
scraped: "2026-03-15"
---

When a chart has a lot of data, it might get slow, especially if you use a separate object, like a bullet for each data item. Each object uses part of the memory so at some point your chart's performance will get worse. In many such cases there is a solution which will extend amCharts possibilities to display huge data sets many times: instead of creating a separate Bullet object for each data item, we create a single Graphics object and use default drawing capabilities to draw required shapes into this Graphics. You can draw any shape there. 
XY chart
Graphics

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
  pinchZoomX: true,
  pinchZoomY: true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}, value: {value}"
  })
}));

series.strokes.template.set("visible", false);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

var data = [];
for (var i = 0; i < 15000; i++) {
  data.push({ x: Math.random() * 100, y: Math.random() * 100, color: am5.Color.fromString("#" + Math.floor(Math.random() * 16777215).toString(16)), value: Math.random() * 20 })
}

// add graphics to line series which will contain bullets
var canvasBullets = series.children.push(am5.Graphics.new(root, {}));

canvasBullets.set("draw", (display) => {
  
  // loop through all data items 
  am5.array.each(series.dataItems, (dataItem) => {
    // set fill style from data context
    var dataContext = dataItem.dataContext;
    if (dataContext) {
      const point = dataItem.get("point");
      if (point) {
        display.beginPath();
        display.beginFill(dataContext.color);
        display.drawCircle(point.x, point.y, dataContext.value / 2);        
        display.endFill();
      }
    }    
  })
  
})

// user data is set on each redraw, so we use this to mark draw as dirty
series.strokes.template.on("userData", drawBullets);

function drawBullets() {
  canvasBullets._markDirtyKey("draw");
}

series.data.setAll(data);
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
  max-width:100%;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
