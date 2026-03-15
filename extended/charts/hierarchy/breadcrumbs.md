---
title: "Breadcrumb navigation"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/breadcrumbs/"
scraped: "2026-03-15"
---

Breadcrumb bar is a control helps with the drill-down navigation of hierarchy charts. This tutorial looks at how we can configure it.

## Adding

Breadcrumb control is instantiated via `[BreadcrumbBar](https://www.amcharts.com/docs/v5/reference/breadcrumbbar/)` class's `new()` method.

Like any other element or control, we can just add to the main chart's container.

Since we want control to appear on top, we are going to use `unshift()` method rather than `push()` which would make it appear on the bottom.

container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

## Relation to series

Breadcrumb control needs an actual hierarchy series to work.

It will use its active node to display current selection, as well as the whole path (breadcrumbs) from the very top.

As per code snipped above, we supply series to control using its `series` setting.

## Links

### Configuring links

To configure links in the path, we can use breadcrumb bar's `labels.template`.

It accepts any [`Label` setting](https://www.amcharts.com/docs/v5/reference/label/#Settings).

let nav = container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

// Normal links
nav.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});

// Apply color on hover
nav.labels.template.states.create("hover", {
  fill: am5.color(0xff8888)
});
  
// Apply color on press down
nav.labels.template.states.create("down", {
  fill: am5.color(0x88ff88)
});

var nav = container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

// Normal links
nav.labels.template.setAll({
  fontSize: 20,
  fill: am5.color(0x888888)
});

// Apply color on hover
nav.labels.template.states.create("hover", {
  fill: am5.color(0xff8888)
});
  
// Apply color on press down
nav.labels.template.states.create("down", {
  fill: am5.color(0x88ff88)
});

### Handling events

We can also attach [event handlers](https://www.amcharts.com/docs/v5/concepts/events/) to links via their template:

let nav = container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

nav.labels.template.events.on("click", function(ev) {
  console.log(ev.target.dataItem);
});

var nav = container.children.unshift(
  am5hierarchy.BreadcrumbBar.new(root, {
    series: series
  })
);

nav.labels.template.events.on("click", function(ev) {
  console.log(ev.target.dataItem);
});
