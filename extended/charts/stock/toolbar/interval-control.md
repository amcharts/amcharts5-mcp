---
title: "Interval control"
source: "https://docs.amcharts.com/v5/charts/stock/toolbar/interval-control/"
scraped: "2026-11-16"
---

> Interval control is a dropdown list of intervals for user to choose from. Implementer can add it to a stock toolbar, augment it with custom functionality to load/set appropriate data as well as related settings.

Interval control is a dropdown list of intervals for user to choose from. Implementer can add it to a [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/), augment it with custom functionality to load/set appropriate data as well as related settings.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

TypeScript:

```ts
// Add series type control
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    intervalControl
  ]
});
```

JavaScript:

```js
// Add series type control
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    intervalControl
  ]
});
```

This will add a control, but it won't be useful because it does not do anything beyond allowing to select from the list. We will need to add an event that would actually handle the switch of the interval.

## Event

To catch the moment user chooses something from the list, we'll use control's `selected` event:

TypeScript:

```ts
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // ...
}
```

JavaScript:

```js
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // ...
}
```

In the above code, whenever new interval is selected from the list, our custom function `setDataInterval()` is invoked, with interval passed in as an identifier.

At this point our custom code should:

* Load data suitable for target granularity.
* Update `baseInterval` setting on a related `DateAxis`.
* Set settings to main and other series.

> **Important:** `baseInterval` is used when parsing data, so it needs to be set **before** series data.

TypeScript:

```ts
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // Load external data
  am5.net.load("/data/mydata.php?timeUnit=" + interval.timeUnit + "&count=" + interval.count).then(function(result) {

    dateAxis.set("baseInterval", interval);
    valueSeries.data.setAll(am5.JSONParser.parse(result.response));
  });
}
```

JavaScript:

```js
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // Load external data
  am5.net.load("/data/mydata.php?timeUnit=" + interval.timeUnit + "&count=" + interval.count).then(function(result) {
    dateAxis.set("baseInterval", interval);
    valueSeries.data.setAll(am5.JSONParser.parse(result.response));
  });
}
```

> **Note:** If you have a scrollbar with preview in your chart, you might also want to update data of its series, and `baseInterval` of its date axis. Please refer to a live example on this page for a demo.

> **More info:** For more information about loading and parsing external data, please refer to "[External data](https://docs.amcharts.com/v5/concepts/data/#external-data)" tutorial.

## Interval list

To provide a custom list of intervals, use control's `items` setting.

Default is:

```json
[
  { id: "1 minute", label: "1 minute", interval: { timeUnit: "minute", count: 1 } },
  { id: "2 minute", label: "2 minutes", interval: { timeUnit: "minute", count: 2 } },
  { id: "5 minute", label: "5 minutes", interval: { timeUnit: "minute", count: 5 } },
  { id: "15 minute", label: "15 minutes", interval: { timeUnit: "minute", count: 15 } },
  { id: "30 minute", label: "30 minutes", interval: { timeUnit: "minute", count: 30 } },
  { id: "1 hour", label: "1 hour", interval: { timeUnit: "hour", count: 1 } },
  { id: "4 hour", label: "4 hours", interval: { timeUnit: "hour", count: 4 } },
  { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
  { id: "1 week", label: "1 week", interval: { timeUnit: "week", count: 1 } },
  { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } },
  { id: "1 year", label: "1 year", interval: { timeUnit: "year", count: 1 } }
]
```

To set current item, use `currentItem` setting.

The following will provide selection between 1, 5, and 10 days, as well as 1 month, with 5 days set as default:

TypeScript:

```ts
// Add series type control
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  currentItem: "5 day",
  [
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "5 day", label: "5 days", interval: { timeUnit: "day", count: 5 } },
    { id: "10 day", label: "10 days", interval: { timeUnit: "day", count: 10 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  ]
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    intervalControl
  ]
});
```

JavaScript:

```js
// Add series type control
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  currentItem: "5 day",
  [
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "5 day", label: "5 days", interval: { timeUnit: "day", count: 5 } },
    { id: "10 day", label: "10 days", interval: { timeUnit: "day", count: 10 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  ]
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    intervalControl
  ]
});
```

## Example

Example: [Stock chart with data granularity switcher](https://docs.amcharts.com/embeds/v5/stock-chart-with-data-granularity-switcher/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/stock.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartcontrols"></div>
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartcontrols {
  height: auto;
  padding: 5px 5px 0 15px;
}

#chartdiv {
  width: 100%;
  height: 80vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create a stock chart
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

// Set global number format
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(70)
  })
);

