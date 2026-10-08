---
title: "Candlestick Chart"
source: "https://www.amcharts.com/demos/candlestick-chart/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

A candlestick chart packs a day of trading into one mark: the body spans the opening and closing price, the wick the day’s low and high. This one holds 2,000 days; zoom out and they merge into weekly, then monthly candles.

When a candlestick chart works: Candlesticks are the standard chart for prices that move within a period: one mark shows where the day opened, where it closed and how far it swung in between. Traders read patterns in them, like long wicks or runs of one color, that a line of closing prices would hide.

Good for:
- Stock, crypto and currency prices
- Seeing how far prices swung each day
- Years of daily data, with zoom for the detail

Think twice when:
- One value per day: a line chart is clearer
- Readers new to finance: explain the colors, or use a line
- Comparing several stocks: draw lines of percent change

Prompt: Create a zoomable candlestick chart of about five years of simulated daily prices, where zooming out merges the candles into weeks or months. Start on the last three months, and add a cursor, tooltips, a legend and a scrollbar with a price preview. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

// a theme rule that hides the minor grid lines in the scrollbar
myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// 2000 days of random prices, up to today
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 2000);
  firstDate.setHours(0, 0, 0, 0);
  var value = 1200;
  for (var i = 0; i < 2000; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    // a random step of up to 10, up or down
    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    var open = value + Math.round(Math.random() * 16 - 8);            // the open is within 8 of the close
    var low = Math.min(value, open) - Math.round(Math.random() * 5);  // a little below both...
    var high = Math.max(value, open) + Math.round(Math.random() * 5); // ...and a little above both

    chartData.push({
      date: newDate.getTime(),
      value: value,
      open: open,
      low: low,
      high: high
    });
  }
  return chartData;
}

var data = generateChartData();

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true, // the chart can take keyboard focus, for keyboard users
    panX: true,      // drag the plot sideways to pan...
    panY: true,      // ...or up and down
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
    wheelY: "zoomX", // the vertical wheel zooms in on the dates
    paddingLeft: 0   // the value labels sit at the chart's left edge
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,                             // zoomed out, the days are grouped into weeks or months
    maxDeviation: 0.5,                           // pan up to half the visible range past the first and last day
    baseInterval: { timeUnit: "day", count: 1 }, // one candle per day
    renderer: am5xy.AxisRendererX.new(root, {
      pan: "zoom",           // drag along the date labels to zoom
      minorGridEnabled: true // fainter grid lines between the labeled dates
    }),
    tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 1, // pan or zoom out up to a whole visible range past the prices
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom" // drag along the price labels to zoom them
    })
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    // draws all candles at once, much faster for many of them (no rounded corners or column events)
    turboMode: true,
    fill: color,
    calculateAggregates: true, // works out values for the range in view, like valueYClose
    stroke: color,
    name: "MDXI",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    // a grouped candle takes the lowest low, the highest high, the first open and the last close
    lowValueYGrouped: "low",
    highValueYGrouped: "high",
    openValueYGrouped: "open",
    valueYGrouped: "close",
    legendValueText:                       // the legend shows the hovered candle's four prices
      "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
    legendRangeValueText: "{valueYClose}", // with no candle hovered, the last close in view
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways at the candle
      // the four prices, one per line
      labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}"
    })
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis // the cursor snaps to whole candles
  })
);
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Stack axes vertically
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // drag its grips to zoom in on a range of dates
  height: 50                 // 50px tall, with a preview of the prices
});
chart.set("scrollbarX", scrollbar);

var sbxAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true, // the preview groups its data too
    // the scrollbar's preview always shows one point a week
    groupIntervals: [{
      timeUnit: "week",
      count: 1
    }],
    baseInterval: { timeUnit: "day", count: 1 }, // the data has one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true, // fainter grid lines between the labeled dates
      strokeOpacity: 0        // no axis line
    })
  })
);

var sbyAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// the preview line
var sbseries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {})); // in a header above the value axis

legend.data.push(series);

legend.markers.template.setAll({
  width: 10 // a narrow marker...
});

legend.markerRectangles.template.setAll({
  cornerRadiusTR: 0, // ...with square corners
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

// Start on the last three months, where each candle is one day.
// Zoom out and the candles are grouped into weeks, then months.
series.events.once("datavalidated", function () {
  var lastDate = data[data.length - 1].date;
  xAxis.zoomToDates(am5.time.add(new Date(lastDate), "month", -3), am5.time.add(new Date(lastDate), "day", 1));
});

// set data
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
