---
title: "Pyramid series"
source: "https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/pyramid-series/"
scraped: "2026-11-25"
---

This tutorial is about configuring various aspects of a pyramid series appearance.

## Slices

### Slice colors

Slice colors are important. They identify a slice and connect it to its legend item visually.

There are a few ways to control how colors are assigned to slices.

#### Auto-assigned colors

A series will automatically assign a unique color to each slice from its own [color set](https://docs.amcharts.com/v5/reference/xychart/#colors_setting).

Should we want to, we can override the whole list of colors by either setting it directly on series color set, creating a [quick theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme), or a [reusable full theme](https://docs.amcharts.com/v5/concepts/themes/creating-themes/), e.g.:

TypeScript:

```ts
series.get("colors").set("colors", [
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
]);
```

JavaScript:

```js
series.get("colors").set("colors", [
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
]);
```

> **More info:** A "[Color sets](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#setting-own-list-of-colors)" section of our color tutorial has more details and code samples.

#### Manual slice colors

We can also specify color for each slice through data and template fields.

For more information on how to do it, refer to "[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/)" tutorial.

### Configuring slices

Configuration of a slice is done via its template, which is accessible via series template list: `series.slices.template`.

We can set any setting via template:

TypeScript:

```ts
series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});
```

JavaScript:

```js
series.slices.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0xffffff),
  strokeWidth: 2
});
```

> **Note:** Setting a value on a template will also update existing slices created using it.

### Slice size

In pyramid series, slice size can either be reflected by its height or its area.

Default is calculation by area. It can be changed using series `valueIs` setting (possible values are `"area"` and `"height"`):

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    valueIs: "height"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    valueIs: "height"
  })
);
```

![Pyramid chart with slice areas proportional to values, top slice very tall](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_default.png "`valueIs = 'area'` (default)")

![Pyramid chart with slice heights proportional to values](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/valueis_height.png "`valueIs = 'height'`")

Unless absolutely necessary, using "area" calculation mechanism is recommended. It produces diagram which makes relative area proportions more prominent.

The above two charts use the same data. The first slice's value is at least 40% bigger, but from the diagram the second slice seems heavier.

## Labels

### Configuring labels

Series label configuration is done via its template, accessible via series property `labels.template`.

TypeScript:

```ts
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});
```

JavaScript:

```js
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x550000),
  text: "{category}"
});
```

Pyramid series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

### Label content

Slice labels are pre-set to display name of the category and its percent value.

We can modify contents of the tooltips using `text` setting on a series label template:

TypeScript:

```ts
series.labels.template.set("text", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

JavaScript:

```js
series.labels.template.set("text", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

### Disabling labels

To disable series labels, we can set `forceHidden` setting to `true` in their template:

TypeScript:

```ts
series.labels.template.set("forceHidden", true);
```

JavaScript:

```js
series.labels.template.set("forceHidden", true);
```

### Alignment

Pyramid series labels can either be aligned into a column (or row for horizontal series).

This can be disabled using series setting `alignLabels` (default: `true`). When alignment is disabled, the labels will position themselves directly over the slice.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);
```

![Pyramid chart with labels lined up in a column on the right](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_alignlabels.png "`alignLabels: true` (default)")

![Pyramid chart with labels centered on the slices, crowding at the bottom](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_centerlabels.png "`alignLabels: false`")

> **Note:** Disabling `alignLabels` will also hide slice ticks automatically.

## Ticks

### Configuring ticks

Series tick configuration is done via its template, accessible via series property `ticks.template`.

TypeScript:

```ts
series.ticks.template.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2
});
```

JavaScript:

```js
series.ticks.template.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2
});
```

Series uses `Tick` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/tick/#settings).

### Disabling ticks

To disable series ticks, we can set `forceHidden` setting to `true` in their template:

TypeScript:

```ts
series.ticks.template.set("forceHidden", true);
```

JavaScript:

```js
series.ticks.template.set("forceHidden", true);
```

### Tick location

The tick will point to the slice edge on the label side, by default.

That can be changed using tick template setting `location`.

It's a numeric value from `0` (zero) to `1` (one) indicating relative position within the slice.

TypeScript:

```ts
series.ticks.template.setAll({
  location: 0.5
});
```

JavaScript:

```js
series.ticks.template.setAll({
  location: 0.5
});
```

The above will make tick point to the middle of the slice.

![Pyramid chart with label ticks starting at the slice edges](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_alignlabels.png "`location: 1` (default)")

![Pyramid chart with label ticks starting at the slice centers](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_ticklocation_05.png "`location: 0.5`")

![Pyramid chart with label ticks starting near the slice edges](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_ticklocation_08.png "`location: 0.8`")

## Tooltips

To enable slice tooltips, all we need to do is to set `tooltipText` on slice's template:

TypeScript:

```ts
series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

JavaScript:

```js
series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

## Series layout

### Orientation

Pyramid series can either be vertical or horizontal.

It must set via `orientation` property with possible values `"vertical"` and `"horizontal"`.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PyramidSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal"
  })
);
```

![Pyramid chart pointing up, slices stacked top to bottom](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_default.png "`orientation: 'vertical'`")

![Pyramid chart pointing left, slices arranged left to right](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_horizontal.png "`orientation: 'horizontal'`")

### Tip and base

We can also configure width of the pyramid tip and base using `topWidth` and `bottomWidth` settings.

Both values can be either percent relative to available width/height, or fixed pixel value.

For example, if we would like to have blunted pyramid top, we could set `topWdith` to `am5.percent(20)`.

Or, if we'd like to "flip" the pyramid upside-down, we could set `topWidth: am5.percent(100)` and `bottomWidth: 0`:

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

![Pyramid chart with a pointed top and full-width base](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_default.png "(default) | `topWidth: 0` | `bottomWidth: am5.percent(100)`")

![Pyramid chart with a flat, narrow top](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/topwidth_30.png "`topWidth: am5.percent(30)` | `bottomWidth: am5.percent(100)`")

![Upside-down pyramid with a full-width top and pointed bottom](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/bottomwidth_0.png "`topWidth: am5.percent(100)` | `bottomWidth: 0`")

> **Note:** Manipulating shape of the pyramid will also affect height of the slices to reflect the value using slice area.

### Pading

Pyramid series has 10 pixels on padding on all sides by default, so there's little bit space around it.

We can disable it (or increase) using series `paddingTop`, `paddingRight`, `paddingBottom`, and `paddingLeft` settings:

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

### Start/end locations

Normally, series starts and ends at the edge of its available space.

We can use its `startLocation` and `endLocation` to set where series starts and ends in comparison to the available space.

The values can be from `0` (zero) to `1` (one), with zero meaning start of the series area, and 1 - the end.

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

The above will start and end series 20% of the whole width/height from the edges of the series area.

![Pyramid chart filling the full chart height](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_default.png "(default) | `startLocation: 0` | `endLocation: 1`")

![Pyramid chart squeezed into the middle of the chart height](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_startlocation_02.png "`startLocation: 0.2` | `endLocation: 0.8`")

![Pyramid chart filling only the top half of the chart](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/pyramid-series/pyramid_endlocation_05.png "`startLocation: 0` | `endLocation: 0.5`")

## Binding settings to data

It's possible to bind settings of a series slice, label, and tick templates to values in data.

For more information on how to do it, refer to "[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/)" tutorial.
