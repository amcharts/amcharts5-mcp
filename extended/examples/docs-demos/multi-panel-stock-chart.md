---
title: "Multi-panel stock chart"
source: "https://docs.amcharts.com/embeds/v5/multi-panel-stock-chart/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/stock/panels"]
---

A demo from the docs page "Panels" (get_doc(path: "charts/stock/panels")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Add panels
// https://docs.amcharts.com/v5/charts/stock/panels/
function addPanel(ticker, showScrollbar, showTooltip) {
  // Create a main stock panel (chart)
  // https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
  var mainPanel = stockChart.panels.push(
    am5stock.StockPanel.new(root, {
      wheelY: "zoomX",
      panX: true,
      panY: true,
      paddingTop: 5
    })
  );

  mainPanel.plotsContainer.set(
    "background",
    am5.Rectangle.new(root, {
      stroke: am5.color(0xeeeeee),
      strokeOpacity: 1
    })
  );

  // Create axes
  // https://docs.amcharts.com/v5/charts/xy-chart/axes/
  var valueAxis = mainPanel.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        inside: true
      }),

      tooltip: am5.Tooltip.new(root, { animationDuration: 200 }),
      numberFormat: "#,###.00",
      extraTooltipPrecision: 2
    })
  );

  valueAxis.get("renderer").labels.template.setAll({
    centerY: am5.p100,
    fill: am5.color(0x888888),
    maxPosition: 0.99
  });

  var dateAxis = mainPanel.xAxes.push(
    am5xy.GaplessDateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },

      renderer: am5xy.AxisRendererX.new(root, {})
    })
  );

  dateAxis.get("renderer").labels.template.setAll({
    maxPosition: 0.99,
    minPosition: 0.01
  });

  var tooltip = dateAxis.set(
    "tooltip",
    am5.Tooltip.new(root, {
      animationDuration: 200
    })
  );

  if (!showTooltip) {
    tooltip.set("forceHidden", true);
  }

  // Add series
  // https://docs.amcharts.com/v5/charts/xy-chart/series/
  var valueSeries = mainPanel.series.push(
    am5xy.CandlestickSeries.new(root, {
      name: ticker,
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

  if (showScrollbar) {
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
  }

  // Load initial data for the first series
  loadData(ticker, showScrollbar ? [valueSeries, sbSeries] : [valueSeries]);
}

addPanel("MSFT", true);
addPanel("AAPL");
addPanel("INTC", false, true);

// Function that dynamically loads data
function loadData(ticker, series) {
  // Load external data
  // https://docs.amcharts.com/v5/charts/xy-chart/series/#setting-data
  am5.net
    .load("https://www.amcharts.com/static/assets/stock/" + ticker + ".csv")
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
        console.log(data);
      });
    });
}
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
