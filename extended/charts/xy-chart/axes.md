---
title: "Axes"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/"
scraped: "2026-11-16"
---

This tutorial looks into how to get the most of the axes on an XY chart.

## Adding axes

Creating axes, assigning them to charts and series, as well as the concept of axis renderer is explained in the the "[Adding axes](https://docs.amcharts.com/v5/charts/xy-chart/#adding-axes)" section of the main "XY Chart" article.

This tutorial will look into various ways we can configure the axes.

## Grid

### Grid lines

Grid lines are configured using grid template accessible via axis renderer's grid template: `grid.template`.

It's a `Template` object, which allows specifying settings, events, and adapters for each new grid line created for the axis.

To specify settings we can use template's `set()` method (to set single key) or `setAll()` method (to set a bunch of keys all at once):

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.grid.template.setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2
});
```

JavaScript:

```js
var yRenderer = yAxis.get("renderer");
yRenderer.grid.template.setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2
});
```

The above will make Y axis grid lines 2px wide red.

Or, if we want to modify grid lines for all axes all at once, we can create a [quick theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme):

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Grid").setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Grid").setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2
});

root.setThemes([
  myTheme
]);
```

### Base grid

There is no template for base grid line - a grid line that is displayed on a zero value.

Should we like to modify it, we'll need to either create a custom theme, or create a [quick theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme):

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 1
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 1
});

root.setThemes([
  myTheme
]);
```

### Axis line

The actual axis line is represented by the axis renderer itself. That means if we need to configure the appearance of it, we need to use renderers visual settings to do it.

TypeScript:

```ts
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 1,
      strokeWidth: 2
    })
  })
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 1,
      strokeWidth: 2
    })
  })
);
```

### Grid above series

Normally, grid is drawn behind series.

If we'd like it to be drawn above, we can simply move chart's `gridContainer` to front:

TypeScript:

```ts
chart.gridContainer.toFront();
```

JavaScript:

```js
chart.gridContainer.toFront();
```

### Grid density

We can control how densely packed together grid lines (as well as related ticks and labels) are using axis renderer's `minGridDistance` setting.

Basically, it means "minimum distance in pixels between any two grid lines". The axis will adjust its scale, number of grid lines, and their position to accommodate this setting.

TypeScript:

```ts
let yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 20
    }) 
  }) 
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 20
    }) 
  }) 
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_false.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/grid_distance_50.png "`minGridDistance: 50`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/grid_distance_20.png "`minGridDistance: 20`")

### Fitting labels

Since version 5.22.0, a renderer's `autoLabels` arranges the labels to fit the chart:

TypeScript:

```ts
let xRenderer = am5xy.AxisRendererX.new(root, {
  autoLabels: true
});
```

JavaScript:

```js
var xRenderer = am5xy.AxisRendererX.new(root, {
  autoLabels: true
});
```

* Labels never come closer than their own size. A short axis gets more labels than `minGridDistance` would leave, up to about eight.
* A category axis shows every label that fits. When only some fit, each stays in the middle of its category.
* A label that would be cut off at the edge of the chart, or overlap another axis's labels, is hidden. A value axis gives way to a category or date axis.

