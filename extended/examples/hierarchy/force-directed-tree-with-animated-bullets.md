---
title: "Force-Directed Tree with Animated Bullets"
source: "https://www.amcharts.com/demos/force-directed-tree-with-animated-bullets/"
category: "hierarchy"
scraped: "2026-03-15"
---

A force-directed chart is a visual tool used to depict networks by simulating physical forces on nodes (entities) and edges (connections) between them. Nodes repel each other while edges act like springs, pulling connected nodes closer. This simulation arranges the nodes in a layout that intuitively displays clusters and connections, simplifying the understanding of complex relationships.
This demo features animated bullets, added to node links.
Force-Directed Tree
Hierarchy link bullets

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: true,
    pinchZoom: true
  })
);

var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
  target: zoomableContainer
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
  singleBranchOnly: false,
  downDepth: 1,
  initialDepth: 10,
  nodePadding: 20,
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

series.linkBullets.push(function(root, source, target) {
  const bullet = am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
      fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function(display) {
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
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
var maxLevels = 1;
var maxNodes = 3;
var maxValue = 100;

var data = {
  name: "Root",
  children: []
}
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
      }

      if (level > 0 && Math.random() < 0.5) {
        child.value = Math.round(Math.random() * maxValue);
      }
      else {
        child.children = [];
        generateLevel(child, nodeName + i, level + 1)
      }
    }
    else {
      child = {
        name: name + i,
        value: Math.round(Math.random() * maxValue)
      }
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
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
