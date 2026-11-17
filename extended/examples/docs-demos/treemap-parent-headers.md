---
title: "Treemap with parent headers and one-level drill-down"
source: "https://docs.amcharts.com/embeds/v5/treemap-parent-headers/"
category: "docs-demos"
scraped: "2026-11-14"
docsPages: ["charts/hierarchy/hierarchy-drill-down","charts/hierarchy/treemap"]
---

A demo from the docs pages "Hierarchy drill-down" (get_doc(path: "charts/hierarchy/hierarchy-drill-down")) and "Treemap" (get_doc(path: "charts/hierarchy/treemap")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Sales by region, country and product
function products(hardware, software, services) {
  return [
    { name: "Hardware", value: hardware },
    { name: "Software", value: software },
    { name: "Services", value: services }
  ];
}

var data = [{
  name: "World",
  children: [{
    name: "Europe",
    children: [
      { name: "Germany", children: products(42, 31, 18) },
      { name: "France", children: products(28, 22, 15) },
      { name: "United Kingdom", children: products(25, 30, 21) },
      { name: "Italy", children: products(17, 11, 9) }
    ]
  }, {
    name: "Asia",
    children: [
      { name: "China", children: products(64, 25, 19) },
      { name: "Japan", children: products(33, 21, 14) },
      { name: "India", children: products(21, 26, 23) },
      { name: "South Korea", children: products(19, 12, 8) }
    ]
  }, {
    name: "Americas",
    children: [
      { name: "United States", children: products(71, 66, 48) },
      { name: "Canada", children: products(16, 14, 10) },
      { name: "Brazil", children: products(14, 8, 7) },
      { name: "Mexico", children: products(12, 6, 5) }
    ]
  }]
}];

// Show regions with their countries: the top level (topDepth) plus one more
var series = container.children.push(am5hierarchy.Treemap.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  topDepth: 1,
  initialDepth: 1,
  nodePaddingTop: 24
}));

series.nodes.template.set("tooltipText", "{category}: [bold]{sum}[/]");

// Put the label of a tile whose children are shown into its header band
function showsChildren(label) {
  var dataItem = label.dataItem;
  return dataItem && dataItem.get("children") && !dataItem.get("disabled");
}

series.labels.template.adapters.add("y", function(y, target) {
  return showsChildren(target) ? 0 : y;
});

series.labels.template.adapters.add("centerY", function(centerY, target) {
  return showsChildren(target) ? 0 : centerY;
});

// Drill down one level per click, even when the click lands on an inner tile
series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", function(ev) {
  var dataItem = ev.target.dataItem;
  var selectedItem = series.get("selectedDataItem");

  // Walk up to the tile one level below the current one
  var item = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent");
  }

  if (!item) {
    // The current tile itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});

container.children.unshift(am5hierarchy.BreadcrumbBar.new(root, {
  series: series
}));

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);

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
