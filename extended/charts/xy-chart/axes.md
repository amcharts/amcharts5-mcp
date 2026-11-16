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

Example: [Rotated axis labels](https://docs.amcharts.com/embeds/v5/rotated-axis-labels/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
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
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 10
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50
});

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

series.data.setAll(data);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```

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

Example: [Axis start and end locations](https://docs.amcharts.com/embeds/v5/axis-start-and-end-locations/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 250px;
}
```

JavaScript:

```js
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    startLocation: 0.5,
    endLocation: 0.5,
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 30
    })
  })
);

xAxis.get("dateFormats")["day"] = "MM/dd";
xAxis.get("periodChangeDateFormats")["day"] = "MM/dd";

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      maskBullets: false
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      })
    });
  });

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series", "value");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);
```

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

Example: [Strip count plot](https://docs.amcharts.com/embeds/v5/strip-count-plot/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 98vh;
}
```

JavaScript:

```js
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

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

var categories = [
  {
    category: "Twitter",
    icon: "https://docs.amcharts.com/assets/icon_social_twitter.svg",
    color: am5.color(0x00aade)
  },
  {
    category: "Facebook",
    icon: "https://docs.amcharts.com/assets/icon_social_facebook.svg",
    color: am5.color(0x385997)
  },
  {
    category: "Instagram",
    icon: "https://docs.amcharts.com/assets/icon_social_instagram.svg",
    color: am5.color(0xf04571)
  },
  {
    category: "WhatsApp",
    icon: "https://docs.amcharts.com/assets/icon_social_whatsapp.svg",
    color: am5.color(0x03c03e)
  },
  {
    category: "Youtube",
    icon: "https://docs.amcharts.com/assets/icon_social_youtube.svg",
    color: am5.color(0xff0100)
  },
  {
    category: "Pinterest",
    icon: "https://docs.amcharts.com/assets/icon_social_pinterest.svg",
    color: am5.color(0xc31e31)
  },
  {
    category: "Snapchat",
    icon: "https://docs.amcharts.com/assets/icon_social_snapchat.svg",
    color: am5.color(0xfffc40)
  },
  {
    category: "LinkedIn",
    icon: "https://docs.amcharts.com/assets/icon_social_linkedin.svg",
    color: am5.color(0x007fb5)
  },
  {
    category: "Reddit",
    icon: "https://docs.amcharts.com/assets/icon_social_reddit.svg",
    color: am5.color(0xf7192d)
  },
  {
    category: "Digg",
    icon: "https://docs.amcharts.com/assets/icon_social_digg.svg",
    color: am5.color(0x000000)
  },
  {
    category: "Telegram",
    icon: "https://docs.amcharts.com/assets/icon_social_telegram.svg",
    color: am5.color(0x04acde)
  },
  {
    category: "Vine",
    icon: "https://docs.amcharts.com/assets/icon_social_vine.svg",
    color: am5.color(0x000000)
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      inversed: true
    }),

    bullet: function (root, axis, dataItem) {
      return am5xy.AxisBullet.new(root, {
        location: 0.5,
        sprite: am5.Picture.new(root, {
          dx: -10,
          width: 24,
          height: 24,
          centerY: am5.p50,
          centerX: am5.p100,
          src: dataItem.dataContext.icon
        })
      });
    }
  })
);

var yRenderer = yAxis.get("renderer");

yRenderer.labels.template.setAll({
  paddingRight: 40
});

yRenderer.grid.template.setAll({
  location: 0.5
});

yAxis.data.setAll(categories);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: -10,
    max: 110,
    strictMinMax: true,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  forceHidden: true
});

xRenderer.grid.template.setAll({
  forceHidden: true
});

// Data
var data = [];

for (var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var count = Math.ceil(Math.random() * 20);
  for (var x = 0; x < count; x++) {
    data.push({
      category: category.category,
      position: Math.round(Math.random() * 100),
      value: Math.round(Math.random() * 1000),
      bulletSettings: {
        fill: category.color
      }
    });
  }
}

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: yAxis,
    valueXField: "position",
    valueField: "value",
    categoryYField: "category",
    calculateAggregates: true
  })
);

