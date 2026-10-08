---
title: "Stock Chart Comparing Prices"
source: "https://www.amcharts.com/demos/stock-chart-comparing-prices/"
category: "stock"
scraped: "2026-10-08"
---

A year of Microsoft prices as candles, with Apple added as a line for comparison. With two stocks on the chart, the axis switches from dollars to percent change, so both start from the same zero line.

When to compare in percent: Prices in dollars don’t compare: a $300 stock and a $150 stock that both rose 10% look nothing alike. Percent mode measures every line from the first day in view, so the chart answers which stock did better over this stretch, and the answer follows as you zoom or pan.

Good for:
- A stock against its rivals or an index
- Which holding did better this year
- Prices in different currencies or ranges

Think twice when:
- Readers who need the actual price: switch percent off in the settings
- More than four or five stocks: the lines tangle
- One stock with huge swings: it flattens the others

Prompt: Create a stock chart for comparing stocks: daily Microsoft prices from a CSV file as candlesticks with volume, with Apple added as a comparison line, which switches the value axis to percent change. The toolbar lets you pick the main ticker and add up to five more. Use the amCharts 5 library with its Responsive theme.

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
  wheelY: "zoomX", // the mouse wheel zooms in on the dates
  panX: true,      // a drag pans through the dates...
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

// a gapless date axis leaves out weekends and holidays, the days without prices
var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one candle a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled dates
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

// hide a date label that would be cut at the left edge (the data starts on the last day of a month)
dateAxis.get("renderer").labels.template.set("minPosition", 0.02);

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  turboMode: true,           // draws all the candles at once, much faster with many of them
  name: "MSFT",
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
  clustered: false, // each column takes its day's full width
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
    return stockChart.getVolumeColor(dataItem); // green if it closed at or above the day before, else red
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

// Function that dynamically loads data
function loadData(ticker, series, granularity) {

  // Load external data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
  am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + "_" + granularity + ".csv").then(function (result) {

    // Parse loaded data
    var data = am5.CSVParser.parse(result.response, {
      delimiter: ",",      // values separated by commas
      skipEmpty: true,     // skip empty lines
      useColumnNames: true // the first row names the fields
    });

    // Process data (convert dates and values)
    var processor = am5.DataProcessor.new(root, {
      dateFields: ["Date"],     // turn these date strings into timestamps...
      dateFormat: "yyyy-MM-dd", // ...read in this format...
      numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"] // ...and these into numbers
    });
    processor.processMany(data);

    // Set data
    am5.array.each(series, function (item) {
      item.data.setAll(data);
    });
  });
}

// Load initial data for the first series
var currentGranularity = "day"; // daily prices: the files ending in _day
loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity);

// Add comparing series
addComparingSeries("AAPL");

// Set up main indices selector
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/comparison-control/
var mainSeriesControl = am5stock.DropdownListControl.new(root, {
  stockChart: stockChart,
  name: valueSeries.get("name"),     // the button shows the main ticker...
  icon: am5stock.StockIcons.getIcon("Candlestick Series"), // ...with a candlestick icon
  fixedLabel: true,                  // and keeps that label when an item is picked
  searchable: true,                  // a search box...
  searchCallback: function (query) { // ...that lists the matching tickers
    var mainSeries = stockChart.get("stockSeries");
    var mainSeriesID = mainSeries ? mainSeries.get("name") : "";
    var list = getTicker(query);
    am5.array.each(list, function (item) {
      if (item.id == mainSeriesID) {
        item.disabled = true; // the main ticker can't be picked again
      }
    })
    return list;
  }
});

// when a ticker is picked, load its prices into the main series
mainSeriesControl.events.on("selected", function (ev) {
  var valueSeries = stockChart.get("stockSeries");
  var volumeSeries = stockChart.get("volumeSeries");

  mainSeriesControl.set("name", ev.item.subLabel); // the button shows the new ticker...
  valueSeries.set("name", ev.item.subLabel);       // ...and so does the legend
  loadData(ev.item.subLabel, [valueSeries, volumeSeries, sbSeries], currentGranularity);

  // Remove a compared series for the same index if present
  var comparedSeries = stockChart.getPrivate("comparedSeries");
  am5.array.eachReverse(comparedSeries, function(compared) {
    if (compared.get("name") == valueSeries.get("name")) {
      stockChart.removeComparingSeries(compared);
    }
  })
});

// Set up comparison control
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/toolbar/comparison-control/
var comparisonControl = am5stock.ComparisonControl.new(root, {
  stockChart: stockChart,
  searchable: true,                  // a search box...
  searchCallback: function (query) { // ...that lists matching tickers, five compared at most
    var compared = stockChart.getPrivate("comparedSeries", []);
    var main = stockChart.get("stockSeries");
    if (compared.length > 4) { // five compared already: a note instead of the list
      return [{
        label: "A maximum of 5 comparisons added",
        subLabel: "Remove some to add new ones",
        id: "",
        className: "am5stock-list-info" // styled as a note, not a ticker
      }];
    };

    var comparedIds = [];
    am5.array.each(compared, function (series) {
      comparedIds.push(series.get("name"));
    });

    var list = getTicker(query);
    am5.array.each(list, function (item) {
      if (comparedIds.indexOf(item.id) !== -1 || main.get("name") == item.id) {
        item.disabled = true; // tickers already on the chart can't be picked again
      }
    })
    return list;
  }
});

// when a ticker is picked, add it as a compared series
comparisonControl.events.on("selected", function (ev) {
  if (ev.item.id != "") {
    addComparingSeries(ev.item.subLabel);
  }
});

// with a compared series added, the chart switches to change in percent, so the prices compare
function addComparingSeries(label) {
  var series = am5xy.LineSeries.new(root, {
    name: label,
    valueYField: "Close",
    calculateAggregates: true,                       // works out the change in percent the chart switches to
    valueXField: "Date",
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY.formatNumber('#.00')}" // the price under the cursor
  });
  var comparingSeries = stockChart.addComparingSeries(series);
  loadData(label, [comparingSeries], currentGranularity); // load its prices
}

// the tickers whose name or symbol contains the search text
function getTicker(search) {
  if (search == "") {
    return [];
  }
  search = search.toLowerCase();
  var tickers = [
    { label: "Apple", subLabel: "AAPL", id: "AAPL" },
    { label: "Advanced Micro Devices", subLabel: "AMD", id: "AMD" },
    { label: "Microsoft", subLabel: "MSFT", id: "MSFT" },
    { label: "Alphabet (Google)", subLabel: "GOOG", id: "GOOG" },
    { label: "Amazon", subLabel: "AMZN", id: "AMZN" },
    { label: "Tesla", subLabel: "TSLA", id: "TSLA" },
    { label: "NVIDIA", subLabel: "NVDA", id: "NVDA" },
    { label: "Netflix", subLabel: "NFLX", id: "NFLX" }
  ];

  return tickers.filter(function (item) {
    return item.label.toLowerCase().match(search) || item.subLabel.toLowerCase().match(search);
  });
}

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
    mainSeriesControl, // pick the main ticker
    comparisonControl, // add tickers to compare
    am5stock.IndicatorControl.new(root, { // add indicators such as moving averages...
      stockChart: stockChart,
      legend: valueLegend // ...listed in the panel's legend
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
