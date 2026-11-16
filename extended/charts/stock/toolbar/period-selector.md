---
title: "Period selector"
source: "https://docs.amcharts.com/v5/charts/stock/toolbar/period-selector/"
scraped: "2026-11-16"
---

> Period selector is a stock toolbar control that displays buttons for predefined periods. Those can be used to single-click zoom to some useful pre-defined period, such as 1 month, year-to-date, etc.

Period selector is a [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/) control that displays buttons for predefined periods. Those can be used to single-click zoom to some useful pre-defined period, such as 1 month, year-to-date, etc.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.PeriodSelector.new(root, {
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
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    })
  ]
});
```

Example: [Stock chart with date/period selector](https://docs.amcharts.com/embeds/v5/stock-chart-with-dateperiod-selector/)

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
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),

    am5stock.PeriodSelector.new(root, {
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

## Zoom anchor point

By default, clicking on a period button, will select a range of dates that ends with the last timestamp on the X-axis scale.

If we'd rather make it zoom from the start of the axis, we can set period selector's `zoomTo` setting to `"start"`:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      zoomTo: "start"
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
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      zoomTo: "start"
    })
  ]
});
```

## Period list

A list of pre-defined periods can be set via control's `periods` setting.

It accepts a list of objects that holds time unit (`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`, and two special units: `"ytd"` and `"max"`), count, and a name.

Defaults are as follows:

```json
[
  { timeUnit: "day", count: 1, name: "1D" },
  { timeUnit: "day", count: 5, name: "5D" },
  { timeUnit: "month", count: 1, name: "1M" },
  { timeUnit: "month", count: 3, name: "3M" },
  { timeUnit: "month", count: 6, name: "6M" },
  { timeUnit: "ytd", name: "YTD" },
  { timeUnit: "year", count: 1, name: "1Y" },
  { timeUnit: "year", count: 2, name: "2Y" },
  { timeUnit: "year", count: 5, name: "5Y" },
  { timeUnit: "max", name: "Max" },
]
```

Should we want to, we can modify it to our needs:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: [
        { timeUnit: "month", count: 1, name: "1M" },
        { timeUnit: "ytd", name: "YTD" },
        { timeUnit: "year", count: 1, name: "1Y" },
        { timeUnit: "max", name: "Max" },
      ]
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
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: [
        { timeUnit: "month", count: 1, name: "1M" },
        { timeUnit: "ytd", name: "YTD" },
        { timeUnit: "year", count: 1, name: "1Y" },
        { timeUnit: "max", name: "Max" },
      ]
    })
  ]
});
```

### Custom periods

We can also use `"custom"` type periods in `periods` list.

Those need to have their `start` or `end` properties set to a Date object.

If `start` is not set, the button will assume the earliest date available in chart.

Similarly, if `end` is not set, it will assume the timestamp of the end of data.

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: [
        { timeUnit: "custom", name: "2022", from: new Date(2022, 0, 1), to: new Date(2022, 11, 31, 23, 59, 59 },
        { timeUnit: "custom", name: "2023", from: new Date(2023, 0, 1), to: new Date(2023, 11, 31, 23, 59, 59 }
      ]
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
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: [
        { timeUnit: "custom", name: "2022", from: new Date(2022, 0, 1), to: new Date(2022, 11, 31, 23, 59, 59 },
        { timeUnit: "custom", name: "2023", from: new Date(2023, 0, 1), to: new Date(2023, 11, 31, 23, 59, 59 }
      ]
    })
  ]
});
```

## Pre-selecting a period

If we want the chart to start up with some period pre-selected, we can use period selector's `selectPeriod()` method.

It accepts a period definition as a parameter, e.g.:

TypeScript:

```ts
periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
```

JavaScript:

```js
periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
```

However, since chart starts off without data, and thus no scale on a date axis, we would probably need to call this when data is parsed:

TypeScript:

```ts
valueSeries.events.once("datavalidated", function() {
  periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
});
```

JavaScript:

```js
valueSeries.events.once("datavalidated", function() {
  periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
});
```

## Standalone usage / API

Period selector can also be used as a standalone object, without adding it to a stock toolbar:

TypeScript:

```ts
let periodSelector = am5stock.PeriodSelector.new(root, {
  stockChart: stockChart
});

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
```

JavaScript:

```js
var periodSelector = am5stock.PeriodSelector.new(root, {
  stockChart: stockChart
});

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
```

## Date range selector

Period selector works well together with [date range selector](https://docs.amcharts.com/v5/charts/stock/toolbar/date-range-selector/) control.
