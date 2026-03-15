---
title: "Indicators"
source: "https://www.amcharts.com/docs/v5/charts/stock/indicators/"
scraped: "2026-03-15"
---

Stock chart comes with a selection of automatic indicators that can be added to the chart via toolbar or API.

## Adding via toolbar

To enable adding of indicators via UI, we need to add [indicator control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/indicator-control/) to our stock toolbar:

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


## Adding via API

### Creating indicator

Indicators can be added by instantiating an appropriate class, then pushing it into chart's `indicators` list.

Each indicator will need its `stockChart` (target stock chart) and `stockSeries` (value series) set, at the very least.

Some indicators, such as `Volume`, will need `volumeSeries` set as well, as they rely on both value and volume data.

stockChart.indicators.push(am5stock.BollingerBands.new(root, {
  stockChart: stockChart,
  stockSeries: valueSeries,
  legend: valueLegend,
  type: "simple"
}));

stockChart.indicators.push(am5stock.BollingerBands.new(root, {
  stockChart: stockChart,
  stockSeries: valueSeries,
  legend: valueLegend,
  type: "simple"
}));

### Configuring

Pardon the mess. We're still working on this section.

### Available indicators

Refer to the links next to each indicator for settings reference.

Indicator

Needs `stockSeries`

Needs `volumeSeries`

`AccumulationDistribution`

**Yes**

Optional

[Settings](https://www.amcharts.com/docs/v5/reference/accumulationdistribution/#Settings)

`AccumulativeSwingIndex`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/accumulativeswingindex/#Settings)

`Aroon`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/aroon/#Settings)

`AwesomeOscillator`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/awesomeoscillator/#Settings)

`BollingerBands`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/bollingerbands/#Settings)

`ChaikinMoneyFlow`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/chaikinmoneyflow/#Settings)

`ChaikinOscillator`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/chaikinoscillator/#Settings)

`CommodityChannelIndex`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/commoditychannelindex/#Settings)

`DisparityIndex`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/disparityindex/#Settings)

`MACD`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/macd/#Settings)

`MedianPrice`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/medianprice/#Settings)

`MovingAverage`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/movingaverage/#Settings)

`MovingAverageCross`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/movingaveragecross/#Settings)

`MovingAverageDeviation`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/movingaveragedeviation/#Settings)

`MovingAverageEnvelope`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/movingaverageenvelope/#Settings)

`OnBalanceVolume`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/onbalancevolume/#Settings)

`PVT` (Price Volume Trend)

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/pvt/#Settings)

`RelativeStrengthIndex`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/relativestrengthindex/#Settings)

`StandardDeviation`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/standarddeviation/#Settings)

`StochasticOscillator`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/stochasticoscillator/#Settings)

`Trix`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/trix/#Settings)

`TypicalPrice`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/typicalprice/#Settings)

`Volume`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/volume/#Settings)

`VolumeProfile`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/volumeprofile/#Settings)

`VWAP`

**Yes**

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/vwap/#Settings)

`WilliamsR`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/williamsr/#Settings)

`ZigZag`

**Yes**

[Settings](https://www.amcharts.com/docs/v5/reference/zigzag/#Settings)

## Creating custom indicators

Refer to "[Creating custom indicators for a Stock Chart](https://www.amcharts.com/docs/v5/tutorials/creating-custom-indicators-for-a-stock-chart/)" tutorial.

## Related tutorials

-   [Stock Chart with custom indicator add button](https://www.amcharts.com/docs/v5/tutorials/stock-chart-with-custom-indicator-add-button/)
