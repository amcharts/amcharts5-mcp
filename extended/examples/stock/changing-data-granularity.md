---
title: "Changing Data Granularity"
source: "https://www.amcharts.com/demos/changing-data-granularity/"
category: "stock"
scraped: "2026-10-08"
---

A stock chart that loads new data when you change the interval: a year of Microsoft prices as daily, weekly or monthly candles, or a single day in one-minute candles. Each interval is its own file, fetched when you pick it.

When to switch the interval: Traders read the same stock at different speeds: monthly candles for the long trend, minutes for one busy day. Loading a separate data set for each interval keeps every download small, and each candle is exactly what your data source says it is.

Good for:
- Trading screens with several timeframes
- Data too big to load at once
- Prices your server already sums up by week or month

Think twice when:
- A few thousand points: load them once and let the chart group them
- A slow server: every switch waits for a download
- One timeframe is all readers need: skip the switcher

Prompt: Create a stock chart of Microsoft prices as candlesticks with volume, with a toolbar switch between one-minute, daily, weekly and monthly data, each loaded from its own CSV file. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// -------------------------------------------------------------------------------
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

// Create a stock chart
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Instantiating_the_chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
}));

// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX", // the mouse wheel zooms in on the dates
  panX: true,      // drag the plot sideways to pan...
  panY: true       // ...or up and down
}));

// Create value axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the price labels to zoom them
  }),
  extraMin: 0.1, // adds some space for the main series
  tooltip: am5.Tooltip.new(root, {}), // the cursor shows the price on the axis
  numberFormat: "#,###.00",           // prices with two decimals
  extraTooltipPrecision: 2
}));

// a gapless axis leaves out the dates with no data, such as weekends, so no empty gaps show
var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one candle per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled dates
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

// hide a date label that would be cut at the left edge (the daily data starts on the last day of a month)
dateAxis.get("renderer").labels.template.set("minPosition", 0.02);

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  turboMode: true,  // draws all candles at once, faster for many of them
  name: "MSFT",
  clustered: false, // not side by side with the volume bars: both take the whole day
  valueXField: "Date",
  valueYField: "Close",
  highValueYField: "High",
  lowValueYField: "Low",
  openValueYField: "Open",
  calculateAggregates: true, // works out values for the range in view, for the legend
  xAxis: dateAxis,
  yAxis: valueAxis,
  // the legend shows the hovered day's four prices in bold
  legendValueText: "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
  legendRangeValueText:"" // and nothing when no day is hovered
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

volumeAxisRenderer.labels.template.set("forceHidden", true); // no labels...
volumeAxisRenderer.grid.template.set("forceHidden", true);   // ...or grid lines for the volume axis

var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a", // short numbers, like 12.3M
  min: 0, // volume bars start at zero, also when zoomed in
  // the bottom 20% of the panel, over the lower part of the price axis
  height: am5.percent(20),
  y: am5.percent(100),
  centerY: am5.percent(100),
  renderer: volumeAxisRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  turboMode: true,  // draws all bars at once
  name: "Volume",
  clustered: false, // overlaps the candles instead of sitting beside them
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]" // the hovered day's volume, like 12.3M
}));

volumeSeries.columns.template.setAll({
  strokeOpacity: 0, // no outline
  fillOpacity: 0.5  // half-transparent, so the candles show through
});

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function(fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem); // the stock chart's up or down color for that day
  }
  return fill;
})

// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]);

// Add cursor(s)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: [valueSeries], // the cursor snaps to the main series
  // the cursor jumps to the price at the date under the pointer, where there is one
  snapToSeriesBy: "y!"
}));

// Add scrollbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // drag its grips to zoom in on a range of dates
  height: 50                 // 50px tall, with a preview of the prices
}));
// into the stock chart's tools area, lined up with the plots
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled dates
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
  visible: true,   // line series don't fill by default; this turns it on
  fillOpacity: 0.3 // a see-through fill
});

