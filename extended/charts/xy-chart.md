---
title: "XY chart"
source: "https://www.amcharts.com/docs/v5/charts/xy-chart/"
scraped: "2026-03-15"
---

XY chart is basically used to represent any linear or scatter data in two dimensions. This tutorial will get you started in creating these charts.

To keep it simple, we will touch only basic topics in this tutorial. For a list of advanced topics related to XY chart, check link section at the end of this page.

## Loading required modules

XY charts require two amCharts 5 modules: "index" and "xy".

You can import those in your TypeScript / ES6 application as JavaScript modules:

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";

For vanilla JavaScript applications and web pages, you can use "script" version:

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>

MORE INFO For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://www.amcharts.com/docs/v5/getting-started/)" tutorial.

## Instantiating the chart

As with any chart type in amCharts 5, we'll need to start with creation of the `Root` element.

In it we will create an instance of `XYChart` class.

let root = am5.Root.new("chartdiv");
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {})
);

var root = am5.Root.new("chartdiv");
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {})
);

MORE INFO The notion of creating class instances using `.new()` method is described in "[Creating a chart](https://www.amcharts.com/docs/v5/getting-started/#Creating_a_chart)" section in the "Getting started" tutorial. Make sure you check it out.

## Adding axes

An XY chart requires at least one horizontal (X) and one vertical (Y) axis, although it can support any number of axes.

The chart has two properties: `xAxes` and `yAxes` that hold instances of its X and Y axes respectively.

To add axes to chart we just push their instances to the respective list:

let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

The above will create an Y axis of type `ValueAxis`, which is used to indicate numeric value.

There are number of different axes types. We will examine those in subsequent sections.

### Axis renderer

The axis object itself provides logic functionality. It relies on a helper class to actually render it. That's where "renderer" comes in.

To put it differently, axis knows how to treat data, calculate scale, etc. It does not care about how it should be displayed.

Renderer, knows how to put the axis on screen.

For example, a `ValueAxis` on X would be drawn differently than on Y. That's why we need to specify a renderer, which "specializes" of displaying an axis in specific direction.

XY chart uses two types of renderers: `AxisRendererX` and `AxisRendererY`.

We used `AxisRendererY` for our previous example, because we were creating an Y axis, and we need to use a proper renderer that knows how to display such axis.

NOTE Other chart types that extend XY chart, such as Radar Chart will add additional renderer types, so that same axis types can be displayed in a number of different ways.

### Axis types

XY chart supports 4 axis types:

Class

Comment

`CategoryAxis`

For plotting data with string identifiers - categories.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-axis/)

`CategoryDateAxis`

For plotting time-based data without maintaining actual time scale. Grid/labels are displayed only where there is actual data.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/#Category_date_axis)

`DateAxis`

For plotting time-based data. The axis will maintain natural time scale regardless on how actual data points are spaced out.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/)

`ValueAxis`

For plotting numeric values.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/)

Some axis types require additional configuration besides renderer to work.

For example `CategoryAxis` needs `categoryField` which specifies a field in data that holds category names, as well as the actual data, so that it knows which categories to display:

let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    categoryField: "category"
  })
);
xAxis.data.setAll(\[{
  category: "Research"
}, {
  category: "Marketing"
}, {
  category: "Sales"
}\];

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    categoryField: "category"
  })
);
xAxis.data.setAll(\[{
  category: "Research"
}, {
  category: "Marketing"
}, {
  category: "Sales"
}\];

Similarly, `DateAxis` needs to know granularity of your data, set via `baseInterval` property:

let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    baseInterval: {
      timeUnit: "day",
      count: 1
    }
  })
);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    baseInterval: {
      timeUnit: "day",
      count: 1
    }
  })
);

MORE INFO For information on configuring and using each axis type, please refer to the dedicated "[Axes](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/)" tutorial, or click on an axis class name in the table above.

## Adding series

XY chart is a "serial" chart, meaning it needs at least one series to display anything.

As with anything else in amCharts 5, we create a series object using [`new()` method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax) of its class.

There is also a number of properties that need to be set for series, like its X and Y axis, as well as data fields.

We will look at those shortly, but here's a very basic example of `ColumnSeries` usage:

let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

Let's examine the above.

### Assigning series to axis

This is pretty much self-explanatory. We use series `xAxis` property to tell which axis object will be series X-axis, and `yAxis` to specify which axis is responsible for its Y plot.

Each series can have only one X and one Y axis, whereas an axis can have any number of series attached to it.

### Data fields

Since XY chart is a two-dimensional chart, each point in its series requires at least two values to be plotted: X and Y.

Data fields are used to specify which fields in data hold both of those values.

The name of the data field reflects its axis direction, as well as its type.

"value" indicates numeric value, including time.

"category" indicates string-based category.

The type of data field depends on the type of axis we are using.

For example, if we have a `ValueAxis` as a Y-axis, and a `CategoryAxis` as an X-axis, our series will need to define `valueYField` and `categoryXField`.

Depending on series type, it may need additional fields. For example `CandlestickSeries` needs four values, so it will need four data fields as well.

MORE INFO For more information about data fields refer to "[Data fields](https://www.amcharts.com/docs/v5/concepts/series/#Data_fields)" section in our "Series" tutorial.

### Types of series

XY chart currently supports these types of series:

Class

Comment

`CandlestickSeries`

Series that displays candles with open, high, low, and close values.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/)

`ColumnSeries`

Displays columns or bars.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/)

`LineSeries`

Displays lines or area.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/line-series/)

`OHLCSeries`

