---
title: "Directed Chord Diagram"
source: "https://www.amcharts.com/demos/toggleable-chord-diagram/"
category: "flow"
scraped: "2026-10-08"
---

A directed chord diagram: every ribbon runs from one person to another and takes the color of the one it starts from. Here, the six Friends characters and everyone linked to them.

When direction matters: A plain chord diagram shows that two things are connected; a directed one also shows which way. Each ribbon leaves its source as wide as its value, and switching people off shows how the rest of the network holds together without them.

Good for:
- Migration between countries or regions
- Trade, money or messages that flow one way
- Networks with a few big players and many small ones

Think twice when:
- Dozens of tiny nodes: their names crowd the ring
- Exact values: ribbon widths are hard to measure, add a table
- Flows through several stages: use a Sankey diagram

Prompt: Create a directed chord diagram of the connections between the six friends of the TV show Friends and the people linked to them. Clicking a node switches its ribbons off and on, and dragging a node turns the ring. Use the Animated and Responsive themes and the amCharts 5 library.

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
// https://www.amcharts.com/docs/v5/charts/flow-charts/
// a click on a name switches that person's links off and on again (the nodes' default toggle)
var series = chart.series.push(am5flow.ChordDirected.new(root, {
  startAngle: 80, // the first name starts at 80 degrees (0 is 3 o'clock), near the bottom
  padAngle: 1,    // a 1-degree gap between neighboring names
  // a smaller circle leaves room for the names around it
  radius: am5.percent(72),
  // no arrowheads at the ends of the links
  linkHeadRadius: undefined,
  // every name gets at least 1% of the ring, so the many small ones spread out instead of printing over each other
  minSize: 0.01,
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value"
}));

// names point outward from the circle instead of following its curve
series.nodes.labels.template.setAll({
  textType: "radial",
  centerX: 0, // each name starts at the circle and runs outward
  fontSize: 9 // small, so the many names fit around the circle
});

