---
title: "Hierarchy charts"
source: "https://docs.amcharts.com/v5/charts/hierarchy/"
scraped: "2026-11-16"
---

Hierarchy charts (Treemap, Sunburst, Force-directed tree, etc.) are used to display multi-level data, in a branching parent-child tree.

## Loading required modules

Everything required to create hierarchy charts are two amCharts 5 modules: "index" and "hierarchy".

You can import those in your TypeScript / ES6 application as JavaScript modules:

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
```

For vanilla JavaScript applications and web pages, you can use "script" version:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/hierarchy.js"></script>
```

> **More info:** For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://docs.amcharts.com/v5/getting-started/)" tutorial.

## Series

Hierarchy charts are chart-less. This means that rather than creating a chart element, we add series directly to the root container.

### Adding

There are following types of series supported in hierarchy charts:

| Class            | Example                                                        | Comment                                            |
| ---------------- | -------------------------------------------------------------- | -------------------------------------------------- |
| `ForceDirected`  | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/forcedirected.png)       | [More info](https://docs.amcharts.com/v5/charts/hierarchy/force-directed/)  |
| `Pack`           | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/pack.png)                | [More info](https://docs.amcharts.com/v5/charts/hierarchy/pack/)            |
| `Partition`      | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/partition.png)           | [More info](https://docs.amcharts.com/v5/charts/hierarchy/partition/)       |
| `Sunburst`       | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/sunburst.png)            | [More info](https://docs.amcharts.com/v5/charts/hierarchy/sunburst/)        |
| `Tree`           | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/tree.png)                | [More info](https://docs.amcharts.com/v5/charts/hierarchy/tree/)            |
| `Treemap`        | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/treemap.png)             | [More info](https://docs.amcharts.com/v5/charts/hierarchy/treemap/)         |
| `VoronoiTreemap` | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/2023-07-04_11-26-06.png) | [More info](https://docs.amcharts.com/v5/charts/hierarchy/voronoi-treemap/) |

Like everywhere else, we use its `new()` method to instantiate series, then push it into `series` list of the chart:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Data fields

Most hierarchy charts require three data fields:

* Category: a field in data that holds a string-based identifier, like a name.
* Children: a field in data that holds array of data objects for child nodes.
* Value of the node: a field in data that holds numeric value of the node.

Data fields basically mean which keys in data objects to look for specific value.

They can be set via series' settings `categoryField`, `childDataField`, and `valueField`.

Let's take sample data:

```json
[{
  name: "Root",
  children: [{
    name: "A0",
    children: [{
      name: "A00",
      value: 71
    }, {
      name: "A01",
      value: 33
    }, {
      name: "A02",
      value: 2
    }]
  }, {
    name: "B0",
    children: [{
      name: "B10",
      value: 78
    }, {
      name: "B11",
      value: 36
    }]
  }, {
    name: "C0",
    children: [{
      name: "C20",
      value: 46
    }, {
      name: "C21",
      value: 28
    }, {
      name: "C22",
      value: 18
    }]
  }]
}]
```

The following data fields would need to describe data fields like this:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Optional data fields

Besides the three required data fields, hierarchy charts can also have a number of other data fields, that can be used to control initial state of the nodes (`disabledField`) or their color (`colorField`).

The following code show how we can use `disabledField` to pre-collapse individual nodes.

Here's the data"

```json
[{
  name: "Root",
  children: [{
    name: "A0",
    collapsed: true,
    children: [{
      name: "A00",
      value: 71
    }, {
      name: "A01",
      value: 33
    }, {
      name: "A02",
      value: 2
    }]
  }, {
    name: "B0",
    children: [{
      name: "B10",
      value: 78
    }, {
      name: "B11",
      value: 36
    }]
  }, {
    name: "C0",
    collapsed: true,
    children: [{
      name: "C20",
      value: 46
    }, {
      name: "C21",
      value: 28
    }, {
      name: "C22",
      value: 18
    }]
  }]
}]
```

And he code:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    disabledField: "collapsed"
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
    disabledField: "collapsed"
  })
);
```

The above will make the chart start with "A0" and "C0" nodes collapsed, while "B0" expanded.

### Data structure

> **Important:** A data for all hierarchy charts requires to have just one top item. Having several items on top level might break the chart. If we don't want this top item to appear on the chart itself, we can hide it by providing `topLevel: 1` in series settings. Refer to "[Tree depth](https://docs.amcharts.com/v5/charts/hierarchy/#tree-depth)" section of this tutorial for more info.

### Setting data

In all hierarchy charts, each entry in data represents a node. If it has data for children (as identified by `childDataField`), it also may have child nodes, which in turn can have their own children, etc.

Node can also have a value, which in most hierarchy charts will determine its size.

Basically, if node has value in its data, this value will be used. If node does not have value set in data, but has children, than its value will be the sum of all child values.

The data is set directly on series via its `data` property:

TypeScript:

```ts
series.data.setAll([{
  name: "Root",
  children: [{
    name: "A0",
    children: [{
      name: "A00",
      value: 71
    }, {
      name: "A01",
      value: 33
    }, {
      name: "A02",
      value: 2
    }]
  }, {
    name: "B0",
    children: [{
      name: "B10",
      value: 78
    }, {
      name: "B11",
      value: 36
    }]
  }, {
    name: "C0",
    children: [{
      name: "C20",
      value: 46
    }, {
      name: "C21",
      value: 28
    }, {
      name: "C22",
      value: 18
    }]
  }]
}]);
```

JavaScript:

```js
series.data.setAll([{
  name: "Root",
  children: [{
    name: "A0",
    children: [{
      name: "A00",
      value: 71
    }, {
      name: "A01",
      value: 33
    }, {
      name: "A02",
      value: 2
    }]
  }, {
    name: "B0",
    children: [{
      name: "B10",
      value: 78
    }, {
      name: "B11",
      value: 36
    }]
  }, {
    name: "C0",
    children: [{
      name: "C20",
      value: 46
    }, {
      name: "C21",
      value: 28
    }, {
      name: "C22",
      value: 18
    }]
  }]
}]);
```

> **Important:** It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

> **More info:** There are more ways to set, update, add, or load data. For more information please refer to our dedicated "[Data](https://docs.amcharts.com/v5/concepts/data/)" tutorial.

### Flat data

Hierarchy charts can handle "flat data" — data items in a single array that define their parent-child relations via IDs rather than `children`.

There are two elements to using flat data:

1. `parentIdField` needs to be specified, so that Hierarchy knows which field to use in looking up for a parent ID.
2. Instead of `series.data.setAll()`, we need to use `series.setFlatData()`.

TypeScript:

```ts
let tree = root.container.children.push(am5hierarchy.Tree.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "id",
  parentIdField: "parentId"
}));

