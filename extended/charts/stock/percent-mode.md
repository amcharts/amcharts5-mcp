---
title: "Percent scale"
source: "https://www.amcharts.com/docs/v5/charts/stock/percent-mode/"
scraped: "2026-03-15"
---

Percent scale in a [Stock chart](https://www.amcharts.com/docs/v5/charts/stock/) allows applying special setting values to chart series and axes when there are more than one series displayed, or when turned on in API or via stock [toolbar](https://www.amcharts.com/docs/v5/charts/stock-chart/toolbar/).

## Intended use

While percent scale can override any series or value axis settings, the primary use of it in stock charts is to switch chart from absolute values to percentual change when there are more than one indices being plotted.

Since values can differ fundamentally, it might be hard to compare those on an absolute value scale.

## Prerequisites

### Main series

Percent scale will work only if the chart has its "main" series set. That is its `stockSeries` setting is set.

stockChart.set("stockSeries", valueSeries);

stockChart.set("stockSeries", valueSeries);

Stock chart needs to know which series is the "main" series, so that there's a known target other series are compared against.

MORE INFORead more about it in "Stock chart: [Setting main series](https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series)".

### Calculation of aggregates

Main series, as well as all the other series that will be used in percent scale, need their `calculateAggregates` set to `true`.

This is needed, because percent scale uses derivative change values in series.

## Configuring

To configure what happens when percent scale is active, stock chart provides two settings: `percentScaleSeriesSettings` and `percentScaleValueAxisSettings`.

There's also a third setting: `autoSetPercentScale`, which indicates whether chart should switch to percent scale when compared series is added.

Both are objects that can hold key/value pairs from `XYSeries` and `ValueAxis`, respectively.

They also come with defaults:

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

You can override it the way you need to:

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

In the above example, when percent scale kicks in, the "main series" as well as all the other series that are attached to the same value axis, would get new values for their `valueYShow`, `openValueYShow`, `highValueYShow`, and `lowValueYShow` settings.

This will cause series to be plotted not from absolute value, but from their percent change.

Additionally, a new `numberFormat` will be applied to related value axis.

## Enabling

### Automatically

If `autoSetPercentScale` is set to `true` (default setting), the stock chart will go into percent scale automatically when new series is added via chart's `addComparingSeries()` method.

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

Pushing new series into panel's (chart's) `series` list will not trigger percent scale.

### Via API

Percent scale can also be toggled on and off using stock chart's `setPercentScale()` method.

It accepts boolean values. It can also be called without any parameters at all.

Parameter

Comment

`true`

Percent scale is on

`false`

Percent scale is off

*no value*

Will turn Percent scale on if there are any compared series added.

strockChart.setPercentScale(true); // turn percent scale on

strockChart.setPercentScale(true); // turn percent scale on

### Via toolbar

If [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock-chart/toolbar/) is enabled and contains `SettingsControl`, switching to "Change percent" Y-axis scale would trigger percent scale, regardless how many series there are currently on the chart.

## Example


