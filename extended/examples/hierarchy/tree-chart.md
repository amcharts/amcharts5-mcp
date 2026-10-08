---
title: "Tree Chart"
source: "https://www.amcharts.com/demos/tree-chart/"
category: "hierarchy"
scraped: "2026-10-08"
---

A tree chart draws a hierarchy as nodes and lines, each parent above its children. Here, a family tree from a grandmother to her great-grandchildren.

When a tree chart works: A tree chart shows what belongs under what, and how deep the structure goes. Every node gets the same space whatever its value, so it suits relationships rather than amounts: families, org charts, site maps. Folding branches keeps a big tree readable.

Good for:
- Family trees and org charts
- Site maps and folder structures
- Decision trees and classifications

Think twice when:
- Sizes that matter: a partition chart or treemap shows them
- Hundreds of nodes: start folded, or use a force-directed tree
- Links across branches: a network graph handles them

Prompt: Create a tree chart of a four-generation family tree, laid out top to bottom, with names in the circles. Clicking a parent folds or opens its branch, nodes can be dragged, and the tree can be zoomed. Use the amCharts 5 library with its Responsive theme.

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

var chart = root.container.children.push(
  am5.SerialChartContainer.new(root, {
    width: am5.p100, // the container fills the whole chart div
    height: am5.p100
  })
);

// Zoom with the mouse wheel or a pinch, and drag to pan
// https://www.amcharts.com/docs/v5/concepts/common-elements/containers/#Zoom_functionality
chart.zoomableContainer.setAll({
  wheelable: true,
  pinchZoom: true
});

var zoomTools = chart.set("zoomTools", am5.ZoomTools.new(root, {})); // zoom in, zoom out and reset buttons

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.Tree.new(root, {
  singleBranchOnly: false, // opening one branch leaves the others open
  // show every generation on load; a collapsed node opens one level at a time
  downDepth: 1,
  initialDepth: 10,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  // room on the right, so the last column of a left-to-right tree clears the zoom buttons
  paddingRight: 80
}));

// names shrink as far as needed to fit their circle instead of hiding
series.labels.template.set("minScale", 0);

// The tooltip reads the extra "born" field from the data; "#" keeps the year free of a thousands separator
series.nodes.template.set("tooltipText", "{category}, born {born.formatNumber('#')}");

// Set data: a family tree, from a grandmother to her great-grandchildren
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data
series.data.setAll([{
  name: "Rose",
  born: 1938,
  children: [{
    name: "Anna",
    born: 1960,
    children: [{
      name: "Tom",
      born: 1984,
      children: [
        { name: "Leo", born: 2012 },
        { name: "Ava", born: 2015 }
      ]
    }, {
      name: "Mia",
      born: 1988
    }]
  }, {
    name: "Mark",
    born: 1963,
    children: [{
      name: "Sam",
      born: 1986
    }, {
      name: "Ella",
      born: 1989,
      children: [
        { name: "Noah", born: 2018 }
      ]
    }, {
      name: "Jack",
      born: 1994
    }]
  }, {
    name: "Lucy",
    born: 1967,
    children: [{
      name: "Ivy",
      born: 1990,
      children: [
        { name: "Finn", born: 2016 },
        { name: "Lily", born: 2019 },
        { name: "Theo", born: 2022 }
      ]
    }, {
      name: "Max",
      born: 1995
    }]
  }]
}]);

// start at the top node, so the whole family shows
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