tree.setFlatData([
  { id: "root", name: "Root", value: 100 },
  { id: "a",    name: "A",    value: 50,  parentId: "root" },
  { id: "a1",   name: "A1",   value: 20,  parentId: "a" },
  { id: "b",    name: "B",    value: 30,  parentId: "root" }
]);
```

JavaScript:

```js
var tree = root.container.children.push(am5hierarchy.Tree.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "id",
  parentIdField: "parentId"
}));

tree.setFlatData([
  { id: "root", name: "Root", value: 100 },
  { id: "a",    name: "A",    value: 50,  parentId: "root" },
  { id: "a1",   name: "A1",   value: 20,  parentId: "a" },
  { id: "b",    name: "B",    value: 30,  parentId: "root" }
]);
```

## Pre-selected branch

In order for our chart to function properly, we need to tell series which node is currently selected.

It ensures that:

* Current active node is correctly set.
* Levels above `topDepth` are hidden.
* A [breadcrumb bar](https://docs.amcharts.com/v5/charts/hierarchy/#breadcrumb-navigation) shows the path.

We do that by setting series `selectedDataItem`. Please note that this is a data item, not a node itself.

For the most uses, this will be the root data item, which will always come first in series' `dataItems` list:

TypeScript:

```ts
series.set("selectedDataItem", series.dataItems[0]);
```

JavaScript:

```js
series.set("selectedDataItem", series.dataItems[0]);
```

> **Important:** The `selectedDataItem` needs to be set **after** data is set to the series.

There's no warning if it's missing.

For more information about configuring appearance of the flow series, refer to respective tutorials:

* [Configuring Force-directed series](https://docs.amcharts.com/v5/charts/hierarchy/force-directed/).
* [Configuring Pack series](https://docs.amcharts.com/v5/charts/hierarchy/pack/).
* [Configuring Partition](https://docs.amcharts.com/v5/charts/hierarchy/partition/).
* [Configuring Sunburst](https://docs.amcharts.com/v5/charts/hierarchy/sunburst/).
* [Configuring Tree](https://docs.amcharts.com/v5/charts/hierarchy/tree/).
* [Configuring Treemap](https://docs.amcharts.com/v5/charts/hierarchy/treemap/).

## Node value

Each node in a hierarchy has its value, which mainly affects its size.

Value of a node is calculated this way:

* Value is retrieved from data via `valueField` data field if present.
* If value is not present in data, but node has children, its value will be the sum of values of all its children.

To paraphrase the above, there are two "correct" ways to set values in hierarchy data:

1. Set values only on "end" nodes (nodes that do not have children).
2. Set value for all nodes, including the top node.

## Node colors

There is a number of ways we can specify all colors for hierarchy nodes.

For information on how to do that, refer to "[Hierarchy node colors](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-node-colors/)" tutorial.

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

Refer to `IHierarchyDataItem` for available keys for the data placeholders.

## Tree depth

There are two hierarchy settings that control depth of the tree: `initialDepth` and `topDepth`.

`topDepth` indicates the level, which should be considered top level. Any level in data above that will be ignored and not shown on the chart.

`initialDepth` specifies how many levels **below the top level** to show when the chart loads. The chart shows `initialDepth + 1` levels:

| `topDepth` | `initialDepth` | Levels shown (0 is the root)               |
| ---------- | -------------- | ------------------------------------------ |
| `0`        | `1`            | 0 and 1                                    |
| `1`        | `0`            | 1                                          |
| `1`        | `1`            | 1 and 2, e.g. regions with their countries |
| `1`        | `2`            | 1, 2 and 3                                 |

It will also be used when resetting the chart to the top level.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialDepth: 2,
    topDepth: 1
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
    initialDepth: 2,
    topDepth: 1
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/2021-08-01_11-01-44.png "`topDepth: 0` | `initialDepth: 1`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/2021-08-01_11-01-55.png "`topDepth: 0` | `initialDepth: 2`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/2021-08-01_11-02-07.png "`topDepth: 0` | `initialDepth: 3`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/index/2021-08-01_11-01-24.png "`topDepth: 1` | `initialDepth: 1`")

> **Note:** In hierarchy charts that size their nodes relatively, like a force-directed, top node will affect the size of other nodes even if it is hidden using `topDepth` is set to `1` (hiding top node). To work around it, simply set value for the top node to zero.

## Drill-down

Hierarchy nodes that have children are clickable.

Depending on series type and settings, certain drill-down actions happen, like zooming in on the node, exploding a children tree, etc.

For more information about this, please refer to "[Hierarchy drill-down](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/)" tutorial.

## Additional controls

Hierarchy is a "container-less" chart. This means that there's no wrapper "chart" element, that can be used to add series and external controls to.

If we don't need anything else besides series, we can add it directly to the container of the root element.

However, if we need to add other elements, we'll need to first create a "wrapper (or main) container", we'll be using add all the stuff to:

TypeScript:

```ts
let container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));
```

JavaScript:

```js
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));
```

> **Note:** The `layout` setting of the wrapper container will determine how chart elements are laid out. For more information, refer to "Containers: [Layout](https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout)".

### Chart title

Chart title can be added as a `Label` element child to the wrapper container:

TypeScript:

```ts
var title = container.children.push(am5.Label.new(root, {
  text: "Network Schema",
  fontSize: 20,
  x: am5.percent(50),
  centerX: am5.percent(50)
}));
```

JavaScript:

```js
var title = container.children.push(am5.Label.new(root, {
  text: "Network Schema",
  fontSize: 20,
  x: am5.percent(50),
  centerX: am5.percent(50)
}));
```

### Breadcrumb navigation

All hierarchy charts support breadcrumb control, which will show current drill-down path, as well as allow jumping to specific level/node in the path.

We can add as wrapper container's child:

TypeScript:

```ts
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

