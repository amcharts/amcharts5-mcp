---
title: "Stock chart controls + series type control"
source: "https://docs.amcharts.com/embeds/v5/stock-chart-controls-series-type-control/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/stock/toolbar"]
---

A demo from the docs page "Stock toolbar" (get_doc(path: "charts/stock/toolbar")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function (ev) {
  setSeriesType(am5.type.isString(ev.item) ? ev.item : ev.item.id);
});

function setSeriesType(seriesType) {
  // Remove previous series
  var currentSeries = stockChart.get("stockSeries");
  var data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  let series;
  switch (seriesType) {
    case "line":
    case "area":
      series = mainPanel.series.push(
        am5xy.LineSeries.new(root, {
          name: "RIVN",
          valueYField: "Close",
          highValueYField: "High",
          lowValueYField: "Low",
          openValueYField: "Open",
          calculateAggregates: true,
          valueXField: "Date",
          xAxis: dateAxis,
          yAxis: valueAxis,
          legendValueText:
            "volume:{Volume.formatNumber()} open:{openValueY.formatNumber('#.00')} high:{highValueY.formatNumber('#.00')} low:{lowValueY.formatNumber('#.00')} close:{valueY.formatNumber('#.00')}"
        })
      );

      if (seriesType == "area") {
        series.fills.template.setAll({
          fillOpacity: 0.5,
          visible: true
        });
      }
      break;
    case "candlestick":
    case "procandlestick":
      series = mainPanel.series.push(
        am5xy.CandlestickSeries.new(root, {
          name: "RIVN",
          clustered: false,
          valueYField: "Close",
          highValueYField: "High",
          lowValueYField: "Low",
          openValueYField: "Open",
          calculateAggregates: true,
          valueXField: "Date",
          xAxis: dateAxis,
          yAxis: valueAxis,
          legendValueText:
            "volume:{Volume.formatNumber()} open:{openValueY.formatNumber('#.00')} high:{highValueY.formatNumber('#.00')} low:{lowValueY.formatNumber('#.00')} close:{valueY.formatNumber('#.00')}"
        })
      );

      if (seriesType == "procandlestick") {
        series.columns.template.get("themeTags").push("pro");
      }
      break;
    case "ohlc":
      series = mainPanel.series.push(
        am5xy.OHLCSeries.new(root, {
          name: "RIVN",
          clustered: false,
          valueYField: "Close",
          highValueYField: "High",
          lowValueYField: "Low",
          openValueYField: "Open",
          calculateAggregates: true,
          valueXField: "Date",
          xAxis: dateAxis,
          yAxis: valueAxis,
          legendValueText:
            "volume:{Volume.formatNumber()} open:{openValueY.formatNumber('#.00')} high:{highValueY.formatNumber('#.00')} low:{lowValueY.formatNumber('#.00')} close:{valueY.formatNumber('#.00')}"
        })
      );

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

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),

    am5stock.PeriodSelector.new(root, {
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
  padding: 5px 45px 0 15px;
}

#chartdiv {
  width: 100%;
  height: 85vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
