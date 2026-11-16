---
title: "Force-directed"
source: "https://docs.amcharts.com/v5/charts/hierarchy/force-directed/"
scraped: "2026-11-16"
---

This tutorial will look at how to configure force-directed series.

## Nodes

There are two lists of elements that we can use to configure nodes: `circles` and `outerCircles`.

### Circles

`circles.template` can be used to configure node circles. All nodes have them.

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

### Outer circles

`outerCircles.template` configures additional node circle outline. Only nodes with children have them.

TypeScript:

```ts
series.outerCircles.template.setAll({
  strokeWidth: 2
});
```

JavaScript:

```js
series.outerCircles.template.setAll({
  strokeWidth: 2
});
```

Outer circles play special role in linked hierarchies: they indicate if node has children.

The outer circle also has different looks based on whether it is expanded or collapsed.

Those looks are controlled via application of certain [states](https://docs.amcharts.com/v5/concepts/settings/states/).

An outer circle can have four built-in states:

| State             | Example                                                                        | Comment                                     |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| `"disabled"`      | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/chrome_2021-08-04_16-36-19.png) | Applied when node is collapsed.             |
| `"hover"`         | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/chrome_2021-08-04_16-37-23.png) | Applied when node is hovered.               |
| `"hoverDisabled"` | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/chrome_2021-08-04_16-39-33.png) | Applied when collapsed node is hovered.     |
| `"hidden"`        | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/chrome_2021-08-04_16-38-13.png) | Applied to nodes that do not have children. |

The following code modifies how outer circle looks like:

TypeScript:

```ts
series.outerCircles.template.states.create("disabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});

series.outerCircles.template.states.create("hoverDisabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});
```

JavaScript:

```js
series.outerCircles.template.states.create("disabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});

series.outerCircles.template.states.create("hoverDisabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});
```

Example: [Force-directed chart](https://docs.amcharts.com/embeds/v5/force-directed-chart/). Its code: get_example(path: "examples/docs-demos/force-directed-chart").

### Sizing nodes

Normally, nodes are sized based on their value, which is either value from data or sum of values of all node children.

The smallest and biggest possible node circle is controlled by series `minRadius` and `maxRadius` settings.

Both accept numeric values in pixels or percent values relative to the size of the chart itself.

TypeScript:

```ts
let series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 20,
    maxRadius: am5.percent(15)
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 20,
    maxRadius: am5.percent(15)
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/force_maxradius_8.png "(default) | `minRadius: am5.percent(1)` | `maxRadius: am5.percent(8)`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/force_maxradius_20.png "`minRadius: 20` | `maxRadius: am5.percent(15)`")

Example: [Force-directed chart with topDepth](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-topdepth/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-topdepth").

> **Note:** To make all nodes equal in size, set both `minRadius` and `maxRadius` to the same value, or omit `valueField` in series configuration altogether.

### Disabling dragging

Nodes in the tree are draggable. We can disable it by setting `draggable` to `false`:

TypeScript:

```ts
series.nodes.template.setAll({
  draggable: false
});
```

JavaScript:

```js
series.nodes.template.setAll({
  draggable: false
});
```

### Disabling toggling

To disable toggle behavior on a node, all we need to do is to reset `toggle` key for node template, as well as resetting pointer cursor:

TypeScript:

```ts
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});
```

JavaScript:

```js
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});
```

### Gaps between nodes

Depending on [force simulation settings](https://docs.amcharts.com/v5/charts/hierarchy/force-directed/#layout-and-force-simulation), nodes can be pulled quite close together.

We can control how close they can get using series' `nodePadding` setting.

TypeScript:

```ts
let series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    manyBodyStrength: -1,
    nodePadding: 10
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 20,
    maxRadius: am5.percent(15),
    manyBodyStrength: -1,
    nodePadding: 10
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forcedirected_strength_1-1024x771.png "`nodePadding: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forced_nodepadding_10-1024x771.png "`nodePadding: 10`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forced_nodepadding_20-1024x771.png "`nodePadding: 20`")

### Fixed nodes

Normally, force-directed nodes would find and settle in their own place, based on force interactions with other nodes.

We can make some (or all) nodes stick to specific place by providing their X and Y coordinates in data. We just need to bind series using `xField` and `yField`.

The keys in data pointed to by `xField` and `yField` can either hold numeric pixel value or percent objects.

TypeScript:

```ts
let series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    xField: "x",
    yField: "y"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    xField: "x",
    yField: "y"
  })
);
```

