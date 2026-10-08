---
title: "Dynamic Data Updates on Treemap"
source: "https://www.amcharts.com/demos/dynamic-data-updates-on-treemap/"
category: "hierarchy"
scraped: "2026-10-08"
---

A treemap that keeps changing: every two seconds the values move and the boxes slide to new sizes. Here, made-up visits to an online store’s pages.

When a live treemap works: Animating from one set of numbers to the next lets people follow which parts grow and which shrink without reading a single value. It suits screens that run on their own; for a careful look, people still need the numbers.

Good for:
- Live traffic, sales or server load
- Wall screens and status dashboards
- Market maps that refresh during the day

Think twice when:
- Updates faster than people can follow
- Reports that need one fixed picture
- Small changes: a bar chart with values shows them better

Prompt: Create a treemap of visitors on the pages of an online store, with the pages colored by their store section. Every two seconds the visitor counts change a little at random, and the boxes animate to their new sizes and places. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

// a theme of our own: it hides the rectangles of the store and of its sections
const myTheme = am5.Theme.new(root);

myTheme.rule("HierarchyNode", ["depth0"]).setAll({
  forceHidden: true // the store, the root, isn't drawn...
});

myTheme.rule("HierarchyNode", ["depth1"]).setAll({
  forceHidden: true // ...nor are the sections: only their pages show
});

root.setThemes([
  myTheme, am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
])

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
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    sort: "descending",  // biggest rectangles first, at the top left
    downDepth: 1,        // a click opens one more level
    upDepth: -1,
    // open two levels on load: the sections and their pages
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0, // no space around the rectangles...
    nodePaddingInner: 0  // ...or between them
  })
);

series.rectangles.template.setAll({
  strokeWidth: 3,    // 3px outlines in the background color separate the rectangles
  cornerRadiusTL: 7, // rounded corners
  cornerRadiusTR: 7,
  cornerRadiusBL: 7,
  cornerRadiusBR: 7
});

// Show the visitor count in tooltips
series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/] visitors");

// Set data: visitors on the pages of an online store, by section.
// The sections themselves are hidden (see the theme above): their pages share a color.
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
var data = {
  name: "Store",
  children: [{
    name: "Clothing",
    children: [
      { name: "Jackets", value: 380 },
      { name: "Jeans", value: 290 },
      { name: "T-shirts", value: 240 },
      { name: "Dresses", value: 200 },
      { name: "Sweaters", value: 150 }
    ]
  }, {
    name: "Shoes",
    children: [
      { name: "Sneakers", value: 420 },
      { name: "Running", value: 310 },
      { name: "Boots", value: 260 },
      { name: "Sandals", value: 140 }
    ]
  }, {
    name: "Sale",
    children: [
      { name: "Last chance", value: 330 },
      { name: "Outlet", value: 180 }
    ]
  }, {
    name: "Accessories",
    children: [
      { name: "Bags", value: 230 },
      { name: "Watches", value: 170 },
      { name: "Sunglasses", value: 120 }
    ]
  }, {
    name: "Home",
    children: [
      { name: "Lamps", value: 110 },
      { name: "Rugs", value: 90 },
      { name: "Cushions", value: 70 }
    ]
  }]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so every section shows

// Every two seconds, move each page's count up or down by up to 20% (random numbers here;
// a real page would load new figures). Counts stay between half and double their first value.
// https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-api/#Updating_node_values
setInterval(function() {
  var dataItems = series.dataItems[0].get("children");

  for (var i = 0; i < dataItems.length; i++) {
    var dataItem = dataItems[i];
    var children = dataItem.get("children");
    for (var c = 0; c < children.length; c++) {
      var child = children[c];
      var first = child.dataContext.value;   // the starting count, from the data
      var value = child.get("valueWorking"); // the current count, after the last update
      var newValue = Math.round(value * (0.8 + Math.random() * 0.4));
      newValue = Math.min(first * 2, Math.max(first / 2, newValue));
      child.set("value", newValue);
      child.set("valueWorking", newValue);   // the treemap sizes the rectangles by the working value
    }
  }
}, 2000);

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
