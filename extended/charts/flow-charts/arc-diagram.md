---
title: "Arc Diagram"
source: "https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/"
scraped: "2026-11-25"
---

This tutorial contains information for creating Arc diagram.

## Flow chart

An Arc diagram is a flow chart. For generic flow chart related information, please visit "[Flow charts](https://docs.amcharts.com/v5/charts/flow-charts/)" tutorial.

## Orientation

Arc diagram is drawn horizontal by default.

We can change it using series' `orientation` setting:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    orientation: "vertical"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    orientation: "vertical"
  })
);
```

![Arc diagram with nodes in a row along the bottom, links arching above](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_diagram_horizontal-1024x816.png "`orientation: 'horizontal'` (default)")

![Arc diagram with nodes in a column on the left, links arching to the right](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_diagram_vertical-1024x816.png "`orientation: 'vertical'`")

## Nodes (circles)

Nodes in Arc diagram are represented by circles.

### Circle radius

The radius of the circles in an Arc diagram represent its relative value: the bigger the value, the bigger the circle.

The value of a node is determined by sum of all incoming and outgoing links.

We can change the value used in calculation of node's size using diagram's `radiusKey` setting:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    radiusKey: "sumIncoming"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    radiusKey: "sumIncoming"
  })
);
```

| Value             | Comment                                                      |
| ----------------- | ------------------------------------------------------------ |
| `"sum"` (default) | Sum of values of all incoming and outgoing links.            |
| `"sumIncoming"`   | Sum of values of all incoming links.                         |
| `"sumOutgoing"`   | Sum of values of all outgoing links.                         |
| `"none"`          | No values are calculated. All circles will be the same size. |

### Minimal radius

When sizing nodes, the diagram takes into account available space: the circle of each node will have its radius set proportionally to the highest available value.

However, the diagram will not allow circles to get smaller than 5px radius, even if their value would call for a smaller circle.

We can change this threshold using `minRadius` setting:

TypeScript:

```ts
let series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    minRadius: 10
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    minRadius: 10
  })
);
```

### Configuring circles

Nodes in Arc diagrams are represented by their own series, accessible via read-only property `nodes` which is an object of type `ArcDiagramNodes`.

It subsequently has a property `circles` which is a list of all nodes in series.

Since it's a "list template", we can use its `template` property to set any setting for the node, which is of type `Circle`:

TypeScript:

```ts
series.nodes.circles.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeWidth: 1
});
```

JavaScript:

```js
series.nodes.circles.template.setAll({
  fillOpacity: 0.5,
  stroke: am5.color(0x000000),
  strokeWidth: 1
});
```

### Node data

#### Setting node data

In Arc diagrams, node ids (and names) are derived from link data (via `sourceIdField` and `targetIdField`).

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

> **Important:** Setting node data must come **before** setting series data.

#### Modifying data fields

Node series (which is `ArcDiagramNodes`) is automatically set up for these data fields:

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

## Links

### Configuring links

The links can be configured using `series.links.template`:

TypeScript:

```ts
series.links.template.setAll({
  stroke: am5.color(0xff0000),
  strokeWidth: 5,
  strokeOpacity: 0.3
});
```

JavaScript:

```js
series.links.template.setAll({
  stroke: am5.color(0xff0000),
  strokeWidth: 5,
  strokeOpacity: 0.3
});
```

Refer to the [class reference of the `ArcDiagramLink`](https://docs.amcharts.com/v5/reference/arcdiagramlink/#settings) for more settings.

### Color mode

The links can be colored in a number of ways via link template's `strokeStyle` setting:

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

| `fillStyle`         | Comment                                               | Example                                                                                                                                       |
| ------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `"solid"` (default) | Solid color.                                          | ![Arc diagram with all links in solid black](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_solid.png)                                    |
| `"gradient"`        | Gradient from source node color to target node color. | ![Arc diagram with links fading from source node color to target node color](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_gradient.png) |
| `"source"`          | Source node color.                                    | ![Arc diagram with each link in its source node color](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_source.png)                         |
| `"target"`          | Target node color.                                    | ![Arc diagram with each link in its target node color](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_target.png)                         |

## Labels

### Configuring labels

Labels in an Arc diagram are attached to nodes, so they can be configured via `nodes` sub-series, specifically `nodes.labels.template`:

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

Refer to [`Label` class reference](https://docs.amcharts.com/v5/reference/label/#settings) for a full list of available settings.

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

For available data placeholder fields refer to `IArcDiagramNodesDataItem`.

### Alignment

By default, labels are aligned to the center of the node (rotated vertically for the horizontal version of the diagram).

We can use a combination of label's settings to control how they are aligned, positioned, and rotated:

| Setting        | Default (horizontal) | Default (vertical) | Comment                         |
| -------------- | -------------------- | ------------------ | ------------------------------- |
| `centerY`      | `am5.percent(50)`    | `am5.percent(50)`  | Vertical center of the label    |
| `centerX`      | `am5.percent(100)`   | `am5.percent(100)` | HNorizontal center of the label |
| `rotation`     | `-90`                | -                  | Rotation in degrees             |
| `paddingRight` | -                    | `15`               | Top padding                     |

The following code will "unrotate" horizontal diagram's labels, as well as place them in the middle of the circle:

TypeScript:

```ts
series.nodes.labels.template.setAll({
  rotation: 0,
  centerX: am5.percent(50)
});
```

JavaScript:

```js
series.nodes.labels.template.setAll({
  rotation: 0,
  centerX: am5.percent(50)
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

## Examples

### Horizontal

Example: [Horizontal Arc Diagram](https://docs.amcharts.com/embeds/v5/horizontal-arc-diagram/). Its code: get_example(path: "examples/docs-demos/horizontal-arc-diagram").

### Vertical

Example: [Vertical Arc Diagram](https://docs.amcharts.com/embeds/v5/vertical-arc-diagram/). Its code: get_example(path: "examples/docs-demos/vertical-arc-diagram").
