---
title: "Exporting API"
source: "https://docs.amcharts.com/v5/concepts/exporting/exporting-api/"
scraped: "2026-11-16"
---

All export operations are accessible not only via export menu, but also via plugin API.

## API methods

Export operations are handled via export plugin instance's methods, such as `download()`, which initiates download of the exported image or data file, or via methods that return raw or encoded image/data, like `getImage()`, `getPDF()`, `getCSV()`, etc.

Complete list of methods is available in [`Exporting` reference](https://docs.amcharts.com/v5/reference/exporting/#methods).

There are few kinds of API methods for initiating download, returning data uri representation, or raw data.

## Download/print

This is the same operation that happens when export menu item is clicked: a download or print is triggered.

To initiate such action, we can use `download()` or `print()` methods.

TypeScript:

```ts
function downloadChartImage {
  exporting.download("png");
}

function printChart() {
  exporting.print();
}
```

JavaScript:

```js
function downloadChartImage {
  exporting.download("png");
}

function printChart() {
  exporting.print();
}
```

Both of those methods accept parameter with format options, should we want to override defaults or [custom format options](https://docs.amcharts.com/v5/concepts/exporting/#configuring-formats).

TypeScript:

```ts
exporting.download("png", {
  minWidth: 1000,
  maxWidth: 2000
});
```

JavaScript:

```js
exporting.download("png", {
  minWidth: 1000,
  maxWidth: 2000
});
```

## Data uri

Data uri form of data is suitable for use right away. For example you can use it exported image as an `src` attribute of an `<img>` tag, or stream it as binary.

For getting export in data uri format we have `export*()` format-specific methods, for example `exportImage()`.

These functions are asynchronous, so they will return a `Promise` instead of real data right away. We need to handle it accordingly:

TypeScript:

```ts
exporting.export("png").then(function(imgData) {
  document.getElementById("myImage").src = imgData;
});
```

JavaScript:

```js
exporting.export("png").then(function(imgData) {
  document.getElementById("myImage").src = imgData;
});
```

The same works for SVG: use `export("svg")` or `exportSVG()`.

Example: [Using exporting API](https://docs.amcharts.com/embeds/v5/using-exporting-api/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<div id="chartdiv"></div>

<p><img id="myImage" /></p>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 250px;
}

#myImage {
  width: 100%;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 690
  },
  {
    category: "Marketing",
    value: 1000
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 400,
    max: 1400,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  })
);

series.data.setAll(data);

// Create custoim state on columns
series.columns.template.states.create("off", {
  fillOpacity: 0.1,
  strokeOpacity: 0.1
});

series.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

series.columns.template.events.on("click", function (ev) {
  if (ev.target.get("fillOpacity") !== 1) {
    ev.target.states.applyAnimate("default");
  } else {
    ev.target.states.applyAnimate("off");
  }
});

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

setTimeout(function () {
  exporting.export("png").then(function (imgData) {
    document.getElementById("myImage").src = imgData;
  });
}, 2000);
```

## Raw data

In some cases - especially with data export - we may need textual/raw data, rather than binary-encoded string.

For that exporting plugin offers `get***()` methods, e.g. `getCSV()`.

TypeScript:

```ts
exporting.getCSV().then(function(csvData) {
  document.getElementById("myData").innerHTML = csvData;
});
```

JavaScript:

```js
exporting.getCSV().then(function(csvData) {
  document.getElementById("myData").innerHTML = csvData;
});
```

`getSVG()` returns the chart as SVG markup, which can be placed straight into the page:

TypeScript:

```ts
exporting.getSVG().then(function(svg) {
  document.getElementById("mySnapshot").innerHTML = svg;
});
```

JavaScript:

```js
exporting.getSVG().then(function(svg) {
  document.getElementById("mySnapshot").innerHTML = svg;
});
```

> **More info:** For SVG options, and exporting SVG without the plugin, see "[Exporting to SVG](https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/)".

Example: [Using exporting API](https://docs.amcharts.com/embeds/v5/using-exporting-api-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<div id="chartdiv"></div>

<p><textarea id="myData"></textarea></p>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 250px;
}

#myData {
  width: 100%;
  height: 200px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 690
  },
  {
    category: "Marketing",
    value: 1000
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 400,
    max: 1400,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  })
);

series.data.setAll(data);

// Create custoim state on columns
series.columns.template.states.create("off", {
  fillOpacity: 0.1,
  strokeOpacity: 0.1
});

series.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

series.columns.template.events.on("click", function (ev) {
  if (ev.target.get("fillOpacity") !== 1) {
    ev.target.states.applyAnimate("default");
  } else {
    ev.target.states.applyAnimate("off");
  }
});

var exporting = am5plugins_exporting.Exporting.new(root, {
  dataSource: data,
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

setTimeout(function () {
  exporting.getCSV().then(function (csvData) {
    document.getElementById("myData").innerHTML = csvData;
  });
}, 2000);
```