series.strokes.template.setAll({
  strokeOpacity: 0
});

series.data.setAll(data);

// Add bullets
var circleTemplate = am5.Template.new({});

var bullet = series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5,
    sprite: am5.Circle.new(
      root,
      {
        tooltipText: "{valueX}: [bold]{value}[/]",
        radius: 5,
        stroke: am5.color(0xffffff),
        strokeWidth: 1,
        fillOpacity: 0.8,
        templateField: "bulletSettings"
      },
      circleTemplate
    )
  });
});

// Add heat rules to bullets
series.set("heatRules", [
  {
    target: circleTemplate,
    min: 5,
    max: 20,
    dataField: "value",
    key: "radius"
  }
]);

// Scrollbars
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);
```

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

Example: [Axis bullets on opposite side](https://docs.amcharts.com/embeds/v5/axis-bullets-on-opposite-side/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
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

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

var categories = [
  {
    category: "Twitter",
    icon: "https://docs.amcharts.com/assets/icon_social_twitter.svg",
    color: am5.color(0x00aade)
  },
  {
    category: "Facebook",
    icon: "https://docs.amcharts.com/assets/icon_social_facebook.svg",
    color: am5.color(0x385997)
  },
  {
    category: "Instagram",
    icon: "https://docs.amcharts.com/assets/icon_social_instagram.svg",
    color: am5.color(0xf04571)
  },
  {
    category: "WhatsApp",
    icon: "https://docs.amcharts.com/assets/icon_social_whatsapp.svg",
    color: am5.color(0x03c03e)
  },
  {
    category: "Youtube",
    icon: "https://docs.amcharts.com/assets/icon_social_youtube.svg",
    color: am5.color(0xff0100)
  },
  {
    category: "Pinterest",
    icon: "https://docs.amcharts.com/assets/icon_social_pinterest.svg",
    color: am5.color(0xc31e31)
  },
  {
    category: "Snapchat",
    icon: "https://docs.amcharts.com/assets/icon_social_snapchat.svg",
    color: am5.color(0xfffc40)
  },
  {
    category: "LinkedIn",
    icon: "https://docs.amcharts.com/assets/icon_social_linkedin.svg",
    color: am5.color(0x007fb5)
  },
  {
    category: "Reddit",
    icon: "https://docs.amcharts.com/assets/icon_social_reddit.svg",
    color: am5.color(0xf7192d)
  },
  {
    category: "Digg",
    icon: "https://docs.amcharts.com/assets/icon_social_digg.svg",
    color: am5.color(0x000000)
  },
  {
    category: "Telegram",
    icon: "https://docs.amcharts.com/assets/icon_social_telegram.svg",
    color: am5.color(0x04acde)
  },
  {
    category: "Vine",
    icon: "https://docs.amcharts.com/assets/icon_social_vine.svg",
    color: am5.color(0x000000)
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      inversed: true
    }),

    bullet: function (root, axis, dataItem) {
      var bullet = am5.Picture.new(root, {
        width: 24,
        height: 24,
        centerY: am5.p50,
        centerX: am5.p0,
        src: dataItem.dataContext.icon
      });

      bullet.adapters.add("x", function (dy, target) {
        return chart.plotContainer.getPrivate("width");
      });

      return am5xy.AxisBullet.new(root, {
        location: 0.5,
        sprite: bullet
      });
    }
  })
);

var yRenderer = yAxis.get("renderer");

yRenderer.labels.template.setAll({
  paddingRight: 40
});

yRenderer.grid.template.setAll({
  location: 0.5
});

yAxis.data.setAll(categories);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: -10,
    max: 110,
    strictMinMax: true,
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  forceHidden: true
});

xRenderer.grid.template.setAll({
  forceHidden: true
});

// Data
var data = [];

for (var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var count = Math.ceil(Math.random() * 20);
  for (var x = 0; x < count; x++) {
    data.push({
      category: category.category,
      position: Math.round(Math.random() * 100),
      value: Math.round(Math.random() * 1000),
      bulletSettings: {
        fill: category.color
      }
    });
  }
}

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: yAxis,
    valueXField: "position",
    valueField: "value",
    categoryYField: "category",
    calculateAggregates: true
  })
);

series.strokes.template.setAll({
  strokeOpacity: 0
});

series.data.setAll(data);

// Add bullets
var circleTemplate = am5.Template.new({});

var bullet = series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5,
    sprite: am5.Circle.new(
      root,
      {
        tooltipText: "{valueX}: [bold]{value}[/]",
        radius: 5,
        stroke: am5.color(0xffffff),
        strokeWidth: 1,
        fillOpacity: 0.8,
        templateField: "bulletSettings"
      },
      circleTemplate
    )
  });
});

// Add heat rules to bullets
series.set("heatRules", [
  {
    target: circleTemplate,
    min: 5,
    max: 20,
    dataField: "value",
    key: "radius"
  }
]);

// Scrollbars
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set(
  "scrollbarY",
  am5.Scrollbar.new(root, {
    orientation: "vertical",
    marginLeft: 40
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);
```

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

