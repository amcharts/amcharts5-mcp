---
title: "Chord directed diagram"
source: "https://docs.amcharts.com/embeds/v5/chord-directed-diagram/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/flow-charts/chord-diagram"]
---

A demo from the docs page "Chord diagram" (get_doc(path: "charts/flow-charts/chord-diagram")).

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
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    linkHeadRadius: 10,
    nodeWidth: 10,
    radius: am5.percent(75)
  })
);

series.nodes.get("colors").set("step", 2);

// Set data
series.data.setAll([
  { from: "A", to: "B", value: 10 },
  { from: "B", to: "C", value: 8 },
  { from: "C", to: "D", value: 4 },
  { from: "C", to: "E", value: 3 },
  { from: "D", to: "G", value: 5 },
  { from: "D", to: "I", value: 2 },
  { from: "D", to: "H", value: 3 },
  { from: "E", to: "H", value: 6 },
  { from: "G", to: "J", value: 5 },
  { from: "I", to: "J", value: 1 },
  { from: "H", to: "J", value: 9 }
]);

series.nodes.labels.template.setAll({
  text: "[bold]{name}[/] ({sumOutgoing})",
  textType: "radial",
  radius: 30
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
