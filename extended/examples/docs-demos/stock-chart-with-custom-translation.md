---
title: "Stock chart with custom translation"
source: "https://docs.amcharts.com/embeds/v5/stock-chart-with-custom-translation/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/stock/translating-stock-chart"]
---

A demo from the docs page "Translating Stock Chart" (get_doc(path: "charts/stock/translating-stock-chart")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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

// Set Lithuania locale
root.locale = am5locales_lt_LT;

// Set custom translations for StockChart
root.language.setTranslationsAny({
  // Misc prompts
  Line: "Linija",
  Candles: "Žvakės",
  "Hollow Candles": "Tuščiavidurės žvakės",
  Sticks: "Pagaliukai",
  Fills: "Užpildai",
  Color: "Spalva",
  "Positive color": "Pozityvi spalva",
  "Negative color": "Negatyvi spalva",
  Fill: "Užpildas",
  Save: "Išsaugoti",
  Cancel: "Atšaukti",
  Apply: "Pritaikyti",
  Reset: "Atstatyti",
  Comparison: "Palyginimas",
  to: "iki",
  "Scroll to increment": "",
  "Click to toggle": "Spragtelkite, kad perjungtumėte",
  Search: "Paieška",
  "Search results are limited to %1.": "Maksimalus paieškos rezultatų kiekis: %1",

  // Settings
  Settings: "Nustatymai",
  "Y-axis scale": "Y-ašies skalė",
  "Change percent": "Pasikeitimas procentais",
  Regular: "Įprastinė",
  Logarithmic: "Logaritminė",

  // Date-range selectors
  "Date Range": "Laiko periodas",
  "Period selector": "Periodo pasirinkimas",
  D: "",
  M: "",
  YTD: "",
  Y: "",
  Max: "Viskas",
  minute: "minutė",
  minutes: "minutės",
  hour: "valanda",
  hours: "valandos",
  day: "diena",
  week: "savaitė",
  month: "mėnuo",
  year: "metai",
  Year: "Metai",
  Month: "Mėnuo",
  Hour: "Valanda",
  Minute: "Minutė",
  Wk: "Sav",

  // Drawing
  Draw: "Anotuoti",
  "Drawing tool": "Įrankis",
  "Snap icon to data": "Lipdyti prie duomenų",
  "Line color": "Linijos spalva",
  "Line thickness": "Linijos storis",
  "Line style": "Linijos stilius",
  "Fill color": "Užpildo spalva",
  Text: "Tekstas",
  "Text color": "Teksto spalva",
  "Label font size": "Užrašo šrifto dydis",
  "Label font family": "Užrašo šrifto tipas",
  Bold: "Pastorintas",
  Italic: "Kursyvas",
  "Show line extension": "Rodyti linjos pratęsimus",
  Eraser: "Trintukas",
  Clear: "Išvalyti",
  "Clear all drawings": "Išvalyti visas anotacijas",
  Callout: "Komentaras",
  Doodle: "Pieštukas",
  Ellipse: "Elipsė",
  Fibonacci: "Fibonacci",
  "Fibonacci Timezone": "Fibonacci laiko zona",
  "Horizontal Line": "Horizontali linija",
  "Horizontal Ray": "Horizontalus spindulys",
  "Arrows &amp; Icons": "Rodyklės ir ikonos",
  Label: "Užrašas",
  Polyline: "Poli-linija",
  "Quadrant Line": "",
  Rectangle: "Keturkampis",
  Regression: "Regresija",
  "Trend Line": "Tendencijų linija",
  "Vertical Line": "Vertikali linija",

  // Indicators
  Indicators: "Indikatoriai",
  Increase: "Kilimas",
  Decrease: "Kritimas",
  "Accumulation Distribution": "",
  "Accumulative Swing Index": "",
  "Use Volume": "",
  "Limit move value": "",
  Period: "",
  "Aroon up": "",
  "Aroon down": "",
  Increasing: "",
  Decreasing: "",
  Upper: "",
  Average: "",
  Lower: "",
  Field: "",
  Type: "",
  "Fast period": "",
  "Slow period": "",
  Overbought: "",
  Oversold: "",
  "Moving Average Type": "",
  "Fast MA period": "",
  "Slow MA period": "",
  "Signal period": "",
  MACD: "",
  Signal: "",
  Offset: "",
  "Points/Percent": "",
  "Shift type": "",
  Shift: "",
  Top: "",
  Median: "",
  Bottom: "",
  "%K Smoothing": "",
  "%D Smoothing": "",
  Fast: "",
  Slow: "",
  "Signal color": "",
  "Up volume": "",
  "Down volume": "",
  Deviation: "",
  Depth: "",
  Aroon: "",
  "Awesome Oscillator": "",
  "Bollinger Bands": "",
  "Chaikin Money Flow": "",
  "Chaikin Oscillator": "",
  "Commodity Channel Index": "",
  "Disparity Index": "",
  "Moving Average": "",
  "Moving Average Deviation": "",
  "Moving Average Envelope": "",
  "On Balance Volume": "",
  "Relative Strength Index": "",
  "Standard Deviation": "",
  "Stochastic Oscillator": "",
  Trix: "",
  "Typical Price": "",
  Volume: "",
  VWAP: "",
  "Williams R": "",
  "Median Price": "",
  ZigZag: ""
});

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
    panY: true
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
      "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
    legendRangeValueText: ""
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

// Add comparing series
addComparingSeries("AAPL");

// Set up main indices selector
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/comparison-control/
var mainSeriesControl = am5stock.DropdownListControl.new(root, {
  stockChart: stockChart,
  name: valueSeries.get("name"),
  icon: am5stock.StockIcons.getIcon("Candlestick Series"),
  fixedLabel: true,
  searchable: true,
  searchCallback: function (query) {
    var mainSeries = stockChart.get("stockSeries");
    var mainSeriesID = mainSeries ? mainSeries.get("name") : "";
    var list = getTicker(query);
    am5.array.each(list, function (item) {
      if (item.id == mainSeriesID) {
        item.disabled = true;
      }
    });
    return list;
  }
});

mainSeriesControl.events.on("selected", function (ev) {
  mainSeriesControl.set("name", ev.item.subLabel);
  valueSeries.set("name", ev.item.subLabel);
  loadData(ev.item.subLabel, [valueSeries, volumeSeries, sbSeries], currentGranularity);
});

// Set up comparison control
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/comparison-control/
var comparisonControl = am5stock.ComparisonControl.new(root, {
  stockChart: stockChart,
  searchable: true,
  searchCallback: function (query) {
    var compared = stockChart.getPrivate("comparedSeries", []);
    var main = stockChart.get("stockSeries");
    if (compared.length > 4) {
      return [
        {
          label: "A maximum of 5 comparisons added",
          subLabel: "Remove some to add new ones",
          id: "",
          className: "am5stock-list-info"
        }
      ];
    }

    var comparedIds = [];
    am5.array.each(compared, function (series) {
      comparedIds.push(series.get("name"));
    });

    var list = getTicker(query);
    am5.array.each(list, function (item) {
      if (comparedIds.indexOf(item.id) !== -1 || main.get("name") == item.id) {
        item.disabled = true;
      }
    });
    return list;
  }
});

comparisonControl.events.on("selected", function (ev) {
  addComparingSeries(ev.item.subLabel);
});

function addComparingSeries(label) {
  var series = am5xy.LineSeries.new(root, {
    name: label,
    valueYField: "Close",
    calculateAggregates: true,
    valueXField: "Date",
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY.formatNumber('#.00')}"
  });

  var comparingSeries = stockChart.addComparingSeries(series);
  loadData(label, [comparingSeries], currentGranularity);
}

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
// https://docs.amcharts.com/v5/charts/stock/toolbar/series-type-control/
var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function (ev) {
  setSeriesType(ev.item.id);
});

function getNewSettings(series) {
  var newSettings = [];
  am5.array.each(
    [
      "name",
      "valueYField",
      "highValueYField",
      "lowValueYField",
      "openValueYField",
      "calculateAggregates",
      "valueXField",
      "xAxis",
      "yAxis",
      "legendValueText",
      "stroke",
      "fill"
    ],
    function (setting) {
      newSettings[setting] = series.get(setting);
    }
  );
  return newSettings;
}

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
      newSettings.clustered = false;
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
      if (seriesType == "procandlestick") {
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
    valueLegend.data.removeValue(currentSeries);
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    var cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", [series]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}

// Stock toolbar
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    mainSeriesControl,
    comparisonControl,
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      legend: valueLegend
    }),

    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),

    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    }),

    seriesSwitcher,
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/locales/lt_LT.js
