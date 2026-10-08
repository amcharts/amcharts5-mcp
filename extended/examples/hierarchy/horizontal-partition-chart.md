---
title: "Horizontal Partition Chart"
source: "https://www.amcharts.com/demos/horizontal-partition-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A partition chart, also called an icicle chart, lays a hierarchy out in columns: the whole on the left, each column one level deeper, each box as tall as its share. Here, a 100-person company by department and team.

When a partition chart works: A partition chart reads like a table turned into boxes: levels run left to right, and every box spans exactly the boxes inside it. The labels stay level, so it copes with longer names better than a sunburst, and the sizes are easy to compare within a column.

Good for:
- Org charts with headcount
- Folders and disk usage
- Budgets broken into departments and items

Think twice when:
- Many levels: the columns get narrow, so let people click in
- Structure without sizes: a tree chart shows it better
- A square space: a sunburst or treemap is more compact

Prompt: Create a horizontal partition (icicle) chart of a 100-person company by department and team, with the levels running left to right. Labels turn sideways in narrow boxes, and clicking a box zooms into it or back out. Use the amCharts 5 library with its Responsive theme.

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
var series = chart.series.push(am5hierarchy.Partition.new(root, {
  singleBranchOnly: false,
  orientation: "horizontal", // the levels run from left to right
  // show every level, on load and after a click (10 is more levels than the data has)
  downDepth: 10,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

// Labels turn sideways only in narrow boxes that are taller than they are wide (the vertical layout),
// checked again whenever a box changes size (when zooming in and out)
function turnLabel(width, rectangle) {
  var label = rectangle.dataItem && rectangle.dataItem.get("label");
  if (label) {
    label.set("rotation", rectangle.width() < 100 && rectangle.width() < rectangle.height() ? 90 : 0);
  }
}
series.rectangles.template.on("width", turnLabel);
series.rectangles.template.on("height", turnLabel);

// {sum} adds up everyone in a department or team
series.nodes.template.set("tooltipText", "{category}: [bold]{sum} people[/]");

// Set data: a 100-person company by department and team
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "Company",
  children: [{
    name: "Engineering",
    children: [
      {
        name: "Backend",
        children: [
          { name: "Payments", value: 7 },
          { name: "Search", value: 6 },
          { name: "Platform", value: 5 }
        ]
      },
      {
        name: "Frontend",
        children: [
          { name: "Web", value: 9 },
          { name: "Design system", value: 5 }
        ]
      },
      {
        name: "Mobile",
        children: [
          { name: "iOS", value: 4 },
          { name: "Android", value: 4 }
        ]
      },
      { name: "QA", value: 6 }
    ]
  }, {
    name: "Sales",
    children: [
      {
        name: "Enterprise",
        children: [
          { name: "Americas", value: 6 },
          { name: "Europe", value: 4 }
        ]
      },
      { name: "Small business", value: 8 }
    ]
  }, {
    name: "Marketing",
    children: [
      { name: "Content", value: 5 },
      { name: "Design", value: 4 },
      { name: "Events", value: 3 }
    ]
  }, {
    name: "Support",
    value: 12
  }, {
    name: "Operations",
    children: [
      { name: "IT", value: 5 },
      { name: "Finance", value: 4 },
      { name: "People", value: 3 }
    ]
  }]
}]);

series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so every level shows

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