The [`ResponsiveMax` theme](https://docs.amcharts.com/v5/concepts/responsive-max/) turns it on for every axis.

### Minor grid

#### Enabling minor grid

We can re-enable display of grid lines that were skipped due to the lack of space according to `minGridDistance` setting in an axis renderer.

To do that, we can set renderer's `minorGridEnabled: true` setting (since `5.6.0`).

TypeScript:

```ts
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 100,
      minorGridEnabled: true
    })
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 100,
      minorGridEnabled: true
    })
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/minor_grid_on-1024x782.png "`minorGridEnabled: true`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/minor_grid_off-1024x782.png "`minorGridEnabled: false` (default)")

#### Enabling minor grid labels

Similarly to minor grid enabling via `minorGridEnabled`, we can enable its labels via `minorLabelsEnabled` setting.

> **Note:** Enabling minor labels will automatically enable minor grid, even if `minorGridEnabled` is not set.

TypeScript:

```ts
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 100,
      minorGridEnabled: true,
      minorLabelsEnabled: true
    })
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 100,
      minorGridEnabled: true,
      minorLabelsEnabled: true
    })
  })
);
```

#### Styling minor grid and labels

Minor grid is styled using the same settings as the regular grid, which can be applied [via templates or themes](https://docs.amcharts.com/v5/charts/xy-chart/axes/#grid-lines).

This means that any setting, applied to regular grid will apply to minor grid, too.

The only difference is that minor grid has a slightly `strokeOpacity` set by default.

If we want to change the default opacity of the minor grid, or we want to use some other settings that would apply only to minor grid, we can use a custom theme:

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["minor"])).setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2,
  strokeOpacity: 0.05
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["minor"])).setAll({
  stroke: am5.color(0xFF0000),
  strokeWidth: 2,
  strokeOpacity: 0.05
});

root.setThemes([
  myTheme
]);
```

Similarly, minor grid labels will inherit all the settings for regular labels.

The only difference is that minor labels have a different default value of `fontSize` (`0.6em`).

Again, overriding their settings, would require a custom theme:

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel", ["minor"])).setAll({
  fill: am5.color(0xFF0000),
  fontSize: 10
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel", ["minor"])).setAll({
  fill: am5.color(0xFF0000),
  fontSize: 10
});

root.setThemes([
  myTheme
]);
```

## Ticks

Like many axis elements, ticks are configurable by accessing their template on the renderer: `ticks.template`.

Please note, that ticks are disabled by default, so we will need to set their `visible` setting to `true` in order for them to appear:

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  stroke: am5.color(0xFF0000),
  visible: true
});
```

JavaScript:

```js
var yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  stroke: am5.color(0xFF0000),
  visible: true
});
```

Naturally, we can do that by creating a custom theme as well:

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("AxisTick").setAll({
  stroke: am5.color(0xFF0000),
  visible: true
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("AxisTick").setAll({
  stroke: am5.color(0xFF0000),
  visible: true
});

root.setThemes([
  myTheme
]);
```

## Labels

### Label appearance

Labels too have a template in axis renderer: `labels.template`. We can use that to set appearance settings, as well as other stuff like adapters, that modify label content.

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.labels.template.setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});
```

JavaScript:

```js
let yRenderer = yAxis.get("renderer");
yRenderer.labels.template.setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});
```

Or, via custom quick theme, to apply settings to all axes at once:

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("AxisLabel").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes([
  myTheme
]);
```

### Label background

Setting `background` on a label template won't work as complex objects are not copied over to template clones.

For that we'll need to use template's `setup()` method. For more information, refer to "[Containers: Background](https://docs.amcharts.com/v5/concepts/common-elements/containers/#templates)" tutorial.

### Label format

Some axis types (e.g. value axis or date axis) will apply formatting to their labels. This is described in greater details in their respective tutorials: "[Value axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/value-axis/)" and "[Date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/)".

### Label rotation

In some cases, when there are more labels to fit them nicely, we can rotate them. An axis can accommodate more labels if they are rotated to vertical or diagonal.

We can use a `rotation` setting on an axis' label template to set the angle at which to rotate the angle.

Please note, that rotation is applied around "center" of an element, which is defined by its `centerX` and `centerY` settings.

In case of axis' labels, their `centerY` is set to top (0%). If would leave it like that, the rotated labels would appear off-center, so we need to to reset it to 50%, so that they are rotated against label's vertical center:

TypeScript:

```ts
let xRenderer = xAxis.get("renderer");
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50
});
```

JavaScript:

```js
var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50
});
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_label_rotation_0.png "`rotation: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_label_rotation_-90.png.png "`rotation: -90`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_label_rotation_-90_centered.png.png "`rotation: -90` | `centerY: am5.p50`")

