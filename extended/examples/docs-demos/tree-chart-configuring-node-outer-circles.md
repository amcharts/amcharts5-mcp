---
title: "Tree chart: configuring node outer circles"
source: "https://docs.amcharts.com/embeds/v5/tree-chart-configuring-node-outer-circles/"
category: "docs-demos"
scraped: "2026-11-25"
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
    initialDepth: 1,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.outerCircles.template.states.create("disabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});

series.outerCircles.template.states.create("hoverDisabled", {
  fillOpacity: 0.5,
  strokeOpacity: 0,
  strokeDasharray: 0
});

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
