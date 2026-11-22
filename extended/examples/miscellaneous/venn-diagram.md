---
title: "Venn Diagram"
source: "https://www.amcharts.com/demos/venn-diagram/"
category: "miscellaneous"
scraped: "2026-11-21"
---

A Venn diagram draws each group as a circle and puts what groups share where the circles overlap. Here, three sets, A, B and C, with areas sized by how many items each part holds.

When a Venn diagram works: A Venn diagram shows at once which items belong to one group, to two, or to all of them: customers who buy from several product lines, skills people share, features products have in common. Two or three circles read best, and the areas only approximate the counts.

Good for:
- Overlaps between two or three groups
- Explaining shared and unique parts
- Slides and teaching material

Think twice when:
- Exact overlap sizes: label the values
- Four or more groups: a matrix or bar chart of combinations
- Overlaps of very different sizes: the small ones get hard to see

Prompt: Create a Venn diagram of three sets and their overlaps, each area sized by its value and labeled with its name, with a legend under it where a click hides an area. Use the Animated theme. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Labels, Fading fill, Legend, Legend position.

## JavaScript

```javascript
// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// Create wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.p100, // the container fills the whole chart div
  height: am5.p100,
  layout: root.verticalLayout
}));

// Create venn series
var series = chart.series.push(am5venn.Venn.new(root, {
  categoryField: "name",
  valueField: "value",
  intersectionsField: "sets", // an overlap lists, in "sets", the circles it belongs to
  paddingTop: 40,             // 40px of room on every side
  paddingBottom: 40,
  paddingLeft: 40,
  paddingRight: 40
}));

// Set data
series.data.setAll([
  { name: "A", value: 10 },
  { name: "B", value: 10 },
  { name: "C", value: 5 },
  // overlaps: "sets" names the circles each one belongs to
  { name: "X", value: 4, sets: ["A", "B"] },
  { name: "Y", value: 2, sets: ["A", "C"] },
  { name: "Z", value: 2, sets: ["B", "C"] },
  { name: "Q", value: 1, sets: ["A", "B", "C"]
}]);

// Set tooltip content
series.slices.template.set("tooltipText", "{category}: {value}");

// Set up hover appearance
series.hoverGraphics.setAll({
  strokeDasharray: [3, 3],     // a dashed outline around the area under the mouse...
  stroke: root.interfaceColors.get("background"), // ...in the background's color (white, or dark in dark mode)...
  strokeWidth: 2               // ...2px wide
});

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend centered under the diagram
    x: am5.p50
  })
);
legend.data.setAll(series.dataItems);

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the diagram, and a screen reader names it
  role: "figure",
  ariaLabel: "Venn diagram of three sets, A, B and C, and their overlaps X, Y, Z and Q, each area sized by how many items it holds. Tab to the areas, then move between them with the arrow keys"
});
// the circles and overlaps: one Tab stop (a focusable group), the arrow keys step through them
series.slices.template.setAll({
  focusable: true,
  role: "figure",
  focusableGroup: "areas",
  hoverOnFocus: true, // a focused area shows its tooltip
  ariaLabel: "{category}: {value}"
});
// the legend: one Tab stop too, after the areas; the arrow keys step through its items, and Enter hides or shows one
legend.itemContainers.template.setAll({
  focusableGroup: "legend",
  tabindexOrder: 10 // the chart's parts are focused in this order, from low to high (0 if not set)
});
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
- https://cdn.amcharts.com/lib/5/venn.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
