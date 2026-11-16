---
title: "Force-directed chart with images as nodes"
source: "https://docs.amcharts.com/embeds/v5/force-directed-chart-with-images-as-nodes/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/force-directed"]
---

A demo from the docs page "Force-directed" (get_doc(path: "charts/hierarchy/force-directed")).

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
    initialDepth: 1,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    minRadius: 30
  })
);

series.labels.template.setAll({
  fill: am5.color(0x000000)
});

// Hide circles
series.circles.template.set("forceHidden", true);
series.outerCircles.template.set("forceHidden", true);

// Add an icon to node
series.nodes.template.setup = function (target) {
  var icon = target.children.push(
    am5.Picture.new(root, {
      width: 70,
      height: 70,
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "https://docs.amcharts.com/assets/star.svg"
    })
  );
};

//console.log(series.nodes)

series.data.setAll([
  {
    name: "A",
    children: [
      {
        name: "A1",
        value: 1
      },
      {
        name: "A2",
        value: 1
      },
      {
        name: "A3",
        value: 1
      },
      {
        name: "A4",
        value: 1
      },
      {
        name: "A5",
        value: 1
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