Example: [Rotated axis labels](https://docs.amcharts.com/embeds/v5/rotated-axis-labels/). Its code: get_example(path: "examples/docs-demos/rotated-axis-labels").

Here's how the rotation works with out default centering options:

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/2018-06-17_09-39-18.gif "`centerX: am5.p50` (50% - middle) | `centerY: am5.p0` (0% - top)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/2018-06-17_09-49-07.gif "`centerX: am5.p0` (0% - left) | `centerY: am5.p50` (50% - middle)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/2018-06-17_09-46-01.gif "`centerX: am5.p50` (50% - middle) | `centerY: am5.p50` (50% - middle)")

## Location of axis elements

We can control where axis elements (grid, ticks, labels, bullets) are displayed in relation to the axis cell they represent.

An axis cell is a logical increment, e.g. a day on a date axis, or a category on a category axis.

### Basic location

Each axis element has a setting `location` which is a relative number from `0` (zero) meaning the start of the cell to `1` (one) denoting end of the cell.

So, if we'd like our grid to to be displayed in the middle of the cell, rather than default start position, we would set `location` to `0.5`:

TypeScript:

```ts
let xRenderer = xAxis.get("renderer");
xRenderer.grid.template.setAll({
  location: 0.5
});
```

JavaScript:

```js
var xRenderer = xAxis.get("renderer");
xRenderer.grid.template.setAll({
  location: 0.5
});
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_false.png "`location: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/grid_location_middle.png "`location: 0.5`")

### Multi-location

In some cases, in order to prevent chart to become to crammed with grid and labels, the axis will start skipping grid lines, and displaying every second, third, fourth, etc. grid line.

This is called multi-location scenario.

For such scenarios axis labels and ticks have an additional setting: `multiLocation`.

It basically acts as a `location` except it is used only in situations where grid lines are being skipped, so that we can apply different positioning of those elements.

TypeScript:

```ts
let xRenderer = xAxis.get("renderer");
xRenderer.ticks.template.setAll({
  location: 0.5,
  multiLocation: 0,
  visible: true
});
```

JavaScript:

```js
var xRenderer = xAxis.get("renderer");
xRenderer.ticks.template.setAll({
  location: 0.5,
  multiLocation: 0,
  visible: true
});
```

The above will make axis tick appear in the middle of the cell when all grid lines are visible, but will move it to the start when chart starts skipping grid.

### Location on a weekly Date axis

A `DateAxis` with weekly data granularity (`baseInterval` set to `"week"`) is a special case. Due to internal reasons, it still uses days for calculation of cell width, so therefore `location` must be adjusted for that.

For example, if we would like to position the label at the center of the week, we would need to label's `location: 3.5` (instead of `0.5`).

### Related label tutorials

* [Axis labels on base line](https://docs.amcharts.com/v5/tutorials/axis-labels-on-base-line/)
* [Show range of dates in a multi-interval DateAxis label](https://docs.amcharts.com/v5/tutorials/show-range-of-dates-in-a-multi-interval-dateaxis-label/)

## Start/end labels and ticks

Normally, all axis labels and ticks are shown, even those at the very start and end of the axis.

We can set a "no go" zone on either end of the axis using label or ticks template's `minPosition` and `maxPosition` settings.

It's a relative numeric value where `0` (zero) means start of the axis, and `1` (end).

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  minPosition: 0.1,
  maxPosition: 0.9,
  visible: true
});
yRenderer.labels.template.setAll({
  minPosition: 0.1,
  maxPosition: 0.9
});
```

JavaScript:

```js
let yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  minPosition: 0.1,
  maxPosition: 0.9,
  visible: true
});
yRenderer.labels.template.setAll({
  minPosition: 0.1,
  maxPosition: 0.9
});
```

The above ensures that no label or tick is shown closer than 10% to either ends of the axis.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_false.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/min_max_position.png "`minPosition` and `maxPosition` set")

### Keeping labels in view

A label placed inside its cell, e.g. at `location: 0.5`, is hidden when that point leaves the plot area, as with the first or last month on a zoomed date axis. Since version 5.22.0, `keepInView` moves it into the part of the cell that's still in view instead:

TypeScript:

```ts
let xRenderer = xAxis.get("renderer");
xRenderer.labels.template.set("keepInView", true);
```

JavaScript:

```js
var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.set("keepInView", true);
```

* It works for labels placed inside their cell, with `location` or `multiLocation` between `0` and `1`, e.g. `0.5`. See "[Location of axis elements](https://docs.amcharts.com/v5/charts/xy-chart/axes/#location-of-axis-elements)".
* Labels on grid lines, value axis labels and rotated labels aren't affected.
* A label is still hidden where the part of its cell in view is too short for it.
* Gantt charts have it on for their date labels.

![Date axis zoomed from mid-November to mid-December, with only the Nov label](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/keep_in_view_off.png "Default: December runs on out of view, and its label is hidden")

![The same axis with keepInView: Nov and Dec labels](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/keep_in_view_on.png "`keepInView: true`")

## Labels/ticks inside plot area

We can make the axis display its labels and ticks inside plot area instead of outside by setting `inside` to `true` either on respective templates (`labels.template` and/or `ticks.template`):

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  inside: true,
  visible: true
});
yRenderer.labels.template.setAll({
  inside: true
});
```

