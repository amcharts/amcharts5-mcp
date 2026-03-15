---
title: "Drill-Down Sunburst Chart"
source: "https://www.amcharts.com/demos/drill-down-sunburst-chart/"
category: "hierarchy"
scraped: "2026-03-15"
---

Sunburst Chart or Diagram represents hierarchical relational data in a circular chart. It looks similar to nested donut charts, however, the hierarchical nature of the Sunburst means that each level represents detalization of the previous one. In other words, children slices on each level comprise the whole of the parent slice. 
The amCharts Sunburst chart supports drilling down right out of the box with no additional configuration needed. Clicking on any value with children will drill the chart down to this value in the center and its children on the outside.
Key implementation details
Sunburst chart is part of the hierarchy module of the amCharts Charts package. To create a Sunburst chart we add a Container to the page and then push a new Sunburst object into it. Then we just configure categoryField, valueField, and childDataField on the Sunburst.
Hierarchy charts
Sunburst

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create wrapper container
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = container.children.push(am5hierarchy.Sunburst.new(root, {
  singleBranchOnly: true,
  downDepth: 10,
  initialDepth: 10,
  topDepth: 1,
  innerRadius:am5.percent(30),
  valueField: "value",
  categoryField: "name",
  childDataField: "children"
}));

series.data.setAll([{
  name: "root",
  children: [{
    name: "First",
    children: [
      { name: "A1", value: 100 },
      { name: "A2", value: 60 }
    ]
  },
  {
    name: "Second",
    children: [
      { name: "B1", value: 135 },
      { name: "B2", value: 98 }
    ]
  },
  {
    name: "Third",
    children: [
      {
        name: "C1",
        children: [
          { name: "EE1", value: 130 },
          { name: "EE2", value: 87 },
          { name: "EE3", value: 55 }
        ]
      },
      { name: "C2", value: 148 },
      {
        name: "C3", children: [
          { name: "CC1", value: 53 },
          { name: "CC2", value: 30 }
        ]
      },
      { name: "C4", value: 26 }
    ]
  },
  {
    name: "Fourth",
    children: [
      { name: "D1", value: 415 },
      { name: "D2", value: 148 },
      { name: "D3", value: 89 }
    ]
  },
  {
    name: "Fifth",
    children: [
      {
        name: "E1",
        children: [
          { name: "EE1", value: 33 },
          { name: "EE2", value: 40 },
          { name: "EE3", value: 89 }
        ]
      },
      {
        name: "E2",
        value: 148
      }
    ]
  }]
}]);

series.selectDataItem(series.dataItems[0]);

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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
