---
title: "Serializing indicators and annotations"
source: "https://www.amcharts.com/docs/v5/charts/stock/serializing-indicators-annotations/"
scraped: "2026-03-15"
---

User-added drawings (annotations) and indicators, can be serialized into simple JavaScript objects or JSON strings. That information can be saved and later restored using built-in functions. This tutorial explains how to use the API to do just that.

## Requirements

The serialization / parsing of annotation data and added indicators is a functionality built-in into the [Drawing control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/) and [Indicator control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/indicator-control/) respectively.

We will need those to be present and initialized in order to use the functionality.

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
  controls: \[
    indicatorControl,
    drawingControl
  \]
});

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
  controls: \[
    indicatorControl,
    drawingControl
  \]
});

MORE INFOFor more information about managing toolbars, refer to the "[Stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/)" tutorial.

## Serializing

### Methods

To serialize current drawings, we can use `serializeDrawings()` method of the Drawing control.

Similarly, to serialize indicators, we can use `serializeIndicators()` method of the Indicator control.

const drawings = drawingControl.serializeDrawings("string", "  ");
const indicators = indicatorControl.serializeIndicators("string", "  ");

var drawings = drawingControl.serializeDrawings("string", "  ");
var indicators = indicatorControl.serializeIndicators("string", "  ");

Both functions will return an array of serialized objects, representing drawings and indicators.

In case we use `"string"` as an output format, the array (and all its contents) will be stringified into a JSON format.

### String vs. object

A second parameter to both serialization functions can be either `"string"` or `"object"` (default).

`"string"` will return a fully formatted JSON text, which can be stored in a database, saved in a file, or stored anywhere else, that text can be stored.

When `"string"` is used, the second parameter will be used to as a prefix for indenting JSON lines.

If nothing is specified, resulting JSON will be a single unformatted line.

`"object"` will return a simple JavaScript object, containing just string, number, and boolean values.

{
  "\_\_stockSeries": true,
  "\_\_volumeSeries": true,
  "\_\_indicator": {
    "type": "MACD",
    "settings": {
      "fastPeriod": 16,
      "slowPeriod": 26,
      "signalPeriod": 9
    }
  }
}

## Restoring

Restoring drawings can be done by passing in serialized data (either in as an array of simple objects, or as a JSON string) to `unserializeDrawings()` method of the Drawing control, or `userializeIndicators()` of the Indicator control.

drawingControl.unserializeDrawings(drawings);
indicatorControl.unserializeIndicators(indicators);

drawingControl.unserializeDrawings(drawings);
indicatorControl.unserializeIndicators(indicators);

The methods will recognize if the data was passed as a simple array of objects or a JSON string automatically, so there's no parameter to indicator format.

## Events

Stock chart provides two events which can be used to dynamically monitor to any changes in drawings and/or indicators: `drawingsupdated` and `indicatorsupdated`.

They can be used to serialize and update current chart state in storage.

stockChart.events.on("drawingsupdated", function(ev) {
  // Serialize drawings and store them
  // ...
});

stockChart.events.on("indicatorsupdated", function(ev) {
  // Serialize indicators and store them
  // ...
});

stockChart.events.on("drawingsupdated", function(ev) {
  // Serialize drawings and store them
  // ...
});

stockChart.events.on("indicatorsupdated", function(ev) {
  // Serialize indicators and store them
  // ...
});

Please note, when drawing freestyle annotations (e.g. doodle), `drawingsupdated` event will be invoked multiple times.

In such cases, debouncing serialization/storage code is a good idea:

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

## Example


