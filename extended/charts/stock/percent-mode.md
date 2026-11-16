---
title: "Percent scale"
source: "https://docs.amcharts.com/v5/charts/stock/percent-mode/"
scraped: "2026-11-16"
---

> Percent scale in a Stock chart allows applying special setting values to chart series and axes when there are more than one series displayed, or when turned on in API or via stock toolbar.

Percent scale in a [Stock chart](https://docs.amcharts.com/v5/charts/stock/) allows applying special setting values to chart series and axes when there are more than one series displayed, or when turned on in API or via stock [toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/).

## Intended use

While percent scale can override any series or value axis settings, the primary use of it in stock charts is to switch chart from absolute values to percentual change when there are more than one indices being plotted.

Since values can differ fundamentally, it might be hard to compare those on an absolute value scale.

## Prerequisites

### Main series

Percent scale will work only if the chart has its "main" series set. That is its `stockSeries` setting is set.

TypeScript:

```ts
stockChart.set("stockSeries", valueSeries);
```

JavaScript:

```js
stockChart.set("stockSeries", valueSeries);
```

Stock chart needs to know which series is the "main" series, so that there's a known target other series are compared against.

> **More info:** Read more about it in "Stock chart: [Setting main series](https://docs.amcharts.com/v5/charts/stock/#setting-main-series)".

### Calculation of aggregates

Main series, as well as all the other series that will be used in percent scale, need their `calculateAggregates` set to `true`.

This is needed, because percent scale uses derivative change values in series.

## Configuring

To configure what happens when percent scale is active, stock chart provides two settings: `percentScaleSeriesSettings` and `percentScaleValueAxisSettings`.

There's also a third setting: `autoSetPercentScale`, which indicates whether chart should switch to percent scale when compared series is added.

Both are objects that can hold key/value pairs from `XYSeries` and `ValueAxis`, respectively.

They also come with defaults:

```json title="Defaults"
{
  percentScaleSeriesSettings: {
    valueYShow: "valueYChangePercent",
    openValueYShow: "openValueYChangePercent",
    highValueYShow: "highValueYChangePercent",
    lowValueYShow: "lowValueYChangePercent",
  },
  percentScaleValueAxisSettings: {
    numberFormat: "#.##'%'"
  },
  autoSetPercentScale: true
}
```

You can override it the way you need to:

TypeScript:

```ts
let stockChart = root.container.children.push(am5stock.StockChart.new(root, {
  percentScaleSeriesSettings: {
    valueYShow: "valueYChangePercent",
    openValueYShow: "openValueYChangePercent",
    highValueYShow: "highValueYChangePercent",
    lowValueYShow: "lowValueYChangePercent",
  },
  percentScaleValueAxisSettings: {
    numberFormat: "#.##'%'"
  },
  autoSetPercentScale: true
}));
```

JavaScript:

```js
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
  percentScaleSeriesSettings: {
    valueYShow: "valueYChangePercent",
    openValueYShow: "openValueYChangePercent",
    highValueYShow: "highValueYChangePercent",
    lowValueYShow: "lowValueYChangePercent",
  },
  percentScaleValueAxisSettings: {
    numberFormat: "#.0'%'"
  },
  autoSetPercentScale: false
}));
```

In the above example, when percent scale kicks in, the "main series" as well as all the other series that are attached to the same value axis, would get new values for their `valueYShow`, `openValueYShow`, `highValueYShow`, and `lowValueYShow` settings.

This will cause series to be plotted not from absolute value, but from their percent change.

Additionally, a new `numberFormat` will be applied to related value axis.

## Enabling

### Automatically

If `autoSetPercentScale` is set to `true` (default setting), the stock chart will go into percent scale automatically when new series is added via chart's `addComparingSeries()` method.

TypeScript:

```ts
let series = stockChart.addComparingSeries(am5xy.LineSeries.new(root, {
  name: "MSFT",
  valueYField: "Close",
  calculateAggregates: true,
  valueXField: "Date",
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY.formatNumber('#.00')}"
}));
series.data.setAll(data);
```

JavaScript:

```js
var series = stockChart.addComparingSeries(am5xy.LineSeries.new(root, {
  name: "MSFT",
  valueYField: "Close",
  calculateAggregates: true,
  valueXField: "Date",
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY.formatNumber('#.00')}"
}));
series.data.setAll(data);
```

Pushing new series into panel's (chart's) `series` list will not trigger percent scale.

### Via API

Percent scale can also be toggled on and off using stock chart's `setPercentScale()` method.

It accepts boolean values. It can also be called without any parameters at all.

| Parameter  | Comment                                                            |
| ---------- | ------------------------------------------------------------------ |
| `true`     | Percent scale is on                                                |
| `false`    | Percent scale is off                                               |
| *no value* | Will turn Percent scale on if there are any compared series added. |

TypeScript:

```ts
strockChart.setPercentScale(true); // turn percent scale on
```

JavaScript:

```js
strockChart.setPercentScale(true); // turn percent scale on
```

### Via toolbar

If [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/) is enabled and contains `SettingsControl`, switching to "Change percent" Y-axis scale would trigger percent scale, regardless how many series there are currently on the chart.

![](https://docs.amcharts.com/v5/images/charts/stock/percent-mode/stock_change_percent_scale.png)

## Example

Example: [Stock chart with comparison](https://docs.amcharts.com/embeds/v5/stock-chart-with-comparison/)

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

//
// Secondary (volume) panel
//

// Create a main stock panel (chart)
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var volumePanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true,
    height: am5.percent(30)
  })
);

// hide Close button as we don't want to allow users to turn off this panel
volumePanel.panelControls.closeButton.set("forceHidden", true);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var volumeValueAxis = volumePanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    numberFormat: "#.#a",
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  })
);

var volumeDateAxis = volumePanel.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {
      forceHidden: true
    })
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var volumeSeries = volumePanel.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "MSFT",
    valueXField: "Date",
    valueYField: "Volume",
    xAxis: volumeDateAxis,
    yAxis: volumeValueAxis,
    legendValueText: "{valueY.formatNumber('#,###')}"
  })
);

volumeSeries.columns.template.set("strokeOpacity", 0);

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
});

// Set main value series
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("volumeSeries", volumeSeries);

// Add a stock legend
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var volumeLegend = volumePanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

volumeLegend.data.setAll([volumeSeries]);

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

var volumeCursor = volumePanel.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: volumeValueAxis,
    xAxis: volumeDateAxis,
    snapToSeries: [volumeSeries],
    snapToSeriesBy: "y!"
  })
);

volumeCursor.lineY.set("forceHidden", true);

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
loadData("MSFT", [valueSeries, volumeSeries, sbSeries]);

// Add comparison control
var comparisonControl = am5stock.ComparisonControl.new(root, {
  stockChart: stockChart,
  searchable: true,
  items: [
    { label: "Apple", subLabel: "AAPL", id: "AAPL" },
    { label: "Tesla", subLabel: "TSLA", id: "TSLA" }
  ]
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
  loadData(item.subLabel, [comparingSeries]);
});

// Add toolbar
// https://docs.amcharts.com/v5/charts/stock/toolbar/
const toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    comparisonControl,
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```
