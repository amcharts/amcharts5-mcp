---
title: "Spline Graph"
source: "https://www.amcharts.com/demos/spline-graph/"
category: "line-area"
scraped: "2026-10-08"
---

A spline graph draws a smooth curve through every point instead of straight segments. The Smoothing slider sets how much the curve may bend, from straight lines to a loose wave.

How much to smooth: The curve’s tension decides how far it may swing between points. Low tension gives a loose, flowing line; full tension straightens it back into a plain line chart. Try settings with the slider before you fix one in code.

Good for:
- Finding the right smoothing for your data
- Letting readers switch between a calm curve and exact segments
- Charts with few points, where straight segments look sharp

Think twice when:
- Data with sharp jumps: strong smoothing rounds them off
- Very few points: the curve guesses the path between them
- Exact values between points: the curve suggests values that were never measured

Prompt: Create a spline (smoothed line) chart of 15 daily values with star-shaped bullets, a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // a drag pans the dates...
  panY: true,       // ...and the values
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch to zoom the dates on a touch screen
  paddingLeft: 0    // no gap at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0); // start at midnight
var value = 100;           // the first value

// one day of data: the value moves up to 5 up or down from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1); // the next day
  return {
    date: date.getTime(),
    value: value
  };
}

// a list of count days of data
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5, // pan or zoom out past the data's ends by up to 50% of the view
  baseInterval: {    // one data point a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 80,    // at least 80px between the date labels
    minorGridEnabled: true, // fainter grid lines between the labeled dates
    // dragging the axis zooms it instead of panning
    pan: "zoom"
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 1, // pan up or down past the data by up to a whole view
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the axis to zoom it
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// the main trick: the line curves smoothly between the points, but never bends back in time
var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  // on load, the points animate in one after another instead of all at once
  sequencedInterpolation: true,
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // hover for the day's value
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2, // a 2px line
});

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 7 // 7px stars
});

// a star on every data point
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0,
    sprite: am5.Star.new(root, {
      spikes: 5,                    // five points...
      innerRadius: am5.percent(50), // ...with the inner corners at half the radius
      stroke: root.interfaceColors.get("background"), // an outline in the background color...
      strokeWidth: 2,               // ...2px wide...
      fill: series.get("fill")      // ...around the line's color
    }, bulletTemplate) // the shared template from above
  });
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

var data = generateDatas(15); // 15 days
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