// Function that dynamically loads data; it returns a promise that resolves once the data is set
function loadData(ticker, series, granularity) {

  // Load external data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
  return am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + "_" + granularity + ".csv").then(function(result) {

    // Parse loaded data
    var data = am5.CSVParser.parse(result.response, {
      delimiter: ",",
      skipEmpty: true,     // skip empty lines
      useColumnNames: true // the first row names the fields
    });

    // Process data (convert dates and values)
    var processor = am5.DataProcessor.new(root, {
      dateFields: ["Date"], // the field that holds dates...
      // ...written with a time for minute data
      dateFormat: granularity == "minute" ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd",
      // turn these text columns into numbers
      numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
    });
    processor.processMany(data);

    // Set data
    am5.array.each(series, function(item) { // the same data for every series in the list
      item.data.setAll(data);
    });
  });
}

// Load initial data for the first series
var currentGranularity = "day"; // minute, day, week or month: part of the file name
loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity);

// Set up series type switcher
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/
var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(ev.item.id);
});

// copy the settings a new series needs from the current one
function getNewSettings(series) {
  var newSettings = [];
  am5.array.each(["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "legendRangeValueText", "stroke", "fill"], function(setting) {
    newSettings[setting] = series.get(setting);
  });
  return newSettings;
}

// replace the main series with one of another type, keeping its data and settings
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
      newSettings.clustered = false; // the candles take the whole day, as before
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
      if (seriesType == "procandlestick") {
        series.columns.template.get("themeTags").push("pro"); // the theme's "pro" candlestick look
      }
      break;
    case "ohlc":
      newSettings.clustered = false; // the bars take the whole day, as before
      series = mainPanel.series.push(am5xy.OHLCSeries.new(root, newSettings));
      break;
  }

  // Set new series as stockSeries
  if (series) {
    valueLegend.data.removeValue(currentSeries);
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    var cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", [series]); // the cursor snaps to the new series
    }
    valueLegend.data.insertIndex(0, series); // first in the legend
  }
}

// Interval switcher
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/interval-control/
var intervalSwitcher = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  items: [ // the intervals to choose from
    { id: "1 minute", label: "1 minute", interval: { timeUnit: "minute", count: 1 } },
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "1 week", label: "1 week", interval: { timeUnit: "week", count: 1 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  ]
});

intervalSwitcher.events.on("selected", function(ev) {
  // Determine selected granularity
  currentGranularity = ev.item.interval.timeUnit;

  // Get series
  var valueSeries = stockChart.get("stockSeries");
  var volumeSeries = stockChart.get("volumeSeries");

  // Set up zoomout
  valueSeries.events.once("datavalidated", function() {
    mainPanel.zoomOut(); // show all of the new data
  });

  // Load data for all series (main series + comparisons)
  var promises = [];
  promises.push(loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity));
  am5.array.each(stockChart.getPrivate("comparedSeries", []), function(series) {
    promises.push(loadData(series.get("name"), [series], currentGranularity));
  });

  // Once data loading is done, set `baseInterval` on the DateAxis
  Promise.all(promises).then(function() {
    dateAxis.set("baseInterval", ev.item.interval); // the axes now expect one point per chosen interval
    sbDateAxis.set("baseInterval", ev.item.interval);

  stockChart.indicators.each(function(indicator){ // indicators with an axis of their own follow too
    if(indicator instanceof am5stock.ChartIndicator){
      indicator.xAxis.set("baseInterval", ev.item.interval);
    }
  })

  });
});

// Stock toolbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"), // the toolbar goes in the div with this id
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {  // add indicators
      stockChart: stockChart,
      legend: valueLegend
    }),
    am5stock.DateRangeSelector.new(root, { // pick a range of dates
      stockChart: stockChart
    }),
    am5stock.PeriodSelector.new(root, {    // buttons for set periods, like 1M or 1Y
      stockChart: stockChart
    }),
    intervalSwitcher,
    seriesSwitcher,
    am5stock.DrawingControl.new(root, {  // drawing tools
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {    // remove the indicators and drawings
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, { // chart settings
      stockChart: stockChart
    })
  ]
})
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
