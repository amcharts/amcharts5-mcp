---
title: "Line Chart Adding Data Every Second"
source: "https://www.amcharts.com/demos/line-chart-adding-data-every-second/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart fed live: every second a new point slides in on the right, the oldest drops off the left, and a pulsing dot marks the latest value.

When a live line works: A rolling window keeps the chart the same size while data keeps coming: the newest values in view, the old ones gone. It suits screens people glance at, where the question is what is happening right now.

Good for:
- Server load, sensor readings, live prices
- Monitoring screens and control rooms
- Showing that a feed is alive

Think twice when:
- Long-term trends: keep the history and add a scrollbar
- Many updates per second: add them in batches
- Values people need to study: they move on in a second

Prompt: Create a real-time line chart that adds a new random value every second and drops the oldest, so the window keeps moving. A pulsing circle marks the latest point, and each new point slides smoothly into view. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
var value = 100;

// 50 points, one second apart, up to now
function generateChartData() {
  var chartData = [];
  var firstDate = new Date(Date.now() - 50 * 1000);
  firstDate.setMilliseconds(0); // on the whole second

  for (var i = 0; i < 50; i++) {
    var newDate = new Date(firstDate);
    newDate.setSeconds(newDate.getSeconds() + i);

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
  focusable: true, // the chart can take keyboard focus
  panX: true,      // drag the plot to pan...
  panY: true,      // ...in any direction
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the time
  pinchZoomX:true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

var easing = am5.ease.linear; // an even pace for the new points' animation

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5, // panning can go up to half the width past the data
  // keep every point as it is, never merged into longer intervals
  groupData: false,
  extraMax:0.1, // this adds some space in front
  extraMin:-0.1,  // this removes some space from the beginning so that the line would not be cut off
  baseInterval: {    // one point per second
    timeUnit: "second",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // faint grid lines between the main ones
    minGridDistance: 50     // at least 50px between time labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the time at the cursor
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  // the value axis keeps fitting itself to the points in view; that should not bring up the zoom out button
  zoomOut: false,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal",          // the tooltip points sideways at the line
    labelText: "{valueY.formatNumber('#.00')}" // the value, with two decimals
  })
}));

// The area under the line is there but clear; raise its opacity to fill it
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0
});

// tell that the last data item must create bullet
data[data.length - 1].bullet = true;
series.data.setAll(data);

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series.bullets.push(function(root, series, dataItem) {
  // only create sprite if bullet == true in data context
  if (dataItem.dataContext.bullet) {
    var container = am5.Container.new(root, {});
    var circle0 = container.children.push(am5.Circle.new(root, {
      radius: 5, // a dot in the line's color...
      fill: series.get("stroke")
    }));
    var circle1 = container.children.push(am5.Circle.new(root, {
      radius: 5, // ...and a second one on top of it...
      fill: series.get("stroke")
    }));

    circle1.animate({
      key: "radius",
      to: 20,         // ...that grows to a 20px radius...
      duration: 1000, // ...over a second...
      easing: am5.ease.out(am5.ease.cubic), // ...fast at first, then slower...
      loops: Infinity // ...over and over
    });
    circle1.animate({
      key: "opacity",
      to: 0, // fading out as it grows
      from: 1,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });

    return am5.Bullet.new(root, {
      locationX:undefined, // no fixed spot: the data item's own locationX, animated below
      sprite: container
    })
  }
})

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Update data every second
setInterval(function () {
  addData();
}, 1000)

// add a point a second after the last one, and move the pulsing dot to it
function addData() {
  var lastDataItem = series.dataItems[series.dataItems.length - 1];

  var lastValue = lastDataItem.get("valueY");
  // each new value starts from the last one, so the line wanders on
  var newValue = lastValue + ((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
  var lastDate = new Date(lastDataItem.get("valueX"));
  var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
  // drop the oldest point as the new one comes in, so the line keeps its length
  series.data.removeIndex(0);
  series.data.push({
    date: time,
    value: newValue,
    bullet: true
  })

  var newDataItem = series.dataItems[series.dataItems.length - 1];
  // the new point grows from the last value to its own, instead of jumping there
  newDataItem.animate({
    key: "valueYWorking",
    to: newValue,
    from: lastValue,
    duration: 600,
    easing: easing
  });

  // use the bullet of last data item so that a new sprite is not created
  // (if the chart has not drawn it yet, the "bullet" flag in the data makes it on the new item instead)
  if (lastDataItem.bullets && lastDataItem.bullets.length) {
    newDataItem.bullets = [lastDataItem.bullets[0]];
    newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
  }
  // reset bullets
  lastDataItem.dataContext.bullet = false;
  lastDataItem.bullets = [];

  // it also slides in from the last point's place (half a step back) to the middle of its own second
  var animation = newDataItem.animate({
    key: "locationX",
    to: 0.5,
    from: -0.5,
    duration: 600
  });
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
  max-width:100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
