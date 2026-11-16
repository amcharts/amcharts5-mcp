---
title: "Serializing indicators and annotations"
source: "https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/"
scraped: "2026-11-16"
---

User-added drawings (annotations) and indicators, can be serialized into simple JavaScript objects or JSON strings. That information can be saved and later restored using built-in functions. This tutorial explains how to use the API to do just that.

## Requirements

The serialization / parsing of annotation data and added indicators is a functionality built-in into the [Drawing control](https://docs.amcharts.com/v5/charts/stock/toolbar/drawing-control/) and [Indicator control](https://docs.amcharts.com/v5/charts/stock/toolbar/indicator-control/) respectively.

We will need those to be present and initialized in order to use the functionality.

TypeScript:

```ts
const indicatorControl = am5stock.IndicatorControl.new(root, {
  stockChart: stockChart,
  legend: valueLegend
});

const drawingControl = am5stock.DrawingControl.new(root, {
  stockChart: stockChart
});

const toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols")!,
  stockChart: stockChart,
  controls: [
    indicatorControl,
    drawingControl
  ]
});
```

JavaScript:

```js
var indicatorControl = am5stock.IndicatorControl.new(root, {
  stockChart: stockChart,
  legend: valueLegend
});

var drawingControl = am5stock.DrawingControl.new(root, {
  stockChart: stockChart
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    indicatorControl,
    drawingControl
  ]
});
```

> **More info:** For more information about managing toolbars, refer to the "[Stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/)" tutorial.

## Serializing

### Methods

To serialize current drawings, we can use `serializeDrawings()` method of the Drawing control.

Similarly, to serialize indicators, we can use `serializeIndicators()` method of the Indicator control.

TypeScript:

```ts
const drawings = drawingControl.serializeDrawings("string", "  ");
const indicators = indicatorControl.serializeIndicators("string", "  ");
```

JavaScript:

```js
var drawings = drawingControl.serializeDrawings("string", "  ");
var indicators = indicatorControl.serializeIndicators("string", "  ");
```

Both functions will return an array of serialized objects, representing drawings and indicators.

In case we use `"string"` as an output format, the array (and all its contents) will be stringified into a JSON format.

### String vs. object

A second parameter to both serialization functions can be either `"string"` or `"object"` (default).

`"string"` will return a fully formatted JSON text, which can be stored in a database, saved in a file, or stored anywhere else, that text can be stored.

When `"string"` is used, the second parameter will be used to as a prefix for indenting JSON lines.

If nothing is specified, resulting JSON will be a single unformatted line.

`"object"` will return a simple JavaScript object, containing just string, number, and boolean values.

```json title="Example_output"
{
  "__stockSeries": true,
  "__volumeSeries": true,
  "__indicator": {
    "type": "MACD",
    "settings": {
      "fastPeriod": 16,
      "slowPeriod": 26,
      "signalPeriod": 9
    }
  }
}
```

## Restoring

Restoring drawings can be done by passing in serialized data (either in as an array of simple objects, or as a JSON string) to `unserializeDrawings()` method of the Drawing control, or `userializeIndicators()` of the Indicator control.

TypeScript:

```ts
drawingControl.unserializeDrawings(drawings);
indicatorControl.unserializeIndicators(indicators);
```

JavaScript:

```js
drawingControl.unserializeDrawings(drawings);
indicatorControl.unserializeIndicators(indicators);
```

The methods will recognize if the data was passed as a simple array of objects or a JSON string automatically, so there's no parameter to indicator format.

## Events

Stock chart provides two events which can be used to dynamically monitor to any changes in drawings and/or indicators: `drawingsupdated` and `indicatorsupdated`.

They can be used to serialize and update current chart state in storage.

TypeScript:

```ts
stockChart.events.on("drawingsupdated", function(ev) {
  // Serialize drawings and store them
  // ...
});

stockChart.events.on("indicatorsupdated", function(ev) {
  // Serialize indicators and store them
  // ...
});
```

JavaScript:

```js
stockChart.events.on("drawingsupdated", function(ev) {
  // Serialize drawings and store them
  // ...
});

stockChart.events.on("indicatorsupdated", function(ev) {
  // Serialize indicators and store them
  // ...
});
```

Please note, when drawing freestyle annotations (e.g. doodle), `drawingsupdated` event will be invoked multiple times.

In such cases, debouncing serialization/storage code is a good idea:

TypeScript:

```ts
let drawingDebouncer;
stockChart.events.on("drawingsupdated", function(ev) {
  if (drawingDebouncer) {
    clearTimeout(drawingDebouncer);
  }
  drawingDebouncer = setTimeout(function() {
    // Serialize drawings and store them,
    // but only if there was 2 seconds of inactivity
    // ...
  }, 2000);
});

let indicatorDebouncer;
stockChart.events.on("indicatorsupdated", function(ev) {
  if (indicatorDebouncer) {
    clearTimeout(indicatorDebouncer);
  }
  indicatorDebouncer= setTimeout(function() {
    // Serialize indicatorsand store them,
    // but only if there was 2 seconds of inactivity
    // ...
  }, 2000);
});
```

JavaScript:

```js
var drawingDebouncer;
stockChart.events.on("drawingsupdated", function(ev) {
  if (drawingDebouncer) {
    clearTimeout(drawingDebouncer);
  }
  drawingDebouncer = setTimeout(function() {
    // Serialize drawings and store them,
    // but only if there was 2 seconds of inactivity
    // ...
  }, 2000);
});

var indicatorDebouncer;
stockChart.events.on("indicatorsupdated", function(ev) {
  if (indicatorDebouncer) {
    clearTimeout(indicatorDebouncer);
  }
  indicatorDebouncer= setTimeout(function() {
    // Serialize indicatorsand store them,
    // but only if there was 2 seconds of inactivity
    // ...
  }, 2000);
});
```

## Example

Example: [Stock Chart with serialized drawings and indicators](https://docs.amcharts.com/embeds/v5/stock-chart-with-serialized-drawings-and-indicators/)

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
  padding: 5px 5px 0 16px;
  width: 100%;
}

#chartdiv {
  width: 100%;
  height: 600px;
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
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create a stock chart
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

// Set global number format
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/panels/#adding-panels
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX",
    panX: true,
    panY: true
  })
);

// Create value axis
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    }),

    extraMin: 0.1, // adds some space for for main series
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

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Add series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "MSFT",
    clustered: false,
    valueXField: "Date",
    valueYField: "Close",
    highValueYField: "High",
    lowValueYField: "Low",
    openValueYField: "Open",
    calculateAggregates: true,
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText:
      "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
    legendRangeValueText: ""
  })
);

// Set main value series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

// Create volume axis
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});

volumeAxisRenderer.labels.template.set("forceHidden", true);
volumeAxisRenderer.grid.template.set("forceHidden", true);

var volumeValueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    numberFormat: "#.#a",
    height: am5.percent(20),
    y: am5.percent(100),
    centerY: am5.percent(100),
    renderer: volumeAxisRenderer
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var volumeSeries = mainPanel.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Volume",
    clustered: false,
    valueXField: "Date",
    valueYField: "Volume",
    xAxis: dateAxis,
    yAxis: volumeValueAxis,
    legendValueText: "[bold]{valueY.formatNumber('#,###.0a')}[/]"
  })
);

volumeSeries.columns.template.setAll({
  strokeOpacity: 0,
  fillOpacity: 0.5
});

// color columns by stock rules
volumeSeries.columns.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return stockChart.getVolumeColor(dataItem);
  }
  return fill;
});

// Set main series
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/#setting-main-series
stockChart.set("volumeSeries", volumeSeries);
valueLegend.data.setAll([valueSeries, volumeSeries]);

// Add cursor(s)
// -------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------
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

// add Bollinger Bands indicator
// var bollingerBands = stockChart.indicators.push(am5stock.BollingerBands.new(root, {
//   stockChart: stockChart,
//   stockSeries: valueSeries,
//   legend: valueLegend
// }));

// Stock toolbar
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/toolbar/
var indicatorControl = am5stock.IndicatorControl.new(root, {
  stockChart: stockChart,
  legend: valueLegend
});

var drawingControl = am5stock.DrawingControl.new(root, {
  stockChart: stockChart
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    indicatorControl,
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    }),

    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    }),

    drawingControl,
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),

    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  ]
});

