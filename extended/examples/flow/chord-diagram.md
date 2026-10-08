---
title: "Chord Diagram"
source: "https://www.amcharts.com/demos/chord-diagram/"
category: "flow"
scraped: "2026-10-08"
---

A chord diagram puts the items around a circle and joins them with ribbons, each as wide as the flow between them. Here, five European cities and the flows between every pair, which are rarely the same both ways.

When a chord diagram works: A chord diagram shows who exchanges how much with whom, when every item can both send and receive. The ring shows each item’s total and the ribbons the pairs that matter most. Five to fifteen items read well.

Good for:
- Trade or migration between countries
- Traffic between parts of a city or a website
- Who works with whom across teams

Think twice when:
- Flows with a start and an end, like a budget: use a Sankey diagram
- More than 20 or so items: the ring gets crowded
- Exact numbers: a table or a heat map reads more precisely

Prompt: Create a chord diagram of the flows between five European cities, with a link for every pair in each direction and values that differ by direction. Clicking a city switches its ribbons off and on, and dragging a city turns the ring. Use the Animated and Responsive themes and the amCharts 5 library.

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

// Create series
// https://www.amcharts.com/docs/v5/charts/flow-charts/
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {})); // holds the chord diagram

var series = chart.series.push(am5flow.Chord.new(root, { // ribbons between the cities, as wide as their values
  sourceIdField: "source",
  targetIdField: "target",
  valueField: "value"
}));
// skip every other color of the set, so neighboring cities differ more
series.nodes.get("colors").set("step", 2);

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  { source: "Berlin", target: "Amsterdam", value: 14 },
  { source: "Berlin", target: "London", value: 33 },
  { source: "Berlin", target: "Paris", value: 13 },
  { source: "Berlin", target: "Madrid", value: 36 },

  { source: "Amsterdam", target: "Berlin", value: 42 },
  { source: "Amsterdam", target: "London", value: 20 },
  { source: "Amsterdam", target: "Paris", value: 19 },
  { source: "Amsterdam", target: "Madrid", value: 11 },

  { source: "London", target: "Amsterdam", value: 9 },
  { source: "London", target: "Berlin", value: 38 },
  { source: "London", target: "Paris", value: 41 },
  { source: "London", target: "Madrid", value: 16 },

  { source: "Paris", target: "Amsterdam", value: 12 },
  { source: "Paris", target: "London", value: 16 },
  { source: "Paris", target: "Berlin", value: 21 },
  { source: "Paris", target: "Madrid", value: 8 },

  { source: "Madrid", target: "Amsterdam", value: 22 },
  { source: "Madrid", target: "London", value: 25 },
  { source: "Madrid", target: "Paris", value: 19 },
  { source: "Madrid", target: "Berlin", value: 7 }
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