Series that displays sticks with open, high, low, and close values.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/candlestick-series/)

`SmoothedXLineSeries`

Displays smoothed lines or area with configurable horizontal tension.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/smoothed-series/)

`SmoothedXYLineSeries`

Displays smoothed lines or area with configurable horizontal and vertical tension.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/smoothed-series/)

`SmoothedYLineSeries`

Displays smoothed lines or area with configurable vertical tension.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/smoothed-series/)

`StepLineSeries`

Displays stepped line or area.

[More info](https://www.amcharts.com/docs/v5/charts/xy-chart/series/step-line-series/)

## Setting data

Data in XY chart is set directly to series. There is no chart-wide data storage.

For that, each series has a property named `data`, which in turn is an object that can be used to supply data.

The most common method for setting data is its `setAll()` method:

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

If we have more than one series, we will need to set data for each and everyone one of them, even if the data is identical.

That's why it makes sense to have repeating data in a separate variable. E.g.:

let data = \[{
  category: "Research",
  value1: 1000,
  value2: 588
}, {
  category: "Marketing",
  value1: 1200,
  value2: 1800
}, {
  category: "Sales",
  value1: 850,
  value2: 1230
}\];
series1.data.setAll(data);
series2.data.setAll(data);

var data = \[{
  category: "Research",
  value1: 1000,
  value2: 588
}, {
  category: "Marketing",
  value1: 1200,
  value2: 1800
}, {
  category: "Sales",
  value1: 850,
  value2: 1230
}\];
series1.data.setAll(data);
series2.data.setAll(data);

IMPORTANT It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

MORE INFO There's more ways to set, update, add, or load data. For more information please refer to our dedicated "[Data](https://www.amcharts.com/docs/v5/concepts/data/)" tutorial.

### Date-based data

A quick note about date-based charts (with a `DateAxis`): they expect data to be passed in as integer numbers - JavaScript timestamps (milliseconds elapsed since the UNIX epoch).

If you we have dates in any other format (as strings or `Date` objects), we'll need to set up a data processor to convert our dates to timestamps.

MORE INFO For description how it works, please refer to "[Date-based data](https://www.amcharts.com/docs/v5/concepts/data/#Date_based_data)" section in our "Data" tutorial.

## Additional controls

### Legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of XY chart, we will probably want to use series as legend items).

let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

MORE INFO For more information on how to configure the content for legend on an XY chart, refer to "[Legend and XY series](https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/)" tutorial. For generic tips on how to configure legend and its items, please visit our dedicated "[Legend](https://www.amcharts.com/docs/v5/concepts/legend/)" tutorial.

### Cursor

Adding chart cursor, which is a very useful tool, providing crosshairs and other functionality, like series and axis tooltips is pretty straightforward: we just need to create an instance of `XYCursor` (from "xy" module) and set it to chart's `cursor` property:

chart.set("cursor", am5xy.XYCursor.new(root, {}));

chart.set("cursor", am5xy.XYCursor.new(root, {}));

MORE INFO For more information on how to configure the chart cursor make sure you visit "[Cursor](https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/)" tutorial.

## Complete example

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";

// Create root and chart
let root = am5.Root.new("chartdiv");
let chart = root.container.children.push( 
  am5xy.XYChart.new(root, {
    panY: false,
    layout: root.verticalLayout
  }) 
);

// Define data
let data = \[{
  category: "Research",
  value1: 1000,
  value2: 588
}, {
  category: "Marketing",
  value1: 1200,
  value2: 1800
}, {
  category: "Sales",
  value1: 850,
  value2: 1230
}\];

// Create Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    categoryField: "category"
  })
);
xAxis.data.setAll(data);

// Create series
let series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);
series1.data.setAll(data);

let series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);
series2.data.setAll(data);

// Add legend
let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {}));

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>

<div id="chartdiv"></div>

<script>
// Create root and chart
var root = am5.Root.new("chartdiv"); 
var chart = root.container.children.push( 
  am5xy.XYChart.new(root, {
    panY: false,
    layout: root.verticalLayout
  }) 
);

// Define data
var data = \[{ 
  category: "Research", 
  value1: 1000, 
  value2: 588 
}, { 
  category: "Marketing", 
  value1: 1200, 
  value2: 1800 
}, { 
  category: "Sales", 
  value1: 850, 
  value2: 1230 
}\];

// Craete Y-axis
var yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {}) 
  }) 
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    categoryField: "category"
  })
);
xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value1", 
    categoryXField: "category" 
  }) 
);
series1.data.setAll(data);

var series2 = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: "Series", 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value2", 
    categoryXField: "category" 
  }) 
);
series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {})); 
legend.data.setAll(chart.series.values);

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {}));
</script>


## Configuring stuff

### Configuring axes

-   [Configuring axes](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/)
-   [Working with a Date axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/)
-   [Working with a Category axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-axis/)
-   [Working with a Value axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/)
-   [Working with Gapless Date axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/gapless-date-axis/)

### Configuring series

-   [Adding tooltips to series](https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Tooltips)
-   [Using date-based data](https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates)
-   [Loading external data](https://www.amcharts.com/docs/v5/concepts/data/#External_data)
-   [Smoothed series](https://www.amcharts.com/docs/v5/charts/xy-chart/series/smoothed-series/)

### Other topics

-   [Configuring zooming and panning](https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/)
-   [Configuring legend](https://www.amcharts.com/docs/v5/concepts/legend/)
-   [Configuring cursor](https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/)
-   [Using themes](https://www.amcharts.com/docs/v5/concepts/themes/)
