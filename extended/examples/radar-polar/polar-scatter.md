---
title: "Polar Scatter"
source: "https://www.amcharts.com/demos/polar-scatter/"
category: "radar-polar"
scraped: "2026-10-08"
---

A scatter plot on a 24-hour clock: each dot is one commuter trip, placed by the time it started and how long it took. Car trips stretch out at rush hour; train trips take about the same time all day.

When a polar scatter plot works: When one of the two values goes round in a cycle, like the hour of the day or a compass bearing, a circle joins its ends: trips just before and after midnight sit side by side. Clusters then show as clumps at their time of day. For values that don’t wrap around, a regular scatter plot is easier to read.

Good for:
- Events by time of day or day of the year
- Measurements by direction: wind, waves, signals
- Spotting clusters in a repeating pattern

Think twice when:
- Values that don’t wrap around: use an XY scatter plot
- Many points near the middle: the inner rings are small
- Precise distances: a square grid is easier to read

Prompt: Create a polar scatter plot on a 24-hour clock of commuter trips by start time and duration (sample data), with dots for three ways to travel (car, bike and train), a legend, and tooltips showing when each trip left. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                  // no dragging the plot around
  panY: false,
  wheelX: "panX",               // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX",              // ...and the vertical wheel zooms in on some hours
  innerRadius: am5.percent(20), // a hole in the middle, 20% of the radius, so short trips don't bunch up
  layout: root.verticalLayout   // the legend goes under the chart
}));

// Every third color of the palette, so the three series stand apart
chart.get("colors").set("step", 3);

// Add cursor: drag along the ring to zoom in on some hours
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// The circle is a 24-hour clock: midnight at the top, noon at the bottom
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1, // the outer circle, faint
  // at least 60px between labels, so they don't crowd the edge
  minGridDistance: 60
});

xRenderer.labels.template.setAll({
  radius: 10, // the hour labels sit 10px outside the circle
  // 24:00 falls on 0:00, so the last label is left out
  maxPosition: 0.98
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,  // from midnight...
  max: 24, // ...to midnight
  // exactly 0 to 24, so the circle is one whole day
  strictMinMax: true,
  // whole hours only, also when zoomed in
  maxPrecision: 0,
  numberFormat: "#':00'" // hours shown as 6:00, 7:00
}));

// The distance from the middle is how long the trip took
var yRenderer = am5radar.AxisRendererRadial.new(root, {});
// no label at the outer edge, where it would run into the hours
yRenderer.labels.template.set("maxPosition", 0.95);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,                  // zero minutes at the inner circle
  numberFormat: "#' min'", // the value followed by " min"
  renderer: yRenderer
}));

// Create series: points only, no lines
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, data) {
  var series = chart.series.push(am5radar.RadarLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "x",
    valueYField: "y",
    // on load the points appear one after another
    sequencedInterpolation: true
  }));

  series.set("stroke", root.interfaceColors.get("background"));
  series.strokes.template.setAll({
    forceHidden: true // the line is never drawn, only the dots
  });

  // a dot for every trip
  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5, // 5px dots
        fill: series.get("fill"), // the series color
        tooltipText: "{name}, left at {time}: {valueY} min" // {time} from the data, {valueY} the trip time
      })
    });
  });

  series.data.setAll(data);
  series.appear(1000);
}

// Data: commuter trips in one city, by the time each trip started (x, in hours) and how long it took (y, in minutes).
// Sample data.
createSeries("Car", [
  { x: 6.33, y: 23, time: "6:20" },
  { x: 6.75, y: 28, time: "6:45" },
  { x: 7, y: 36, time: "7:00" },
  { x: 7.08, y: 37, time: "7:05" },
  { x: 7.33, y: 37, time: "7:20" },
  { x: 7.58, y: 43, time: "7:35" },
  { x: 7.92, y: 48, time: "7:55" },
  { x: 8.08, y: 50, time: "8:05" },
  { x: 8.33, y: 51, time: "8:20" },
  { x: 8.33, y: 48, time: "8:20" },
  { x: 9.25, y: 28, time: "9:15" },
  { x: 10.83, y: 24, time: "10:50" },
  { x: 12.17, y: 20, time: "12:10" },
  { x: 13.08, y: 18, time: "13:05" },
  { x: 14.75, y: 24, time: "14:45" },
  { x: 15, y: 24, time: "15:00" },
  { x: 15.58, y: 21, time: "15:35" },
  { x: 15.67, y: 22, time: "15:40" },
  { x: 15.92, y: 28, time: "15:55" },
  { x: 16.75, y: 45, time: "16:45" },
  { x: 17.42, y: 50, time: "17:25" },
  { x: 17.83, y: 52, time: "17:50" },
  { x: 18.33, y: 43, time: "18:20" },
  { x: 19.08, y: 27, time: "19:05" },
  { x: 19.08, y: 22, time: "19:05" },
  { x: 19.33, y: 22, time: "19:20" },
  { x: 19.42, y: 22, time: "19:25" },
  { x: 20.5, y: 18, time: "20:30" },
  { x: 21.58, y: 19, time: "21:35" },
  { x: 23.33, y: 19, time: "23:20" }
]);

