---
title: "Sunburst"
source: "https://docs.amcharts.com/v5/charts/hierarchy/sunburst/"
scraped: "2026-11-25"
---

This tutorial will walk through available options of configuring a sunburst series.

## Slices

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

## Radius

### Outer radius

Sunburst's outer radius can be set using its `radius` setting.

It can be either percent value (relative to available space) or fixed pixel value.

Pie chart's `radius` is set to `100%` by default.

We can change that by specifying different value for `radius`:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(90)
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(90)
  })
);
```

![Sunburst chart filling the full chart height](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100p.png "`radius: am5.percent(100)` (default)")

![Sunburst chart slightly smaller, with space around it](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_80p.png "`radius: am5.percent(80)`")

![Small fixed-size sunburst chart in the middle of the chart area](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100.png "`radius: 100`")

### Inner radius

Series's `innerRadius` settings controls the "hole" inside the sunburst's pie.

As with `radius` it can be either a percent value or fixed pixel value.

The difference is that `innerRadius` percent value is relative to the series radius, rather than available space.

We can also use negative values in `innerRadius`. Those will mean pixel distance from the outer radius. This allows creating fixed-width donut circles.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(95),
    innerRadius: am5.percent(50)
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Sunburst.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    radius: am5.percent(95),
    innerRadius: am5.percent(50)
  })
);
```

![Sunburst chart with a solid center](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_radius_100p.png "`innerRadius: 0` (default)")

![Sunburst chart with a hole in the center](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_innerradius_p30.png "`innerRadius: am5.percent(30)`")

Example: [Sunburst chart with inner radius](https://docs.amcharts.com/embeds/v5/sunburst-chart-with-inner-radius/). Its code: get_example(path: "examples/docs-demos/sunburst-chart-with-inner-radius").

## Start/end angles

A sunburst series is not limited to a full circle. It can start and end at any angle.

For that we have to set series' settings: `startAngle` and `endAngle`.

These are numeric values denoting degrees.

A zero angle is one that goes from the center of the chart directly to right.

Defaults are `-90` (`startAngle`) and `270` (`endAngle`) forming full circle starting at vertical line up.

We can change that any way we want.

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    startAngle: -180,
    endAngle: 0
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    startAngle: -180,
    endAngle: 0
  })
);
```

The above will result in a horizontal semi-circle:

![Sunburst chart drawn as a full circle](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_innerradius_p30.png "Full circle (default)")

![Sunburst chart drawn as the top half of a circle](https://docs.amcharts.com/v5/images/charts/hierarchy/sunburst/sunburst_custom_angles.png "`\{ startAngle: -180, endAngle: 0 }`")

Example: [Sunburst chart with custom start/end angles](https://docs.amcharts.com/embeds/v5/sunburst-chart-with-custom-startend-angles/). Its code: get_example(path: "examples/docs-demos/sunburst-chart-with-custom-startend-angles").

## Labels

Sunburst series will display a label inside its slices by default.

### Configuring labels

Series label configuration is done via its template, accessible via series property `labels.template`.

TypeScript:

```ts
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});
```

JavaScript:

```js
series.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});
```

Refer to [`RadialLabel` class reference](https://docs.amcharts.com/v5/reference/radiallabel/#settings) for a full list of available settings.

### Label content

To change label content, we only need to set `text` property of the label template:

TypeScript:

```ts
series.labels.template.setAll({
  text: "[bold]{category}[/] ({sum})"
});
```

JavaScript:

```js
series.labels.template.setAll({
  text: "[bold]{category}[/] ({sum})"
});
```

Contents of the label can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

For available data placeholder fields refer to `ISunburstDataItem`.

### Disabling labels

To disable labels, we can simply set their `forceHidden` to `true`:

TypeScript:

```ts
series.labels.template.set("forceHidden", true);
```

JavaScript:

```js
series.labels.template.set("forceHidden", true);
```

## Tooltips

Nodes are pre-set to display a tooltip on hover containing name of the category and its value.

We can modify contents of the tooltips using `tooltipText` on rectangle's template:

TypeScript:

```ts
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

JavaScript:

```js
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `ISunburstDataItem` for available keys for the data placeholders.

## Example

Example: [Sunburst chart](https://docs.amcharts.com/embeds/v5/sunburst-chart-2/). Its code: get_example(path: "examples/docs-demos/sunburst-chart-2").

## Related tutorials

* [Toggling multi-level Sunburst nodes with legend](https://docs.amcharts.com/v5/tutorials/toggling-multi-level-sunburst-nodes-with-legend/)
