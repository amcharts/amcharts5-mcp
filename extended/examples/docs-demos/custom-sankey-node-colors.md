---
title: "Custom Sankey node colors"
source: "https://docs.amcharts.com/embeds/v5/custom-sankey-node-colors/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/flow-charts/sankey-diagram"]
---

A demo from the docs page "Sankey diagram" (get_doc(path: "charts/flow-charts/sankey-diagram")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create series
// https://docs.amcharts.com/v5/charts/flow-charts/
var series = root.container.children.push(
  am5flow.Sankey.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    paddingRight: 60
  })
);

series.nodes.setAll({
  nameField: "name"
});

series.nodes.rectangles.template.set("templateField", "nodeSettings");
series.links.template.set("templateField", "linkSettings");

series.nodes.data.setAll([
  { id: "A", name: "Node A", fill: am5.color(0xff621f) },
  { id: "B", name: "Node B", fill: am5.color(0x297373) },
  { id: "C", name: "Node C", fill: am5.color(0xff621f) },
  { id: "D", name: "Node D", fill: am5.color(0x946b49) },
  { id: "E", name: "Node E", fill: am5.color(0x297373) },
  { id: "G", name: "Node G", fill: am5.color(0xff621f) },
  { id: "H", name: "Node H", fill: am5.color(0x297373) },
  { id: "I", name: "Node I", fill: am5.color(0x946b49) },
  { id: "J", name: "Node J", fill: am5.color(0x297373) }
]);

// Set data
// https://docs.amcharts.com/v5/charts/flow-charts/#setting-data
series.data.setAll([
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "D", value: 8 },
  { from: "B", to: "E", value: 4 },
  { from: "C", to: "E", value: 3 },
  { from: "D", to: "G", value: 5 },
  { from: "D", to: "I", value: 2 },
  { from: "D", to: "H", value: 3 },
  { from: "E", to: "H", value: 6 },
  { from: "G", to: "J", value: 5 },
  { from: "I", to: "J", value: 1 },
  { from: "H", to: "J", value: 9 }
]);

// Make stuff animate on load
series.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