Example: [Force-directed chart with fixed nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-fixed-nodes/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-fixed-nodes").

### Using images

We can replace standard circles with custom images.

For that we'll need to go through some steps:

* Disable inner and outer circles.
* Create images in node using `setup()` method of its template.
* Disable or reposition labels.

TypeScript:

```ts
// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function(target) {
  let icon = target.children.push(am5.Picture.new(root, {
    width: 70,
    height: 70,
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "https://assets.codepen.io/t-160/star.svg"
  }));
}
```

JavaScript:

```js
// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function(target) {
  var icon = target.children.push(am5.Picture.new(root, {
    width: 70,
    height: 70,
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "https://assets.codepen.io/t-160/star.svg"
  }));
}
```

Example: [Force-directed chart with images as nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-images-as-nodes/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-images-as-nodes").

The above will replace regular circles for all nodes with an icon of a star.

If we'd like to display different images for each node, we'll need to enhance our code a bit:

* Add image information to data.
* Enhance `setup` code to grab image `url` from the data.

We'll also reposition the labels while we're at it.

TypeScript:

```ts
// Disable circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// ... except for central node
series.circles.template.adapters.add("forceHidden", function(forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false: forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 45,
  oversizedBehavior: "none"
});

// Use adapter to leave central node label centered
series.labels.template.adapters.add("y", function(y, target) {
  return target.dataItem.get("depth") == 0 ? 0 : y;
});

// Use template.setup function to prep up node with an image
series.nodes.template.setup = function(target) {
  target.events.on("dataitemchanged", function(ev) {
    let icon = target.children.push(am5.Picture.new(root, {
      width: 70,
      height: 70,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: ev.target.dataItem.dataContext.image
    }));
  });
}
```

JavaScript:

```js
// Disable circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// ... except for central node
series.circles.template.adapters.add("forceHidden", function(forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false: forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 45,
  oversizedBehavior: "none"
});

// Use adapter to leave central node label centered
series.labels.template.adapters.add("y", function(y, target) {
  return target.dataItem.get("depth") == 0 ? 0 : y;
});

// Use template.setup function to prep up node with an image
series.nodes.template.setup = function(target) {
  target.events.on("dataitemchanged", function(ev) {
    var icon = target.children.push(am5.Picture.new(root, {
      width: 70,
      height: 70,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: ev.target.dataItem.dataContext.image
    }));
  });
}
```

Example: [Force-directed chart with images as nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-images-as-nodes-2/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-images-as-nodes-2").

> **Important:** The `template.setup` needs to be set **before** any data is set on the the series. More info [here](https://docs.amcharts.com/v5/concepts/settings/list-templates/#setup-handler).

### Using other shapes

We can also use any other shapes in places of default circles.

The process works similarly as with the image-based nodes described above, albeit with a bit more steps, since we need to grab some metrics from the circles, that are created later into the game.

The below code will replace circles with ellipses:

TypeScript:

```ts
// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an ellipsis to node
series.nodes.template.setup = function(target) {
  target.events.once("dataitemchanged", function(ev) {
    let target = ev.target;
    target.dataItem.on("circle", function(circle) {
      circle.on("radius", function(radius, circle) {
        let ellipsis = circle.getPrivate("customData");
        if (ellipsis) {
          ellipsis.setAll({
            radiusX: circle.get("radius"),
            radiusY: circle.get("radius") * 0.6
          });
        }
        else {
          ellipsis = target.children.unshift(am5.Ellipse.new(root, {
            radiusX: circle.get("radius"),
            radiusY: circle.get("radius") * 0.6,
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            fill: circle.get("fill")
          }));
          circle.setPrivate("customData", ellipsis);
        }
      })
    })
  });
}
```

JavaScript:

```js
// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an ellipsis to node
series.nodes.template.setup = function(target) {
  target.events.once("dataitemchanged", function(ev) {
    var target = ev.target;
    target.dataItem.on("circle", function(circle) {
      circle.on("radius", function(radius, circle) {
        var ellipsis = circle.getPrivate("customData");
        if (ellipsis) {
          ellipsis.setAll({
            radiusX: circle.get("radius"),
            radiusY: circle.get("radius") * 0.6
          });
        }
        else {
          ellipsis = target.children.unshift(am5.Ellipse.new(root, {
            radiusX: circle.get("radius"),
            radiusY: circle.get("radius") * 0.6,
            centerX: am5.percent(50),
            centerY: am5.percent(50),
            fill: circle.get("fill")
          }));
          circle.setPrivate("customData", ellipsis);
        }
      })
    })
  });
}
```

Example: [Using ellipses as nodes in Force-Directed Tree](https://docs.amcharts.com/embeds/v5/using-ellipses-as-nodes-in-force-directed-tree/). Its code: get_example(path: "examples/docs-demos/using-ellipses-as-nodes-in-force-directed-tree").

## Links

### Link appearance

Links can be configured using series' `links.template`. It accepts all [`HierarchyLink` settings](https://docs.amcharts.com/v5/reference/hierarchylink/#settings).

TypeScript:

```ts
series.links.template.setAll({
  strokeWidth: 5,
  strokeOpacity: 0.5
});
```

JavaScript:

```js
series.links.template.setAll({
  strokeWidth: 5,
  strokeOpacity: 0.5
});
```

### Cross-linking nodes

It's possible to link nodes not directly related with a parent-child relation.

That will require:

* Adding an array of nodes to link to in data.
* Specifying `linkWithField` and `idField` setting for series.

Sample data:

```json
[{
  "name": "First",
  "value": 1,
  "link": ["Second"]
}, {
  "name": "Second",
  "value": 1,
  "link": ["Third"]
}, {
  "name": "Third",
  "value": 1,
  "link": ["First"]
}]
```

And code:

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    idField: "name",
    childDataField: "children",
    linkWithField: "link"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    idField: "name",
    childDataField: "children",
    linkWithField: "link"
  })
);
```

> **Important:** Since categories (via `categoryField`) do not have the requirement to be unique, we need to use a separate `idField` to bind nodes to their unique IDs, which are used in the `linkWithField` values. If we know our nodes have unique names, we can use the same field for both `categoryField` and `idField`.

Example: [Force-directed chart with cross-linked nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-cross-linked-nodes/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-cross-linked-nodes").

### Link bullets

Refer to "[Hierarchy link bullets](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-link-bullets/)".

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

Force-directed series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

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

Refer to `IForceDirectedDataItem` for available keys for the data placeholders.

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

Refer to `IForceDirectedDataItem` for available keys for the data placeholders.

## Layout and force simulation

### Configuring forces

Force-directed series, as the name suggests, layouts itself according to various attraction/pushback force simulations.

Those are governed by a number of series settings:

| Setting key        | Default | Comment                                                                                                                                           |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `centerStrength`   | `0.5`   | Strength all nodes are attracted (or pushed back) to the center of the chart. It also means that nodes will re-center themselves if dragged away. |
| `manyBodyStrength` | `-15`   | Strength all nodes are attracted (or pushed back) to each other.                                                                                  |
| `linkWithStrength` | `0.5`   | Strength nodes linked directly with `linkWithField` are attracted (or pushed back) to each other.                                                 |

Positive number means a force of attraction to other node or a point.

Negative number means a force of pushing back from other node or a point.

The greater the number (positive or negative) the greater the force.

The final layout of the nodes will be determined by combined workings of all forces involved.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    centerStrength: 0.5,
    manyBodyStrength: -1
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    centerStrength: 0.5,
    manyBodyStrength: -1
  })
);
```

The above will make all nodes bunch up around the center since the force pushing them away from each other is not that much greater than force that is attracting them all to the center.

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forcedirected_strength_1-1024x771.png "`manyBodyStrength: -1`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forcedirected_strength_15-1024x771.png "`manyBodyStrength: -15` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/force-directed/forcedirected_strength_30-1024x771.png "`manyBodyStrength: -30`")

Example: [Force-directed chart with strength configuration](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-strength-configuration/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-strength-configuration").

### Tweaking animations

Force-directed series also has three settings related to animation: `initialFrames`, `showOnFrame`, and `velocityDecay`.

`initialFrames` indicates the length of initial force simulation in frames. With default set at `500` we might want to decrease it for simpler trees, and increase it for complex data.

`showOnFrame` (default `10`) allows skipping X number of frames of animation, so that user does not need to watch all of the process of nodes settling into places.

Setting both `initialFrames` and `showOnFrame` to the same value will ensure that the chart will be fully static on load, although it may display blank area until layout physics are resolved.

`velocityDecay` (default `0.5`) controls the resistance acting against movement of nodes, making it stop eventually. The bigger the number, the more "sluggish" the nodes will be.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialFrames: 300,
    showOnFrame: 150,
    velocityDecay: 1
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialFrames: 300,
    showOnFrame: 150,
    velocityDecay: 1
  })
);
```

The above will start showing actual nodes halfway through the settling animation.

## Zoomable force-directed tree

It's possible to make force-directed tree zoomable by utilizing `ZoomableContainer`.

For more information and an example, refer to "Containers: [Zoomable container](https://docs.amcharts.com/v5/concepts/common-elements/containers/#zoomable-container)".

## Related tutorials

* [Limit to single open branch in ForceDirectedSeries](https://docs.amcharts.com/v5/tutorials/limit-to-single-open-branch-in-forcedirectedseries/)
* [Consistent radius of outer circles of a Force-Directed Tree](https://docs.amcharts.com/v5/tutorials/consistent-radius-of-outer-circles-of-a-force-directed-tree/)
* [Highlighting links of a force-directed node on hover](https://docs.amcharts.com/v5/tutorials/highlighting-links-of-a-force-directed-node-on-hover/)
* [Force-directed tree with adaptively positioned labels](https://docs.amcharts.com/v5/tutorials/force-directed-tree-with-adaptively-positioned-labels/)
* [ForceDirected with custom nodes/buttons/legend](https://docs.amcharts.com/v5/tutorials/forcedirected-with-custom-nodes-buttons-legend/)
* [Applying individual styles for Force-directed links](https://docs.amcharts.com/v5/tutorials/applying-individual-styles-for-force-directed-links/)
* [Centering on a clicked node in a Force-Directed Tree](https://docs.amcharts.com/v5/tutorials/centering-on-a-clicked-node-in-a-force-directed-tree/)
