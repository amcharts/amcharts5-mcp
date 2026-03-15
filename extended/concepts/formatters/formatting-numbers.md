---
title: "Formatting numbers"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/"
scraped: "2026-03-15"
---

This tutorial takes a look at number formatter - helper object used to format numbers throughout the chart.

## Formatter object

Number formatter object is accessible globally via chart [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element)'s `numberFormatter` property.

We can use it to set `numberFormat`, as well as a few of other related settings, which will be used whenever number needs to be formatted in the chart.

## Where is it used?

Number formatter is used in a number of places throughout the chart.

Some components like value axis and legend use their own logic to apply number formatting.

Labels (e.g. in tooltips) with numeric [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) will turn to number formatter to format their values.

Data export functionality will also use number formatter to format its output of numeric values.

## Global number format

### Default format

A global number formatter will already have its `numberFormat` set to a default value, which may depend on the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) your chart is using.

### Setting default format

Number format is set via formatter's `numberFormat` setting:

root.numberFormatter.set("numberFormat", "#,###.00");

root.numberFormatter.set("numberFormat", "#,###.00");

### Formatting data placeholders

The values that will be shown in place of the placeholder will be formatted according to formatting settings as set out in global formatters or in-line functions.

We can set names of the data placeholders that hold numbers and need to be formatted as such via global formatter's `numericFields` setting:

root.numberFormatter.setAll({
  numberFormat: "#,###.00",
  numericFields: \["valueY"\]
});

root.numberFormatter.setAll({
  numberFormat: "#,###.00",
  numericFields: \["valueY"\]
});

For more information on how it works, please refer to "[Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)" tutorial.

## Format codes

Number formatting in amCharts is loosely based on Unicode standard.

Code

Description

#

Indicates passive number. Formatter will round to a number of #’s but will not pad with zeros.  
Example format: `#.##`  
`1.125` > `1.13`  
`1.5` > `1.5`

0 (zero)

Active number. Formatter will round decimals to a number of zeros. If the length of decimals or integers is less than number of active numbers, the formatter will pad the number with zeros.   Example format: `00.00` `1.125` > `01.13`  
`1.5` > `01.50`

. (dot)

Indicates a decimal place.   Important: if dot is missing, the formatter will not round or format decimals, and will display the number as is. This may result in large numbers. If the number format ends with a dot, the number will be rounded to the nearest integer.  
  
Example format: `#.`  
`1.125` > `1`  
`1.5` > `2`  
  
Example format: `#`  
`1.125` > `1.125`  
`1.5` > `1.5`

, (comma)

Indicates thousand separator place. This is used to determine home many digits to consider a "thousand". Only the rightmost comma will be used.  
  
Example format: `#,###`  
`12345` > `1,2345`  
`123456789` > `1,2345,6789`

e

Convert the number into scientific (exponential) format.   Important: Must go at the end of the format.  
  
Example format: `#.##e`  
`77.1234` > `7.71e+1`  
`123456789` > `1.23e+8`  
`0.0000000123` > `1.23e-8`

a

Recalculates very big and very small numbers by reducing their length according to rules and applying suffix/prefix.   Important: Must go at the end of the format. The suffixes ("K", "M", "G", etc.) are translatable via language files.  
  
Example format: `#.0a`  
`1000` > `1.0K`  
`5500` > `5.5K`  
`5000000` > `5.0M`  
`5000000000` > `5.0G`  
`0.0015` > `1.5m`  
`0.0000015` > `1.5μ`  
`0.0000000015` > `1.5n`  
  
Refer to "[Large and small numbers](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/#Large_and_small_numbers)" section for more info.

b

Recalculate to kilobytes, megabytes, etc. and add corresponding suffix.   Important: Must go at the end of the format. The suffixes ("KB", "MB", "GB", etc.) are translatable via language files.  
  
Example format: `#.0b`  
`1024` > `1.0KB`  
`5000` > `4.9KB`  
`500000` > `488.3KB`  
`500000000` > `476.8MB`  
  
Refer to "[Byte size modifier](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/#Byte_size_modifier)" section for more info.

s

Display an absolute number. (without the minus sign)   Important: Must go at the end of the format.  
  
Example format: `#.0s`  
`1000` > `1.0`  
`-1000` > `1.0`

‘ (single quote)

Enclose any text you don’t want to be parsed for format options into quotes quotes. It will be included in the formatted output as is. (minus the the quotes)   If you need to display actual single quote, include it twice. This works both within and outside quoted text.  
  
Example format: `'The value is:' #,###.00 '(in million US$)'`  
`1000` > `The value is: 1,000.00 (in million US$)`

%

Multiple the number by 100 and display as percentage. A percent sign will be added either before or after the number, as per locale.

‰

Multiple the number by 1000 and display as per mile

p

Same as "%" except value is not multiplied by 100. A percent sign will be added either before or after the number, as per locale.

!

Works only in conjunction with `a` and `b` modifiers. If present it will "force" application of the minimum/maximum prefixes even if the number does not fit into smallest denomination, e.g. `500` as `"0.5K"`.  

### Examples

Format

Input value

Output

`#,###.##`

1000.125

1,000.13

`#,###.00`

1000

1,000.00

`000.00`

10

010.00

## Positive/negative numbers

To apply different formatting to positive, negative and zeros, use | (vertical bar) to separate formats. (in that order).

`[positive format] | [negative format] | [zero format]`

