---
title: "Tree"
source: "https://docs.amcharts.com/v5/charts/hierarchy/tree/"
scraped: "2026-11-16"
---

This tutorial focuses on the configuration of a tree diagram.

## Orientation

Tree series will plot itself in vertical mode, i.e. with top-level nodes on the top, second level beneath them, etc.

We can change that using series' `orientation` setting, by setting it to `"horizontal"`. It will put top level on the left, with other levels lining up to the right.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Tree.new(root, {
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
  am5hierarchy.Tree.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_vertical.png "`orientation: 'vertical'` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_horizontal.png "`orientation: 'horizontal'`")

Example: [Horizontal tree chart](https://docs.amcharts.com/embeds/v5/horizontal-tree-chart/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 400px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var data = [
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A00",
            value: 88
          },
          {
            name: "A01",
            value: 23
          },
          {
            name: "A02",
            value: 25
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B10",
            value: 62
          },
          {
            name: "B11",
            value: 4
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C20",
            value: 11
          },
          {
            name: "C21",
            value: 92
          },
          {
            name: "C22",
            value: 17
          }
        ]
      },

      {
        name: "D0",
        children: [
          {
            name: "D30",
            value: 95
          },
          {
            name: "D31",
            value: 84
          },
          {
            name: "D32",
            value: 75
          }
        ]
      }
    ]
  }
];

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal"
  })
);

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);
```

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

| State             | Example                                                            | Comment                                     |
| ----------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `"disabled"`      | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_node_disabled.png)       | Applied when node is collapsed.             |
| `"hover"`         | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_node_hovered.png)        | Applied when node is hovered.               |
| `"hoverDisabled"` | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_node_hover_disabled.png) | Applied when collapsed node is hovered.     |
| `"hidden"`        | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_node_hidden.png)         | Applied to nodes that do not have children. |

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

Example: [Tree chart: configuring node outer circles](https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-outer-circles/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var data = [
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A00",
            value: 88
          },
          {
            name: "A01",
            value: 23
          },
          {
            name: "A02",
            value: 25
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B10",
            value: 62
          },
          {
            name: "B11",
            value: 4
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C20",
            value: 11
          },
          {
            name: "C21",
            value: 92
          },
          {
            name: "C22",
            value: 17
          }
        ]
      },

      {
        name: "D0",
        children: [
          {
            name: "D30",
            value: 95
          },
          {
            name: "D31",
            value: 84
          },
          {
            name: "D32",
            value: 75
          }
        ]
      }
    ]
  }
];

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 1,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

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

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);
```

### Sizing nodes

The main circle of a node in a tree series has a radius of `15` pixels.

We can change that using `radius` setting of both `circles.template` and `outerCircles.template`.

The smallest and biggest possible node circle is controlled by series `minRadius` and `maxRadius` settings.

Both accept numeric values in pixels or percent values relative to the size of the chart itself.

TypeScript:

```ts
series.circles.template.setAll({
  radius: 20
});

series.outerCircles.template.setAll({
  radius: 20
});
```

JavaScript:

```js
series.circles.template.setAll({
  radius: 20
});

series.outerCircles.template.setAll({
  radius: 20
});
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_radius_15.png "`radius: 15` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_radius_20.png "`radius: 20`")

Example: [Tree chart: configuring node radii](https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-radii/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var data = [
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A00",
            value: 88
          },
          {
            name: "A01",
            value: 23
          },
          {
            name: "A02",
            value: 25
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B10",
            value: 62
          },
          {
            name: "B11",
            value: 4
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C20",
            value: 11
          },
          {
            name: "C21",
            value: 92
          },
          {
            name: "C22",
            value: 17
          }
        ]
      },

      {
        name: "D0",
        children: [
          {
            name: "D30",
            value: 95
          },
          {
            name: "D31",
            value: 84
          },
          {
            name: "D32",
            value: 75
          }
        ]
      }
    ]
  }
];

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.circles.template.setAll({
  radius: 20
});

series.outerCircles.template.setAll({
  radius: 20
});

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);
```

### Fitting visible nodes

