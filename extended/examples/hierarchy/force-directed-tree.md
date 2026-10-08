---
title: "Force-Directed Tree"
source: "https://www.amcharts.com/demos/force-directed-tree/"
category: "hierarchy"
scraped: "2026-10-08"
---

A force-directed tree draws a hierarchy as bubbles linked to their parents, placed by a physics simulation. Here, a company of 118 people: departments around it, teams around them, sized by headcount.

When a force-directed tree works: It shows who belongs where and how big each group is, in a layout that feels alive: bubbles spread out on their own and make room when a branch opens. That makes it good for exploring a structure, and a poor fit for reading exact numbers.

Good for:
- Company structures: departments and teams
- Product ranges and site maps
- Two or three levels with a few dozen nodes

Think twice when:
- Strict top-down hierarchies: a tree chart keeps each level in a row
- Hundreds of nodes: add zoom, or use a treemap
- Comparing sizes exactly: use a bar chart

Prompt: Create a force-directed tree of a software company: the company in the middle, its departments around it and their teams around them, sized by headcount. Clicking a department folds or unfolds its teams. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.percent(100), // fills the whole chart area
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.ForceDirected.new(root, {
  singleBranchOnly: false,
  downDepth: 1,        // a click opens one more level
  // open two levels on load: the departments and their teams
  initialDepth: 2,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  centerStrength: 0.5, // how strongly the circles are pulled toward the middle
  // node sizes, as a share of the chart's size: the smallest team and the whole company
  minRadius: am5.percent(3),
  maxRadius: am5.percent(11)
}));

// A soft shadow under each circle
series.circles.template.setAll({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

// Show the headcount in tooltips
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/] people");

// Set data: a software company of 118 people, by department and team
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
var data = {
  name: "Company",
  children: [{
    name: "Engineering",
    children: [
      { name: "Web", value: 14 },
      { name: "Platform", value: 11 },
      { name: "Mobile", value: 9 },
      { name: "QA", value: 6 },
      { name: "Data", value: 5 }
    ]
  }, {
    name: "Product",
    children: [
      { name: "Design", value: 6 },
      { name: "Managers", value: 5 },
      { name: "Research", value: 3 }
    ]
  }, {
    name: "Sales",
    children: [
      { name: "Enterprise", value: 8 },
      { name: "Online", value: 6 },
      { name: "Partners", value: 3 }
    ]
  }, {
    name: "Support",
    children: [
      { name: "Americas", value: 7 },
      { name: "Europe", value: 6 },
      { name: "Asia", value: 4 }
    ]
  }, {
    name: "Marketing",
    children: [
      { name: "Content", value: 4 },
      { name: "Growth", value: 4 },
      { name: "Brand", value: 3 },
      { name: "Events", value: 2 }
    ]
  }, {
    name: "Operations",
    children: [
      { name: "Finance", value: 4 },
      { name: "People", value: 3 },
      { name: "IT", value: 3 },
      { name: "Legal", value: 2 }
    ]
  }]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so the whole tree shows

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
  height: 550px;
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