## Data as an HTML table

### Getting HTML

We can use exporting plugin's `getHTML()` methgod can also export its data as a raw HTML table markup.

The following snippet will grab chart's data as an HTML, then will insert a `<div>` element right after the chart itself, and populate it with the table:

TypeScript:

```ts
exporting.getHTML().then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});
```

JavaScript:

```js
exporting.getHTML().then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});
```

### Styling the table

Normally, `getHTML()` will return a plain table without any styling or class names.

We can use HTML export format options to make it apply certain class names to specific elements of the table, namely its `<table>`, `<tr>`, `<th>`, and `<td>` tags.

That can be done either by [setting format options](https://docs.amcharts.com/v5/concepts/exporting/#configuring-formats) on the exporting object, or passing it in via parameter in `getHTML()`.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  htmlOptions: {
    emptyAs: "-",
    addColumnNames: true,
    tableClass: "chart-data",
    rowClass: "chart-data-row",
    headerClass: "chart-data-header",
    cellClass: "chart-data-cell"
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  htmlOptions: {
    emptyAs: "-",
    addColumnNames: true,
    tableClass: "chart-data",
    rowClass: "chart-data-row",
    headerClass: "chart-data-header",
    cellClass: "chart-data-cell"
  }
});
```

Or, we can pass it in via `getHTML()`:

TypeScript:

```ts
exporting.getHTML({
  tableClass: "chart-data",
  rowClass: "chart-data-row",
  headerClass: "chart-data-header",
  cellClass: "chart-data-cell"
}).then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});
```

JavaScript:

```js
exporting.getHTML({
  tableClass: "chart-data",
  rowClass: "chart-data-row",
  headerClass: "chart-data-header",
  cellClass: "chart-data-cell"
}).then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});
```

After that, we can use page's CSS to style our table the way we see fit, e.g.:

```css
.chart-data {
  width: 100%;
}

.chart-data thead .chart-data-cell {
  background: #777;
  color: #fff;
}

.chart-data tbody .chart-data-cell {
  text-align: center;
}

.chart-data tbody .chart-data-row:nth-child(even) .chart-data-cell {
  background: #eee;
}
```

### Table example

Example: [Display chart's data in an HTML table](https://docs.amcharts.com/embeds/v5/display-charts-data-in-an-html-table/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}

.chart-data {
  width: 100%;
}

.chart-data thead .chart-data-cell {
  background: #777;
  color: #fff;
}

.chart-data tbody .chart-data-cell {
  text-align: center;
}

.chart-data tbody .chart-data-row:nth-child(even) .chart-data-cell {
  background: #eee;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  return series;
}

var series1 = createSeries("Series #1", "value");
var series2 = createSeries("Series #2", "value2");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  numericFields: ["value", "value2"],
  numberFormat: "#,###.00",
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd",
  dataFields: {
    value: "Value (USD)",
    value2: "Value (EUR)",
    date: "Date"
  },

  dataFieldsOrder: ["value", "value", "date"],
  htmlOptions: {
    emptyAs: "-",
    addColumnNames: true,
    tableClass: "chart-data",
    rowClass: "chart-data-row",
    headerClass: "chart-data-header",
    cellClass: "chart-data-cell"
  }
});

// Set up export of data as an HTML table
exporting.getHTML().then(function (html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});
```