Example: [Stacked axes](https://docs.amcharts.com/embeds/v5/stacked-axes/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}
```

JavaScript:

```js
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    value2: 14200
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    value2: 4500
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    value2: 10000
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    value2: 8000
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    value2: 9200
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 801,
    value2: 11400
  }
];

// Craete Y-axes
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(70),
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis1.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Value",
    fontWeight: "500"
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

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Volume",
    fontWeight: "500"
  })
);

// Stack Y-axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field, yAxis) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      clustered: false
    })
  );

  series.data.setAll(data);
}

createSeries("Series #1", "value", yAxis1);
createSeries("Series #2", "value2", yAxis2);
```

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

Example: [XY scatter chart with heat rules on bullets](https://docs.amcharts.com/embeds/v5/xy-scatter-chart-with-heat-rules-on-bullets/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 500px;
}
```

JavaScript:

```js
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelY: "zoomXY"
  })
);

// X-axis
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    tooltip: am5.Tooltip.new(root, {}),
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.children.push(
  am5.Label.new(root, {
    text: "GDP per Capita, USD",
    x: am5.p50,
    centerX: am5.p50
  })
);

// Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    tooltip: am5.Tooltip.new(root, {}),
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: false
    })
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

// Create series
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    calculateAggregates: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "y",
    valueXField: "x",
    valueField: "value"
  })
);

series.strokes.template.set("visible", false);

var circleTemplate = am5.Template.new({});

series.bullets.push(function () {
  var bulletCircle = am5.Circle.new(
    root,
    {
      radius: 5,
      fill: series.get("fill"),
      fillOpacity: 0.8,
      tooltipText:
        "[bold]{title}[/]\nLife expectancy: {valueY.formatNumber('#.0')}\nGDP: {valueX.formatNumber('#,###.')}\nPopulation: {value.formatNumber('#,###.')}"
    },
    circleTemplate
  );

  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rules
series.set("heatRules", [
  {
    target: circleTemplate,
    min: 3,
    max: 60,
    dataField: "value",
    key: "radius"
  }
]);

// Cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, { xAxis: xAxis, yAxis: yAxis, snapToSeries: [series] })
);

// Scrollbars
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

// Initial animations
series.appear(1500);
chart.appear(1500);

// Data
series.data.setAll([
  { title: "Afghanistan", x: 1349, y: 60.524, value: 33397058 },
  { title: "Albania", x: 6969, y: 77.185, value: 3227373 },
  { title: "Algeria", x: 6419, y: 70.874, value: 36485828 },
  { title: "Angola", x: 5838, y: 51.498, value: 20162517 },
  { title: "Argentina", x: 15714, y: 76.128, value: 41118986 },
  { title: "Armenia", x: 5059, y: 74.469, value: 3108972 },
  { title: "Australia", x: 36064, y: 82.364, value: 22918688 },
  { title: "Austria", x: 36731, y: 80.965, value: 8428915 },
  { title: "Azerbaijan", x: 9291, y: 70.686, value: 9421233 },
  { title: "Bahrain", x: 24472, y: 76.474, value: 1359485 },
  { title: "Bangladesh", x: 1792, y: 70.258, value: 152408774 },
  { title: "Belarus", x: 13515, y: 69.829, value: 9527498 },
  { title: "Belgium", x: 32585, y: 80.373, value: 10787788 },
  { title: "Benin", x: 1464, y: 59.165, value: 9351838 },
  { title: "Bhutan", x: 6130, y: 67.888, value: 750443 },
  { title: "Bolivia", x: 4363, y: 66.969, value: 10248042 },
  { title: "Bosnia and Herzegovina", x: 7664, y: 76.211, value: 3744235 },
  { title: "Botswana", x: 14045, y: 47.152, value: 2053237 },
  { title: "Brazil", x: 10383, y: 73.667, value: 198360943 },
  { title: "Brunei", x: 45658, y: 78.35, value: 412892 },
  { title: "Bulgaria", x: 11669, y: 73.448, value: 7397873 },
  { title: "Burkina Faso", x: 1363, y: 55.932, value: 17481984 },
  { title: "Burundi", x: 484, y: 53.637, value: 8749387 },
  { title: "Cambodia", x: 2076, y: 71.577, value: 14478320 },
  { title: "Cameroon", x: 2094, y: 54.61, value: 20468943 },
  { title: "Canada", x: 35992, y: 81.323, value: 34674708 },
  { title: "Cape Verde", x: 3896, y: 74.771, value: 505335 },
  { title: "Central African Rep.", x: 718, y: 49.517, value: 4575586 },
  { title: "Chad", x: 1768, y: 50.724, value: 11830573 },
  { title: "Chile", x: 15403, y: 79.691, value: 17423214 },
  { title: "China", x: 9501, y: 75.178, value: 1353600687 },
  { title: "Colombia", x: 8035, y: 73.835, value: 47550708 },
  { title: "Comoros", x: 1027, y: 60.661, value: 773344 },
  { title: "Congo, Dem. Rep.", x: 403, y: 49.643, value: 69575394 },
  { title: "Congo, Rep.", x: 4106, y: 58.32, value: 4233063 },
  { title: "Costa Rica", x: 10827, y: 79.712, value: 4793725 },
  { title: "Cote d'Ivoire", x: 1491, y: 50.367, value: 20594615 },
  { title: "Croatia", x: 13388, y: 76.881, value: 4387376 },
  { title: "Cuba", x: 10197, y: 79.088, value: 11249266 },
  { title: "Cyprus", x: 23092, y: 79.674, value: 1129166 },
  { title: "Czech Rep.", x: 22565, y: 77.552, value: 10565678 },
  { title: "Denmark", x: 32731, y: 79.251, value: 5592738 },
  { title: "Djibouti", x: 2244, y: 61.319, value: 922708 },
  { title: "Dominican Rep.", x: 6978, y: 73.181, value: 10183339 },
  { title: "Ecuador", x: 7903, y: 76.195, value: 14864987 },
  { title: "Egypt", x: 6013, y: 70.933, value: 83958369 },
  { title: "El Salvador", x: 5833, y: 72.361, value: 6264129 },
  { title: "Equatorial Guinea", x: 13499, y: 52.562, value: 740471 },
  { title: "Eritrea", x: 613, y: 62.329, value: 5580862 },
  { title: "Estonia", x: 18858, y: 74.335, value: 1339762 },
  { title: "Ethiopia", x: 958, y: 62.983, value: 86538534 },
  { title: "Fiji", x: 4195, y: 69.626, value: 875822 },
  { title: "Finland", x: 31551, y: 80.362, value: 5402627 },
  { title: "France", x: 29896, y: 81.663, value: 63457777 },
  { title: "Gabon", x: 13853, y: 63.115, value: 1563873 },
  { title: "Gambia", x: 747, y: 58.59, value: 1824777 },
  { title: "Georgia", x: 4943, y: 74.162, value: 4304363 },
  { title: "Germany", x: 34131, y: 80.578, value: 81990837 },
  { title: "Ghana", x: 1728, y: 60.979, value: 25545939 },
  { title: "Greece", x: 21811, y: 80.593, value: 11418878 },
  { title: "Guatemala", x: 5290, y: 71.77, value: 15137569 },
  { title: "Guinea", x: 965, y: 55.865, value: 10480710 },
  { title: "Guinea-Bissau", x: 593, y: 54.054, value: 1579632 },
  { title: "Guyana", x: 4265, y: 66.134, value: 757623 },
  { title: "Haiti", x: 1180, y: 62.746, value: 10255644 },
  { title: "Honduras", x: 3615, y: 73.503, value: 7912032 },
  { title: "Hong Kong, China", x: 43854, y: 83.199, value: 7196450 },
  { title: "Hungary", x: 17065, y: 74.491, value: 9949589 },
  { title: "Iceland", x: 34371, y: 81.96, value: 328290 },
  { title: "India", x: 3229, y: 66.168, value: 1258350971 },
  { title: "Indonesia", x: 4379, y: 70.624, value: 244769110 },
  { title: "Iran", x: 12325, y: 73.736, value: 75611798 },
  { title: "Iraq", x: 4160, y: 69.181, value: 33703068 },
  { title: "Ireland", x: 35856, y: 80.531, value: 4579498 },
  { title: "Israel", x: 27321, y: 81.641, value: 7694670 },
  { title: "Italy", x: 25811, y: 82.235, value: 60964145 },
  { title: "Jamaica", x: 6945, y: 73.338, value: 2761331 },
  { title: "Japan", x: 31273, y: 83.418, value: 126434653 },
  { title: "Jordan", x: 5242, y: 73.7, value: 6457260 },
  { title: "Kazakhstan", x: 11982, y: 66.394, value: 16381297 },
  { title: "Kenya", x: 1517, y: 61.115, value: 42749418 },
  { title: "Korea, Dem. Rep.", x: 1540, y: 69.701, value: 24553672 },
  { title: "Korea, Rep.", x: 26199, y: 81.294, value: 48588326 },
  { title: "Kuwait", x: 42045, y: 74.186, value: 2891553 },
  { title: "Kyrgyzstan", x: 2078, y: 67.37, value: 5448085 },
  { title: "Laos", x: 2807, y: 67.865, value: 6373934 },
  { title: "Latvia", x: 15575, y: 72.045, value: 2234572 },
  { title: "Lebanon", x: 13711, y: 79.716, value: 4291719 },
  { title: "Lesotho", x: 1970, y: 48.947, value: 2216850 },
  { title: "Liberia", x: 499, y: 60.23, value: 4244684 },
  { title: "Libya", x: 9136, y: 75.13, value: 6469497 },
  { title: "Lithuania", x: 18469, y: 71.942, value: 3292454 },
  { title: "Macedonia, FYR", x: 8918, y: 75.041, value: 2066785 },
  { title: "Madagascar", x: 981, y: 64.28, value: 21928518 },
  { title: "Malawi", x: 848, y: 54.798, value: 15882815 },
  { title: "Malaysia", x: 14202, y: 74.836, value: 29321798 },
  { title: "Mali", x: 1070, y: 54.622, value: 16318897 },
  { title: "Mauritania", x: 1898, y: 61.39, value: 3622961 },
  { title: "Mauritius", x: 13082, y: 73.453, value: 1313803 },
  { title: "Mexico", x: 12030, y: 77.281, value: 116146768 },
  { title: "Moldova", x: 2963, y: 68.779, value: 3519266 },
  { title: "Mongolia", x: 4300, y: 67.286, value: 2844081 },
  { title: "Montenegro", x: 10064, y: 74.715, value: 632796 },
  { title: "Morocco", x: 4514, y: 70.714, value: 32598536 },
  { title: "Mozambique", x: 1058, y: 49.91, value: 24475186 },
  { title: "Myanmar", x: 1657, y: 65.009, value: 48724387 },
  { title: "Namibia", x: 5535, y: 64.014, value: 2364433 },
  { title: "Nepal", x: 1264, y: 67.989, value: 31011137 },
  { title: "Netherlands", x: 36257, y: 80.906, value: 16714228 },
  { title: "New Zealand", x: 25223, y: 80.982, value: 4461257 },
  { title: "Nicaragua", x: 3098, y: 74.515, value: 5954898 },
  { title: "Niger", x: 706, y: 57.934, value: 16644339 },
  { title: "Nigeria", x: 2483, y: 52.116, value: 166629383 },
  { title: "Norway", x: 47383, y: 81.367, value: 4960482 },
  { title: "Oman", x: 26292, y: 76.287, value: 2904037 },
  { title: "Pakistan", x: 2681, y: 66.42, value: 179951140 },
  { title: "Panama", x: 13607, y: 77.342, value: 3624991 },
  { title: "Papua New Guinea", x: 2391, y: 62.288, value: 7170112 },
  { title: "Paraguay", x: 4467, y: 72.181, value: 6682943 },
  { title: "Peru", x: 9277, y: 74.525, value: 29733829 },
  { title: "Philippines", x: 3677, y: 68.538, value: 96471461 },
  { title: "Poland", x: 17851, y: 76.239, value: 38317090 },
  { title: "Portugal", x: 19576, y: 79.732, value: 10699333 },
  { title: "Romania", x: 11058, y: 73.718, value: 21387517 },
  { title: "Russia", x: 15427, y: 67.874, value: 142703181 },
  { title: "Rwanda", x: 1223, y: 63.563, value: 11271786 },
  { title: "Saudi Arabia", x: 26259, y: 75.264, value: 28705133 },
  { title: "Senegal", x: 1753, y: 63.3, value: 13107945 },
  { title: "Serbia", x: 9335, y: 73.934, value: 9846582 },
  { title: "Sierra Leone", x: 1072, y: 45.338, value: 6126450 },
  { title: "Singapore", x: 49381, y: 82.155, value: 5256278 },
  { title: "Slovak Republic", x: 20780, y: 75.272, value: 5480332 },
  { title: "Slovenia", x: 23986, y: 79.444, value: 2040057 },
  { title: "Solomon Islands", x: 2024, y: 67.465, value: 566481 },
  { title: "Somalia", x: 953, y: 54, value: 9797445 },
  { title: "South Africa", x: 9657, y: 56.271, value: 50738255 },
  { title: "South Sudan", x: 1433, y: 54.666, value: 10386101 },
  { title: "Spain", x: 26457, y: 81.958, value: 46771596 },
  { title: "Sri Lanka", x: 5182, y: 74.116, value: 21223550 },
  { title: "Sudan", x: 2917, y: 61.875, value: 35335982 },
  { title: "Suriname", x: 8979, y: 70.794, value: 534175 },
  { title: "Swaziland", x: 4979, y: 48.91, value: 1220408 },
  { title: "Sweden", x: 34530, y: 81.69, value: 9495392 },
  { title: "Switzerland", x: 37678, y: 82.471, value: 7733709 },
  { title: "Syria", x: 4432, y: 71, value: 21117690 },
  { title: "Taiwan", x: 32840, y: 79.45, value: 23114000 },
  { title: "Tajikistan", x: 1952, y: 67.118, value: 7078755 },
  { title: "Tanzania", x: 1330, y: 60.885, value: 47656367 },
  { title: "Thailand", x: 8451, y: 74.225, value: 69892142 },
  { title: "Timor-Leste", x: 3466, y: 67.033, value: 1187194 },
  { title: "Togo", x: 975, y: 56.198, value: 6283092 },
  { title: "Trinidad and Tobago", x: 17182, y: 69.761, value: 1350999 },
  { title: "Tunisia", x: 7620, y: 75.632, value: 10704948 },
  { title: "Turkey", x: 9287, y: 74.938, value: 74508771 },
  { title: "Turkmenistan", x: 7921, y: 65.299, value: 5169660 },
  { title: "Uganda", x: 1251, y: 58.668, value: 35620977 },
  { title: "Ukraine", x: 6389, y: 68.414, value: 44940268 },
  { title: "United Arab Emirates", x: 31980, y: 76.671, value: 8105873 },
  { title: "United Kingdom", x: 31295, y: 80.396, value: 62798099 },
  { title: "United States", x: 42296, y: 78.797, value: 315791284 },
  { title: "Uruguay", x: 13179, y: 77.084, value: 3391428 },
  { title: "Uzbekistan", x: 3117, y: 68.117, value: 28077486 },
  { title: "Venezuela", x: 11685, y: 74.477, value: 29890694 },
  { title: "West Bank and Gaza", x: 4328, y: 73.018, value: 4270791 },
  { title: "Vietnam", x: 3073, y: 75.793, value: 89730274 },
  { title: "Yemen, Rep.", x: 2043, y: 62.923, value: 25569263 },
  { title: "Zambia", x: 1550, y: 57.037, value: 13883577 },
  { title: "Zimbabwe", x: 545, y: 58.142, value: 13013678 }
]);
```

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

