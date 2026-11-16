---
title: "Chord diagram"
source: "https://docs.amcharts.com/v5/charts/flow-charts/chord-diagram/"
scraped: "2026-11-16"
---

## Flow chart

A chord diagram is a flow chart. For generic flow chart related information, please visit "[Flow charts](https://docs.amcharts.com/v5/charts/flow-charts/)" tutorial.

## Types of chord

There are three main types of chord series: regular, directed, and non-ribbon.

The type of the series not only affects how links look, but also how value of the node is calculated, which in turn affects its width.

| Regular series                                                    | Directed series                                                     | Non-ribbon series                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **`Chord`**                                                       | **`ChordDirected`**                                                 | **`ChordNonRibbon`**                                                  |
| Node size depends on a sum of all outgoing links.                 | Node size depends on a sum of all incoming and outgoing links.      | Node size is fixed regardless of actual values.                       |
| ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/cord_regular.png) | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_directed.png) | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/courd_non_ribbon.png) |

## Regular series

Regular chord series is created using `Chord` class.

It sizes nodes based on a sum of values of all outgoing links.

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value"
  })
);
```

Example: [Chord diagram](https://docs.amcharts.com/embeds/v5/chord-diagram/). Its code: get_example(path: "examples/docs-demos/chord-diagram").

There are no special regular-chord-only settings.

## Directed series

Chord directed sizes its nodes base on sum of **both** the outgoing and incoming links.

It also indicates the direction of the link by adding an arrowhead at the target end.

The length of the arrowhead is 10 pixels by default. We can change it by setting series' `linkHeadRadius` setting.

We can also disable arrowhead altogether by setting `linkHeadRadius` to `null`:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    linkHeadRadius: null
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    linkHeadRadius: null
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_default.png "`linkHeadRadius: 10` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_20.png "`linkHeadRadius: 20`")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_null.png "`linkHeadRadius: null`")

Example: [Chord directed diagram](https://docs.amcharts.com/embeds/v5/chord-directed-diagram/). Its code: get_example(path: "examples/docs-demos/chord-directed-diagram").

## Non-ribbon series

Non-ribbon chord series does not take any value into account when sizing its nodes.

It also displays links as thin lines, that are curved from source to target node.

We can make them display as straight lines by setting series `linkType` setting to `"line"`:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.ChordNonRibbon.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    linkType: "line"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.ChordNonRibbon.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    linkType: "line"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linktype_curve.png "`linkType: 'curve'` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linktype_line.png "`linkType: 'line'`")

Example: [Chord non-ribbon  diagram](https://docs.amcharts.com/embeds/v5/chord-non-ribbon-diagram/). Its code: get_example(path: "examples/docs-demos/chord-non-ribbon-diagram").

## Nodes

### Width

Nodes (colored bands) are 10 pixel wide by default.

We can use series setting `nodeWidth` to change that:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    nodeWidth: 5
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    nodeWidth: 5
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_default.png "`nodeWidth: 10` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/nodewidth_30.png "`nodeWidth: 30`")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/nodewidth_5.png "`nodeWidth: 5`")

### Configuring nodes

Nodes in flow diagrams are represented by their own series, accessible via read-only property `nodes` which is an object of type `ChordNodes`.

It subsequently has a property `rectangles` which is a list of all nodes in series.

Since it's a "list template", we can use its `template` property to set any setting for the node, which is of type `Slice`:

TypeScript:

```ts
series.nodes.rectangles.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeWidth: 1
});
```

JavaScript:

```js
series.nodes.rectangles.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeWidth: 1
});
```

Example: [Chord diagram](https://docs.amcharts.com/embeds/v5/chord-diagram-2/). Its code: get_example(path: "examples/docs-demos/chord-diagram-2").

### Node data

#### Setting node data

In chord diagrams, node ids (and names) are derived from link data (via `sourceIdField` and `targetIdField`).

In some cases, we might need more than just node id which comes from chord data.

For that we can set own data on `series.nodes.data`:

TypeScript:

```ts
series.nodes.data.setAll([
  { id: "A", name: "Node A" },
  { id: "B", name: "Node B" },
  { id: "C", name: "Node C" }
]);
```

JavaScript:

```js
series.nodes.data.setAll([
  { id: "A", name: "Node A" },
  { id: "B", name: "Node B" },
  { id: "C", name: "Node C" }
]);
```

#### Modifying data fields

Node series (which is `ChordNodes`) is automatically set up for these data fields:

| Data field  | Default value | Comment                  |
| ----------- | ------------- | ------------------------ |
| `idField`   | `"id"`        | ID of the node.          |
| `nameField` | `"id"`        | Name of the node.        |
| `fillField` | `"fill"`      | Fill color for the node. |

We can modify those to suit our data:

TypeScript:

```ts
series.nodes.setAll({
  idField: "id",
  nameField: "name"
});