// data
var data = [
  { Date: 1617192000000, Open: 515.67, High: 528.13, Low: 515.44, Close: 521.66, Volume: 3503100 },
  { Date: 1617278400000, Open: 529.93, High: 540.5, Low: 527.03, Close: 539.42, Volume: 3938600 },
  { Date: 1617624000000, Open: 540.01, High: 542.85, Low: 529.23, Close: 540.67, Volume: 3355900 },
  { Date: 1617710400000, Open: 544.81, High: 554.17, Low: 543.3, Close: 544.53, Volume: 3474200 },
  { Date: 1617796800000, Open: 543.5, High: 549.64, Low: 541.45, Close: 546.99, Volume: 2151300 },
  { Date: 1617883200000, Open: 551.13, High: 556.9, Low: 547.57, Close: 554.58, Volume: 4309800 },
  { Date: 1617969600000, Open: 552.69, High: 556.9, Low: 547.11, Close: 555.31, Volume: 2894000 },
  { Date: 1618228800000, Open: 551.05, High: 557.98, Low: 549.58, Close: 552.78, Volume: 2944100 },
  { Date: 1618315200000, Open: 557, High: 559.75, Low: 550.3, Close: 553.73, Volume: 2720300 },
  { Date: 1618401600000, Open: 554.87, High: 554.87, Low: 538.53, Close: 540.02, Volume: 3740300 },
  { Date: 1618488000000, Open: 544.17, High: 553.49, Low: 542.66, Close: 549.22, Volume: 3139100 },
  { Date: 1618574400000, Open: 550.54, High: 551.98, Low: 539.51, Close: 546.54, Volume: 3209100 },
  { Date: 1618833600000, Open: 546.9, High: 556.44, Low: 545.53, Close: 554.44, Volume: 4288700 },
  { Date: 1618920000000, Open: 554.42, High: 563.56, Low: 546.3, Close: 549.57, Volume: 11257600 },
  { Date: 1619006400000, Open: 508, High: 515.46, Low: 503.6, Close: 508.9, Volume: 22897400 },
  { Date: 1619092800000, Open: 513.82, High: 513.96, Low: 500.55, Close: 508.78, Volume: 9061100 },
  { Date: 1619179200000, Open: 509.01, High: 509.7, Low: 500.7, Close: 505.55, Volume: 7307700 },
  { Date: 1619438400000, Open: 506.76, High: 510.48, Low: 503, Close: 510.3, Volume: 4388800 },
  { Date: 1619524800000, Open: 512.62, High: 512.99, Low: 504.58, Close: 505.55, Volume: 3761300 },
  { Date: 1619611200000, Open: 505.2, High: 508.4, Low: 503.34, Close: 506.52, Volume: 3193000 },
  { Date: 1619697600000, Open: 507.6, High: 509.29, Low: 499, Close: 509, Volume: 5127800 },
  { Date: 1619784000000, Open: 505, High: 514.55, Low: 505, Close: 513.47, Volume: 4413200 },
  { Date: 1620043200000, Open: 512.65, High: 518.95, Low: 505.2, Close: 509.11, Volume: 4091900 },
  { Date: 1620129600000, Open: 510.78, High: 511.63, Low: 496.79, Close: 503.18, Volume: 4349500 },
  { Date: 1620216000000, Open: 504.99, High: 507.78, Low: 494.63, Close: 496.08, Volume: 3129400 },
  { Date: 1620302400000, Open: 495.99, High: 499.55, Low: 491.37, Close: 499.55, Volume: 3783700 },
  { Date: 1620388800000, Open: 504.62, High: 508.55, Low: 501.12, Close: 503.84, Volume: 3132800 },
  { Date: 1620648000000, Open: 502, High: 503.15, Low: 486.11, Close: 486.69, Volume: 5131600 },
  { Date: 1620734400000, Open: 479.75, High: 497.99, Low: 478.63, Close: 495.08, Volume: 4401000 },
  { Date: 1620820800000, Open: 486.83, High: 493.54, Low: 482.7, Close: 484.98, Volume: 4121500 },
  { Date: 1620907200000, Open: 489.13, High: 490.78, Low: 482.71, Close: 486.66, Volume: 2712500 },
  { Date: 1620993600000, Open: 487.86, High: 494.85, Low: 486.59, Close: 493.37, Volume: 2882500 },
  { Date: 1621252800000, Open: 485.59, High: 492.71, Low: 482.81, Close: 488.94, Volume: 2705200 },
  { Date: 1621339200000, Open: 488.4, High: 493.48, Low: 486.19, Close: 486.28, Volume: 2350500 },
  { Date: 1621425600000, Open: 481.63, High: 488.57, Low: 478.54, Close: 487.7, Volume: 3349900 },
  { Date: 1621512000000, Open: 489.55, High: 502.7, Low: 488.98, Close: 501.67, Volume: 3721200 },
  { Date: 1621598400000, Open: 503.12, High: 505.4, Low: 497.26, Close: 497.89, Volume: 3322900 },
  { Date: 1621857600000, Open: 501.05, High: 504.25, Low: 499.51, Close: 502.9, Volume: 2412600 },
  { Date: 1621944000000, Open: 506, High: 506.37, Low: 499.22, Close: 501.34, Volume: 2699500 },
  { Date: 1622030400000, Open: 502.34, High: 504.14, Low: 500.5, Close: 502.36, Volume: 2465300 },
  { Date: 1622116800000, Open: 501.8, High: 505.1, Low: 498.54, Close: 503.86, Volume: 3253800 },
  { Date: 1622203200000, Open: 504.4, High: 511.76, Low: 502.53, Close: 502.81, Volume: 2910300 },
  { Date: 1622548800000, Open: 504.01, High: 505.41, Low: 497.74, Close: 499.08, Volume: 2482600 },
  { Date: 1622635200000, Open: 499.82, High: 503.22, Low: 495.82, Close: 499.24, Volume: 2269000 },
  { Date: 1622721600000, Open: 495.19, High: 496.66, Low: 487.25, Close: 489.43, Volume: 3887400 },
  { Date: 1622808000000, Open: 492, High: 501.86, Low: 490.95, Close: 494.74, Volume: 3160500 },
  { Date: 1623067200000, Open: 492.92, High: 496.7, Low: 490.55, Close: 494.66, Volume: 2791900 },
  { Date: 1623153600000, Open: 497, High: 498.82, Low: 489.37, Close: 492.39, Volume: 2374000 },
  { Date: 1623240000000, Open: 494.5, High: 496.09, Low: 484.65, Close: 485.81, Volume: 3055000 },
  { Date: 1623326400000, Open: 487.17, High: 490.21, Low: 482.14, Close: 487.27, Volume: 4382900 },
  { Date: 1623412800000, Open: 490, High: 491.41, Low: 487.78, Close: 488.77, Volume: 3124000 },
  { Date: 1623672000000, Open: 489.68, High: 503.5, Low: 486.91, Close: 499.89, Volume: 4400200 },
  { Date: 1623758400000, Open: 501.23, High: 501.23, Low: 490.4, Close: 491.9, Volume: 3104100 },
  { Date: 1623844800000, Open: 495, High: 496.46, Low: 486.28, Close: 492.41, Volume: 3533200 },
  { Date: 1623931200000, Open: 490.25, High: 501.8, Low: 490.15, Close: 498.34, Volume: 3198300 },
  { Date: 1624017600000, Open: 496.4, High: 504.49, Low: 495.24, Close: 500.77, Volume: 5197600 },
  { Date: 1624276800000, Open: 501.64, High: 502.05, Low: 492.28, Close: 497, Volume: 5277300 },
  { Date: 1624363200000, Open: 498.54, High: 513.55, Low: 495.8, Close: 508.82, Volume: 5809300 },
  { Date: 1624449600000, Open: 508.48, High: 516.63, Low: 508.2, Close: 512.74, Volume: 3944800 },
  { Date: 1624536000000, Open: 517.96, High: 520.96, Low: 514.4, Close: 518.06, Volume: 3361200 },
  { Date: 1624622400000, Open: 528.84, High: 533.06, Low: 525, Close: 527.07, Volume: 5299100 },
  { Date: 1624881600000, Open: 528.12, High: 533.94, Low: 524.56, Close: 533.03, Volume: 2820200 },
  { Date: 1624968000000, Open: 533.55, High: 536.13, Low: 528.57, Close: 533.5, Volume: 2314600 },
  { Date: 1625054400000, Open: 534.06, High: 534.38, Low: 526.82, Close: 528.21, Volume: 2773400 },
  { Date: 1625140800000, Open: 525.72, High: 537.04, Low: 525.72, Close: 533.54, Volume: 2805400 },
  { Date: 1625227200000, Open: 535.5, High: 538.54, Low: 529.39, Close: 533.98, Volume: 1975500 },
  { Date: 1625572800000, Open: 533, High: 542.86, Low: 533, Close: 541.64, Volume: 2775100 },
  { Date: 1625659200000, Open: 544.24, High: 544.64, Low: 531.66, Close: 535.96, Volume: 2722500 },
  { Date: 1625745600000, Open: 530.93, High: 535.5, Low: 529.09, Close: 530.76, Volume: 3269000 },
  { Date: 1625832000000, Open: 531, High: 538.26, Low: 528.58, Close: 535.98, Volume: 2777200 },
  { Date: 1626091200000, Open: 540.3, High: 540.65, Low: 532.92, Close: 537.31, Volume: 1780700 },
  { Date: 1626177600000, Open: 535.76, High: 545.33, Low: 535.76, Close: 540.68, Volume: 2751600 },
  { Date: 1626264000000, Open: 541.01, High: 554.1, Low: 541.01, Close: 547.95, Volume: 4659500 },
  { Date: 1626350400000, Open: 553.97, High: 557.54, Low: 538.2, Close: 542.95, Volume: 5713900 },
  { Date: 1626436800000, Open: 541.81, High: 544.06, Low: 527.05, Close: 530.31, Volume: 3442100 },
  { Date: 1626696000000, Open: 526.05, High: 534.91, Low: 522.24, Close: 532.28, Volume: 3885800 },
  { Date: 1626782400000, Open: 526.07, High: 536.64, Low: 520.3, Close: 531.05, Volume: 6930400 },
  { Date: 1626868800000, Open: 526.13, High: 530.99, Low: 505.61, Close: 513.63, Volume: 11906800 },
  { Date: 1626955200000, Open: 510.21, High: 513.68, Low: 507, Close: 511.77, Volume: 4328100 },
  { Date: 1627041600000, Open: 512.16, High: 517.41, Low: 504.66, Close: 515.41, Volume: 3820500 },
  { Date: 1627300800000, Open: 514.38, High: 521.13, Low: 509.01, Close: 516.49, Volume: 2254500 },
  { Date: 1627387200000, Open: 518.08, High: 521.95, Low: 512.05, Close: 518.91, Volume: 2759000 },
  { Date: 1627473600000, Open: 521.82, High: 524.47, Low: 516.98, Close: 519.3, Volume: 2390500 },
  { Date: 1627560000000, Open: 519.96, High: 520.78, Low: 513.79, Close: 514.25, Volume: 1736000 },
  { Date: 1627646400000, Open: 512.69, High: 519.79, Low: 510.96, Close: 517.57, Volume: 2537100 },
  { Date: 1627905600000, Open: 519, High: 519.85, Low: 510.51, Close: 515.15, Volume: 2096600 },
  { Date: 1627992000000, Open: 514.39, High: 515.63, Low: 505.37, Close: 510.82, Volume: 2579400 },
  { Date: 1628078400000, Open: 513, High: 517.98, Low: 510.37, Close: 517.35, Volume: 2039400 },
  { Date: 1628164800000, Open: 517.13, High: 525.41, Low: 514.02, Close: 524.89, Volume: 2556700 },
  { Date: 1628251200000, Open: 524, High: 526.84, Low: 519.39, Close: 520.55, Volume: 1919800 },
  { Date: 1628510400000, Open: 521.15, High: 522.67, Low: 517.99, Close: 519.97, Volume: 1367800 },
  { Date: 1628596800000, Open: 520, High: 520.79, Low: 512.97, Close: 515.84, Volume: 1960500 },
  { Date: 1628683200000, Open: 517, High: 519.57, Low: 509.77, Close: 512.4, Volume: 1673900 },
  { Date: 1628769600000, Open: 511.86, High: 513, Low: 507.2, Close: 510.72, Volume: 1685700 },
  { Date: 1628856000000, Open: 512.64, High: 521.44, Low: 511.51, Close: 515.92, Volume: 2177700 },
  { Date: 1629115200000, Open: 515.24, High: 523.38, Low: 512.3, Close: 517.92, Volume: 2032800 },
  { Date: 1629201600000, Open: 515.47, High: 520.79, Low: 514.2, Close: 518.91, Volume: 2309800 },
  { Date: 1629288000000, Open: 520, High: 526.38, Low: 518.65, Close: 521.87, Volume: 2582000 },
  { Date: 1629374400000, Open: 522.74, High: 548.39, Low: 521.87, Close: 543.71, Volume: 7497300 },
  { Date: 1629460800000, Open: 545.09, High: 551.39, Low: 539.1, Close: 546.88, Volume: 3776400 },
  { Date: 1629720000000, Open: 545.98, High: 555.55, Low: 543.74, Close: 553.33, Volume: 2602000 },
  { Date: 1629806400000, Open: 551.48, High: 555.31, Low: 549.27, Close: 553.41, Volume: 2109500 },
  { Date: 1629892800000, Open: 550.16, High: 552.84, Low: 545.45, Close: 547.58, Volume: 2065600 },
  { Date: 1629979200000, Open: 546.16, High: 552.6, Low: 545.9, Close: 550.12, Volume: 1595500 },
  { Date: 1630065600000, Open: 551.6, High: 564.17, Low: 549.25, Close: 558.92, Volume: 3252600 },
  { Date: 1630324800000, Open: 557.25, High: 567.16, Low: 556.45, Close: 566.18, Volume: 2434800 },
  { Date: 1630411200000, Open: 566.12, High: 569.48, Low: 561.61, Close: 569.19, Volume: 2431900 },
  { Date: 1630497600000, Open: 569, High: 591, Low: 569, Close: 582.07, Volume: 5626200 },
  { Date: 1630584000000, Open: 583.68, High: 598.76, Low: 583.68, Close: 588.55, Volume: 6179900 },
  { Date: 1630670400000, Open: 585.8, High: 591.88, Low: 583.14, Close: 590.53, Volume: 2681200 },
  { Date: 1631016000000, Open: 594.69, High: 613.85, Low: 593.99, Close: 606.71, Volume: 5821400 },
  { Date: 1631102400000, Open: 603.84, High: 615.6, Low: 595.71, Close: 606.05, Volume: 5424500 },
  { Date: 1631188800000, Open: 606.47, High: 609.44, Low: 596.55, Close: 597.54, Volume: 2954200 },
  { Date: 1631275200000, Open: 598.16, High: 609.45, Low: 593.67, Close: 598.72, Volume: 3950800 },
  { Date: 1631534400000, Open: 598.57, High: 598.57, Low: 582.78, Close: 589.29, Volume: 3062900 },
  { Date: 1631620800000, Open: 584.89, High: 587.28, Low: 575.56, Close: 577.76, Volume: 3457000 },
  { Date: 1631707200000, Open: 578.17, High: 584.62, Low: 575.37, Close: 582.87, Volume: 2755600 },
  { Date: 1631793600000, Open: 584.3, High: 587.48, Low: 577.72, Close: 586.5, Volume: 1832000 },
  { Date: 1631880000000, Open: 587.85, High: 590.28, Low: 580.85, Close: 589.35, Volume: 4145100 },
  { Date: 1632139200000, Open: 586.79, High: 591.53, Low: 568.08, Close: 575.43, Volume: 3732200 },
  { Date: 1632225600000, Open: 578.31, High: 581.88, Low: 569.37, Close: 573.14, Volume: 2250900 },
  { Date: 1632312000000, Open: 579.69, High: 595.65, Low: 579.69, Close: 590.65, Volume: 4021800 },
  { Date: 1632398400000, Open: 590.79, High: 599.32, Low: 589.13, Close: 593.26, Volume: 2526200 },
  { Date: 1632484800000, Open: 592.5, High: 592.98, Low: 583.64, Close: 592.39, Volume: 2126200 },
  { Date: 1632744000000, Open: 587.95, High: 593.58, Low: 576.93, Close: 592.64, Volume: 2504700 },
  { Date: 1632830400000, Open: 589, High: 599.54, Low: 580.16, Close: 583.85, Volume: 4431100 },
  { Date: 1632916800000, Open: 589.01, High: 609.88, Low: 588.01, Close: 599.06, Volume: 6221000 },
  { Date: 1633003200000, Open: 608.05, High: 619, Low: 608.05, Close: 610.34, Volume: 6612600 },
  { Date: 1633089600000, Open: 604.24, High: 614.99, Low: 597.51, Close: 613.15, Volume: 4090800 },
  { Date: 1633348800000, Open: 613.39, High: 626.13, Low: 594.68, Close: 603.35, Volume: 4995900 },
  { Date: 1633435200000, Open: 606.94, High: 640.39, Low: 606.89, Close: 634.81, Volume: 9534300 },
  { Date: 1633521600000, Open: 628.18, High: 639.87, Low: 626.36, Close: 639.1, Volume: 4580400 },
  { Date: 1633608000000, Open: 642.23, High: 646.84, Low: 630.45, Close: 631.85, Volume: 3556900 },
  { Date: 1633694400000, Open: 634.17, High: 643.8, Low: 630.86, Close: 632.66, Volume: 3272100 },
  { Date: 1633953600000, Open: 633.2, High: 639.42, Low: 626.78, Close: 627.04, Volume: 2862500 },
  { Date: 1634040000000, Open: 633.02, High: 637.66, Low: 621.99, Close: 624.94, Volume: 3227300 },
  { Date: 1634126400000, Open: 632.18, High: 632.18, Low: 622.1, Close: 629.76, Volume: 2420300 },
  { Date: 1634212800000, Open: 632.23, High: 636.88, Low: 626.79, Close: 633.8, Volume: 2671700 },
  { Date: 1634299200000, Open: 638, High: 639.42, Low: 625.16, Close: 628.29, Volume: 4116900 },
  { Date: 1634558400000, Open: 632.1, High: 638.41, Low: 620.59, Close: 637.97, Volume: 4669100 },
  { Date: 1634644800000, Open: 636.97, High: 641, Low: 632.3, Close: 639, Volume: 7633100 },
  { Date: 1634731200000, Open: 625.57, High: 637.4, Low: 617.15, Close: 625.14, Volume: 10622000 },
  { Date: 1634817600000, Open: 628.89, High: 654.01, Low: 628.65, Close: 653.16, Volume: 8437100 },
  { Date: 1634904000000, Open: 651.81, High: 665.46, Low: 651.81, Close: 664.78, Volume: 6186000 },
  { Date: 1635163200000, Open: 663.74, High: 675.88, Low: 657.07, Close: 671.66, Volume: 3833500 },
  { Date: 1635249600000, Open: 673.76, High: 676.49, Low: 662.77, Close: 668.52, Volume: 2904800 },
  { Date: 1635336000000, Open: 669, High: 671.41, Low: 661.85, Close: 662.92, Volume: 2276900 },
  { Date: 1635422400000, Open: 670.95, High: 676.8, Low: 668.03, Close: 674.05, Volume: 2859400 },
  { Date: 1635508800000, Open: 673.06, High: 690.97, Low: 671.24, Close: 690.31, Volume: 3825300 },
  { Date: 1635768000000, Open: 689.06, High: 689.97, Low: 676.54, Close: 681.17, Volume: 3110900 },
  { Date: 1635854400000, Open: 683.11, High: 687.68, Low: 673.82, Close: 677.72, Volume: 3888600 },
  { Date: 1635940800000, Open: 677.27, High: 689.39, Low: 677.27, Close: 688.29, Volume: 2334900 },
  { Date: 1636027200000, Open: 685.89, High: 685.94, Low: 665.5, Close: 668.4, Volume: 4865000 },
  { Date: 1636113600000, Open: 663.97, High: 665.64, Low: 645.01, Close: 645.72, Volume: 5283500 },
  { Date: 1636372800000, Open: 650.29, High: 656, Low: 643.79, Close: 651.45, Volume: 2887500 },
  { Date: 1636459200000, Open: 653.7, High: 660.5, Low: 650.52, Close: 655.99, Volume: 2415600 },
  { Date: 1636545600000, Open: 653.01, High: 660.33, Low: 642.11, Close: 646.91, Volume: 2405800 },
  { Date: 1636632000000, Open: 650.24, High: 665.82, Low: 649.71, Close: 657.58, Volume: 2868300 },
  { Date: 1636718400000, Open: 660.01, High: 683.34, Low: 653.82, Close: 682.61, Volume: 4198400 },
  { Date: 1636977600000, Open: 681.24, High: 685.26, Low: 671.49, Close: 679.33, Volume: 2872200 },
  { Date: 1637064000000, Open: 678.27, High: 688.36, Low: 676.9, Close: 687.4, Volume: 2077400 },
  { Date: 1637150400000, Open: 690, High: 700.99, Low: 686.09, Close: 691.69, Volume: 2732800 },
  { Date: 1637236800000, Open: 691.61, High: 691.74, Low: 679.74, Close: 682.02, Volume: 2012900 },
  { Date: 1637323200000, Open: 692.35, High: 694.16, Low: 675, Close: 678.8, Volume: 2613700 },
  { Date: 1637582400000, Open: 676.02, High: 679.48, Low: 656.47, Close: 659.2, Volume: 2764400 },
  { Date: 1637668800000, Open: 658.18, High: 666.43, Low: 646.05, Close: 654.06, Volume: 2320200 },
  { Date: 1637755200000, Open: 658.01, High: 661.44, Low: 651.1, Close: 658.29, Volume: 1867300 },
  { Date: 1637928000000, Open: 675, High: 676.41, Low: 660.67, Close: 665.64, Volume: 2872500 },
  { Date: 1638187200000, Open: 663.2, High: 667.99, Low: 658.29, Close: 663.84, Volume: 2529400 },
  { Date: 1638273600000, Open: 668.2, High: 675.38, Low: 640.01, Close: 641.9, Volume: 5608900 },
  { Date: 1638360000000, Open: 649.48, High: 654.52, Low: 617.07, Close: 617.77, Volume: 3882800 },
  { Date: 1638446400000, Open: 617.1, High: 625.36, Low: 612.88, Close: 616.47, Volume: 3331100 },
  { Date: 1638532800000, Open: 622.75, High: 625.5, Low: 594, Close: 602.13, Volume: 4829300 },
  { Date: 1638792000000, Open: 606.01, High: 617.29, Low: 601, Close: 612.69, Volume: 3075700 },
  { Date: 1638878400000, Open: 619.83, High: 628.89, Low: 611.4, Close: 625.58, Volume: 3125200 },
  { Date: 1638964800000, Open: 630, High: 632.46, Low: 623.2, Close: 628.08, Volume: 2220300 },
  { Date: 1639051200000, Open: 627.58, High: 630.24, Low: 610.44, Close: 611, Volume: 2376300 },
  { Date: 1639137600000, Open: 616.78, High: 617.74, Low: 605.88, Close: 611.66, Volume: 2748800 },
  { Date: 1639396800000, Open: 612, High: 612.64, Low: 599.52, Close: 604.56, Volume: 2517900 },
  { Date: 1639483200000, Open: 598.71, High: 602.29, Low: 588.13, Close: 597.99, Volume: 2984500 },
  { Date: 1639569600000, Open: 598.18, High: 605.69, Low: 584.51, Close: 605.04, Volume: 2866200 },
  { Date: 1639656000000, Open: 597.09, High: 602.83, Low: 588, Close: 591.06, Volume: 3143200 },
  { Date: 1639742400000, Open: 591.61, High: 593.25, Low: 581.74, Close: 586.73, Volume: 4386900 },
  { Date: 1640001600000, Open: 586.43, High: 602.88, Low: 584.26, Close: 593.74, Volume: 3358400 },
  { Date: 1640088000000, Open: 597.54, High: 607.82, Low: 593.86, Close: 604.92, Volume: 2319400 },
  { Date: 1640174400000, Open: 603.36, High: 614.82, Low: 602.63, Close: 614.24, Volume: 2335700 },
  { Date: 1640260800000, Open: 616.4, High: 616.88, Low: 607.57, Close: 614.09, Volume: 1621100 },
  { Date: 1640606400000, Open: 615, High: 615, Low: 609.25, Close: 613.12, Volume: 2061500 },
  { Date: 1640692800000, Open: 614.95, High: 618.41, Low: 609.69, Close: 610.71, Volume: 1882800 },
  { Date: 1640779200000, Open: 610.71, High: 613.98, Low: 604.68, Close: 610.54, Volume: 1287200 },
  { Date: 1640865600000, Open: 612.99, High: 620.61, Low: 611.24, Close: 612.09, Volume: 1625100 },
  { Date: 1640952000000, Open: 610.01, High: 614.08, Low: 602.05, Close: 602.44, Volume: 1995900 },
  { Date: 1641211200000, Open: 605.61, High: 609.99, Low: 590.56, Close: 597.37, Volume: 3067500 },
  { Date: 1641297600000, Open: 599.91, High: 600.41, Low: 581.6, Close: 591.15, Volume: 4393100 },
  { Date: 1641384000000, Open: 592, High: 592.84, Low: 566.88, Close: 567.52, Volume: 4148700 },
  { Date: 1641470400000, Open: 554.34, High: 563.36, Low: 542.01, Close: 553.29, Volume: 5711800 },
  { Date: 1641556800000, Open: 549.46, High: 553.43, Low: 538.22, Close: 541.06, Volume: 3382900 },
  { Date: 1641816000000, Open: 538.49, High: 543.69, Low: 526.32, Close: 539.85, Volume: 4486100 },
  { Date: 1641902400000, Open: 536.99, High: 543.91, Low: 530.07, Close: 540.84, Volume: 3077800 },
  { Date: 1641988800000, Open: 544.27, High: 544.27, Low: 532.02, Close: 537.22, Volume: 3787400 },
  { Date: 1642075200000, Open: 537.06, High: 540.79, Low: 518.26, Close: 519.2, Volume: 4475100 },
  { Date: 1642161600000, Open: 517.6, High: 538.37, Low: 511.88, Close: 525.69, Volume: 7861100 },
  { Date: 1642507200000, Open: 520.08, High: 521.75, Low: 508.68, Close: 510.8, Volume: 4839100 },
  { Date: 1642593600000, Open: 515, High: 523.21, Low: 510.51, Close: 515.86, Volume: 4353500 },
  { Date: 1642680000000, Open: 517.75, High: 526.64, Low: 506.93, Close: 508.25, Volume: 12659000 },
  { Date: 1642766400000, Open: 400.43, High: 409.15, Low: 379.99, Close: 397.5, Volume: 58904300 },
  { Date: 1643025600000, Open: 383.91, High: 387.26, Low: 351.46, Close: 387.15, Volume: 32346000 },
  { Date: 1643112000000, Open: 379.14, High: 387.71, Low: 365.13, Close: 366.42, Volume: 15145800 },
  { Date: 1643198400000, Open: 378.27, High: 382.66, Low: 356.62, Close: 359.7, Volume: 12684000 },
  { Date: 1643284800000, Open: 382.06, High: 394.8, Low: 378.1, Close: 386.7, Volume: 24324700 },
  { Date: 1643371200000, Open: 386.76, High: 387, Low: 372.08, Close: 384.36, Volume: 11966600 },
  { Date: 1643630400000, Open: 401.97, High: 427.7, Low: 398.2, Close: 427.14, Volume: 20047500 },
  { Date: 1643716800000, Open: 432.96, High: 458.48, Low: 425.54, Close: 457.13, Volume: 22568100 },
  { Date: 1643803200000, Open: 448.25, High: 451.98, Low: 426.48, Close: 429.48, Volume: 14346000 },
  { Date: 1643889600000, Open: 421.44, High: 429.26, Low: 404.28, Close: 405.6, Volume: 9905200 },
  { Date: 1643976000000, Open: 407.31, High: 412.77, Low: 396.64, Close: 410.17, Volume: 7789800 },
  { Date: 1644235200000, Open: 410.17, High: 412.35, Low: 393.55, Close: 402.1, Volume: 8232900 },
  { Date: 1644321600000, Open: 398.18, High: 406.61, Low: 395.83, Close: 403.53, Volume: 6818500 },
  { Date: 1644408000000, Open: 408.65, High: 412.98, Low: 398.79, Close: 412.89, Volume: 7738200 },
  { Date: 1644494400000, Open: 402.1, High: 408, Low: 396.36, Close: 406.27, Volume: 8452900 },
  { Date: 1644580800000, Open: 405.33, High: 411.61, Low: 387.65, Close: 391.31, Volume: 7558900 },
  { Date: 1644840000000, Open: 387.59, High: 409.36, Low: 386.89, Close: 396.57, Volume: 7202200 },
  { Date: 1644926400000, Open: 403.79, High: 409.16, Low: 401.01, Close: 407.46, Volume: 5392300 },
  { Date: 1645012800000, Open: 401.53, High: 401.56, Low: 390.38, Close: 398.08, Volume: 5277700 },
  { Date: 1645099200000, Open: 394.24, High: 399.11, Low: 385.7, Close: 386.67, Volume: 4669200 },
  { Date: 1645185600000, Open: 392.53, High: 402.87, Low: 389.05, Close: 391.29, Volume: 6801700 },
  { Date: 1645531200000, Open: 388.95, High: 392.42, Low: 373.02, Close: 377.38, Volume: 6697500 },
  { Date: 1645617600000, Open: 382.72, High: 386, Low: 366.66, Close: 367.46, Volume: 4614300 },
  { Date: 1645704000000, Open: 355.09, High: 390.73, Low: 354.72, Close: 390.03, Volume: 7068700 },
  { Date: 1645790400000, Open: 386.61, High: 391.29, Low: 375.58, Close: 390.8, Volume: 4841600 },
  { Date: 1646049600000, Open: 387.33, High: 397.75, Low: 382.13, Close: 394.52, Volume: 5030600 },
  { Date: 1646136000000, Open: 391.6, High: 395, Low: 383.71, Close: 386.24, Volume: 3290400 },
  { Date: 1646222400000, Open: 388.93, High: 389.22, Low: 375.21, Close: 380.03, Volume: 5356800 },
  { Date: 1646308800000, Open: 386, High: 386.12, Low: 364.65, Close: 368.07, Volume: 6076800 },
  { Date: 1646395200000, Open: 368, High: 374.82, Low: 357.17, Close: 361.73, Volume: 5325500 },
  { Date: 1646654400000, Open: 360.41, High: 362, Low: 350.2, Close: 350.26, Volume: 5708400 },
  { Date: 1646740800000, Open: 349.8, High: 358.86, Low: 340.67, Close: 341.76, Volume: 6428700 },
  { Date: 1646827200000, Open: 357.69, High: 364.14, Low: 350.51, Close: 358.79, Volume: 6520200 },
  { Date: 1646913600000, Open: 356.2, High: 367.02, Low: 353.3, Close: 356.77, Volume: 4807800 },
  { Date: 1647000000000, Open: 361.19, High: 363.36, Low: 340, Close: 340.32, Volume: 4815500 },
  { Date: 1647259200000, Open: 338.72, High: 341.32, Low: 329.82, Close: 331.01, Volume: 5907800 },
  { Date: 1647345600000, Open: 335.1, High: 345.36, Low: 332.36, Close: 343.75, Volume: 5460600 },
  { Date: 1647432000000, Open: 348.2, High: 359.99, Low: 343.06, Close: 357.53, Volume: 6982500 },
  { Date: 1647518400000, Open: 359.7, High: 373.31, Low: 354.88, Close: 371.4, Volume: 5818300 },
  { Date: 1647604800000, Open: 372, High: 381.8, Low: 368.47, Close: 380.6, Volume: 8309200 },
  { Date: 1647864000000, Open: 378.02, High: 381.82, Low: 368.94, Close: 374.59, Volume: 4866500 },
  { Date: 1647950400000, Open: 371.14, High: 386.66, Low: 366.76, Close: 382.92, Volume: 4242800 },
  { Date: 1648036800000, Open: 379.77, High: 382.46, Low: 374.49, Close: 374.49, Volume: 3729000 },
  { Date: 1648123200000, Open: 379.76, High: 379.76, Low: 368.9, Close: 375.71, Volume: 3888500 },
  { Date: 1648209600000, Open: 377.07, High: 377.64, Low: 366.43, Close: 373.85, Volume: 3574500 },
  { Date: 1648468800000, Open: 375.23, High: 380.28, Low: 366.73, Close: 378.51, Volume: 4323400 },
  { Date: 1648555200000, Open: 384.39, High: 396.5, Low: 380.33, Close: 391.82, Volume: 5880700 },
  { Date: 1648641600000, Open: 389.55, High: 392.7, Low: 378.63, Close: 381.47, Volume: 4023300 }
];

