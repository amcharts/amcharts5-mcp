---
title: "Simple Treemap"
source: "https://www.amcharts.com/demos/simple-treemap/"
category: "hierarchy"
scraped: "2026-10-08"
---

A treemap shows a total as nested rectangles, each sized by its value and colored by its group. Here, a $4,000 monthly budget split into six groups and 20 items.

When a treemap works: A treemap fits a lot into a small space: every item is a box sized by its value, and the boxes of one group sit together in one color. It is best at showing which parts dominate a total; for small differences between similar boxes, a bar chart is easier to read.

Good for:
- Budgets and spending by category
- Sales, stock or disk space by group
- Dozens of items in one rectangle

Think twice when:
- Values that are close: the boxes look the same
- Negative numbers: a box can’t have negative area
- Change over time: use a line or stacked column chart

Prompt: Create a treemap of a monthly household budget, with items such as rent, groceries and savings grouped into six groups and colored by their group. Clicking an item zooms to its group, and clicking again zooms back out. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.percent(100),  // the whole width...
    height: am5.percent(100), // ...and height of the chart's div
    layout: root.verticalLayout
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false, // opening a group leaves the others open
    downDepth: 2,            // a click shows the levels below the clicked box: a group's items, or from the top, groups and items
    upDepth: -1,             // hides the zoomed-in group's own box and the levels above it
    initialDepth: 2,         // at first, show two levels: the groups and their items
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,     // no gap at the chart's edges...
    nodePaddingInner: 0      // ...or between the boxes
  })
);

series.rectangles.template.setAll({
  strokeWidth: 2 // 2px outlines around the boxes
});

// Show the amount in tooltips
series.nodes.template.set("tooltipText", "{category}: [bold]${sum}[/]");

// Click a box to zoom into its group; click again to zoom back out
// https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-drill-down/
series.nodes.template.set("cursorOverStyle", "pointer"); // a hand cursor over the boxes
series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;
  if (dataItem && !dataItem.get("children")) {
    series.selectDataItem(dataItem.get("parent"));
  }
});

// Set data: a $4,000 monthly budget, by group and item
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
var data = {
  name: "Budget",
  children: [{
    name: "Housing",
    children: [
      { name: "Rent", value: 1100 },
      { name: "Utilities", value: 180 },
      { name: "Internet & phone", value: 90 },
      { name: "Home insurance", value: 60 }
    ]
  }, {
    name: "Food",
    children: [
      { name: "Groceries", value: 520 },
      { name: "Eating out", value: 210 },
      { name: "Coffee", value: 35 }
    ]
  }, {
    name: "Savings",
    children: [
      { name: "Retirement", value: 400 },
      { name: "Emergency fund", value: 200 }
    ]
  }, {
    name: "Transport",
    children: [
      { name: "Car payment", value: 320 },
      { name: "Fuel", value: 140 },
      { name: "Transit", value: 60 },
      { name: "Parking", value: 40 }
    ]
  }, {
    name: "Leisure",
    children: [
      { name: "Travel", value: 150 },
      { name: "Hobbies", value: 90 },
      { name: "Gifts", value: 70 },
      { name: "Streaming", value: 35 }
    ]
  }, {
    name: "Health",
    children: [
      { name: "Health insurance", value: 220 },
      { name: "Gym", value: 45 },
      { name: "Pharmacy", value: 35 }
    ]
  }]
};

series.data.setAll([data]);
// start at the top node, showing the whole budget
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
