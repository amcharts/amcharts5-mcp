---
title: "Stock Chart Candlesticks"
source: "https://www.amcharts.com/demos/stock-chart-candlesticks/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

Fifteen years of daily Microsoft prices as candlesticks over volume. It is a plain XY chart: two value axes stacked over one date axis that skips the weekends.

Candles and volume together: Price alone shows where a stock went; volume shows how many shares changed hands on the way. Stacking the two on one date axis lines every candle up with its volume bar, so a big move on heavy trading reads differently from one on a quiet day.

Good for:
- Stock and crypto charts with trading volume
- Spotting big moves on heavy trading
- Any price with a count under it, like orders

Think twice when:
- Indicators, drawing tools and period buttons: use amCharts Stock Chart
- Several stocks at once: a volume pane each gets crowded
- Prices across a stock split: adjust them, or the chart shows a false drop

Prompt: Create a two-panel chart of daily Microsoft (MSFT) stock prices loaded from a CSV file: candlesticks above and trading volume columns below, sharing a date axis and cursor, with the days grouped into weeks or months when zoomed out. Add tooltips, legends and a scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({ // no minor grid lines in the scrollbar's small chart
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // a drag pans through the dates
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  layout: root.verticalLayout,
  pinchZoomX: true // pinch to zoom the dates on a touch screen
}));

chart.get("colors").set("step", 2); // every second theme color

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxisRenderer = am5xy.AxisRendererY.new(root, {
  pan: "zoom" // drag along the axis to zoom it
});
valueAxisRenderer.labels.template.setAll({
  centerY: am5.percent(100), // each label sits just above its grid line
  maxPosition: 0.98          // hide a label at the very top, where it would be cut
});
var valueAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: valueAxisRenderer,
  height: am5.percent(70) // the price axis takes 70% of the height
}));
// a header above the price axis with its name; the legend is added to it further down
valueAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Value",
  fontWeight: "bold",
  paddingBottom: 5, // 5px of space below...
  paddingTop: 5     // ...and above
}));

var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  pan: "zoom" // drag along the axis to zoom it
});
volumeAxisRenderer.labels.template.setAll({
  centerY: am5.percent(100), // labels above their grid lines...
  maxPosition: 0.98          // ...and none at the very top
});
var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: volumeAxisRenderer,
  height: am5.percent(30), // the volume axis takes the other 30%
  layer: 5,                // drawn on layer 5, above the elements without a layer
  numberFormat: "#a"       // short numbers, like 25M
}));
volumeAxis.axisHeader.set("paddingTop", 10); // a 10px gap above the volume header
volumeAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5
}));

var dateAxisRenderer = am5xy.AxisRendererX.new(root, {
  pan: "zoom",           // drag along the axis to zoom it
  minorGridEnabled: true // fainter grid lines between the labeled dates
});
dateAxisRenderer.labels.template.setAll({
  minPosition: 0.01, // hide labels at the very ends...
  maxPosition: 0.99  // ...where they would be cut
});
// a gapless date axis leaves out weekends and holidays, the days without prices
var dateAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  // zoomed out, days merge into weeks or months, so the candles stay wide enough to read
  groupData: true,
  baseInterval: { timeUnit: "day", count: 1 }, // one candle a day before any merging
  renderer: dateAxisRenderer
}));
dateAxis.set("tooltip", am5.Tooltip.new(root, {})); // shows the cursor's date on the axis

var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    clustered: false,          // each candle takes its day's full width
    calculateAggregates: true, // works out changes, like the tooltip's change from the day before
    stroke: color,
    name: "MSFT",
    xAxis: dateAxis,
    yAxis: valueAxis,
    valueYField: "Close",
    openValueYField: "Open",
    lowValueYField: "Low",
    highValueYField: "High",
    valueXField: "Date",
    // a merged candle takes the lowest low, highest high, first open and last close of its days
    lowValueYGrouped: "low",
    highValueYGrouped: "high",
    openValueYGrouped: "open",
    valueYGrouped: "close",
    // the legend shows the candle under the cursor, or the last close in view when there is none
    legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
    legendRangeValueText: "{valueYClose}"
  })
);

