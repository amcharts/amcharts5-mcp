---
title: "Voronoi Treemap"
source: "https://docs.amcharts.com/v5/charts/hierarchy/voronoi-treemap/"
scraped: "2026-11-25"
---

This tutorial provides information on how to create Weighted Voronoi Treemaps.

Voronoi treemaps are a method of visualizing hierarchical data using Voronoi diagrams, where each cell represents a portion of the data and the hierarchy is encoded by the nesting of cells within each other.

## Diagram shape

### Type

Voronoi treemap can either take rectangular or polygon shape.

It's controlled by setting `shapeType`, with two possible values: `"rectangle"`, and `"polygon"` (default).

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.VoronoiTreemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    shapeType: "rectangle"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.VoronoiTreemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    shapeType: "rectangle"
  })
);
```

| Setting value | Example                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `"rectangle"` | ![Voronoi treemap filling a rectangle](https://docs.amcharts.com/v5/images/charts/hierarchy/voronoi-treemap/voronoi_rectangle.png) |
| `"polygon"`   | ![Voronoi treemap filling a circle](https://docs.amcharts.com/v5/images/charts/hierarchy/voronoi-treemap/voronoi_circle.png)       |

### Corner count

For the `"polygon"` shape type, we can also control the shape by setting `cornerCount` setting.

The bigger the value, the more corners, the rounder the shape, with `120` (default) resulting in a perfect circle.

![Voronoi treemap with a smooth circular outline](https://docs.amcharts.com/v5/images/charts/hierarchy/voronoi-treemap/voronoi_circle-1024x816.png "`cornerCount: 120 (default)`")

![Voronoi treemap shaped as a ten-sided polygon](https://docs.amcharts.com/v5/images/charts/hierarchy/voronoi-treemap/voronoi_polygon-1024x816.png "`cornerCount: 10`")

![Voronoi treemap shaped as a triangle](https://docs.amcharts.com/v5/images/charts/hierarchy/voronoi-treemap/voronoi_triangle-1024x816.png "`cornerCount: 3`")

## Nodes

### Handling small nodes

In Voronoi treemap, nodes are sized relatively to their value (weight). However, the chart will not let the node get smaller than certain threshold, so each node has at leas minimal size.

The setting that controls it is `minWeightRatio` (default `0.005`).

It means the fraction of the weight of the biggest node. As an example: if the biggest node has value of 1000, with `minWeightRatio` set at `0.005`, the minimum weight will be `5`, and small nodes will be drawn as having that value, even if their actual value is smaller than that.

> **Note:** Since artificially scaling up small nodes distorts visual representation, it's best to avoid data with nodes in very big differences in values, and group small nodes into a single "Others" item.

### Accuracy VS performance

There are also two other settings of the Voronoi treemap that can control calculations when sizing and laying out the nodes:

* `convergenceRatio` (default: `0.005`)\
  The convergence ratio is calculated as the ratio of the summed area of the smallest enclosing rectangle for each cell to the total area of the treemap. A lower convergence ratio indicates a better representation of the hierarchy, meaning that the cells are closely packed and the treemap effectively captures the nested relationships between the data elements, but will also increase CPU load.
* `maxIterationCount` (default: `100`)\
  Maximum allowed number of iterations when computing the layout. Computation is stopped when it number of iterations is reached, even if the `convergenceRatio` is not yet reached. The bigger number means finer results, but slower performance.

### Node appearance

The appearance of node polygons can be configured using their template, accessible on series property: `rectangles.polygons`.

Those are an element of type `Polygon`.

TypeScript:

```ts
series.polygons.template.setAll({
  stroke: am5.color(0x000000)
});
```

JavaScript:

```js
series.polygons.template.setAll({
  stroke: am5.color(0x000000)
});
```

### Hover behavior

We can set setting values to apply to a rectangle when it is hovered by creating a "hover" [state](https://docs.amcharts.com/v5/concepts/settings/states/) for it.

TypeScript:

```ts
series.polygons.template.states.create("hover", {
  fill: am5.color(0x677935),
  fillOpacity: 1
});
```

JavaScript:

```js
series.polygons.template.states.create("hover", {
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

Node labels are pre-set to display name of the node (category).

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

## Different settings based on level

It's possible target settings to nodes and labels at specific level of the hierarchy using [custom themes](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme).

The following code will hide all top- and first-level labels, as well as apply thicker outline to the first-level nodes:

TypeScript:

```ts
let myTheme = am5.Theme.new(root);

myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth1"]).setAll({
  strokeWidth: 5
});

myTheme.rule("Label", ["node", "depth0"]).setAll({
  forceHidden: true
});

myTheme.rule("Label", ["node", "depth1"]).setAll({
  forceHidden: true
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth1"]).setAll({
  strokeWidth: 5
});

myTheme.rule("Label", ["node", "depth0"]).setAll({
  forceHidden: true
});

myTheme.rule("Label", ["node", "depth1"]).setAll({
  forceHidden: true
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

Basically, we can target elements using `"depth*"` tag in theme selectors.

## Tooltips

Nodes are pre-set to display a tooltip on hover containing name of the node and its value.

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

Example: [Round Voronoi Treemap](https://docs.amcharts.com/embeds/v5/round-voronoi-treemap/). Its code: get_example(path: "examples/docs-demos/round-voronoi-treemap").
