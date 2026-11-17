---
title: "Force-directed chart with strength configuration"
source: "https://docs.amcharts.com/embeds/v5/force-directed-chart-with-strength-configuration/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/force-directed"]
---

A demo from the docs page "Force-directed" (get_doc(path: "charts/hierarchy/force-directed")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
