---
title: "Line Chart with Range Slider"
source: "https://www.amcharts.com/demos/line-chart-with-range-slider/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart split in two by a handle you can drag. Everything past the handle changes color and turns striped: a way to mark a forecast, a target period or figures still to be confirmed.

When to split a line: Drawing the second part of a line differently tells the reader it is not like the first: forecast rather than measured, or a period to look at closely. A handle lets them choose where that part begins.

Good for:
- Actual figures against a forecast
- Before and after a change, like a launch or a price rise
- Letting people pick a cut-off date

Think twice when:
- Two different measures, like sales and costs: draw two lines
- Printed reports: nobody can drag, so set the date in code
- Readers who can’t tell colors apart: keep the stripes, not only the color

Prompt: Create a line chart of about three years of daily values with a draggable handle on the date axis that splits the series in two: the part after the handle is drawn in another color over a striped fill. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,      // drag the plot to pan...
  panY: true,      // ...in any direction
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  pinchZoomX:true, // pinch with two fingers to zoom on touch screens
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("forceHidden", true); // no vertical cursor line...
cursor.lineY.set("forceHidden", true); // ...and no horizontal one: the cursor just shows the tooltip

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

// the next day's data point, a few points up or down from the last
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
  baseInterval: { // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // faint grid lines between the main ones
    minGridDistance: 80     // at least 80px between date labels
  })
}));

// Hide a date label that would stick out past the right edge of the chart
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
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

series.fills.template.setAll({
  fillOpacity: 0.2, // a light fill under the line...
  visible: true     // ...switched on (line series fills are hidden by default)
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Set data
var data = generateDatas(1200);
series.data.setAll(data);

// the handle starts halfway through the data
var rangeDate = new Date();
am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
var rangeTime = rangeDate.getTime();

// add series range
var seriesRangeDataItem = xAxis.makeDataItem({});
var seriesRange = series.createAxisRange(seriesRangeDataItem);
seriesRange.fills.template.setAll({
  visible: true, // the range's own fill shows...
  opacity: 0.3   // ...faded
});

// the part past the handle takes a color from the chart's set, so it follows the theme
var rangeColor = chart.get("colors").getIndex(8);

seriesRange.fills.template.set("fillPattern", am5.LinePattern.new(root, {
  color: rangeColor, // stripes in that color...
  rotation: 45,      // ...diagonal...
  strokeWidth: 2,    // ...2px wide
  width: 2000,       // one tile big enough to cover the plot
  height: 2000,
  // the gaps between the stripes take the chart's background color, so they work in light and dark mode
  fill: root.interfaceColors.get("background")
}));

seriesRange.strokes.template.set("stroke", rangeColor); // the line past the handle in the same color

// the striped part runs from the handle to the end of the axis, wherever the axis max moves
xAxis.onPrivate("max", function (value) {
  seriesRangeDataItem.set("endValue", value);
  seriesRangeDataItem.set("value", rangeTime);
});

// add axis range
var range = xAxis.createAxisRange(xAxis.makeDataItem({}));

range.set("value", rangeDate.getTime()); // at the handle's starting date
range.get("grid").setAll({
  strokeOpacity: 0.5,                      // half transparent...
  stroke: root.interfaceColors.get("grid") // ...in the grid color
});

var resizeButton = am5.Button.new(root, {
  // the theme draws it as a horizontal resize handle, with its grip icon
  themeTags: ["resize", "horizontal"],
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"]
  })
});

// restrict from being dragged vertically
resizeButton.adapters.add("y", function () {
  return 0;
});

// restrict from being dragged outside of plot
resizeButton.adapters.add("x", function (x) {
  return Math.max(0, Math.min(chart.plotContainer.width(), x));
});

// change range when x changes
resizeButton.events.on("dragged", function () {
  var x = resizeButton.x();
  var position = xAxis.toAxisPosition(x / chart.plotContainer.width());

  var value = xAxis.positionToValue(position);

  range.set("value", value); // move the line...

  seriesRangeDataItem.set("value", value); // ...and the start of the striped part
  seriesRangeDataItem.set("endValue", xAxis.getPrivate("max"));
});

// set bullet for the range
range.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: resizeButton
}));

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
