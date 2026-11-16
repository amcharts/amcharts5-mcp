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

Example: [Force-directed chart](https://docs.amcharts.com/embeds/v5/force-directed-chart/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    topDepth: 1,
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

series.data.setAll([
  {
    name: "Root",
    value: 0,
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
```

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

Example: [Force-directed chart with topDepth](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-topdepth/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    topDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
    // minRadius: 20,
    // maxRadius: am5.percent(15)
  })
);

series.data.setAll([
  {
    name: "Root",
    value: 0,
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
```

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

Example: [Force-directed chart with fixed nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-fixed-nodes/)

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
    width: 70,
    height: 70,
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "https://assets.codepen.io/t-160/star.svg"
  }));
}
```

Example: [Force-directed chart with images as nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-images-as-nodes/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 1,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 30
  })
);

series.labels.template.setAll({
  fill: am5.color(0x000000)
});

// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function (target) {
  var icon = target.children.push(
    am5.Picture.new(root, {
      width: 70,
      height: 70,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "https://docs.amcharts.com/assets/star.svg"
    })
  );
};

//console.log(series.nodes)

series.data.setAll([
  {
    name: "A",
    children: [
      {
        name: "A1",
        value: 1
      },
      {
        name: "A2",
        value: 1
      },
      {
        name: "A3",
        value: 1
      },
      {
        name: "A4",
        value: 1
      },
      {
        name: "A5",
        value: 1
      }
    ]
  }
]);

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

Example: [Force-directed chart with images as nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-images-as-nodes-2/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 1,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    xField: "x",
    yField: "y",
    minRadius: 30,
    manyBodyStrength: -40
  })
);

// Disable circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// ... except for central node
series.circles.template.adapters.add("forceHidden", function (forceHidden, target) {
  return target.dataItem.get("depth") == 0 ? false : forceHidden;
});

// Set up labels
series.labels.template.setAll({
  fill: am5.color(0x000000),
  y: 45,
  //y: am5.percent(10),
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
        width: 70,
        height: 70,
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
    x: am5.percent(50),
    y: am5.percent(50),
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

Example: [Using ellipses as nodes in Force-Directed Tree](https://docs.amcharts.com/embeds/v5/using-ellipses-as-nodes-in-force-directed-tree/)

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
  max-width: 100%;
  height: 550px;
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

var data = {
  value: 0,
  children: [
    {
      name: "Flora",
      children: [
        {
          name: "Black Tea",
          value: 1
        },

        {
          name: "Floral",
          children: [
            {
              name: "Chamomile",
              value: 1
            },

            {
              name: "Rose",
              value: 1
            },

            {
              name: "Jasmine",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Fruity",
      children: [
        {
          name: "Berry",
          children: [
            {
              name: "Blackberry",
              value: 1
            },

            {
              name: "Raspberry",
              value: 1
            },

            {
              name: "Blueberry",
              value: 1
            },

            {
              name: "Strawberry",
              value: 1
            }
          ]
        },

        {
          name: "Dried Fruit",
          children: [
            {
              name: "Raisin",
              value: 1
            },

            {
              name: "Prune",
              value: 1
            }
          ]
        },

        {
          name: "Other Fruit",
          children: [
            {
              name: "Coconut",
              value: 1
            },

            {
              name: "Cherry",
              value: 1
            },

            {
              name: "Pomegranate",
              value: 1
            },

            {
              name: "Pineapple",
              value: 1
            },

            {
              name: "Grape",
              value: 1
            },

            {
              name: "Apple",
              value: 1
            },

            {
              name: "Peach",
              value: 1
            },

            {
              name: "Pear",
              value: 1
            }
          ]
        },

        {
          name: "Citrus Fruit",
          children: [
            {
              name: "Grapefruit",
              value: 1
            },

            {
              name: "Orange",
              value: 1
            },

            {
              name: "Lemon",
              value: 1
            },

            {
              name: "Lime",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Sour/Fermented",
      children: [
        {
          name: "Sour",
          children: [
            {
              name: "Sour Aromatics",
              value: 1
            },

            {
              name: "Acetic Acid",
              value: 1
            },

            {
              name: "Butyric Acid",
              value: 1
            },

            {
              name: "Isovaleric Acid",
              value: 1
            },

            {
              name: "Citric Acid",
              value: 1
            },

            {
              name: "Malic Acid",
              value: 1
            }
          ]
        },

        {
          name: "Alcohol/Fremented",
          children: [
            {
              name: "Winey",
              value: 1
            },

            {
              name: "Whiskey",
              value: 1
            },

            {
              name: "Fremented",
              value: 1
            },

            {
              name: "Overripe",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Green/Vegetative",
      children: [
        {
          name: "Olive Oil",
          value: 1
        },

        {
          name: "Raw",
          value: 1
        },

        {
          name: "Green/Vegetative",
          children: [
            {
              name: "Under-ripe",
              value: 1
            },

            {
              name: "Peapod",
              value: 1
            },

            {
              name: "Fresh",
              value: 1
            },

            {
              name: "Dark Green",
              value: 1
            },

            {
              name: "Vegetative",
              value: 1
            },

            {
              name: "Hay-like",
              value: 1
            },

            {
              name: "Herb-like",
              value: 1
            }
          ]
        },

        {
          name: "Beany",
          value: 1
        }
      ]
    },

    {
      name: "Other",
      children: [
        {
          name: "Papery/Musty",
          children: [
            {
              name: "Stale",
              value: 1
            },

            {
              name: "Cardboard",
              value: 1
            },

            {
              name: "Papery",
              value: 1
            },

            {
              name: "Woody",
              value: 1
            },

            {
              name: "Moldy/Damp",
              value: 1
            },

            {
              name: "Musty/Dusty",
              value: 1
            },

            {
              name: "Musty/Earthy",
              value: 1
            },

            {
              name: "Animalic",
              value: 1
            },

            {
              name: "Meaty Brothy",
              value: 1
            },

            {
              name: "Phenolic",
              value: 1
            }
          ]
        },

        {
          name: "Chemical",
          children: [
            {
              name: "Bitter",
              value: 1
            },

            {
              name: "Salty",
              value: 1
            },

            {
              name: "Medicinal",
              value: 1
            },

            {
              name: "Petroleum",
              value: 1
            },

            {
              name: "Skunky",
              value: 1
            },

            {
              name: "Rubber",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Roasted",
      children: [
        {
          name: "Pipe Tobacco",
          value: 1
        },

        {
          name: "Tobacco",
          value: 1
        },

        {
          name: "Burnt",
          children: [
            {
              name: "Acrid",
              value: 1
            },

            {
              name: "Ashy",
              value: 1
            },

            {
              name: "Smoky",
              value: 1
            },

            {
              name: "Brown, Roast",
              value: 1
            }
          ]
        },

        {
          name: "Cereal",
          children: [
            {
              name: "Grain",
              value: 1
            },

            {
              name: "Malt",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Spices",
      children: [
        {
          name: "Pungent",
          value: 1
        },

        {
          name: "Pepper",
          value: 1
        },

        {
          name: "Brown Spice",
          children: [
            {
              name: "Anise",
              value: 1
            },

            {
              name: "Nutmeg",
              value: 1
            },

            {
              name: "Cinnamon",
              value: 1
            },

            {
              name: "Clove",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Nutty/Cocoa",
      children: [
        {
          name: "Nutty",
          children: [
            {
              name: "Peanuts",
              value: 1
            },

            {
              name: "Hazelnut",
              value: 1
            },

            {
              name: "Almond",
              value: 1
            }
          ]
        },

        {
          name: "Cocoa",
          children: [
            {
              name: "Chocolate",
              value: 1
            },

            {
              name: "Dark Chocolate",
              value: 1
            }
          ]
        }
      ]
    },

    {
      name: "Sweet",
      children: [
        {
          name: "Brown Sugar",
          children: [
            {
              name: "Molasses",
              value: 1
            },

            {
              name: "Maple Syrup",
              value: 1
            },

            {
              name: "Caramelized",
              value: 1
            },

            {
              name: "Honey",
              value: 1
            }
          ]
        },

        {
          name: "Vanilla",
          value: 1
        },

        {
          name: "Vanillin",
          value: 1
        },

        {
          name: "Overall Sweet",
          value: 1
        },

        {
          name: "Sweet Aromatics",
          value: 1
        }
      ]
    }
  ]
};

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    singleBranchOnly: false,
    downDepth: 2,
    topDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    idField: "name",
    linkWithField: "linkWith",
    manyBodyStrength: -10,
    centerStrength: 0.8
  })
);

series.get("colors").setAll({
  step: 2
});

series.links.template.set("strength", 0.5);

series.set("selectedDataItem", series.dataItems[0]);

// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an ellipsis to node
series.nodes.template.setup = function (target) {
  target.events.once("dataitemchanged", function (ev) {
    var target = ev.target;
    target.dataItem.on("circle", function (circle) {
      circle.on("radius", function (radius, circle) {
        var ellipsis = circle.getPrivate("customData");
        if (ellipsis) {
          ellipsis.setAll({
            radiusX: circle.get("radius"),
            radiusY: circle.get("radius") * 0.6
          });
        } else {
          ellipsis = target.children.unshift(
            am5.Ellipse.new(root, {
              radiusX: circle.get("radius"),
              radiusY: circle.get("radius") * 0.6,
              centerX: am5.percent(50),
              centerY: am5.percent(50),
              fill: circle.get("fill")
            })
          );

          circle.setPrivate("customData", ellipsis);
        }
      });
    });
  });
};

series.data.setAll([data]);

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

Example: [Force-directed chart with cross-linked nodes](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-cross-linked-nodes/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    idField: "name",
    childDataField: "children",
    linkWithField: "link",
    minRadius: 20,
    maxRadius: am5.percent(12)
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
            value: 30,
            link: ["A2-3"]
          },
          {
            name: "A1-3",
            value: 20,
            link: ["A3-2"]
          }
        ]
      },

      {
        name: "A2",
        children: [
          {
            name: "A2-1",
            value: 40,
            link: ["A3-3"]
          },
          {
            name: "A2-2",
            value: 30
          },
          {
            name: "A2-3",
            value: 10
          }
        ]
      },

      {
        name: "A3",
        children: [
          {
            name: "A3-1",
            value: 5
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

Example: [Force-directed chart with strength configuration](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-strength-configuration/)

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
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 20,
    maxRadius: am5.percent(12),
    centerStrength: 0.5,
    manyBodyStrength: -1,
    nodePadding: 20
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
            value: 30,
            link: ["A2-3"]
          },
          {
            name: "A1-3",
            value: 20,
            link: ["A3-2"]
          }
        ]
      },

      {
        name: "A2",
        children: [
          {
            name: "A2-1",
            value: 40,
            link: ["A3-3"]
          },
          {
            name: "A2-2",
            value: 30
          },
          {
            name: "A2-3",
            value: 10
          }
        ]
      },

      {
        name: "A3",
        children: [
          {
            name: "A3-1",
            value: 5
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
