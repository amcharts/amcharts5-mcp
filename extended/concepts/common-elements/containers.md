---
title: "Containers"
source: "https://docs.amcharts.com/v5/concepts/common-elements/containers/"
scraped: "2026-11-25"
---

A container is an element that can have child elements as well as a background. Most of the elements on a chart are containers. The chart itself is also a container.

## Root container

When we create a root element it comes with a container of itself.

Any top-level element - e.g. chart - will need to go into that root container as a child.

Root container is accessible by `root.container`.

## Children

### Adding

To add a child to a container, all we need to do is `push()` it into `children` list.

Here's how we'd add a footnote label to a chart:

TypeScript:

```ts
let footnote = chart.children.push(am5.Label.new(root, {
  text: "Copyright 2021 amCharts"
});
```

JavaScript:

```js
var footnote = chart.children.push(am5.Label.new(root, {
  text: "Copyright 2021 amCharts"
});
```

### Ordering

Using `push()` method will add a child at the end of the child list. If container has a layout set it will be drawn last.

To put it in the first position, we can use `unshift()` instead.

Or, if we want to be super precise, we can use `insertIndex()` which accepts first parameter an index.

Using `insertIndex(0, ...)` is equovalent to `unshift(...)`.

## Layout

### Setting layout

Container's `layout` setting affects how child elements in it are arranged.

It can be either vertical, horizontal, grid, or none.

A layout is represented by an object, accessible visa root properties.

| Layout instance         | Comment                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `root.horizontalLayout` | Child elements are displayed in a row.                                                                             |
| `root.verticalLayout`   | Child elements are displayed stacked vertically.                                                                   |
| `root.gridLayout`       | Child elements are displayed in a grid of columns, and can form multiple rows.                                     |
| Not set                 | Child elements are placed at whatever `x` and/or `y` setting are set for them, or at upper-left corner if not set. |

