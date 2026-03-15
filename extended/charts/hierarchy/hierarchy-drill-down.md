---
title: "Hierarchy drill-down"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-drill-down/"
scraped: "2026-03-15"
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

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

### Drill-up

When "active" node is clicked, the whole branch of its children is collapsed.

### Limiting to single branch

Normally, a user can open and close any number of branches at will.

We can limit number of branches open at any given time to one by setting series' `singleBranchOnly` to `true`.

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);

var series = container.children.push(
  am5hierarchy.ForceDirected.new(root, {
    downDepth: 1,
    singleBranchOnly: true,
    valueField: "value",
    categoryField: "name",
    childDataField: "children"
  })
);


## Regular hierarchies

Regular hierarchies are: `Treemap`, `Sunburst`, `Pack`, and `Partition`.

In a regular hierarchies, an "active" node is the one that was clicked last.

### Drill-down

When a node that is not currently "active" is clicked, these things might happen:

-   Series zooms in on the clicked node making it take up the whole width or circumference of the series.
-   Child nodes are revealed if they are currently not visible.

The setting `downDepth` controls how many levels of children to reveal when node is activated.

It may also display a few levels of its parents as well. For that we have another setting: `upDepth`.

For example, if we set both `downDepth` and `upDepth` to `1` (one) on a sunburst series, we will get 3 rings when clicked on a node (slice):

-   Inner ring: parent node.
-   Middle ring: active node.
-   Outer ring: immediate children of the active node.

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

### Drill-up

Clicking active node again, will drill the series one level up.

### Top-level node

Clicking root top-level active root node will reset the chart to the same position as it was on initial load: according to `initialDepth`.


## Disabling drill-down

To disable toggle behavior on a node, in all hierarchy charts, all we need to do is to reset `toggle` key for node template, as well as resetting pointer cursor:

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

## Toggling on double-click

If we would like to disable default click toggling functionality (for example for doing something else on click) and rather toggle nodes on double-click, we can use the code above as well as add our own handler for `"dblclick"` event:

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default"
});

series.nodes.template.events.on("dblclick", function(ev) {
  ev.target.set("disabled", !ev.target.get("disabled"));
  series.selectDataItem(ev.target.dataItem);
});

## Drill-down to external URLs

We can also set up external URLs to be opened when hierarchy nodes are clicked.

For that we'll need two things:

-   [Disable built-in drill-down](https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-drill-down/#Disabling_drill_down) behavior (section above).
-   Attach `click` event to nodes that would open new window/tab/etc.

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


## API

### Triggering drill-down

It's also possible to trigger drill-down/up via API, using series' `[selectDataItem()](https://www.amcharts.com/docs/v5/reference/sunburst/#selectDataItem_method)` method.

It accepts a single parameter - a data item of the node we want to drill-down into.

Here's a function that finds a data item using its name (category), then drills down into it:

function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}

function drillTo(name) {
  series.nodes.each(function(node) {
    if (node.dataItem.get("category") == name) {
      series.selectDataItem(node.dataItem);
    }
  });
}


### Registering events

If we need which node is being selected, we can do so via series' `dataitemselected` event:

series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});

series.events.on("dataitemselected", function(ev) {
  console.log(ev.dataItem.dataContext);
});
