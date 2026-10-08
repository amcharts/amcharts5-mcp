---
title: "XY Error Chart"
source: "https://www.amcharts.com/demos/xy-error-chart/"
category: "xy-bubble"
scraped: "2026-10-08"
---

Error bars show how sure a measurement is: the point is the value measured, the bars the range the true value may lie in. Here seven points, each with an error in both x and y.

When to show error bars: Every measurement has some uncertainty, and error bars put it on the chart instead of in a footnote. When the bars of two points overlap, the difference between them may not be real. Bars in both directions suit data where x is measured too, not just set.

Good for:
- Lab and field measurements
- Survey results with a margin of error
- Comparing estimates, where the overlap matters

Think twice when:
- Readers who don’t know what the bars mean: say it in a caption
- Dozens of points: the bars cross and turn into a mesh
- Errors that differ up and down: draw the low and high ends separately

Prompt: Create an XY scatter chart with error bars on two value axes: each of seven points has an error in both directions, drawn as horizontal and vertical bars with short caps, with the point as a hollow circle on top. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var data = [{
  "x": 10,
  "y": 14,
  "errorX": 3,
  "errorY": 4
}, {
  "x": 0,
  "y": 0,
  "errorX": 2,
  "errorY": 6
}, {
  "x": -10,
  "y": 3,
  "errorX": 0.8,
  "errorY": 3.5
}, {
  "x": -6,
  "y": 5,
  "errorX": 1.2,
  "errorY": 4.2
}, {
  "x": 11,
  "y": -4,
  "errorX": 2.4,
  "errorY": 3.9
}, {
  "x": 13,
  "y": 1,
  "errorX": 1.5,
  "errorY": 3.3
}, {
  "x": 1,
  "y": 6,
  "errorX": 2,
  "errorY": 3.3
}];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true, // drag the plot to pan in any direction
  panY: true,
  wheelY: "zoomXY", // the mouse wheel zooms both axes at once
  pinchZoomX:true,  // pinch on a touch screen to zoom...
  pinchZoomY:true   // ...either axis
}));

chart.get("colors").set("step", 2); // every second theme color

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  // 20% more room at both ends, so the error bars of the outer points fit
  extraMax: 0.2,
  extraMin: 0.2,
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's x value on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  extraMax: 0.2,
  extraMin: 0.2,
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's y value on the axis
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// The error bars and the points are two series with the same data
var errorSeries = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x"
}));

var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX} ± {errorX}\ny: {valueY} ± {errorY}"
  })
}));

// Only the bullets are drawn, no lines between the points
errorSeries.strokes.template.set("visible", false);
series.strokes.template.set("visible", false);

// Add error bullet: a bar from x - errorX to x + errorX and one from y - errorY to y + errorY,
// each with a cap at both ends. It is redrawn when the chart zooms (dynamic: true)
errorSeries.bullets.push(function() {
  var graphics = am5.Graphics.new(root, {
    strokeWidth: 2,               // 2px lines...
    stroke: series.get("stroke"), // ...in the points' color
    draw: function(display, target) {
      var dataItem = target.dataItem;
      var xRenderer = xAxis.get("renderer");
      var yRenderer = yAxis.get("renderer");

      // how many pixels the errors are on the axes
      var errorX = dataItem.dataContext.errorX;
      var width = xRenderer.positionToCoordinate(xAxis.valueToPosition(errorX)) - xRenderer.positionToCoordinate(xAxis.valueToPosition(0));

      var errorY = dataItem.dataContext.errorY;
      var height = yRenderer.positionToCoordinate(yAxis.valueToPosition(errorY)) - yRenderer.positionToCoordinate(yAxis.valueToPosition(0));

      // horizontal bar with caps
      display.moveTo(-width, 0);
      display.lineTo(width, 0);

      display.moveTo(-width, -10); // each cap is 20px long
      display.lineTo(-width, 10);

      display.moveTo(width, -10);
      display.lineTo(width, 10);

      // vertical bar with caps
      display.moveTo(0, -height);
      display.lineTo(0, height);

      display.moveTo(-10, -height);
      display.lineTo(10, -height);

      display.moveTo(-10, height);
      display.lineTo(10, height);
    }
  });

  return am5.Bullet.new(root, {
    dynamic: true,
    sprite: graphics
  });
});

// Add circle bullet for the points
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    strokeWidth: 2, // a 2px ring...
    radius: 5,      // ...10px across...
    stroke: series.get("stroke"),
    fill: root.interfaceColors.get("background") // ...filled with the background color, so it looks hollow
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series] // the cursor jumps to the nearest point
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

errorSeries.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
errorSeries.appear(1000);
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
