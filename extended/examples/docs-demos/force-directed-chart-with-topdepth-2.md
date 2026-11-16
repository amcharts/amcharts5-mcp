---
title: "Force-directed chart with topDepth"
source: "https://docs.amcharts.com/embeds/v5/force-directed-chart-with-topdepth-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/hierarchy-node-colors"]
---

A demo from the docs page "Hierarchy node colors" (get_doc(path: "charts/hierarchy/hierarchy-node-colors")).

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

series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll([
  {
    name: "Root",
    value: 0,
    children: [
      {
        name: "A",
        value: 89,
        nodeSettings: {
          fill: am5.color(0x297373)
        }
      },

      {
        name: "B",
        value: 55,
        nodeSettings: {
          fill: am5.color(0x946b49)
        }
      },

      {
        name: "C",
        value: 66,
        nodeSettings: {
          fill: am5.color(0xff621f)
        }
      }
    ]
  }
]);

series.set("selectedDataItem", series.dataItems[0]);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