series.nodes.data.setAll([
  { id: "A", name: "Node A" },
  { id: "B", name: "Node B" },
  { id: "C", name: "Node C" }
]);
```

JavaScript:

```js
series.nodes.setAll({
  idField: "id",
  nameField: "name"
});

series.nodes.data.setAll([
  { id: "A", name: "Node A" },
  { id: "B", name: "Node B" },
  { id: "C", name: "Node C" }
]);
```

> **Important:** Data fields need to be set before data or they will not work as expected.

#### Node colors via data

We can also specify custom colors for nodes via node data:

TypeScript:

```ts
series.nodes.data.setAll([
  { id: "A", name: "Node A", fill: am5.color(0xFF621F) },
  { id: "B", name: "Node B", fill: am5.color(0x297373) },
  { id: "C", name: "Node C", fill: am5.color(0x946B49) }
]);
```

JavaScript:

```js
series.nodes.data.setAll([
  { id: "A", name: "Node A", fill: am5.color(0xFF621F) },
  { id: "B", name: "Node B", fill: am5.color(0x297373) },
  { id: "C", name: "Node C", fill: am5.color(0x946B49) }
]);
```

The fill color will be lookup up in a `"fill"` field of the data. If we need to use something else, we will need to configure node series' `fillField` as well:

TypeScript:

```ts
series.nodes.setAll({
  idField: "id",
  nameField: "name",
  fillField: "color"
});

series.nodes.data.setAll([
  { id: "A", name: "Node A", color: am5.color(0xFF621F) },
  { id: "B", name: "Node B", color: am5.color(0x297373) },
  { id: "C", name: "Node C", color: am5.color(0x946B49) }
]);
```

JavaScript:

```js
series.nodes.setAll({
  idField: "id",
  nameField: "name",
  fillField: "color"
});

series.nodes.data.setAll([
  { id: "A", name: "Node A", color: am5.color(0xFF621F) },
  { id: "B", name: "Node B", color: am5.color(0x297373) },
  { id: "C", name: "Node C", color: am5.color(0x946B49) }
]);
```

### Gaps between nodes

Chord diagrams display a tiny gap between each node by default.

We can control the size of it using series' `padAngle` setting.

It accepts a numeric value in degrees.

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    padAngle: 5
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    padAngle: 5
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_default.png "`padAngle: 1` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/padangle_10.png "`padAngle: 10`")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/padangle_0.png "`padAngle: 0`")

### Ordering nodes

Nodes in a chord diagram are ordered by their value: from biggest to smallest.

To change the order, there's a series setting `sort` with possible values: `"descending"` (default), `"ascending"`, and `"none"`.

If set to `"none"` the nodes will appear in the same order by their first appearance in data.

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    order: "none"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    order: "none"
  })
);
```

## Radius

Chart's outer radius can be set using its `radius` setting.

It can be either percent value (relative to available space) or fixed pixel value.

Chord diagram's `radius` is set to `90%` by default to leave some space for possible labels.

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    radius: am5.percent(90)
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    radius: am5.percent(90)
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_default.png "`radius: am5.percent(90)` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_radius_95.png "`radius: am5.percent(95)`")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_radius_50.png "`radius: 100`")

## Start angle

Chord diagram usually starts at zero angle (or the "right" edge of the circle). That's where first node is drawn.

We can change that using series' setting `startAngle`, which is a numeric value in degrees.

The angle can also be negative number:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    startAngle: -90
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.Chord.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    startAngle: -90
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/linkheadradius_default.png "`startAngle: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chort_startangle_90.png "`startAngle: -90`")

## Links

### Configuring links

