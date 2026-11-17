---
title: "Alignment of nodes on Sankey diagram"
source: "https://docs.amcharts.com/embeds/v5/alignment-of-nodes-on-sankey-diagram/"
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

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create series
var series = root.container.children.push(
  am5flow.Sankey.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    paddingRight: 20,
    nodeAlign: "justify"
  })
);

series.nodes.get("colors").set("step", 2);

// Set data
series.data.setAll([
  { from: "A", to: "B", value: 10 },
  { from: "B", to: "C", value: 10 },
  { from: "E", to: "D", value: 10 },
  { from: "D", to: "F", value: 10 },
  { from: "F", to: "B", value: 10 },
  { from: "F", to: "G", value: 10 },
  { from: "G", to: "H", value: 10 },
  { from: "I", to: "F", value: 10 },
  { from: "J", to: "H", value: 10 },
  { from: "H", to: "O", value: 10 }
]);
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
