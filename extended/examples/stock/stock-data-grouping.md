---
title: "Stock Data Grouping"
source: "https://www.amcharts.com/demos/stock-data-grouping/"
category: "stock"
scraped: "2026-10-08"
---

More than six years of daily Microsoft prices, about 1,600 trading days, in one chart. Zoomed out, the days merge into monthly candles so that no more than 150 are on screen; zoom in and they split into weeks, then single days.

When to group data: A screen has room for a few hundred candles; thousands of daily ones melt into a smear. Grouping keeps the count readable at any zoom: each weekly or monthly candle is built from its days, with the first open, the highest high, the lowest low and the last close, and its volume bar adds up the days.

Good for:
- Years of daily or hourly prices
- A long view and the detail in one chart
- Keeping the chart fast with big data

Think twice when:
- Readers who need every single day: start zoomed in
- Averages, not totals: set how each value is grouped
- Huge data sets: load them by interval instead

Prompt: Create a stock chart of about six years of daily Microsoft prices from a CSV file, with candlesticks in the main panel and volume in a panel below. Turn on data grouping, so that zoomed out the days merge into weeks or months. Use the amCharts 5 library with its Responsive theme.

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
}));

// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00"); // thousands separators and two decimals

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",         // the mouse wheel zooms in on the dates
  height: am5.percent(70), // the price panel takes 70% of the height
  panX: true,              // a drag pans through the dates...
  panY: true               // ...and up and down
}));

// Create value axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the price axis to zoom it
  }),
  tooltip: am5.Tooltip.new(root, {}), // shows the cursor's price on the axis
  numberFormat: "#,###.00",           // two decimals
  extraTooltipPrecision: 2            // the axis tooltip shows two more decimals than the labels
}));

// a gapless date axis leaves out weekends and holidays, the days without prices
var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  // at most 150 candles in view: with more days shown, they merge into weeks, months and so on
  groupData: true,
  groupCount: 150,
  baseInterval: { // one candle a day before any merging
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled dates
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
  turboMode: true,           // draws all the candles at once, much faster with many of them
  name: "MSFT",
  clustered: false,          // each candle takes its slot's full width
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
var volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",         // the mouse wheel zooms in on the dates here too
  panX: true,              // a drag pans through the dates
  panY: false,
  height: am5.percent(30), // the other 30% of the height
  paddingTop: 6            // a 6px gap above the volume
}));

// hide close button as we don't want this panel to be closed
volumePanel.panelControls.closeButton.set("forceHidden", true);

var volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one column a day before any merging
    timeUnit: "day",
    count: 1
  },
  // grouped the same way as the main panel, so the columns line up with the candles
  groupData: true,
  groupCount: 150,
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
  pan: "zoom" // drag along the axis to zoom it
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
  clustered: false, // each column takes its slot's full width
  valueXField: "Date",
  valueYField: "Volume",
  valueYGrouped: "sum", // a grouped week or month shows its total volume, not the last day's
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
    return stockChart.getVolumeColor(dataItem); // green if it closed at or above the period before, else red
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
  snapToSeries: [valueSeries], // the cursor snaps to the candles
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

// Function that dynamically loads data
function loadData(ticker, series, granularity) {

  // Load external data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
  am5.net.load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + "_big_" + granularity + ".csv").then(function (result) {

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
var currentGranularity = "day"; // daily prices: the file ending in _big_day
loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity);

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
