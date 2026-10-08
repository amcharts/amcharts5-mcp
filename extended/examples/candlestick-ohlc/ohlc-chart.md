---
title: "OHLC Chart"
source: "https://www.amcharts.com/demos/ohlc-chart/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

An OHLC chart shows the same four prices as a candlestick, drawn as a bar: a line from low to high, a tick to the left for the open and one to the right for the close. Zoom out and 2,000 days group into weeks and months.

OHLC bars or candles?: Both show the open, high, low and close. OHLC bars are thinner and lighter, so they suit dense charts and printed reports, while candles make rising and falling days easier to tell apart at a glance.

Good for:
- Long price histories where candles would crowd
- Print and grayscale, where the ticks still read
- Traders who prefer bars to candles

Think twice when:
- Up and down days at a glance: candles show them better
- One price per day: a line chart is clearer
- Small screens: the open and close ticks get too short to see

Prompt: Create a zoomable OHLC chart of about five years of simulated daily prices, each bar a line from low to high with ticks for the open and close, merging into weeks or months when zoomed out. Add a cursor, tooltips, a legend and a scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root); // a theme of our own, for the rule below

// hide the minor grid lines in the scrollbar's small chart
myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);
// 2000 days of random prices: each day's close, open, low and high
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 2000); // 2000 days ago
  firstDate.setHours(0, 0, 0, 0);
  var value = 1200; // the prices start near 1200
  for (var i = 0; i < 2000; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10); // the close moves up to 10
    var open = value + Math.round(Math.random() * 16 - 8);                    // open within 8 of the close
    var low = Math.min(value, open) - Math.round(Math.random() * 5);          // low a little under both
    var high = Math.max(value, open) + Math.round(Math.random() * 5);         // high a little over both

    chartData.push({
      date: newDate.getTime(),
      value: value,
      open: open,
      low: low,
      high: high,
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
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the days
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5, // pans up to half the visible range past the first and last day
  groupData: true, // zoomed out, days are grouped into weeks or months, so bars don't crowd
  baseInterval: { timeUnit: "day", count: 1 }, // one bar per day
  renderer: am5xy.AxisRendererX.new(root, {
    pan: "zoom" // drag along the date labels to zoom
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 1, // can pan up to a whole screen past the prices
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the value labels to zoom
  })
}));

// a base color; the bars still get the theme's rise and fall colors
var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.OHLCSeries.new(root, {
  fill: color,
  calculateAggregates: true, // works out range values, such as {valueYClose} in the legend
  stroke: color,
  name: "MDXI",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  openValueYField: "open",
  lowValueYField: "low",
  highValueYField: "high",
  valueXField: "date",
  // a grouped bar takes the lowest low, the highest high, the first open and the last close
  lowValueYGrouped: "low",
  highValueYGrouped: "high",
  openValueYGrouped: "open",
  valueYGrouped: "close",
  // the legend shows the hovered bar's prices...
  legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
  legendRangeValueText: "{valueYClose}", // ...and the last close while the cursor is off the chart
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip sits beside the bar
    labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}"
  })
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis // the cursor snaps to the days
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // a bar above the plot to zoom and scroll...
  height: 50                 // ...50px tall, with a small chart of the prices in it
});
chart.set("scrollbarX", scrollbar);

// the small chart inside the scrollbar gets its own axes and series
var sbxAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
  groupData: true,
  // the scrollbar's preview line groups the days into weeks
  groupIntervals: [{ timeUnit: "week", count: 1 }],
  baseInterval: { timeUnit: "day", count: 1 }, // one point per day
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // minor grid lines, hidden by the theme rule at the top
    strokeOpacity: 0        // no axis line
  })
}));

var sbyAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    minorGridEnabled: true // minor grid lines, hidden by the theme rule at the top
  })
}));

var sbseries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: sbxAxis,
  yAxis: sbyAxis,
  valueYField: "value",
  valueXField: "date"
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.plotContainer.children.push( // inside the plot area, at its top left
  am5.Legend.new(root, {})
);

legend.data.push(series);

legend.markers.template.setAll({
  width: 10 // narrow markers...
});

legend.markerRectangles.template.setAll({
  cornerRadiusTR: 0, // ...with square corners
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

// Start on the last three months, where each bar is one day and its open and close ticks show.
// Zoom out and the bars are grouped into weeks, then months.
series.events.once("datavalidated", function () {
  var lastDate = data[data.length - 1].date;
  xAxis.zoomToDates(am5.time.add(new Date(lastDate), "month", -3), am5.time.add(new Date(lastDate), "day", 1));
});

series.data.setAll(data);
sbseries.data.setAll(data);

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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
