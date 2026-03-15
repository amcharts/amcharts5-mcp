---
title: "Stock chart"
source: "https://www.amcharts.com/docs/v5/charts/stock/"
scraped: "2026-03-15"
---

Stock chart is a powerful tool - part of amCharts 5 library - used to visualize date/time-based data and analyze it. This tutorial walks through steps of creating, configuring, and using it.

## Introduction

During the course of this tutorial, we will review what it takes to build an absolute minimum stock chart.

Where applicable we will link to related tutorials, with more advanced functionality.

## Chart components

Before we dive in deeper, let's get familiar with essential terminology and components comprising stock chart.

The chart itself consist of the following components:

-   Stock chart - it's basically a wrapper for everything else.
-   Panels - instances of `StockPanel` (which is basically an `XYChart`), synced with each other in zoom and cursor, arranged vertically, with ability to resize, add new ones.
-   Series, indicators, annotations - plotted info using data or user-drawn interactions.
-   Tools - a toolbar with stock tools: drawing, comparisons, indicators, settings, etc.

We will cover all these in this and related tutorials.

## Loading required modules

Stock chart requires three amCharts 5 modules: `"index"`, `"xy"`, and `"stock"`.

You can import those in your TypeScript / ES6 application as JavScript modules:

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import \* as am5stock from "@amcharts/amcharts5/stock";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/stock.js"></script>

MORE INFO For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

## Instantiating the chart

As with any chart type in amCharts 5, we'll need to start with creation of the `Root` element.

In it we will create an instance of a `StockChart` class:

let root = am5.Root.new("chartdiv");
let stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {})
);

var root = am5.Root.new("chartdiv");
var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {})
);

MORE INFO The notion of creating class instances using `.new()` method is described in "[Creating a chart](https://www.amcharts.com/docs/v5/getting-started/#Creating_a_chart)" section in the "Getting started" tutorial. Make sure you check it out.

## Panels

A "panel" in a stock chart is an instance of a `StockPanel` which in turn extends `XYChart` pushed into `panels` list.

Basically, anything you can and need do with an XY chart, you can do with a stock panel.

MORE INFOFor a complete guide on how to configure an XY chart, please refer to "[XY chart](https://www.amcharts.com/docs/v5/charts/xy-chart/)" tutorial section.

The following code will add a single panel (chart). Let's call it a "main chart".

let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

MORE INFOPanels/charts are configurable. For a complete rundown of their configuration features, visit "[Panels](https://www.amcharts.com/docs/v5/charts/stock/panels/)" tutorial.

Stock chart will also take care of syncing zoom across multiple panels, automatically.

## Adding axes

Since an XY chart requires at least two axes (X and Y) to function, we'll need to add those to panel's (chart), too.

While regular XY chart can accept any combination of axes types, when used as a panel, it needs its X axis to be a [date axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/), and its Y axis to be a [value axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/) - we'll be plotting a date/time-based value data.

let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let dateAxis = mainPanel.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var dateAxis = mainPanel.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

MORE INFOFor more information on adding and configuring axes on an XY chart, refer to "[Axes](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/)" tutorial.

## Series

### Adding series

Series in stock chart are added to `series` list of its panels.

Technically, a panel (which is an XY chart) or its series do not even know they're part of something bigger - a stock chart.

Let's add a simple line series to our "main" panel.

let valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Close",
  xAxis: dateAxis,
  yAxis: valueAxis,
}));

valueSeries.data.setAll(data);

var valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Close",
  xAxis: dateAxis,
  yAxis: valueAxis,
}));

valueSeries.data.setAll(data);

MORE INFORefer to "[Series](https://www.amcharts.com/docs/v5/charts/xy-chart/series/)" tutorial for more information about configuration options.

### Setting main series

Stock chart goes beyond regular XY charts by providing a lot of additional analytical tools like indicators, trend drawing, as well as comparisons of different indexes.

Those rely on data from main series.

Stock chart recognizes two main series: value and volume.

Some indicators and tools just use "value main series", others rely on "volume main series", while some need both.

We can use stock chart's settings `valueSeries` and `volumeSeries` to set which series to use for those analytical tools.

