---
title: "Bubble Chart"
source: "https://www.amcharts.com/demos/bubble-chart/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A bubble chart places each item on two axes and sizes it by a third value. Here two series share the plot: one drawn as circles, the other as eight-pointed stars.

When a bubble chart works: A bubble chart compares items on three values at once: one across, one up and one in the size. It works best with a few dozen items whose sizes differ clearly, because people judge size only roughly; the exact numbers belong in the tooltip. A shape per series, like these stars, tells groups apart without relying on color.

Good for:
- Products, projects or countries compared on three measures
- Risk against return, sized by the amount invested
- Two groups on one plot, told apart by shape

Think twice when:
- Hundreds of items: the bubbles pile up, so use a scatter plot
- Sizes that differ only a little: the eye can’t tell them apart
- Zero or negative sizes: a bubble can’t show them

Prompt: Create a zoomable bubble chart with two series on two value axes, one drawn as circles and the other as eight-pointed stars, each shape sized by its value, with tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot to pan sideways...
  panY: true,       // ...and up and down
  wheelY: "zoomXY", // the mouse wheel zooms in on both axes
  pinchZoomX:true,  // pinch to zoom on touch screens, both ways
  pinchZoomY:true
}));

chart.get("colors").set("step", 2); // skip a color, so the two series differ more

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows its x value on the axis...
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // ...and its y value on this one
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  // finds the lowest and highest value, which the heat rule below sizes the bubbles by
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}, value: {value}" // the point's x, y and value
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// Both shapes cast a soft shadow, set on their templates
var circleTemplate = am5.Template.new({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});
series0.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    fill: series0.get("fill"), // the series color
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: circleTemplate,
  min: 3,  // the smallest bubble has a 3px radius...
  max: 35, // ...the biggest 35px
  dataField: "value",
  key: "radius"
}]);

// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true, // finds the lowest and highest value2, for the star sizes
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y2",
  valueXField: "x2",
  valueField: "value2",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}, value: {value}"
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// The star's shape goes in the template too, so one change reaches every star
var starTemplate = am5.Template.new({
  spikes: 8,                    // an 8-pointed star...
  innerRadius: am5.percent(70), // ...with its dents at 70% of the radius
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});
series1.bullets.push(function() {
  var graphics = am5.Star.new(root, {
    fill: series1.get("fill") // the series color
  }, starTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series1.set("heatRules", [{
  target: starTemplate,
  min: 3,  // the smallest star has a 3px radius...
  max: 50, // ...the biggest 50px
  dataField: "value",
  key: "radius"
}]);

// no lines between the points: only the bubbles and stars show
series0.strokes.template.set("strokeOpacity", 0);
series1.strokes.template.set("strokeOpacity", 0);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  // the cursor jumps to the nearest bubble or star of either series
  snapToSeries: [series0, series1]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // zoom and pan along x...
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical" // ...and along y
}));

var data = [{
  "y": 10,
  "x": 14,
  "value": 59,
  "y2": -5,
  "x2": -3,
  "value2": 44
}, {
  "y": 5,
  "x": 3,
  "value": 50,
  "y2": -15,
  "x2": -8,
  "value2": 12
}, {
  "y": -10,
  "x": 8,
  "value": 19,
  "y2": -4,
  "x2": 6,
  "value2": 35
}, {
  "y": -6,
  "x": 5,
  "value": 65,
  "y2": -5,
  "x2": -6,
  "value2": 168
}, {
  "y": 15,
  "x": -4,
  "value": 92,
  "y2": -10,
  "x2": -8,
  "value2": 102
}, {
  "y": 13,
  "x": 1,
  "value": 8,
  "y2": -2,
  "x2": 0,
  "value2": 41
}, {
  "y": 1,
  "x": 6,
  "value": 35,
  "y2": 0,
  "x2": -3,
  "value2": 16
}]

series0.data.setAll(data);
series1.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);

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
