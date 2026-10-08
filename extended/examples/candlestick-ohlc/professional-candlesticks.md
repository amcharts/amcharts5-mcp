---
title: "Professional Candlesticks"
source: "https://www.amcharts.com/demos/professional-candlesticks/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

Candlesticks in the hollow style traders call professional. Each candle says two things: hollow if the day closed above its open, filled if below, and green or red for a close above or below the day before.

When hollow candles help: Plain candles compare each day only with its own open. Hollow candles add the day before: a red hollow candle rose during the day but still closed below yesterday, a step back that plain candles would show as a rise.

Good for:
- Trading screens for experienced readers
- Telling a rebound from a real rise
- Spotting gaps between one close and the next open

Think twice when:
- Readers new to candles: four meanings are a lot, start with plain ones
- Zoomed far out: the bodies get too thin to show hollow or filled
- Printing in gray: the colors merge, only hollow or filled still reads

Prompt: Create a professional (hollow) candlestick chart of simulated daily prices: a candle is hollow when the day closed above its open and filled when below, and green or red by whether it closed above or below the day before. Add a cursor, tooltips, a legend and a scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

// no minor grid lines in the scrollbar's small chart
myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);
// random daily prices for the last 1000 days, with an open, low and high around each close
function generateChartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 1000);
  firstDate.setHours(0, 0, 0, 0);
  var value = 1200;
  for (var i = 0; i < 1000; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    var open = value + Math.round(Math.random() * 16 - 7);
    var low = Math.min(value, open) - Math.round(Math.random() * 5);
    var high = Math.max(value, open) + Math.round(Math.random() * 5);

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
    focusable: true, // the chart can be reached with the Tab key
    panX: true,      // drag the plot to pan through the days...
    panY: true,      // ...and the prices
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
    paddingLeft: 0   // the price labels sit at the chart's left edge
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.5, // can pan up to half a screen past the first and last day
    groupData: true, // zoomed out, days merge into weeks or months, so candles stay readable
    baseInterval: { timeUnit: "day", count: 1 }, // one candle per day in the data
    renderer: am5xy.AxisRendererX.new(root, {
      // drag the axis to zoom it
      pan: "zoom",
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {
      animationDuration: 300 // the date tooltip glides to a new spot in 300ms
    })
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 1, // can pan up to a full plot height above or below the prices
    renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }) // drag the price axis to zoom it too
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    calculateAggregates: true, // works out open, close, low and high over the range in view
    stroke: color,
    name: "MDXI",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    // when days are grouped into longer periods: lowest low, highest high, first open, last close
    lowValueYGrouped: "low",
    highValueYGrouped: "high",
    openValueYGrouped: "open",
    valueYGrouped: "close",
    // the legend: the hovered day's prices, or the last close in view while the cursor is off the plot
    legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
    legendRangeValueText: "{valueYClose}",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip sits beside the candle, not above it
      labelText: "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY}"
    })
  })
);

// pro candles: hollow if the close is above the open, green or red against the previous close
series.columns.template.get("themeTags").push("pro");

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50 // 50px tall, with a small chart of the prices inside
});
chart.set("scrollbarX", scrollbar);

var sbxAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{ timeUnit: "week", count: 1 }], // the small chart always shows one point per week
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0,      // no axis line
      minorGridEnabled: true // minor grid lines, hidden by the theme rule at the top
    })
  })
);

var sbyAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

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
var legend = chart.plotContainer.children.push(am5.Legend.new(root, {})); // inside the plot, top left

legend.data.push(series);

legend.markers.template.setAll({
  width: 10 // a narrow marker
});

legend.markerRectangles.template.setAll({
  cornerRadiusTR: 0, // square corners on the marker
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});

// Start on the last three months, where single candles are wide enough to show hollow and filled bodies
series.events.once("datavalidated", function () {
  var lastDate = data[data.length - 1].date;
  xAxis.zoomToDates(am5.time.add(new Date(lastDate), "month", -3), am5.time.add(new Date(lastDate), "day", 1));
});

// set data
sbseries.data.setAll(data);
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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