stockChart.set("stockSeries", valueSeries);

stockChart.set("stockSeries", valueSeries);

While volume series is less frequently required, value series is relied upon quite heavily throughout stock chart, so it's a good practice to set it, even if we're not sure we'll need it.

stockChart.set("volumeSeries", volumeSeries);

stockChart.set("volumeSeries", volumeSeries);

In case we don't need it displayed, we can create a hidden volume series:

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

### Positive/negative colors

Main value series (set on `stockSeries`) and main volume series (set on `volumeSeries`) will use two colors if they are of type column, candlestick, or OHLC.

They will use "negative" and "positive" colors from the default [interface color set](https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Interface_colors).

Negative color will be used for items that have their close value lower than their open.

Positive color will be used for the rest of the series items.

Unless we want to modify default theme, we ca use these for stock chart settings to control those colors:

-   `stockPositiveColor`
-   `stockNegativeColor`
-   `volumePositiveColor`
-   `volumeNegativeColor`

Values in `stockPositiveColor` and `stockNegativeColor` will affect only main value series, while `valuePostiveColor` and `valueNegativeColor` will affect main volume series.

These settings do not have any effect on any other series of the chart.

let stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    stockPositiveColor: am5.color(0x999999),
    stockNegativeColor: am5.color(0x000000),
    volumePositiveColor: am5.color(0x999999),
    volumeNegativeColor: am5.color(0x000000)
  })
);

var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    stockPositiveColor: am5.color(0x999999),
    stockNegativeColor: am5.color(0x000000),
    volumePositiveColor: am5.color(0x999999),
    volumeNegativeColor: am5.color(0x000000)
  })
);

To completely remove built-in coloring, you can use `null` in place of the actual color:

let stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    stockPositiveColor: null,
    stockNegativeColor: null,
    volumePositiveColor: null,
    volumeNegativeColor: null
  })
);

var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    stockPositiveColor: null,
    stockNegativeColor: null,
    volumePositiveColor: null,
    volumeNegativeColor: null
  })
);

## Legend

In stock chart, we can use both the [regular legend](https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/) that we'd use in an XY chart, as well as advanced special "sock legend".

The latter offers enhanced view as well as tools to edit related series/indicators.

To ad a stock legend, we'll use a `StockLegend` class instead of `Legend`:

let valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll(\[valueSeries\]);

var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll(\[valueSeries\]);

The important difference from regular legend is that stock legend is designed to be displayed over the plot area, so we push it into main panel's `plotContainer`.

Another difference is that because of additional functionality, stock legend requires to know what its stock chart it, hence us setting `stockChart` in the above code.

If we wanted we could use a regular legend here as well:

let valueLegend = valueAxis.axisHeader.children.push(am5.Legend.new(root, {}));
valueLegend.data.setAll(\[valueSeries\]);

var valueLegend = valueAxis.axisHeader.children.push(am5.Legend.new(root, {}));
valueLegend.data.setAll(\[valueSeries\]);

NOTEFor more about stock legend, visit "[Stock legend](https://www.amcharts.com/docs/v5/charts/stock/stock-legend/)" tutorial.

## Cursors

Cursors work the same way as in XY charts: by creating an instance of `XYCursor` and supplying it to panel's (chart's) `cursor` setting.

mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis
}));

mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis
}));

Cursor needs to be added to each panel individually.

Stock chart will take care of syncing cursor position across all panels, automatically.

MORE INFORefer to "[Cursor](https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/)" tutorial for more information.

## Scrollbar

Adding a scrollbar is identical how we would do it in an XY chart, except for pushing it into chart/panel's children, we use a special container on a stock chart: `toolsContainer`:

let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

sbSeries.data.setAll(data);

var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

sbSeries.data.setAll(data);

If we'd like to place the scrollbar at the bottom of the panel instead, we can push it into panel's `bottomAxesContainer` instead:

mainPanel.bottomAxesContainer.children.push(scrollbar);

mainPanel.bottomAxesContainer.children.push(scrollbar);

MORE INFOLook for more info about adding scrollbars in our "[Scrollbars](https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/)" tutorial.

