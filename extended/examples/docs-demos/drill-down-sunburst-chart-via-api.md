---
title: "Drill-Down Sunburst Chart via API"
source: "https://docs.amcharts.com/embeds/v5/drill-down-sunburst-chart-via-api/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/hierarchy/hierarchy-drill-down"]
---

A demo from the docs page "Hierarchy drill-down" (get_doc(path: "charts/hierarchy/hierarchy-drill-down")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = container.children.push(
  am5hierarchy.Sunburst.new(root, {
    singleBranchOnly: true,
    downDepth: 10,
    initialDepth: 10,
    topDepth: 1,
    innerRadius: am5.percent(30),
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.data.setAll([
  {
    name: "root",
    children: [
      {
        name: "First",
        children: [
          { name: "A1", value: 100 },
          { name: "A2", value: 60 }
        ]
      },

      {
        name: "Second",
        children: [
          { name: "B1", value: 135 },
          { name: "B2", value: 98 }
        ]
      },

      {
        name: "Third",
        children: [
          {
            name: "C1",
            children: [
              { name: "EE1", value: 130 },
              { name: "EE2", value: 87 },
              { name: "EE3", value: 55 }
            ]
          },

          { name: "C2", value: 148 },
          {
            name: "C3",
            children: [
              { name: "CC1", value: 53 },
              { name: "CC2", value: 30 }
            ]
          },

          { name: "C4", value: 26 }
        ]
      },

      {
        name: "Fourth",
        children: [
          { name: "D1", value: 415 },
          { name: "D2", value: 148 },
          { name: "D3", value: 89 }
        ]
      },

      {
        name: "Fifth",
        children: [
          {
            name: "E1",
            children: [
              { name: "EE1", value: 33 },
              { name: "EE2", value: 40 },
              { name: "EE3", value: 89 }
            ]
          },

          {
            name: "E2",
            value: 148
          }
        ]
      }
    ]
  }
]);

series.selectDataItem(series.dataItems[0]);

// Make stuff animate on load
series.appear(1000, 100);

function drillTo(name) {
  series.nodes.each(function (node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

## HTML

```html
<div id="chartdiv"></div>
<input type="button" value="Drill down to C1" onclick="drillTo('C1')" />
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
