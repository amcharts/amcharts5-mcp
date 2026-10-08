---
title: "Sankey Diagram"
source: "https://www.amcharts.com/demos/sankey-diagram/"
category: "flow"
scraped: "2026-10-08"
---

A Sankey diagram shows how a quantity flows from one stage to the next, each band as wide as its share. Here, an example energy budget: of every 100 units that go in, 40 end up doing useful work.

When a Sankey diagram works: A Sankey diagram follows one quantity, such as energy, money or people, through the steps it passes. Every band keeps its width from start to end, so the big flows and the losses stand out at once. It reads best with three to five stages and a couple of dozen flows.

Good for:
- Energy, water or material balances
- Budgets: where the income goes
- Customer journeys, from first visit to purchase

Think twice when:
- Flows that loop back to an earlier stage: a Sankey can’t draw cycles
- Many tiny flows: they shrink to hairlines, so group them as Other
- Change over time: use a line or area chart

Prompt: Create a Sankey diagram of an example energy budget: sources flow into electricity and fuels, then to homes, industry and transport, and end as useful energy or lost heat. Color each band with a gradient between its nodes, and let the nodes be dragged. Use the Animated and Responsive themes and the amCharts 5 library.

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
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {})); // holds the flow series

// each link is as wide as its value, and each node as tall as the flow through it
var series = chart.series.push(am5flow.Sankey.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  // room for the labels of the last column
  paddingRight: 110
}));

// take every second color of the set, so neighboring nodes differ more
series.nodes.get("colors").set("step", 2);

// Every number is a share of all the energy that goes in, so the values add up to 100
series.links.template.set("tooltipText", "{sourceId} to {targetId}: {value}%");

// Set data
// https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
series.data.setAll([
  // sources
  { from: "Wind & solar", to: "Electricity", value: 16 },
  { from: "Natural gas", to: "Electricity", value: 22 },
  { from: "Natural gas", to: "Fuels", value: 16 },
  { from: "Oil", to: "Fuels", value: 46 },

  // where electricity and fuels are used
  { from: "Electricity", to: "Homes", value: 13 },
  { from: "Electricity", to: "Industry", value: 13 },
  { from: "Fuels", to: "Homes", value: 9 },
  { from: "Fuels", to: "Industry", value: 18 },
  { from: "Fuels", to: "Transport", value: 35 },

  // what does useful work and what is wasted
  { from: "Homes", to: "Useful energy", value: 15 },
  { from: "Homes", to: "Lost as heat", value: 7 },
  { from: "Industry", to: "Useful energy", value: 16 },
  { from: "Industry", to: "Lost as heat", value: 15 },
  { from: "Transport", to: "Useful energy", value: 9 },
  { from: "Transport", to: "Lost as heat", value: 26 },

  // power plants lose a third of their energy as heat
  { from: "Electricity", to: "Lost as heat", value: 12 }
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
