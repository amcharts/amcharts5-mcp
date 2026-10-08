---
title: "Sunburst Chart"
source: "https://www.amcharts.com/demos/sunburst-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A sunburst chart draws a hierarchy as rings: the whole in the middle, each ring one level deeper. Here, what fills a laptop’s drive, folder by folder.

When a sunburst works: A sunburst shows how a total breaks down over several levels at once, with each part sized against its neighbors. It suits data that nests, like folders, budgets or product ranges, where some branches go deeper than others. The outer rings get thin quickly, so clicking into a branch does a lot of the work.

Good for:
- Disk space by folder and subfolder
- Budgets split into departments and items
- Finding the branch that holds most of the total

Think twice when:
- Comparing sizes exactly: a treemap or bar chart is clearer
- One level only: a donut chart is simpler
- Hundreds of small parts: the outer rings turn into slivers

Prompt: Create a sunburst chart of what fills a laptop drive, with the drive in the middle and each level of folders as a ring around it. Clicking a segment zooms into it, and clicking the middle goes back up a level. Use the amCharts 5 library with its Responsive theme.

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
  width: am5.percent(100), // the container fills the whole chart div
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.Sunburst.new(root, {
  singleBranchOnly: true, // only one branch open at a time; a sunburst always works this way
  // show up to 10 levels on load and on each click: more than this data has, so all of them show
  downDepth: 10,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

// Sizes are in gigabytes; {sum} adds up everything inside a folder
series.nodes.template.set("tooltipText", "{category}: [bold]{sum} GB[/]");

// Set data: what fills a laptop's drive, folder by folder, in gigabytes
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "Drive",
  children: [{
    name: "Photos",
    children: [
      { name: "2023", value: 38 },
      { name: "2024", value: 52 },
      { name: "2025", value: 64 },
      { name: "2026", value: 41 }
    ]
  }, {
    name: "Videos",
    children: [
      { name: "Family", value: 96 },
      {
        name: "Travel",
        children: [
          { name: "Japan", value: 41 },
          { name: "Iceland", value: 33 }
        ]
      }
    ]
  }, {
    name: "Apps",
    children: [
      { name: "Games", value: 110 },
      { name: "Creative", value: 34 },
      { name: "Office", value: 9 }
    ]
  }, {
    name: "Documents",
    children: [
      {
        name: "Work",
        children: [
          { name: "Projects", value: 14 },
          { name: "Archive", value: 9 }
        ]
      },
      { name: "Personal", value: 6 }
    ]
  }, {
    name: "Music",
    value: 46
  }, {
    name: "System",
    value: 32
  }]
}]);

// start at the top node, so the whole drive shows
series.set("selectedDataItem", series.dataItems[0]);

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
