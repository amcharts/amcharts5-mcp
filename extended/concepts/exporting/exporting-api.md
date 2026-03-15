---
title: "Exporting API"
source: "https://www.amcharts.com/docs/v5/concepts/exporting/exporting-api/"
scraped: "2026-03-15"
---

All export operations are accessible not only via export menu, but also via plugin API.

## API methods

Export operations are handled via export plugin instance's methods, such as `download()`, which initiates download of the exported image or data file, or via methods that return raw or encoded image/data, like `getImage()`, `getPDF()`, `getCSV()`, etc.

Complete list of methods is available in [`Exporting` reference](https://www.amcharts.com/docs/v5/reference/exporting/#Methods).

There are few kinds of API methods for initiating download, returning data uri representation, or raw data.

## Download/print

This is the same operation that happens when export menu item is clicked: a download or print is triggered.

To initiate such action, we can use `[download()](https://www.amcharts.com/docs/v5/reference/exporting/#download_method)` or `[print()](https://www.amcharts.com/docs/v5/reference/exporting/#print_method)` methods.

function downloadChartImage {
  exporting.download("png");
}

function printChart() {
  exporting.print();
}

function downloadChartImage {
  exporting.download("png");
}

function printChart() {
  exporting.print();
}

Both of those methods accept parameter with format options, should we want to override defaults or [custom format options](https://www.amcharts.com/docs/v5/concepts/exporting/#Configuring_formats).

exporting.download("png", {
  minWidth: 1000,
  maxWidth: 2000
});

exporting.download("png", {
  minWidth: 1000,
  maxWidth: 2000
});

## Data uri

Data uri form of data is suitable for use right away. For example you can use it exported image as an `src` attribute of an `<img>` tag, or stream it as binary.

For getting export in data uri format we have `export*()` format-specific methods, for example `exportImage()`.

These functions are asynchronous, so they will return a `Promise` instead of real data right away. We need to handle it accordingly:

exporting.export("png").then(function(imgData) {
  document.getElementById("myImage").src = imgData;
});

exporting.export("png").then(function(imgData) {
  document.getElementById("myImage").src = imgData;
});


## Raw data

In some cases - especially with data export - we may need textual/raw data, rather than binary-encoded string.

For that exporting plugin offers `get***()` methods, e.g. `getCSV()`.

exporting.getCSV().then(function(csvData) {
  document.getElementById("myData").innerHTML = csvData;
});

exporting.getCSV().then(function(csvData) {
  document.getElementById("myData").innerHTML = csvData;
});


## Data as an HTML table

### Getting HTML

We can use exporting plugin's `getHTML()` methgod can also export its data as a raw HTML table markup.

The following snippet will grab chart's data as an HTML, then will insert a `<div>` element right after the chart itself, and populate it with the table:

exporting.getHTML().then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});

exporting.getHTML().then(function(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  root.dom.parentNode.insertBefore(div, root.dom.nextSibling);
});

### Styling the table

Normally, `getHTML()` will return a plain table without any styling or class names.

We can use HTML export format options to make it apply certain class names to specific elements of the table, namely its `<table>`, `<tr>`, `<th>`, and `<td>` tags.

That can be done either by [setting format options](https://www.amcharts.com/docs/v5/concepts/exporting/#configuring-formats) on the exporting object, or passing it in via parameter in `getHTML()`.

let exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
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

var exporting = am5plugins\_exporting.Exporting.new(root, {
  menu: am5plugins\_exporting.ExportingMenu.new(root, {}),
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

Or, we can pass it in via `getHTML()`:

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

After that, we can use page's CSS to style our table the way we see fit, e.g.:

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

### Table example


