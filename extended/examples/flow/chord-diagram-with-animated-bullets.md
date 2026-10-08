---
title: "Chord Diagram with Animated Bullets"
source: "https://www.amcharts.com/demos/chord-diagram-with-animated-bullets/"
category: "flow"
scraped: "2026-10-08"
---

A directed chord diagram with dots that keep running along the ribbons, so the direction of every flow is plain to see. Here, six nodes and nine flows.

When motion shows direction: In a chord diagram, direction is easy to miss: a ribbon looks the same from both ends. Moving dots fix that without arrows or a legend, and they draw the eye to a chart on a landing page or a big screen.

Good for:
- Flows with a clear direction, like migration or payments
- Dashboards on wall screens
- Landing pages that need a living chart

Think twice when:
- Printed reports and screenshots: the motion is lost
- Many ribbons: the dots turn into noise
- Readers who find motion distracting: offer a still version

Prompt: Create a directed chord diagram of six nodes joined by nine weighted, one-way links, with each node drawn as a circle with its letter inside. Small dots travel along every ribbon from source to target in endless loops. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {})); // holds the chord diagram

var series = chart.series.push(
  am5flow.ChordDirected.new(root, {
    sourceIdField: "from",
    targetIdField: "to",
    valueField: "value",
    sort: "ascending" // the nodes go round from the smallest total to the largest
  })
);

// each link takes the color of the node it comes from
series.links.template.set("fillStyle", "source");

series.nodes.get("colors").set("step", 2); // skip every other color, so neighboring nodes differ more
series.nodes.data.setAll([
  { id: "A" },
  { id: "B" },
  { id: "C" },
  { id: "D" },
  { id: "E" },
  { id: "F" }
]);


// a dot on each link travels from source to target, over and over, at its own speed
series.bullets.push(function (_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,                               // a 5px dot...
      fill: dataItem.get("source").get("fill") // ...in the source node's color
    })
  });

  bullet.animate({
    key: "locationY",
    to: 1, // from the source end...
    from: 0, // ...to the target end
    duration: Math.random() * 1000 + 2000, // 2 to 3 seconds per trip
    loops: Infinity // over and over
  });

  return bullet;
});

series.nodes.labels.template.setAll({
  textType: "regular", // plain horizontal labels
  fill: root.interfaceColors.get("background"), // in the background color, over the node's circle
  fontSize: "1.1em", // a little bigger than the chart's text
  radius: -5 // 5px in from the ring
});

// a big circle on each node, behind its label
series.nodes.bullets.push(function (_root, _series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 20,                // a 20px radius
      fill: dataItem.get("fill") // in the node's color
    })
  });
});

// move the bullets to the bottom layer, under the links and the node labels
series.children.moveValue(series.bulletsContainer, 0);

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "C", value: 8 },
  { from: "B", to: "D", value: 4 },
  { from: "B", to: "E", value: 2 },
  { from: "C", to: "A", value: 14 },
  { from: "C", to: "E", value: 4 },
  { from: "E", to: "D", value: 8 },
  { from: "F", to: "A", value: 7 },
  { from: "D", to: "B", value: 2 }
]);

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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
