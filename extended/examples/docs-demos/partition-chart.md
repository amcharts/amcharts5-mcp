---
title: "Partition chart"
source: "https://docs.amcharts.com/embeds/v5/partition-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/partition"]
---

A demo from the docs page "Partition" (get_doc(path: "charts/hierarchy/partition")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
