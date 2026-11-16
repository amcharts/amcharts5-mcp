---
title: "Funnel series"
source: "https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/funnel-series/"
scraped: "2026-11-16"
---

This tutorial is about configuring various aspects of a funnel series appearance.

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

### Slice bottom width

Funnel slices are rectangles by default.

We can turn them into trapezoids using series setting `bottomRatio`.

It's a numeric value from `0` (zero) to `1` (one).

It indicates how bottom of the slice should be reduced in width in comparison to the width of the next slice.

`0` (zero) means that there will be no reduction, so slice will remain a rectangle with both bottom and top equal in width.

`1` (one) means the bottom will be equal in width with the next slice.

It can also be any intermediate value.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    bottomRatio: 0
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "vertical",
    bottomRatio: 0
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/bottomratio_0.png "`bottomRatio: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/bottomratio_05.png "`bottomRatio: 0.5`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/bottomratio_1.png "`bottomRatio: 1`")

## Slice links

Slice links are trapezoids that connect two adjacent slices.

Like anything else, we can configure them via their template on `series.links.template`.

### Link color and opacity

Links are colored the same color as the linked slice. We can override the colors (and other settings) via link template:

TypeScript:

```ts
series.links.template.setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2
});
```

JavaScript:

```js
series.links.template.setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2
});
```

### Link height

Link height can be controlled using its `height` setting. Set it to a bigger number to make them more prominent, or to a zero to completely disable links.

TypeScript:

```ts
series.links.template.setAll({
  height: 0
});
```

JavaScript:

```js
series.links.template.setAll({
  height: 0
});
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/link_default.png "Default")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/link_30.png "`height: 30`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/link_0.png "`height: 0`")

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

Funnel series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

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

Funnel series labels can either be aligned into a column (or row for horizontal series).

This can be disabled using series setting `alignLabels` (default: `true`). When alignment is disabled, the labels will position themselves directly over the slice.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    valueField: "applicants",
    orientation: "vertical",
    alignLabels: false
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/funnel_alignlabels.png "`alignLabels: true` (default)")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/funnel_centerlabels.png "`alignLabels: false`")

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

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/funnel_alignlabels.png "`location: 1` (default)")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/tunnel_tick_location_05.png "`location: 0.5`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/tunnel_tick_location_08.png "`location: 0.8`")

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

Funnel series can either be vertical or horizontal.

It must set via `orientation` property with possible values `"vertical"` and `"horizontal"`.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
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
  am5percent.FunnelSeries.new(root, {
    name: "Series",
    categoryField: "stage",
    valueField: "applicants",
    orientation: "horizontal"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/bottomratio_1-1.png "`orientation: 'vertical'`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/funnel_horizontal.png "`orientation: 'horizontal'`")

### Pading

Funnel series has 10 pixels on padding on all sides by default, so there's little bit space around it.

We can disable it (or increase) using series `paddingTop`, `paddingRight`, `paddingBottom`, and `paddingLeft` settings:

TypeScript:

```ts
let series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
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
  am5percent.FunnelSeries.new(root, {
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
  am5percent.FunnelSeries.new(root, {
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
  am5percent.FunnelSeries.new(root, {
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

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/2021-07-23_15-43-39.png "(default) | `startLocation: 0` | `endLocation: 1`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/startlocation_02.png "`startLocation: 0.2` | `endLocation: 0.8`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/sliced-chart/funnel-series/endlocation_05.png "`startLocation: 0` | `endLocation: 0.5`")

## Example

Example: [Funnel chart](https://docs.amcharts.com/embeds/v5/funnel-chart/). Its code: get_example(path: "examples/docs-demos/funnel-chart").

## Binding settings to data

It's possible to bind settings of a series slice, label, and tick templates to values in data.

For more information on how to do it, refer to "[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/)" tutorial.