JavaScript:

```js
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

For more information on how to use breadcrumb control, refer to "[Breadcrumb navigation](https://docs.amcharts.com/v5/charts/hierarchy/breadcrumbs/)" tutorial.

### Legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "core" package), push it to wrapper container's children (or any other place we want it to be), as well as set its data (in case of hierarchy chart, we will probably want to have series data items in legend).

Since legend needs to have a data, and hierarchy charts have multi-level nested data items, we will need to specify what exactly we want in the legend.

In most cases it will be the first level data items (ones directly below the root):

TypeScript:

```ts
let legend = container.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.horizontalLayout
}));

legend.data.setAll(series.dataItems[0].get("children"));
```

JavaScript:

```js
var legend = container.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.horizontalLayout
}));

legend.data.setAll(series.dataItems[0].get("children"));
```

> **More info:** For more information on how to configure the legend, set its contents, and other tricks, please visit our dedicated "[Legend](https://docs.amcharts.com/v5/concepts/legend/)" tutorial.

Example: [Force-directed chart with a legend](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-a-legend/)

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

var title = container.children.push(
  am5.Label.new(root, {
    text: "Network Schema",
    fontSize: 20,
    x: am5.percent(50),
    centerX: am5.percent(50)
  })
);

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    topDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    xField: "x",
    yField: "y"
  })
);

series.data.setAll([
  {
    name: "Root",
    value: 0,
    children: [
      {
        name: "A0",
        x: am5.percent(50),
        y: am5.percent(50),
        children: [
          {
            name: "A0A1",
            children: [
              {
                name: "A0A0A2",
                value: 71
              },
              {
                name: "A0A0B2",
                children: [
                  {
                    name: "A0A0B1A3",
                    value: 69
                  },
                  {
                    name: "A0A0B1B3",
                    value: 85
                  }
                ]
              },

              {
                name: "A0A0C2",
                value: 48
              }
            ]
          },

          {
            name: "A0B1",
            value: 27
          },
          {
            name: "A0C1",
            children: [
              {
                name: "A0C2A2",
                value: 2
              },
              {
                name: "A0C2B2",
                children: [
                  {
                    name: "A0C2B1A3",
                    value: 54
                  },
                  {
                    name: "A0C2B1B3",
                    value: 16
                  }
                ]
              }
            ]
          },

          {
            name: "A0D1",
            value: 89
          }
        ]
      },

      {
        name: "B0",
        x: am5.percent(80),
        y: am5.percent(20),
        children: [
          {
            name: "B1A1",
            value: 9
          },
          {
            name: "B1B1",
            children: [
              {
                name: "B1B1A2",
                children: [
                  {
                    name: "B1B1A0A3",
                    value: 35
                  },
                  {
                    name: "B1B1A0B3",
                    value: 40
                  }
                ]
              },

              {
                name: "B1B1B2",
                value: 55
              }
            ]
          }
        ]
      },

      {
        name: "C0",
        x: am5.percent(20),
        y: am5.percent(40),
        children: [
          {
            name: "C2A1",
            children: [
              {
                name: "C2A0A2",
                value: 24
              },
              {
                name: "C2A0B2",
                value: 89
              },
              {
                name: "C2A0C2",
                children: [
                  {
                    name: "C2A0C2A3",
                    children: [
                      {
                        name: "C2A0C2A0A4",
                        children: [
                          {
                            name: "C2A0C2A0A00",
                            value: 90
                          },
                          {
                            name: "C2A0C2A0A01",
                            value: 70
                          },
                          {
                            name: "C2A0C2A0A02",
                            value: 66
                          },
                          {
                            name: "C2A0C2A0A03",
                            value: 58
                          }
                        ]
                      },

                      {
                        name: "C2A0C2A0B4",
                        children: [
                          {
                            name: "C2A0C2A0B10",
                            value: 80
                          },
                          {
                            name: "C2A0C2A0B11",
                            value: 40
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2A0C2B3",
                    value: 44
                  }
                ]
              },

              {
                name: "C2A0D2",
                children: [
                  {
                    name: "C2A0D3A3",
                    value: 28
                  },
                  {
                    name: "C2A0D3B3",
                    value: 14
                  }
                ]
              }
            ]
          },

          {
            name: "C2B1",
            value: 40
          },
          {
            name: "C2C1",
            children: [
              {
                name: "C2C2A2",
                children: [
                  {
                    name: "C2C2A0A3",
                    value: 28
                  },
                  {
                    name: "C2C2A0B3",
                    children: [
                      {
                        name: "C2C2A0B1A4",
                        value: 19
                      },
                      {
                        name: "C2C2A0B1B4",
                        children: [
                          {
                            name: "C2C2A0B1B10",
                            value: 11
                          },
                          {
                            name: "C2C2A0B1B11",
                            value: 10
                          },
                          {
                            name: "C2C2A0B1B12",
                            value: 97
                          },
                          {
                            name: "C2C2A0B1B13",
                            value: 47
                          }
                        ]
                      },

                      {
                        name: "C2C2A0B1C4",
                        children: [
                          {
                            name: "C2C2A0B1C20",
                            value: 40
                          },
                          {
                            name: "C2C2A0B1C21",
                            value: 37
                          },
                          {
                            name: "C2C2A0B1C22",
                            value: 53
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2C2A0C3",
                    value: 96
                  }
                ]
              },

              {
                name: "C2C2B2",
                value: 66
              }
            ]
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

var legend = container.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
  })
);

legend.data.setAll(series.dataItems[0].get("children"));
```

