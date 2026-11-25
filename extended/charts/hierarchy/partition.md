---
title: "Partition"
source: "https://docs.amcharts.com/v5/charts/hierarchy/partition/"
scraped: "2026-11-25"
---

This tutorial will look at how to configure partition series.

## Orientation

Partition will plot itself in vertical mode, i.e. with top-level nodes on the top, second level beneath them, etc.

We can change that using series' `orientation` setting, by setting it to `"horizontal"`. It will put top level on the left, with other levels lining up to the right.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal"
  })
);
```

![Partition chart with the root on top and levels stacked downward](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/vertical_partition.png "`orientation: 'vertical'` (default)")

![Partition chart with the root on the left and levels going right](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/horizontal_partition.png "`orientation: 'horizontal'`")

Example: [Horizontal partition chart](https://docs.amcharts.com/embeds/v5/horizontal-partition-chart/). Its code: get_example(path: "examples/docs-demos/horizontal-partition-chart").

## Nodes

### Margins

By default, the squares of the nodes are plotted without any gaps between them.

We can increase that gap using series setting `nodePadding`. It accepts numeric values in pixels:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePadding: 5
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePadding: 5
  })
);
```

![Partition chart with nodes touching, no gaps](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/partition_padding_0.png "`nodePadding: 0` (default)")

![Partition chart with visible gaps between nodes](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/partition_padding_5.png "`nodePadding: 5`")

### Node appearance

The appearance of node rectangles can be configured using their template, accessible on series property: `rectangles.template`.

The template can have contain any `RoundedRectangle` [setting](https://docs.amcharts.com/v5/reference/roundedrectangle/#settings).

TypeScript:

```ts
series.rectangles.template.setAll({
  fillOpacity: 0.7,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4
});
```

JavaScript:

```js
series.rectangles.template.setAll({
  fillOpacity: 0.7,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4
});
```

### Hover behavior

We can set setting values to apply to a rectangle when it is hovered by creating a "hover" [state](https://docs.amcharts.com/v5/concepts/settings/states/) for it.

TypeScript:

```ts
series.rectangles.template.states.create("hover", {
  fill: am5.color(0x677935),
  fillOpacity: 1
});
```

JavaScript:

```js
series.rectangles.template.states.create("hover", {
  fill: am5.color(0x677935),
  fillOpacity: 1
});
```

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

Partition series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

### Label content

Node labels are pre-set to display name of the node.

We can modify contents of the tooltips using `text` setting on a series label template:

TypeScript:

```ts
series.labels.template.setAll({
  text: "{category}: [bold]{sum}[/]",
  fontSize: 14
});
```

JavaScript:

```js
series.labels.template.setAll({
  text: "{category}: [bold]{sum}[/]",
  fontSize: 14
});
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `IPartitionDataItem` for available keys for the data placeholders.

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

## Tooltips

Rectangles series are pre-set to display a tooltip on hover containing name of the category and its value.

We can modify contents of the tooltips using `tooltipText` on rectangle's template:

TypeScript:

```ts
series.rectangles.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

JavaScript:

```js
series.rectangles.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `IPartitionDataItem` for available keys for the data placeholders.

## Example

Example: [Partition chart](https://docs.amcharts.com/embeds/v5/partition-chart/). Its code: get_example(path: "examples/docs-demos/partition-chart").
