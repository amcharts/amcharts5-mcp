---
title: "Treemap using adapters for rectangle fills"
source: "https://docs.amcharts.com/embeds/v5/treemap-using-adapters-for-rectangle-fills/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/hierarchy-node-colors"]
---

A demo from the docs page "Hierarchy node colors" (get_doc(path: "charts/hierarchy/hierarchy-node-colors")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: 1,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.rectangles.template.adapters.add("fill", function (fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  } else {
    return am5.color(0x50b300);
  }
});

// Set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
series.data.setAll([
  {
    name: "Root",
    children: [
      {
        name: "A",
        value: 70
      },
      {
        name: "B",
        value: 120
      },
      {
        name: "C",
        value: 49
      },
      {
        name: "D",
        value: 71
      },
      {
        name: "E",
        value: 150
      },
      {
        name: "F",
        value: 101
      }
    ]
  }
]);

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
