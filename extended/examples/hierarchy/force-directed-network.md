---
title: "Force-Directed Network"
source: "https://www.amcharts.com/demos/force-directed-network/"
category: "hierarchy"
scraped: "2026-10-08"
---

A network graph: nodes joined by lines, laid out by forces that push them apart and pull linked ones together. Here, three separate trees held together by two cross-links.

Trees with cross-links: Real structures are rarely pure trees: one team works with another, one page links to another section. Cross-links add those connections on top of the hierarchy, and the forces pull the linked groups together, so clusters and the bridges between them show up on their own.

Good for:
- Teams or systems that depend on each other
- Site sections that link across
- Clusters and the links that bridge them

Think twice when:
- Dense networks with many cross-links: they tangle fast
- Reading exact values: node size is only a rough guide
- A strict hierarchy: a tree chart is easier to follow

Prompt: Create a force-directed network of three separate trees, with extra links joining the first tree to the second and the second to the third. Clicking a node folds or opens the level below it, and nodes can be dragged. Use the amCharts 5 library with its Responsive theme.

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

var data = {
  name: "Root",
  value: 0,
  children: [
    {
      name: "1",
      linkWith: ["2"],
      children: [
        {
          name: "A",
          children: [
            { name: "A1", value: 1 },
            { name: "A2", value: 1 },
            { name: "A3", value: 1 },
            { name: "A4", value: 1 },
            { name: "A5", value: 1 }
          ]
        },
        {
          name: "B",
          children: [
            { name: "B1", value: 1 },
            { name: "B2", value: 1 },
            { name: "B3", value: 1 },
            { name: "B4", value: 1 },
            { name: "B5", value: 1 }
          ]
        },
        {
          name: "C",
          children: [
            { name: "C1", value: 1 },
            { name: "C2", value: 1 },
            { name: "C3", value: 1 },
            { name: "C4", value: 1 },
            { name: "C5", value: 1 }
          ]
        }
      ]
    },

    {
      name: "2",
      linkWith: ["3"],
      children: [
        {
          name: "D", value:1
        },
        {
          name: "E", value:1
        }
      ]
    },
    {
      name: "3",
      children: [
        {
          name: "F",
          children: [
            { name: "F1", value: 1 },
            { name: "F2", value: 1 },
            { name: "F3", value: 1 },
            { name: "F4", value: 1 },
            { name: "F5", value: 1 }
          ]
        },
        {
          name: "H",
          children: [
            { name: "H1", value: 1 },
            { name: "H2", value: 1 },
            { name: "H3", value: 1 },
            { name: "H4", value: 1 },
            { name: "H5", value: 1 }
          ]
        },
        {
          name: "G",
          children: [
            { name: "G1", value: 1 },
            { name: "G2", value: 1 },
            { name: "G3", value: 1 },
            { name: "G4", value: 1 },
            { name: "G5", value: 1 }
          ]
        }
      ]
    }
  ]
};

// Create wrapper container
var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.percent(100), // fills the whole chart area
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(
  am5hierarchy.ForceDirected.new(root, {
    singleBranchOnly: false,
    downDepth: 1,          // a click opens one more level
    // the root node isn't drawn: nodes 1, 2 and 3 are the tops of their own trees
    topDepth: 1,
    maxRadius: 25,         // the biggest circles 25px...
    minRadius: 12,         // ...the smallest 12px
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    // linkWith in the data lists other nodes by name (the idField) to link to across the trees
    idField: "name",
    linkWithStrength: 0.3, // how strongly those links pull (the default is 0.5)
    linkWithField: "linkWith",
    manyBodyStrength: -15, // the circles push each other away...
    centerStrength: 0.5    // ...and are pulled toward the middle
  })
);

series.get("colors").set("step", 2); // each new color skips one in the palette, for more contrast

// A soft shadow under each circle
series.circles.template.setAll({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so the trees show

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
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