We can configure links using series property `links.template`. Via template, we can set any [`ChordLink` setting](https://docs.amcharts.com/v5/reference/chordlink/#settings).

TypeScript:

```ts
series.links.template.setAll({
  fillOpacity: 0.5
});
```

JavaScript:

```js
series.links.template.setAll({
  fillOpacity: 0.5
});
```

### Color mode

Chord links can be colored in a number of ways via link template's `fillStyle` setting:

TypeScript:

```ts
series.links.template.setAll({
  fillStyle: "solid"
});
```

JavaScript:

```js
series.links.template.setAll({
  fillStyle: "solid"
});
```

These values are available for `fillStyle`:

| `fillStyle`         | Comment                                               | Example                                                                       |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| `"solid"` (default) | Solid color.                                          | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_fillstyle_solid.png)    |
| `"gradient"`        | Gradient from source node color to target node color. | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_fillstyle_gradient.png) |
| `"source"`          | Source node color.                                    | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_fillstyle_source.png)   |
| `"target"`          | Target node color.                                    | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_fillstyle_target.png)   |

## Labels

Chord diagram will display a label next to its nodes by default.

### Configuring labels

Labels in chord diagram are attached to nodes, so they can be configured via `nodes` sub-series, specifically `nodes.labels.template`:

TypeScript:

```ts
series.nodes.labels.template.setAll({
  fontSize: 20,
  maxWidth: 150,
  wrap: true
});
```

JavaScript:

```js
series.nodes.labels.template.setAll({
  fontSize: 20,
  maxWidth: 150,
  wrap: true
});
```

Refer to [`RadialLabel` class reference](https://docs.amcharts.com/v5/reference/radiallabel/#settings) for a full list of available settings.

### Label content

To change label content, we only need to set `text` property of the label template:

TypeScript:

```ts
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})"
});
```

JavaScript:

```js
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})"
});
```

Contents of the label can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

For available data placeholder fields refer to `IChordNodesDataItem`.

### Label type

Normally, chord series will use circular labels: ones that follow the curve of the node itself.

This can be changed using label setting: `textType`.

Available values are: `"circular"` (default), `"radial"`, and `"adjusted"`.

TypeScript:

```ts
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})",
  textType: "radial"
});
```

JavaScript:

```js
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})",
  textType: "radial"
});
```

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_labels_circular.png "`textType: 'circular'` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_labels_radial.png "`textType: 'radial'`")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/chord-diagram/chord_labels_adjusted-1.png "`textType: 'adjusted'`")

Example: [Chord directed diagram](https://docs.amcharts.com/embeds/v5/chord-directed-diagram/). Its code: get_example(path: "examples/docs-demos/chord-directed-diagram").

### Label radius

The distance between label and outer edge of the node is controlled by label's `radius` setting.

It accepts numeric values in pixels, including negative values. The latter would put label inside the node.

TypeScript:

```ts
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})",
  textType: "radial",
  radius: 20
});
```

JavaScript:

```js
series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})",
  textType: "radial",
  radius: 20
});
```

### Disabling labels

To disable labels, we can simply set their `forceHidden` to `true`:

TypeScript:

```ts
series.nodes.labels.template.set("forceHidden", true);
```

JavaScript:

```js
series.nodes.labels.template.set("forceHidden", true);
```

## Tooltips

### On links

Links will display a tooltip when hovered/touched. The default content is `"{sourceId} - {targetId}: {value}"` which will show source node ID, followed by target node ID, and link value.

To change it, we can use link's `tooltipText` setting:

TypeScript:

```ts
series.links.template.setAll({
  tooltipText: "From: [bold]{sourceId}[/]\nTo: [bold]{targetId}\nValue: [bold]{value}[/]"
});
```

JavaScript:

```js
series.links.template.setAll({
  tooltipText: "From: [bold]{sourceId}[/]\nTo: [bold]{targetId}\nValue: [bold]{value}[/]"
});
```

Contents of the tooltip can include data placeholders (codes in curly brackets that will be replaced by actual data) and in-line formatting blocks (formatting instructions enclosed in square brackets).

For available data placeholder fields refer to `IChordDataItem`.

### On nodes

To add tooltips to nodes, simple set `tooltipText` on node template:

TypeScript:

```ts
series.nodes.rectangles.template.setAll({
  tooltipText: "[bold]{name}[/]\nOutgoing: {sumOutgoing}\nIncoming: {sumIncoming}"
});
```

JavaScript:

```js
series.nodes.rectangles.template.setAll({
  tooltipText: "[bold]{name}[/]\nOutgoing: {sumOutgoing}\nIncoming: {sumIncoming}"
});
```

For available data placeholder fields refer to `IChordNodesDataItem`.
