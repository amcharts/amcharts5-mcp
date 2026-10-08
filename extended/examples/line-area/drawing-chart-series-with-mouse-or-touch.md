---
title: "Drawing Chart Series with Mouse or Touch"
source: "https://www.amcharts.com/demos/drawing-chart-series-with-mouse-or-touch/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart you can draw on: click anywhere to place a point, and your points join into a second line, drawn over three years of data.

When readers draw on the chart: A chart people can draw on turns reading into guessing and checking: sketch where you think a line goes next, mark a level to watch, or trace a pattern. The points are ordinary data, so your code can read them, compare them with the real values or save them.

Good for:
- “Draw your guess” quizzes before the data is revealed
- Marking targets or levels by hand
- Teaching how a line chart is built, point by point

Think twice when:
- Precise input: a form with numbers is more exact
- Phones: small points are hard to grab with a finger
- Drawings that must be kept: add your own saving

Prompt: Create a line chart of about three years of daily values where clicking the plot places points that form a second, drawn line. Each placed point can be dragged, and a click between two points inserts a new one there. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot sideways to pan...
  panY: true,       // ...or up and down
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// each series moves 3 colors along the palette, so the drawn line stands out from the first
chart.get("colors").set("step", 3);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

// a random walk: each day a few points up or down from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

// count days of data in a row
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
  maxDeviation: 0.3, // panning can go up to 30% past the first and last day
  baseInterval: {    // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // faint grid lines between the main ones
    minGridDistance: 70     // at least 70px between date labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
}));

// Skip a date label that would be cut off at the right edge
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // panning up or down can go 30% past the values
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the hovered value
  })
}));

// The area under the line is there but clear; raise its opacity to fill it
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0
});

// the series the clicks draw: it starts with no data
var drawingSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date"
}));

// Invisible bullet which will be dragged (to avoid some conflicting between
// drag position and bullet position which results flicker)
drawingSeries.bullets.push(function () {
  var bulletCircle = am5.Circle.new(root, {
    radius: 6,                 // a bit bigger than the visible dot, so it's easy to grab
    fillOpacity: 0,
    fill: drawingSeries.get("fill"),
    draggable: true,           // drag a point to move it
    cursorOverStyle: "pointer" // a hand pointer over the points
  });
  bulletCircle.events.on("dragged", function (e) { // while dragged, the data point follows the pointer
    handleDrag(e);
  })
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  })
})

// Actual bullet
drawingSeries.bullets.push(function () {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,                      // the visible dot...
    fill: drawingSeries.get("fill") // ...in the series' color
  });
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  })
})

// Drag handler
function handleDrag(e) {
  var point = chart.plotContainer.toLocal(e.point);
  var date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
  var value = Math.round(yAxis.positionToValue(yAxis.coordinateToPosition(point.y)) * 10) / 10; // one decimal

  // the series draws the working values, so set them along with the values
  var dataItem = e.target.dataItem;
  dataItem.set("valueX", date);
  dataItem.set("valueXWorking", date);
  dataItem.set("valueY", value);
  dataItem.set("valueYWorking", value);
}

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Set data
var data = generateDatas(1200);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

// Interactivity
// a click on the plot adds a point to the drawing series, at the clicked date and value
chart.plotContainer.get("background").events.on("click", function (e) {
  var point = chart.plotContainer.toLocal(e.point);
  var date = xAxis.positionToValue(xAxis.coordinateToPosition(point.x));
  var value = Math.round(yAxis.positionToValue(yAxis.coordinateToPosition(point.y)) * 10) / 10; // one decimal
  drawingSeries.data.push({
    date: date,
    value: value
  });

  // make sure the series draws up to the new point
  drawingSeries.setPrivate("endIndex", drawingSeries.data.length);
  sortData();
})

// Sort data so that if clicked between existing data items, the item would
// be added between
function sortData() {
  drawingSeries.dataItems.sort(function (a, b) {
    var atime = a.get("valueX");
    var btime = b.get("valueX");

    if (atime < btime) {
      return -1;
    } else if (atime == btime) {
      return 0;
    } else {
      return 1;
    }
  })
}
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
