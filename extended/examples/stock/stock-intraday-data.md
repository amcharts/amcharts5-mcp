---
title: "Stock Intraday Data"
source: "https://www.amcharts.com/demos/stock-intraday-data/"
category: "stock"
scraped: "2026-10-08"
---

One trading day in 390 one-minute candles, 9:30 to 16:00, with each minute’s volume below. The axis shows New York time, wherever you are.

When to show minutes: Minute candles show what a daily candle hides: the rush after the open, the quiet midday hours, the busy last minutes before the close. The gapless date axis shows only trading time, so several days in a row would join up with no empty nights between them.

Good for:
- Day trading and live market screens
- Seeing how a single day unfolded
- News days: when exactly the price moved

Think twice when:
- Trends over weeks or months: daily candles are enough
- Many days of minutes: load them on demand or group them
- Readers in other time zones: say which time the axis shows

Prompt: Create a stock chart of one trading day in one-minute candles with volume for a made-up ticker, from 9:30 to 16:00 New York time, with the axis showing those times in every time zone. Add a toolbar with indicators, series types and drawing tools. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// The data's times are New York trading hours (9:30 to 16:00) stored as UTC: show them as they are,
// not moved to the visitor's time zone
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/#utc-and-time-zones
root.utc = true;

const myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({ // no minor grid lines in the scrollbar's small chart
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create a stock chart
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Instantiating_the_chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
  paddingRight: 0 // no gap at the right edge
}));

// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00"); // thousands separators and two decimals

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX", // the mouse wheel zooms in on the times
  panX: true,      // a drag pans through the times...
  panY: true       // ...and up and down
}));

// Create value axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the price axis to zoom it
  }),
  extraMin: 0.1, // adds some space for the main series
  tooltip: am5.Tooltip.new(root, {}), // shows the cursor's price on the axis
  numberFormat: "#,###.00",           // two decimals
  extraTooltipPrecision: 2            // the axis tooltip shows two more decimals than the labels
}));

// a gapless date axis leaves out nights and weekends (no trading), so the sessions join up
var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one candle a minute
    timeUnit: "minute",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    pan: "zoom",           // drag along the time axis to zoom it
    minorGridEnabled: true // fainter grid lines between the labeled times
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's time on the axis
}));

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  turboMode: true,           // draws all the candles at once, much faster with many of them
  name: "AMCH",
  clustered: false,          // each candle takes its minute's full width
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true, // also works out changes, highs and lows over the data
  xAxis: dateAxis,
  yAxis: valueAxis,
  // the legend shows the prices of the candle under the cursor...
  legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
  legendRangeValueText: "" // ...and nothing when the cursor is off the plot
}));

// Set main value series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));

// Create volume axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});

volumeAxisRenderer.labels.template.set("forceHidden", true); // no volume labels...
volumeAxisRenderer.grid.template.set("forceHidden", true);   // ...and no grid lines of its own

var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a", // short numbers: 3.9M rather than 3,938,600
  min: 0, // volume bars start at zero, also when zoomed in
  // the volume axis takes the bottom 20% of the panel, under the candles
  height: am5.percent(20),
  y: am5.percent(100),
  centerY: am5.percent(100),
  renderer: volumeAxisRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  turboMode: true,  // draws all the columns at once
  name: "Volume",
  clustered: false, // each column takes its minute's full width
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]" // the volume under the cursor, shortened
}));

volumeSeries.columns.template.setAll({
  strokeOpacity: 0, // no outline
  fillOpacity: 0.5  // half see-through
});

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem); // green if it closed at or above the minute before, else red
  }
  return fill;
})

// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]); // one legend for both series

// Add cursor(s)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries], // the cursor snaps to the candles
  snapToSeriesBy: "y!"
}));

// Add scrollbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50 // 50px tall, with a small chart of the closing prices inside
}));
// move the scrollbar out of the main panel, above all the panels
stockChart.toolsContainer.children.push(scrollbar);

// the scrollbar's small chart has its own axes and series
var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "minute",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  })
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,   // a fill under the line...
  fillOpacity: 0.3 // ...30% opaque
});

// Set up series type switcher
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/
var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

// when a type is picked, switch the main series to it
seriesSwitcher.events.on("selected", function (ev) {
  setSeriesType(ev.item.id);
});

// copies the settings a new series needs from the current one
function getNewSettings(series) {
  var newSettings = [];
  am5.array.each(["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "stroke", "fill"], function (setting) {
    newSettings[setting] = series.get(setting);
  });
  return newSettings;
}

// replaces the main series with one of another type, keeping its data and settings
function setSeriesType(seriesType) {
  // Get current series and its settings
  var currentSeries = stockChart.get("stockSeries");
  var newSettings = getNewSettings(currentSeries);

  // Remove previous series
  var data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  var series;
  switch (seriesType) {
    case "line":
      series = mainPanel.series.push(am5xy.LineSeries.new(root, newSettings));
      break;
    case "candlestick":
    case "procandlestick":
      newSettings.clustered = false; // each candle or bar takes its minute's full width
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
      if (seriesType == "procandlestick") {
        // "pro" candles: colored by the change from the minute before, hollow when closing above the open
        series.columns.template.get("themeTags").push("pro");
      }
      break;
    case "ohlc":
      newSettings.clustered = false;
      series = mainPanel.series.push(am5xy.OHLCSeries.new(root, newSettings));
      break;
  }

  // Set new series as stockSeries
  if (series) {
    valueLegend.data.removeValue(currentSeries); // take the old series out of the legend
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    var cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", [series]); // the cursor follows the new series
    }
    valueLegend.data.insertIndex(0, series); // the new series goes first in the legend
  }
}

// Stock toolbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"), // the toolbar's HTML element, above the chart
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, { // add indicators such as moving averages...
      stockChart: stockChart,
      legend: valueLegend // ...listed in the panel's legend
    }),
    seriesSwitcher, // line, candles or OHLC bars
    am5stock.DrawingControl.new(root, { // draw lines, shapes and labels on the chart
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, { // removes all drawings and indicators
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, { // regular, percent or logarithmic price scale, and more
      stockChart: stockChart
    })
  ]
})

