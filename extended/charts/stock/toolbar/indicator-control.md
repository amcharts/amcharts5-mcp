---
title: "Indicator control"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/indicator-control/"
scraped: "2026-10-08"
---

Indicator control allows selecting and adding automatic technical [indicators](https://www.amcharts.com/docs/v5/charts/stock/indicators/) to the chart.

## Main series

Most of the indicators will require stock chart to have its [main series](https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series) set. Some will need volume series to be set, too.

### Value series

Indicators do not have their data set, but rather derive it from the "main series". It's the series, that will feed values to all indicators.

It can be any series, but it needs to have its `highValueYField`, `lowValueYField`, and `closeValueYField` set in addition to `valueYField`.

It also need to be assigned to chart's `stockSeries`:

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

### Volume series

Some indicators will require "main volume series" to grab values from.

Contrary to value series, it only needs `valueYField` set.

We assign it to chart's `volumeSeries`:

stockChart.set("volumeSeries", volumeSeries);

stockChart.set("volumeSeries", volumeSeries);

If we don't actually need it displayed, we can hide it using `forceHidden: true` setting:

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

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart
    })
  \]
});


## Configuring

### Indicator list

You can use Indicator control's `indicators` setting to control which indicators and in what order they appear:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      indicators: \["Bollinger Bands", "Moving Average", "ZigZag"\]
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.IndicatorControl.new(root, {
      stockChart: stockChart,
      indicators: \["Bollinger Bands", "Moving Average", "ZigZag"\]
    })
  \]
});

### Custom indicators

Please refer to "[Creating custom indicators for a Stock Chart](https://www.amcharts.com/docs/v5/tutorials/creating-custom-indicators-for-a-stock-chart/)" tutorial for the information.

### Settings modal

By default, an indicator settings modal would open automatically when indicator is added via Indicator control.

We can disable this behavior using indicator setting `autoOpenSettings` in a [custom theme](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/).

We can either target particular indicators:

class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Aroon").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes(\[
  am5themes\_Animated.new(root),
  MyTheme.new(root)
\]);

class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Aroon").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes(\[
  am5themes\_Animated.new(root),
  MyTheme.new(root)
\]);

Or all of them by targeting `"Indicator"`:

class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Indicator").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes(\[
  am5themes\_Animated.new(root),
  MyTheme.new(root)
\]);

class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Indicator").setAll({
      autoOpenSettings: false
    });
  }
}

root.setThemes(\[
  am5themes\_Animated.new(root),
  MyTheme.new(root)
\]);
