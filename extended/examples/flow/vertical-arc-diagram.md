---
title: "Vertical Arc Diagram"
source: "https://www.amcharts.com/demos/vertical-arc-diagram/"
category: "flow"
scraped: "2026-10-08"
---

An arc diagram standing up: the nodes in a column with their names beside them, the arcs bulging out to the right. Here, 23 links between the friends of the TV show Friends and people around them, with dots running along each arc.

When to stand an arc diagram up: A vertical arc diagram leaves room for long names, written straight beside the nodes instead of tilted under them. It suits ordered lists where the links between items matter, like a ranking or a timeline read from top to bottom.

Good for:
- Long names that would need tilting in a row
- Ordered lists: rankings, timelines, chapters
- Narrow spaces beside text

Think twice when:
- Many nodes: the column grows taller than the screen
- Links with amounts people must compare
- Dense networks: try a chord diagram

Prompt: Create a vertical arc diagram of the connections between the six friends of the TV show Friends and people around them, with the nodes in a column, sized by their totals, and the arcs to one side. Small dots travel along every arc in endless loops. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create a container for the series
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/
var series = chart.series.push(am5flow.ArcDiagram.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  orientation: "vertical" // nodes in a column, arcs curving out to the side
}));

// Put the column of nodes in the middle: names to the left of it, arcs to the right
series.nodes.setAll({
  x: am5.p50,
  centerX: am5.p100 // the nodes' right edge at the middle; the arcs get the right half
});

// Configure labels
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/#Labels
series.nodes.labels.template.setAll({
  fontSize: "0.85em", // 85% of the chart's text size
  paddingLeft: 20,    // 20px of room on both sides of each name
  paddingRight: 20,
  width: 160 // every name gets the same 160px of width
});

// Arcs take the color of the node they start from
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/#Color_mode
series.links.template.setAll({
  strokeStyle: "source",
  strokeOpacity: 0.4 // see-through, so crossing arcs show
});

// Animated bullets
series.bullets.push(function(_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(), // each dot starts at a random point on its arc
    sprite: am5.Circle.new(root, {
      radius: 2, // a small dot, 4px across
      fill: dataItem.get("source").get("fill") // in the color of the node the arc starts from
    })
  });

  // each dot runs along its arc from start to end every 2 to 3 seconds, over and over
  bullet.animate({
    key: "locationY",
    to: 1,
    from: 0,
    duration: Math.random() * 1000 + 2000,
    loops: Infinity
  });

  return bullet;
});

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { "from": "Monica", "to": "Rachel", "value": 4 },
  { "from": "Monica", "to": "Chandler", "value": 63 },
  { "from": "Monica", "to": "Ross", "value": 16 },
  { "from": "Monica", "to": "Joey", "value": 9 },
  { "from": "Rachel", "to": "Chandler", "value": 7 },
  { "from": "Rachel", "to": "Ross", "value": 80 },
  { "from": "Rachel", "to": "Joey", "value": 30 },
  { "from": "Rachel", "to": "Phoebe", "value": 6 },
  { "from": "Chandler", "to": "Phoebe", "value": 7 },
  { "from": "Chandler", "to": "Janice", "value": 11 },
  { "from": "Chandler", "to": "Joanna", "value": 5 },
  { "from": "Chandler", "to": "Kathy", "value": 7 },
  { "from": "Monica", "to": "Pete", "value": 10 },
  { "from": "Ross", "to": "Joey", "value": 3 },
  { "from": "Ross", "to": "Phoebe", "value": 18 },
  { "from": "Ross", "to": "Carol", "value": 10 },
  { "from": "Ross", "to": "Mrs Geller", "value": 8 },
  { "from": "Ross", "to": "Emily", "value": 12 },
  { "from": "Ross", "to": "Elizabeth", "value": 8 },
  { "from": "Ross", "to": "Mona", "value": 11 },
  { "from": "Joey", "to": "Phoebe", "value": 6 },
  { "from": "Phoebe", "to": "David", "value": 14 },
  { "from": "Phoebe", "to": "Mike", "value": 18 }
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