// data
var data = [
  { Date: 1790760600000, Open: 282.73, High: 282.73, Low: 281.92, Close: 281.95, Volume: 55522 },
  { Date: 1790760660000, Open: 281.93, High: 282.49, Low: 281.69, Close: 282.16, Volume: 44862 },
  { Date: 1790760720000, Open: 282.19, High: 282.62, Low: 281.6, Close: 282.58, Volume: 60104 },
  { Date: 1790760780000, Open: 282.55, High: 282.57, Low: 281.77, Close: 281.95, Volume: 62857 },
  { Date: 1790760840000, Open: 281.8, High: 281.97, Low: 281.61, Close: 281.82, Volume: 46548 },
  { Date: 1790760900000, Open: 281.77, High: 282.39, Low: 281.75, Close: 282, Volume: 107311 },
  { Date: 1790760960000, Open: 282.08, High: 282.37, Low: 281.85, Close: 281.99, Volume: 44348 },
  { Date: 1790761020000, Open: 281.98, High: 282.05, Low: 281.8, Close: 281.84, Volume: 59741 },
  { Date: 1790761080000, Open: 281.82, High: 282.08, Low: 281.7, Close: 281.93, Volume: 59910 },
  { Date: 1790761140000, Open: 281.92, High: 282.17, Low: 281.74, Close: 281.75, Volume: 103366 },
  { Date: 1790761200000, Open: 281.77, High: 281.88, Low: 281.3, Close: 281.72, Volume: 108402 },
  { Date: 1790761260000, Open: 281.73, High: 282.29, Low: 281.65, Close: 282.18, Volume: 142668 },
  { Date: 1790761320000, Open: 282.14, High: 282.61, Low: 282.1, Close: 282.2, Volume: 116732 },
  { Date: 1790761380000, Open: 282.19, High: 282.86, Low: 282, Close: 282.86, Volume: 107624 },
  { Date: 1790761440000, Open: 282.82, High: 283.36, Low: 282.77, Close: 283.1, Volume: 102217 },
  { Date: 1790761500000, Open: 283.12, High: 283.5, Low: 282.9, Close: 283.44, Volume: 69037 },
  { Date: 1790761560000, Open: 283.45, High: 283.86, Low: 283.25, Close: 283.37, Volume: 64511 },
  { Date: 1790761620000, Open: 283.36, High: 283.77, Low: 283.2, Close: 283.64, Volume: 51860 },
  { Date: 1790761680000, Open: 283.66, High: 283.78, Low: 283.5, Close: 283.54, Volume: 44270 },
  { Date: 1790761740000, Open: 283.5, High: 283.73, Low: 283.21, Close: 283.25, Volume: 77339 },
  { Date: 1790761800000, Open: 283.23, High: 283.53, Low: 283.08, Close: 283.36, Volume: 56200 },
  { Date: 1790761860000, Open: 283.37, High: 283.58, Low: 283.27, Close: 283.4, Volume: 40796 },
  { Date: 1790761920000, Open: 283.37, High: 283.37, Low: 282.92, Close: 283.11, Volume: 39419 },
  { Date: 1790761980000, Open: 283.08, High: 283.23, Low: 282.93, Close: 283.08, Volume: 36623 },
  { Date: 1790762040000, Open: 283.06, High: 283.53, Low: 283.05, Close: 283.48, Volume: 35163 },
  { Date: 1790762100000, Open: 283.49, High: 283.54, Low: 283.08, Close: 283.12, Volume: 50792 },
  { Date: 1790762160000, Open: 283.08, High: 283.08, Low: 282.5, Close: 282.8, Volume: 68439 },
  { Date: 1790762220000, Open: 282.83, High: 283.09, Low: 282.81, Close: 283.03, Volume: 25099 },
  { Date: 1790762280000, Open: 283.17, High: 283.36, Low: 283.12, Close: 283.12, Volume: 38277 },
  { Date: 1790762340000, Open: 283.12, High: 283.14, Low: 282.17, Close: 282.76, Volume: 66937 },
  { Date: 1790762400000, Open: 282.78, High: 282.79, Low: 282.5, Close: 282.7, Volume: 29629 },
  { Date: 1790762460000, Open: 282.68, High: 282.76, Low: 282.36, Close: 282.4, Volume: 33094 },
  { Date: 1790762520000, Open: 282.42, High: 282.72, Low: 282.4, Close: 282.72, Volume: 37719 },
  { Date: 1790762580000, Open: 282.69, High: 282.78, Low: 282.51, Close: 282.57, Volume: 23199 },
  { Date: 1790762640000, Open: 282.64, High: 283.16, Low: 282.62, Close: 283.14, Volume: 41676 },
  { Date: 1790762700000, Open: 283.16, High: 283.7, Low: 283.16, Close: 283.65, Volume: 71061 },
  { Date: 1790762760000, Open: 283.69, High: 283.83, Low: 283.44, Close: 283.82, Volume: 52597 },
  { Date: 1790762820000, Open: 283.79, High: 283.85, Low: 283.48, Close: 283.79, Volume: 54694 },
  { Date: 1790762880000, Open: 283.78, High: 283.82, Low: 283.23, Close: 283.33, Volume: 35363 },
  { Date: 1790762940000, Open: 283.28, High: 283.29, Low: 282.85, Close: 283, Volume: 37211 },
  { Date: 1790763000000, Open: 282.96, High: 283.04, Low: 282.68, Close: 282.76, Volume: 30244 },
  { Date: 1790763060000, Open: 282.75, High: 282.81, Low: 282.62, Close: 282.8, Volume: 20986 },
  { Date: 1790763120000, Open: 282.82, High: 283.24, Low: 282.81, Close: 283.1, Volume: 37861 },
  { Date: 1790763180000, Open: 283.07, High: 283.22, Low: 282.86, Close: 282.98, Volume: 30877 },
  { Date: 1790763240000, Open: 282.96, High: 283.28, Low: 282.85, Close: 283.24, Volume: 23297 },
  { Date: 1790763300000, Open: 283.25, High: 283.98, Low: 283.25, Close: 283.93, Volume: 45930 },
  { Date: 1790763360000, Open: 283.98, High: 284.32, Low: 283.94, Close: 284.21, Volume: 60952 },
  { Date: 1790763420000, Open: 284.22, High: 284.24, Low: 283.87, Close: 283.91, Volume: 26137 },
  { Date: 1790763480000, Open: 283.9, High: 284.07, Low: 283.82, Close: 283.99, Volume: 24452 },
  { Date: 1790763540000, Open: 283.96, High: 284.18, Low: 283.9, Close: 284.05, Volume: 30367 },
  { Date: 1790763600000, Open: 284.02, High: 284.07, Low: 283.89, Close: 283.97, Volume: 14544 },
  { Date: 1790763660000, Open: 283.97, High: 284.24, Low: 283.92, Close: 284.23, Volume: 46323 },
  { Date: 1790763720000, Open: 284.23, High: 284.45, Low: 284.17, Close: 284.37, Volume: 46267 },
  { Date: 1790763780000, Open: 284.36, High: 284.53, Low: 284.2, Close: 284.53, Volume: 34193 },
  { Date: 1790763840000, Open: 284.52, High: 284.63, Low: 284.42, Close: 284.57, Volume: 26571 },
  { Date: 1790763900000, Open: 284.55, High: 284.57, Low: 284.19, Close: 284.29, Volume: 55144 },
  { Date: 1790763960000, Open: 284.28, High: 284.29, Low: 284.05, Close: 284.1, Volume: 31951 },
  { Date: 1790764020000, Open: 284.08, High: 284.2, Low: 284.05, Close: 284.14, Volume: 35332 },
  { Date: 1790764080000, Open: 284.17, High: 284.2, Low: 283.94, Close: 284.05, Volume: 53518 },
  { Date: 1790764140000, Open: 284.05, High: 284.22, Low: 283.96, Close: 284.07, Volume: 43175 },
  { Date: 1790764200000, Open: 284.1, High: 285.26, Low: 283.99, Close: 285.07, Volume: 87031 },
  { Date: 1790764260000, Open: 285.07, High: 285.19, Low: 284.84, Close: 284.86, Volume: 45023 },
  { Date: 1790764320000, Open: 284.84, High: 284.91, Low: 284.53, Close: 284.53, Volume: 18505 },
  { Date: 1790764380000, Open: 284.54, High: 284.63, Low: 284.34, Close: 284.57, Volume: 33079 },
  { Date: 1790764440000, Open: 284.55, High: 284.63, Low: 284.41, Close: 284.47, Volume: 23419 },
  { Date: 1790764500000, Open: 284.46, High: 284.6, Low: 284.29, Close: 284.31, Volume: 40430 },
  { Date: 1790764560000, Open: 284.33, High: 284.45, Low: 284.18, Close: 284.41, Volume: 19354 },
  { Date: 1790764620000, Open: 284.4, High: 284.46, Low: 284.05, Close: 284.07, Volume: 20545 },
  { Date: 1790764680000, Open: 284.08, High: 284.3, Low: 284.04, Close: 284.21, Volume: 16342 },
  { Date: 1790764740000, Open: 284.22, High: 284.28, Low: 283.8, Close: 283.87, Volume: 24988 },
  { Date: 1790764800000, Open: 283.85, High: 283.85, Low: 283.51, Close: 283.69, Volume: 57977 },
  { Date: 1790764860000, Open: 283.68, High: 283.97, Low: 283.6, Close: 283.89, Volume: 46137 },
  { Date: 1790764920000, Open: 283.91, High: 284.21, Low: 283.91, Close: 284.18, Volume: 16234 },
  { Date: 1790764980000, Open: 284.21, High: 284.35, Low: 284.14, Close: 284.23, Volume: 22813 },
  { Date: 1790765040000, Open: 284.22, High: 284.45, Low: 284.22, Close: 284.36, Volume: 42546 },
  { Date: 1790765100000, Open: 284.34, High: 284.53, Low: 284.34, Close: 284.48, Volume: 18541 },
  { Date: 1790765160000, Open: 284.44, High: 284.76, Low: 284.24, Close: 284.67, Volume: 33107 },
  { Date: 1790765220000, Open: 284.66, High: 284.66, Low: 284.14, Close: 284.16, Volume: 25193 },
  { Date: 1790765280000, Open: 284.14, High: 284.28, Low: 284.1, Close: 284.26, Volume: 37239 },
  { Date: 1790765340000, Open: 284.26, High: 284.4, Low: 284.09, Close: 284.16, Volume: 31077 },
  { Date: 1790765400000, Open: 284.18, High: 284.26, Low: 284.04, Close: 284.19, Volume: 22293 },
  { Date: 1790765460000, Open: 284.22, High: 284.26, Low: 284.06, Close: 284.1, Volume: 20200 },
  { Date: 1790765520000, Open: 284.09, High: 284.7, Low: 283.96, Close: 284.58, Volume: 39355 },
  { Date: 1790765580000, Open: 284.63, High: 284.68, Low: 284.34, Close: 284.34, Volume: 20627 },
  { Date: 1790765640000, Open: 284.36, High: 284.59, Low: 284.34, Close: 284.4, Volume: 19732 },
  { Date: 1790765700000, Open: 284.38, High: 284.49, Low: 284.16, Close: 284.24, Volume: 26977 },
  { Date: 1790765760000, Open: 284.25, High: 284.25, Low: 283.91, Close: 283.95, Volume: 23927 },
  { Date: 1790765820000, Open: 283.94, High: 284.04, Low: 283.69, Close: 283.76, Volume: 31329 },
  { Date: 1790765880000, Open: 283.74, High: 283.75, Low: 283.59, Close: 283.68, Volume: 38368 },
  { Date: 1790765940000, Open: 283.69, High: 283.84, Low: 283.6, Close: 283.6, Volume: 22433 },
  { Date: 1790766000000, Open: 283.64, High: 284.15, Low: 283.62, Close: 284.03, Volume: 33964 },
  { Date: 1790766060000, Open: 283.98, High: 284.14, Low: 283.91, Close: 284.01, Volume: 27711 },
  { Date: 1790766120000, Open: 283.98, High: 284.22, Low: 283.9, Close: 284.17, Volume: 17090 },
  { Date: 1790766180000, Open: 284.18, High: 285.02, Low: 284.14, Close: 284.99, Volume: 73585 },
  { Date: 1790766240000, Open: 284.98, High: 285.26, Low: 284.81, Close: 284.81, Volume: 77582 },
  { Date: 1790766300000, Open: 284.81, High: 284.9, Low: 284.67, Close: 284.72, Volume: 33368 },
  { Date: 1790766360000, Open: 284.67, High: 284.69, Low: 284.47, Close: 284.6, Volume: 19578 },
  { Date: 1790766420000, Open: 284.61, High: 284.69, Low: 284.54, Close: 284.68, Volume: 30905 },
  { Date: 1790766480000, Open: 284.69, High: 284.9, Low: 284.62, Close: 284.88, Volume: 39504 },
  { Date: 1790766540000, Open: 284.87, High: 284.87, Low: 284.61, Close: 284.62, Volume: 26355 },
  { Date: 1790766600000, Open: 284.61, High: 284.78, Low: 284.52, Close: 284.76, Volume: 26386 },
  { Date: 1790766660000, Open: 284.78, High: 284.86, Low: 284.63, Close: 284.78, Volume: 25872 },
  { Date: 1790766720000, Open: 284.76, High: 284.88, Low: 284.71, Close: 284.76, Volume: 18526 },
  { Date: 1790766780000, Open: 284.75, High: 285.24, Low: 284.74, Close: 285.15, Volume: 38250 },
  { Date: 1790766840000, Open: 285.17, High: 285.42, Low: 285.05, Close: 285.3, Volume: 80991 },
  { Date: 1790766900000, Open: 285.29, High: 285.34, Low: 285.08, Close: 285.22, Volume: 37712 },
  { Date: 1790766960000, Open: 285.24, High: 285.3, Low: 285.1, Close: 285.1, Volume: 25697 },
  { Date: 1790767020000, Open: 285.09, High: 285.14, Low: 284.89, Close: 285.07, Volume: 32478 },
  { Date: 1790767080000, Open: 285.06, High: 285.25, Low: 285.05, Close: 285.21, Volume: 31950 },
  { Date: 1790767140000, Open: 285.2, High: 285.22, Low: 285.07, Close: 285.16, Volume: 12448 },
  { Date: 1790767200000, Open: 285.17, High: 285.23, Low: 284.99, Close: 285.01, Volume: 26271 },
  { Date: 1790767260000, Open: 285, High: 285.23, Low: 284.99, Close: 285.17, Volume: 32554 },
  { Date: 1790767320000, Open: 285.18, High: 285.42, Low: 285.15, Close: 285.36, Volume: 45911 },
  { Date: 1790767380000, Open: 285.38, High: 285.6, Low: 285.38, Close: 285.55, Volume: 47816 },
  { Date: 1790767440000, Open: 285.51, High: 285.59, Low: 285.44, Close: 285.5, Volume: 31700 },
  { Date: 1790767500000, Open: 285.5, High: 285.9, Low: 285.5, Close: 285.87, Volume: 51563 },
  { Date: 1790767560000, Open: 285.83, High: 285.9, Low: 285.68, Close: 285.71, Volume: 37968 },
  { Date: 1790767620000, Open: 285.72, High: 285.76, Low: 285.6, Close: 285.61, Volume: 20678 },
  { Date: 1790767680000, Open: 285.58, High: 285.67, Low: 285.4, Close: 285.54, Volume: 18607 },
  { Date: 1790767740000, Open: 285.58, High: 285.62, Low: 285.49, Close: 285.56, Volume: 16850 },
  { Date: 1790767800000, Open: 285.57, High: 285.78, Low: 285.53, Close: 285.76, Volume: 22000 },
  { Date: 1790767860000, Open: 285.75, High: 285.8, Low: 285.68, Close: 285.68, Volume: 22715 },
  { Date: 1790767920000, Open: 285.69, High: 285.8, Low: 285.65, Close: 285.69, Volume: 26349 },
  { Date: 1790767980000, Open: 285.69, High: 285.83, Low: 285.67, Close: 285.71, Volume: 22740 },
  { Date: 1790768040000, Open: 285.69, High: 285.96, Low: 285.48, Close: 285.65, Volume: 57494 },
  { Date: 1790768100000, Open: 285.67, High: 285.77, Low: 285.56, Close: 285.68, Volume: 20805 },
  { Date: 1790768160000, Open: 285.69, High: 285.8, Low: 285.65, Close: 285.72, Volume: 34365 },
  { Date: 1790768220000, Open: 285.72, High: 285.72, Low: 285.58, Close: 285.59, Volume: 19158 },
  { Date: 1790768280000, Open: 285.58, High: 285.7, Low: 285.57, Close: 285.7, Volume: 23436 },
  { Date: 1790768340000, Open: 285.7, High: 285.76, Low: 285.61, Close: 285.74, Volume: 16478 },
  { Date: 1790768400000, Open: 285.77, High: 285.81, Low: 285.64, Close: 285.69, Volume: 31069 },
  { Date: 1790768460000, Open: 285.7, High: 285.7, Low: 285.62, Close: 285.7, Volume: 16625 },
  { Date: 1790768520000, Open: 285.71, High: 286, Low: 285.71, Close: 286, Volume: 34302 },
  { Date: 1790768580000, Open: 286, High: 286.1, Low: 285.82, Close: 285.86, Volume: 35727 },
  { Date: 1790768640000, Open: 285.85, High: 285.86, Low: 285.56, Close: 285.63, Volume: 42080 },
  { Date: 1790768700000, Open: 285.65, High: 285.65, Low: 285.19, Close: 285.19, Volume: 35268 },
  { Date: 1790768760000, Open: 285.2, High: 285.36, Low: 285.18, Close: 285.33, Volume: 35098 },
  { Date: 1790768820000, Open: 285.33, High: 285.36, Low: 285.17, Close: 285.17, Volume: 20557 },
  { Date: 1790768880000, Open: 285.17, High: 285.29, Low: 285.1, Close: 285.26, Volume: 16803 },
  { Date: 1790768940000, Open: 285.24, High: 285.36, Low: 285.2, Close: 285.36, Volume: 15292 },
  { Date: 1790769000000, Open: 285.33, High: 285.39, Low: 285.27, Close: 285.29, Volume: 25898 },
  { Date: 1790769060000, Open: 285.28, High: 285.47, Low: 285.26, Close: 285.32, Volume: 19607 },
  { Date: 1790769120000, Open: 285.34, High: 285.46, Low: 285.26, Close: 285.46, Volume: 13002 },
  { Date: 1790769180000, Open: 285.49, High: 285.56, Low: 285.48, Close: 285.56, Volume: 14955 },
  { Date: 1790769240000, Open: 285.55, High: 285.67, Low: 285.55, Close: 285.61, Volume: 21725 },
  { Date: 1790769300000, Open: 285.6, High: 285.61, Low: 285.5, Close: 285.57, Volume: 24164 },
  { Date: 1790769360000, Open: 285.58, High: 285.6, Low: 285.41, Close: 285.47, Volume: 24789 },
  { Date: 1790769420000, Open: 285.45, High: 285.67, Low: 285.44, Close: 285.67, Volume: 16814 },
  { Date: 1790769480000, Open: 285.64, High: 285.67, Low: 285.53, Close: 285.66, Volume: 15273 },
  { Date: 1790769540000, Open: 285.66, High: 285.68, Low: 285.54, Close: 285.67, Volume: 17328 },
  { Date: 1790769600000, Open: 285.66, High: 285.72, Low: 285.35, Close: 285.38, Volume: 33397 },
  { Date: 1790769660000, Open: 285.36, High: 285.43, Low: 285.26, Close: 285.34, Volume: 28198 },
  { Date: 1790769720000, Open: 285.33, High: 285.42, Low: 285.23, Close: 285.37, Volume: 12687 },
  { Date: 1790769780000, Open: 285.39, High: 285.64, Low: 285.39, Close: 285.61, Volume: 17180 },
  { Date: 1790769840000, Open: 285.63, High: 285.8, Low: 285.63, Close: 285.72, Volume: 25027 },
  { Date: 1790769900000, Open: 285.7, High: 285.81, Low: 285.64, Close: 285.73, Volume: 19857 },
  { Date: 1790769960000, Open: 285.71, High: 285.72, Low: 285.48, Close: 285.63, Volume: 34650 },
  { Date: 1790770020000, Open: 285.63, High: 285.77, Low: 285.63, Close: 285.7, Volume: 16469 },
  { Date: 1790770080000, Open: 285.69, High: 285.87, Low: 285.59, Close: 285.76, Volume: 14704 },
  { Date: 1790770140000, Open: 285.74, High: 285.98, Low: 285.73, Close: 285.94, Volume: 24354 },
  { Date: 1790770200000, Open: 285.92, High: 286.07, Low: 285.63, Close: 285.69, Volume: 41856 },
  { Date: 1790770260000, Open: 285.7, High: 285.7, Low: 285.43, Close: 285.63, Volume: 22231 },
  { Date: 1790770320000, Open: 285.63, High: 285.69, Low: 285.52, Close: 285.64, Volume: 13064 },
  { Date: 1790770380000, Open: 285.63, High: 285.63, Low: 285.5, Close: 285.57, Volume: 15223 },
  { Date: 1790770440000, Open: 285.65, High: 285.83, Low: 285.56, Close: 285.83, Volume: 37501 },
  { Date: 1790770500000, Open: 285.84, High: 285.85, Low: 285.69, Close: 285.71, Volume: 21245 },
  { Date: 1790770560000, Open: 285.7, High: 285.72, Low: 285.62, Close: 285.66, Volume: 17972 },
  { Date: 1790770620000, Open: 285.65, High: 285.77, Low: 285.59, Close: 285.65, Volume: 16845 },
  { Date: 1790770680000, Open: 285.68, High: 286.01, Low: 285.68, Close: 286.01, Volume: 27338 },
  { Date: 1790770740000, Open: 286.01, High: 286.29, Low: 285.99, Close: 286.12, Volume: 57536 },
  { Date: 1790770800000, Open: 286.13, High: 286.13, Low: 285.83, Close: 285.94, Volume: 19150 },
  { Date: 1790770860000, Open: 285.93, High: 286.03, Low: 285.86, Close: 286.02, Volume: 23586 },
  { Date: 1790770920000, Open: 286.03, High: 286.3, Low: 286.02, Close: 286.26, Volume: 38761 },
  { Date: 1790770980000, Open: 286.28, High: 286.34, Low: 286.13, Close: 286.16, Volume: 23405 },
  { Date: 1790771040000, Open: 286.19, High: 286.2, Low: 286.07, Close: 286.18, Volume: 14660 },
  { Date: 1790771100000, Open: 286.17, High: 286.42, Low: 286.15, Close: 286.32, Volume: 41203 },
  { Date: 1790771160000, Open: 286.32, High: 286.36, Low: 286.19, Close: 286.22, Volume: 19782 },
  { Date: 1790771220000, Open: 286.2, High: 286.27, Low: 285.9, Close: 286.12, Volume: 49183 },
  { Date: 1790771280000, Open: 286.12, High: 286.2, Low: 286.12, Close: 286.12, Volume: 13620 },
  { Date: 1790771340000, Open: 286.14, High: 286.14, Low: 286.05, Close: 286.07, Volume: 15096 },
  { Date: 1790771400000, Open: 286.09, High: 286.13, Low: 285.91, Close: 285.99, Volume: 27396 },
  { Date: 1790771460000, Open: 286, High: 286.01, Low: 285.89, Close: 286, Volume: 20352 },
  { Date: 1790771520000, Open: 286.02, High: 286.05, Low: 285.87, Close: 286.02, Volume: 21114 },
  { Date: 1790771580000, Open: 286.03, High: 286.05, Low: 285.83, Close: 285.86, Volume: 20378 },
  { Date: 1790771640000, Open: 285.87, High: 286, Low: 285.84, Close: 285.92, Volume: 34398 },
  { Date: 1790771700000, Open: 285.92, High: 286.24, Low: 285.92, Close: 286.18, Volume: 26062 },
  { Date: 1790771760000, Open: 286.16, High: 286.32, Low: 286.11, Close: 286.13, Volume: 27939 },
  { Date: 1790771820000, Open: 286.13, High: 286.25, Low: 286.13, Close: 286.25, Volume: 28972 },
  { Date: 1790771880000, Open: 286.25, High: 286.29, Low: 286.06, Close: 286.06, Volume: 32361 },
  { Date: 1790771940000, Open: 286.1, High: 286.26, Low: 286.04, Close: 286.22, Volume: 16056 },
  { Date: 1790772000000, Open: 286.25, High: 286.62, Low: 286.16, Close: 286.23, Volume: 29015 },
  { Date: 1790772060000, Open: 286.23, High: 286.26, Low: 286.14, Close: 286.2, Volume: 17686 },
  { Date: 1790772120000, Open: 286.17, High: 286.19, Low: 286.1, Close: 286.17, Volume: 15480 },
  { Date: 1790772180000, Open: 286.18, High: 286.28, Low: 286.17, Close: 286.27, Volume: 17654 },
  { Date: 1790772240000, Open: 286.27, High: 286.4, Low: 286.24, Close: 286.27, Volume: 23426 },
  { Date: 1790772300000, Open: 286.28, High: 286.39, Low: 286.19, Close: 286.3, Volume: 23571 },
  { Date: 1790772360000, Open: 286.29, High: 286.35, Low: 286.25, Close: 286.27, Volume: 12630 },
  { Date: 1790772420000, Open: 286.29, High: 286.32, Low: 286.23, Close: 286.32, Volume: 13372 },
  { Date: 1790772480000, Open: 286.3, High: 286.41, Low: 286.27, Close: 286.29, Volume: 14142 },
  { Date: 1790772540000, Open: 286.3, High: 286.34, Low: 286.16, Close: 286.3, Volume: 39928 },
  { Date: 1790772600000, Open: 286.3, High: 286.42, Low: 286.28, Close: 286.34, Volume: 19423 },
  { Date: 1790772660000, Open: 286.36, High: 286.4, Low: 286.23, Close: 286.24, Volume: 22212 },
  { Date: 1790772720000, Open: 286.26, High: 286.31, Low: 286.16, Close: 286.2, Volume: 20930 },
  { Date: 1790772780000, Open: 286.21, High: 286.26, Low: 286.14, Close: 286.25, Volume: 15616 },
  { Date: 1790772840000, Open: 286.26, High: 286.36, Low: 286.22, Close: 286.24, Volume: 19106 },
  { Date: 1790772900000, Open: 286.25, High: 286.27, Low: 286.18, Close: 286.19, Volume: 22496 },
  { Date: 1790772960000, Open: 286.2, High: 286.21, Low: 286.1, Close: 286.19, Volume: 22694 },
  { Date: 1790773020000, Open: 286.17, High: 286.22, Low: 286.1, Close: 286.22, Volume: 23774 },
  { Date: 1790773080000, Open: 286.2, High: 286.28, Low: 286.06, Close: 286.06, Volume: 21255 },
  { Date: 1790773140000, Open: 286.08, High: 286.16, Low: 286.02, Close: 286.09, Volume: 22495 },
  { Date: 1790773200000, Open: 286.1, High: 286.16, Low: 286.04, Close: 286.13, Volume: 18638 },
  { Date: 1790773260000, Open: 286.12, High: 286.22, Low: 286.01, Close: 286.07, Volume: 28439 },
  { Date: 1790773320000, Open: 286.07, High: 286.3, Low: 285.97, Close: 286.3, Volume: 32658 },
  { Date: 1790773380000, Open: 286.28, High: 286.44, Low: 286.24, Close: 286.34, Volume: 20654 },
  { Date: 1790773440000, Open: 286.33, High: 286.39, Low: 286.23, Close: 286.25, Volume: 17270 },
  { Date: 1790773500000, Open: 286.25, High: 286.31, Low: 286.21, Close: 286.28, Volume: 11596 },
  { Date: 1790773560000, Open: 286.29, High: 286.37, Low: 286.06, Close: 286.1, Volume: 35632 },
  { Date: 1790773620000, Open: 286.11, High: 286.22, Low: 286.05, Close: 286.12, Volume: 17587 },
  { Date: 1790773680000, Open: 286.11, High: 286.24, Low: 286.1, Close: 286.23, Volume: 11695 },
  { Date: 1790773740000, Open: 286.22, High: 286.35, Low: 286.2, Close: 286.28, Volume: 14107 },
  { Date: 1790773800000, Open: 286.27, High: 286.4, Low: 286.23, Close: 286.39, Volume: 20065 },
  { Date: 1790773860000, Open: 286.36, High: 286.62, Low: 286.36, Close: 286.57, Volume: 42629 },
  { Date: 1790773920000, Open: 286.58, High: 286.74, Low: 286.57, Close: 286.67, Volume: 25175 },
  { Date: 1790773980000, Open: 286.66, High: 286.66, Low: 286.52, Close: 286.55, Volume: 16457 },
  { Date: 1790774040000, Open: 286.55, High: 286.55, Low: 286.34, Close: 286.39, Volume: 17989 },
  { Date: 1790774100000, Open: 286.38, High: 286.45, Low: 286.32, Close: 286.42, Volume: 16288 },
  { Date: 1790774160000, Open: 286.41, High: 286.43, Low: 286.35, Close: 286.43, Volume: 12470 },
  { Date: 1790774220000, Open: 286.44, High: 286.48, Low: 286.33, Close: 286.4, Volume: 15141 },
  { Date: 1790774280000, Open: 286.43, High: 286.56, Low: 286.41, Close: 286.52, Volume: 21990 },
  { Date: 1790774340000, Open: 286.53, High: 286.54, Low: 286.38, Close: 286.43, Volume: 16585 },
  { Date: 1790774400000, Open: 286.41, High: 286.58, Low: 286.37, Close: 286.55, Volume: 19651 },
  { Date: 1790774460000, Open: 286.54, High: 286.65, Low: 286.52, Close: 286.61, Volume: 12811 },
  { Date: 1790774520000, Open: 286.58, High: 286.65, Low: 286.57, Close: 286.62, Volume: 11652 },
  { Date: 1790774580000, Open: 286.62, High: 286.79, Low: 286.62, Close: 286.79, Volume: 20925 },
  { Date: 1790774640000, Open: 286.8, High: 286.86, Low: 286.59, Close: 286.63, Volume: 22225 },
  { Date: 1790774700000, Open: 286.61, High: 286.62, Low: 286.31, Close: 286.33, Volume: 30324 },
  { Date: 1790774760000, Open: 286.32, High: 286.44, Low: 286.27, Close: 286.33, Volume: 29903 },
  { Date: 1790774820000, Open: 286.33, High: 286.44, Low: 286.28, Close: 286.39, Volume: 23032 },
  { Date: 1790774880000, Open: 286.41, High: 286.5, Low: 286.33, Close: 286.4, Volume: 30054 },
  { Date: 1790774940000, Open: 286.43, High: 286.58, Low: 286.43, Close: 286.54, Volume: 16300 },
  { Date: 1790775000000, Open: 286.56, High: 286.58, Low: 286.35, Close: 286.35, Volume: 16773 },
  { Date: 1790775060000, Open: 286.33, High: 286.33, Low: 286.26, Close: 286.32, Volume: 17825 },
  { Date: 1790775120000, Open: 286.29, High: 286.44, Low: 286.28, Close: 286.34, Volume: 11774 },
  { Date: 1790775180000, Open: 286.34, High: 286.36, Low: 286.15, Close: 286.22, Volume: 21540 },
  { Date: 1790775240000, Open: 286.21, High: 286.26, Low: 286.11, Close: 286.13, Volume: 34196 },
  { Date: 1790775300000, Open: 286.14, High: 286.17, Low: 286.08, Close: 286.11, Volume: 11905 },
  { Date: 1790775360000, Open: 286.08, High: 286.09, Low: 285.93, Close: 286.02, Volume: 57100 },
  { Date: 1790775420000, Open: 286.01, High: 286.03, Low: 285.83, Close: 285.93, Volume: 24832 },
  { Date: 1790775480000, Open: 285.94, High: 286, Low: 285.94, Close: 285.99, Volume: 9228 },
  { Date: 1790775540000, Open: 285.97, High: 286.1, Low: 285.95, Close: 286.08, Volume: 13612 },
  { Date: 1790775600000, Open: 286.08, High: 286.14, Low: 286, Close: 286.06, Volume: 14908 },
  { Date: 1790775660000, Open: 286.05, High: 286.05, Low: 285.92, Close: 286.04, Volume: 13503 },
  { Date: 1790775720000, Open: 286.03, High: 286.07, Low: 285.89, Close: 285.92, Volume: 25104 },
  { Date: 1790775780000, Open: 285.95, High: 285.96, Low: 285.85, Close: 285.92, Volume: 11515 },
  { Date: 1790775840000, Open: 285.94, High: 286.05, Low: 285.93, Close: 285.94, Volume: 14407 },
  { Date: 1790775900000, Open: 285.93, High: 286.03, Low: 285.92, Close: 286.03, Volume: 29697 },
  { Date: 1790775960000, Open: 286.04, High: 286.14, Low: 285.95, Close: 285.99, Volume: 14550 },
  { Date: 1790776020000, Open: 285.99, High: 285.99, Low: 285.75, Close: 285.75, Volume: 42672 },
  { Date: 1790776080000, Open: 285.73, High: 285.76, Low: 285.58, Close: 285.68, Volume: 30775 },
  { Date: 1790776140000, Open: 285.69, High: 285.81, Low: 285.68, Close: 285.8, Volume: 15785 },
  { Date: 1790776200000, Open: 285.8, High: 285.8, Low: 285.62, Close: 285.67, Volume: 16283 },
  { Date: 1790776260000, Open: 285.66, High: 285.67, Low: 285.56, Close: 285.58, Volume: 20315 },
  { Date: 1790776320000, Open: 285.57, High: 285.57, Low: 285.36, Close: 285.43, Volume: 23877 },
  { Date: 1790776380000, Open: 285.45, High: 285.47, Low: 285.28, Close: 285.34, Volume: 36273 },
  { Date: 1790776440000, Open: 285.33, High: 285.48, Low: 285.28, Close: 285.46, Volume: 26077 },
  { Date: 1790776500000, Open: 285.46, High: 285.6, Low: 285.46, Close: 285.5, Volume: 20545 },
  { Date: 1790776560000, Open: 285.52, High: 285.6, Low: 285.45, Close: 285.6, Volume: 30858 },
  { Date: 1790776620000, Open: 285.62, High: 285.69, Low: 285.6, Close: 285.66, Volume: 13738 },
  { Date: 1790776680000, Open: 285.68, High: 285.8, Low: 285.68, Close: 285.71, Volume: 22668 },
  { Date: 1790776740000, Open: 285.7, High: 286.01, Low: 285.69, Close: 285.94, Volume: 32283 },
  { Date: 1790776800000, Open: 285.94, High: 286, Low: 285.86, Close: 285.9, Volume: 21954 },
  { Date: 1790776860000, Open: 285.9, High: 285.98, Low: 285.84, Close: 285.87, Volume: 18435 },
  { Date: 1790776920000, Open: 285.92, High: 286, Low: 285.87, Close: 285.91, Volume: 17877 },
  { Date: 1790776980000, Open: 285.91, High: 286.11, Low: 285.9, Close: 285.93, Volume: 28928 },
  { Date: 1790777040000, Open: 285.93, High: 286.1, Low: 285.86, Close: 286.06, Volume: 30313 },
  { Date: 1790777100000, Open: 286.05, High: 286.12, Low: 285.95, Close: 286.06, Volume: 17560 },
  { Date: 1790777160000, Open: 286.07, High: 286.28, Low: 286.06, Close: 286.26, Volume: 26634 },
  { Date: 1790777220000, Open: 286.26, High: 286.34, Low: 286.21, Close: 286.21, Volume: 21552 },
  { Date: 1790777280000, Open: 286.21, High: 286.36, Low: 286.19, Close: 286.33, Volume: 16173 },
  { Date: 1790777340000, Open: 286.34, High: 286.41, Low: 286.27, Close: 286.29, Volume: 10113 },
  { Date: 1790777400000, Open: 286.28, High: 286.28, Low: 286.1, Close: 286.16, Volume: 23948 },
  { Date: 1790777460000, Open: 286.15, High: 286.15, Low: 286.03, Close: 286.08, Volume: 25395 },
  { Date: 1790777520000, Open: 286.05, High: 286.05, Low: 285.78, Close: 285.83, Volume: 30288 },
  { Date: 1790777580000, Open: 285.84, High: 286.09, Low: 285.79, Close: 286.06, Volume: 19991 },
  { Date: 1790777640000, Open: 286.06, High: 286.09, Low: 285.98, Close: 286, Volume: 16041 },
  { Date: 1790777700000, Open: 286, High: 286.1, Low: 285.95, Close: 286.1, Volume: 13064 },
  { Date: 1790777760000, Open: 286.06, High: 286.1, Low: 286.02, Close: 286.05, Volume: 8628 },
  { Date: 1790777820000, Open: 286.06, High: 286.1, Low: 285.99, Close: 286.04, Volume: 17819 },
  { Date: 1790777880000, Open: 286.04, High: 286.09, Low: 285.98, Close: 286.06, Volume: 16794 },
  { Date: 1790777940000, Open: 286.06, High: 286.16, Low: 286.03, Close: 286.12, Volume: 18364 },
  { Date: 1790778000000, Open: 286.1, High: 286.23, Low: 286.1, Close: 286.13, Volume: 14573 },
  { Date: 1790778060000, Open: 286.13, High: 286.37, Low: 286.11, Close: 286.26, Volume: 29790 },
  { Date: 1790778120000, Open: 286.27, High: 286.32, Low: 286.21, Close: 286.31, Volume: 15409 },
  { Date: 1790778180000, Open: 286.31, High: 286.31, Low: 286.09, Close: 286.1, Volume: 10858 },
  { Date: 1790778240000, Open: 286.12, High: 286.26, Low: 286.12, Close: 286.21, Volume: 16660 },
  { Date: 1790778300000, Open: 286.21, High: 286.26, Low: 286.01, Close: 286.19, Volume: 38241 },
  { Date: 1790778360000, Open: 286.18, High: 286.3, Low: 286.14, Close: 286.23, Volume: 19257 },
  { Date: 1790778420000, Open: 286.21, High: 286.34, Low: 286.18, Close: 286.32, Volume: 17021 },
  { Date: 1790778480000, Open: 286.33, High: 286.44, Low: 286.33, Close: 286.44, Volume: 14404 },
  { Date: 1790778540000, Open: 286.44, High: 286.44, Low: 286.33, Close: 286.36, Volume: 20730 },
  { Date: 1790778600000, Open: 286.36, High: 286.4, Low: 286.3, Close: 286.4, Volume: 20346 },
  { Date: 1790778660000, Open: 286.41, High: 286.43, Low: 286.15, Close: 286.19, Volume: 23709 },
  { Date: 1790778720000, Open: 286.19, High: 286.33, Low: 286.19, Close: 286.3, Volume: 12125 },
  { Date: 1790778780000, Open: 286.33, High: 286.37, Low: 286.27, Close: 286.27, Volume: 22493 },
  { Date: 1790778840000, Open: 286.28, High: 286.4, Low: 286.27, Close: 286.39, Volume: 18132 },
  { Date: 1790778900000, Open: 286.38, High: 286.53, Low: 286.35, Close: 286.41, Volume: 37205 },
  { Date: 1790778960000, Open: 286.4, High: 286.63, Low: 286.38, Close: 286.59, Volume: 27489 },
  { Date: 1790779020000, Open: 286.59, High: 286.76, Low: 286.58, Close: 286.73, Volume: 33522 },
  { Date: 1790779080000, Open: 286.73, High: 286.84, Low: 286.71, Close: 286.82, Volume: 27767 },
  { Date: 1790779140000, Open: 286.81, High: 286.86, Low: 286.66, Close: 286.74, Volume: 28545 },
  { Date: 1790779200000, Open: 286.74, High: 286.85, Low: 286.71, Close: 286.84, Volume: 12483 },
  { Date: 1790779260000, Open: 286.84, High: 286.92, Low: 286.83, Close: 286.92, Volume: 16485 },
  { Date: 1790779320000, Open: 286.92, High: 286.97, Low: 286.81, Close: 286.87, Volume: 27154 },
  { Date: 1790779380000, Open: 286.89, High: 286.92, Low: 286.86, Close: 286.89, Volume: 14502 },
  { Date: 1790779440000, Open: 286.92, High: 287.03, Low: 286.87, Close: 286.95, Volume: 29184 },
  { Date: 1790779500000, Open: 286.95, High: 287, Low: 286.87, Close: 286.92, Volume: 29174 },
  { Date: 1790779560000, Open: 286.94, High: 287, Low: 286.81, Close: 286.81, Volume: 38363 },
  { Date: 1790779620000, Open: 286.87, High: 287.1, Low: 286.87, Close: 287.05, Volume: 23032 },
  { Date: 1790779680000, Open: 287.07, High: 287.28, Low: 287.05, Close: 287.21, Volume: 39755 },
  { Date: 1790779740000, Open: 287.21, High: 287.26, Low: 287.15, Close: 287.21, Volume: 35864 },
  { Date: 1790779800000, Open: 287.21, High: 287.34, Low: 287.05, Close: 287.07, Volume: 44299 },
  { Date: 1790779860000, Open: 287.06, High: 287.2, Low: 287.03, Close: 287.12, Volume: 19374 },
  { Date: 1790779920000, Open: 287.11, High: 287.2, Low: 287.06, Close: 287.1, Volume: 22775 },
  { Date: 1790779980000, Open: 287.09, High: 287.22, Low: 287.07, Close: 287.16, Volume: 11901 },
  { Date: 1790780040000, Open: 287.17, High: 287.22, Low: 287.05, Close: 287.07, Volume: 20224 },
  { Date: 1790780100000, Open: 287.07, High: 287.13, Low: 287.03, Close: 287.08, Volume: 17358 },
  { Date: 1790780160000, Open: 287.11, High: 287.18, Low: 287.08, Close: 287.18, Volume: 24833 },
  { Date: 1790780220000, Open: 287.18, High: 287.41, Low: 287.18, Close: 287.32, Volume: 55834 },
  { Date: 1790780280000, Open: 287.33, High: 287.42, Low: 287.3, Close: 287.39, Volume: 27115 },
  { Date: 1790780340000, Open: 287.38, High: 287.4, Low: 287.2, Close: 287.22, Volume: 22168 },
  { Date: 1790780400000, Open: 287.23, High: 287.34, Low: 287.05, Close: 287.06, Volume: 38061 },
  { Date: 1790780460000, Open: 287.07, High: 287.07, Low: 286.86, Close: 286.9, Volume: 32873 },
  { Date: 1790780520000, Open: 286.91, High: 286.98, Low: 286.77, Close: 286.94, Volume: 29357 },
  { Date: 1790780580000, Open: 286.94, High: 287, Low: 286.77, Close: 286.82, Volume: 39595 },
  { Date: 1790780640000, Open: 286.82, High: 286.91, Low: 286.78, Close: 286.91, Volume: 14471 },
  { Date: 1790780700000, Open: 286.9, High: 287.3, Low: 286.9, Close: 287.28, Volume: 30883 },
  { Date: 1790780760000, Open: 287.27, High: 287.42, Low: 287.22, Close: 287.38, Volume: 32260 },
  { Date: 1790780820000, Open: 287.39, High: 287.58, Low: 287.37, Close: 287.44, Volume: 51364 },
  { Date: 1790780880000, Open: 287.44, High: 287.72, Low: 287.43, Close: 287.51, Volume: 37347 },
  { Date: 1790780940000, Open: 287.53, High: 287.77, Low: 287.51, Close: 287.67, Volume: 38998 },
  { Date: 1790781000000, Open: 287.7, High: 287.79, Low: 287.64, Close: 287.76, Volume: 31985 },
  { Date: 1790781060000, Open: 287.75, High: 287.77, Low: 287.58, Close: 287.74, Volume: 29039 },
  { Date: 1790781120000, Open: 287.73, High: 287.79, Low: 287.65, Close: 287.78, Volume: 33026 },
  { Date: 1790781180000, Open: 287.8, High: 287.87, Low: 287.76, Close: 287.81, Volume: 27689 },
  { Date: 1790781240000, Open: 287.83, High: 287.92, Low: 287.8, Close: 287.82, Volume: 28882 },
  { Date: 1790781300000, Open: 287.81, High: 287.97, Low: 287.8, Close: 287.95, Volume: 29592 },
  { Date: 1790781360000, Open: 287.96, High: 288.04, Low: 287.92, Close: 287.94, Volume: 55121 },
  { Date: 1790781420000, Open: 287.95, High: 288.09, Low: 287.93, Close: 288.07, Volume: 27560 },
  { Date: 1790781480000, Open: 288.07, High: 288.12, Low: 287.99, Close: 288.07, Volume: 39048 },
  { Date: 1790781540000, Open: 288.06, High: 288.16, Low: 288.01, Close: 288.04, Volume: 37496 },
  { Date: 1790781600000, Open: 288.02, High: 288.05, Low: 287.76, Close: 287.81, Volume: 47843 },
  { Date: 1790781660000, Open: 287.81, High: 287.85, Low: 287.67, Close: 287.71, Volume: 55392 },
  { Date: 1790781720000, Open: 287.7, High: 287.77, Low: 287.68, Close: 287.74, Volume: 32702 },
  { Date: 1790781780000, Open: 287.74, High: 287.82, Low: 287.72, Close: 287.82, Volume: 42327 },
  { Date: 1790781840000, Open: 287.82, High: 287.93, Low: 287.81, Close: 287.91, Volume: 35473 },
  { Date: 1790781900000, Open: 287.92, High: 288.01, Low: 287.89, Close: 287.95, Volume: 40552 },
  { Date: 1790781960000, Open: 287.95, High: 288.06, Low: 287.94, Close: 287.97, Volume: 31570 },
  { Date: 1790782020000, Open: 287.97, High: 287.99, Low: 287.76, Close: 287.88, Volume: 39974 },
  { Date: 1790782080000, Open: 287.88, High: 288.15, Low: 287.87, Close: 288.14, Volume: 34060 },
  { Date: 1790782140000, Open: 288.11, High: 288.11, Low: 288.04, Close: 288.07, Volume: 36172 },
  { Date: 1790782200000, Open: 288.06, High: 288.1, Low: 287.91, Close: 288, Volume: 43323 },
  { Date: 1790782260000, Open: 288, High: 288.18, Low: 287.97, Close: 288.17, Volume: 36531 },
  { Date: 1790782320000, Open: 288.17, High: 288.4, Low: 288.14, Close: 288.39, Volume: 69299 },
  { Date: 1790782380000, Open: 288.39, High: 288.5, Low: 288.32, Close: 288.48, Volume: 72362 },
  { Date: 1790782440000, Open: 288.48, High: 288.58, Low: 288.41, Close: 288.44, Volume: 48394 },
  { Date: 1790782500000, Open: 288.45, High: 288.56, Low: 288.35, Close: 288.54, Volume: 55393 },
  { Date: 1790782560000, Open: 288.52, High: 288.55, Low: 288.11, Close: 288.16, Volume: 73083 },
  { Date: 1790782620000, Open: 288.14, High: 288.48, Low: 288.14, Close: 288.46, Volume: 45926 },
  { Date: 1790782680000, Open: 288.46, High: 288.54, Low: 288.36, Close: 288.4, Volume: 44675 },
  { Date: 1790782740000, Open: 288.39, High: 288.48, Low: 288.32, Close: 288.42, Volume: 39451 },
  { Date: 1790782800000, Open: 288.41, High: 288.44, Low: 288.31, Close: 288.35, Volume: 46241 },
  { Date: 1790782860000, Open: 288.33, High: 288.35, Low: 288.18, Close: 288.35, Volume: 53960 },
  { Date: 1790782920000, Open: 288.35, High: 288.38, Low: 288.18, Close: 288.23, Volume: 55907 },
  { Date: 1790782980000, Open: 288.23, High: 288.32, Low: 288.12, Close: 288.15, Volume: 50229 },
  { Date: 1790783040000, Open: 288.16, High: 288.18, Low: 288.06, Close: 288.15, Volume: 66863 },
  { Date: 1790783100000, Open: 288.14, High: 288.32, Low: 288.09, Close: 288.2, Volume: 72523 },
  { Date: 1790783160000, Open: 288.2, High: 288.39, Low: 288.19, Close: 288.39, Volume: 62308 },
  { Date: 1790783220000, Open: 288.38, High: 288.39, Low: 288.19, Close: 288.3, Volume: 71194 },
  { Date: 1790783280000, Open: 288.29, High: 288.32, Low: 287.99, Close: 288.05, Volume: 72909 },
  { Date: 1790783340000, Open: 288.04, High: 288.12, Low: 287.87, Close: 288.06, Volume: 79361 },
  { Date: 1790783400000, Open: 288.04, High: 288.24, Low: 287.65, Close: 287.87, Volume: 95362 },
  { Date: 1790783460000, Open: 287.86, High: 287.95, Low: 287.73, Close: 287.8, Volume: 57193 },
  { Date: 1790783520000, Open: 287.79, High: 287.93, Low: 287.58, Close: 287.92, Volume: 76699 },
  { Date: 1790783580000, Open: 287.89, High: 287.92, Low: 287.61, Close: 287.67, Volume: 76323 },
  { Date: 1790783640000, Open: 287.68, High: 288.35, Low: 287.47, Close: 287.7, Volume: 92112 },
  { Date: 1790783700000, Open: 287.71, High: 287.81, Low: 287.57, Close: 287.69, Volume: 76299 },
  { Date: 1790783760000, Open: 287.68, High: 287.83, Low: 287.56, Close: 287.81, Volume: 71957 },
  { Date: 1790783820000, Open: 287.81, High: 287.83, Low: 287.64, Close: 287.69, Volume: 52673 },
  { Date: 1790783880000, Open: 287.69, High: 287.7, Low: 287.57, Close: 287.6, Volume: 71778 },
  { Date: 1790783940000, Open: 287.6, High: 287.84, Low: 287.3, Close: 287.6, Volume: 90524 }
]
// set data to all series
valueSeries.data.setAll(data);
volumeSeries.data.setAll(data);
sbSeries.data.setAll(data);
```

## HTML

```html
<div id="chartcontrols"></div>
<div id="chartdiv"></div>
```

## CSS

```css
#chartcontrols {
  height: auto;
  padding: 5px 5px 0 16px;
  max-width: 100%;
}

#chartdiv {
  width: 100%;
  height: 600px;
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