## Complete example

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";
import \* as am5xy from "@amcharts/amcharts5/stock";

// Define source data
let data = \[
  { Date: 1636495200000, Open: 106.75, High: 119.459999, Low: 95.199997, Close: 100.730003, Volume: 103679500 },
  { Date: 1636581600000, Open: 114.625, High: 125, Low: 108.010002, Close: 122.989998, Volume: 83668200 },
  { Date: 1636668000000, Open: 128.645004, High: 135.199997, Low: 125.25, Close: 129.949997, Volume: 50437500 },
  { Date: 1636927200000, Open: 130.800003, High: 152.529999, Low: 127.510002, Close: 149.360001, Volume: 64982300 },
  { Date: 1637013600000, Open: 163.800003, High: 179.470001, Low: 153.779999, Close: 172.009995, Volume: 94036600 },
  { Date: 1637100000000, Open: 160.880005, High: 163, Low: 140.350006, Close: 146.070007, Volume: 71765600 },
  { Date: 1637186400000, Open: 136.809998, High: 138.779999, Low: 120.150002, Close: 123.379997, Volume: 63603600 },
  { Date: 1637272800000, Open: 129.979996, High: 139.899994, Low: 125.599998, Close: 128.600006, Volume: 49479400 },
  { Date: 1637532000000, Open: 123.879997, High: 124.93, Low: 106.910004, Close: 118.110001, Volume: 40993900 },
  { Date: 1637618400000, Open: 117.830002, High: 124, Low: 113, Close: 119.849998, Volume: 24967900 },
  { Date: 1637704800000, Open: 119.379997, High: 120, Low: 113.449997, Close: 114.849998, Volume: 11539200 },
  { Date: 1637877600000, Open: 111, High: 114.5, Low: 106.139999, Close: 112.129997, Volume: 9871200 },
  { Date: 1638136800000, Open: 115.849998, High: 122.25, Low: 113.599998, Close: 119.769997, Volume: 13923900 },
  { Date: 1638223200000, Open: 119.900002, High: 121.489998, Low: 114.099998, Close: 119.760002, Volume: 20204900 },
  { Date: 1638309600000, Open: 120.540001, High: 126.75, Low: 113.099998, Close: 115.690002, Volume: 13289700 },
  { Date: 1638396000000, Open: 114.169998, High: 118.449997, Low: 107.75, Close: 110.769997, Volume: 10835500 },
  { Date: 1638482400000, Open: 110.489998, High: 111.870003, Low: 100, Close: 104.669998, Volume: 13802500 },
  { Date: 1638741600000, Open: 106.360001, High: 117.480003, Low: 100.32, Close: 116.779999, Volume: 19725400 },
  { Date: 1638828000000, Open: 119.519997, High: 120.209999, Low: 112.400002, Close: 116.18, Volume: 12173300 },
  { Date: 1638914400000, Open: 116.220001, High: 123.400002, Low: 112.82, Close: 122.120003, Volume: 12816000 },
  { Date: 1639000800000, Open: 119.949997, High: 121.32, Low: 114.400002, Close: 115.400002, Volume: 8474800 },
  { Date: 1639087200000, Open: 115.709999, High: 118.010002, Low: 110.801003, Close: 114.660004, Volume: 8336800 },
  { Date: 1639346400000, Open: 118.139999, High: 121.639999, Low: 113.949997, Close: 118.900002, Volume: 14737500 },
  { Date: 1639432800000, Open: 114.769997, High: 117.900002, Low: 112.709999, Close: 117.139999, Volume: 8057700 },
  { Date: 1639519200000, Open: 115.470001, High: 116.738998, Low: 109.209999, Close: 115, Volume: 10828600 },
  { Date: 1639605600000, Open: 116.760002, High: 117, Low: 107.059998, Close: 108.870003, Volume: 13627600 },
  { Date: 1639692000000, Open: 99.919998, High: 100.599998, Low: 92.620003, Close: 97.699997, Volume: 44454800 },
  { Date: 1639951200000, Open: 94.800003, High: 96.400002, Low: 88.400002, Close: 89.980003, Volume: 16072700 },
  { Date: 1640037600000, Open: 92.190002, High: 98.419998, Low: 92.050003, Close: 96.82, Volume: 12915100 },
  { Date: 1640124000000, Open: 96.388, High: 98.900002, Low: 93.391998, Close: 96.339996, Volume: 8644100 },
  { Date: 1640210400000, Open: 96.350998, High: 97.821999, Low: 93.814003, Close: 96.839996, Volume: 5670100 },
  { Date: 1640556000000, Open: 96.900002, High: 107.489998, Low: 96.800003, Close: 107.089996, Volume: 15497000 },
  { Date: 1640642400000, Open: 105.040001, High: 106, Low: 101, Close: 102.870003, Volume: 8821300 },
  { Date: 1640728800000, Open: 101.190002, High: 102.580002, Low: 96.620003, Close: 99.339996, Volume: 8754900 },
  { Date: 1640815200000, Open: 98.851997, High: 105.290001, Low: 98.660004, Close: 103.419998, Volume: 10874700 },
  { Date: 1640901600000, Open: 102.440002, High: 106.120003, Low: 102.279999, Close: 103.690002, Volume: 5814900 },
  { Date: 1641160800000, Open: 106.139999, High: 106.550003, Low: 100.25, Close: 102.720001, Volume: 8346800 },
  { Date: 1641247200000, Open: 102.989998, High: 106.800003, Low: 99.014, Close: 101.389999, Volume: 12152200 },
  { Date: 1641333600000, Open: 98.32, High: 99.214996, Low: 89.279999, Close: 90.010002, Volume: 18645100 },
  { Date: 1641420000000, Open: 91.879997, High: 92.029999, Low: 75.129997, Close: 87.330002, Volume: 39827100 },
  { Date: 1641506400000, Open: 87.019997, High: 89.269997, Low: 81.621002, Close: 86.279999, Volume: 17497700 },
  { Date: 1641765600000, Open: 83.519997, High: 83.75, Low: 77.650002, Close: 81.440002, Volume: 17289800 },
  { Date: 1641852000000, Open: 78.940002, High: 86.580002, Low: 78.120003, Close: 83.550003, Volume: 19970600 },
  { Date: 1641938400000, Open: 84.900002, High: 88.07, Low: 82.629997, Close: 86.480003, Volume: 14422800 },
  { Date: 1642024800000, Open: 86.940002, High: 86.940002, Low: 79.889999, Close: 80.309998, Volume: 13677500 },
  { Date: 1642111200000, Open: 79.57, High: 81.690002, Low: 77.010002, Close: 79.949997, Volume: 15792300 },
  { Date: 1642456800000, Open: 77.525002, High: 77.839996, Low: 72.855003, Close: 73.160004, Volume: 16803700 },
  { Date: 1642543200000, Open: 74.82, High: 76.32, Low: 68.949997, Close: 69.400002, Volume: 15068400 },
  { Date: 1642629600000, Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 65.019997, Volume: 18642700 },
  { Date: 1642716000000, Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 64.510002, Volume: 19323400 },
  { Date: 1642975200000, Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 63.900002, Volume: 24134800 },
  { Date: 1643061600000, Open: 61.105, High: 61.93, Low: 58, Close: 59.610001, Volume: 16557200 },
  { Date: 1643148000000, Open: 62.349998, High: 68.07, Low: 59.009998, Close: 60.27, Volume: 23694100 },
  { Date: 1643234400000, Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 53.939999, Volume: 23385500 },
  { Date: 1643320800000, Open: 53.599998, High: 57.299999, Low: 50, Close: 57.119999, Volume: 23942400 }
\];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root\_element
let root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

