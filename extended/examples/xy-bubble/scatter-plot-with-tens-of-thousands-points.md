---
title: "Scatter Plot with Tens of Thousands Points"
source: "https://www.amcharts.com/demos/scatter-plot-with-tens-of-thousands-points/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A scatter plot with 20,000 points in four clusters, all drawn in one go, so the chart stays quick to zoom and pan. This is where the Canvas renderer shines: switch to SVG under the chart and every move has to rebuild one huge shape.

When to plot thousands of points: A scatter plot shows how two values relate, one dot per item. With tens of thousands of items the dots pile up, and what matters is where they gather: clusters, gaps and outliers. See-through dots show where they are densest, and zooming in brings back the single points.

Good for:
- Sensor readings, transactions or survey answers by the thousand
- Finding clusters and outliers before any analysis
- Zooming from the overall shape down to single points

Think twice when:
- Picking out one item: thousands of dots hide it, so highlight it
- A few dozen items: regular bullets allow labels and hover effects
- Exact counts per area: a heat map of counts is more precise

Prompt: Create a zoomable scatter plot of 20,000 points in four colored clusters, drawn fast by painting all the points into a single graphics element instead of one bullet each. Use the amCharts 5 library with its Responsive theme.

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
  pinchZoomX: true, // pinch to zoom on a touch screen, sideways...
  pinchZoomY: true  // ...and up and down
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,             // the x axis runs from 0...
  max: 100,           // ...to 100...
  strictMinMax: true, // ...exactly, with no rounding to nicer numbers
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between the labels
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's x value on the axis
}));

// Skip the last label, which the vertical scrollbar would cover
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,             // the y axis runs from 0...
  max: 100,           // ...to 100...
  strictMinMax: true, // ...exactly too
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's y value on the axis
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value",
  tooltip: am5.Tooltip.new(root, { // hover a point for its x, y and value
    labelText: "x: {valueX.formatNumber('#.0')}, y: {valueY.formatNumber('#.0')}, value: {value}"
  })
}));

// no line between the points: they are drawn as dots further down
series.strokes.template.set("visible", false);

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
  orientation: "horizontal" // above the plot; zooms the x axis
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical" // right of the plot; zooms the y axis
}));

// Generate 20,000 points in four clusters, each in its own color from the theme
var colors = chart.get("colors");
var clusters = [
  { x: 30, y: 68, spread: 10 },
  { x: 70, y: 72, spread: 7 },
  { x: 40, y: 30, spread: 12 },
  { x: 80, y: 30, spread: 8 }
];

// a random number with a bell-shaped (normal) distribution around 0
function randomNormal() {
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

var data = [];
for (var i = 0; i < 20000; i++) {
  var c = i % clusters.length; // the points take turns between the four clusters
  data.push({
    x: clusters[c].x + randomNormal() * clusters[c].spread, // spread around the cluster's center
    y: clusters[c].y + randomNormal() * clusters[c].spread,
    value: Math.round(2 + Math.random() * 6), // the dot size: a radius of 1 to 4px
    color: colors.getIndex(c * 3)             // every third theme color
  });
}

// add graphics to line series which will contain bullets
// (its fillOpacity setting is used as the opacity of every point)
var canvasBullets = series.children.push(am5.Graphics.new(root, {
  fillOpacity: 0.5
}));

// one drawing with a circle for every point, much faster than 20,000 separate bullets
canvasBullets.set("draw", (display) => {

  var opacity = canvasBullets.get("fillOpacity", 1); // read on every draw, so one setting changes every dot

  // loop through all data items
  am5.array.each(series.dataItems, (dataItem) => {
    // set fill style from data context
    var dataContext = dataItem.dataContext;
    if (dataContext) {
      const point = dataItem.get("point"); // the point's position in pixels, worked out by the series
      if (point) {
        display.beginPath();
        display.beginFill(dataContext.color, opacity);
        display.drawCircle(point.x, point.y, dataContext.value / 2); // the radius is half the point's value
        display.endFill();
      }
    }
  })

})

// user data is set on each redraw, so we use this to mark draw as dirty
series.strokes.template.on("userData", drawBullets);

// asks for the dots to be drawn again on the next frame
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
