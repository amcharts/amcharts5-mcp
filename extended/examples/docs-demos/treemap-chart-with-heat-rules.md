---
title: "Treemap chart with heat rules"
source: "https://docs.amcharts.com/embeds/v5/treemap-chart-with-heat-rules/"
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

// Data
var data = {
  name: "Root",
  children: [
    {
      name: "First",
      value: 100,
      heatValue: 200
    },
    {
      name: "Second",
      value: 220,
      heatValue: 100
    },
    {
      name: "Third",
      value: 80,
      heatValue: 150
    },
    {
      name: "Fourth",
      value: 120,
      heatValue: 120
    },
    {
      name: "Fifth",
      value: 190,
      heatValue: 50
    }
  ]
};

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
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0
  })
);

// Calculate min and max values in data
series.events.on("datavalidated", function () {
  var min = Infinity;
  var max = 0;
  series.nodes.each(function (node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", [
    {
      target: series.rectangles.template,
      dataField: "customValue",
      min: am5.color(0xf53d3d),
      max: am5.color(0x0056f5),
      minValue: min,
      maxValue: max,
      key: "fill"
    }
  ]);
});

series.rectangles.template.setAll({
  strokeWidth: 2
});

// Set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
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
