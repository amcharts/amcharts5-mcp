---
title: "Hierarchy API"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-api/"
scraped: "2026-03-15"
---

This tutorial is a collection of uses for Hierarchy-specific API.

## Dynamically adding child nodes

We can use a series method `addChildData()` to dynamically add child nodes to in any Hierarchy chart.

series.addChildData(dataItem, \[
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
\]);

series.addChildData(dataItem, \[
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
\]);

Here's a working example, which adds a child node to a clicked node.


Please note, that if node did not previously had any child nodes, and thus had a value of its own (not a sum of child values), we would want to remove it's own value before adding children:

dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);

dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);

## Updating node values

Similarly, we can also change node values:

dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

If our series uses `colorField`, we can also update `fill` setting of the data item, as well as related graphical element, such as circle on a Force-directed series:

dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));

dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));


## Removing nodes

To remove a node without updating the whole data set, use series' method `disposeDataItem()`:

series.disposeDataItem(dataItem);

series.disposeDataItem(dataItem);

The below demo will remove any clicked node:


## Looking up a nodes

If we need to find a specific node instance by its name, we can find it in the series' node list.

Here's a handy function:

function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}

function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}

## Toggling nodes

To expand a node, we can use series method `enableDataItem(dataItem)`.

Similarly, to collapse a node, use `disableDataItem(dataItem)`.

The following example finds and collapses "Fruity" node as well as expands the one called "Other":

// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);

// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);


