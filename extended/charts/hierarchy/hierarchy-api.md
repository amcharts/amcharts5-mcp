---
title: "Hierarchy API"
source: "https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-api/"
scraped: "2026-11-16"
---

This tutorial is a collection of uses for Hierarchy-specific API.

## Dynamically adding child nodes

We can use a series method `addChildData()` to dynamically add child nodes to in any Hierarchy chart.

TypeScript:

```ts
series.addChildData(dataItem, [
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
]);
```

JavaScript:

```js
series.addChildData(dataItem, [
  { name: "Child 1", value: 1 },
  { name: "Child 2", value: 1 },
  { name: "Child 3", value: 1 }
]);
```

Here's a working example, which adds a child node to a clicked node.

Example: [Dynamically adding and removing nodes in a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/dynamically-adding-and-removing-nodes-in-a-force-directed-tr/). Its code: get_example(path: "examples/docs-demos/dynamically-adding-and-removing-nodes-in-a-force-directed-tr").

Please note, that if node did not previously had any child nodes, and thus had a value of its own (not a sum of child values), we would want to remove it's own value before adding children:

TypeScript:

```ts
dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);
```

JavaScript:

```js
dataItem.set("value", undefined);
dataItem.set("valueWorking", undefined);
```

## Updating node values

Similarly, we can also change node values:

TypeScript:

```ts
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);
```

JavaScript:

```js
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);
```

If our series uses `colorField`, we can also update `fill` setting of the data item, as well as related graphical element, such as circle on a Force-directed series:

TypeScript:

```ts
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));
```

JavaScript:

```js
dataItem.set("value", 20);
dataItem.set("valueWorking", 20);

dataItem.set("value", am5.color(0xff0000));
dataItem.set("valueWorking", am5.color(0xff0000));
```

Example: [Dynamically changing node values on a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/dynamically-changing-node-values-on-a-force-directed-tree/). Its code: get_example(path: "examples/docs-demos/dynamically-changing-node-values-on-a-force-directed-tree").

## Removing nodes

To remove a node without updating the whole data set, use series' method `disposeDataItem()`:

TypeScript:

```ts
series.disposeDataItem(dataItem);
```

JavaScript:

```js
series.disposeDataItem(dataItem);
```

The below demo will remove any clicked node:

Example: [Removing nodes from a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/removing-nodes-from-a-force-directed-tree/). Its code: get_example(path: "examples/docs-demos/removing-nodes-from-a-force-directed-tree").

## Looking up a nodes

If we need to find a specific node instance by its name, we can find it in the series' node list.

Here's a handy function:

TypeScript:

```ts
function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}
```

JavaScript:

```js
function findNode(name) {
  return series.nodes.values.find(function(node) {
    return node.dataItem.get("category") == name;
  })
}
```

## Toggling nodes

To expand a node, we can use series method `enableDataItem(dataItem)`.

Similarly, to collapse a node, use `disableDataItem(dataItem)`.

The following example finds and collapses "Fruity" node as well as expands the one called "Other":

TypeScript:

```ts
// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);
```

JavaScript:

```js
// Collapse "Fruity" node
series.disableDataItem(findNode("Fruity").dataItem);

// Expand "Other node
series.enableDataItem(findNode("Other").dataItem);
```

Example: [Removing nodes from a Force-Directed Tree](https://docs.amcharts.com/embeds/v5/removing-nodes-from-a-force-directed-tree-2/). Its code: get_example(path: "examples/docs-demos/removing-nodes-from-a-force-directed-tree-2").