JavaScript:

```js
let yRenderer = yAxis.get("renderer");
yRenderer.ticks.template.setAll({
  inside: true,
  visible: true
});
yRenderer.labels.template.setAll({
  inside: true
});
```

Alternatively, we can set it directly on axis renderer:

TypeScript:

```ts
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      inside: true
    })
  })
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      inside: true
    })
  })
);
```

## Inversed axes

Normally, the axes start from lower-left corner of the XY chart.

Setting axis renderer's `inversed` setting to `true` will flip the scale of the axis, and all associated series accordingly:

TypeScript:

```ts
let yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true
    }) 
  }) 
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true
    }) 
  }) 
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_false.png "Regular axis")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_true.png "Inversed axis")

## Axis position

By default, vertical axes are displayed to the left of the plot area, whereas horizontal ones are displayed below.

We can move the axis to the other side of the plot area by setting `opposite` to `true` on in the settings of their renderer:

TypeScript:

```ts
let yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      opposite: true
    }) 
  }) 
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push( 
  am5xy.ValueAxis.new(root, { 
    renderer: am5xy.AxisRendererY.new(root, {
      opposite: true
    }) 
  }) 
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/xy_axis_inversed_false.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/opposite_axis.png "`opposite: true`")

## Cell start/end locations

Axis makes all the width/height of its cells available for series to use. This means that if we have column series with columns set to width at 100%, they will take up the whole width of each cell.

We can control this available space using axis renderer's `cellStartLocation` and `cellEndLocation` settings.