## Complete example

TypeScript:

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

// Create root and main container
let root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

let container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series and set data
let series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialDepth: 2
  })
);

series.data.setAll([{
  name: "Root",
  children: [{
    name: "A0",
    children: [{
      name: "A0A1",
      children: [{
        name: "A0A0A2",
        value: 71
      }, {
        name: "A0A0B2",
        children: [{
          name: "A0A0B1A3",
          value: 69
        }, {
          name: "A0A0B1B3",
          value: 85
        }]
      }, {
        name: "A0A0C2",
        value: 48
      }]
    }, {
      name: "A0B1",
      value: 27
    }, {
      name: "A0C1",
      children: [{
        name: "A0C2A2",
        value: 2
      }, {
        name: "A0C2B2",
        children: [{
          name: "A0C2B1A3",
          value: 54
        }, {
          name: "A0C2B1B3",
          value: 16
        }]
      }]
    }, {
      name: "A0D1",
      value: 89
    }]
  }, {
    name: "B0",
    children: [{
      name: "B1A1",
      value: 9
    }, {
      name: "B1B1",
      children: [{
        name: "B1B1A2",
        children: [{
          name: "B1B1A0A3",
          value: 35
        }, {
          name: "B1B1A0B3",
          value: 40
        }]
      }, {
        name: "B1B1B2",
        value: 55
      }]
    }]
  }, {
    name: "C0",
    children: [{
      name: "C2A1",
      children: [{
        name: "C2A0A2",
        value: 24
      }, {
        name: "C2A0B2",
        value: 89
      }, {
        name: "C2A0C2",
        children: [{
          name: "C2A0C2A3",
          children: [{
            name: "C2A0C2A0A4",
            children: [{
              name: "C2A0C2A0A00",
              value: 90
            }, {
              name: "C2A0C2A0A01",
              value: 70
            }, {
              name: "C2A0C2A0A02",
              value: 66
            }, {
              name: "C2A0C2A0A03",
              value: 58
            }]
          }, {
            name: "C2A0C2A0B4",
            children: [{
              name: "C2A0C2A0B10",
              value: 80
            }, {
              name: "C2A0C2A0B11",
              value: 40
            }]
          }]
        }, {
          name: "C2A0C2B3",
          value: 44
        }]
      }, {
        name: "C2A0D2",
        children: [{
          name: "C2A0D3A3",
          value: 28
        }, {
          name: "C2A0D3B3",
          value: 14
        }]
      }]
    }, {
      name: "C2B1",
      value: 40
    }, {
      name: "C2C1",
      children: [{
        name: "C2C2A2",
        children: [{
          name: "C2C2A0A3",
          value: 28
        }, {
          name: "C2C2A0B3",
          children: [{
            name: "C2C2A0B1A4",
            value: 19
          }, {
            name: "C2C2A0B1B4",
            children: [{
              name: "C2C2A0B1B10",
              value: 11
            }, {
              name: "C2C2A0B1B11",
              value: 10
            }, {
              name: "C2C2A0B1B12",
              value: 97
            }, {
              name: "C2C2A0B1B13",
              value: 47
            }]
          }, {
            name: "C2C2A0B1C4",
            children: [{
              name: "C2C2A0B1C20",
              value: 40
            }, {
              name: "C2C2A0B1C21",
              value: 37
            }, {
              name: "C2C2A0B1C22",
              value: 53
            }]
          }]
        }, {
          name: "C2C2A0C3",
          value: 96
        }]
      }, {
        name: "C2C2B2",
        value: 66
      }]
    }]
  }]
}]);
series.set("selectedDataItem", series.dataItems[0]);