// Create a stock chart
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating\_the\_chart
let stockChart = root.container.children.push(am5stock.StockChart.new(root, {
}));

/\*\*
 \* Main (value) panel
 \*/

// Create a main stock panel (chart)
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding\_panels
let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Close",
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY}"
}));

valueSeries.data.setAll(data);

// Set main value series
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting\_main\_series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
let valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll(\[valueSeries\]);

/\*\*
 \* Secondary (volume) panel
 \*/

// Create a main stock panel (chart)
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding\_panels
let volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30)
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let volumeValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a",
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let  volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
let volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: volumeDateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "{valueY}"
}));

volumeSeries.data.setAll(data);

// Set main value series
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting\_main\_series
stockChart.set("volumeSeries", volumeSeries);


// Add a stock legend
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
let volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
volumeLegend.data.setAll(\[volumeSeries\]);


// Add cursor(s)
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: \[valueSeries\],
  snapToSeriesBy: "y!"
}));

volumePanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: volumeValueAxis,
  xAxis: volumeDateAxis,
  snapToSeries: \[volumeSeries\],
  snapToSeriesBy: "y!"
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
let scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

let sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

let sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

let sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

sbSeries.data.setAll(data);

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/stock.js"></script>

<div id="chartdiv"></div>

