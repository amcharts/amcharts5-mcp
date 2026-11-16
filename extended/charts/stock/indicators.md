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

Example: [Stock chart with indicator control](https://docs.amcharts.com/embeds/v5/stock-chart-with-indicator-control/). Its code: get_example(path: "examples/docs-demos/stock-chart-with-indicator-control").

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