Example: [Zoomable value axes](https://docs.amcharts.com/embeds/v5/zoomable-value-axes/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
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

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  })
);

var easing = am5.ease.linear;
chart.get("colors").set("step", 3);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

function createAxisAndSeries(startValue, opposite) {
  var yRenderer = am5xy.AxisRendererY.new(root, {
    opposite: opposite,
    pan: "zoom"
  });

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 1,
      renderer: yRenderer
    })
  );

  if (chart.yAxes.indexOf(yAxis) > 0) {
    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
  }

  // Add series
  // https://docs.amcharts.com/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}"
      })
    })
  );

  //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
  series.strokes.template.setAll({ strokeWidth: 1 });

  yRenderer.grid.template.set("strokeOpacity", 0.05);
  yRenderer.labels.template.set("fill", series.get("fill"));
  yRenderer.setAll({
    stroke: series.get("fill"),
    strokeOpacity: 1,
    opacity: 1
  });

  // Set up data processor to parse string dates
  // https://docs.amcharts.com/v5/concepts/data/#pre-processing-data
  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"]
  });

  series.data.setAll(generateChartData(startValue));
}

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis,
    behavior: "none"
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

createAxisAndSeries(100, false);
createAxisAndSeries(1000, true);
createAxisAndSeries(8000, true);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);