Both are relative numbers with `0` (zero) indicating start of the actual visible cell, and `1` (one) - the end.

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    }),
    categoryField: "category"
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    }),
    categoryField: "category"
  })
);
```

The above will restrict the space available for actual series to 60% of the actual cell.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/full_cell_width.png "Full cell width")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/cell_width_reduced.png "Cell start and end restricted")

## Axis start/end locations

Normally axis starts at the beginning of its first cell and ends at the end of the last one.

We can use axis' `startLocation` and `endLocation` to change it.

For example, if we'd like axis to start and end in the middle of the first and last cells, we'd set those settings to `0.5`:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    startLocation: 0.5,
    endLocation: 0.5
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, {}),
    startLocation: 0.5,
    endLocation: 0.5
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_endlocation1.png "(Default) | `startLocation: 0` | `endLocation: 1`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_endlocation08.png "`startLocation: 0.2` | `endLocation: 0.8`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_endlocation05.png "`startLocation: 0.5` | `endLocation: 0.5`")

Example: [Axis start and end locations](https://docs.amcharts.com/embeds/v5/axis-start-and-end-locations/). Its code: get_example(path: "examples/docs-demos/axis-start-and-end-locations").

## Axis bullets

#### Adding axis bullets

Along with grid, ticks, and labels an axis can also create bullets.

To set that up, we can use axis' `bullet` setting, which accepts function that returns an `AxisBullet` object.

The function will be called each time, an axis needs to create a bullet, that is for every grid location.

The function will receive 3 parameters:

* A reference to root element.
* A reference to the axis itself.
* Axis data item bullet is being created for.

TypeScript:

```ts
let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      })
    });
  }
}));
```

JavaScript:

```js
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      })
    });
  }
}));
```

The above will add a red circle for each category in a category axis.

We can also use the third parameter - data item - to dynamically modify content, i.e. `sprite` parameter of the bullet:

TypeScript:

```ts
let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: am5.Picture.new(root, {
        dy: 10,
        width: 24,
        height: 24,
        src: dataItem.dataContext.icon
      })
    });
  }
}));
```

JavaScript:

```js
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: am5.Picture.new(root, {
        dy: 10,
        width: 24,
        height: 24,
        src: dataItem.dataContext.icon
      })
    });
  }
}));
```

The above code will add an image to each category using information form actual data.

Example: [Strip count plot](https://docs.amcharts.com/embeds/v5/strip-count-plot/). Its code: get_example(path: "examples/docs-demos/strip-count-plot").

Axis bullets will be placed directly on the axis. If we would like to move those somewhere else, like for instance on top of plot container, we will need to adjust their `y` setting using an adapter:

TypeScript:

```ts
let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {
}),
  bullet: function (root, axis, dataItem) {
    let bullet = am5.Picture.new(root, {
      width: 24,
      height: 24,
      centerY: am5.p50,
      centerX: am5.p50,
      src: dataItem.dataContext.icon
    });
    
    bullet.adapters.add("y", function(y, target) {
      return -1 * chart.plotContainer.getPrivate("height");
    });
    
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: bullet
    });
  }
}));
```

JavaScript:

```js
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {
}),
  bullet: function (root, axis, dataItem) {
    var bullet = am5.Picture.new(root, {
      width: 24,
      height: 24,
      centerY: am5.p50,
      centerX: am5.p50,
      src: dataItem.dataContext.icon
    });
    
    bullet.adapters.add("y", function(y, target) {
      return -1 * chart.plotContainer.getPrivate("height");
    });
    
    return am5xy.AxisBullet.new(root, {
      location: 0.5,
      sprite: bullet
    });
  }
}));
```

Example: [Axis bullets on opposite side](https://docs.amcharts.com/embeds/v5/axis-bullets-on-opposite-side/). Its code: get_example(path: "examples/docs-demos/axis-bullets-on-opposite-side").

#### Stacked axis bullets

It's possible to make axis bullets stack on each other if they fall on the same base interval or category.

For that, we need to set `stacked: true` in axis bullet's settings:

TypeScript:

```ts
let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      stacked: true,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      })
    });
  }
}));
```

JavaScript:

```js
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {}),
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      stacked: true,
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xff0000)
      })
    });
  }
}));
```

## Axis fills

Gaps between each grid line can be made to be filled with a color. Those are called "axis fills" and can be configured using axis renderer's axis fill template: `axisFills.template`.

### Enabling fills

Similarly to ticks, fills are disabled by default, so we will need to enable by setting their `visible` to `true`.

TypeScript:

```ts
let yRenderer = yAxis.get("renderer");
yRenderer.axisFills.template.setAll({
  fill: am5.color(0xFF0000),
  fillOpacity: 0.1,
  visible: true
});
```

JavaScript:

```js
var yRenderer = yAxis.get("renderer");
yRenderer.axisFills.template.setAll({
  fill: am5.color(0xFF0000),
  fillOpacity: 0.1,
  visible: true
});
```

They can be modified/enabled by creating a quick theme, too:

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Graphics", ["axis", "fill"]).setAll({
  stroke: am5.color(0xFF0000),
  fillOpacity: 0.1,
  visible: true
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Graphics", ["axis", "fill"]).setAll({
  stroke: am5.color(0xFF0000),
  fillOpacity: 0.1,
  visible: true
});

root.setThemes([
  myTheme
]);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/normal_zoom.png "Axis fills disabled (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_fills.png "Axis fills enabled")

### Fill rules

By default, axis will enable fills for every second gab between grid lines.

We can change that by using axis' `fillRule` setting.

It is a function, which dynamically can modify fills `visible` setting (and possible other settings) based on some criteria.

The function receives axis data item as well as index, which can help it decide what to do with particular fill.

As an example, `fillRule` can be set to a function, that highlights weekends:

TypeScript:

```ts
let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  fillRule: function(dataItem) {
    const axisFill = dataItem.get("axisFill");
    const date = new Date(dataItem.get("value"));
    axisFill.setPrivate("visible", (date.getDay() == 6 || date.getDay() == 0));
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 20
  })
}));
```

JavaScript:

```js
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  fillRule: function(dataItem) {
    var axisFill = dataItem.get("axisFill");
    var date = new Date(dataItem.get("value"));
    axisFill.setPrivate("visible", (date.getDay() == 6 || date.getDay() == 0));
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 20
  })
}));
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/axis_fills_date_axis-1024x313.png "Custom fill rule on a date axis")