// each link takes the color of the person it starts from
series.links.template.set("fillStyle", "source");

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { "from": "Monica", "to": "Rachel", "value": 4 },
  { "from": "Monica", "to": "Chandler", "value": 113 },
  { "from": "Monica", "to": "Ross", "value": 16 },
  { "from": "Monica", "to": "Joey", "value": 9 },
  { "from": "Monica", "to": "Phoebe", "value": 3 },
  { "from": "Monica", "to": "Paul the wine guy", "value": 1 },
  { "from": "Monica", "to": "Mr Geller", "value": 6 },
  { "from": "Monica", "to": "Mrs Geller", "value": 5 },
  { "from": "Monica", "to": "Aunt Lilian", "value": 1 },
  { "from": "Monica", "to": "Nana", "value": 1 },
  { "from": "Monica", "to": "Young Ethan", "value": 5 },
  { "from": "Monica", "to": "Ben", "value": 3 },
  { "from": "Monica", "to": "Fun Bobby", "value": 3 },
  { "from": "Monica", "to": "Richard", "value": 16 },
  { "from": "Monica", "to": "Mrs Green", "value": 1 },
  { "from": "Monica", "to": "Paolo", "value": 1 },
  { "from": "Monica", "to": "Pete", "value": 10 },
  { "from": "Monica", "to": "Chip", "value": 1 },
  { "from": "Monica", "to": "Timothy (Burke)", "value": 1 },
  { "from": "Monica", "to": "Emily", "value": 1 },
  { "from": "Monica", "to": "Dr. Roger", "value": 3 },
  { "from": "Rachel", "to": "Chandler", "value": 7 },
  { "from": "Rachel", "to": "Ross", "value": 80 },
  { "from": "Rachel", "to": "Joey", "value": 30 },
  { "from": "Rachel", "to": "Phoebe", "value": 6 },
  { "from": "Rachel", "to": "Paolo", "value": 5 },
  { "from": "Rachel", "to": "Mr Geller", "value": 2 },
  { "from": "Rachel", "to": "Mrs Geller", "value": 1 },
  { "from": "Rachel", "to": "Barry", "value": 1 },
  { "from": "Rachel", "to": "Dr Green", "value": 3 },
  { "from": "Rachel", "to": "Mark", "value": 1 },
  { "from": "Rachel", "to": "Josh", "value": 2 },
  { "from": "Rachel", "to": "Gunther", "value": 1 },
  { "from": "Rachel", "to": "Joshua", "value": 3 },
  { "from": "Rachel", "to": "Danny", "value": 1 },
  { "from": "Rachel", "to": "Mr. Zelner", "value": 1 },
  { "from": "Rachel", "to": "Paul Stevens", "value": 3 },
  { "from": "Rachel", "to": "Tag", "value": 4 },
  { "from": "Rachel", "to": "Melissa", "value": 1 },
  { "from": "Rachel", "to": "Gavin", "value": 2 },
  { "from": "Chandler", "to": "Joey", "value": 1 },
  { "from": "Chandler", "to": "Phoebe", "value": 7 },
  { "from": "Chandler", "to": "Aurora", "value": 2 },
  { "from": "Chandler", "to": "Jill Goodacre", "value": 1 },
  { "from": "Chandler", "to": "Janice", "value": 11 },
  { "from": "Chandler", "to": "Mrs Bing", "value": 3 },
  { "from": "Chandler", "to": "Nina", "value": 1 },
  { "from": "Chandler", "to": "Susie", "value": 5 },
  { "from": "Chandler", "to": "Mary Theresa", "value": 1 },
  { "from": "Chandler", "to": "Ginger", "value": 2 },
  { "from": "Chandler", "to": "Joanna", "value": 5 },
  { "from": "Chandler", "to": "Kathy", "value": 7 },
  { "from": "Chandler", "to": "Mr Bing", "value": 1 },
  { "from": "Ross", "to": "Joey", "value": 3 },
  { "from": "Ross", "to": "Phoebe", "value": 18 },
  { "from": "Ross", "to": "Carol", "value": 10 },
  { "from": "Ross", "to": "Mrs Geller", "value": 8 },
  { "from": "Ross", "to": "Aunt Lilian", "value": 1 },
  { "from": "Ross", "to": "Mrs Bing", "value": 3 },
  { "from": "Ross", "to": "Celia", "value": 2 },
  { "from": "Ross", "to": "Julie", "value": 6 },
  { "from": "Ross", "to": "Ben", "value": 6 },
  { "from": "Ross", "to": "Mrs Green", "value": 2 },
  { "from": "Ross", "to": "Chloe", "value": 1 },
  { "from": "Ross", "to": "Bonnie", "value": 4 },
  { "from": "Ross", "to": "Messy Girl (Cheryl)", "value": 5 },
  { "from": "Ross", "to": "Emily", "value": 12 },
  { "from": "Ross", "to": "Jill", "value": 1 },
  { "from": "Ross", "to": "Elizabeth", "value": 8 },
  { "from": "Ross", "to": "Aunt Millie", "value": 2 },
  { "from": "Ross", "to": "Mona", "value": 11 },
  { "from": "Ross", "to": "Emma", "value": 7 },
  { "from": "Ross", "to": "Charlie", "value": 10 },
  { "from": "Joey", "to": "Phoebe", "value": 6 },
  { "from": "Joey", "to": "Janice", "value": 1 },
  { "from": "Joey", "to": "Lorraine", "value": 2 },
  { "from": "Joey", "to": "Melanie", "value": 2 },
  { "from": "Joey", "to": "Erica", "value": 2 },
  { "from": "Joey", "to": "Mrs Green", "value": 1 },
  { "from": "Joey", "to": "Kate", "value": 4 },
  { "from": "Joey", "to": "Lauren", "value": 2 },
  { "from": "Joey", "to": "Estelle", "value": 1 },
  { "from": "Joey", "to": "Kathy", "value": 2 },
  { "from": "Joey", "to": "Emily", "value": 4 },
  { "from": "Joey", "to": "Katie", "value": 2 },
  { "from": "Joey", "to": "Janine", "value": 9 },
  { "from": "Joey", "to": "Erin", "value": 1 },
  { "from": "Joey", "to": "Cecilia", "value": 3 },
  { "from": "Joey", "to": "Charlie", "value": 3 },
  { "from": "Phoebe", "to": "David", "value": 14 },
  { "from": "Phoebe", "to": "Roger", "value": 1 },
  { "from": "Phoebe", "to": "Duncan", "value": 1 },
  { "from": "Phoebe", "to": "Rob Dohnen", "value": 2 },
  { "from": "Phoebe", "to": "Ryan", "value": 5 },
  { "from": "Phoebe", "to": "Malcom", "value": 1 },
  { "from": "Phoebe", "to": "Robert", "value": 1 },
  { "from": "Phoebe", "to": "Sergei", "value": 1 },
  { "from": "Phoebe", "to": "Vince", "value": 2 },
  { "from": "Phoebe", "to": "Jason", "value": 1 },
  { "from": "Phoebe", "to": "Rick", "value": 2 },
  { "from": "Phoebe", "to": "Gunther", "value": 1 },
  { "from": "Phoebe", "to": "Gary", "value": 7 },
  { "from": "Phoebe", "to": "Jake", "value": 2 },
  { "from": "Phoebe", "to": "Eric", "value": 3 },
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
