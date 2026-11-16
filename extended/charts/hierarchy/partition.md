---
title: "Partition"
source: "https://docs.amcharts.com/v5/charts/hierarchy/partition/"
scraped: "2026-11-16"
---

This tutorial will look at how to configure partition series.

## Orientation

Partition will plot itself in vertical mode, i.e. with top-level nodes on the top, second level beneath them, etc.

We can change that using series' `orientation` setting, by setting it to `"horizontal"`. It will put top level on the left, with other levels lining up to the right.

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
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
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "horizontal"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/vertical_partition.png "`orientation: 'vertical'` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/horizontal_partition.png "`orientation: 'horizontal'`")

Example: [Horizontal partition chart](https://docs.amcharts.com/embeds/v5/horizontal-partition-chart/)

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
  am5hierarchy.Partition.new(root, {
    orientation: "horizontal",
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

## Nodes

### Margins

By default, the squares of the nodes are plotted without any gaps between them.

We can increase that gap using series setting `nodePadding`. It accepts numeric values in pixels:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePadding: 5
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Partition.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePadding: 5
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/partition_padding_0.png "`nodePadding: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/hierarchy/partition/partition_padding_5.png "`nodePadding: 5`")

### Node appearance

The appearance of node rectangles can be configured using their template, accessible on series property: `rectangles.template`.

The template can have contain any `RoundedRectangle` [setting](https://docs.amcharts.com/v5/reference/roundedrectangle/#settings).

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

Partition series uses `Label` for its labels. Check out its class reference for all the [possible settings](https://docs.amcharts.com/v5/reference/label/#settings).

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

Refer to `IPartitionDataItem` for available keys for the data placeholders.

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

We can modify contents of the tooltips using `tooltipText` on rectangle's template:

TypeScript:

```ts
series.rectangles.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

JavaScript:

```js
series.rectangles.template.set("tooltipText", "{category}: [bold]{sum}[/]");
```

Contents of the tooltip can include [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (codes in curly brackets that will be replaced by actual data) and [in-line formatting blocks](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) (formatting instructions enclosed in square brackets).

Refer to `IPartitionDataItem` for available keys for the data placeholders.

## Example

Example: [Partition chart](https://docs.amcharts.com/embeds/v5/partition-chart/)

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
  am5hierarchy.Partition.new(root, {
    downDepth: 1,
    upDepth: 0,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);

series.labels.template.setAll({
  text: "{category}: [bold]{sum}[/]",
  fontSize: 14
});
```
