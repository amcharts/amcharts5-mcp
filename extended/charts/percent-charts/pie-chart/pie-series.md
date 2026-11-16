---
title: "Pie series"
source: "https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/pie-series/"
scraped: "2026-11-16"
---

This tutorial is about configuring various aspects of a pie series appearance.

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

### Modifying hover state

Slice will grow a bit when hovered, by default.

We can modify `hover` state to modify that look. The below code will make a donut slice grow inwards, as opposed to outwards when hovered:

TypeScript:

```ts
series.slices.template.states.create("hover", {
  scale: 1,
  innerRadius: 80
});
```

JavaScript:

```js
series.slices.template.states.create("hover", {
  scale: 1,
  innerRadius: 80
});
```

### Slice pull-out

If we click on a slice in a pie series it will pull out of the place. It's the default behavior.

What happens here is that slice has its `togglable` setting set to `true` by default, so that when it is clicked `active` [state](https://docs.amcharts.com/v5/concepts/settings/states/) is applied to it. Subsequent click removes resets it back to default state. And so on.

#### Disabling pull-out

To disable pull-out, we can simply set `toggleKey` setting on slice template to `"none"`:

TypeScript:

```ts
series.slices.template.set("toggleKey", "none");
```

JavaScript:

```js
series.slices.template.set("toggleKey", "none");
```

#### Modifying active state

We can also modify `active` state to change how a slice behaves or looks when clicked.

The default `active` state defines single setting: `shiftRadius: 20`. We can set our own stuff there:

TypeScript:

```ts
series.slices.template.states.create("active", {
  shiftRadius: 0,
  stroke: am5.color(0x995522),
  strokeWidth: 5
});
```

JavaScript:

```js
series.slices.template.states.create("active", {
  shiftRadius: 0,
  stroke: am5.color(0x995522),
  strokeWidth: 5
});
```

Example: [Modifying active state on pie slices](https://docs.amcharts.com/embeds/v5/modifying-active-state-on-pie-slices/). Its code: get_example(path: "examples/docs-demos/modifying-active-state-on-pie-slices").

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

Pie series uses `RadialLabel` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/radiallabel/#settings).

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

Contents of the label can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

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

Pie series labels can either be aligned into two columns (default) or position themselves equal distance from the related slices.

This can be disabled using series setting `alignLabels`.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    alignLabels: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    alignLabels: false
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/aligned_labels.png "`alignLabels: true` (default)")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/unaligned_labels.png "`alignLabels: false`")

