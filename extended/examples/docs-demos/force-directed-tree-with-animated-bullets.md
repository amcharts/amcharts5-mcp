---
title: "Force-Directed Tree with animated bullets"
source: "https://docs.amcharts.com/embeds/v5/force-directed-tree-with-animated-bullets/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/hierarchy-link-bullets"]
---

A demo from the docs page "Hierarchy link bullets" (get_doc(path: "charts/hierarchy/hierarchy-link-bullets")).

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
  am5hierarchy.ForceDirected.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 10,
    nodePadding: 20,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

series.linkBullets.push(function (root, source, target) {
  const bullet = am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
      fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function (display) {
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(3, 0);
        display.lineTo(0, -6);
      }
    })
  });

  bullet.animate({
    key: "locationX",
    to: -0.1,
    from: 1.1,
    duration: Math.random() * 500 + 1000,
    loops: Infinity,
    easing: am5.ease.quad
  });

  return bullet;
});

series.labels.template.set("minScale", 0);

// Generate and set data
// https://docs.amcharts.com/v5/charts/hierarchy/#setting-data
var maxLevels = 1;
var maxNodes = 3;
var maxValue = 100;

var data = {
  name: "Root",
  children: []
};

generateLevel(data, "", 0);

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

function generateLevel(data, name, level) {
  for (var i = 0; i < Math.ceil(maxNodes * Math.random()) + 1; i++) {
    var nodeName = name + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
    var child;
    if (level < maxLevels) {
      child = {
        name: nodeName + level
      };

      if (level > 0 && Math.random() < 0.5) {
        child.value = Math.round(Math.random() * maxValue);
      } else {
        child.children = [];
        generateLevel(child, nodeName + i, level + 1);
      }
    } else {
      child = {
        name: name + i,
        value: Math.round(Math.random() * maxValue)
      };
    }
    data.children.push(child);
  }

  level++;
  return data;
}

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
  height: 94vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