// Create value axis
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    }),

    extraMin: 0.1, // adds some space for for main series
    tooltip: am5.Tooltip.new(root, {}),
    numberFormat: "#,###.00",
    extraTooltipPrecision: 2
  })
);

var dateAxis = mainPanel.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    groupData: true,
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Add series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "MSFT",
    clustered: false,
    valueXField: "Date",
    valueYField: "Close",
    highValueYField: "High",
    lowValueYField: "Low",
    openValueYField: "Open",
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText:
      "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]"
  })
);

// Set main value series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

// Create volume axis
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});

volumeAxisRenderer.labels.template.set("forceHidden", true);
volumeAxisRenderer.grid.template.set("forceHidden", true);

var volumeValueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    numberFormat: "#.#a",
    height: am5.percent(20),
    y: am5.percent(100),
    centerY: am5.percent(100),
    renderer: volumeAxisRenderer
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var volumeSeries = mainPanel.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Volume",
    clustered: false,
    valueXField: "Date",
    valueYField: "Volume",
    xAxis: dateAxis,
    yAxis: volumeValueAxis,
    legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
  })
);

volumeSeries.columns.template.setAll({
  strokeOpacity: 0,
  fillOpacity: 0.5
});

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
});

// Set main series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]);

// Add cursor(s)
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
mainPanel.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: valueAxis,
    xAxis: dateAxis,
    snapToSeries: [valueSeries],
    snapToSeriesBy: "y!"
  })
);

// Add scrollbar
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set(
  "scrollbarX",
  am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal",
    height: 50
  })
);

stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "Close",
    valueXField: "Date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

// Function that dynamically loads data
function loadData(ticker, series, granularity) {
  // Load external data
  // https://docs.amcharts.com/v5/charts/xy-chart/series/#setting-data
  am5.net
    .load(
      "https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" +
        ticker +
        "_" +
        granularity +
        ".csv"
    )
    .then(function (result) {
      // Parse loaded data
      var data = am5.CSVParser.parse(result.response, {
        delimiter: ",",
        skipEmpty: true,
        useColumnNames: true
      });

      // Process data (convert dates and values)
      var processor = am5.DataProcessor.new(root, {
        dateFields: ["Date"],
        dateFormat: "yyyy-MM-dd",
        numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
      });

      processor.processMany(data);

      // Set data
      am5.array.each(series, function (item) {
        item.data.setAll(data);
      });
    });
}

// Load initial data for the first series
var currentGranularity = "day";
loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity);

// Set up comparison control
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/comparison-control/
var comparisonControl = am5stock.ComparisonControl.new(root, {
  stockChart: stockChart,
  searchable: true,
  searchCallback: (query) => {
    console.log(query);
    return getTicker(query);
  }
});

comparisonControl.events.on("selected", function (ev) {
  var item = ev.item;
  var series = am5xy.LineSeries.new(root, {
    name: item.subLabel,
    valueYField: "Close",
    calculateAggregates: true,
    valueXField: "Date",
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY.formatNumber('#.00')}"
  });

  var comparingSeries = stockChart.addComparingSeries(series);
  loadData(item.subLabel, [comparingSeries], currentGranularity);
});

function getTicker(search) {
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

  return tickers.filter((item) => {
    return item.label.toLowerCase().match(search) || item.subLabel.toLowerCase().match(search);
  });
}

// Interval switcher
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/interval-control/
var intervalSwitcher = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  items: [
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "1 week", label: "1 week", interval: { timeUnit: "week", count: 1 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  ]
});

intervalSwitcher.events.on("selected", function (ev) {
  // Determine selected granularity
  currentGranularity = ev.item.interval.timeUnit;

  // Get series
  var valueSeries = stockChart.get("stockSeries");

  // Set up zoomout
  valueSeries.events.once("datavalidated", function () {
    mainPanel.zoomOut();
  });

  // Load data for all series (main series + comparisons)
  var promises = [];
  promises.push(loadData("MSFT", [valueSeries, volumeSeries, sbSeries], currentGranularity));
  am5.array.each(stockChart.getPrivate("comparedSeries", []), function (series) {
    promises.push(loadData(series.get("name"), [series], currentGranularity));
  });

  // Once data loading is done, set `baseInterval` on the DateAxis
  Promise.all(promises).then(function () {
    dateAxis.set("baseInterval", ev.item.interval);
    sbDateAxis.set("baseInterval", ev.item.interval);
  });
});

// Stock toolbar
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    comparisonControl,
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      legend: valueLegend
    }),

    intervalSwitcher,
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```
