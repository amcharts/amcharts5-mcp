---
title: "Pack"
source: "https://docs.amcharts.com/v5/charts/hierarchy/pack/"
scraped: "2026-11-16"
---

This tutorial will look at how to configure pack series.

## Circles

In pack series, `circles.template` can be used to configure node circles. All nodes have them.

The template accepts all [`Circle` settings](https://docs.amcharts.com/v5/reference/circle/#settings).

TypeScript:

```ts
series.circles.template.setAll({
  fillOpacity: 0.7,
  strokeWidth: 1,
  strokeOpacity: 1
});
```

JavaScript:

```js
series.circles.template.setAll({
  fillOpacity: 0.7,
  strokeWidth: 1,
  strokeOpacity: 1
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

Pack series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

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

Refer to `IPackDataItem` for available keys for the data placeholders.

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

Refer to `IPackDataItem` for available keys for the data placeholders.

## Example

Example: [Pack chart](https://docs.amcharts.com/embeds/v5/pack-chart/). Its code: get_example(path: "examples/docs-demos/pack-chart").
