---
title: "Dynamically adding and removing nodes in a Force-Directed Tree"
source: "https://docs.amcharts.com/embeds/v5/dynamically-adding-and-removing-nodes-in-a-force-directed-tr/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/hierarchy/hierarchy-api"]
---

A demo from the docs page "Hierarchy API" (get_doc(path: "charts/hierarchy/hierarchy-api")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

var data = [
  {
    name: "Root",
    children: [
      { name: "A", value: 5 },
      { name: "B", value: 3 },
      { name: "C", value: 8 }
    ]
  }
];

// Create wrapper container
var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/hierarchy/#adding
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    topDepth: 0,
    initialDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    idField: "name",
    linkWithField: "linkWith",
    manyBodyStrength: -10,
    centerStrength: 0.8
  })
);

// Adding and removing new data items
series.nodes.template.events.on("click", function (e) {
  var dataItem = e.target.dataItem;

  // Dispose data if clicked when shift is pressed
  if (e.originalEvent.shiftKey) {
    series.disposeDataItem(dataItem);
  } else {
    // Set value of original data item to undefined, so that only child values would be used
    dataItem.set("value", undefined);
    dataItem.set("valueWorking", undefined);

    var name = dataItem.get("category");
    var count = dataItem.get("children", []).length + 1;

    series.addChildData(dataItem, [
      { name: name + "." + count, value: Math.ceil(Math.random() * 10) }
    ]);
  }
});

series.data.setAll(data);

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
