---
title: "Scatter Chart"
source: "https://www.amcharts.com/demos/scatter-chart/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A scatter chart places each point by two values, one along each axis. Here two sets of 12 points, one drawn as upward triangles and one as downward, each with its trend line.

When a scatter chart works: A scatter chart answers one question: when one value goes up, does the other follow? Each point is one pair of values, and a trend line sums up the direction and how steep it is. With two series, the two lines show which group rises faster.

Good for:
- Checking whether two measures go together, like price and sales
- Comparing the trend of two groups
- Spotting points that break the pattern

Think twice when:
- Values over time: a line chart reads better
- Thousands of points: they pile up, so use the fast scatter plot
- Reading a trend line as proof that one value causes the other

Prompt: Create a scatter chart with two series of points drawn as triangles, one pointing up and the other down, each with a linear trend line worked out from its points. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
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
  panX: true,       // a drag pans the plot sideways...
  panY: true,       // ...and up and down
  wheelY: "zoomXY", // the mouse wheel zooms both axes at once
  pinchZoomX:true,  // pinch to zoom on a touch screen, sideways...
  pinchZoomY:true   // ...and up and down
}));

// Every fourth theme color, so the two series are easy to tell apart
chart.get("colors").set("step", 4);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between the labels
  tooltip: am5.Tooltip.new(root, {}), // shows the cursor's x value on the axis
  autoZoom: false
}));

// no fixed room for the labels: the axis takes only what its current labels need
xAxis.ghostLabel.set("forceHidden", true);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}), // shows the cursor's y value on the axis
  autoZoom: false
}));

yAxis.ghostLabel.set("forceHidden", true); // the same for the y axis

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "ay",
  valueXField: "ax",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}" // hover a point for its x and y
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series0.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series0.get("fill"), // the series' color
    width: 15,                 // 15px wide...
    height: 13                 // ...and 13px tall
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "by",
  valueXField: "bx",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}"
  })
}));

// No lines between the points: only the markers
// lines between the points are there but clear; raise their opacity to show them
series0.strokes.template.set("strokeOpacity", 0);
series1.strokes.template.set("strokeOpacity", 0);

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series1.get("fill"),
    width: 15,
    height: 13,
    // pointing down, so the second series differs in shape as well as color
    rotation: 180
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Trend series: a straight line through each series, in the same color
var trendSeries0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series0.get("stroke")
}));

var trendSeries1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series1.get("stroke")
}));

// Works out the straight line that fits the points best (least squares) and returns
// its two ends, at the lowest and the highest x
function trendLine(data, xField, yField) {
  var n = data.length;
  var sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  var minX = Infinity, maxX = -Infinity;
  data.forEach(function(item) {
    var x = item[xField];
    var y = item[yField];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
  });
  var slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX); // how steep the best-fit line is...
  var intercept = (sumY - slope * sumX) / n; // ...and where it crosses x = 0
  return [
    { x: minX, y: am5.math.round(intercept + slope * minX, 2) },
    { x: maxX, y: am5.math.round(intercept + slope * maxX, 2) }
  ];
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  // the cursor jumps to the nearest point of either series
  snapToSeries: [series0, series1]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the x axis
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical" // right of the plot; zooms the y axis
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

trendSeries0.data.setAll(trendLine(data, "ax", "ay"));
trendSeries1.data.setAll(trendLine(data, "bx", "by"));

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
