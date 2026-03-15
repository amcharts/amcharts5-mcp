---
title: "Formatting dates"
source: "https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/"
scraped: "2026-03-15"
---

This tutorial takes a look at date formatter - helper object used to format date/time throughout the chart.

## Formatter object

Date formatter object is accessible globally via chart [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element)'s `dateFormatter` property.

We can use it to set `dateFormat`, as well as a few of other related settings, which will be used whenever date needs to be formatted in the chart.

## Where is it used?

Date formatter is used in a number of places throughout the chart.

Some components like date axis their own logic to apply date formatting.

Labels (e.g. in tooltips) with date [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) will turn to date formatter to format their values.

Data export functionality will also use date formatter to format its output of date values.

The data processor will also use date formatter to [parse string-based dates](https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates).

## Global date format

### Default format

A global date formatter will already have its `dateFormat` set to a default value, which may depend on the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) your chart is using.

### Setting default format

Date format is set via formatter's `dateFormat` setting:

root.dateFormatter.set("dateFormat", "yyyy-MM-dd");

root.dateFormatter.set("dateFormat", "yyyy-MM-dd");

### Formatting data placeholders

The values that will be shown in place of the placeholder will be formatted according to formatting settings as set out in global formatters or in-line functions.

We can set names of the data placeholders that hold numbers and need to be formatted as such via global formatter's `dateFields` setting:

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: \["valueX"\]
});

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: \["valueX"\]
});

For more information on how it works, please refer to "[Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)" tutorial.

## Format codes

The following table outlines codes that can be used in date formats.

IMPORTANT Codes are case-sensitive.

NOTE Pay special attention to year codes. "yyyy" means year. "YYYY" means year of the week. Unless you know otherwise, you should probably always stick with "yyyy" (all lowercase).

NOTE The third column ("No.") deserves a little explanation. It indicates the number of times the code symbol can be repeated. For example, if the first row for "M" (month) shows "1..2", it means it can contain either one or two letters of "M". If it contains just one, the numbers will be shown how they are, e.g. 1, 5, 11, if it contains "MM", the resulting number will always be two-digits, e.g. 01, 05, 11.

Period

Code

No.

Example

Comment

**era**

G

1

AD

Era - Replaced with the Era string for the current date.

**year**

y

1..n

1996

Calendar year.

Y

1..n

1997

Year (of "Week of Year"), used in ISO year-week calendar. May differ from calendar year.

u

1..n

4601

Extended year. This is a single number designating the year of this calendar system, encompassing all supra-year fields. For example, for the Julian calendar system, year numbers are positive, with an era of BCE or CE. An extended year value for the Julian calendar system assigns positive values to CE years and negative values to BCE years, with 1 BCE being year 0.

**quarter**

q

1

3

Calendar quarter of the year starting from January.

**month**

M

1..2

09

Month number. "M" may produce one or two-digit numbers, whereas "MM" will always produce two-digit output, padding with a zero when necessary.

3

Sep

Short month abbeviation.

4

September

Full month name.

5

S

First letter of the month.

**week**

w

1..2

27

Week of year.

W

1

3

Week of the month.

**day**

d

1..2

1

Day of the month.

D

1..3

345

Day of the year.

F

1

2

Day of Week in Month. The example is for the 2nd Wed in July.

g

1..n

2451334

Modified Julian day. This is different from the conventional Julian day number in two regards. First, it demarcates days at local zone midnight, rather than noon GMT. Second, it is a local number; that is, it depends on the local time zone. It can be thought of as a single number that encompasses all the date-related fields.

t

1

st

Day ordinal: "st", "nd", "rd".

**weekday**

E

1..2

3

Day of the week. Using "EE" will prepend day number with a zero.

3

Tues

Short weekday name.

4

Tuesday

Full weekday name.

5

T

First letter of the weekday name.

e

1..2

2

