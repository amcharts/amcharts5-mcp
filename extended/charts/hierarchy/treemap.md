---
title: "Treemap"
source: "https://docs.amcharts.com/v5/charts/hierarchy/treemap/"
scraped: "2026-11-25"
---

This tutorial will look at how to configure treemap series.

## Nodes

### Layout algorithm

Treemap can use different ways to layout algorithms.

It's controlled by the setting `layoutAlgorithm`:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    layoutAlgorithm: "sliceDice"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    layoutAlgorithm: "sliceDice"
  })
);
```

Available settings are as follows:

| Setting value | Example                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `"binary"`    | ![Treemap with groups split into balanced blocks of mixed shapes](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_binary.png)          |
| `"squarify"`  | ![Treemap with tiles kept as close to square as possible](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_squarify.png)                |
| `"slice"`     | ![Treemap with every tile a full-width horizontal strip](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_slice.png)                    |
| `"dice"`      | ![Treemap with every tile a full-height vertical strip](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_dice.png)                      |
| `"sliceDice"` | ![Treemap with groups as vertical columns, split into horizontal tiles](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_slicedice.png) |

### Margins

By default, the rectangles of the nodes are plotted without any gaps between them.

We do have a few settings at our disposal that we can use to control the gaps. All accept numeric value in pixels.

| Setting             | Comment                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodePaddingInner`  | Gap between nodes.                                                                                                                                                                |
| `nodePaddingOuter`  | Gap between a node's edges and the nodes inside it. For the top node, that's the gap to the chart's edges. Overrides the four settings below.                                     |
| `nodePaddingTop`    | Gap between a node's top edge and the nodes inside it. Ignored if `nodePaddingOuter` is set. Use it for [parent node headers](https://docs.amcharts.com/v5/charts/hierarchy/treemap/#parent-node-headers). |
| `nodePaddingBottom` | Gap between a node's bottom edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                   |
| `nodePaddingLeft`   | Gap between a node's left edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                     |
| `nodePaddingRight`  | Gap between a node's right edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                    |

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 20,
    nodePaddingInner: 10
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 20,
    nodePaddingInner: 10
  })
);
```

![Treemap with tiles touching, no gaps](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_no_padding.png "Default behavior")

![Treemap with an even border around the tiles and gaps between them](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_padding.png "`nodePaddingOuter: 20` | `nodePaddingInner: 10`")

![Treemap with a wide empty band above the tiles](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_top_padding.png "`nodePaddingInner: 10` | `nodePaddingTop: 100` | `nodePaddingBottom: 20` | `nodePaddingLeft: 20` | `nodePaddingRight: 20`")

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

Node labels are pre-set to display name of the category and its percent value.

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

### Parent node headers

Every label is centered on its tile, so when child tiles are shown, they cover their parent's label. There's no header setting. To show parent names in a header band:

* `nodePaddingTop` reserves a band at the top of every parent tile.
* Adapters move the label of each tile whose children are shown into that band. Other labels stay centered.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    topDepth: 1,
    initialDepth: 1,
    nodePaddingTop: 24
  })
);

function showsChildren(label: am5.Label): boolean {
  const dataItem = label.dataItem as am5.DataItem<am5hierarchy.ITreemapDataItem> | undefined;
  return !!dataItem && !!dataItem.get("children") && !dataItem.get("disabled");
}

series.labels.template.adapters.add("y", (y, target) => {
  return showsChildren(target) ? 0 : y;
});

series.labels.template.adapters.add("centerY", (centerY, target) => {
  return showsChildren(target) ? 0 : centerY;
});
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    topDepth: 1,
    initialDepth: 1,
    nodePaddingTop: 24
  })
);

function showsChildren(label) {
  var dataItem = label.dataItem;
  return dataItem && dataItem.get("children") && !dataItem.get("disabled");
}

series.labels.template.adapters.add("y", function(y, target) {
  return showsChildren(target) ? 0 : y;
});

series.labels.template.adapters.add("centerY", function(centerY, target) {
  return showsChildren(target) ? 0 : centerY;
});
```

When you drill in, the selected tile's name stays in the band above its children.

With `topDepth: 1`, the hidden root node keeps its band too, which leaves an empty strip at the top. To label it instead, show the root with `topDepth: 0`.

Example: [Treemap with parent headers and one-level drill-down](https://docs.amcharts.com/embeds/v5/treemap-parent-headers/). Its code: get_example(path: "examples/docs-demos/treemap-parent-headers").

The example also drills one level per click. See "[Drilling one level per click](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/#drilling-one-level-per-click)".

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

We can modify contents of the tooltips using `tooltipText` on node's template:

TypeScript:

```ts
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

JavaScript:

```js
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

## Example

Example: [Treemap chart](https://docs.amcharts.com/embeds/v5/treemap-chart-2/). Its code: get_example(path: "examples/docs-demos/treemap-chart-2").

## Related tutorials

* [Adaptive label colors on a Treemap](https://docs.amcharts.com/v5/tutorials/adaptive-label-colors-on-a-treemap/)
* [Treemap with partial fills in nodes](https://docs.amcharts.com/v5/tutorials/treemap-with-partial-fills-in-nodes/) (demo)
* [Treemap with auto-colored labels](https://docs.amcharts.com/v5/tutorials/treemap-with-auto-colored-labels/) (demo)
* [Treemap with highlight of parent node on hover](https://docs.amcharts.com/v5/tutorials/treemap-with-highlight-of-parent-node-on-hover/) (demo)
