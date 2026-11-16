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

Example: [Using exporting API](https://docs.amcharts.com/embeds/v5/using-exporting-api/). Its code: get_example(path: "examples/docs-demos/using-exporting-api").

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

Example: [Using exporting API](https://docs.amcharts.com/embeds/v5/using-exporting-api-2/). Its code: get_example(path: "examples/docs-demos/using-exporting-api-2").

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

Example: [Display chart's data in an HTML table](https://docs.amcharts.com/embeds/v5/display-charts-data-in-an-html-table/). Its code: get_example(path: "examples/docs-demos/display-charts-data-in-an-html-table").
