---
title: "Hierarchy drill-down"
source: "https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/"
scraped: "2026-11-14"
---

Hierarchy nodes that have children are clickable. When that happens a node will drill down or up, depending on hierarchy type and its settings.

## Active nodes

When a node is clicked/tapped it becomes active. It then perform an action that is associated with activating a node, e.g. exploding a branch of children, or zooming in.

When an active node is clicked, it performs a drill-up action, e.g. zooms in on a parent, collapses children branch, etc.

The exact behavior differs from series to series.

## Linked hierarchies

Linked hierarchies are: `ForceDirected` and `Tree`.

An "active" node in a tree is considered one that has a branch of its children expanded.

If children branch is collapsed, node is considered "inactive".

### Drill-down

When user clicks on an "inactive" node, it will expand a branch of its children.

How many levels of children are shown is controlled by series' `downDepth` setting.

Setting it to `Infinity` will ensure that the whole branch of descendants of the clicked node is revealed. However, that might not be the best choice for deep hierarchies.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Drill-up

When "active" node is clicked, the whole branch of its children is collapsed.

### Limiting to single branch

Normally, a user can open and close any number of branches at will.

We can limit number of branches open at any given time to one by setting series' `singleBranchOnly` to `true`.

> **Note:** The default depends on the series: `true` for `Treemap`, `Pack`, `Partition`, `VoronoiTreemap` and `Sunburst`, `false` for `ForceDirected` and `Tree`. `Sunburst` ignores the setting since 5.21.0 and always works as if it is `true`, because other open branches would overlap the zoomed-in one.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

Example: [Force-directed chart](https://docs.amcharts.com/embeds/v5/force-directed-chart-2/)

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
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
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
```

## Regular hierarchies

Regular hierarchies are: `Treemap`, `Sunburst`, `Pack`, and `Partition`.

In a regular hierarchies, an "active" node is the one that was clicked last.

### Drill-down

When a node that is not currently "active" is clicked, these things might happen:

* Series zooms in on the clicked node making it take up the whole width or circumference of the series.
* Child nodes are revealed if they are currently not visible.

The setting `downDepth` controls how many levels of children to reveal when node is activated.

It may also display a few levels of its parents as well. For that we have another setting: `upDepth`.

For example, if we set both `downDepth` and `upDepth` to `1` (one) on a sunburst series, we will get 3 rings when clicked on a node (slice):

* Inner ring: parent node.
* Middle ring: active node.
* Outer ring: immediate children of the active node.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    upDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    upDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Drilling one level per click

A click selects the node under the pointer. When several levels are shown, e.g. a treemap with countries inside regions, that's the inner node, so the chart skips the level in between: a click on a country tile opens the country, not its region.

To drill one level at a time, either:

* Show one level at a time: `initialDepth: 0` (with `topDepth: 1`, only the regions are shown). Each click then opens the next level.
* Or keep the nested view and replace the click handler with one that selects the node one level below the current one:

JavaScript:

```js
series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", function(ev) {
  var dataItem = ev.target.dataItem;
  var selectedItem = series.get("selectedDataItem");

  // Walk up to the node one level below the current one
  var item = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent");
  }

  if (!item) {
    // The current node itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});
```

TypeScript:

```ts
// For a treemap; other series use their own data item type
type TreemapItem = am5.DataItem<am5hierarchy.ITreemapDataItem>;

series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", (ev) => {
  const dataItem = ev.target.dataItem as TreemapItem;
  const selectedItem = series.get("selectedDataItem");

  // Walk up to the node one level below the current one
  let item: TreemapItem | undefined = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent") as TreemapItem | undefined;
  }

  if (!item) {
    // The current node itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});
```

Example: [Treemap with parent headers and one-level drill-down](https://docs.amcharts.com/embeds/v5/treemap-parent-headers/)

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
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Sales by region, country and product
function products(hardware, software, services) {
  return [
    { name: "Hardware", value: hardware },
    { name: "Software", value: software },
    { name: "Services", value: services }
  ];
}

var data = [{
  name: "World",
  children: [{
    name: "Europe",
    children: [
      { name: "Germany", children: products(42, 31, 18) },
      { name: "France", children: products(28, 22, 15) },
      { name: "United Kingdom", children: products(25, 30, 21) },
      { name: "Italy", children: products(17, 11, 9) }
    ]
  }, {
    name: "Asia",
    children: [
      { name: "China", children: products(64, 25, 19) },
      { name: "Japan", children: products(33, 21, 14) },
      { name: "India", children: products(21, 26, 23) },
      { name: "South Korea", children: products(19, 12, 8) }
    ]
  }, {
    name: "Americas",
    children: [
      { name: "United States", children: products(71, 66, 48) },
      { name: "Canada", children: products(16, 14, 10) },
      { name: "Brazil", children: products(14, 8, 7) },
      { name: "Mexico", children: products(12, 6, 5) }
    ]
  }]
}];

// Show regions with their countries: the top level (topDepth) plus one more
var series = container.children.push(am5hierarchy.Treemap.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  topDepth: 1,
  initialDepth: 1,
  nodePaddingTop: 24
}));

series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");

// Put the label of a tile whose children are shown into its header band
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

// Drill down one level per click, even when the click lands on an inner tile
series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", function(ev) {
  var dataItem = ev.target.dataItem;
  var selectedItem = series.get("selectedDataItem");

  // Walk up to the tile one level below the current one
  var item = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent");
  }

  if (!item) {
    // The current tile itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});

container.children.unshift(am5hierarchy.BreadcrumbBar.new(root, {
  series: series
}));

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);

series.appear(1000, 100);
```

### Drill-up

Clicking active node again, will drill the series one level up.

### Top-level node

Clicking root top-level active root node will reset the chart to the same position as it was on initial load: according to `initialDepth`.

Example: [Sunburst chart](https://docs.amcharts.com/embeds/v5/sunburst-chart/)

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
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
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
```

## Disabling drill-down

To disable toggle behavior on a node, in all hierarchy charts, all we need to do is to reset `toggle` key for node template, as well as resetting pointer cursor:

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

## Toggling on double-click

If we would like to disable default click toggling functionality (for example for doing something else on click) and rather toggle nodes on double-click, we can use the code above as well as add our own handler for `"dblclick"` event:

TypeScript:

```ts
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});
```

JavaScript:

```js
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});
```

## Drill-down to external URLs

We can also set up external URLs to be opened when hierarchy nodes are clicked.

For that we'll need two things:

* [Disable built-in drill-down](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/#disabling-drill-down) behavior (section above).
* Attach `click` event to nodes that would open new window/tab/etc.

TypeScript:

```ts
// Disable collapsing/exploding of nodes
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

