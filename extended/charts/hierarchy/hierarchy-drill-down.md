---
title: "Hierarchy drill-down"
source: "https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/"
scraped: "2026-11-25"
---

Hierarchy nodes that have children are clickable. When that happens a node will drill down or up, depending on hierarchy type and its settings.

## Active nodes

When a node is clicked/tapped it becomes active. It then perform an action that is associated with activating a node, e.g. exploding a branch of children, or zooming in.

When an active node is clicked, it performs a drill-up action, e.g. zooms in on a parent, collapses children branch, etc.

The exact behavior differs from series to series.

## Linked hierarchies

Linked hierarchies are: `ForceDirected` and `Tree`.

An "active" node in a tree is considered one that has a branch of its children expanded.

If children branch is collapsed, node is considered "inactive".

### Drill-down

When user clicks on an "inactive" node, it will expand a branch of its children.

How many levels of children are shown is controlled by series' `downDepth` setting.

Setting it to `Infinity` will ensure that the whole branch of descendants of the clicked node is revealed. However, that might not be the best choice for deep hierarchies.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Drill-up

When "active" node is clicked, the whole branch of its children is collapsed.

### Limiting to single branch

Normally, a user can open and close any number of branches at will.

We can limit number of branches open at any given time to one by setting series' `singleBranchOnly` to `true`.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

Example: [Force-directed chart](https://docs.amcharts.com/embeds/v5/force-directed-chart-2/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-2").

## Regular hierarchies

Regular hierarchies are: `Treemap`, `Sunburst`, `Pack`, and `Partition`.

In a regular hierarchies, an "active" node is the one that was clicked last.

### Drill-down

When a node that is not currently "active" is clicked, these things might happen:

* Series zooms in on the clicked node making it take up the whole width or circumference of the series.
* Child nodes are revealed if they are currently not visible.

The setting `downDepth` controls how many levels of children to reveal when node is activated.

It may also display a few levels of its parents as well. For that we have another setting: `upDepth`.

For example, if we set both `downDepth` and `upDepth` to `1` (one) on a sunburst series, we will get 3 rings when clicked on a node (slice):

* Inner ring: parent node.
* Middle ring: active node.
* Outer ring: immediate children of the active node.

TypeScript:

```ts
var series = container.children.push(
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    upDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.Sunburst.new(root, {
    downDepth: 1,
    upDepth: 1,
    initialDepth: 2,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);
```

### Drilling one level per click

A click selects the node under the pointer. When several levels are shown, e.g. a treemap with countries inside regions, that's the inner node, so the chart skips the level in between: a click on a country tile opens the country, not its region.

To drill one level at a time, either:

* Show one level at a time: `initialDepth: 0` (with `topDepth: 1`, only the regions are shown). Each click then opens the next level.
* Or keep the nested view and replace the click handler with one that selects the node one level below the current one:

TypeScript:

```ts
// For a treemap; other series use their own data item type
type TreemapItem = am5.DataItem<am5hierarchy.ITreemapDataItem>;

series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", (ev) => {
  const dataItem = ev.target.dataItem as TreemapItem;
  const selectedItem = series.get("selectedDataItem");

  // Walk up to the node one level below the current one
  let item: TreemapItem | undefined = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent") as TreemapItem | undefined;
  }

  if (!item) {
    // The current node itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});
```

JavaScript:

```js
series.nodes.template.set("toggleKey", "none");

series.nodes.template.events.on("click", function(ev) {
  var dataItem = ev.target.dataItem;
  var selectedItem = series.get("selectedDataItem");

  // Walk up to the node one level below the current one
  var item = dataItem;
  while (item && item.get("parent") !== selectedItem) {
    item = item.get("parent");
  }

  if (!item) {
    // The current node itself was clicked: go up a level
    series.selectDataItem(dataItem);
  }
  else if (item.get("children")) {
    series.selectDataItem(item);
  }
});
```

Example: [Treemap with parent headers and one-level drill-down](https://docs.amcharts.com/embeds/v5/treemap-parent-headers/). Its code: get_example(path: "examples/docs-demos/treemap-parent-headers").

### Drill-up

Clicking active node again, will drill the series one level up.

### Top-level node

Clicking root top-level active root node will reset the chart to the same position as it was on initial load: according to `initialDepth`.

Example: [Sunburst chart](https://docs.amcharts.com/embeds/v5/sunburst-chart/). Its code: get_example(path: "examples/docs-demos/sunburst-chart").

## Disabling drill-down

To disable toggle behavior on a node, in all hierarchy charts, all we need to do is to reset `toggle` key for node template, as well as resetting pointer cursor:

TypeScript:

```ts
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});
```

JavaScript:

```js
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});
```

## Toggling on double-click

If we would like to disable default click toggling functionality (for example for doing something else on click) and rather toggle nodes on double-click, we can use the code above as well as add our own handler for `"dblclick"` event:

TypeScript:

```ts
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});
```

JavaScript:

```js
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});
```

## Drill-down to external URLs

We can also set up external URLs to be opened when hierarchy nodes are clicked.

For that we'll need two things:

* [Disable built-in drill-down](https://docs.amcharts.com/v5/charts/hierarchy/hierarchy-drill-down/#disabling-drill-down) behavior (section above).
* Attach `click` event to nodes that would open new window/tab/etc.

TypeScript:

```ts
// Disable collapsing/exploding of nodes
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

// Add click events to nodes
series.nodes.template.events.on("click", function(ev) {
  var data = ev.target.dataItem.dataContext;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(data.name + " coffee");
  window.open(url)
});
```

JavaScript:

```js
// Disable collapsing/exploding of nodes
series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

// Add click events to nodes
series.nodes.template.events.on("click", function(ev) {
  var data = ev.target.dataItem.dataContext;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(data.name + " coffee");
  window.open(url)
});
```

Example: [Open an URL on force-directed node click](https://docs.amcharts.com/embeds/v5/open-an-url-on-force-directed-node-click/). Its code: get_example(path: "examples/docs-demos/open-an-url-on-force-directed-node-click").

## API

### Triggering drill-down

It's also possible to trigger drill-down/up via API, using series' `selectDataItem()` method.

It accepts a single parameter - a data item of the node we want to drill-down into.

Here's a function that finds a data item using its name (category), then drills down into it:

TypeScript:

```ts
function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

JavaScript:

```js
function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}
```

Example: [Drill-Down Sunburst Chart via API](https://docs.amcharts.com/embeds/v5/drill-down-sunburst-chart-via-api/). Its code: get_example(path: "examples/docs-demos/drill-down-sunburst-chart-via-api").

### Registering events

If we need which node is being selected, we can do so via series' `dataitemselected` event:

TypeScript:

```ts
series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});
```

JavaScript:

```js
series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});
```
