---
title: "Separate Volume Panel"
source: "https://www.amcharts.com/demos/separate-volume-panel/"
category: "stock"
scraped: "2026-10-08"
---

Candlesticks on top and trading volume in a panel of its own below. The two panels zoom, scroll and follow the cursor together, and volume gets its own scale instead of a strip under the candles.

Volume in its own panel: Volume at the bottom of the price panel saves room, but it shares that room with the lowest prices and has no scale to read. A panel of its own gives volume an axis and gridlines, and readers can resize the panels or swap their order with the buttons in each panel’s corner.

Good for:
- Trading screens where volume matters
- Reading actual volume figures
- Charts that will get more indicator panels

Think twice when:
- Small charts: two panels squeeze the prices, put volume under the candles
- Readers who ignore volume: leave it out
- Several stocks compared: one stock’s volume confuses

Prompt: Create a stock chart of a year of daily prices for a made-up ticker, with candlesticks in the main panel and volume columns in a separate panel below, plus a toolbar with indicators, date ranges, series types and drawing tools. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// -------------------------------------------------------------------------------
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
  wheelY: "zoomX",        // the mouse wheel zooms in on the dates
  panX: true,             // a drag pans through the dates
  panY: false,
  height: am5.percent(70) // the price panel takes 70% of the height
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

// a gapless date axis leaves out weekends and holidays, the days without prices
var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one candle a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    pan: "zoom",           // drag along the date axis to zoom it
    minorGridEnabled: true // fainter grid lines between the labeled dates
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  turboMode: true, // draws all the candles at once, much faster with many of them
  name: "AMCH", // a made-up ticker for the sample prices below
  clustered: false,          // each candle takes its day's full width
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

// Create a volume panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
// the main trick: the volume gets a panel of its own; the stock chart zooms both panels together
var volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  panX: true,              // a drag pans through the dates...
  panY: true,              // ...and up and down
  height: am5.percent(30), // the other 30% of the height
  paddingTop: 6            // a 6px gap above the volume
}));

// hide close button as we don't want this panel to be closed
volumePanel.panelControls.closeButton.set("forceHidden", true);

var volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {
    forceHidden: true // no date tooltip here: the price panel shows it
  }),
  height: 0 // takes no room
}));

// we don't need it to be visible
volumeDateAxis.get("renderer").labels.template.set("forceHidden", true);

// Create volume axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  pan: "zoom"
});

var volumeValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a", // short numbers: 3.9M rather than 3,938,600
  min: 0, // volume bars start at zero, also when zoomed in
  renderer: volumeAxisRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
  turboMode: true,  // draws all the columns at once
  name: "Volume",
  clustered: false, // each column takes its day's full width
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: volumeDateAxis,
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
    return stockChart.getVolumeColor(dataItem); // green if it closed at or above the day before, else red
  }
  return fill;
})

// Add a stock legend
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/stock-legend/
var volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));

// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries]); // each legend lists its own panel's series
volumeLegend.data.setAll([volumeSeries]);

// Add cursor(s)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries],
  // the horizontal cursor line jumps to the value of the date under the pointer
  snapToSeriesBy: "y!"
}));

var volumeCursor = volumePanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: volumeValueAxis,
  xAxis: volumeDateAxis,
  snapToSeries: [volumeSeries], // snaps like the price panel's cursor
  snapToSeriesBy: "y!"
}));

