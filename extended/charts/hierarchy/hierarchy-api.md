---
title: "Hierarchy API"
source: "https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-api/"
scraped: "2026-11-16"
---

This tutorial is a collection of uses for Hierarchy-specific API.

## Dynamically adding child nodes

We can use a series method `addChildData()` to dynamically add child nodes to in any Hierarchy chart.

TypeScript:

```ts
series.addChildData(dataItem, [
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
]);
```

JavaScript:

```js
series.addChildData(dataItem, [
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
]);
```

Here's a working example, which adds a child node to a clicked node.

Example: [Dynamically adding and removing nodes in a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/dynamically-adding-and-removing-nodes-in-a-force-directed-tr/)

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

var data = [
  {
    name: "Root",
    children: [
      { name: "A", value: 5 },
      { name: "B", value: 3 },
      { name: "C", value: 8 }
    ]
  }
];

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
    downDepth: 1,
    topDepth: 0,
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

// Adding and removing new data items
series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;

  // Dispose data if clicked when shift is pressed
  if (e.originalEvent.shiftKey) {
    series.disposeDataItem(dataItem);
  } else {
    // Set value of original data item to undefined, so that only child values would be used
    dataItem.set("value", undefined);
    dataItem.set("valueWorking", undefined);

    var name = dataItem.get("category");
    var count = dataItem.get("children", []).length + 1;

    series.addChildData(dataItem, [
      { name: name + "." + count, value: Math.ceil(Math.random() * 10) }
    ]);
  }
});

series.data.setAll(data);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

Please note, that if node did not previously had any child nodes, and thus had a value of its own (not a sum of child values), we would want to remove it's own value before adding children:

TypeScript:

```ts
dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);
```

JavaScript:

```js
dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);
```

## Updating node values

Similarly, we can also change node values:

TypeScript:

```ts
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);
```

JavaScript:

```js
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);
```

If our series uses `colorField`, we can also update `fill` setting of the data item, as well as related graphical element, such as circle on a Force-directed series:

TypeScript:

```ts
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));
```

JavaScript:

```js
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));
```

Example: [Dynamically changing node values on a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/dynamically-changing-node-values-on-a-force-directed-tree/)

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

var data = [
  {
    name: "Root",
    children: [
      { name: "A", value: 5 },
      { name: "B", value: 3 },
      { name: "C", value: 8 }
    ]
  }
];

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
    downDepth: 1,
    topDepth: 0,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    idField: "name",
    colorField: "color",
    manyBodyStrength: -10,
    centerStrength: 0.8
  })
);

// Adding and removing new data items
series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;

  var newValue = Math.ceil(Math.random() * 10);
  var newColor = series.get("colors").next();
  dataItem.set("fill", newColor);
  dataItem.get("circle").set("fill", newColor);
  dataItem.set("value", newValue);
  dataItem.set("valueWorking", newValue);
});

series.data.setAll(data);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

## Removing nodes

To remove a node without updating the whole data set, use series' method `disposeDataItem()`:

TypeScript:

```ts
series.disposeDataItem(dataItem);
```

JavaScript:

```js
series.disposeDataItem(dataItem);
```

The below demo will remove any clicked node:

Example: [Removing nodes from a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/removing-nodes-from-a-force-directed-tree/)

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
    initialDepth: 3,
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

series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;
  series.disposeDataItem(dataItem);
});

series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);
```

## Looking up a nodes

If we need to find a specific node instance by its name, we can find it in the series' node list.

Here's a handy function:

TypeScript:

```ts
function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}
```

JavaScript:

```js
function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}
```

## Toggling nodes

To expand a node, we can use series method `enableDataItem(dataItem)`.

Similarly, to collapse a node, use `disableDataItem(dataItem)`.

The following example finds and collapses "Fruity" node as well as expands the one called "Other":

TypeScript:

```ts
// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);
```

JavaScript:

```js
// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);
```

Example: [Removing nodes from a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/removing-nodes-from-a-force-directed-tree-2/)

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
    initialDepth: 3,
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

series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;
  series.disposeDataItem(dataItem);
});

series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);

// Node toggling functions
setTimeout(function () {
  series.disableDataItem(findNode("Fruity").dataItem);
  series.disableDataItem(findNode("Other").dataItem);
}, 3000);

setTimeout(function () {
  series.enableDataItem(findNode("Fruity").dataItem);
  series.enableDataItem(findNode("Other").dataItem);
}, 6000);

function findNode(name) {
  return series.nodes.values.find(function (node) {
    return node.dataItem.get("category") == name;
  });
}
```
