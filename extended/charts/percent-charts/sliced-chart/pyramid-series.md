---
title: "Pyramid series"
source: "https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/pyramid-series/"
scraped: "2026-03-15"
---

This tutorial is about configuring various aspects of a pyramid series appearance.

## Slices

### Slice colors

Slice colors are important. They identify a slice and connect it to its legend item visually.

There are a few ways to control how colors are assigned to slices.

#### Auto-assigned colors

A series will automatically assign a unique color to each slice from its own [color set](https://www.amcharts.com/docs/v5/reference/xychart/#colors_setting).

Should we want to, we can override the whole list of colors by either setting it directly on series color set, creating a [quick theme](https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme), or a [reusable full theme](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/), e.g.:

series.get("colors").set("colors", \[
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
\]);

series.get("colors").set("colors", \[
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
\]);

MORE INFO A "[Color sets](https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Setting_own_list_of_colors)" section of our color tutorial has more details and code samples.

#### Manual slice colors

We can also specify color for each slice through data and template fields.

For more information on how to do it, refer to "[Template fields](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/)" tutorial.

### Configuring slices

Configuration of a slice is done via its template, which is accessible via series template list: `series.slices.template`.

We can set any setting via template:

series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});

series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});

NOTE Setting a value on a template will also update existing slices created using it.

### Slice size

In pyramid series, slice size can either be reflected by its height or its area.

Default is calculation by area. It can be changed using series `[valueIs](https://www.amcharts.com/docs/v5/reference/pyramidseries/#valueIs_setting)` setting (possible values are `"area"` and `"height"`):

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    valueIs: "height"
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    valueIs: "height"
  })
);

`valueIs = "area"` (default)

`valueIs = "height"`

Unless absolutely necessary, using "area" calculation mechanism is recommended. It produces diagram which makes relative area proportions more prominent.

The above two charts use the same data. The first slice's value is at least 40% bigger, but from the diagram the second slice seems heavier.

## Labels

### Configuring labels

Series label configuration is done via its template, accessible via series property `labels.template`.

series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});

series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});

Pyramid series uses `[Label](https://www.amcharts.com/docs/v5/reference/label/)` for its labels. Check out its class reference for all the [possible settings](https://www.amcharts.com/docs/v5/reference/label/#Settings).

### Label content

Slice labels are pre-set to display name of the category and its percent value.

We can modify contents of the tooltips using `text` setting on a series label template:

series.labels.template.set("text", "{category}: \[bold\]{valuePercentTotal.formatNumber('0.00')}%\[/\] ({value})");

series.labels.template.set("text", "{category}: \[bold\]{valuePercentTotal.formatNumber('0.00')}%\[/\] ({value})");

Contents of the tooltip can include [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

### Disabling labels

To disable series labels, we can set `forceHidden` setting to `true` in their template:

series.labels.template.set("forceHidden", true);

series.labels.template.set("forceHidden", true);

### Alignment

Pyramid series labels can either be aligned into a column (or row for horizontal series).

This can be disabled using series setting `alignLabels` (default: `true`). When alignment is disabled, the labels will position themselves directly over the slice.

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);

`alignLabels: true` (default)

`alignLabels: false`

NOTE Disabling `alignLabels` will also hide slice ticks automatically.

## Ticks

### Configuring ticks

Series tick configuration is done via its template, accessible via series property `ticks.template`.

series.ticks.template.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2
});

series.ticks.template.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2
});

Series uses `[Tick](https://www.amcharts.com/docs/v5/reference/radiallabel/)` for its labels. Check out its class reference for all the [possible settings](https://www.amcharts.com/docs/v5/reference/tick/#Settings).

### Disabling ticks

To disable series ticks, we can set `forceHidden` setting to `true` in their template:

series.ticks.template.set("forceHidden", true);

series.ticks.template.set("forceHidden", true);

### Tick location

The tick will point to the slice edge on the label side, by default.

That can be changed using tick template setting `location`.

It's a numeric value from `0` (zero) to `1` (one) indicating relative position within the slice.

series.ticks.template.setAll({
  location: 0.5
});

series.ticks.template.setAll({
  location: 0.5
});

The above will make tick point to the middle of the slice.

`location: 1` (default)

`location: 0.5`

`location: 0.8`

## Tooltips

To enable slice tooltips, all we need to do is to set `tooltipText` on slice's template:

series.slices.template.set("tooltipText", "{category}: \[bold\]{valuePercentTotal.formatNumber('0.00')}%\[/\] ({value})");

series.slices.template.set("tooltipText", "{category}: \[bold\]{valuePercentTotal.formatNumber('0.00')}%\[/\] ({value})");

Contents of the tooltip can include [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

## Series layout

### Orientation

Pyramid series can either be vertical or horizontal.

It must set via `orientation` property with possible values `"vertical"` and `"horizontal"`.

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal"
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal"
  })
);

`orientation: "vertical"`

`orientation: "horizontal"`

### Tip and base

We can also configure width of the pyramid tip and base using `topWidth` and `bottomWidth` settings.

Both values can be either percent relative to available width/height, or fixed pixel value.

For example, if we would like to have blunted pyramid top, we could set `topWdith` to `am5.percent(20)`.

Or, if we'd like to "flip" the pyramid upside-down, we could set `topWidth: am5.percent(100)` and `bottomWidth: 0`:

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    topWidth: am5.percent(100),
    bottomWidth: 0
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    topWidth: am5.percent(100),
    bottomWidth: 0
  })
);

(default)  
`topWidth: 0`  
`bottomWidth: am5.percent(100)`

`topWidth: am5.percent(30)`  
`bottomWidth: am5.percent(100)`

`topWidth: am5.percent(100)`  
`bottomWidth: 0`

NOTE Manipulating shape of the pyramid will also affect height of the slices to reflect the value using slice area.

### Pading

Pyramid series has 10 pixels on padding on all sides by default, so there's little bit space around it.

We can disable it (or increase) using series `paddingTop`, `paddingRight`, `paddingBottom`, and `paddingLeft` settings:

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  })
);

### Start/end locations

Normally, series starts and ends at the edge of its available space.

We can use its `startLocation` and `endLocation` to set where series starts and ends in comparison to the available space.

The values can be from `0` (zero) to `1` (one), with zero meaning start of the series area, and 1 - the end.

let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    startLocation: 0.2,
    endLocation: 0.8
  })
);

var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    startLocation: 0.2,
    endLocation: 0.8
  })
);

The above will start and end series 20% of the whole width/height from the edges of the series area.

(default)  
`startLocation: 0`  
`endLocation: 1`

`startLocation: 0.2`  
`endLocation: 0.8`

`startLocation: 0`  
`endLocation: 0.5`

## Binding settings to data

It's possible to bind settings of a series slice, label, and tick templates to values in data.

For more information on how to do it, refer to "[Template fields](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/)" tutorial.