volumeCursor.lineY.set("forceHidden", true); // only the vertical line in the volume panel

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
    timeUnit: "day",
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
  am5.array.each(["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "legendRangeValueText", "stroke", "fill"], function (setting) {
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
      newSettings.clustered = false; // each candle or bar takes its day's full width
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
      if (seriesType == "procandlestick") {
        // "pro" candles: colored by the change from the day before, hollow when closing above the open
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
      legend: valueLegend // ...listed in the price panel's legend
    }),
    am5stock.DateRangeSelector.new(root, { // pick the first and last date to show
      stockChart: stockChart
    }),
    am5stock.PeriodSelector.new(root, { // buttons that zoom to the last 5 days, month, year and so on
      stockChart: stockChart
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
  { Date: 1759406400000, Open: 529.93, High: 540.5, Low: 527.03, Close: 539.42, Volume: 3938600 },
  { Date: 1759752000000, Open: 540.01, High: 542.85, Low: 529.23, Close: 540.67, Volume: 3355900 },
  { Date: 1759838400000, Open: 544.81, High: 554.17, Low: 543.3, Close: 544.53, Volume: 3474200 },
  { Date: 1759924800000, Open: 543.5, High: 549.64, Low: 541.45, Close: 546.99, Volume: 2151300 },
  { Date: 1760011200000, Open: 551.13, High: 556.9, Low: 547.57, Close: 554.58, Volume: 4309800 },
  { Date: 1760097600000, Open: 552.69, High: 556.9, Low: 547.11, Close: 555.31, Volume: 2894000 },
  { Date: 1760356800000, Open: 551.05, High: 557.98, Low: 549.58, Close: 552.78, Volume: 2944100 },
  { Date: 1760443200000, Open: 557, High: 559.75, Low: 550.3, Close: 553.73, Volume: 2720300 },
  { Date: 1760529600000, Open: 554.87, High: 554.87, Low: 538.53, Close: 540.02, Volume: 3740300 },
  { Date: 1760616000000, Open: 544.17, High: 553.49, Low: 542.66, Close: 549.22, Volume: 3139100 },
  { Date: 1760702400000, Open: 550.54, High: 551.98, Low: 539.51, Close: 546.54, Volume: 3209100 },
  { Date: 1760961600000, Open: 546.9, High: 556.44, Low: 545.53, Close: 554.44, Volume: 4288700 },
  { Date: 1761048000000, Open: 554.42, High: 563.56, Low: 546.3, Close: 549.57, Volume: 11257600 },
  { Date: 1761134400000, Open: 508, High: 515.46, Low: 503.6, Close: 508.9, Volume: 22897400 },
  { Date: 1761220800000, Open: 513.82, High: 513.96, Low: 500.55, Close: 508.78, Volume: 9061100 },
  { Date: 1761307200000, Open: 509.01, High: 509.7, Low: 500.7, Close: 505.55, Volume: 7307700 },
  { Date: 1761566400000, Open: 506.76, High: 510.48, Low: 503, Close: 510.3, Volume: 4388800 },
  { Date: 1761652800000, Open: 512.62, High: 512.99, Low: 504.58, Close: 505.55, Volume: 3761300 },
  { Date: 1761739200000, Open: 505.2, High: 508.4, Low: 503.34, Close: 506.52, Volume: 3193000 },
  { Date: 1761825600000, Open: 507.6, High: 509.29, Low: 499, Close: 509, Volume: 5127800 },
  { Date: 1761912000000, Open: 505, High: 514.55, Low: 505, Close: 513.47, Volume: 4413200 },
  { Date: 1762171200000, Open: 512.65, High: 518.95, Low: 505.2, Close: 509.11, Volume: 4091900 },
  { Date: 1762257600000, Open: 510.78, High: 511.63, Low: 496.79, Close: 503.18, Volume: 4349500 },
  { Date: 1762344000000, Open: 504.99, High: 507.78, Low: 494.63, Close: 496.08, Volume: 3129400 },
  { Date: 1762430400000, Open: 495.99, High: 499.55, Low: 491.37, Close: 499.55, Volume: 3783700 },
  { Date: 1762516800000, Open: 504.62, High: 508.55, Low: 501.12, Close: 503.84, Volume: 3132800 },
  { Date: 1762776000000, Open: 502, High: 503.15, Low: 486.11, Close: 486.69, Volume: 5131600 },
  { Date: 1762862400000, Open: 479.75, High: 497.99, Low: 478.63, Close: 495.08, Volume: 4401000 },
  { Date: 1762948800000, Open: 486.83, High: 493.54, Low: 482.7, Close: 484.98, Volume: 4121500 },
  { Date: 1763035200000, Open: 489.13, High: 490.78, Low: 482.71, Close: 486.66, Volume: 2712500 },
  { Date: 1763121600000, Open: 487.86, High: 494.85, Low: 486.59, Close: 493.37, Volume: 2882500 },
  { Date: 1763380800000, Open: 485.59, High: 492.71, Low: 482.81, Close: 488.94, Volume: 2705200 },
  { Date: 1763467200000, Open: 488.4, High: 493.48, Low: 486.19, Close: 486.28, Volume: 2350500 },
  { Date: 1763553600000, Open: 481.63, High: 488.57, Low: 478.54, Close: 487.7, Volume: 3349900 },
  { Date: 1763640000000, Open: 489.55, High: 502.7, Low: 488.98, Close: 501.67, Volume: 3721200 },
  { Date: 1763726400000, Open: 503.12, High: 505.4, Low: 497.26, Close: 497.89, Volume: 3322900 },
  { Date: 1763985600000, Open: 501.05, High: 504.25, Low: 499.51, Close: 502.9, Volume: 2412600 },
  { Date: 1764072000000, Open: 506, High: 506.37, Low: 499.22, Close: 501.34, Volume: 2699500 },
  { Date: 1764158400000, Open: 502.34, High: 504.14, Low: 500.5, Close: 502.36, Volume: 2465300 },
  { Date: 1764244800000, Open: 501.8, High: 505.1, Low: 498.54, Close: 503.86, Volume: 3253800 },
  { Date: 1764331200000, Open: 504.4, High: 511.76, Low: 502.53, Close: 502.81, Volume: 2910300 },
  { Date: 1764676800000, Open: 504.01, High: 505.41, Low: 497.74, Close: 499.08, Volume: 2482600 },
  { Date: 1764763200000, Open: 499.82, High: 503.22, Low: 495.82, Close: 499.24, Volume: 2269000 },
  { Date: 1764849600000, Open: 495.19, High: 496.66, Low: 487.25, Close: 489.43, Volume: 3887400 },
  { Date: 1764936000000, Open: 492, High: 501.86, Low: 490.95, Close: 494.74, Volume: 3160500 },
  { Date: 1765195200000, Open: 492.92, High: 496.7, Low: 490.55, Close: 494.66, Volume: 2791900 },
  { Date: 1765281600000, Open: 497, High: 498.82, Low: 489.37, Close: 492.39, Volume: 2374000 },
  { Date: 1765368000000, Open: 494.5, High: 496.09, Low: 484.65, Close: 485.81, Volume: 3055000 },
  { Date: 1765454400000, Open: 487.17, High: 490.21, Low: 482.14, Close: 487.27, Volume: 4382900 },
  { Date: 1765540800000, Open: 490, High: 491.41, Low: 487.78, Close: 488.77, Volume: 3124000 },
  { Date: 1765800000000, Open: 489.68, High: 503.5, Low: 486.91, Close: 499.89, Volume: 4400200 },
  { Date: 1765886400000, Open: 501.23, High: 501.23, Low: 490.4, Close: 491.9, Volume: 3104100 },
  { Date: 1765972800000, Open: 495, High: 496.46, Low: 486.28, Close: 492.41, Volume: 3533200 },
  { Date: 1766059200000, Open: 490.25, High: 501.8, Low: 490.15, Close: 498.34, Volume: 3198300 },
  { Date: 1766145600000, Open: 496.4, High: 504.49, Low: 495.24, Close: 500.77, Volume: 5197600 },
  { Date: 1766404800000, Open: 501.64, High: 502.05, Low: 492.28, Close: 497, Volume: 5277300 },
  { Date: 1766491200000, Open: 498.54, High: 513.55, Low: 495.8, Close: 508.82, Volume: 5809300 },
  { Date: 1766577600000, Open: 508.48, High: 516.63, Low: 508.2, Close: 512.74, Volume: 3944800 },
  { Date: 1766664000000, Open: 517.96, High: 520.96, Low: 514.4, Close: 518.06, Volume: 3361200 },
  { Date: 1766750400000, Open: 528.84, High: 533.06, Low: 525, Close: 527.07, Volume: 5299100 },
  { Date: 1767009600000, Open: 528.12, High: 533.94, Low: 524.56, Close: 533.03, Volume: 2820200 },
  { Date: 1767096000000, Open: 533.55, High: 536.13, Low: 528.57, Close: 533.5, Volume: 2314600 },
  { Date: 1767182400000, Open: 534.06, High: 534.38, Low: 526.82, Close: 528.21, Volume: 2773400 },
  { Date: 1767268800000, Open: 525.72, High: 537.04, Low: 525.72, Close: 533.54, Volume: 2805400 },
  { Date: 1767355200000, Open: 535.5, High: 538.54, Low: 529.39, Close: 533.98, Volume: 1975500 },
  { Date: 1767700800000, Open: 533, High: 542.86, Low: 533, Close: 541.64, Volume: 2775100 },
  { Date: 1767787200000, Open: 544.24, High: 544.64, Low: 531.66, Close: 535.96, Volume: 2722500 },
  { Date: 1767873600000, Open: 530.93, High: 535.5, Low: 529.09, Close: 530.76, Volume: 3269000 },
  { Date: 1767960000000, Open: 531, High: 538.26, Low: 528.58, Close: 535.98, Volume: 2777200 },
  { Date: 1768219200000, Open: 540.3, High: 540.65, Low: 532.92, Close: 537.31, Volume: 1780700 },
  { Date: 1768305600000, Open: 535.76, High: 545.33, Low: 535.76, Close: 540.68, Volume: 2751600 },
  { Date: 1768392000000, Open: 541.01, High: 554.1, Low: 541.01, Close: 547.95, Volume: 4659500 },
  { Date: 1768478400000, Open: 553.97, High: 557.54, Low: 538.2, Close: 542.95, Volume: 5713900 },
  { Date: 1768564800000, Open: 541.81, High: 544.06, Low: 527.05, Close: 530.31, Volume: 3442100 },
  { Date: 1768824000000, Open: 526.05, High: 534.91, Low: 522.24, Close: 532.28, Volume: 3885800 },
  { Date: 1768910400000, Open: 526.07, High: 536.64, Low: 520.3, Close: 531.05, Volume: 6930400 },
  { Date: 1768996800000, Open: 526.13, High: 530.99, Low: 505.61, Close: 513.63, Volume: 11906800 },
  { Date: 1769083200000, Open: 510.21, High: 513.68, Low: 507, Close: 511.77, Volume: 4328100 },
  { Date: 1769169600000, Open: 512.16, High: 517.41, Low: 504.66, Close: 515.41, Volume: 3820500 },
  { Date: 1769428800000, Open: 514.38, High: 521.13, Low: 509.01, Close: 516.49, Volume: 2254500 },
  { Date: 1769515200000, Open: 518.08, High: 521.95, Low: 512.05, Close: 518.91, Volume: 2759000 },
  { Date: 1769601600000, Open: 521.82, High: 524.47, Low: 516.98, Close: 519.3, Volume: 2390500 },
  { Date: 1769688000000, Open: 519.96, High: 520.78, Low: 513.79, Close: 514.25, Volume: 1736000 },
  { Date: 1769774400000, Open: 512.69, High: 519.79, Low: 510.96, Close: 517.57, Volume: 2537100 },
  { Date: 1770033600000, Open: 519, High: 519.85, Low: 510.51, Close: 515.15, Volume: 2096600 },
  { Date: 1770120000000, Open: 514.39, High: 515.63, Low: 505.37, Close: 510.82, Volume: 2579400 },
  { Date: 1770206400000, Open: 513, High: 517.98, Low: 510.37, Close: 517.35, Volume: 2039400 },
  { Date: 1770292800000, Open: 517.13, High: 525.41, Low: 514.02, Close: 524.89, Volume: 2556700 },
  { Date: 1770379200000, Open: 524, High: 526.84, Low: 519.39, Close: 520.55, Volume: 1919800 },
  { Date: 1770638400000, Open: 521.15, High: 522.67, Low: 517.99, Close: 519.97, Volume: 1367800 },
  { Date: 1770724800000, Open: 520, High: 520.79, Low: 512.97, Close: 515.84, Volume: 1960500 },
  { Date: 1770811200000, Open: 517, High: 519.57, Low: 509.77, Close: 512.4, Volume: 1673900 },
  { Date: 1770897600000, Open: 511.86, High: 513, Low: 507.2, Close: 510.72, Volume: 1685700 },
  { Date: 1770984000000, Open: 512.64, High: 521.44, Low: 511.51, Close: 515.92, Volume: 2177700 },
  { Date: 1771243200000, Open: 515.24, High: 523.38, Low: 512.3, Close: 517.92, Volume: 2032800 },
  { Date: 1771329600000, Open: 515.47, High: 520.79, Low: 514.2, Close: 518.91, Volume: 2309800 },
  { Date: 1771416000000, Open: 520, High: 526.38, Low: 518.65, Close: 521.87, Volume: 2582000 },
  { Date: 1771502400000, Open: 522.74, High: 548.39, Low: 521.87, Close: 543.71, Volume: 7497300 },
  { Date: 1771588800000, Open: 545.09, High: 551.39, Low: 539.1, Close: 546.88, Volume: 3776400 },
  { Date: 1771848000000, Open: 545.98, High: 555.55, Low: 543.74, Close: 553.33, Volume: 2602000 },
  { Date: 1771934400000, Open: 551.48, High: 555.31, Low: 549.27, Close: 553.41, Volume: 2109500 },
  { Date: 1772020800000, Open: 550.16, High: 552.84, Low: 545.45, Close: 547.58, Volume: 2065600 },
  { Date: 1772107200000, Open: 546.16, High: 552.6, Low: 545.9, Close: 550.12, Volume: 1595500 },
  { Date: 1772193600000, Open: 551.6, High: 564.17, Low: 549.25, Close: 558.92, Volume: 3252600 },
  { Date: 1772452800000, Open: 557.25, High: 567.16, Low: 556.45, Close: 566.18, Volume: 2434800 },
  { Date: 1772539200000, Open: 566.12, High: 569.48, Low: 561.61, Close: 569.19, Volume: 2431900 },
  { Date: 1772625600000, Open: 569, High: 591, Low: 569, Close: 582.07, Volume: 5626200 },
  { Date: 1772712000000, Open: 583.68, High: 598.76, Low: 583.68, Close: 588.55, Volume: 6179900 },
  { Date: 1772798400000, Open: 585.8, High: 591.88, Low: 583.14, Close: 590.53, Volume: 2681200 },
  { Date: 1773144000000, Open: 594.69, High: 613.85, Low: 593.99, Close: 606.71, Volume: 5821400 },
  { Date: 1773230400000, Open: 603.84, High: 615.6, Low: 595.71, Close: 606.05, Volume: 5424500 },
  { Date: 1773316800000, Open: 606.47, High: 609.44, Low: 596.55, Close: 597.54, Volume: 2954200 },
  { Date: 1773403200000, Open: 598.16, High: 609.45, Low: 593.67, Close: 598.72, Volume: 3950800 },
  { Date: 1773662400000, Open: 598.57, High: 598.57, Low: 582.78, Close: 589.29, Volume: 3062900 },
  { Date: 1773748800000, Open: 584.89, High: 587.28, Low: 575.56, Close: 577.76, Volume: 3457000 },
  { Date: 1773835200000, Open: 578.17, High: 584.62, Low: 575.37, Close: 582.87, Volume: 2755600 },
  { Date: 1773921600000, Open: 584.3, High: 587.48, Low: 577.72, Close: 586.5, Volume: 1832000 },
  { Date: 1774008000000, Open: 587.85, High: 590.28, Low: 580.85, Close: 589.35, Volume: 4145100 },
  { Date: 1774267200000, Open: 586.79, High: 591.53, Low: 568.08, Close: 575.43, Volume: 3732200 },
  { Date: 1774353600000, Open: 578.31, High: 581.88, Low: 569.37, Close: 573.14, Volume: 2250900 },
  { Date: 1774440000000, Open: 579.69, High: 595.65, Low: 579.69, Close: 590.65, Volume: 4021800 },
  { Date: 1774526400000, Open: 590.79, High: 599.32, Low: 589.13, Close: 593.26, Volume: 2526200 },
  { Date: 1774612800000, Open: 592.5, High: 592.98, Low: 583.64, Close: 592.39, Volume: 2126200 },
  { Date: 1774872000000, Open: 587.95, High: 593.58, Low: 576.93, Close: 592.64, Volume: 2504700 },
  { Date: 1774958400000, Open: 589, High: 599.54, Low: 580.16, Close: 583.85, Volume: 4431100 },
  { Date: 1775044800000, Open: 589.01, High: 609.88, Low: 588.01, Close: 599.06, Volume: 6221000 },
  { Date: 1775131200000, Open: 608.05, High: 619, Low: 608.05, Close: 610.34, Volume: 6612600 },
  { Date: 1775217600000, Open: 604.24, High: 614.99, Low: 597.51, Close: 613.15, Volume: 4090800 },
  { Date: 1775476800000, Open: 613.39, High: 626.13, Low: 594.68, Close: 603.35, Volume: 4995900 },
  { Date: 1775563200000, Open: 606.94, High: 640.39, Low: 606.89, Close: 634.81, Volume: 9534300 },
  { Date: 1775649600000, Open: 628.18, High: 639.87, Low: 626.36, Close: 639.1, Volume: 4580400 },
  { Date: 1775736000000, Open: 642.23, High: 646.84, Low: 630.45, Close: 631.85, Volume: 3556900 },
  { Date: 1775822400000, Open: 634.17, High: 643.8, Low: 630.86, Close: 632.66, Volume: 3272100 },
  { Date: 1776081600000, Open: 633.2, High: 639.42, Low: 626.78, Close: 627.04, Volume: 2862500 },
  { Date: 1776168000000, Open: 633.02, High: 637.66, Low: 621.99, Close: 624.94, Volume: 3227300 },
  { Date: 1776254400000, Open: 632.18, High: 632.18, Low: 622.1, Close: 629.76, Volume: 2420300 },
  { Date: 1776340800000, Open: 632.23, High: 636.88, Low: 626.79, Close: 633.8, Volume: 2671700 },
  { Date: 1776427200000, Open: 638, High: 639.42, Low: 625.16, Close: 628.29, Volume: 4116900 },
  { Date: 1776686400000, Open: 632.1, High: 638.41, Low: 620.59, Close: 637.97, Volume: 4669100 },
  { Date: 1776772800000, Open: 636.97, High: 641, Low: 632.3, Close: 639, Volume: 7633100 },
  { Date: 1776859200000, Open: 625.57, High: 637.4, Low: 617.15, Close: 625.14, Volume: 10622000 },
  { Date: 1776945600000, Open: 628.89, High: 654.01, Low: 628.65, Close: 653.16, Volume: 8437100 },
  { Date: 1777032000000, Open: 651.81, High: 665.46, Low: 651.81, Close: 664.78, Volume: 6186000 },
  { Date: 1777291200000, Open: 663.74, High: 675.88, Low: 657.07, Close: 671.66, Volume: 3833500 },
  { Date: 1777377600000, Open: 673.76, High: 676.49, Low: 662.77, Close: 668.52, Volume: 2904800 },
  { Date: 1777464000000, Open: 669, High: 671.41, Low: 661.85, Close: 662.92, Volume: 2276900 },
  { Date: 1777550400000, Open: 670.95, High: 676.8, Low: 668.03, Close: 674.05, Volume: 2859400 },
  { Date: 1777636800000, Open: 673.06, High: 690.97, Low: 671.24, Close: 690.31, Volume: 3825300 },
  { Date: 1777896000000, Open: 689.06, High: 689.97, Low: 676.54, Close: 681.17, Volume: 3110900 },
  { Date: 1777982400000, Open: 683.11, High: 687.68, Low: 673.82, Close: 677.72, Volume: 3888600 },
  { Date: 1778068800000, Open: 677.27, High: 689.39, Low: 677.27, Close: 688.29, Volume: 2334900 },
  { Date: 1778155200000, Open: 685.89, High: 685.94, Low: 665.5, Close: 668.4, Volume: 4865000 },
  { Date: 1778241600000, Open: 663.97, High: 665.64, Low: 645.01, Close: 645.72, Volume: 5283500 },
  { Date: 1778500800000, Open: 650.29, High: 656, Low: 643.79, Close: 651.45, Volume: 2887500 },
  { Date: 1778587200000, Open: 653.7, High: 660.5, Low: 650.52, Close: 655.99, Volume: 2415600 },
  { Date: 1778673600000, Open: 653.01, High: 660.33, Low: 642.11, Close: 646.91, Volume: 2405800 },
  { Date: 1778760000000, Open: 650.24, High: 665.82, Low: 649.71, Close: 657.58, Volume: 2868300 },
  { Date: 1778846400000, Open: 660.01, High: 683.34, Low: 653.82, Close: 682.61, Volume: 4198400 },
  { Date: 1779105600000, Open: 681.24, High: 685.26, Low: 671.49, Close: 679.33, Volume: 2872200 },
  { Date: 1779192000000, Open: 678.27, High: 688.36, Low: 676.9, Close: 687.4, Volume: 2077400 },
  { Date: 1779278400000, Open: 690, High: 700.99, Low: 686.09, Close: 691.69, Volume: 2732800 },
  { Date: 1779364800000, Open: 691.61, High: 691.74, Low: 679.74, Close: 682.02, Volume: 2012900 },
  { Date: 1779451200000, Open: 692.35, High: 694.16, Low: 675, Close: 678.8, Volume: 2613700 },
  { Date: 1779710400000, Open: 676.02, High: 679.48, Low: 656.47, Close: 659.2, Volume: 2764400 },
  { Date: 1779796800000, Open: 658.18, High: 666.43, Low: 646.05, Close: 654.06, Volume: 2320200 },
  { Date: 1779883200000, Open: 658.01, High: 661.44, Low: 651.1, Close: 658.29, Volume: 1867300 },
  { Date: 1780056000000, Open: 675, High: 676.41, Low: 660.67, Close: 665.64, Volume: 2872500 },
  { Date: 1780315200000, Open: 663.2, High: 667.99, Low: 658.29, Close: 663.84, Volume: 2529400 },
  { Date: 1780401600000, Open: 668.2, High: 675.38, Low: 640.01, Close: 641.9, Volume: 5608900 },
  { Date: 1780488000000, Open: 649.48, High: 654.52, Low: 617.07, Close: 617.77, Volume: 3882800 },
  { Date: 1780574400000, Open: 617.1, High: 625.36, Low: 612.88, Close: 616.47, Volume: 3331100 },
  { Date: 1780660800000, Open: 622.75, High: 625.5, Low: 594, Close: 602.13, Volume: 4829300 },
  { Date: 1780920000000, Open: 606.01, High: 617.29, Low: 601, Close: 612.69, Volume: 3075700 },
  { Date: 1781006400000, Open: 619.83, High: 628.89, Low: 611.4, Close: 625.58, Volume: 3125200 },
  { Date: 1781092800000, Open: 630, High: 632.46, Low: 623.2, Close: 628.08, Volume: 2220300 },
  { Date: 1781179200000, Open: 627.58, High: 630.24, Low: 610.44, Close: 611, Volume: 2376300 },
  { Date: 1781265600000, Open: 616.78, High: 617.74, Low: 605.88, Close: 611.66, Volume: 2748800 },
  { Date: 1781524800000, Open: 612, High: 612.64, Low: 599.52, Close: 604.56, Volume: 2517900 },
  { Date: 1781611200000, Open: 598.71, High: 602.29, Low: 588.13, Close: 597.99, Volume: 2984500 },
  { Date: 1781697600000, Open: 598.18, High: 605.69, Low: 584.51, Close: 605.04, Volume: 2866200 },
  { Date: 1781784000000, Open: 597.09, High: 602.83, Low: 588, Close: 591.06, Volume: 3143200 },
  { Date: 1781870400000, Open: 591.61, High: 593.25, Low: 581.74, Close: 586.73, Volume: 4386900 },
  { Date: 1782129600000, Open: 586.43, High: 602.88, Low: 584.26, Close: 593.74, Volume: 3358400 },
  { Date: 1782216000000, Open: 597.54, High: 607.82, Low: 593.86, Close: 604.92, Volume: 2319400 },
  { Date: 1782302400000, Open: 603.36, High: 614.82, Low: 602.63, Close: 614.24, Volume: 2335700 },
  { Date: 1782388800000, Open: 616.4, High: 616.88, Low: 607.57, Close: 614.09, Volume: 1621100 },
  { Date: 1782734400000, Open: 615, High: 615, Low: 609.25, Close: 613.12, Volume: 2061500 },
  { Date: 1782820800000, Open: 614.95, High: 618.41, Low: 609.69, Close: 610.71, Volume: 1882800 },
  { Date: 1782907200000, Open: 610.71, High: 613.98, Low: 604.68, Close: 610.54, Volume: 1287200 },
  { Date: 1782993600000, Open: 612.99, High: 620.61, Low: 611.24, Close: 612.09, Volume: 1625100 },
  { Date: 1783080000000, Open: 610.01, High: 614.08, Low: 602.05, Close: 602.44, Volume: 1995900 },
  { Date: 1783339200000, Open: 605.61, High: 609.99, Low: 590.56, Close: 597.37, Volume: 3067500 },
  { Date: 1783425600000, Open: 599.91, High: 600.41, Low: 581.6, Close: 591.15, Volume: 4393100 },
  { Date: 1783512000000, Open: 592, High: 592.84, Low: 566.88, Close: 567.52, Volume: 4148700 },
  { Date: 1783598400000, Open: 554.34, High: 563.36, Low: 542.01, Close: 553.29, Volume: 5711800 },
  { Date: 1783684800000, Open: 549.46, High: 553.43, Low: 538.22, Close: 541.06, Volume: 3382900 },
  { Date: 1783944000000, Open: 538.49, High: 543.69, Low: 526.32, Close: 539.85, Volume: 4486100 },
  { Date: 1784030400000, Open: 536.99, High: 543.91, Low: 530.07, Close: 540.84, Volume: 3077800 },
  { Date: 1784116800000, Open: 544.27, High: 544.27, Low: 532.02, Close: 537.22, Volume: 3787400 },
  { Date: 1784203200000, Open: 537.06, High: 540.79, Low: 518.26, Close: 519.2, Volume: 4475100 },
  { Date: 1784289600000, Open: 517.6, High: 538.37, Low: 511.88, Close: 525.69, Volume: 7861100 },
  { Date: 1784635200000, Open: 520.08, High: 521.75, Low: 508.68, Close: 510.8, Volume: 4839100 },
  { Date: 1784721600000, Open: 515, High: 523.21, Low: 510.51, Close: 515.86, Volume: 4353500 },
  { Date: 1784808000000, Open: 517.75, High: 526.64, Low: 506.93, Close: 508.25, Volume: 12659000 },
  { Date: 1784894400000, Open: 400.43, High: 409.15, Low: 379.99, Close: 397.5, Volume: 58904300 },
  { Date: 1785153600000, Open: 383.91, High: 387.26, Low: 351.46, Close: 387.15, Volume: 32346000 },
  { Date: 1785240000000, Open: 379.14, High: 387.71, Low: 365.13, Close: 366.42, Volume: 15145800 },
  { Date: 1785326400000, Open: 378.27, High: 382.66, Low: 356.62, Close: 359.7, Volume: 12684000 },
  { Date: 1785412800000, Open: 382.06, High: 394.8, Low: 378.1, Close: 386.7, Volume: 24324700 },
  { Date: 1785499200000, Open: 386.76, High: 387, Low: 372.08, Close: 384.36, Volume: 11966600 },
  { Date: 1785758400000, Open: 401.97, High: 427.7, Low: 398.2, Close: 427.14, Volume: 20047500 },
  { Date: 1785844800000, Open: 432.96, High: 458.48, Low: 425.54, Close: 457.13, Volume: 22568100 },
  { Date: 1785931200000, Open: 448.25, High: 451.98, Low: 426.48, Close: 429.48, Volume: 14346000 },
  { Date: 1786017600000, Open: 421.44, High: 429.26, Low: 404.28, Close: 405.6, Volume: 9905200 },
  { Date: 1786104000000, Open: 407.31, High: 412.77, Low: 396.64, Close: 410.17, Volume: 7789800 },
  { Date: 1786363200000, Open: 410.17, High: 412.35, Low: 393.55, Close: 402.1, Volume: 8232900 },
  { Date: 1786449600000, Open: 398.18, High: 406.61, Low: 395.83, Close: 403.53, Volume: 6818500 },
  { Date: 1786536000000, Open: 408.65, High: 412.98, Low: 398.79, Close: 412.89, Volume: 7738200 },
  { Date: 1786622400000, Open: 402.1, High: 408, Low: 396.36, Close: 406.27, Volume: 8452900 },
  { Date: 1786708800000, Open: 405.33, High: 411.61, Low: 387.65, Close: 391.31, Volume: 7558900 },
  { Date: 1786968000000, Open: 387.59, High: 409.36, Low: 386.89, Close: 396.57, Volume: 7202200 },
  { Date: 1787054400000, Open: 403.79, High: 409.16, Low: 401.01, Close: 407.46, Volume: 5392300 },
  { Date: 1787140800000, Open: 401.53, High: 401.56, Low: 390.38, Close: 398.08, Volume: 5277700 },
  { Date: 1787227200000, Open: 394.24, High: 399.11, Low: 385.7, Close: 386.67, Volume: 4669200 },
  { Date: 1787313600000, Open: 392.53, High: 402.87, Low: 389.05, Close: 391.29, Volume: 6801700 },
  { Date: 1787659200000, Open: 388.95, High: 392.42, Low: 373.02, Close: 377.38, Volume: 6697500 },
  { Date: 1787745600000, Open: 382.72, High: 386, Low: 366.66, Close: 367.46, Volume: 4614300 },
  { Date: 1787832000000, Open: 355.09, High: 390.73, Low: 354.72, Close: 390.03, Volume: 7068700 },
  { Date: 1787918400000, Open: 386.61, High: 391.29, Low: 375.58, Close: 390.8, Volume: 4841600 },
  { Date: 1788177600000, Open: 387.33, High: 397.75, Low: 382.13, Close: 394.52, Volume: 5030600 },
  { Date: 1788264000000, Open: 391.6, High: 395, Low: 383.71, Close: 386.24, Volume: 3290400 },
  { Date: 1788350400000, Open: 388.93, High: 389.22, Low: 375.21, Close: 380.03, Volume: 5356800 },
  { Date: 1788436800000, Open: 386, High: 386.12, Low: 364.65, Close: 368.07, Volume: 6076800 },
  { Date: 1788523200000, Open: 368, High: 374.82, Low: 357.17, Close: 361.73, Volume: 5325500 },
  { Date: 1788782400000, Open: 360.41, High: 362, Low: 350.2, Close: 350.26, Volume: 5708400 },
  { Date: 1788868800000, Open: 349.8, High: 358.86, Low: 340.67, Close: 341.76, Volume: 6428700 },
  { Date: 1788955200000, Open: 357.69, High: 364.14, Low: 350.51, Close: 358.79, Volume: 6520200 },
  { Date: 1789041600000, Open: 356.2, High: 367.02, Low: 353.3, Close: 356.77, Volume: 4807800 },
  { Date: 1789128000000, Open: 361.19, High: 363.36, Low: 340, Close: 340.32, Volume: 4815500 },
  { Date: 1789387200000, Open: 338.72, High: 341.32, Low: 329.82, Close: 331.01, Volume: 5907800 },
  { Date: 1789473600000, Open: 335.1, High: 345.36, Low: 332.36, Close: 343.75, Volume: 5460600 },
  { Date: 1789560000000, Open: 348.2, High: 359.99, Low: 343.06, Close: 357.53, Volume: 6982500 },
  { Date: 1789646400000, Open: 359.7, High: 373.31, Low: 354.88, Close: 371.4, Volume: 5818300 },
  { Date: 1789732800000, Open: 372, High: 381.8, Low: 368.47, Close: 380.6, Volume: 8309200 },
  { Date: 1789992000000, Open: 378.02, High: 381.82, Low: 368.94, Close: 374.59, Volume: 4866500 },
  { Date: 1790078400000, Open: 371.14, High: 386.66, Low: 366.76, Close: 382.92, Volume: 4242800 },
  { Date: 1790164800000, Open: 379.77, High: 382.46, Low: 374.49, Close: 374.49, Volume: 3729000 },
  { Date: 1790251200000, Open: 379.76, High: 379.76, Low: 368.9, Close: 375.71, Volume: 3888500 },
  { Date: 1790337600000, Open: 377.07, High: 377.64, Low: 366.43, Close: 373.85, Volume: 3574500 },
  { Date: 1790596800000, Open: 375.23, High: 380.28, Low: 366.73, Close: 378.51, Volume: 4323400 },
  { Date: 1790683200000, Open: 384.39, High: 396.5, Low: 380.33, Close: 391.82, Volume: 5880700 },
  { Date: 1790769600000, Open: 389.55, High: 392.7, Low: 378.63, Close: 381.47, Volume: 4023300 }
];

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
