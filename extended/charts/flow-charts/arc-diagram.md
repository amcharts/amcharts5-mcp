---
title: "Arc Diagram"
source: "https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/"
scraped: "2026-11-16"
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

![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_diagram_horizontal-1024x816.png "`orientation: 'horizontal'` (default)")

![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_diagram_vertical-1024x816.png "`orientation: 'vertical'`")

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

| `fillStyle`         | Comment                                               | Example                                                              |
| ------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `"solid"` (default) | Solid color.                                          | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_solid.png)    |
| `"gradient"`        | Gradient from source node color to target node color. | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_gradient.png) |
| `"source"`          | Source node color.                                    | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_source.png)   |
| `"target"`          | Target node color.                                    | ![](https://docs.amcharts.com/v5/images/charts/flow-charts/arc-diagram/arc_link_target.png)   |

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

Example: [Horizontal Arc Diagram](https://docs.amcharts.com/embeds/v5/horizontal-arc-diagram/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/flow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/
var series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    orientation: "horizontal"
  })
);

// Configure labels
// https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/#labels
series.nodes.labels.template.setAll({
  fontSize: "0.85em",
  paddingLeft: 20,
  paddingRight: 20
});

// Selectively position/rotate labels if they fit within node circle
series.nodes.labels.template.adapters.add("x", function (x, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    if (dataItem.get("circle").get("radius") > 30) {
      target.set("centerX", am5.p50);
      target.set("rotation", 0);
    } else {
      target.set("centerX", 0);
      target.set("rotation", 90);
    }
  }
  return x;
});

// Set data
// https://docs.amcharts.com/v5/charts/flow-charts/#setting-data
series.data.setAll([
  { from: "Monica", to: "Rachel", value: 4 },
  { from: "Monica", to: "Chandler", value: 63 },
  { from: "Monica", to: "Ross", value: 16 },
  { from: "Monica", to: "Joey", value: 9 },
  { from: "Monica", to: "Phoebe", value: 3 },
  { from: "Monica", to: "Paul the wine guy", value: 1 },
  { from: "Monica", to: "Mr Geller", value: 6 },
  { from: "Monica", to: "Mrs Geller", value: 5 },
  { from: "Monica", to: "Pete", value: 10 },
  { from: "Monica", to: "Chip", value: 1 },
  { from: "Monica", to: "Timothy (Burke)", value: 1 },
  { from: "Monica", to: "Emily", value: 1 },
  { from: "Monica", to: "Dr. Roger", value: 3 },
  { from: "Rachel", to: "Chandler", value: 7 },
  { from: "Rachel", to: "Ross", value: 80 },
  { from: "Rachel", to: "Joey", value: 30 },
  { from: "Rachel", to: "Phoebe", value: 6 },
  { from: "Rachel", to: "Tag", value: 4 },
  { from: "Rachel", to: "Melissa", value: 1 },
  { from: "Rachel", to: "Gavin", value: 2 },
  { from: "Chandler", to: "Joey", value: 1 },
  { from: "Chandler", to: "Phoebe", value: 7 },
  { from: "Chandler", to: "Janice", value: 11 },
  { from: "Chandler", to: "Joanna", value: 5 },
  { from: "Chandler", to: "Kathy", value: 7 },
  { from: "Chandler", to: "Mr Bing", value: 1 },
  { from: "Ross", to: "Joey", value: 3 },
  { from: "Ross", to: "Phoebe", value: 18 },
  { from: "Ross", to: "Carol", value: 10 },
  { from: "Ross", to: "Mrs Geller", value: 8 },
  { from: "Ross", to: "Ben", value: 6 },
  { from: "Ross", to: "Emily", value: 12 },
  { from: "Ross", to: "Jill", value: 1 },
  { from: "Ross", to: "Elizabeth", value: 8 },
  { from: "Ross", to: "Aunt Millie", value: 2 },
  { from: "Ross", to: "Mona", value: 11 },
  { from: "Ross", to: "Emma", value: 7 },
  { from: "Ross", to: "Charlie", value: 10 },
  { from: "Joey", to: "Phoebe", value: 6 },
  { from: "Joey", to: "Janine", value: 9 },
  { from: "Joey", to: "Erin", value: 1 },
  { from: "Joey", to: "Cecilia", value: 3 },
  { from: "Joey", to: "Charlie", value: 3 },
  { from: "Phoebe", to: "David", value: 14 },
  { from: "Phoebe", to: "Roger", value: 1 },
  { from: "Phoebe", to: "Duncan", value: 1 },
  { from: "Phoebe", to: "Rob Dohnen", value: 2 },
  { from: "Phoebe", to: "Sergei", value: 1 },
  { from: "Phoebe", to: "Vince", value: 2 },
  { from: "Phoebe", to: "Mike", value: 18 },
  { from: "Carol", to: "Ben", value: 1 },
  { from: "Carol", to: "Susan", value: 1 },
  { from: "Mr Geller", to: "Mrs Geller", value: 3 },
  { from: "Frank", to: "Alice", value: 5 }
]);

// Make stuff animate on load
series.appear(1000, 100);
```

### Vertical

Example: [Vertical Arc Diagram](https://docs.amcharts.com/embeds/v5/vertical-arc-diagram/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/flow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/
var series = root.container.children.push(
  am5flow.ArcDiagram.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    orientation: "vertical"
  })
);

// Configure labels
// https://docs.amcharts.com/v5/charts/flow-charts/arc-diagram/#labels
series.nodes.labels.template.setAll({
  fontSize: "0.85em",
  paddingLeft: 20,
  paddingRight: 20,
  width: 160
});

// Animated bullets
series.bullets.push(function (_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(),
    sprite: am5.Circle.new(root, {
      radius: 2,
      fill: dataItem.get("source").get("fill")
    })
  });

  bullet.animate({
    key: "locationY",
    to: 1,
    from: 0,
    duration: Math.random() * 1000 + 2000,
    loops: Infinity
  });

  return bullet;
});

// Set data
// https://docs.amcharts.com/v5/charts/flow-charts/#setting-data
series.data.setAll([
  { from: "Monica", to: "Rachel", value: 4 },
  { from: "Monica", to: "Chandler", value: 63 },
  { from: "Monica", to: "Ross", value: 16 },
  { from: "Monica", to: "Joey", value: 9 },
  { from: "Rachel", to: "Chandler", value: 7 },
  { from: "Rachel", to: "Ross", value: 80 },
  { from: "Rachel", to: "Joey", value: 30 },
  { from: "Rachel", to: "Phoebe", value: 6 },
  { from: "Chandler", to: "Phoebe", value: 7 },
  { from: "Chandler", to: "Janice", value: 11 },
  { from: "Chandler", to: "Joanna", value: 5 },
  { from: "Chandler", to: "Kathy", value: 7 },
  { from: "Monica", to: "Pete", value: 10 },
  { from: "Ross", to: "Joey", value: 3 },
  { from: "Ross", to: "Phoebe", value: 18 },
  { from: "Ross", to: "Carol", value: 10 },
  { from: "Ross", to: "Mrs Geller", value: 8 },
  { from: "Ross", to: "Emily", value: 12 },
  { from: "Ross", to: "Elizabeth", value: 8 },
  { from: "Ross", to: "Mona", value: 11 },
  { from: "Joey", to: "Phoebe", value: 6 },
  { from: "Phoebe", to: "David", value: 14 },
  { from: "Phoebe", to: "Mike", value: 18 }
]);

// Make stuff animate on load
series.appear(1000, 100);
```