## Stacked axes

### Turning on stacking

If a chart has multiple axes on the same side, they are put into the same container and arranged so they are next to each other.

For example all Y-axes are put into chart's `leftAxesContainer` which has a layout of type "horizontal". That's why axes are put next to each other.

If we would like to stack axes vertically, all we need to do is to change the `layout` setting of the `leftAxesContainer`:

TypeScript:

```ts
chart.leftAxesContainer.set("layout", root.verticalLayout);
```

JavaScript:

```js
chart.leftAxesContainer.set("layout", root.verticalLayout);
```

The axes, including all the grid and related series will now occupy separate parts of the the plot area.

For more information about XY chart's containers, refer "[Layout and containers of the XY chart](https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/)" tutorial. For more about container layouts, please take a look at "[Containers: Layout](https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout)".

### Variable axis heights

Stacked axis will divide the available space equally between them.

If we need them to be different, we can use axis' `height` setting with percent values, e.g.:

TypeScript:

```ts
let yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

let yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);
```

JavaScript:

```js
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);
```

### Gaps between stacked axes

There normally is no gap between, two stacked axes.

The best way to put such gap between them, is to use [axis headers](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-headers/) with some or no information in them:

TypeScript:

```ts
yAxis1.axisHeader.children.push(am5.Label.new(root, {
  text: "Value",
  fontWeight: "500"
}));

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "500"
}));
```

JavaScript:

```js
yAxis1.axisHeader.children.push(am5.Label.new(root, {
  text: "Value",
  fontWeight: "500"
}));

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "500"
}));
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/multiaxes_nonstack.png "Regular multi-Y-axis setup")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/index/multiaxes_stacked.png "Stacked Y axes")

Example: [Stacked axes](https://docs.amcharts.com/embeds/v5/stacked-axes/). Its code: get_example(path: "examples/docs-demos/stacked-axes").

### Aligning stacked axes

Stacked are left-aligned by default.

If number scale are different across different axes, that might not look good on a left-side Y axis.

The solution is to right-align all axes, by using their `x` and `centerX` settings:

TypeScript:

```ts
let yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

let yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);
```

JavaScript:

```js
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);
```

Right-side axes do not need any modification because they are already left-aligned.

### Horizontally-stacked axes

It works the same way for horizontal axes, too.

The exception is that we will need to use `bottomAxesContainer` (or `topAxesContainer` if we have our axes on top) and we will need to set its layout to `root.horizontalLayout`.

## Axis title

Adding an axis title consists of creating a `Label` element, as well as pushing it into axis' `children` list.

TypeScript:

```ts
xAxis.children.push(
  am5.Label.new(root, {
    text: "GDP per Capita, USD",
    x: am5.p50,
    centerX:am5.p50
  })
);

