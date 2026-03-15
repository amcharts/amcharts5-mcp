---
title: "Formatting durations"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/"
scraped: "2026-03-15"
---

This tutorial takes a look at duration formatter - helper object used to format numbers as duration throughout the chart.

## Formatter object

Duration formatter object is accessible globally via chart [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element)'s `durationFormatter` property.

We can use it to set `durationFormat`, as well as a few of other related settings, that will be used whenever number needs to be formatted as a duration in the chart.

## Where is it used?

Duration formatter is used in a number of places throughout the chart.

The most notable user for duration formatter is a duration axis (`DurationAxis`).

Also, labels (e.g. in tooltips) with date [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) will turn to duration formatter to format their values where applicable.

Data export functionality will also use duration formatter to format its output of duration values.

## Global duration formats

### Base unit

Formatting duration from a numeric value requires knowledge of what the value represents.

It can represent millisecond, second, minute, hour, day, etc.

We call it a "base unit", and can set it globally using global duration formatter's `baseUnit` setting:

root.durationFormatter.set("baseUnit", "hour");

root.durationFormatter.set("baseUnit", "hour");

Available base unit values are: `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, and `"year"`.

### Default format

There are two ways to set duration formats on a duration formatter:

-   A universal duration format which will be applied to all values that need to be formatted as a duration.
-   A list of duration formats tailored for each base unit.

A global duration formatter will already have its `durationFormats` pre-set to a default values, that may depend on the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) your chart is using, whereas the universal duration format won't be set.

### Setting default format

If we want to set universal duration format throughout the chart, we can set formatter's `durationFormat` setting:

root.durationFormatter.set("durationFormat", "mm:ss");

root.durationFormatter.set("durationFormat", "mm:ss");

We can also override formats for specific base units by modifying its `durationFormats` setting:

root.durationFormatter.get("durationFormats")\["hour"\] = {
  hour: "hh'h'",
  day: "d'd' hh'h'",
  week: "d'd' hh'h'",
  month: "M'm' dd'd' hh'h'",
  year: "y'y' MM'm' dd'd' hh'h'"
}

root.durationFormatter.get("durationFormats")\["hour"\] = {
  hour: "hh'h'",
  day: "d'd' hh'h'",
  week: "d'd' hh'h'",
  month: "M'm' dd'd' hh'h'",
  year: "y'y' MM'm' dd'd' hh'h'"
}

The multiple entries can be used by a duration axis to use different duration formats for different granularities of grid/labels.

For example if we have a duration axis that represents duration values with base unit as seconds.

If axis spans just a few seconds or minutes, we might want to display durations formatted as `mm:ss`, however, if the scope is several hours, we might revert to hourly granularity, so `hh:mm` format might be more appropriate.

### Formatting data placeholders

The values that will be shown in place of the placeholder will be formatted according to formatting settings as set out in global formatters or in-line functions.

We can set names of the data placeholders that hold numbers and need to be formatted as such via global formatter's `durationFields` setting:

root.durationFormatter.setAll({
  baseUnit: "second",
  durationFormat: "mm:ss",
  durationFields: \["valueY"\]
});

root.durationFormatter.setAll({
  baseUnit: "second",
  durationFormat: "mm:ss",
  durationFields: \["valueY"\]
});

For more information on how it works, please refer to "[Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)" tutorial.

## Format codes

The following table outlines codes that can be used in duration formats.

IMPORTANTCodes are case-sensitive.

Code

Comment

y

Years (a year is 365 days)

M

Months (a month is 31 days)

w

Weeks (a week is 7 days)

d

Days (a day is 24 hours)

h

Hours (an hour is 60 minutes)

m

Minutes (a minute is 60 seconds)

s

Seconds (a second is 1000 milliseconds)

S

Milliseconds

a

Special indicator that must always go after other codes. Indicates that absolute value should be used. (no minus sign)

' (single quote)

Text enclosed in single quotes will be treated as text and will be displayed as is without parsing it for codes

## Styling text

Text formats can also include in-line styling instructions:

root.durationFormatter.set("durationFormat", "\[bold\]mm:ss");

root.durationFormatter.set("durationFormat", "\[bold\]mm:ss");

Please refer to the "[Text styling and data binding](https://www.amcharts.com/docs/v5/concepts/formatters/in-line/)" tutorial for more info.

## Escaping

### Quotes

To explicitly make formatter ignore a portion of text, enclose it within single quotes:

`"d'days' hh'hours'"`

The `"days"` and `"hours"` above will not be parsed when being processed by a date formatter. It will be left as is:

`10 days 20 hours`

To use a single quote (either within quoted text or outside it) add single quote twice:

`"d'day''s'"`

Will result in:

`5 day's`

## Duration axis

Chart's duration axes will use global duration formatter and its settings: `baseUnit`, `durationFormat`, and `durationFormats`.

The base unit can be overridden for each individual duration axis using its own `baseUnit` setting.

For more information, refer to "[Duration axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/duration-axis/)" tutorial.