createSeries("Bike", [
  { x: 6.92, y: 15, time: "6:55" },
  { x: 7.08, y: 18, time: "7:05" },
  { x: 7.25, y: 20, time: "7:15" },
  { x: 7.67, y: 20, time: "7:40" },
  { x: 7.75, y: 19, time: "7:45" },
  { x: 7.83, y: 22, time: "7:50" },
  { x: 8, y: 16, time: "8:00" },
  { x: 8.42, y: 19, time: "8:25" },
  { x: 8.75, y: 15, time: "8:45" },
  { x: 8.83, y: 18, time: "8:50" },
  { x: 9, y: 24, time: "9:00" },
  { x: 9.08, y: 19, time: "9:05" },
  { x: 10.58, y: 20, time: "10:35" },
  { x: 12.83, y: 14, time: "12:50" },
  { x: 14.17, y: 15, time: "14:10" },
  { x: 14.75, y: 16, time: "14:45" },
  { x: 14.83, y: 17, time: "14:50" },
  { x: 14.83, y: 15, time: "14:50" },
  { x: 16.08, y: 26, time: "16:05" },
  { x: 16.25, y: 26, time: "16:15" },
  { x: 17.33, y: 18, time: "17:20" },
  { x: 17.42, y: 25, time: "17:25" },
  { x: 17.42, y: 18, time: "17:25" },
  { x: 17.5, y: 19, time: "17:30" },
  { x: 17.83, y: 18, time: "17:50" },
  { x: 18.25, y: 19, time: "18:15" },
  { x: 18.42, y: 22, time: "18:25" },
  { x: 18.5, y: 17, time: "18:30" },
  { x: 18.67, y: 21, time: "18:40" },
  { x: 18.75, y: 24, time: "18:45" }
]);

createSeries("Train", [
  { x: 5.83, y: 36, time: "5:50" },
  { x: 5.92, y: 40, time: "5:55" },
  { x: 6.17, y: 41, time: "6:10" },
  { x: 6.67, y: 38, time: "6:40" },
  { x: 6.83, y: 42, time: "6:50" },
  { x: 6.92, y: 41, time: "6:55" },
  { x: 7.33, y: 38, time: "7:20" },
  { x: 7.5, y: 41, time: "7:30" },
  { x: 7.58, y: 40, time: "7:35" },
  { x: 8, y: 40, time: "8:00" },
  { x: 8.33, y: 37, time: "8:20" },
  { x: 9.17, y: 40, time: "9:10" },
  { x: 10.17, y: 41, time: "10:10" },
  { x: 15.08, y: 40, time: "15:05" },
  { x: 15.33, y: 41, time: "15:20" },
  { x: 15.92, y: 42, time: "15:55" },
  { x: 16.67, y: 39, time: "16:40" },
  { x: 16.75, y: 44, time: "16:45" },
  { x: 17.08, y: 39, time: "17:05" },
  { x: 17.17, y: 38, time: "17:10" },
  { x: 17.42, y: 36, time: "17:25" },
  { x: 17.58, y: 44, time: "17:35" },
  { x: 17.75, y: 39, time: "17:45" },
  { x: 18.25, y: 41, time: "18:15" },
  { x: 18.42, y: 39, time: "18:25" },
  { x: 18.58, y: 40, time: "18:35" },
  { x: 18.75, y: 41, time: "18:45" },
  { x: 18.83, y: 44, time: "18:50" },
  { x: 19.42, y: 36, time: "19:25" },
  { x: 19.42, y: 39, time: "19:25" }
]);

// Add legend: click a way of travel to hide it
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  x: am5.p50,      // the legend's middle...
  centerX: am5.p50 // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
