---
title: "Hierarchy node colors"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-node-colors/"
scraped: "2026-03-15"
---

This tutorial looks at various ways we can control coloring of hierarchy nodes.

## Auto-assigned colors

A series will automatically assign a unique color to each root node as well as all the first-level nodes from its own [color set](https://www.amcharts.com/docs/v5/reference/xychart/#colors_setting).

Deeper level nodes will inherit their colors from parent nodes.

Should we want to, we can override the whole list of colors by either setting it directly on series color set, creating a [quick theme](https://www.amcharts.com/docs/v5/concepts/themes/#Quick_custom_theme), or a [reusable full theme](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/), e.g.:

series.get("colors").setAll({
  colors: \[
    am5.color(0x095256),
    am5.color(0x087f8c),
    am5.color(0x5aaa95),
    am5.color(0x86a873),
    am5.color(0xbb9f06)
  \],
  step: 1
});

series.get("colors").setAll({
  colors: \[
    am5.color(0x095256),
    am5.color(0x087f8c),
    am5.color(0x5aaa95),
    am5.color(0x86a873),
    am5.color(0xbb9f06)
  \],
  step: 1
});

IMPORTANTBy default, Hierarchy takes every second color from the color list. If we are defining a list of colors and want each of those used, we also need to set `step: 1` setting as per above code.

MORE INFO A "[Color sets](https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Setting_own_list_of_colors)" section of our color tutorial has more details and code samples.

## Manual colors

### Note about data

Before we explore the dynamic node coloring options, and important note.

Series data needs to be set **after** all the other configuration options for the series.

Setting data before adapters or template fields, will cause the those to be ignored.

### Via adapters

It's possible to use custom functions ([adapters](https://www.amcharts.com/docs/v5/concepts/settings/adapters/)) to determine color for each node's elements, like circles or rectangles.

Adapters are functions that are run whenever color (or any other setting) is requested for an element. They have a chance of modifying the value.

We can use them to apply custom colors for series elements:

Hierarchy type

Visual elements

`ForceDirected`

`circles`, `outerCircles`, `links`

`Pack`

`circles`

`Partition`

`rectangles`

`Sunburst`

`slices`

`Tree`

`circles`, `outerCircles`, `links`

`Treemap`

`rectangles`

For example, the following will change fill color for node circles, and outline to outer circles on a force-directed series to red:

series.circles.template.adapters.add("fill", function(fill, target) {
  return am5.color(0xff0000);
});

series.outerCircles.template.adapters.add("stroke", function(fill, target) {
  return am5.color(0xff0000);
});

series.circles.template.adapters.add("fill", function(fill, target) {
  return am5.color(0xff0000);
});

series.outerCircles.template.adapters.add("stroke", function(fill, target) {
  return am5.color(0xff0000);
});

Adapters can also contain custom code to selectively return values according to some logic.

E.g. the following will color treemap node rectangles red if value is lower than 100, and green if it's 100 or above:

series.rectangles.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  }
  else {
    return am5.color(0x50b300);
  }
});

series.rectangles.template.adapters.add("fill", function(fill, target) {
  if (target.dataItem.get("value") > 100) {
    return am5.color(0xb30000);
  }
  else {
    return am5.color(0x50b300);
  }
});

In the above code we are accessing data item of the node (passed in via `target` parameter) to determine its value.


### Via data

We can also specify fill and other colors, as well as any other setting value, via data using [template fields](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/).

In short, template field allows specifying field in data that holds setting values for the node.

Using it we can bind `fill` and `stroke` settings of an element to data:

series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll(\[{
  name: "Root",
  value: 0,
  children: \[{
    name: "A",
    value: 89,
    nodeSettings: {
      fill: am5.color(0x297373)
    }
  }, {
    name: "B",
    value: 55,
    nodeSettings: {
      fill: am5.color(0x946B49)
    }
  }, {
    name: "C",
    value: 66,
    nodeSettings: {
      fill: am5.color(0xFF621F)
    }
  }\]
}\]);

series.circles.template.setAll({
  templateField: "nodeSettings"
});

series.data.setAll(\[{
  name: "Root",
  value: 0,
  children: \[{
    name: "A",
    value: 89,
    nodeSettings: {
      fill: am5.color(0x297373)
    }
  }, {
    name: "B",
    value: 55,
    nodeSettings: {
      fill: am5.color(0x946B49)
    }
  }, {
    name: "C",
    value: 66,
    nodeSettings: {
      fill: am5.color(0xFF621F)
    }
  }\]
}\]);


### Via heat rules

[Heat rules](https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/) is an excellent way to automatically apply a range of setting values, e.g. fill color, based on the node's value within range of values in the whole series.

We can use values in series' `valueField` for heat rules, or we can use a set of completely different values via `customValueField`:

let series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0,
    calculateAggregates: true
  })
);


series.events.on("datavalidated", function() {
  let min = Infinity;
  let max = 0;
  series.nodes.each(function(node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", \[{
    target: series.rectangles.template,
    dataField: "customValue",
    min: am5.color(0xF53D3D),
    max: am5.color(0x0056F5),
    minValue: min,
    maxValue: max,
    key: "fill"
  }\]);
});

var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    upDepth: -1,
    initialDepth: 2,
    valueField: "value",
    customValueField: "heatValue",
    categoryField: "name",
    childDataField: "children",
    nodePaddingOuter: 0,
    nodePaddingInner: 0,
    calculateAggregates: true
  })
);

// Calculate min and max values in data
series.events.on("datavalidated", function() {
  var min = Infinity;
  var max = 0;
  series.nodes.each(function(node) {
    var dataItem = node.dataItem;
    if (dataItem.get("customValue") > max) {
      max = dataItem.get("customValue");
    }
    if (dataItem.get("customValue") < min) {
      min = dataItem.get("customValue");
    }
  });

  series.set("heatRules", \[{
    target: series.rectangles.template,
    dataField: "customValue",
    min: am5.color(0xF53D3D),
    max: am5.color(0x0056F5),
    minValue: min,
    maxValue: max,
    key: "fill"
  }\]);
});

IMPORTANTHierarchy series will not be able to calculate their minimum and maximum values from all levels of the data hierarchy, so we need to provide `minValue` and `maxValue` ourselves. The code above provides an automatic way to do that.


