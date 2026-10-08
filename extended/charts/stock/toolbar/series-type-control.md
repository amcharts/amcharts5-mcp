---
title: "Series type control"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/"
scraped: "2026-10-08"
---

Series type control allows selecting from a pre-defined list of most common series types, used in stock charts. It can be added to [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/), and relies on a user-defined event to do actual re-creation of the main series of the chart.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

// Add series type control
let seriesTypeControl = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    seriesTypeControl
  \]
});

// Add series type control
var seriesTypeControl = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    seriesTypeControl
  \]
});

This will add a control, but it won't be useful because it does not do anything beyond allowing to select from the list. We will need to add an event that would actually handle the type switch.

## Event

To catch the moment user chooses something from the list, we'll use control's `selected` event:

let seriesTypeControl = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(ev.item.id);
});

function setSeriesType(seriesType) {
  // ...
}

var seriesTypeControl = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(ev.item.id);
});

function setSeriesType(seriesType) {
  // ...
}

In the above code, whenever new type is selected, our custom function `setSeriesType()` is invoked, with a series type passed in as a parameter.

At this point our custom code should:

-   Remove current main series.
-   Create new main series of the new type.
-   Set settings and data.
-   Add new series to legend, if needed.

The following code will do all that. It's also designed to transfer some of the settings from the old series, to make the code less cluttery.

let seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(ev.item.id);
});

function getNewSettings(series) {
  let newSettings = \[\];
  am5.array.each(\["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "stroke", "fill"\], function(setting) {
    newSettings\[setting\] = series.get(setting);
  });
  return newSettings;
}

function setSeriesType(seriesType) {
  // Get current series and its settings
  let currentSeries = stockChart.get("stockSeries");
  let newSettings = getNewSettings(currentSeries);
  
  // Remove previous series
  let data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  let series;
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
    let cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", \[series\]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}

var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(ev.item.id);
});

function getNewSettings(series) {
  var newSettings = \[\];
  am5.array.each(\["name", "valueYField", "highValueYField", "lowValueYField", "openValueYField", "calculateAggregates", "valueXField", "xAxis", "yAxis", "legendValueText", "stroke", "fill"\], function(setting) {
    newSettings\[setting\] = series.get(setting);
  });
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
      cursor.set("snapToSeries", \[series\]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}

## Example


