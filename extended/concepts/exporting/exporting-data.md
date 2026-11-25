---
title: "Exporting data"
source: "https://docs.amcharts.com/v5/concepts/exporting/exporting-data/"
scraped: "2026-11-25"
---

> This tutorial looks at configuration options for data export with Exporting plugin.

This tutorial looks at configuration options for data export with [Exporting](https://docs.amcharts.com/v5/concepts/exporting/) plugin.

## Setting data to export

In order for exporting plugin to be able to export data, we need to set its `dataSource` setting.

It can be any array of objects, but most probably we'll want to set it to the same value we are using to feed data to series.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});
```

If `dataSource` is set, export menu will automatically include data-related exports, like CSV and XLSX.

![Export menu with only image formats and Print](https://docs.amcharts.com/v5/images/concepts/exporting/exporting-data/export_no_data.png "`dataSource` not set")

![Export menu with image formats plus JSON, CSV, XLSX, PDF and HTML data options](https://docs.amcharts.com/v5/images/concepts/exporting/exporting-data/export_data.png "`dataSource` is set")

## Numeric values

Normally, the plugin will export values as they are in data.

We can specify which fields in data hold numeric values and what format to use to format them using `numericFields` setting, which is an array of keys, as well as `numberFormat` setting which specify number format to use.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  numericFields: ["value", "value2"],
  numberFormat: "#,###.00"
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  numericFields: ["value", "value2"],
  numberFormat: "#,###.00"
});
```

> **Note:** Number format will not be applied when exporting to JSON format.

For available number formatting syntax, refer to "[Formatting numbers](https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/)" tutorial.

## Date/time

Similarly, we can also use `dataFields` to specify keys in data holding date/time information, and `dateFormat` setting to use when formatting those values.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd"
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd"
});
```

For available date/time formatting syntax, refer to "[Formatting dates](https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/)" tutorial.

## Data columns

We can also control which columns and in what order data will be exported, as well as override column names using two settings `dataFields` and `dataFieldsOrder`.

`dataFields` is an object which identifies which columns to include (object key) and how to name their column (value).

If `dataFields` is set, only those columns that are included in it, will be exported. If it's not set, all columns from source data will be exported.

`dataFieldsOrder` is an array of keys. When exporting, the columns will be sorted in the same order as the keys in the `dataFieldsOrder`.

Contrary to `dataFields`, not including a column in `dataFieldsOrder` will not omit it from export, just place it at the end.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  dataFields: {
    value: "Value (USD)",
    value2: "Value (EUR)",
    date: "Date"
  },
  dataFieldsOrder: ["value", "value", "date"]
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data,
  dataFields: {
    value: "Value (USD)",
    value2: "Value (EUR)",
    date: "Date"
  },
  dataFieldsOrder: ["value", "value", "date"]
});
```

Example: [Exporting data](https://docs.amcharts.com/embeds/v5/exporting-data/). Its code: get_example(path: "examples/docs-demos/exporting-data").

## Altering data

### Modifying source data

When exporting data, plugin will pre-process it: apply number/date formatting, sorting, column selection, etc.

Once that is done, plugin will invoke `dataprocessed` event, passing in processed data to possible event handlers.

At this point, we still have a chance to modify the data any way we want, e.g.:

TypeScript:

```ts
exporting.events.on("dataprocessed", function(ev) {
  for(var i = 0; i < ev.data.length; i++) {
    ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
  }
});
```

JavaScript:

```js
exporting.events.on("dataprocessed", function(ev) {
  for(var i = 0; i < ev.data.length; i++) {
    ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
  }
});
```

The above will add an additional column "sum" to exported data, with automatically-calculated sum from two other columns in data.

Example: [Exporting data with custom menu](https://docs.amcharts.com/embeds/v5/exporting-data-with-custom-menu/). Its code: get_example(path: "examples/docs-demos/exporting-data-with-custom-menu").

> **Note:** Be careful modifying data `dataSource` reuses same variable as actual series on the chart. Altering data considerably might affect chart's appearance.

If we need to considerably alter data that is also used for series, we need to build a new array in `dataprocessed` handler, then assign it back to `event.data`:

TypeScript:

```ts
exporting.events.on("dataprocessed", function(ev) {
  // This will override export data, but will not modify original data source
  ev.data = [{
    foo: "bar"
  }, {
    moo: "boo"
  }]
});
```

JavaScript:

```js
exporting.events.on("dataprocessed", function(ev) {
  // This will override export data, but will not modify original data source
  ev.data = [{
    foo: "bar"
  }, {
    moo: "boo"
  }]
});
```

### Modifying XLSX

Export plugin uses [SheetJS js-xlsx](https://github.com/sheetjs/sheetjs) library to generate XLSX documents.

When export is initiated, an xlsx workbook is created and populated with formatting options and data.

Before it is converted to an actual xlsx file and streamed to user, an event kicks in: `workbookready`.

At this point, we can still modify contents of the document.

TypeScript:

```ts
exporting.events.on("workbookready", function(event) {
  // Modify event.workbook which is an xlsx workbook
  // ...
});
```

JavaScript:

```js
exporting.events.on("workbookready", function(event) {
  // Modify event.workbook which is an xlsx workbook
  // ...
});
```

The event object passed into `workbookready` handler will contain three properties, that we may need to modify the output:

* `workbook` - an XLSX [workbook object](https://github.com/sheetjs/sheetjs#workbook-object).
* `workbookOptions` - XLSX [workbook options](https://github.com/sheetjs/sheetjs#writing-options).
* `xlsx` - an instance of XLSX library itself.

To modify contents of the output document, we'll need to modify properties of the `event.workbook`.

For complete information on how to populate workbook object, refer to [SheetJS docs](https://github.com/sheetjs/sheetjs#workbook-object).

The following will add additional work sheet to output document:

TypeScript:

```ts
exporting.events.on("workbookready", function(event) {
  event.workbook.SheetNames.push("Data 2");
  event.workbook.Sheets["Data 2"] = event.xlsx.utils.aoa_to_sheet([
    [ "Hello", "world" ],
    [ "Hello", "world" ],
    [ "Hello", "world" ],
  ]);
});
```

JavaScript:

```js
exporting.events.on("workbookready", function(event) {
  event.workbook.SheetNames.push("Data 2");
  event.workbook.Sheets["Data 2"] = event.xlsx.utils.aoa_to_sheet([
    [ "Hello", "world" ],
    [ "Hello", "world" ],
    [ "Hello", "world" ],
  ]);
});
```

Example: [Custom XLSX export](https://docs.amcharts.com/embeds/v5/custom-xlsx-export/). Its code: get_example(path: "examples/docs-demos/custom-xlsx-export").
