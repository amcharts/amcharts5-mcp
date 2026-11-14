---
title: "Treemap"
source: "https://docs.amcharts.com/v5/charts/hierarchy/treemap/"
scraped: "2026-11-14"
---

This tutorial will look at how to configure treemap series.

## Nodes

### Layout algorithm

Treemap can use different ways to layout algorithms.

It's controlled by the setting `layoutAlgorithm`:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    layoutAlgorithm: "sliceDice"
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
    layoutAlgorithm: "sliceDice"
  })
);
```

Available settings are as follows:

| Setting value | Example                                                        |
| ------------- | -------------------------------------------------------------- |
| `"binary"`    | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_binary.png)    |
| `"squarify"`  | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_squarify.png)  |
| `"slice"`     | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_slice.png)     |
| `"dice"`      | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_dice.png)      |
| `"sliceDice"` | ![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_slicedice.png) |

### Margins

By default, the rectangles of the nodes are plotted without any gaps between them.

We do have a few settings at our disposal that we can use to control the gaps. All accept numeric value in pixels.

| Setting             | Comment                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodePaddingInner`  | Gap between nodes.                                                                                                                                                                |
| `nodePaddingOuter`  | Gap between a node's edges and the nodes inside it. For the top node, that's the gap to the chart's edges. Overrides the four settings below.                                     |
| `nodePaddingTop`    | Gap between a node's top edge and the nodes inside it. Ignored if `nodePaddingOuter` is set. Use it for [parent node headers](https://docs.amcharts.com/v5/charts/hierarchy/treemap/#parent-node-headers). |
| `nodePaddingBottom` | Gap between a node's bottom edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                   |
| `nodePaddingLeft`   | Gap between a node's left edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                     |
| `nodePaddingRight`  | Gap between a node's right edge and the nodes inside it. Ignored if `nodePaddingOuter` is set.                                                                                    |

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 20,
    nodePaddingInner: 10
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
    nodePaddingOuter: 20,
    nodePaddingInner: 10
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_no_padding.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_padding.png "`nodePaddingOuter: 20` | `nodePaddingInner: 10`")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/treemap/treemap_top_padding.png "`nodePaddingInner: 10` | `nodePaddingTop: 100` | `nodePaddingBottom: 20` | `nodePaddingLeft: 20` | `nodePaddingRight: 20`")

### Node appearance

The appearance of node rectangles can be configured using their template, accessible on series property: `rectangles.template`.

The template can have contain any `RoundedRectangle` [setting](https://docs.amcharts.com/v5/reference/roundedrectangle/#Settings).

TypeScript:

```ts
series.rectangles.template.setAll({
  fillOpacity: 0.7,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4
});
```

JavaScript:

```js
series.rectangles.template.setAll({
  fillOpacity: 0.7,
  cornerRadiusTL: 4,
  cornerRadiusTR: 4,
  cornerRadiusBL: 4,
  cornerRadiusBR: 4
});
```

### Hover behavior

We can set setting values to apply to a rectangle when it is hovered by creating a "hover" [state](https://docs.amcharts.com/v5/concepts/settings/states/) for it.

TypeScript:

```ts
series.rectangles.template.states.create("hover", {
  fill: am5.color(0x677935),
  fillOpacity: 1
});
```

JavaScript:

```js
series.rectangles.template.states.create("hover", {
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

Partition series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#Settings).

### Label content

Node labels are pre-set to display name of the category and its percent value.

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

### Parent node headers

Every label is centered on its tile, so when child tiles are shown, they cover their parent's label. There's no header setting. To show parent names in a header band:

* `nodePaddingTop` reserves a band at the top of every parent tile.
* Adapters move the label of each tile whose children are shown into that band. Other labels stay centered.

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    topDepth: 1,
    initialDepth: 1,
    nodePaddingTop: 24
  })
);

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
```

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    topDepth: 1,
    initialDepth: 1,
    nodePaddingTop: 24
  })
);

function showsChildren(label: am5.Label): boolean {
  const dataItem = label.dataItem as am5.DataItem<am5hierarchy.ITreemapDataItem> | undefined;
  return !!dataItem && !!dataItem.get("children") && !dataItem.get("disabled");
}

series.labels.template.adapters.add("y", (y, target) => {
  return showsChildren(target) ? 0 : y;
});

