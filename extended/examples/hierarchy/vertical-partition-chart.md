---
title: "Vertical Partition Chart"
source: "https://www.amcharts.com/demos/vertical-partition-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A partition chart, or icicle chart, stacks a hierarchy in rows: the whole on top, each row one level deeper, each box as wide as its share. Here, the 168 hours of one person’s week.

Rows or columns?: A vertical partition reads from the top down, like icicles, and fits a wide space such as the top of a dashboard. In narrow boxes the labels turn sideways, so it suits short names; for long ones, the horizontal layout keeps them level.

Good for:
- Time or money split into groups and items
- Wide spaces, like a dashboard header
- Showing which group a small item belongs to

Think twice when:
- Long names: use the horizontal layout
- Many levels: the rows get short
- Comparing items from different groups: a bar chart lines them up

Prompt: Create a vertical partition (icicle) chart of the 168 hours of one person’s week by activity, with the levels running top to bottom. Labels turn sideways in narrow boxes, and clicking a box zooms into it or back out. Use the amCharts 5 library with its Responsive theme.

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
var series = chart.series.push(am5hierarchy.Partition.new(root, {
  singleBranchOnly: false, // opening one branch leaves the others open
  orientation: "vertical", // levels stack top to bottom, the whole week at the top
  // show up to 10 levels on load and on each click: more than this data has, so all of them show
  downDepth: 10,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

// Labels turn sideways only in narrow boxes that are taller than they are wide,
// checked again whenever a box changes size (when zooming in and out)
function turnLabel(width, rectangle) {
  var label = rectangle.dataItem && rectangle.dataItem.get("label");
  if (label) {
    label.set("rotation", rectangle.width() < 100 && rectangle.width() < rectangle.height() ? 90 : 0);
  }
}
series.rectangles.template.on("width", turnLabel);  // runs whenever a box's width changes...
series.rectangles.template.on("height", turnLabel); // ...or its height

// Hours; {sum} adds up everything inside a group
series.nodes.template.set("tooltipText", "{category}: [bold]{sum} hours[/]");

// Set data: the 168 hours of one person's week
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "Week",
  children: [{
    name: "Sleep",
    value: 56
  }, {
    name: "Work",
    children: [
      { name: "Focus work", value: 20 },
      { name: "Meetings", value: 12 },
      { name: "Email", value: 8 }
    ]
  }, {
    name: "Free time",
    children: [
      { name: "Screens", value: 15 },
      { name: "Friends", value: 8 },
      { name: "Sport", value: 6 },
      { name: "Reading", value: 6 }
    ]
  }, {
    name: "Home",
    children: [
      { name: "Cooking", value: 8 },
      { name: "Cleaning", value: 7 },
      { name: "Shopping", value: 5 }
    ]
  }, {
    name: "Meals",
    value: 10
  }, {
    name: "Commute",
    value: 7
  }]
}]);

// start at the top node, so the whole week shows
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
