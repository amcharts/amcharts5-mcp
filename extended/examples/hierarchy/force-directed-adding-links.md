---
title: "Force-Directed Adding Links"
source: "https://www.amcharts.com/demos/force-directed-adding-links/"
category: "hierarchy"
scraped: "2026-10-08"
---

A network you draw yourself: click one person, then another, and a line joins them; click a linked pair again to cut it. The forces pull linked people together as you go.

When people draw the links: Most network charts show links that already exist; this one lets people make them. That suits planning and teaching, like who should work with whom or which ideas connect, and each new link pulls its two circles together, so groups form on screen as they are built.

Good for:
- Mapping who knows or works with whom
- Workshops that connect ideas live
- A starting point for a link editor in your own app

Think twice when:
- Keeping the result: the chart doesn’t save the links
- Phones: tapping small circles is fiddly
- Dozens of nodes: the links get hard to follow

Prompt: Create a force-directed chart of 15 people as circles of different sizes, where you link people by clicking: click one person to select them, then another to link the two, or to remove the link if they are already linked. Use the amCharts 5 library with its Responsive theme.

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

// Fifteen people; the value sets the size of each circle
var data = {
  value: 0,
  children: [
    { name: "Ada", value: 18 },
    { name: "Ben", value: 7 },
    { name: "Cleo", value: 12 },
    { name: "Dan", value: 4 },
    { name: "Eva", value: 15 },
    { name: "Finn", value: 9 },
    { name: "Gia", value: 21 },
    { name: "Hugo", value: 6 },
    { name: "Iris", value: 11 },
    { name: "Jack", value: 3 },
    { name: "Kai", value: 14 },
    { name: "Lena", value: 8 },
    { name: "Max", value: 17 },
    { name: "Nora", value: 5 },
    { name: "Omar", value: 10 }
  ]
}

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
    downDepth: 2,
    // the root node isn't drawn, so the people float free of each other
    topDepth: 1,
    initialDepth: 1, // show one level on load: the people
    maxRadius: 60,   // the biggest value gets a 60px circle...
    minRadius: 20,   // ...the smallest 20px
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    // the circles push each other away a little and are pulled firmly to the middle
    manyBodyStrength: -13,
    centerStrength: 0.8
  })
);

series.get("colors").setAll({
  step: 1 // each person takes the next palette color, none skipped
});

series.links.template.setAll({
  strokeWidth: 2 // 2px links
});

// A soft shadow under each circle
series.circles.template.setAll({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

series.nodes.template.setAll({
  tooltipText: null,         // no tooltips
  cursorOverStyle: "pointer" // a hand pointer: the circles can be clicked
});

var selectedDataItem; // the first circle clicked, waiting for a second one

// handle clicking on nodes and link/unlink them
series.nodes.template.events.on("click", function(e) {
  // check if we have a selected data item
  if (selectedDataItem) {
    var targetDataItem = e.target.dataItem;
    // if yes, and it's the same, unselect
    if (e.target.dataItem == selectedDataItem) {
      selectedDataItem.get("outerCircle").setPrivate("visible", false); // hide the ring around it
      selectedDataItem = undefined;
    }
    // otherwise connect selected with a clicked point
    else {
      if (series.areLinked(selectedDataItem, targetDataItem)) {
        series.unlinkDataItems(selectedDataItem, targetDataItem);
      }
      else {
        // 0.2 is how strongly the new link pulls the two circles together
        series.linkDataItems(selectedDataItem, targetDataItem, 0.2);
      }
    }
  }
  // if no selected data item, select
  else {
    selectedDataItem = e.target.dataItem;
    selectedDataItem.get("outerCircle").setPrivate("visible", true) // a ring marks the selected circle
  }
})

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]); // start with the root selected, so the people show

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
