---
title: "Spectrum Chart"
source: "https://www.amcharts.com/demos/spectrum-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A spectrum chart is a single bar split into periods and colored by status, like a strip of colored tape along a time line. Here, a machine’s afternoon from 11:00 to 17:30: normal running, alarms, anomalies and one critical error.

When a spectrum chart works: A spectrum chart answers "what state was it in, and when?" for one machine, service or process. Each status gets a color, so problems stand out as bands in a long run of normal, and their widths show how long they lasted.

Good for:
- Machine, server or service status over a day
- Shifts, phases or modes on a time line
- Spotting when problems happened and how long they lasted

Think twice when:
- Several machines: a Gantt-style chart with a row each
- Values, not states: a line chart
- Many short periods: zoom in, or they become slivers

Prompt: Create a spectrum chart: one horizontal bar that shows a machine’s status through an afternoon as back-to-back periods colored by status (normal operation, minor alarm, anomaly, critical error), with the start time of each period marked under the bar and a legend of the statuses. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no panning
  panY: false,
  layout: root.verticalLayout // the legend goes below the plot
}));

// Status colors, shared by the bars and the legend
var colors = {
  "Normal operation": am5.color(0x69a74f),
  "Minor alarm": am5.color(0xfb9900),
  "Anomaly": am5.color(0x664ea6),
  "Critical error": am5.color(0xcc0c00)
};

// One entry per period: when it started and ended, and the machine's status
function time(hours, minutes) {
  return new Date(2026, 0, 1, hours, minutes).getTime(); // January 1, 2026, at the given time
}

var data = [
  { from: time(11, 0), to: time(12, 30), status: "Normal operation" },
  { from: time(12, 30), to: time(12, 45), status: "Minor alarm" },
  { from: time(12, 45), to: time(14, 3), status: "Normal operation" },
  { from: time(14, 3), to: time(14, 14), status: "Anomaly" },
  { from: time(14, 14), to: time(14, 38), status: "Critical error" },
  { from: time(14, 38), to: time(15, 1), status: "Minor alarm" },
  { from: time(15, 1), to: time(16, 37), status: "Normal operation" },
  { from: time(16, 37), to: time(16, 55), status: "Anomaly" },
  { from: time(16, 55), to: time(17, 7), status: "Normal operation" },
  { from: time(17, 7), to: time(17, 30), status: "Minor alarm" }
];

// All periods sit in one row, each bar in its status color
data.forEach(function(item) {
  item.category = "";
  item.columnSettings = { fill: colors[item.status] };
});

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
yAxis.data.setAll([{ category: "" }]);

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 1 }, // times to the minute
  renderer: am5xy.AxisRendererX.new(root, {})
}));

// no regular time labels: the axis ranges below put one where each period starts
xAxis.get("renderer").labels.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "to",       // each bar ends when its period ends...
  openValueXField: "from", // ...and starts when it starts
  categoryYField: "category"
}));

series.columns.template.setAll({
  strokeWidth: 0,                  // no outline
  strokeOpacity: 0,
  height: am5.percent(100),        // bars fill the row's full height
  templateField: "columnSettings", // each bar's color comes from columnSettings in the data
  tooltipText: "{status}\n{openValueX.formatDate('HH:mm')} to {valueX.formatDate('HH:mm')}"
});

series.data.setAll(data);

// A time label where each period starts, and one at the end
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
function addTimeLabel(value, dropped, atEnd) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value // the time to label
  });

  xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("forceHidden", true); // no grid line, only the tick

  rangeDataItem.get("tick").setAll({
    visible: true,             // show the tick...
    length: dropped ? 32 : 18, // ...longer under a label that dropped a line...
    strokeOpacity: 0.2         // ...and faint
  });

  rangeDataItem.get("label").setAll({
    centerX: atEnd ? am5.p100 : am5.p0, // the end label ends at its time; the others start at theirs
    dy: dropped ? 14 : 0,               // a line lower when dropped
    // range labels follow the axis label template, which is hidden: show this one
    forceHidden: false,
    fontSize: 11, // small text
    text: root.dateFormatter.format(new Date(value), "HH:mm") // the time, like 14:03
  });
}

var dropped = false; // whether the label before went a line lower
for (var i = 0; i < data.length; i++) {
  // A label less than 20 minutes after the one before it goes a line lower,
  // so the two don't overlap
  dropped = i > 0 && !dropped && data[i].from - data[i - 1].from < 20 * 60 * 1000;
  addTimeLabel(data[i].from, dropped, false);
}
// The end time goes a line lower too when the last period is short
var last = data[data.length - 1];
addTimeLabel(last.to, !dropped && last.to - last.from < 30 * 60 * 1000, true);

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "name",        // legend items from plain data: the name...
  fillField: "color",       // ...and the color, for the marker's fill...
  strokeField: "color",     // ...and its outline
  centerX: am5.percent(50), // centered...
  x: am5.percent(50),       // ...under the chart
  // the legend only names the colors: clicking it does nothing
  clickTarget: "none"
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

legend.data.setAll(Object.keys(colors).map(function(status) {
  return { name: status, color: colors[status] };
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