// Add breadcrumbs
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

JavaScript:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/hierarchy.js"></script>

<div id="chartdiv"></div>

<script>
// Create root and main container
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series and set data
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialDepth: 2
  })
);

series.data.setAll([{
  name: "Root",
  children: [{
    name: "A0",
    children: [{
      name: "A0A1",
      children: [{
        name: "A0A0A2",
        value: 71
      }, {
        name: "A0A0B2",
        children: [{
          name: "A0A0B1A3",
          value: 69
        }, {
          name: "A0A0B1B3",
          value: 85
        }]
      }, {
        name: "A0A0C2",
        value: 48
      }]
    }, {
      name: "A0B1",
      value: 27
    }, {
      name: "A0C1",
      children: [{
        name: "A0C2A2",
        value: 2
      }, {
        name: "A0C2B2",
        children: [{
          name: "A0C2B1A3",
          value: 54
        }, {
          name: "A0C2B1B3",
          value: 16
        }]
      }]
    }, {
      name: "A0D1",
      value: 89
    }]
  }, {
    name: "B0",
    children: [{
      name: "B1A1",
      value: 9
    }, {
      name: "B1B1",
      children: [{
        name: "B1B1A2",
        children: [{
          name: "B1B1A0A3",
          value: 35
        }, {
          name: "B1B1A0B3",
          value: 40
        }]
      }, {
        name: "B1B1B2",
        value: 55
      }]
    }]
  }, {
    name: "C0",
    children: [{
      name: "C2A1",
      children: [{
        name: "C2A0A2",
        value: 24
      }, {
        name: "C2A0B2",
        value: 89
      }, {
        name: "C2A0C2",
        children: [{
          name: "C2A0C2A3",
          children: [{
            name: "C2A0C2A0A4",
            children: [{
              name: "C2A0C2A0A00",
              value: 90
            }, {
              name: "C2A0C2A0A01",
              value: 70
            }, {
              name: "C2A0C2A0A02",
              value: 66
            }, {
              name: "C2A0C2A0A03",
              value: 58
            }]
          }, {
            name: "C2A0C2A0B4",
            children: [{
              name: "C2A0C2A0B10",
              value: 80
            }, {
              name: "C2A0C2A0B11",
              value: 40
            }]
          }]
        }, {
          name: "C2A0C2B3",
          value: 44
        }]
      }, {
        name: "C2A0D2",
        children: [{
          name: "C2A0D3A3",
          value: 28
        }, {
          name: "C2A0D3B3",
          value: 14
        }]
      }]
    }, {
      name: "C2B1",
      value: 40
    }, {
      name: "C2C1",
      children: [{
        name: "C2C2A2",
        children: [{
          name: "C2C2A0A3",
          value: 28
        }, {
          name: "C2C2A0B3",
          children: [{
            name: "C2C2A0B1A4",
            value: 19
          }, {
            name: "C2C2A0B1B4",
            children: [{
              name: "C2C2A0B1B10",
              value: 11
            }, {
              name: "C2C2A0B1B11",
              value: 10
            }, {
              name: "C2C2A0B1B12",
              value: 97
            }, {
              name: "C2C2A0B1B13",
              value: 47
            }]
          }, {
            name: "C2C2A0B1C4",
            children: [{
              name: "C2C2A0B1C20",
              value: 40
            }, {
              name: "C2C2A0B1C21",
              value: 37
            }, {
              name: "C2C2A0B1C22",
              value: 53
            }]
          }]
        }, {
          name: "C2C2A0C3",
          value: 96
        }]
      }, {
        name: "C2C2B2",
        value: 66
      }]
    }]
  }]
}]);
series.set("selectedDataItem", series.dataItems[0]);

