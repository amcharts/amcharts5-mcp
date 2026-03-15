---
title: "Dynamic Data Updates on Treemap"
source: "https://www.amcharts.com/demos/dynamic-data-updates-on-treemap/"
category: "hierarchy"
scraped: "2026-03-15"
---

Updating data in real-time is one of the key use-cases for interactive dynamic data visualizations. Animating to the new values leads the viewer's attention and makes those updates much more readable. amCharts has all the tools to make this process completely seamless.
Key implementation details
We just load and apply Animated theme and then just update the data on an interval. The chart takes care of the rest.
Hierarchy charts
Treemap
Animations

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root);

myTheme.rule("HierarchyNode", ["depth0"]).setAll({
  forceHidden: true
});

myTheme.rule("HierarchyNode", ["depth1"]).setAll({
  forceHidden: true
});

root.setThemes([
  myTheme, am5themes_Animated.new(root)
])


// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    sort: "descending",
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0
  })
);


series.rectangles.template.setAll({
  strokeWidth: 3,
  cornerRadiusTL: 7,
  cornerRadiusTR: 7,
  cornerRadiusBL: 7,
  cornerRadiusBR: 7
});

// set data
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

var data = {
  name: "Root",
  children: [
    {
      name: "First",
      children: [
        {
          name: "A1",
          value: 100
        },
        {
          name: "A2",
          value: 60
        },
        {
          name: "A3",
          value: 30
        }
      ]
    },
    {
      name: "Second",
      children: [
        {
          name: "B1",
          value: 135
        },
        {
          name: "B2",
          value: 98
        },
        {
          name: "B3",
          value: 56
        }
      ]
    },
    {
      name: "Third",
      children: [
        {
          name: "C1",
          value: 335
        },
        {
          name: "C2",
          value: 148
        },
        {
          name: "C3",
          value: 126
        },
        {
          name: "C4",
          value: 26
        }
      ]
    },
    {
      name: "Fourth",
      children: [
        {
          name: "D1",
          value: 415
        },
        {
          name: "D2",
          value: 148
        },
        {
          name: "D3",
          value: 89
        },
        {
          name: "D4",
          value: 64
        },
        {
          name: "D5",
          value: 16
        }
      ]
    },
    {
      name: "Fifth",
      children: [
        {
          name: "E1",
          value: 687
        },
        {
          name: "E2",
          value: 148
        }
      ]
    }
  ]
};

series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);

setInterval(function() {
  var dataItems = series.dataItems[0].get("children");

  for (var i = 0; i < dataItems.length; i++) {
    var dataItem = dataItems[i];
    var children = dataItem.get("children");
    for (var c = 0; c < children.length; c++) {
      var child = children[c];
      var value = child.get("valueWorking");
      var newValue = value + Math.round(value * Math.random() * 0.4 - 0.2);
      child.set("value", newValue);
      child.set("valueWorking", newValue);
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
