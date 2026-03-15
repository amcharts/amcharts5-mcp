---
title: "Formatters"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/"
scraped: "2026-03-15"
---

Formatters are helper objects that allow setting generic rules for tailoring text output - dates, numbers - with additional functionality of in-line styles.

Formatters are represented by their respective objects that are available globally in chart's [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element), and can also be set individually on each object.

## Global formatters

Each chart's root element comes with pre-created formatters accessible via properties `[numberFormatter](https://www.amcharts.com/docs/v5/reference/root/#numberFormatter_property)`, `[dateFormatter](https://www.amcharts.com/docs/v5/reference/root/#dateFormatter_property)`, and `[durationFormatter](https://www.amcharts.com/docs/v5/reference/root/#durationFormatter_property)`.

We can use those instances to set global settings such as number or date formats.

root.numberFormatter.set("numberFormat", "#,###.00");

root.numberFormatter.set("numberFormat", "#,###.00");

## Local formatters

In addition to global formatters, each element can have it's own number or date formatter, settable via `[numberFormatter](https://www.amcharts.com/docs/v5/reference/sprite/#numberFormatter_setting)`, `[dateFormatter](https://www.amcharts.com/docs/v5/reference/sprite/#dateFormatter_setting)`, and `[durationFormatter](https://www.amcharts.com/docs/v5/reference/sprite/#durationFormatter_setting)` settings.

This is useful, when we need to use formatting settings different from global ones, for a particular object, e.g. an axis:

yAxis.set("numberFormatter", am5.NumberFormatter.new(root, {
  "numberFormat": "#,###.00"
});

yAxis.set("numberFormatter", am5.NumberFormatter.new(root, {
  "numberFormat": "#,###.00"
});

If a formatter is set directly on an element setting, it will use local formatter instead of a global one.

## Formatter inheritance

Formatters are **not** inheritable.

This means that if an element parent does had local formatter set, its child will still use global formatter.

## Formatting text

### Applying number and date formats

Whenever needed, charts will turn to a respective formatter to format specific value, e.g. a number or a date.

For example, various axes types have their own logic on how to format numbers or dates, so they will use formatters for it.

For more information about number and date formats, refer to these tutorials:

-   [Formatting numbers](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/)
-   [Formatting date and time](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/)
-   [Formatting durations](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/)

### Data placeholders

Data placeholders are codes (names in curly brackets) in text that can be replaced with an actual value from data or objects settings. In some cases values, displayed in place of placeholders will need to be formatted. In such cases formatters will also be used.

Example of a data placeholder:

tooltip.label.set("text", "{name}\\n{valueX}: {valueY}");

tooltip.label.set("text", "{name}\\n{valueX}: {valueY}");

For more information about data placeholders, refer to this tutorial:

-   [Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)

### Text styling

Each text can contain in-line styling instructions, enclosed in square brackets.

Example, of an in-line styling being applied:

tooltip.label.set("text", "\[bold\]{name}\[/\]\\n{valueX}: {valueY}");

tooltip.label.set("text", "\[bold\]{name}\[/\]\\n{valueX}: {valueY}");

For more information about in-line text styling, refer to this tutorial:

-   [Text styling](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/)