// Add breadcrumbs
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
</script>
```

Example: [Treemap chart](https://docs.amcharts.com/embeds/v5/treemap-chart/)

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

// Create root and main container
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series and set data
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    initialDepth: 2
  })
);

series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A0A1",
            children: [
              {
                name: "A0A0A2",
                value: 71
              },
              {
                name: "A0A0B2",
                children: [
                  {
                    name: "A0A0B1A3",
                    value: 69
                  },
                  {
                    name: "A0A0B1B3",
                    value: 85
                  }
                ]
              },

              {
                name: "A0A0C2",
                value: 48
              }
            ]
          },

          {
            name: "A0B1",
            value: 27
          },
          {
            name: "A0C1",
            children: [
              {
                name: "A0C2A2",
                value: 2
              },
              {
                name: "A0C2B2",
                children: [
                  {
                    name: "A0C2B1A3",
                    value: 54
                  },
                  {
                    name: "A0C2B1B3",
                    value: 16
                  }
                ]
              }
            ]
          },

          {
            name: "A0D1",
            value: 89
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B1A1",
            value: 9
          },
          {
            name: "B1B1",
            children: [
              {
                name: "B1B1A2",
                children: [
                  {
                    name: "B1B1A0A3",
                    value: 35
                  },
                  {
                    name: "B1B1A0B3",
                    value: 40
                  }
                ]
              },

              {
                name: "B1B1B2",
                value: 55
              }
            ]
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C2A1",
            children: [
              {
                name: "C2A0A2",
                value: 24
              },
              {
                name: "C2A0B2",
                value: 89
              },
              {
                name: "C2A0C2",
                children: [
                  {
                    name: "C2A0C2A3",
                    children: [
                      {
                        name: "C2A0C2A0A4",
                        children: [
                          {
                            name: "C2A0C2A0A00",
                            value: 90
                          },
                          {
                            name: "C2A0C2A0A01",
                            value: 70
                          },
                          {
                            name: "C2A0C2A0A02",
                            value: 66
                          },
                          {
                            name: "C2A0C2A0A03",
                            value: 58
                          }
                        ]
                      },

                      {
                        name: "C2A0C2A0B4",
                        children: [
                          {
                            name: "C2A0C2A0B10",
                            value: 80
                          },
                          {
                            name: "C2A0C2A0B11",
                            value: 40
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2A0C2B3",
                    value: 44
                  }
                ]
              },

              {
                name: "C2A0D2",
                children: [
                  {
                    name: "C2A0D3A3",
                    value: 28
                  },
                  {
                    name: "C2A0D3B3",
                    value: 14
                  }
                ]
              }
            ]
          },

          {
            name: "C2B1",
            value: 40
          },
          {
            name: "C2C1",
            children: [
              {
                name: "C2C2A2",
                children: [
                  {
                    name: "C2C2A0A3",
                    value: 28
                  },
                  {
                    name: "C2C2A0B3",
                    children: [
                      {
                        name: "C2C2A0B1A4",
                        value: 19
                      },
                      {
                        name: "C2C2A0B1B4",
                        children: [
                          {
                            name: "C2C2A0B1B10",
                            value: 11
                          },
                          {
                            name: "C2C2A0B1B11",
                            value: 10
                          },
                          {
                            name: "C2C2A0B1B12",
                            value: 97
                          },
                          {
                            name: "C2C2A0B1B13",
                            value: 47
                          }
                        ]
                      },

                      {
                        name: "C2C2A0B1C4",
                        children: [
                          {
                            name: "C2C2A0B1C20",
                            value: 40
                          },
                          {
                            name: "C2C2A0B1C21",
                            value: 37
                          },
                          {
                            name: "C2C2A0B1C22",
                            value: 53
                          }
                        ]
                      }
                    ]
                  },

                  {
                    name: "C2C2A0C3",
                    value: 96
                  }
                ]
              },

              {
                name: "C2C2B2",
                value: 66
              }
            ]
          }
        ]
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);

// Add breadcrumbs
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```