<script>
// Define source data
var data = \[
  { Date: 1636495200000, Open: 106.75, High: 119.459999, Low: 95.199997, Close: 100.730003, Volume: 103679500 },
  { Date: 1636581600000, Open: 114.625, High: 125, Low: 108.010002, Close: 122.989998, Volume: 83668200 },
  { Date: 1636668000000, Open: 128.645004, High: 135.199997, Low: 125.25, Close: 129.949997, Volume: 50437500 },
  { Date: 1636927200000, Open: 130.800003, High: 152.529999, Low: 127.510002, Close: 149.360001, Volume: 64982300 },
  { Date: 1637013600000, Open: 163.800003, High: 179.470001, Low: 153.779999, Close: 172.009995, Volume: 94036600 },
  { Date: 1637100000000, Open: 160.880005, High: 163, Low: 140.350006, Close: 146.070007, Volume: 71765600 },
  { Date: 1637186400000, Open: 136.809998, High: 138.779999, Low: 120.150002, Close: 123.379997, Volume: 63603600 },
  { Date: 1637272800000, Open: 129.979996, High: 139.899994, Low: 125.599998, Close: 128.600006, Volume: 49479400 },
  { Date: 1637532000000, Open: 123.879997, High: 124.93, Low: 106.910004, Close: 118.110001, Volume: 40993900 },
  { Date: 1637618400000, Open: 117.830002, High: 124, Low: 113, Close: 119.849998, Volume: 24967900 },
  { Date: 1637704800000, Open: 119.379997, High: 120, Low: 113.449997, Close: 114.849998, Volume: 11539200 },
  { Date: 1637877600000, Open: 111, High: 114.5, Low: 106.139999, Close: 112.129997, Volume: 9871200 },
  { Date: 1638136800000, Open: 115.849998, High: 122.25, Low: 113.599998, Close: 119.769997, Volume: 13923900 },
  { Date: 1638223200000, Open: 119.900002, High: 121.489998, Low: 114.099998, Close: 119.760002, Volume: 20204900 },
  { Date: 1638309600000, Open: 120.540001, High: 126.75, Low: 113.099998, Close: 115.690002, Volume: 13289700 },
  { Date: 1638396000000, Open: 114.169998, High: 118.449997, Low: 107.75, Close: 110.769997, Volume: 10835500 },
  { Date: 1638482400000, Open: 110.489998, High: 111.870003, Low: 100, Close: 104.669998, Volume: 13802500 },
  { Date: 1638741600000, Open: 106.360001, High: 117.480003, Low: 100.32, Close: 116.779999, Volume: 19725400 },
  { Date: 1638828000000, Open: 119.519997, High: 120.209999, Low: 112.400002, Close: 116.18, Volume: 12173300 },
  { Date: 1638914400000, Open: 116.220001, High: 123.400002, Low: 112.82, Close: 122.120003, Volume: 12816000 },
  { Date: 1639000800000, Open: 119.949997, High: 121.32, Low: 114.400002, Close: 115.400002, Volume: 8474800 },
  { Date: 1639087200000, Open: 115.709999, High: 118.010002, Low: 110.801003, Close: 114.660004, Volume: 8336800 },
  { Date: 1639346400000, Open: 118.139999, High: 121.639999, Low: 113.949997, Close: 118.900002, Volume: 14737500 },
  { Date: 1639432800000, Open: 114.769997, High: 117.900002, Low: 112.709999, Close: 117.139999, Volume: 8057700 },
  { Date: 1639519200000, Open: 115.470001, High: 116.738998, Low: 109.209999, Close: 115, Volume: 10828600 },
  { Date: 1639605600000, Open: 116.760002, High: 117, Low: 107.059998, Close: 108.870003, Volume: 13627600 },
  { Date: 1639692000000, Open: 99.919998, High: 100.599998, Low: 92.620003, Close: 97.699997, Volume: 44454800 },
  { Date: 1639951200000, Open: 94.800003, High: 96.400002, Low: 88.400002, Close: 89.980003, Volume: 16072700 },
  { Date: 1640037600000, Open: 92.190002, High: 98.419998, Low: 92.050003, Close: 96.82, Volume: 12915100 },
  { Date: 1640124000000, Open: 96.388, High: 98.900002, Low: 93.391998, Close: 96.339996, Volume: 8644100 },
  { Date: 1640210400000, Open: 96.350998, High: 97.821999, Low: 93.814003, Close: 96.839996, Volume: 5670100 },
  { Date: 1640556000000, Open: 96.900002, High: 107.489998, Low: 96.800003, Close: 107.089996, Volume: 15497000 },
  { Date: 1640642400000, Open: 105.040001, High: 106, Low: 101, Close: 102.870003, Volume: 8821300 },
  { Date: 1640728800000, Open: 101.190002, High: 102.580002, Low: 96.620003, Close: 99.339996, Volume: 8754900 },
  { Date: 1640815200000, Open: 98.851997, High: 105.290001, Low: 98.660004, Close: 103.419998, Volume: 10874700 },
  { Date: 1640901600000, Open: 102.440002, High: 106.120003, Low: 102.279999, Close: 103.690002, Volume: 5814900 },
  { Date: 1641160800000, Open: 106.139999, High: 106.550003, Low: 100.25, Close: 102.720001, Volume: 8346800 },
  { Date: 1641247200000, Open: 102.989998, High: 106.800003, Low: 99.014, Close: 101.389999, Volume: 12152200 },
  { Date: 1641333600000, Open: 98.32, High: 99.214996, Low: 89.279999, Close: 90.010002, Volume: 18645100 },
  { Date: 1641420000000, Open: 91.879997, High: 92.029999, Low: 75.129997, Close: 87.330002, Volume: 39827100 },
  { Date: 1641506400000, Open: 87.019997, High: 89.269997, Low: 81.621002, Close: 86.279999, Volume: 17497700 },
  { Date: 1641765600000, Open: 83.519997, High: 83.75, Low: 77.650002, Close: 81.440002, Volume: 17289800 },
  { Date: 1641852000000, Open: 78.940002, High: 86.580002, Low: 78.120003, Close: 83.550003, Volume: 19970600 },
  { Date: 1641938400000, Open: 84.900002, High: 88.07, Low: 82.629997, Close: 86.480003, Volume: 14422800 },
  { Date: 1642024800000, Open: 86.940002, High: 86.940002, Low: 79.889999, Close: 80.309998, Volume: 13677500 },
  { Date: 1642111200000, Open: 79.57, High: 81.690002, Low: 77.010002, Close: 79.949997, Volume: 15792300 },
  { Date: 1642456800000, Open: 77.525002, High: 77.839996, Low: 72.855003, Close: 73.160004, Volume: 16803700 },
  { Date: 1642543200000, Open: 74.82, High: 76.32, Low: 68.949997, Close: 69.400002, Volume: 15068400 },
  { Date: 1642629600000, Open: 70.858002, High: 72.080002, Low: 64.809998, Close: 65.019997, Volume: 18642700 },
  { Date: 1642716000000, Open: 63.865002, High: 67.160004, Low: 60.509998, Close: 64.510002, Volume: 19323400 },
  { Date: 1642975200000, Open: 60.110001, High: 64.300003, Low: 55.099998, Close: 63.900002, Volume: 24134800 },
  { Date: 1643061600000, Open: 61.105, High: 61.93, Low: 58, Close: 59.610001, Volume: 16557200 },
  { Date: 1643148000000, Open: 62.349998, High: 68.07, Low: 59.009998, Close: 60.27, Volume: 23694100 },
  { Date: 1643234400000, Open: 61.330002, High: 61.700001, Low: 53.331001, Close: 53.939999, Volume: 23385500 },
  { Date: 1643320800000, Open: 53.599998, High: 57.299999, Low: 50, Close: 57.119999, Volume: 23942400 }
\];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root\_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