Setting layout might affect the look of the chart setup, such as where [chart's legend is placed](https://docs.amcharts.com/v5/concepts/legend/#positioning).

TypeScript:

```ts
let chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);
```

![Circles in a single row across the container, the last one cut off](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/chrome_2021-07-29_17-02-22.png "`layout: root.horizontalLayout`")

![Circles in a single column down the container, the last one cut off](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-29_17-02-37.png "`layout: root.verticalLayout`")

![Circles in a grid, three in the first row and one wrapped to the second](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-29_17-02-48.png "`layout: root.gridLayout`")

![Circles stacked on top of each other in the container's top-left corner](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-29_17-02-58.png "`layout` not set (default)")

Example: [Basic containers](https://docs.amcharts.com/embeds/v5/basic-containers/). Its code: get_example(path: "examples/docs-demos/basic-containers").

### Grid

Gird layout is special, because it accepts some configuration options.

Those are:

* `maxColumns` - maximum number of columns to allow in the grid.
* `fixedWidthGrid` - if set to `true` will make all columns equal in width, as opposed to best fit.

Since we don't want to modify a global instance of the grid layout (it may be used by other chart elements), we will need to create a unique instance of `GridLayout` specifically for the target container:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: am5.GridLayout.new(root, {
    maxColumns: 3,
    fixedWidthGrid: true
  })
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: am5.GridLayout.new(root, {
    maxColumns: 3,
    fixedWidthGrid: true
  })
}));
```

![Squares of different sizes in a grid of five best-fit columns](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-30_09-09-47.png "(Default) | `maxColumns: undefined` | `fixedWidthGrid: false`")

![Squares of different sizes in a grid of three best-fit columns](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-30_09-10-06.png "`maxColumns: 3` | `fixedWidthGrid: false`")

![Squares of different sizes in a grid of three equal-width columns](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-30_09-10-16.png "`maxColumns: 3` | `fixedWidthGrid: true`")

![Squares of different sizes in a grid of two equal-width columns](https://docs.amcharts.com/v5/images/concepts/common-elements/containers/2021-07-30_09-12-58.png "`maxColumns: 2` | `fixedWidthGrid: true`")

Example: [Grid layout of the container](https://docs.amcharts.com/embeds/v5/grid-layout-of-the-container/). Its code: get_example(path: "examples/docs-demos/grid-layout-of-the-container").

### Right to left

Since version 5.22.0, a container's `direction: "rtl"` makes a horizontal or grid layout place the children from right to left:

TypeScript:

```ts
let container = root.container.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  direction: "rtl"
}));
```

JavaScript:

```js
var container = root.container.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  direction: "rtl"
}));
```

* It's a mirror image of the default `"ltr"`, margins included: a child's `marginLeft` ends up on its right.
* A grid's rows still go from top to bottom.
* A container with a width of its own starts at its right edge. One sized by its content keeps its size.
* A vertical layout isn't affected.
* Not set, a legend follows the [root element's `direction`](https://docs.amcharts.com/v5/getting-started/root-element/#text-direction), and a legend's items follow their legend. Other containers are left to right.

To reverse the order of the children instead, use `reverseChildren: true`.

For legends and labels in right-to-left languages, see "[Right-to-left support](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/)".

## Background

### Standalone elements

Containers do not have any background by default. To add one, we will need to container's `background` setting to an instance of a `Rectangle` (or `RoundedRectangle`).

TypeScript:

```ts
let chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    background: am5.Rectangle.new(root, {
      fill: am5.color(0xff5599),
      fillOpacity: 0.2
    })
  }) 
);
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    background: am5.Rectangle.new(root, {
      fill: am5.color(0xff5599),
      fillOpacity: 0.2
    })
  }) 
);
```

### Templates

Objects like backgrounds will not be copied over to new elements from a template, so we will need to set them up using `setup()` method of the template:

TypeScript:

```ts
yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0xff0000)
  }))
}
```

JavaScript:

```js
yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0xff0000)
  }))
}
```

> **Important:** The `template.setup` needs to be set **before** any data is set on the the series. More info [here](https://docs.amcharts.com/v5/concepts/settings/list-templates/#setup-handler).

## Masks

Container contents can be constricted to any shape using its `mask` setting.

Mask can be any element of type `Graphics`, e.g. a `Circle`, `Rectangle`, or any custom shape.

TypeScript:

```ts
chart.set("mask", am5.Star.new(root, {
  radius: 200,
  innerRadius: 150,
  spikes: 20,
  fill: am5.color(0x000000),
  x: am5.percent(50),
  y: am5.percent(50)
}));
```

JavaScript:

```js
chart.set("mask", am5.Star.new(root, {
  radius: 200,
  innerRadius: 150,
  spikes: 20,
  fill: am5.color(0x000000),
  x: am5.percent(50),
  y: am5.percent(50)
}));
```

The above will display a star-shaped pie chart:

Example: [Pie chart with a custom mask](https://docs.amcharts.com/embeds/v5/pie-chart-with-a-custom-mask/). Its code: get_example(path: "examples/docs-demos/pie-chart-with-a-custom-mask").

## Scrollbar

If container's contents do not fit into its height, we can enable scrolling by setting its `verticalScrollbar` instance of a `Scrollbar`:

TypeScript:

```ts
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.verticalLayout,
  height: am5.percent(100),
  verticalScrollbar: am5.Scrollbar.new(root, {
    orientation: "vertical"
  })
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.verticalLayout,
  height: am5.percent(100),
  verticalScrollbar: am5.Scrollbar.new(root, {
    orientation: "vertical"
  })
}));
```

> **Note:** Please note that `height` needs to be set for this to work properly.

Example: [Pie chart with scrollable legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-scrollable-legend/). Its code: get_example(path: "examples/docs-demos/pie-chart-with-scrollable-legend").

## Zoomable container

There's also a special version of a Container: `ZoomableContainer`.

We can use it to make any chart content zoomable.

### Creating a zoomable container

`ZoomableContainer` is similar to a regular `Container` with a couple of important restrictions:

* It needs to be a top-most child of the Root container.
* Zoomable contents must go into its `contents.children` rather than `children`.

TypeScript:

```ts
let zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100
  })
);

let series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "name"
}));
```

JavaScript:

```js
var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100
  })
);

var series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "name"
}));
```

### Zoom functionality

Zoom in a zoomable container can be can be controlled via mouse wheel, pinch-zoom, API functions, or a zoom tools.

Both wheel and pinch-zoom are enabled by default.

To disable them, we can use `wheelable` and `pinchZoom` settings respectively:

TypeScript:

```ts
let zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: false,
    pinchZoom: false
  })
);
```

JavaScript:

```js
var zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: false,
    pinchZoom: false
  })
);
```

### Zoom tools

To add zoom tools, we can use a bundled `ZoomTools` class:

TypeScript:

```ts
let zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
  target: zoomableContainer
}));
```

JavaScript:

```js
var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
  target: zoomableContainer
}));
```

### Zoom API

Finally, zoomable container provides some methods to control zoom level and position:

| Method                          | Comment                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `zoomToPoint(point, zoomLevel)` | Pans to specific X/Y point and zooms to specific level. |
| `zoomIn()`                      | Zooms in the container.                                 |
| `zoomOut()`                     | Zooms out the container.                                |
| `goHome()`                      | Resets containers position and zoom level to initial.   |

### Example

Example: [Zoomable Force-Directed Tree](https://docs.amcharts.com/embeds/v5/zoomable-force-directed-tree/). Its code: get_example(path: "examples/docs-demos/zoomable-force-directed-tree").

## Related tutorials

* [Dynamically adding charts to the same Root](https://docs.amcharts.com/v5/tutorials/dynamically-adding-charts-to-the-same-root/)
