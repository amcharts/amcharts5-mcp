---
title: "Indicator control"
source: "https://docs.amcharts.com/v5/charts/stock/toolbar/indicator-control/"
scraped: "2026-11-16"
---

> Indicator control allows selecting and adding automatic technical indicators to the chart.

Indicator control allows selecting and adding automatic technical [indicators](https://docs.amcharts.com/v5/charts/stock/indicators/) to the chart.

## Main series

Most of the indicators will require stock chart to have its [main series](https://docs.amcharts.com/v5/charts/stock/#setting-main-series) set. Some will need volume series to be set, too.

### Value series

Indicators do not have their data set, but rather derive it from the "main series". It's the series, that will feed values to all indicators.

It can be any series, but it needs to have its `highValueYField`, `lowValueYField`, and `closeValueYField` set in addition to `valueYField`.

It also need to be assigned to chart's `stockSeries`:

TypeScript:

```ts
let valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
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
}));

stockChart.set("stockSeries", valueSeries);
```

JavaScript:

```js
var valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
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
}));

stockChart.set("stockSeries", valueSeries);
```

### Volume series

Some indicators will require "main volume series" to grab values from.

Contrary to value series, it only needs `valueYField` set.

We assign it to chart's `volumeSeries`:

TypeScript:

```ts
stockChart.set("volumeSeries", volumeSeries);
```

JavaScript:

```js
stockChart.set("volumeSeries", volumeSeries);
```

If we don't actually need it displayed, we can hide it using `forceHidden: true` setting:

TypeScript:

```ts
let volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  forceHidden: true,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

volumeValueAxis.get("renderer").grid.template.set("forceHidden", true);
volumeValueAxis.get("renderer").labels.template.set("forceHidden", true);

let volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  forceHidden: true
}));

stockChart.set("volumeSeries", volumeSeries);
```

JavaScript:

```js
var volumeValueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  forceHidden: true,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

volumeValueAxis.get("renderer").grid.template.set("forceHidden", true);
volumeValueAxis.get("renderer").labels.template.set("forceHidden", true);

var volumeSeries = mainPanel.series.push(am5xy.ColumnSeries.new(root, {
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: dateAxis,
  yAxis: volumeValueAxis,
  forceHidden: true
}));

stockChart.set("volumeSeries", volumeSeries);
```

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

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

## Configuring

### Indicator list

You can use Indicator control's `indicators` setting to control which indicators and in what order they appear:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      indicators: ["Bollinger Bands", "Moving Average", "ZigZag"]
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
      stockChart: stockChart,
      indicators: ["Bollinger Bands", "Moving Average", "ZigZag"]
    })
  ]
});
```

### Custom indicators

Please refer to "[Creating custom indicators for a Stock Chart](https://docs.amcharts.com/v5/tutorials/creating-custom-indicators-for-a-stock-chart/)" tutorial for the information.

### Settings modal

By default, an indicator settings modal would open automatically when indicator is added via Indicator control.

We can disable this behavior using indicator setting `autoOpenSettings` in a [custom theme](https://docs.amcharts.com/v5/concepts/themes/creating-themes/).

We can either target particular indicators:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Aroon").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes([
  am5themes_Animated.new(root),
  MyTheme.new(root)
]);
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Aroon").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes([
  am5themes_Animated.new(root),
  MyTheme.new(root)
]);
```

Or all of them by targeting `"Indicator"`:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Indicator").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes([
  am5themes_Animated.new(root),
  MyTheme.new(root)
]);
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Indicator").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes([
  am5themes_Animated.new(root),
  MyTheme.new(root)
]);
```
