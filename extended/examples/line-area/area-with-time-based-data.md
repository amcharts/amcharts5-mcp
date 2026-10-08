---
title: "Area with Time Based Data"
source: "https://www.amcharts.com/demos/area-with-time-based-data/"
category: "line-area"
scraped: "2026-10-08"
---

An area chart of minute-by-minute visits over the last eight hours, opening on the latest hour. The small chart above it shows the whole range: drag it to move along.

Time series with fine detail: Minute-level data is too dense to show all at once, so the chart opens on the latest hour and keeps the rest a drag away. The date axis picks its labels to fit the zoom, from minutes to hours.

Good for:
- Website visits or server load by the minute
- Sensor readings and live measurements
- Long series where the latest data matters most

Think twice when:
- A few dozen points: show them all, no zoom needed
- Several series at once: areas hide each other, use lines
- Readers who need the whole day at a glance: open zoomed out

Prompt: Create an area chart of about eight hours of minute-by-minute visits ending now, zoomed to the last hour when it opens. Add tooltips, a cursor and a horizontal scrollbar with a preview of the whole series. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot sideways to pan...
  panY: true,      // ...or up and down
  wheelY: "zoomX", // the mouse wheel zooms in on the time
  layout: root.verticalLayout,
  pinchZoomX: true // pinch to zoom on touch screens
}));

// Create Y-axis
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 1, // pan or zoom out up to a whole visible range past the values
  renderer: am5xy.AxisRendererY.new(root, {
    // drag along the axis labels to zoom the axis in and out
    pan: "zoom"
  })
}));

// Create X-Axis
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  // zoomed out, the minutes are combined into longer periods, so fewer points are drawn
  groupData: true,
  maxDeviation: 0.5, // pan up to half the visible range past the first and last minute
  baseInterval: { timeUnit: "minute", count: 1 }, // one data point per minute
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 60,   // at least 60px between labels; on narrow screens some are skipped
    pan: "zoom",           // drag along the time labels to zoom too
    minorGridEnabled: true // fainter grid lines between the labeled times
  })
}));

// Generate random data
function generateChartData() {
  var chartData = [];
  // current date
  var firstDate = new Date();
  // now set 500 minutes back
  firstDate.setMinutes(firstDate.getMinutes() - 500, 0, 0);

  // and generate 500 data items
  var visits = 500;
  for (var i = 0; i < 500; i++) {
    var newDate = new Date(firstDate);
    // each time we add one minute
    newDate.setMinutes(newDate.getMinutes() + i);
    // some random number
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    // add data item to the array
    chartData.push({
      date: newDate.getTime(),
      visits: visits
    });
  }
  return chartData;
}
var data = generateChartData();

// Create series
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Visits",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "visits",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip points sideways at the line
    // the series name in bold, then the time and the value
    labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"
  })
}));

series.strokes.template.set("strokeWidth", 2); // a 2px line
series.fills.template.setAll({
  visible: true,   // line series don't fill by default; this turns it on
  fillOpacity: 0.4 // a see-through fill
});

series.data.setAll(data);

// Pre-zoom X axis to last hour
series.events.once("datavalidated", function (ev, target) {
  var lastDate = new Date(data[data.length - 1].date);
  var firstDate = new Date(lastDate.getTime() - 3600000); // an hour before the last point
  xAxis.zoomToDates(firstDate, lastDate);
})

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // dragging pans the plot instead of selecting a range
  xAxis: xAxis      // the cursor snaps to the time axis's cells, one per point
}));

xAxis.set("tooltip", am5.Tooltip.new(root, {})); // the cursor shows the time on the axis...

yAxis.set("tooltip", am5.Tooltip.new(root, {})); // ...and the value on this one

var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // drag its grips to zoom in on a stretch of time
  height: 50                 // 50px tall, with a preview of the line
});

chart.set("scrollbarX", scrollbarX);

// the scrollbar has a chart of its own: these axes and series draw the preview inside it
var sbxAxis = scrollbarX.chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 1 },
  renderer: am5xy.AxisRendererX.new(root, {
    opposite: false,  // labels under the preview
    strokeOpacity: 0, // no axis line
    minorGridEnabled: true,
    minGridDistance: 60
  })
}));

var sbyAxis = scrollbarX.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// the preview line
var sbseries = scrollbarX.chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: sbxAxis,
  yAxis: sbyAxis,
  valueYField: "visits",
  valueXField: "date"
}));
sbseries.data.setAll(data);
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
