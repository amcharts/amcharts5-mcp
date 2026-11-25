---
title: "Non-Ribbon Chord Diagram"
source: "https://www.amcharts.com/demos/non-ribbon-chord-diagram/"
category: "flow"
scraped: "2026-11-25"
---

A chord diagram with thin lines instead of wide ribbons: it shows which nodes are connected rather than how much flows between them. Dots travel back and forth along each line.

When lines beat ribbons: Ribbons are good at showing size, but they cover each other when there are many. Thin lines keep every connection in view, so the shape of the network comes through: who links to many, and who to few.

Good for:
- Networks where the links matter more than their size
- Dependencies between modules or services
- Small social networks

Think twice when:
- When the amounts matter: use ribbons
- Hundreds of links: try a force-directed network
- Readers who need to follow one line across the circle

Prompt: Create a non-ribbon chord diagram, with thin curved lines instead of ribbons, of six nodes joined by eight weighted links, each node drawn as a circle with its letter inside. Small dots travel back and forth along every line in endless loops. Use the Animated and ResponsiveMax themes and the amCharts 5 library.

The demo's page on amcharts.com adds controls that are not part of this code: Line type, Line dash, Ring width, Gap between arcs.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// Create series
// https://docs.amcharts.com/v5/charts/flow-charts/
// a chart whose contents can be zoomed and panned
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

// a chord diagram with thin links instead of ribbons
var series = chart.series.push(am5flow.ChordNonRibbon.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value"
}));

series.nodes.get("colors").set("step", 2); // every second theme color for the nodes

// a dot on each link runs back and forth between its two nodes, each at its own speed
series.bullets.push(function (_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(), // each dot starts somewhere along its link
    sprite: am5.Circle.new(root, {
      radius: 5, // 5px radius
      fill: dataItem.get("source").get("fill") // in the color of the link's source node
    })
  });

  bullet.animate({
    key: "locationY", // moves along the link...
    to: 1, // ...to the target end...
    from: 0, // ...from the source end...
    duration: Math.random() * 1000 + 2000, // ...in 2 to 3 seconds...
    loops: Infinity, // ...forever...
    easing: am5.ease.yoyo(am5.ease.cubic) // ...there and back, slowing at each end
  });

  return bullet;
});

// straight (not curved) names in the background color, set on the node circles
series.nodes.labels.template.setAll({
  textType: "regular",
  fill: root.interfaceColors.get("background"),
  fontSize: "1.1em", // a little larger than normal text
  radius: -5         // pulled 5px in, onto the node circles
});

// a big circle on each node, in the node's color
series.nodes.bullets.push(function (_root, _series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 20,                // 20px radius
      fill: dataItem.get("fill") // the node's color
    })
  });
});

// move the bullets container to the back, behind the links and nodes
series.children.moveValue(series.bulletsContainer, 0);

// Set data
// https://docs.amcharts.com/v5/charts/flow-charts/#setting-data
series.data.setAll([
  { from: "A", to: "D", value: 10 },
  { from: "B", to: "D", value: 8 },
  { from: "B", to: "E", value: 4 },
  { from: "B", to: "C", value: 2 },
  { from: "C", to: "E", value: 14 },
  { from: "E", to: "D", value: 8 },
  { from: "C", to: "A", value: 4 },
  { from: "G", to: "A", value: 7 }
]);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the chart, and a screen reader names it
  ariaLabel: "Chord diagram of seven nodes, A to G, joined by thin lines that show which are connected. Tab to the nodes or the links, then move through them with the up and down arrow keys; Enter on a node hides or shows its links"
});
// the nodes: one Tab stop (a focusable group), the arrow keys step through them; Enter hides or shows a node's
// links, as a click does
series.nodes.nodes.template.setAll({
  focusable: true,
  role: "button",
  focusableGroup: "nodes",
  ariaLabel: "{name}: {sum} in all"
});
// the links between them: one Tab stop too, after the nodes
series.links.template.setAll({
  focusable: true,
  focusableGroup: "links",
  tabindexOrder: 5,   // after the nodes
  hoverOnFocus: true, // a focused link shows its tooltip
  ariaLabel: "{sourceId} to {targetId}: {value}"
});

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
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
