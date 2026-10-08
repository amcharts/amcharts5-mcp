---
title: "Live Data"
source: "https://www.amcharts.com/demos/live-data/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart that never sits still: every second a new point slides in on the right and the oldest one drops off the left.

When to stream a line: A moving window keeps the latest readings in view without the chart growing forever, and animating each new point in lets the eye follow the change instead of watching the line jump. It suits values watched in real time, where the latest trend matters more than the history.

Good for:
- Server load, traffic and other live metrics
- Sensor readings and IoT dashboards
- Prices and rates that tick all day

Think twice when:
- Long histories: show them on a static, zoomable chart
- Updates faster than people can read: group them first
- Careful comparisons: moving data is hard to study

Prompt: Create a live line chart that adds a new random value every second and drops the oldest, so the window keeps moving, with each new point animating in from the previous one. Add round markers, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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

// Generate random data
var value = 100; // the random values start at 100

// 16 daily points from 1000 days ago, each moving up or down by up to 10
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < 16; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;

    chartData.push({
      date: newDate.getTime(),
      value: value
    });
  }
  return chartData;
}

var data = generateChartData();

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  focusable: true, // the chart can be reached with the Tab key
  panX: true,      // drag the plot sideways to pan through the days
  panY: true,      // and up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX"  // ...and the vertical wheel zooms in on the days
}));

var easing = am5.ease.linear; // the new points glide in at a steady speed

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5, // pans up to half the visible range past the first and last day
  groupData: false,  // every day stays a point of its own, never grouped into weeks
  baseInterval: {    // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled ones
    minGridDistance: 60     // at least 60px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  // bullets hide when points are closer than 10px, as when zoomed out
  minBulletDistance: 10,
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal",          // the tooltip sits beside the point, not above it
    labelText: "{valueY.formatNumber('#.00')}" // the value with two decimals
  })
}));
series.data.setAll(data);

// The area under the line is there but clear; raise its opacity to fill it
series.fills.template.setAll({
  fillOpacity: 0,
  visible: true
});

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 4 // 4px radius
});

// a dot on each point
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    // no fixed location, so the bullet follows its point as it slides in
    locationX: undefined,
    sprite: am5.Circle.new(root, {
      fill: series.get("fill") // in the line's color
    }, bulletTemplate)
  })
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis // the cursor snaps to the days of this axis
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Hide the zoom-out button: as old points drop off, the value axis can count as
// zoomed for a moment and the button would flash. Scroll back to zoom out.
// https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Zoom_out_button
chart.zoomOutButton.set("forceHidden", true);

// Update data every second
setInterval(function () {
  addData();
}, 1000)

// adds the next day's point and drops the oldest one, animating the change
function addData() {
  var lastDataItem = series.dataItems[series.dataItems.length - 1]; // the newest point so far
  var lastValue = lastDataItem.get("valueY");
  // the next value wanders from the last one
  var newValue = lastValue + ((Math.random() < 0.5 ? 1 : -1) * Math.random() * 6);
  var lastDate = new Date(lastDataItem.get("valueX"));
  var time = am5.time.add(new Date(lastDate), "day", 1).getTime(); // one day after the last point
  // drop the oldest point, so the chart keeps showing the same number of days
  series.data.removeIndex(0);
  series.data.push({
    date: time,
    value: newValue
  })

  // the new point starts where the last one is and glides to its own date and value
  var newDataItem = series.dataItems[series.dataItems.length - 1];
  newDataItem.animate({
    key: "valueYWorking",
    to: newValue,
    from: lastValue,
    duration: 600, // 0.6 seconds, done before the next update
    easing: easing
  });

  var animation = newDataItem.animate({
    key: "locationX", // position within its day...
    to: 0.5,          // ...ends in the middle of it...
    from: -0.5,       // ...starting from where the last point was
    duration: 600     // 0.6 seconds, like the value
  });
  // once the point stops, a visible axis tooltip is refreshed to the shifted dates
  if (animation) {
    var tooltip = xAxis.get("tooltip");
    if (tooltip && !tooltip.isHidden()) {
      animation.events.on("stopped", function () {
        xAxis.updateTooltip();
      })
    }
  }
}

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