Local day of week. Same as E except numeric value will depend on the local starting day of the week. For this example, Monday is the first day of the week.

3

Tues

4

Tuesday

5

T

**am/pm**

a

1

AM

"AM" or "PM".

2

A.M.

"A.M." or "P.M.".

3

A

"A" or "P".

**hour**

h

1..2

11

Hour \[1-12\].

H

1..2

13

Hour \[0-23\].

K

1..2

0

Hour \[0-11\].

k

1..2

24

Hour \[1-24\].

**minute**

m

1..2

59

Minute. Using "mm" will pad one-digit numbers with a zero.

**second**

s

1..2

12

Second. Using "ss" will pad one-digit numbers with a zero.

S

1..n

3456

Fractional Second - rounds to the count of letters. (example is for 12.34567)

A

1..n

69540000

Milliseconds in day. This field behaves exactly like a composite of all time-related fields, not including the zone fields. As such, it also reflects discontinuities of those fields on DST transition days. On a day of DST onset, it will jump forward. On a day of DST cessation, it will jump backward. This reflects the fact that is must be combined with the offset field to obtain a unique local time value.

x

1

1507908460868

Timestamp (milliseconds since 1970-01-01).

n

1..3

029

Milliseconds. Use one to three for zero padding. This is similar to "S" except number of letters determine padding of numbers instead of rounding.

**zone**

z

1

PT

Time zone. Short wall (generic) time.

2

Pacific Time

Time zone. Long wall time.

3

PDT

Time zone. Short time zone abbreviation.

4

Pacific Daylight Time

Full time zone name.

Z

1

GMT-08:00

Time zone in GMT format.

2

\-0800

Time zone in RFC 822 format.

**other**

i

1

2017-10-14T05:24:17.872Z

Date/time formatted according to [ISO8601 format](http://en.wikipedia.org/wiki/ISO_8601).

I

1

Sat, 14 Oct 2017 05:21:51 GMT

Date/time formatted to a string representation using UTC time zone according to RFC-1123 specification.

### Examples

Format

Output

`yyyy-MM-dd`

2021-07-17

`MMM dt, yyyy`

Jul 17th, 2021

`HH:mm`

14:28

## UTC and time zones

A number formatter can be made to recalculate all displayed dates into UTC or any other named time zone.

For this, we need to set `utc` or `timezone` settings of the root element:

root.utc = true;

root.utc = true;

For more information on setting time zones refer to "Root element: [Time zone](https://www.amcharts.com/docs/v5/getting-started/root-element/#time-zone)".

## Styling text

Text formats can also include in-line styling instructions:

root.dateFormatter.set("dateFormat", "\[bold\]yyyy-MM-dd");

root.dateFormatter.set("dateFormat", "\[bold\]yyyy-MM-dd");

Please refer to the "[Text styling and data binding](https://www.amcharts.com/docs/v5/concepts/formatters/in-line/)" tutorial for more info.

## Escaping

### Quotes

To explicitly make formatter ignore a portion of text, enclose it within single quotes:

`yyyy.MM.dd G 'at' HH:mm:ss zzz`

The `"at"` above will not be parsed when being processed by a date formatter. It will be left as is:

`2016.09.21 AD at 19:18:01 GMT+3`

Any text enclosed in single quotes will be displayed as is, without applying formatting to it.

To use a single quote (either within quoted text or outside it) add single quote twice:

`HH:mm:ss 'o''clock'`

Will result in:

`19:18:01 o'clock`

## Date formatting in charts

A date axis has its own special relationship with date formatting. It uses own collection of date formats for various occasions, and will ignore global date settings.

Please refer to "[Date axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/)" tutorial for details.

## Using Intl object formats

Date formats can be specified using JavaScript's built-in `Intl` object. Please refer to "[Formatting date/time and numbers using “Intl” object](https://www.amcharts.com/docs/v5/tutorials/formatting-date-time-and-numbers-using-intl-object/)" for further information.
