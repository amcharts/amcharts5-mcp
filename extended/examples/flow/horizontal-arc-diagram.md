---
title: "Horizontal Arc Diagram"
source: "https://www.amcharts.com/demos/horizontal-arc-diagram/"
category: "flow"
scraped: "2026-10-08"
---

An arc diagram lines the nodes up in a row and joins them with arcs, each as thick as the link. Here, the six friends of the TV show Friends in the middle, with the people linked to each of them close by.

When an arc diagram works: With the nodes on one line, an arc diagram is easy to scan, and the circles show at once who has the most links. The order matters: keep connected nodes close and the arcs stay short and readable.

Good for:
- Social networks with a few central people
- Links between chapters, songs or scenes, in order
- Small networks whose labels must stay readable

Think twice when:
- Dense networks: the arcs pile up
- Long rows of nodes: the arcs over them grow tall
- Flows with an amount and a direction: try a chord or Sankey diagram

Prompt: Create a horizontal arc diagram of the connections between the six friends of the TV show Friends and the people linked to them, ordered so the arcs stay short. Size the circles by each node’s total, and make the arcs as thick as the values. Use the Animated and Responsive themes and the amCharts 5 library.

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

// Create wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {}));

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/
var series = chart.series.push(am5flow.ArcDiagram.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  orientation: "horizontal" // the nodes in a row, the arcs above them
}));

// Configure labels
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/#Labels
series.nodes.labels.template.setAll({
  fontSize: "0.85em", // a little smaller
  // the gap between a node and its label; no gap after it, so the arcs get the height
  paddingLeft: 20,
  paddingRight: 0
});

// Selectively position/rotate labels if they fit within node circle
series.nodes.labels.template.adapters.add("x", function (x, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    if (dataItem.get("circle").get("radius") > 30) {
      target.set("centerX", am5.p50); // centered on its circle...
      target.set("rotation", 0);      // ...and level
    }
    else {
      target.set("centerX", 0);   // starting at its circle...
      target.set("rotation", 90); // ...turned to read downward
    }
  }
  return x;
});

// Order of the nodes, left to right: the six friends in the middle, the people each of them is linked to
// close by, so the arcs stay short enough to fit
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/#Node_data
series.nodes.data.setAll([
  { id: "Frank" }, { id: "Alice" },
  { id: "Mike" }, { id: "Vince" }, { id: "Sergei" }, { id: "Rob Dohnen" }, { id: "Duncan" }, { id: "Roger" }, { id: "David" },
  { id: "Janine" }, { id: "Erin" }, { id: "Cecilia" },
  { id: "Tag" }, { id: "Melissa" }, { id: "Gavin" },
  { id: "Phoebe" }, { id: "Joey" }, { id: "Rachel" }, { id: "Ross" }, { id: "Monica" }, { id: "Chandler" },
  { id: "Charlie" }, { id: "Emily" }, { id: "Carol" }, { id: "Ben" }, { id: "Susan" }, { id: "Jill" }, { id: "Elizabeth" },
  { id: "Aunt Millie" }, { id: "Mona" }, { id: "Emma" },
  { id: "Mrs Geller" }, { id: "Mr Geller" }, { id: "Paul the wine guy" }, { id: "Pete" }, { id: "Chip" },
  { id: "Timothy (Burke)" }, { id: "Dr. Roger" },
  { id: "Janice" }, { id: "Joanna" }, { id: "Kathy" }, { id: "Mr Bing" }
]);

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { "from": "Monica", "to": "Rachel", "value": 4 },
  { "from": "Monica", "to": "Chandler", "value": 63 },
  { "from": "Monica", "to": "Ross", "value": 16 },
  { "from": "Monica", "to": "Joey", "value": 9 },
  { "from": "Monica", "to": "Phoebe", "value": 3 },
  { "from": "Monica", "to": "Paul the wine guy", "value": 1 },
  { "from": "Monica", "to": "Mr Geller", "value": 6 },
  { "from": "Monica", "to": "Mrs Geller", "value": 5 },
  { "from": "Monica", "to": "Pete", "value": 10 },
  { "from": "Monica", "to": "Chip", "value": 1 },
  { "from": "Monica", "to": "Timothy (Burke)", "value": 1 },
  { "from": "Monica", "to": "Emily", "value": 1 },
  { "from": "Monica", "to": "Dr. Roger", "value": 3 },
  { "from": "Rachel", "to": "Chandler", "value": 7 },
  { "from": "Rachel", "to": "Ross", "value": 80 },
  { "from": "Rachel", "to": "Joey", "value": 30 },
  { "from": "Rachel", "to": "Phoebe", "value": 6 },
  { "from": "Rachel", "to": "Tag", "value": 4 },
  { "from": "Rachel", "to": "Melissa", "value": 1 },
  { "from": "Rachel", "to": "Gavin", "value": 2 },
  { "from": "Chandler", "to": "Joey", "value": 1 },
  { "from": "Chandler", "to": "Phoebe", "value": 7 },
  { "from": "Chandler", "to": "Janice", "value": 11 },
  { "from": "Chandler", "to": "Joanna", "value": 5 },
  { "from": "Chandler", "to": "Kathy", "value": 7 },
  { "from": "Chandler", "to": "Mr Bing", "value": 1 },
  { "from": "Ross", "to": "Joey", "value": 3 },
  { "from": "Ross", "to": "Phoebe", "value": 18 },
  { "from": "Ross", "to": "Carol", "value": 10 },
  { "from": "Ross", "to": "Mrs Geller", "value": 8 },
  { "from": "Ross", "to": "Ben", "value": 6 },
  { "from": "Ross", "to": "Emily", "value": 12 },
  { "from": "Ross", "to": "Jill", "value": 1 },
  { "from": "Ross", "to": "Elizabeth", "value": 8 },
  { "from": "Ross", "to": "Aunt Millie", "value": 2 },
  { "from": "Ross", "to": "Mona", "value": 11 },
  { "from": "Ross", "to": "Emma", "value": 7 },
  { "from": "Ross", "to": "Charlie", "value": 10 },
  { "from": "Joey", "to": "Phoebe", "value": 6 },
  { "from": "Joey", "to": "Janine", "value": 9 },
  { "from": "Joey", "to": "Erin", "value": 1 },
  { "from": "Joey", "to": "Cecilia", "value": 3 },
  { "from": "Joey", "to": "Charlie", "value": 3 },
  { "from": "Phoebe", "to": "David", "value": 14 },
  { "from": "Phoebe", "to": "Roger", "value": 1 },
  { "from": "Phoebe", "to": "Duncan", "value": 1 },
  { "from": "Phoebe", "to": "Rob Dohnen", "value": 2 },
  { "from": "Phoebe", "to": "Sergei", "value": 1 },
  { "from": "Phoebe", "to": "Vince", "value": 2 },
  { "from": "Phoebe", "to": "Mike", "value": 18 },
  { "from": "Carol", "to": "Ben", "value": 1 },
  { "from": "Carol", "to": "Susan", "value": 1 },
  { "from": "Mr Geller", "to": "Mrs Geller", "value": 3 },
  { "from": "Frank", "to": "Alice", "value": 5 }
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