// Create a stock chart
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Instantiating\_the\_chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
}));

/\*\*
 \* Main (value) panel
 \*/

// Create a main stock panel (chart)
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding\_panels
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Close",
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY}"
}));

valueSeries.data.setAll(data);

// Set main value series
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting\_main\_series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll(\[valueSeries\]);

/\*\*
 \* Secondary (volume) panel
 \*/

// Create a main stock panel (chart)
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Adding\_panels
var volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30)
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var volumeValueAxis = volumePanel.yAxes.push(am5xy.ValueAxis.new(root, {
  numberFormat: "#.#a",
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var volumeDateAxis = volumePanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
  name: "STCK",
  valueXField: "Date",
  valueYField: "Volume",
  xAxis: volumeDateAxis,
  yAxis: volumeValueAxis,
  legendValueText: "{valueY}"
}));

volumeSeries.data.setAll(data);

// Set main value series
// https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting\_main\_series
stockChart.set("volumeSeries", volumeSeries);


// Add a stock legend
// https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
var volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
volumeLegend.data.setAll(\[volumeSeries\]);


// Add cursor(s)
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: valueAxis,
  xAxis: dateAxis,
  snapToSeries: \[valueSeries\],
  snapToSeriesBy: "y!"
}));

volumePanel.set("cursor", am5xy.XYCursor.new(root, {
  yAxis: volumeValueAxis,
  xAxis: volumeDateAxis,
  snapToSeries: \[volumeSeries\],
  snapToSeriesBy: "y!"
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));
stockChart.toolsContainer.children.push(scrollbar);

var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var sbValueAxis = scrollbar.chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
  valueYField: "Close",
  valueXField: "Date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});

sbSeries.data.setAll(data);
</script>


## Advanced functionality

### Indicators

Stock chart comes with a number of most popular stock indicators built-in. These are special series, that provide analysis of data in existing value and volume main series.

Refer to "[Indicators](https://www.amcharts.com/docs/v5/charts/stock/indicators/)" tutorial for further information.

### Drawing/annotation tools

Provided are also various drawing and annotation tools, accessible via API and built-in toolbar.

Those include basic annotations like adding basic shapes and text, as well as advanced analytical tools, like drawing trend lines.

Refer to "[Stock annotations](https://www.amcharts.com/docs/v5/charts/stock/stock-annotations/)" tutorial for further information.

### Toolbar

Stock chart also includes a special pre-made toolbar, which can be used as graphical user interface to select drawing tools, add indicators and comparisons, control chart zoom and granularity, types, etc.

Refer to "[Stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/)" tutorial for further information.

### Percent mode

If turned on, stock chart can switch to a "percent change mode" when comparison series are added, or when switched on via API.

Refer to "[Percent mode](https://www.amcharts.com/docs/v5/charts/stock/percent-mode/)" tutorial for further information.

### Zoom behavior

Stock chart works differently when mouse wheel is used over its panels. It will zoom in and out using right side of the panel(s) as a reference point, i.e. the right-most position will stay fixed while the right side is zoomed out or in.

If we'd like to revert to default functionality, where zooming is centered around actual position of the mouse cursor, we need to reset `wheelZoomPositionX` on all of our panels:

let volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30),
  wheelZoomPositionX: null
}));

var volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30),
  wheelZoomPositionX: null
}));

## Related tutorials

-   [Infinite dynamic data loading on Stock Chart](https://www.amcharts.com/docs/v5/tutorials/infinite-dynamic-data-loading-on-stock-chart/)