// set data to all series
valueSeries.data.setAll(data);
volumeSeries.data.setAll(data);
sbSeries.data.setAll(data);

// Load serialized annotations and indicators
// -------------------------------------------------------------------------------
// https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/

var drawing = [
  {
    __tool: "Doodle",
    __panelIndex: 0,
    __drawing: [
      {
        stroke: {
          type: "Template",
          settings: {
            stroke: {
              type: "Color",
              value: "#e09c00"
            },

            strokeOpacity: 1,
            strokeDasharray: [2, 2],

            strokeWidth: 2
          }
        },

        index: 1,
        corner: 0,
        __parse: true
      },

      {
        valueY: 613.7,
        valueX: 1626377574659,
        index: 1,
        corner: 0,
        __parse: true
      },

      {
        valueY: 613.7,
        valueX: 1626413803625,
        index: 1,
        corner: 1,
        __parse: true
      },

      {
        valueY: 613.7,
        valueX: 1626413803625,
        index: 1,
        corner: 2,
        __parse: true
      },

      {
        valueY: 614.7,
        valueX: 1626683213832,
        index: 1,
        corner: 3,
        __parse: true
      },

      {
        valueY: 615.2,
        valueX: 1626707366660,
        index: 1,
        corner: 4,
        __parse: true
      },

      {
        valueY: 612,
        valueX: 1626707366660,
        index: 1,
        corner: 5,
        __parse: true
      },

      {
        valueY: 615.8,
        valueX: 1626997198386,
        index: 1,
        corner: 6,
        __parse: true
      },

      {
        valueY: 613,
        valueX: 1626997198386,
        index: 1,
        corner: 7,
        __parse: true
      },

      {
        valueY: 617.8,
        valueX: 1627532288043,
        index: 1,
        corner: 8,
        __parse: true
      },

      {
        valueY: 615.3,
        valueX: 1627532288043,
        index: 1,
        corner: 9,
        __parse: true
      },

      {
        valueY: 620.6,
        valueX: 1627982843631,
        index: 1,
        corner: 10,
        __parse: true
      },

      {
        valueY: 616.5,
        valueX: 1627982843631,
        index: 1,
        corner: 11,
        __parse: true
      },

      {
        valueY: 619.9,
        valueX: 1628248522529,
        index: 1,
        corner: 12,
        __parse: true
      },

      {
        valueY: 618.3,
        valueX: 1628248522529,
        index: 1,
        corner: 13,
        __parse: true
      },

      {
        valueY: 622.6,
        valueX: 1628843993980,
        index: 1,
        corner: 14,
        __parse: true
      },

      {
        valueY: 623.1,
        valueX: 1628868146255,
        index: 1,
        corner: 15,
        __parse: true
      },

      {
        valueY: 620.5,
        valueX: 1628868146255,
        index: 1,
        corner: 16,
        __parse: true
      },

      {
        valueY: 622.5,
        valueX: 1629354930809,
        index: 1,
        corner: 17,
        __parse: true
      },

      {
        valueY: 620.8,
        valueX: 1629354930809,
        index: 1,
        corner: 18,
        __parse: true
      },

      {
        valueY: 619.8,
        valueX: 1630352652193,
        index: 1,
        corner: 19,
        __parse: true
      },

      {
        valueY: 618.8,
        valueX: 1630352652193,
        index: 1,
        corner: 20,
        __parse: true
      },

      {
        valueY: 612.5,
        valueX: 1631167362816,
        index: 1,
        corner: 21,
        __parse: true
      },

      {
        valueY: 612,
        valueX: 1631167362816,
        index: 1,
        corner: 22,
        __parse: true
      },

      {
        valueY: 597.6,
        valueX: 1632201313165,
        index: 1,
        corner: 23,
        __parse: true
      },

      {
        valueY: 597.5,
        valueX: 1632201313165,
        index: 1,
        corner: 24,
        __parse: true
      },

      {
        valueY: 576.3,
        valueX: 1633014158964,
        index: 1,
        corner: 25,
        __parse: true
      },

      {
        valueY: 572.9,
        valueX: 1633062463514,
        index: 1,
        corner: 26,
        __parse: true
      },

      {
        valueY: 564.3,
        valueX: 1633356027102,
        index: 1,
        corner: 27,
        __parse: true
      },

      {
        valueY: 560.4,
        valueX: 1633392256067,
        index: 1,
        corner: 28,
        __parse: true
      },

      {
        valueY: 557.1,
        valueX: 1633440561724,
        index: 1,
        corner: 29,
        __parse: true
      },

      {
        valueY: 557,
        valueX: 1633440561724,
        index: 1,
        corner: 30,
        __parse: true
      },

      {
        valueY: 526.2,
        valueX: 1633670011103,
        index: 1,
        corner: 31,
        __parse: true
      },

      {
        valueY: 526.2,
        valueX: 1633670011103,
        index: 1,
        corner: 32,
        __parse: true
      },

      {
        valueY: 517.1,
        valueX: 1633682087793,
        index: 1,
        corner: 33,
        __parse: true
      },

      {
        valueY: 517.1,
        valueX: 1633682087793,
        index: 1,
        corner: 34,
        __parse: true
      },

      {
        valueY: 507.5,
        valueX: 1633633782137,
        index: 1,
        corner: 35,
        __parse: true
      },

      {
        valueY: 507.5,
        valueX: 1633633782137,
        index: 1,
        corner: 36,
        __parse: true
      },

      {
        valueY: 501.7,
        valueX: 1633573400896,
        index: 1,
        corner: 37,
        __parse: true
      },

      {
        valueY: 501.7,
        valueX: 1633573400896,
        index: 1,
        corner: 38,
        __parse: true
      },

      {
        valueY: 496.4,
        valueX: 1633464713999,
        index: 1,
        corner: 39,
        __parse: true
      },

      {
        valueY: 496.4,
        valueX: 1633464713999,
        index: 1,
        corner: 40,
        __parse: true
      },

      {
        valueY: 489.7,
        valueX: 1633098692480,
        index: 1,
        corner: 41,
        __parse: true
      },

      {
        valueY: 489.7,
        valueX: 1633098692480,
        index: 1,
        corner: 42,
        __parse: true
      },

      {
        valueY: 484.4,
        valueX: 1632929624342,
        index: 1,
        corner: 43,
        __parse: true
      },

      {
        valueY: 483.9,
        valueX: 1632893395376,
        index: 1,
        corner: 44,
        __parse: true
      },

      {
        valueY: 483.9,
        valueX: 1632893395376,
        index: 1,
        corner: 45,
        __parse: true
      },

      {
        valueY: 479.6,
        valueX: 1632712250547,
        index: 1,
        corner: 46,
        __parse: true
      },

      {
        valueY: 479.6,
        valueX: 1632712250547,
        index: 1,
        corner: 47,
        __parse: true
      },

      {
        valueY: 473.8,
        valueX: 1632261695512,
        index: 1,
        corner: 48,
        __parse: true
      },

      {
        valueY: 473.8,
        valueX: 1632261695512,
        index: 1,
        corner: 49,
        __parse: true
      },

      {
        valueY: 470.5,
        valueX: 1631799063786,
        index: 1,
        corner: 50,
        __parse: true
      },

      {
        valueY: 470.5,
        valueX: 1631799063786,
        index: 1,
        corner: 51,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1631276049713,
        index: 1,
        corner: 52,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1631239820748,
        index: 1,
        corner: 53,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1631239820748,
        index: 1,
        corner: 54,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1631010371368,
        index: 1,
        corner: 55,
        __parse: true
      },

      {
        valueY: 469.5,
        valueX: 1630642484471,
        index: 1,
        corner: 56,
        __parse: true
      },

      {
        valueY: 469.5,
        valueX: 1630642484471,
        index: 1,
        corner: 57,
        __parse: true
      },

      {
        valueY: 472.4,
        valueX: 1630400957296,
        index: 1,
        corner: 58,
        __parse: true
      },

      {
        valueY: 472.9,
        valueX: 1630376805021,
        index: 1,
        corner: 59,
        __parse: true
      },

      {
        valueY: 472.9,
        valueX: 1630376805021,
        index: 1,
        corner: 60,
        __parse: true
      },

      {
        valueY: 474.8,
        valueX: 1630304347089,
        index: 1,
        corner: 61,
        __parse: true
      },

      {
        valueY: 475.7,
        valueX: 1630292270399,
        index: 1,
        corner: 62,
        __parse: true
      },

      {
        valueY: 475.7,
        valueX: 1630280194261,
        index: 1,
        corner: 63,
        __parse: true
      },

      {
        valueY: 475.7,
        valueX: 1630280194261,
        index: 1,
        corner: 64,
        __parse: true
      },

      {
        valueY: 486.3,
        valueX: 1630071165295,
        index: 1,
        corner: 65,
        __parse: true
      },

      {
        valueY: 486.3,
        valueX: 1630071165295,
        index: 1,
        corner: 66,
        __parse: true
      },

      {
        valueY: 494,
        valueX: 1630047012467,
        index: 1,
        corner: 67,
        __parse: true
      },

      {
        valueY: 494,
        valueX: 1630047012467,
        index: 1,
        corner: 68,
        __parse: true
      },

      {
        valueY: 502.7,
        valueX: 1630034936330,
        index: 1,
        corner: 69,
        __parse: true
      },

      {
        valueY: 502.7,
        valueX: 1630034936330,
        index: 1,
        corner: 70,
        __parse: true
      },

      {
        valueY: 508.4,
        valueX: 1630022860192,
        index: 1,
        corner: 71,
        __parse: true
      },

      {
        valueY: 508.4,
        valueX: 1630022860192,
        index: 1,
        corner: 72,
        __parse: true
      },

      {
        valueY: 515.2,
        valueX: 1630034936330,
        index: 1,
        corner: 73,
        __parse: true
      },

      {
        valueY: 515.2,
        valueX: 1630034936330,
        index: 1,
        corner: 74,
        __parse: true
      },

      {
        valueY: 519.5,
        valueX: 1630083241433,
        index: 1,
        corner: 75,
        __parse: true
      },

      {
        valueY: 519.5,
        valueX: 1630083241433,
        index: 1,
        corner: 76,
        __parse: true
      },

      {
        valueY: 523.8,
        valueX: 1630352652193,
        index: 1,
        corner: 77,
        __parse: true
      },

      {
        valueY: 523.8,
        valueX: 1630352652193,
        index: 1,
        corner: 78,
        __parse: true
      },

      {
        valueY: 527.2,
        valueX: 1630473415227,
        index: 1,
        corner: 79,
        __parse: true
      },

      {
        valueY: 528.1,
        valueX: 1630509644193,
        index: 1,
        corner: 80,
        __parse: true
      },

      {
        valueY: 528.1,
        valueX: 1630509644193,
        index: 1,
        corner: 81,
        __parse: true
      },

      {
        valueY: 531,
        valueX: 1630630407781,
        index: 1,
        corner: 82,
        __parse: true
      },

      {
        valueY: 531,
        valueX: 1630630407781,
        index: 1,
        corner: 83,
        __parse: true
      },

      {
        valueY: 533.4,
        valueX: 1631010371368,
        index: 1,
        corner: 84,
        __parse: true
      },

      {
        valueY: 533.4,
        valueX: 1631010371368,
        index: 1,
        corner: 85,
        __parse: true
      },

      {
        valueY: 535.8,
        valueX: 1631167362816,
        index: 1,
        corner: 86,
        __parse: true
      },

      {
        valueY: 536.8,
        valueX: 1631239820748,
        index: 1,
        corner: 87,
        __parse: true
      },

      {
        valueY: 536.8,
        valueX: 1631239820748,
        index: 1,
        corner: 88,
        __parse: true
      },

      {
        valueY: 538.7,
        valueX: 1631605842267,
        index: 1,
        corner: 89,
        __parse: true
      },

      {
        valueY: 538.7,
        valueX: 1631605842267,
        index: 1,
        corner: 90,
        __parse: true
      },

      {
        valueY: 543.5,
        valueX: 1632201313165,
        index: 1,
        corner: 91,
        __parse: true
      },

      {
        valueY: 543.5,
        valueX: 1632201313165,
        index: 1,
        corner: 92,
        __parse: true
      },

      {
        valueY: 545.9,
        valueX: 1632418686960,
        index: 1,
        corner: 93,
        __parse: true
      },

      {
        valueY: 545.9,
        valueX: 1632418686960,
        index: 1,
        corner: 94,
        __parse: true
      },

      {
        valueY: 547.9,
        valueX: 1632772631788,
        index: 1,
        corner: 95,
        __parse: true
      },

      {
        valueY: 547.9,
        valueX: 1632772631788,
        index: 1,
        corner: 96,
        __parse: true
      },

      {
        valueY: 549.8,
        valueX: 1633086616895,
        index: 1,
        corner: 97,
        __parse: true
      },

      {
        valueY: 549.8,
        valueX: 1633086616895,
        index: 1,
        corner: 98,
        __parse: true
      },

      {
        valueY: 551.2,
        valueX: 1633987726966,
        index: 1,
        corner: 99,
        __parse: true
      },

      {
        valueY: 551.2,
        valueX: 1633987726966,
        index: 1,
        corner: 100,
        __parse: true
      },

      {
        valueY: 551.2,
        valueX: 1634265483107,
        index: 1,
        corner: 101,
        __parse: true
      },

      {
        valueY: 551.2,
        valueX: 1634522816623,
        index: 1,
        corner: 102,
        __parse: true
      },

      {
        valueY: 551.2,
        valueX: 1634522816623,
        index: 1,
        corner: 103,
        __parse: true
      },

      {
        valueY: 550.3,
        valueX: 1635226975524,
        index: 1,
        corner: 104,
        __parse: true
      },

      {
        valueY: 550.3,
        valueX: 1635226975524,
        index: 1,
        corner: 105,
        __parse: true
      },

      {
        valueY: 549.3,
        valueX: 1635432272628,
        index: 1,
        corner: 106,
        __parse: true
      },

      {
        valueY: 549.3,
        valueX: 1635432272628,
        index: 1,
        corner: 107,
        __parse: true
      },

      {
        valueY: 544.5,
        valueX: 1636079649183,
        index: 1,
        corner: 108,
        __parse: true
      },

      {
        valueY: 544.5,
        valueX: 1636079649183,
        index: 1,
        corner: 109,
        __parse: true
      },

      {
        valueY: 542.1,
        valueX: 1636469822977,
        index: 1,
        corner: 110,
        __parse: true
      },

      {
        valueY: 542.1,
        valueX: 1636469822977,
        index: 1,
        corner: 111,
        __parse: true
      },

      {
        valueY: 538.2,
        valueX: 1636663044496,
        index: 1,
        corner: 112,
        __parse: true
      },

      {
        valueY: 538.2,
        valueX: 1636663044496,
        index: 1,
        corner: 113,
        __parse: true
      },

      {
        valueY: 535.4,
        valueX: 1636980760359,
        index: 1,
        corner: 114,
        __parse: true
      },

      {
        valueY: 535.4,
        valueX: 1636980760359,
        index: 1,
        corner: 115,
        __parse: true
      },

      {
        valueY: 532,
        valueX: 1637089447256,
        index: 1,
        corner: 116,
        __parse: true
      },

      {
        valueY: 531,
        valueX: 1637113599532,
        index: 1,
        corner: 117,
        __parse: true
      },

      {
        valueY: 531,
        valueX: 1637113599532,
        index: 1,
        corner: 118,
        __parse: true
      },

      {
        valueY: 526.7,
        valueX: 1637198134154,
        index: 1,
        corner: 119,
        __parse: true
      },

      {
        valueY: 526.7,
        valueX: 1637198134154,
        index: 1,
        corner: 120,
        __parse: true
      },

      {
        valueY: 521.9,
        valueX: 1637306821051,
        index: 1,
        corner: 121,
        __parse: true
      },

      {
        valueY: 521.9,
        valueX: 1637306821051,
        index: 1,
        corner: 122,
        __parse: true
      },

      {
        valueY: 516.6,
        valueX: 1637576231257,
        index: 1,
        corner: 123,
        __parse: true
      },

      {
        valueY: 516.6,
        valueX: 1637576231257,
        index: 1,
        corner: 124,
        __parse: true
      },

      {
        valueY: 510.4,
        valueX: 1637648689189,
        index: 1,
        corner: 125,
        __parse: true
      },

      {
        valueY: 509.4,
        valueX: 1637660765879,
        index: 1,
        corner: 126,
        __parse: true
      },

      {
        valueY: 509.4,
        valueX: 1637660765879,
        index: 1,
        corner: 127,
        __parse: true
      },

      {
        valueY: 505.6,
        valueX: 1637696994845,
        index: 1,
        corner: 128,
        __parse: true
      },

      {
        valueY: 503.6,
        valueX: 1637721147120,
        index: 1,
        corner: 129,
        __parse: true
      },

      {
        valueY: 503.6,
        valueX: 1637721147120,
        index: 1,
        corner: 130,
        __parse: true
      },

      {
        valueY: 495.9,
        valueX: 1637781528361,
        index: 1,
        corner: 131,
        __parse: true
      },

      {
        valueY: 495.9,
        valueX: 1637781528361,
        index: 1,
        corner: 132,
        __parse: true
      },

      {
        valueY: 486.3,
        valueX: 1637916234018,
        index: 1,
        corner: 133,
        __parse: true
      },

      {
        valueY: 486.3,
        valueX: 1637916234018,
        index: 1,
        corner: 134,
        __parse: true
      },

      {
        valueY: 474.8,
        valueX: 1637928310708,
        index: 1,
        corner: 135,
        __parse: true
      },

      {
        valueY: 474.8,
        valueX: 1637928310708,
        index: 1,
        corner: 136,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1637928310708,
        index: 1,
        corner: 137,
        __parse: true
      },

      {
        valueY: 468.1,
        valueX: 1637928310708,
        index: 1,
        corner: 138,
        __parse: true
      },

      {
        valueY: 457.5,
        valueX: 1637769452777,
        index: 1,
        corner: 139,
        __parse: true
      },

      {
        valueY: 457.5,
        valueX: 1637769452777,
        index: 1,
        corner: 140,
        __parse: true
      },

      {
        valueY: 452.7,
        valueX: 1637721147120,
        index: 1,
        corner: 141,
        __parse: true
      },

      {
        valueY: 452.7,
        valueX: 1637721147120,
        index: 1,
        corner: 142,
        __parse: true
      },

      {
        valueY: 449.8,
        valueX: 1637696994845,
        index: 1,
        corner: 143,
        __parse: true
      },

      {
        valueY: 449.8,
        valueX: 1637696994845,
        index: 1,
        corner: 144,
        __parse: true
      },

      {
        valueY: 448.3,
        valueX: 1637684918155,
        index: 1,
        corner: 145,
        __parse: true
      },

      {
        valueY: 448.3,
        valueX: 1637684918155,
        index: 1,
        corner: 146,
        __parse: true
      },

      {
        valueY: 446.4,
        valueX: 1637660765879,
        index: 1,
        corner: 147,
        __parse: true
      },

      {
        valueY: 446.4,
        valueX: 1637660765879,
        index: 1,
        corner: 148,
        __parse: true
      },

      {
        valueY: 443.1,
        valueX: 1637588307948,
        index: 1,
        corner: 149,
        __parse: true
      },

      {
        valueY: 443.1,
        valueX: 1637588307948,
        index: 1,
        corner: 150,
        __parse: true
      },

      {
        valueY: 439.2,
        valueX: 1637125676222,
        index: 1,
        corner: 151,
        __parse: true
      },

      {
        valueY: 438.3,
        valueX: 1637065293875,
        index: 1,
        corner: 152,
        __parse: true
      },

      {
        valueY: 438.3,
        valueX: 1637065293875,
        index: 1,
        corner: 153,
        __parse: true
      },

      {
        valueY: 436.8,
        valueX: 1636602662150,
        index: 1,
        corner: 154,
        __parse: true
      },

      {
        valueY: 436.8,
        valueX: 1636602662150,
        index: 1,
        corner: 155,
        __parse: true
      },

      {
        valueY: 439.2,
        valueX: 1635983038976,
        index: 1,
        corner: 156,
        __parse: true
      },

      {
        valueY: 439.2,
        valueX: 1635970962286,
        index: 1,
        corner: 157,
        __parse: true
      },

      {
        valueY: 439.2,
        valueX: 1635970962286,
        index: 1,
        corner: 158,
        __parse: true
      },

      {
        valueY: 445,
        valueX: 1635898504354,
        index: 1,
        corner: 159,
        __parse: true
      },

      {
        valueY: 445.9,
        valueX: 1635898504354,
        index: 1,
        corner: 160,
        __parse: true
      },

      {
        valueY: 445.9,
        valueX: 1635898504354,
        index: 1,
        corner: 161,
        __parse: true
      },

      {
        valueY: 453.6,
        valueX: 1635886427664,
        index: 1,
        corner: 162,
        __parse: true
      },

      {
        valueY: 454.6,
        valueX: 1635886427664,
        index: 1,
        corner: 163,
        __parse: true
      },

      {
        valueY: 454.6,
        valueX: 1635886427664,
        index: 1,
        corner: 164,
        __parse: true
      },

      {
        valueY: 459.9,
        valueX: 1635934733320,
        index: 1,
        corner: 165,
        __parse: true
      },

      {
        valueY: 464.2,
        valueX: 1635995114561,
        index: 1,
        corner: 166,
        __parse: true
      },

      {
        valueY: 464.2,
        valueX: 1635995114561,
        index: 1,
        corner: 167,
        __parse: true
      },

      {
        valueY: 474.3,
        valueX: 1636336983805,
        index: 1,
        corner: 168,
        __parse: true
      },

      {
        valueY: 475.3,
        valueX: 1636361136080,
        index: 1,
        corner: 169,
        __parse: true
      },

      {
        valueY: 475.3,
        valueX: 1636361136080,
        index: 1,
        corner: 170,
        __parse: true
      },

      {
        valueY: 484.4,
        valueX: 1636932454703,
        index: 1,
        corner: 171,
        __parse: true
      },

      {
        valueY: 484.4,
        valueX: 1636932454703,
        index: 1,
        corner: 172,
        __parse: true
      },

      {
        valueY: 485.8,
        valueX: 1637186057463,
        index: 1,
        corner: 173,
        __parse: true
      },

      {
        valueY: 485.8,
        valueX: 1637186057463,
        index: 1,
        corner: 174,
        __parse: true
      },

      {
        valueY: 485.8,
        valueX: 1637672841464,
        index: 1,
        corner: 175,
        __parse: true
      },

      {
        valueY: 485.8,
        valueX: 1637672841464,
        index: 1,
        corner: 176,
        __parse: true
      },

      {
        valueY: 479.6,
        valueX: 1638390942434,
        index: 1,
        corner: 177,
        __parse: true
      },

      {
        valueY: 479.6,
        valueX: 1638390942434,
        index: 1,
        corner: 178,
        __parse: true
      },

      {
        valueY: 469,
        valueX: 1638938107676,
        index: 1,
        corner: 179,
        __parse: true
      },

      {
        valueY: 469,
        valueX: 1638938107676,
        index: 1,
        corner: 180,
        __parse: true
      },

      {
        valueY: 457,
        valueX: 1639352434851,
        index: 1,
        corner: 181,
        __parse: true
      },

      {
        valueY: 457,
        valueX: 1639352434851,
        index: 1,
        corner: 182,
        __parse: true
      },

      {
        valueY: 443.1,
        valueX: 1639533579680,
        index: 1,
        corner: 183,
        __parse: true
      },

      {
        valueY: 443.1,
        valueX: 1639533579680,
        index: 1,
        corner: 184,
        __parse: true
      },

      {
        valueY: 429.6,
        valueX: 1639690571128,
        index: 1,
        corner: 185,
        __parse: true
      },

      {
        valueY: 429.6,
        valueX: 1639690571128,
        index: 1,
        corner: 186,
        __parse: true
      },

      {
        valueY: 420.5,
        valueX: 1639959982440,
        index: 1,
        corner: 187,
        __parse: true
      },

      {
        valueY: 420.5,
        valueX: 1639959982440,
        index: 1,
        corner: 188,
        __parse: true
      },

      {
        valueY: 412.8,
        valueX: 1640020363681,
        index: 1,
        corner: 189,
        __parse: true
      },

      {
        valueY: 412.8,
        valueX: 1640020363681,
        index: 1,
        corner: 190,
        __parse: true
      },

      {
        valueY: 407.5,
        valueX: 1640032440372,
        index: 1,
        corner: 191,
        __parse: true
      },

      {
        valueY: 407.5,
        valueX: 1640032440372,
        index: 1,
        corner: 192,
        __parse: true
      },

      {
        valueY: 404.6,
        valueX: 1640044515956,
        index: 1,
        corner: 193,
        __parse: true
      },

      {
        valueY: 404.6,
        valueX: 1640044515956,
        index: 1,
        corner: 194,
        __parse: true
      },

      {
        valueY: 404.1,
        valueX: 1640044515956,
        index: 1,
        corner: 195,
        __parse: true
      },

      {
        valueY: 404.1,
        valueX: 1640044515956,
        index: 1,
        corner: 196,
        __parse: true
      },

      {
        valueY: 404.1,
        valueX: 1640044515956,
        index: 1,
        corner: 197,
        __parse: true
      },

      {
        valueY: 403.6,
        valueX: 1640044515956,
        index: 1,
        corner: 198,
        __parse: true
      },

      {
        valueY: 403.6,
        valueX: 1640044515956,
        index: 1,
        corner: 199,
        __parse: true
      }
    ]
  },

  {
    __tool: "Line",
    __panelIndex: 0,
    __drawing: [
      {
        stroke: {
          type: "Template",
          settings: {
            stroke: {
              type: "Color",
              value: "#882dff"
            },

            strokeOpacity: 1,
            strokeDasharray: [],
            strokeWidth: 2
          }
        },

        fill: {
          type: "Template",
          settings: {
            fill: {
              type: "Color",
              value: "#ad6eff"
            },

            fillOpacity: 0.5
          }
        },

        index: 1,
        showExtension: true,
        corner: "e",
        __parse: true
      },

      {
        valueY: 588.5,
        valueX: 1622835107765,
        corner: "p1",
        index: 1,
        __parse: true
      },

      {
        valueY: 542,
        valueX: 1645696231488,
        corner: "p2",
        index: 1,
        __parse: true
      }
    ]
  }
];

drawingControl.unserializeDrawings(drawing);

const indicatorData = {
  __stockSeries: true,
  __volumeSeries: true,
  __legend: true,
  __indicator: {
    type: "MACD",
    settings: {
      position: "absolute",
      fastPeriod: 16,
      slowPeriod: 26,
      signalPeriod: 9
    }
  }
};

const indicatorData2 = {
  __stockSeries: true,
  __volumeSeries: true,
  __legendIndex: 0,
  __indicator: {
    type: "BollingerBands",
    settings: {
      position: "absolute"
    }
  }
};

indicatorControl.unserializeIndicators([indicatorData, indicatorData2]);
```