// Add click events to nodes
series.nodes.template.events.on("click", function(ev) {
  var data = ev.target.dataItem.dataContext;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(data.name + " coffee");
  window.open(url)
});
```

JavaScript:

```js
// Disable collapsing/exploding of nodes
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

// Add click events to nodes
series.nodes.template.events.on("click", function(ev) {
  var data = ev.target.dataItem.dataContext;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(data.name + " coffee");
  window.open(url)
});
```

Example: [Open an URL on force-directed node click](https://docs.amcharts.com/embeds/v5/open-an-url-on-force-directed-node-click/)

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
    //downDepth: 0,
    //upDepth: 0,
    topDepth: 1,
    //initialDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    idField: "name",
    linkWithField: "linkWith",
    manyBodyStrength: -10,
    centerStrength: 0.8,
    toggleKey: "none"
  })
);

series.get("colors").setAll({
  step: 2
});

// Disable collapsing/exploding of nodes
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

// Add click events to nodes
series.nodes.template.events.on("click", function (ev) {
  var data = ev.target.dataItem.dataContext;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(data.name + " coffee");
  window.open(url);
});

// Set link strenght
series.links.template.set("strength", 0.5);

series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

## API

### Triggering drill-down

It's also possible to trigger drill-down/up via API, using series' `selectDataItem()` method.

It accepts a single parameter - a data item of the node we want to drill-down into.

Here's a function that finds a data item using its name (category), then drills down into it:

TypeScript:

```ts
function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

JavaScript:

```js
function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

Example: [Drill-Down Sunburst Chart via API](https://docs.amcharts.com/embeds/v5/drill-down-sunburst-chart-via-api/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/hierarchy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
<input type="button" value="Drill down to C1" onclick="drillTo('C1')" />
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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

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
  am5hierarchy.Sunburst.new(root, {
    singleBranchOnly: true,
    downDepth: 10,
    initialDepth: 10,
    topDepth: 1,
    innerRadius: am5.percent(30),
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.data.setAll([
  {
    name: "root",
    children: [
      {
        name: "First",
        children: [
          { name: "A1", value: 100 },
          { name: "A2", value: 60 }
        ]
      },

      {
        name: "Second",
        children: [
          { name: "B1", value: 135 },
          { name: "B2", value: 98 }
        ]
      },

      {
        name: "Third",
        children: [
          {
            name: "C1",
            children: [
              { name: "EE1", value: 130 },
              { name: "EE2", value: 87 },
              { name: "EE3", value: 55 }
            ]
          },

          { name: "C2", value: 148 },
          {
            name: "C3",
            children: [
              { name: "CC1", value: 53 },
              { name: "CC2", value: 30 }
            ]
          },

          { name: "C4", value: 26 }
        ]
      },

      {
        name: "Fourth",
        children: [
          { name: "D1", value: 415 },
          { name: "D2", value: 148 },
          { name: "D3", value: 89 }
        ]
      },

      {
        name: "Fifth",
        children: [
          {
            name: "E1",
            children: [
              { name: "EE1", value: 33 },
              { name: "EE2", value: 40 },
              { name: "EE3", value: 89 }
            ]
          },

          {
            name: "E2",
            value: 148
          }
        ]
      }
    ]
  }
]);

series.selectDataItem(series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);

function drillTo(name) {
  series.nodes.each(function (node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

### Registering events

If we need which node is being selected, we can do so via series' `dataitemselected` event:

TypeScript:

```ts
series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});
```

JavaScript:

```js
series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});
```