// Generates random data, quite different range
function generateChartData(value) {
  var data = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 100);
  firstDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < 100; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round(((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20);

    data.push({
      date: newDate,
      value: value
    });
  }
  return data;
}
```

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

Example: [Removing axes](https://docs.amcharts.com/embeds/v5/removing-axes/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
<input type="button" value="Remove axis" onclick="removeAxis()" />
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 500px;
}
```

JavaScript:

```js
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

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  })
);

var easing = am5.ease.linear;
chart.get("colors").set("step", 3);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

function createAxisAndSeries(startValue, opposite) {
  var yRenderer = am5xy.AxisRendererY.new(root, {
    opposite: opposite
  });

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 1,
      renderer: yRenderer
    })
  );

  if (chart.yAxes.indexOf(yAxis) > 0) {
    yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
  }

  // Add series
  // https://docs.amcharts.com/v5/charts/xy-chart/series/
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}"
      })
    })
  );

  //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
  series.strokes.template.setAll({ strokeWidth: 1 });

  yRenderer.grid.template.set("strokeOpacity", 0.05);
  yRenderer.labels.template.set("fill", series.get("fill"));
  yRenderer.setAll({
    stroke: series.get("fill"),
    strokeOpacity: 1,
    opacity: 1
  });

  // Set up data processor to parse string dates
  // https://docs.amcharts.com/v5/concepts/data/#pre-processing-data
  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"]
  });

  series.data.setAll(generateChartData(startValue));
}

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis,
    behavior: "none"
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

createAxisAndSeries(100, false);
createAxisAndSeries(1000, true);
createAxisAndSeries(8000, true);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);

// Generates random data, quite different range
function generateChartData(value) {
  var data = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 100);
  firstDate.setHours(0, 0, 0, 0);

  for (var i = 0; i < 100; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);

    value += Math.round(((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20);

    data.push({
      date: newDate,
      value: value
    });
  }
  return data;
}

function removeAxis() {
  var axis = chart.yAxes.getIndex(0);
  am5.array.each(axis.series, function (series) {
    chart.series.removeValue(series);
  });
  chart.yAxes.removeValue(axis);
}
```

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