// the tooltip's text: the price and its change from the day before, in the theme's colors for up (positive) and
// down (negative), the same as the candles; the number format has three parts, for up, down and unchanged
function changeText() {
  var upColor = root.interfaceColors.get("positive").toCSSHex();
  var downColor = root.interfaceColors.get("negative").toCSSHex();
  return "{name}: {valueY} {valueYChangePreviousPercent.formatNumber('[" + upColor + "]+#,###.##|[" + downColor + "]#,###.##|0')}%";
}

var valueTooltip = valueSeries.set("tooltip", am5.Tooltip.new(root, {
  getFillFromSprite: false,         // the background is set below, not taken from the candle...
  getStrokeFromSprite: true,        // ...but the outline takes the candle's color...
  getLabelFillFromSprite: true,     // ...and so does the text
  autoTextColor: false,             // no automatic text color
  pointerOrientation: "horizontal", // the tooltip points sideways at the candle
  labelText: changeText()
}));
valueTooltip.get("background").set("fill", root.interfaceColors.get("background")); // a plain background

// new up or down colors recolor the candles: the change figure follows them
root.interfaceColors.on("positive", function () { valueTooltip.set("labelText", changeText()); });
root.interfaceColors.on("negative", function () { valueTooltip.set("labelText", changeText()); });

var firstColor = chart.get("colors").getIndex(0); // the theme's first color, for the volume
var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "MSFT",
  clustered: false, // each column takes its day's full width
  fill: firstColor,
  stroke: firstColor,
  valueYField: "Volume",
  valueXField: "Date",
  // a merged column adds up the volume of its days
  valueYGrouped: "sum",
  xAxis: dateAxis,
  yAxis: volumeAxis,
  legendValueText: "{valueY}", // the volume under the cursor
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // hover a column for its volume
  })
}));

// Add legend to axis header
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var valueLegend = valueAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true // a plain square marker in the series' color
  })
);
valueLegend.data.setAll([valueSeries]);

var volumeLegend = volumeAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true // the same for the volume
  })
);
volumeLegend.data.setAll([volumeSeries]);

// Stack axes vertically
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {}))

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50 // 50px tall, with a small chart of the prices inside
}));

// the scrollbar's small chart has its own axes and series
var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  groupData: true,   // merge days...
  groupIntervals: [{ // ...into weeks, so the small chart stays light
    timeUnit: "week",
    count: 1
  }],
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  })
}));

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Adj Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,   // a fill under the line...
  fillOpacity: 0.3 // ...30% opaque
});

// Load external data
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv").then(function (result) {

  // Parse loaded data
  var data = am5.CSVParser.parse(result.response, {
    delimiter: ",",      // values separated by commas
    reverse: true,       // the file lists the newest day first: flip it
    skipEmpty: true,     // skip empty lines
    useColumnNames: true // the first row names the fields
  });

  // Process data (convert dates and values)
  var processor = am5.DataProcessor.new(root, {
    dateFields: ["Date"],     // turn these date strings into timestamps...
    dateFormat: "yyyy-MM-dd", // ...read in this format...
    numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"] // ...and these strings into numbers
  });
  processor.processMany(data);

  // Start on the last three months, where each candle is one trading day
  valueSeries.events.once("datavalidated", function () {
    var lastDate = data[data.length - 1].Date;
    dateAxis.zoomToDates(am5.time.add(new Date(lastDate), "month", -3), am5.time.add(new Date(lastDate), "day", 1));
  });

  // Set data
  valueSeries.data.setAll(data);
  volumeSeries.data.setAll(data);
  sbSeries.data.setAll(data);
});

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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