yAxis.children.unshift(
  am5.Label.new(root, {
    rotation: -90,
    text: "Life expectancy, years",
    y: am5.p50,
    centerX: am5.p50
  })
);
```

JavaScript:

```js
xAxis.children.push(
  am5.Label.new(root, {
    text: "GDP per Capita, USD",
    x: am5.p50,
    centerX:am5.p50
  })
);

yAxis.children.unshift(
  am5.Label.new(root, {
    rotation: -90,
    text: "Life expectancy, years",
    y: am5.p50,
    centerX: am5.p50
  })
);
```

A few comments about the code above.

Notice how we do `push()` on an X axis, but `unshift()` on Y axis. There are other elements in the axis (lines, labels, etc.), and we need our title to be the last on bottom axis (hence `push()`) and for the left axis, we need it to be the first child, so it's left-most of the other elements (hence `unshift()`).

We also need to apply rotation of the label for the vertical axis, as well as properly position it using relative values for `x` or `y` and `centerX`.

Example: [XY scatter chart with heat rules on bullets](https://docs.amcharts.com/embeds/v5/xy-scatter-chart-with-heat-rules-on-bullets/). Its code: get_example(path: "examples/docs-demos/xy-scatter-chart-with-heat-rules-on-bullets").

## Axis tooltips

Axis can display tooltips indicating position of a chart cursor if its available. For more information visit "[Cursor: Axis tooltips](https://docs.amcharts.com/v5/charts/xy-chart/cursor/#axis-tooltips)" tutorial.

If you would like to add labels to axis labels, check out "[Labels: Interactive axis labels](https://docs.amcharts.com/v5/concepts/common-elements/labels/#interactive-axis-labels)".

## Zoomable axes

We can also enable drag-zooming of axes by adding `pan: "zoom"` to settings of their renderer:

TypeScript:

```ts
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  })
);
```

JavaScript:

```js
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  })
);
```

Example: [Zoomable value axes](https://docs.amcharts.com/embeds/v5/zoomable-value-axes/). Its code: get_example(path: "examples/docs-demos/zoomable-value-axes").

## Removing axes

### Effect to related series

To remove an axis from a chart, we need to remove its instance from `chart.xAxes` (or `chart.yAxes`) list.

It's important to know, that there might still be series that are using the axis we're about to remove. Since series cannot function without X and Y axis, just removing the axis might result in an error.

So, before removing an axis, we need to do one of these things:

* Assign related series a different axis, or...
* Remove those series as well.

The following function will take care of the latter:

TypeScript:

```ts
function removeAxis(axis) {
  am5.array.each(axis.series, function(series) {
    chart.series.removeValue(series);
  });
  chart.yAxes.removeValue(axis);
}
```

JavaScript:

```js
function removeAxis(axis) {
  am5.array.each(axis.series, function(series) {
    chart.series.removeValue(series);
  });
  chart.yAxes.removeValue(axis);
}
```

Example: [Removing axes](https://docs.amcharts.com/embeds/v5/removing-axes/). Its code: get_example(path: "examples/docs-demos/removing-axes").

### Auto-disposing

`chart.xAxes` and `chart.yAxes` are auto-disposable lists, meaning that removing an item (an axis in this case) from it, will automatically dispose that item.

If we want to remove the axis only temporarily, and do not want it to be disposed, we need to disable auto-disposing:

TypeScript:

```ts
chart.yAxes.autoDispose = false;
```

JavaScript:

```js
chart.yAxes.autoDispose = false;
```

## Related tutorials

* [Position X-axis on zero-value](https://docs.amcharts.com/v5/tutorials/position-x-axis-on-zero-value/)
* [Simulating axis gaps](https://docs.amcharts.com/v5/tutorials/simulating-axis-gaps/)
* [Syncing axis zooms across multiple charts](https://docs.amcharts.com/v5/tutorials/syncing-axis-zooms-across-multiple-charts/)
* [Handling long category axis labels](https://docs.amcharts.com/v5/tutorials/handling-long-category-axis-labels/)