series.labels.template.adapters.add("centerY", (centerY, target) => {
  return showsChildren(target) ? 0 : centerY;
});
```

When you drill in, the selected tile's name stays in the band above its children.

With `topDepth: 1`, the hidden root node keeps its band too, which leaves an empty strip at the top. To label it instead, show the root with `topDepth: 0`.

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

The example also drills one level per click. See "[Drilling one level per click](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/#drilling-one-level-per-click)".

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

Rectangles series are pre-set to display a tooltip on hover containing name of the category and its value.

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

Example: [Treemap chart](https://docs.amcharts.com/embeds/v5/treemap-chart-2/)

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

var data = [
  {
    name: "Beer styles",
    children: [
      {
        name: "Pale Ales",
        children: [
          { name: "American Amber Ale", value: 1 },
          { name: "American Pale Ale", value: 1 },
          { name: "Blonde Ale", value: 1 },
          { name: "English-Style Bitter", value: 1 },
          { name: "English-Style Pale Ale (ESB)", value: 1 }
        ]
      },

      {
        name: "Dark Lagers",
        children: [
          { name: "American Amber Lager", value: 1 },
          { name: "German-Style Dunkel", value: 1 },
          { name: "German-Style Marzen / Oktoberfest", value: 1 },
          { name: "German-Style Schwarzbier", value: 1 },
          { name: "Vienna-Style Lager", value: 1 }
        ]
      },

      {
        name: "Brown Ales",
        children: [
          { name: "American Brown Ale", value: 1 },
          { name: "English-Style Brown Ale", value: 1 },
          { name: "English-Style Mild", value: 1 }
        ]
      },

      {
        name: "India Pale Ales",
        children: [
          { name: "American IPA", value: 1 },
          { name: "English-Style IPA", value: 1 },
          { name: "Imperial India Pale Ale", value: 1 },
          { name: "New England IPA", value: 1 }
        ]
      },

      {
        name: "Wheat Beers",
        children: [
          { name: "American-Style Wheat Wine Ale", value: 1 },
          { name: "American Wheat", value: 1 },
          { name: "Belgian-Style Witbier", value: 1 },
          { name: "Berliner-Style Weisse", value: 1 },
          { name: "German-Style Dunkelweizen", value: 1 },
          { name: "German-Style Hefeweizen", value: 1 }
        ]
      },

      {
        name: "Strong Ales",
        children: [
          { name: "American Barley Wine", value: 1 },
          { name: "American Imperial Red Ale", value: 1 },
          { name: "British-Style Barley Wine Ale", value: 1 },
          { name: "English-Style Old Ale", value: 1 }
        ]
      },

      {
        name: "Belgian Styles",
        children: [
          { name: "Belgian-Style Blonde Ale", value: 1 },
          { name: "Belgian-Style Dubbel", value: 1 },
          { name: "Belgian-Style Golden Strong Ale", value: 1 },
          { name: "Belgian-Style Pale Ale", value: 1 },
          { name: "Belgian-Style Quadrupel", value: 1 },
          { name: "Belgian-Style Saison", value: 1 },
          { name: "Belgian-Style Tripel", value: 1 }
        ]
      },

      {
        name: "Hybrid Beers",
        children: [
          { name: "American Cream Ale", value: 1 },
          { name: "French-Style Biere de Garde", value: 1 },
          { name: "California Common", value: 1 },
          { name: "German-Style Altbier", value: 1 },
          { name: "German-Style Kolsch", value: 1 },
          { name: "Irish-Style Red Beer", value: 1 }
        ]
      },

      {
        name: "Porters",
        children: [
          { name: "American Imperial Porter", value: 1 },
          { name: "Baltic-Style Porter", value: 1 },
          { name: "English-Style Brown Porter", value: 1 },
          { name: "Robust Porter", value: 1 },
          { name: "Smoke Porter", value: 1 }
        ]
      },

      {
        name: "Stouts",
        children: [
          { name: "American Imperial Stout", value: 1 },
          { name: "American Stout", value: 1 },
          { name: "English-Style Oatmeal Stout", value: 1 },
          { name: "English-Style Sweet Stout (Milk Stout)", value: 1 },
          { name: "Irish-Style Dry Stout", value: 1 }
        ]
      },

      {
        name: "Bocks",
        children: [
          { name: "German-Style Bock", value: 1 },
          { name: "German-Style Doppelbock", value: 1 },
          { name: "German-Style Maibock", value: 1 },
          { name: "German-Style Weizenbock", value: 1 }
        ]
      },

      {
        name: "Scottish-Style Ales",
        children: [
          { name: "Scotch Ale/Wee Heavy", value: 1 },
          { name: "Scottish-Style Ale", value: 1 }
        ]
      },

      {
        name: "Wild/Sour Beers",
        children: [
          { name: "American Brett", value: 1 },
          { name: "American Sour", value: 1 },
          { name: "Belgian-Style Flanders", value: 1 },
          { name: "Belgian-Style Fruit Lambic", value: 1 },
          { name: "Belgian-Style Lambic/Gueuze", value: 1 },
          { name: "Contemporary Gose", value: 1 }
        ]
      },

      {
        name: "Pilseners and Pale Lagers",
        children: [
          { name: "American Lager", value: 1 },
          { name: "Bohemian-Style Pilsener", value: 1 },
          { name: "European-Style Export", value: 1 },
          { name: "German-Style Helles", value: 1 },
          { name: "German-Style Pilsner", value: 1 }
        ]
      },

      {
        name: "Specialty Beers",
        children: [
          { name: "American Black Ale", value: 1 },
          { name: "Barrel-Aged Beer", value: 1 },
          { name: "Chocolate Beer", value: 1 },
          { name: "Coffee Beer", value: 1 },
          { name: "Fruit and Field Beer", value: 1 },
          { name: "Gluten-Free Craft Beer", value: 1 },
          { name: "Herb and Spice Beer", value: 1 },
          { name: "Honey Beer", value: 1 },
          { name: "Pumpkin Beer", value: 1 },
          { name: "Rye Beer", value: 1 },
          { name: "Session Beer", value: 1 },
          { name: "Smoke Beer", value: 1 },
          { name: "Specialty Beer", value: 1 }
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
  am5hierarchy.Treemap.new(root, {
    downDepth: 1,
    upDepth: 0,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 20,
    nodePaddingInner: 10
  })
);

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);

// Add breadcrumbs
container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);
```

## Related tutorials

* [Adaptive label colors on a Treemap](https://docs.amcharts.com/v5/tutorials/adaptive-label-colors-on-a-treemap/)
* [Treemap with partial fills in nodes](https://docs.amcharts.com/v5/tutorials/treemap-with-partial-fills-in-nodes/) (demo)
* [Treemap with auto-colored labels](https://docs.amcharts.com/v5/tutorials/treemap-with-auto-colored-labels/) (demo)
* [Treemap with highlight of parent node on hover](https://docs.amcharts.com/v5/tutorials/treemap-with-highlight-of-parent-node-on-hover/) (demo)
