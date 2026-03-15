---
title: "Vertical Arc Diagram"
source: "https://www.amcharts.com/demos/vertical-arc-diagram/"
category: "flow"
scraped: "2026-03-15"
---

An arc diagram is a powerful visual representation that depicts relationships and connections between entities. It employs curved lines or arcs to illustrate these connections. Arc diagrams are extensively used in various fields, such as network analysis, biology, and information visualization. By presenting complex relationships in a simplified and intuitive manner, arc diagrams enable researchers and analysts to identify patterns, explore interdependencies, and gain valuable insights from the data at hand.
Flow charts
Arc Diagram

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


// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/
var series = root.container.children.push(am5flow.ArcDiagram.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  orientation: "vertical"
}));

// Configure labels
// https://www.amcharts.com/docs/v5/charts/flow-charts/arc-diagram/#Labels
series.nodes.labels.template.setAll({
  fontSize: "0.85em",
  paddingLeft: 20,
  paddingRight: 20,
  width: 160
});


// Animated bullets
series.bullets.push(function(_root, _series, dataItem) {
  var bullet = am5.Bullet.new(root, {
    locationY: Math.random(),
    sprite: am5.Circle.new(root, {
      radius: 2,
      fill: dataItem.get("source").get("fill")
    })
  });

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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/flow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
