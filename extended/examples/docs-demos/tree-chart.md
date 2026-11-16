---
title: "Tree Chart"
source: "https://docs.amcharts.com/embeds/v5/tree-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/tree"]
---

A demo from the docs page "Tree" (get_doc(path: "charts/hierarchy/tree")).

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

var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: true,
    pinchZoom: true
  })
);

var zoomTools = zoomableContainer.children.push(
  am5.ZoomTools.new(root, {
    target: zoomableContainer
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = zoomableContainer.contents.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 10,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    clustered: true
  })
);

series.labels.template.set("minScale", 0);

// Generate and set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
var maxLevels = 3;
var maxNodes = 3;
var maxValue = 100;

var data = {
  name: "Root",
  children: [
    {
      name: "A0",
      children: [
        { name: "A0A1", value: 89 },
        { name: "A0B1", value: 31 }
      ]
    },

    {
      name: "B0",
      children: [
        { name: "B1A1", value: 60 },
        { name: "B1B1", value: 16 },
        {
          name: "B1C1",
          children: [
            {
              name: "B1C2A2",
              children: [
                { name: "B1C2A00", value: 82 },
                { name: "B1C2A01", value: 89 },
                { name: "B1C2A02", value: 26 },
                { name: "B1C2A03", value: 18 }
              ]
            },

            { name: "B1C2B2", value: 4 },
            { name: "B1C2C2", value: 13 }
          ]
        }
      ]
    },

    {
      name: "C0",
      children: [
        { name: "C2A1", value: 56 },
        { name: "C2B1", value: 83 },
        { name: "C2C1", value: 35 }
      ]
    }
  ]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