By default, Tree will reserve space for all nodes, even if they are invisible.

If we'd like to free up the space of the nodes that are hidden, we can set `fitNodes` to `true`:

```js
let series = root.container.children.push(
  am5hierarchy.Tree.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal",
    fitNodes: true
  })
);

var series = root.container.children.push(
  am5hierarchy.Tree.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal",
    fitNodes: true
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_expanded-1024x662.png "Fully expanded")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_fitNodes_false-1024x662.png "`fitNodes: false` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_fitNodes_true-1024x662.png "`fitNodes: true`")

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
    width: 50,
    height: 50,
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "https://assets.codepen.io/t-160/star.svg"
  }));
}
```

Example: [Tree chart: configuring node radii](https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-radii-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var data = [
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A00",
            value: 88
          },
          {
            name: "A01",
            value: 23
          },
          {
            name: "A02",
            value: 25
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B10",
            value: 62
          },
          {
            name: "B11",
            value: 4
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C20",
            value: 11
          },
          {
            name: "C21",
            value: 92
          },
          {
            name: "C22",
            value: 17
          }
        ]
      },

      {
        name: "D0",
        children: [
          {
            name: "D30",
            value: 95
          },
          {
            name: "D31",
            value: 84
          },
          {
            name: "D32",
            value: 75
          }
        ]
      }
    ]
  }
];

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function (target) {
  var icon = target.children.push(
    am5.Picture.new(root, {
      width: 50,
      height: 50,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "https://docs.amcharts.com/assets/star.svg"
    })
  );
};

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);
```

The above will replace regular circles for all nodes with an icon of a star.

If we'd like to display different images for each node, we'll need to enhance our code a bit:

* Add image information to data.
* Enhance `setup` code to grab image `url` from the data.

We'll also reposition the labels while we're at it.

TypeScript:

```ts
// Disable circles
series.circles.template.setAll({
  radius: 40,
  forceHidden: true
});

series.outerCircles.template.setAll({
  radius: 40,
  forceHidden: true
});

// ... except for central node
series.circles.template.adapters.add("forceHidden", function(forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false : forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 30,
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
      width: 40,
      height: 40,
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
series.circles.template.setAll({
  radius: 40,
  forceHidden: true
});

series.outerCircles.template.setAll({
  radius: 40,
  forceHidden: true
});

// ... except for central node
series.circles.template.adapters.add("forceHidden", function(forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false : forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 30,
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
      width: 40,
      height: 40,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: ev.target.dataItem.dataContext.image
    }));
  });
}
```

Example: [Tree chart: configuring node radii](https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-radii-3/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 300px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    paddingBottom: 40,
    paddingTop: 60
  })
);

// Disable circles
series.circles.template.setAll({
  radius: 40,
  forceHidden: true
});

series.outerCircles.template.setAll({
  radius: 40,
  forceHidden: true
});

// ... except for central node
series.circles.template.adapters.add("forceHidden", function (forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false : forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 30,
  oversizedBehavior: "none"
});

// Use adapter to leave central node label centered
series.labels.template.adapters.add("y", function (y, target) {
  return target.dataItem.get("depth") == 0 ? 0 : y;
});

// Use template.setup function to prep up node with an image
series.nodes.template.setup = function (target) {
  target.events.on("dataitemchanged", function (ev) {
    var icon = target.children.push(
      am5.Picture.new(root, {
        width: 40,
        height: 40,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        src: ev.target.dataItem.dataContext.image
      })
    );
  });
};

series.data.setAll([
  {
    name: "Browsers",
    children: [
      {
        name: "Chrome",
        value: 1,
        image: "https://docs.amcharts.com/assets/icon_chrome.svg"
      },
      {
        name: "Firefox",
        value: 1,
        image: "https://docs.amcharts.com/assets/icon_firefox.svg"
      },
      {
        name: "IE",
        value: 1,
        image: "https://docs.amcharts.com/assets/icon_ie.svg"
      },
      {
        name: "Safari",
        value: 1,
        image: "https://docs.amcharts.com/assets/icon_safari.svg"
      },
      {
        name: "Opera",
        value: 1,
        image: "https://docs.amcharts.com/assets/icon_opera.svg"
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);
```

