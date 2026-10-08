---
title: "Smoothed Line Chart"
source: "https://www.amcharts.com/demos/smoothed-line-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart with the corners rounded off. The curve makes a trend easier to follow, and a soft fill under it gives the shape some weight.

When to smooth a line: Smoothing draws a curve through the same points a plain line chart joins with straight segments. The data does not change. Move the Smoothing slider to see the trade-off.

Good for:
- Trends over days, months or years
- Noisy measurements: traffic, temperature, sensor readings
- Presentations and dashboards where the shape matters most

Think twice when:
- Exact values matter: a curve can overshoot between points
- Values that jump in steps, like prices or stock levels: use a step line
- Only a few data points: straight lines are more honest

Prompt: Create a smoothed line chart of 50 daily values with round bullets and a light fill under the line. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // hover for the day's value
  })
}));

// a line series has no fill by default: this fills the area under the line
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.2 // a faint fill
});

// a dot on every data point
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0,
    sprite: am5.Circle.new(root, {
      radius: 4,               // a 4px dot...
      stroke: root.interfaceColors.get("background"), // ...with a ring in the background color...
      strokeWidth: 2,          // ...2px wide...
      fill: series.get("fill") // ...filled with the line's color
    })
  });
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

var data = generateDatas(50); // 50 days
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