Format

Input value

Output

`#,###|(#,###s)|'-'`

1000

1000

`#,###|(#,###s)|'-'`

\-1000

(1000)

`#,###|(#,###s)|'-'`

0

\-

## Large and small numbers

### Large/small number modifier

The grouping of digits is turned on with an `"a"` modifier in the number format.

Format

Input value

Output

`#a`

1000

1k

`# a`

1000

1 k

`#a`

1000000

1M

`#a`

0.001

1m

`# a`

0.001

1 m

`#a`

0.000001

1μ

The actual suffixes added after formatted number may depend on the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) your chart is using.

NOTE A modifier can be preceded with a space character. If it is, the space will be added before the actual suffix as well.

### Custom big/small number grouping

We can modify which particular large and small number groups numbers are grouped into using formatters' `bigNumberPrefixes` and `smallNumberPrefixes` settings:

root.numberFormatter.setAll({
  numberFormat: "#a",
  
  // Group only into M (millions), and B (billions)
  bigNumberPrefixes: \[
    { "number": 1e+6, "suffix": "M" },
    { "number": 1e+9, "suffix": "B" }
  \],

  // Do not use small number prefixes at all
  smallNumberPrefixes: \[\]
});

root.numberFormatter.setAll({
  numberFormat: "#a",
  
  // Group only into M (millions), and B (billions)
  bigNumberPrefixes: \[
    { "number": 1e+6, "suffix": "M" },
    { "number": 1e+9, "suffix": "B" }
  \],

  // Do not use small number prefixes at all
  smallNumberPrefixes: \[\]
});

### Small number threshold

Normally, any number less than `1` (one) is treated as a small number.

We can change it using formatters `smallNumberThreshold` setting:

root.numberFormatter.setAll({
  numberFormat: "#a",
  smallNumberThreshold: 0.001
});

root.numberFormatter.setAll({
  numberFormat: "#a",
  smallNumberThreshold: 0.001
});

The above means that regardless of `smallNumberPrefixes`, small number format will not be applied unless number is less than `0.001`.

## Byte size modifier

Modifier `"b"` can be used to format byte size number grouping.

Format

Input value

Output

`#.0b`

1024

1.0KB

`#.0b`

5000

4.9KB

`#.0b`

500000

488.3KB

`#.0b`

500000000

476.8MB

The actual suffixes added after formatted number may depend on the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) your chart is using.

### Custom byte groups

We can modify byte groups using formatters' `bigNumberPrefixes` and `smallNumberPrefixes` settings:

root.numberFormatter.setAll({
  numberFormat: "#.0b",
  
  // Group only into MB (megabytes), and GB (gigabytes)
  bytePrefixes: \[
    { "number": 1048576, "suffix": "MB" },
    { "number": 1073741824, "suffix": "GB" }
  \]
});

root.numberFormatter.setAll({
  numberFormat: "#.0b",
  
  // Group only into MB (megabytes), and GB (gigabytes)
  bytePrefixes: \[
    { "number": 1048576, "suffix": "MB" },
    { "number": 1073741824, "suffix": "GB" }
  \]
});

## Styling text

Text formats can also include in-line styling instructions:

root.numberFormatter.set("numberFormat", "\[bold\]#,###.00");

root.numberFormatter.set("numberFormat", "\[bold\]#,###.00");

Format

Input value

Output

`[#0f0]#,###`

1000

1000

`[#0f0]#,###|[#f00](#,###)|[#ccc]'-'`

1000

1000

`[#0f0]#,###|[#f00](#,###)|[#ccc]'-'`

\-1000

(1000)

`[#0f0]#,###|[#f00](#,###)|[#ccc]'-'`

0

\-

Please refer to the "[Text styling](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/)" and "[Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)" tutorials for more info.

## Escaping

### Quotes

To explicitly make formatter  ignore a portion of text, enclose it within single quotes:

`'Element # is' #.000`

The `"Element # is"` above will not be parsed when being processed by NumberFormatter. It will be left as is:

`Element # is 12.000`

Any text enclosed in single quotes will be displayed as is, without applying formatting to it.

To use a single quote (either within quoted text or outside it) add single quote twice:

`'Element ''#'' is' #.000`

Will result in:

`Element '#' is 12.000`

### Vertical bar

As we saw earlier in this article,  a vertical bar "|" in number formats represents different version of the format to be applied for negative, positive and zero values.

If you need to explicitly use a vertical bar in your formatted text, just like with quotes, escape it with an additional vertical bar:

`Positive || #,###|Negative ||(#,###a)|'-'`

### Square and curly brackets

Square and curly brackets have special meaning in formatting text labels as well.

Please refer to the "[Text styling and data binding](https://www.amcharts.com/docs/v5/concepts/formatters/in-line/)" tutorial for more info.

## Using Intl object formats

Number formats can be specified using JavaScript's built-in `Intl` object. Please refer to "[Formatting date/time and numbers using “Intl” object](https://www.amcharts.com/docs/v5/tutorials/formatting-date-time-and-numbers-using-intl-object/)" for further information.

## Formats on a value axis

Value axis has two additional settings that can be used to set number format for the axis alone, without affecting the rest of the chart: `numberFormat` and `tooltipNumberFormat`.

For more information on how to use them, refer to "Value axis: [Label format](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Label_format)" and "Value axis: [Tooltip number format](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/value-axis/#Tooltip_number_format)".
