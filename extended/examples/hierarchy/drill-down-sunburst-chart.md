---
title: "Drill-Down Sunburst Chart"
source: "https://www.amcharts.com/demos/drill-down-sunburst-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A sunburst you explore one branch at a time: click a category and it becomes the inner ring, with its own breakdown around it. Here, a year of an online store’s sales.

When to drill down: A drill-down keeps the first view to the main categories and lets people open the one they care about. Each click redraws that branch around the hole at full size, so small items get room for their names, and the breadcrumbs show the way back.

Good for:
- Sales by department, category and product
- Budgets or org charts with several levels
- Dashboards where people dig into one area

Think twice when:
- Comparing parts of different branches: a grouped bar chart is clearer
- Printed reports, where nobody can click
- Two levels or fewer: a nested donut chart does the job

Prompt: Create a drill-down sunburst chart of an online store’s sales by department, category and product. Clicking a segment makes it the inner ring with its children around it, clicking the inner ring goes back up, and a breadcrumb bar shows the path. Use the amCharts 5 library with its Responsive theme.

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
  width: am5.percent(100),    // fills the whole chart area
  height: am5.percent(100),
  layout: root.verticalLayout // the breadcrumbs above the sunburst
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.Sunburst.new(root, {
  singleBranchOnly: true,       // opening a branch closes the others
  // show every level, on load and after a click (10 is more levels than the data has)
  downDepth: 10,
  initialDepth: 10,
  // the root, "All sales", isn't drawn: its children form the inner ring
  topDepth: 1,
  innerRadius: am5.percent(30), // a hole in the middle, 30% of the radius
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

// Sales are in thousands of dollars; {sum} adds up everything inside a category
series.nodes.template.set("tooltipText", "{category}: [bold]${sum}k[/]");

// Breadcrumbs above the chart show where you are and lead back up
// https://www.amcharts.com/docs/v5/charts/hierarchy/breadcrumbs/
chart.children.unshift(am5hierarchy.BreadcrumbBar.new(root, {
  series: series
}));

// Set data: a year of an online store's sales, in thousands of dollars
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "All sales",
  children: [{
    name: "Electronics",
    children: [
      {
        name: "Phones",
        children: [
          { name: "Handsets", value: 130 },
          { name: "Chargers", value: 87 },
          { name: "Cases", value: 55 }
        ]
      },
      { name: "Laptops", value: 148 },
      {
        name: "Audio",
        children: [
          { name: "Headphones", value: 53 },
          { name: "Speakers", value: 30 }
        ]
      },
      { name: "Cameras", value: 26 }
    ]
  }, {
    name: "Home",
    children: [
      { name: "Furniture", value: 415 },
      { name: "Kitchen", value: 148 },
      { name: "Bedding", value: 89 }
    ]
  }, {
    name: "Fashion",
    children: [
      {
        name: "Shoes",
        children: [
          { name: "Sneakers", value: 89 },
          { name: "Boots", value: 40 },
          { name: "Sandals", value: 33 }
        ]
      },
      { name: "Clothing", value: 148 }
    ]
  }, {
    name: "Toys",
    children: [
      { name: "Board games", value: 135 },
      { name: "Building sets", value: 98 }
    ]
  }, {
    name: "Books",
    children: [
      { name: "Fiction", value: 100 },
      { name: "Nonfiction", value: 60 }
    ]
  }]
}]);

series.selectDataItem(series.dataItems[0]); // select the root, so the breadcrumbs show "All sales"

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
