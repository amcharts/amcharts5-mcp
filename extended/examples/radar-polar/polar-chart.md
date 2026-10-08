---
title: "Polar Chart"
source: "https://www.amcharts.com/demos/polar-chart/"
category: "radar-polar"
scraped: "2026-10-08"
---

A polar chart places values by direction: the farther a point from the middle, the higher the value. Here, the average wind speed at a beach from eight directions, with onshore winds shaded blue and offshore winds red.

When a polar chart works: A polar chart puts each value at its direction, so the shape leans the way the data does: here, the strongest winds blow from the west and north-west. It suits anything measured by compass bearing or angle. Shaded sectors mark the directions that matter, like the onshore winds that blow in from the sea.

Good for:
- Wind, sound or signal strength by direction
- Marking sectors: onshore, safe, out of range
- One profile with a natural circular order

Think twice when:
- Categories with no direction: use a bar chart
- Several series: the lines tangle
- Precise values: distances from the middle are hard to judge

Prompt: Create a polar chart of the average wind speed at a beach from eight compass directions (sample data), drawn as one line with round bullets, with shaded sectors marking the onshore and offshore wind directions. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,     // no dragging the plot around
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX"  // ...and the vertical wheel zooms in on some directions
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "none" // a drag doesn't zoom or select
}));

// no zoom and no crosshair lines: the cursor only brings up the tooltip
cursor.lineY.set("visible", false);
cursor.lineX.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {});
xRenderer.labels.template.setAll({
  radius: 10 // the direction labels sit 10px outside the circle
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // can't be zoomed or panned past the first or last direction
  categoryField: "direction",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // the center of the chart is zero
  renderer: am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20 // at least 20px between the speed circles
  })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series = chart.series.push(am5radar.RadarLineSeries.new(root, {
  name: "Wind speed",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "direction",
  tooltip: am5.Tooltip.new(root, {
    labelText: "From {categoryX}: {valueY} knots" // the direction and its speed
  })
}));

series.strokes.template.set("strokeWidth", 2); // a 2px line
// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 5 // 5px dots
});

// a dot at each direction's value
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      fill: series.get("fill"), // the series color
      strokeWidth: 2, // with a 2px ring in the background color...
      stroke: root.interfaceColors.get("background") // ...that sets each dot off the line
    }, bulletTemplate)
  })
})

// Data: the average wind speed at a beach, in knots, by the direction the wind blows from (sample data)
var data = [{
  "direction": "N",
  "value": 8
}, {
  "direction": "NE",
  "value": 9
}, {
  "direction": "E",
  "value": 4.5
}, {
  "direction": "SE",
  "value": 3.5
}, {
  "direction": "S",
  "value": 9.2
}, {
  "direction": "SW",
  "value": 8.4
}, {
  "direction": "W",
  "value": 11.1
}, {
  "direction": "NW",
  "value": 10
}]

series.data.setAll(data);
xAxis.data.setAll(data);

// Shade sectors with axis ranges: the beach faces north-west, so winds from NW and N blow in from the sea
// (onshore, blue) and winds from SE and S blow out to sea (offshore, red)
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
function shadeSector(category, endCategory, color) {
  // the range runs from the start of category to the end of endCategory
  var range = xAxis.createAxisRange(xAxis.makeDataItem({ category: category, endCategory: endCategory }));
  range.get("axisFill").setAll({
    visible: true,    // an axis range's fill is hidden until set visible
    fill: color,
    fillOpacity: 0.25 // a light tint, so the line stays easy to read
  });
  range.get("label").set("forceHidden", true); // no second direction name over the axis labels
}

shadeSector("NW", "NW", am5.color(0x3b82f6));
shadeSector("N", "N", am5.color(0x3b82f6));
shadeSector("SE", "S", am5.color(0xef4444));

// Animate chart
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
