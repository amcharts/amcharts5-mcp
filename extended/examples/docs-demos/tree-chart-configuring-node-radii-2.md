---
title: "Tree chart: configuring node radii"
source: "https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-radii-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/tree"]
---

A demo from the docs page "Tree" (get_doc(path: "charts/hierarchy/tree")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          {
            name: "A00",
            value: 88
          },
          {
            name: "A01",
            value: 23
          },
          {
            name: "A02",
            value: 25
          }
        ]
      },

      {
        name: "B0",
        children: [
          {
            name: "B10",
            value: 62
          },
          {
            name: "B11",
            value: 4
          }
        ]
      },

      {
        name: "C0",
        children: [
          {
            name: "C20",
            value: 11
          },
          {
            name: "C21",
            value: 92
          },
          {
            name: "C22",
            value: 17
          }
        ]
      },

      {
        name: "D0",
        children: [
          {
            name: "D30",
            value: 95
          },
          {
            name: "D31",
            value: 84
          },
          {
            name: "D32",
            value: 75
          }
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
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function (target) {
  var icon = target.children.push(
    am5.Picture.new(root, {
      width: 50,
      height: 50,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "https://docs.amcharts.com/assets/star.svg"
    })
  );
};

series.data.setAll(data);
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
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
