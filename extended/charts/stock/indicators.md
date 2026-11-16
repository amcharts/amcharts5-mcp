---
title: "Indicators"
source: "https://docs.amcharts.com/v5/charts/stock/indicators/"
scraped: "2026-11-16"
---

Stock chart comes with a selection of automatic indicators that can be added to the chart via toolbar or API.

## Adding via toolbar

To enable adding of indicators via UI, we need to add [indicator control](https://docs.amcharts.com/v5/charts/stock/toolbar/indicator-control/) to our stock toolbar:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```

JavaScript:

```js
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```

Example: [Stock chart with indicator control](https://docs.amcharts.com/embeds/v5/stock-chart-with-indicator-control/)

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
  padding: 5px 45px 0 15px;
}

#chartdiv {
  width: 100%;
  height: 85vh;
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
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create a stock chart
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

// Set global number format
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

//
// Main (value) panel
//

// Create a main stock panel (chart)
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(70)
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    }),

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
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "MSFT",
    valueXField: "Date",
    valueYField: "Close",
    highValueYField: "High",
    lowValueYField: "Low",
    openValueYField: "Open",
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: "{valueY}"
  })
);

// Set main value series
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

valueLegend.data.setAll([valueSeries]);

// Add cursor(s)
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
function loadData(ticker, series) {
  // Load external data
  // https://docs.amcharts.com/v5/charts/xy-chart/series/#setting-data
  am5.net
    .load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + ".csv")
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
loadData("MSFT", [valueSeries, sbSeries]);

// Add toolbar
// https://docs.amcharts.com/v5/charts/stock/toolbar/
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
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

## Adding via API

### Creating indicator

Indicators can be added by instantiating an appropriate class, then pushing it into chart's `indicators` list.

Each indicator will need its `stockChart` (target stock chart) and `stockSeries` (value series) set, at the very least.

Some indicators, such as `Volume`, will need `volumeSeries` set as well, as they rely on both value and volume data.

TypeScript:

```ts
stockChart.indicators.push(am5stock.BollingerBands.new(root, {
  stockChart: stockChart,
  stockSeries: valueSeries,
  legend: valueLegend,
  type: "simple"
}));
```

JavaScript:

```js
stockChart.indicators.push(am5stock.BollingerBands.new(root, {
  stockChart: stockChart,
  stockSeries: valueSeries,
  legend: valueLegend,
  type: "simple"
}));
```

### Configuring

\[todo]

### Available indicators

Refer to the links next to each indicator for settings reference.

| Indicator                  | Needs `stockSeries` | Needs `volumeSeries` |                                                              |
| -------------------------- | ------------------- | -------------------- | ------------------------------------------------------------ |
| `AccumulationDistribution` | **Yes**             | Optional             | [Settings](https://docs.amcharts.com/v5/reference/accumulationdistribution/#settings) |
| `AccumulativeSwingIndex`   | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/accumulativeswingindex/#settings)   |
| `Aroon`                    | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/aroon/#settings)                    |
| `AwesomeOscillator`        | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/awesomeoscillator/#settings)        |
| `BollingerBands`           | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/bollingerbands/#settings)           |
| `ChaikinMoneyFlow`         | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/chaikinmoneyflow/#settings)         |
| `ChaikinOscillator`        | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/chaikinoscillator/#settings)        |
| `CommodityChannelIndex`    | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/commoditychannelindex/#settings)    |
| `DisparityIndex`           | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/disparityindex/#settings)           |
| `MACD`                     | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/macd/#settings)                     |
| `MedianPrice`              | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/medianprice/#settings)              |
| `MovingAverage`            | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/movingaverage/#settings)            |
| `MACross`                  | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/macross/#settings)                  |
| `MovingAverageDeviation`   | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/movingaveragedeviation/#settings)   |
| `MovingAverageEnvelope`    | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/movingaverageenvelope/#settings)    |
| `OnBalanceVolume`          | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/onbalancevolume/#settings)          |
| `PVT` (Price Volume Trend) | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/pvt/#settings)                      |
| `RelativeStrengthIndex`    | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/relativestrengthindex/#settings)    |
| `StandardDeviation`        | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/standarddeviation/#settings)        |
| `StochasticOscillator`     | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/stochasticoscillator/#settings)     |
| `Trix`                     | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/trix/#settings)                     |
| `TypicalPrice`             | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/typicalprice/#settings)             |
| `Volume`                   | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/volume/#settings)                   |
| `VolumeProfile`            | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/volumeprofile/#settings)            |
| `VWAP`                     | **Yes**             | **Yes**              | [Settings](https://docs.amcharts.com/v5/reference/vwap/#settings)                     |
| `WilliamsR`                | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/williamsr/#settings)                |
| `ZigZag`                   | **Yes**             |                      | [Settings](https://docs.amcharts.com/v5/reference/zigzag/#settings)                   |

## Creating custom indicators

Refer to "[Creating custom indicators for a Stock Chart](https://docs.amcharts.com/v5/tutorials/creating-custom-indicators-for-a-stock-chart/)" tutorial.

## Related tutorials

* [Stock Chart with custom indicator add button](https://docs.amcharts.com/v5/tutorials/stock-chart-with-custom-indicator-add-button/)
