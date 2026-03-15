---
title: "Data placeholders"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/"
scraped: "2026-03-15"
---

Data placeholders are special codes in strings, enclosed in curly brackets, that are replaced with actual data or a value of property/setting of a target element or its ancestor.

## Placeholders in labels

Data placeholders are represented by a name enclosed in a curly bracket, e.g. `{valueY}`.

They can go into any place of the `text` setting of a `Label`.

When encountered a placeholder, a label will look for such name in the following order:

1.  Its data item properties (if available).
2.  Its data context (if available).
3.  Its own settings and properties.
4.  Settings and properties of its parent elements.

Here's an example of a data placeholder used in the series tooltip:

let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{name}\\n{valueX}: {valueY}");

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{name}\\n{valueX}: {valueY}");

The above is most likely result in:

-   `{name}` will be replaced with the parent series' `name` setting.
-   `{valueX}` will be extracted from elements data item.
-   `{valueY}` will be extracted from elements data item.

## Multi-level placeholders

Placeholders can access any property of the element's object, at any level, by using dot notation in its name, e.g.:

tooltip.label.set("text", "{foo.bar}");

tooltip.label.set("text", "{foo.bar}");

The above will look up `foo` in all of the mentioned places, will check if it's an object, then will look up `bar` among its properties.

This is useful, when we have custom objects in data, e.g.:

\[{
  category: "A1",
  value: 100,
  foo: {
    bar: "Hello"
  }
}, {
  category: "A2",
  value: 200,
  foo: {
    bar: "Hola"
  }
}\]

## Formatting placeholders

Normally, placeholder will be replaced with a raw value, converted to a string, which might not be the best scenario for numbers or date/time which we might need to format in a certain way.

### Setting global formats

We can use [global formatters](https://www.amcharts.com/docs/v5/concepts/formatters/#Global_formatters) to automatically apply formats to our placeholders.

To make that work, we need to set up formatters for two things:

-   Format to use.
-   Fields to apply format to.

Formatter

Format setting

Field setting

`root.numberFormatter`

`numberFormat` (string)

`numericFields` (array of strings)

`root.dateFormatter`

`dateFormat` (string)

`dateFields` (array of strings)

`root.durationFormatter`

`durationFormat` (string)

`durationFields` (array of strings)

Here's an example:

root.numberFormatter.setAll({
  numberFormat: "#,###.00",
  numericFields: \["valueY"\]
});

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: \["valueX"\]
});

root.durationFormatter.setAll({
  baseUnit: "second",
  durationFormat: "mm:ss",
  durationFields: \["valueY"\]
});

root.numberFormatter.setAll({
  numberFormat: "#,###.00",
  numericFields: \["valueY"\]
});

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: \["valueX"\]
});

root.durationFormatter.setAll({
  baseUnit: "second",
  durationFormat: "mm:ss",
  durationFields: \["valueY"\]
});

### In-line formatting

We can use in-line formatting functions `formatNumber()`, `formatDate()`, and `formatDuration()` within the placeholder, too.

let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueX.formatDate()}: {valueY.formatNumber()}");

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueX.formatDate()}: {valueY.formatNumber()}");

This negates the need to use `numericFields` or `dateFields` as placeholder now carries specific instruction which formatter to use on its value.

Using in-line functions, we can also specify the format:

let tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueX.formatDate('yyyy-MM-dd')}: {valueY.formatNumber('#.000')}");

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueX.formatDate('yyyy-MM-dd')}: {valueY.formatNumber('#.000')}");

This will make formatter use specific format, regardless of the global setting.