Example: [Turning off label alignment](https://docs.amcharts.com/embeds/v5/turning-off-label-alignment/). Its code: get_example(path: "examples/docs-demos/turning-off-label-alignment").

### Radius

Label setting `radius` that can be set via its template controls distance from the slice's outer edge.

It's a number in pixels. The higher the radius, the further from the slice edge the label will be:

TypeScript:

```ts
series.labels.template.setAll({
  radius: 10
});
```

JavaScript:

```js
series.labels.template.setAll({
  radius: 10
});
```

### Labels inside the slice

We can set `inside` setting to `true` on the label template, if we want the labels to appear inside the slice.

If we do so, the `radius` setting will revert: it will mean radius in pixels inwards, rather than outwards from the slice's outer edge.

TypeScript:

```ts
series.labels.template.setAll({
  radius: 10,
  inside: true
});
```

JavaScript:

```js
series.labels.template.setAll({
  radius: 10,
  inside: true
});
```

### Circular labels

We can also arrange labels to curve along the outer edge of the slice by setting `textType: "circular"` on the label template.

TypeScript:

```ts
series.labels.template.setAll({
  text: "{category}",
  textType: "circular",
  inside: true,
  radius: 10
});
```

JavaScript:

```js
series.labels.template.setAll({
  text: "{category}",
  textType: "circular",
  inside: true,
  radius: 10
});
```

> **Important:** Pie series' `alignLabels` (default: `true`) takes precedence over the `textType` setting. Make sure you set `alignLabels: false` on series, too.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    // ...
    alignLabels: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    // ...
    alignLabels: false
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/circular_labels_outside.png "`\{ textType: 'circular', inside: false }`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/circular_labels_inside.png "`\{ textType: 'circular', inside: true }`")

Example: [Circular labels](https://docs.amcharts.com/embeds/v5/circular-labels/). Its code: get_example(path: "examples/docs-demos/circular-labels").

### Radial labels

We can also make labels radiate outwards from the center of the pie, like rays.

To do so we need to set `textType` to `radial`.

We'll also need to use `centerX` setting to control anchor point of the label. A value of `0` (zero) will mean that anchor point is beginning of the label, so the labels will radiate outwards starting from slice edge + whatever `radius` we have set.

A value of `100` means end of the label, which means that labels will end at the slice outer edge, effectively putting them inside the slice.

TypeScript:

```ts
series.labels.template.setAll({
  text: "{category}",
  textType: "radial",
  centerX: am5.percent(100)
});
```

JavaScript:

```js
series.labels.template.setAll({
  text: "{category}",
  textType: "radial",
  centerX: am5.percent(100)
});
```

> **Important:** Pie series' `alignLabels` (default: `true`) takes precedence over the `textType` setting. Make sure you set `alignLabels: false` on series, too.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    // ...
    alignLabels: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    // ...
    alignLabels: false
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/radial_labels_outside.png "`\{ textType: 'radial', centerX: am5.percent(0) }`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/radial_labels_inside.png "`\{ textType: 'radial', centerX: am5.percent(100) }`")

Example: [Radial labels](https://docs.amcharts.com/embeds/v5/radial-labels/). Its code: get_example(path: "examples/docs-demos/radial-labels").

### Labels that don't fit

Since version 5.22.0, the series' `autoLabels` fits the labels into the chart:

TypeScript:

```ts
let series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  autoLabels: true
}));
```

JavaScript:

```js
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  autoLabels: true
}));
```

A step at a time, as room runs out:

* The pie moves aside so each side gets the room its widest label needs, then gets smaller, down to half the chart's shorter side.
* A label too wide for its column wraps onto up to three lines, or is shortened where there's no height to spare.
* Labels of the smallest slices are hidden where a column can't hold them all.
* When no label fits, all are hidden, and the pie keeps its size.

A label in the middle of a donut, e.g. a total, is made smaller where it wouldn't fit the hole. A `maxWidth` on the labels template is the most a label may take.

The [`ResponsiveMax` theme](https://docs.amcharts.com/v5/concepts/responsive-max/) turns it on.

For older versions, see the "[Handling pie chart labels that don't fit](https://docs.amcharts.com/v5/tutorials/handling-pie-chart-labels-that-dont-fit/)" tutorial.

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

To disable series ticks, we can set `visible` setting to `true` in their template:

TypeScript:

```ts
series.ticks.template.set("visible", false);
```

JavaScript:

```js
series.ticks.template.set("visible", false);
```

### Tick location

The tick will point to the outer edge of the slice by default.

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

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/pie_tick_location_1.png "`location: 1` (default)")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/pie_tick_location_08.png "`location: 0.8`")

![](https://docs.amcharts.com/v5/images/charts/percent-charts/pie-chart/pie-series/pie_tick_location_05.png "`location: 0.5`")

## Tooltips

Slices in a pie series are pre-set to display a tooltip on hover containing name of the category and its percent value.

We can modify contents of the tooltips using `tooltipText` on slice's template:

TypeScript:

```ts
series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

JavaScript:

```js
series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

To disable tooltips, set `tooltipText` to an empty string:

TypeScript:

```ts
series.slices.template.set("tooltipText", "");
```

JavaScript:

```js
series.slices.template.set("tooltipText", "");
```

## Binding settings to data

It's possible to bind settings of a series slice, label, and tick templates to values in data.

For more information on how to do it, refer to "[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/)" tutorial.

## Related tutorials

* [One pulled slice per pie series](https://docs.amcharts.com/v5/tutorials/one-pulled-slice-per-pie-series/)
* [Sum label inside a donut chart](https://docs.amcharts.com/v5/tutorials/sum-label-inside-a-donut-chart/)
* [Pre-hiding pie chart slices](https://docs.amcharts.com/v5/tutorials/pre-hiding-pie-chart-slices/)
* [Hiding labels and ticks for small pie slices](https://docs.amcharts.com/v5/tutorials/hiding-labels-and-ticks-for-small-pie-slices/)
* [Selectively displaying pie chart labels inside or outside slices](https://docs.amcharts.com/v5/tutorials/selectively-displaying-pie-chart-labels-inside-or-outside-slices/)
* [Using slice color for PieChart label backgrounds](https://docs.amcharts.com/v5/tutorials/using-slice-color-for-piechart-label-backgrounds/)
* [Coloring pie labels and ticks by slice](https://docs.amcharts.com/v5/tutorials/coloring-pie-labels-and-ticks-by-slice/)