> **Important:** The `template.setup` needs to be set **before** any data is set on the the series. More info [here](https://docs.amcharts.com/v5/concepts/settings/list-templates/#setup-handler).

## Layout

By default, Tree will divide the space and arrange the nodes in perfect columns.

While that works for smaller structures, having more complicated ones might not use the available space efficiently.

Here's when clustered mode comes in play. To enable it, simply set `clustered: false` in your Tree settings:

TypeScript:

```ts
var series = zoomableContainer.contents.children.push(am5hierarchy.Tree.new(root, {
  singleBranchOnly: false,
  downDepth: 1,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  clustered: true
}));
```

JavaScript:

```js
let series = zoomableContainer.contents.children.push(am5hierarchy.Tree.new(root, {
  singleBranchOnly: false,
  downDepth: 1,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  clustered: true
}));
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_regular.png "`clustered: false` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/tree/tree_clustered.png "`clustered: true`")

Example: [Tree Chart](https://docs.amcharts.com/embeds/v5/tree-chart/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: true,
    pinchZoom: true
  })
);

var zoomTools = zoomableContainer.children.push(
  am5.ZoomTools.new(root, {
    target: zoomableContainer
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = zoomableContainer.contents.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 10,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    clustered: true
  })
);

series.labels.template.set("minScale", 0);

// Generate and set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
var maxLevels = 3;
var maxNodes = 3;
var maxValue = 100;

var data = {
  name: "Root",
  children: [
    {
      name: "A0",
      children: [
        { name: "A0A1", value: 89 },
        { name: "A0B1", value: 31 }
      ]
    },

    {
      name: "B0",
      children: [
        { name: "B1A1", value: 60 },
        { name: "B1B1", value: 16 },
        {
          name: "B1C1",
          children: [
            {
              name: "B1C2A2",
              children: [
                { name: "B1C2A00", value: 82 },
                { name: "B1C2A01", value: 89 },
                { name: "B1C2A02", value: 26 },
                { name: "B1C2A03", value: 18 }
              ]
            },

            { name: "B1C2B2", value: 4 },
            { name: "B1C2C2", value: 13 }
          ]
        }
      ]
    },

    {
      name: "C0",
      children: [
        { name: "C2A1", value: 56 },
        { name: "C2B1", value: 83 },
        { name: "C2C1", value: 35 }
      ]
    }
  ]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

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

Example: [Tree chart with cross-linked nodes](https://docs.amcharts.com/embeds/v5/tree-chart-with-cross-linked-nodes/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 500px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    downDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    idField: "name",
    childDataField: "children",
    linkWithField: "link"
  })
);

series.data.setAll([
  {
    name: "First",
    children: [
      {
        name: "A1",
        children: [
          {
            name: "A1-1",
            value: 10
          },
          {
            name: "A1-2",
            value: 30
          },
          {
            name: "A1-3",
            value: 20,
            link: ["A2"]
          }
        ]
      },

      {
        name: "A2",
        children: [
          {
            name: "A2-1",
            value: 40
          },
          {
            name: "A2-2",
            value: 30
          },
          {
            name: "A2-3",
            value: 10
          }
        ],
        link: ["A3"]
      },
      {
        name: "A3",
        children: [
          {
            name: "A3-1",
            value: 5,
            link: ["A1"]
          },
          {
            name: "A3-2",
            value: 20
          },
          {
            name: "A3-3",
            value: 20
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);
```

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

Tree series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

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

Refer to `ITreeDataItem` for available keys for the data placeholders.

### Disabling labels

To disable series labels, we can set `forceHidden` setting to `true` in their template:

TypeScript:

```ts
series.labels.template.set("forceHidden", false);
```

JavaScript:

```js
series.labels.template.set("forceHidden", false);
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

Refer to `ITreeDataItem` for available keys for the data placeholders.

## Related tutorials

* [Tree Chart with HTML nodes](https://docs.amcharts.com/v5/tutorials/tree-chart-with-html-nodes/)
