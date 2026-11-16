---
title: "Patterns"
source: "https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/"
scraped: "2026-11-16"
---

This tutorial looks at how we can create patterns to use for element fills ant outlines.

To apply a pattern to an element, we need to do two things:

* Create a pattern object.
* Assign it to element's `fillPattern` and/or `strokePattern`.

## Creating a pattern

Pattern object is created using its `new()` method:

TypeScript:

```ts
am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
});
```

JavaScript:

```js
am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
});
```

## Basic pattern types

| Pattern class      | Example                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LinePattern`      | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern-1.png)                                                                                                                                                                                 |
| `RectanglePattern` | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern-1.png)                                                                                                                                                                       |
| `CirclePattern`    | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/circle_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/circle_pattern-1.png)                                                                                                                                                                             |
| `StarPattern`      | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/star_pattern-1.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/star_pattern.png)                                                                                                                                                                                 |
| `TrianglePattern`  | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/triangle_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/triangle_pattern-1.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/triangle_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/triangle_pattern.png) |
| `PathPattern`      | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/path_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/path_pattern-1.png)                                                                                                                                                                                 |
| `GrainPattern`     | ![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/grain_pattern.png)![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/grain_pattern-1.png)                                                                                                                                                                               |

Patterns can be customized by applying rotation, gap, stroke, and other settings, which we'll explore in a bit.

## Setting pattern

To set a pattern fill on an element, we need to assign it to element's `fillPattern` setting.

Similarly, to assign it to element's stroke (line), we can use `strokePattern`.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
}));
```

## Colors

### Primary color

To set a color and opacity for pattern shapes, we use its `color` and `colorOpacity` settings.

If those are not set, the pattern will inherit `stroke` and `fill` colors from the element it is applied to.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0xffffff),
  colorOpacity: 0.5
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0xffffff),
  colorOpacity: 0.5
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_2.png "`color: am5.color(0xffffff)` | `colorOpacity: 1`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_1.png "`color: am5.color(0xffffff)` | `colorOpacity: 0.5`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_3.png "`color: am5.color(0x85ffc7)` | `colorOpacity: 1`")

### Fill color

Pattern will use `color` to color it shapes, but will leave gaps between them transparent.

If we'd rather have that area filled, we can use pattern's `fill` and `fillOpacity` settings.

We can also "invert" the color pattern, by setting `fill` but omitting the `color` setting.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_2.png "`color: am5.color(0xffffff)` | `fill` not set")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_fill.png "`color` not set | `fill: am5.color(0xffffff)`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_fill_2.png "`color: am5.color(0x297373)` | `fill: am5.color(0xffffff)`")

### Color inheritance

If `fill` color is not set, pattern will have a transparent background.

In such case, any original fill that target object has - either via its own `fill` or `fillGradient` - will be visible through the pattern.

## Sizing patterns

Most patterns will try to auto-size themselves to fit the target element.

However, in some cases, you might need to manually size them. In such cases, we can use `width` and `height` settings:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0x297373),
  fill: am5.color(0xffffff),
  rotation: 45,
  width: 400,
  height: 400,
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0x297373),
  fill: am5.color(0xffffff),
  rotation: 45,
  width: 400,
  height: 400,
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_50.png "`width: 50, height: 50` (default)")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_400.png "`width: 400, height: 400`")

## Rotation

By setting `rotation` on a pattern, we can create wholly distinctive patterns:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1,
  rotation: 45
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1,
  rotation: 45
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_rotation_0.png "`rotation: 0` (default)")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_400.png "`rotation: 45`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_rotation_90.png "`rotation: 90`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_patternr_rotation_-45.png "`rotation: -45`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern_rotation_0.png "`rotation: 0` (default)")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern_rotation_45.png "`rotation: 45`")

> **Note:** Some rotated patterns won't tile well without tweaking `gap`, `width`, `height` or other settings. For line patterns, use `angle` instead: see [Rotating line pattern](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/#rotating-line-pattern).

### Rotating line pattern

To slant a `LinePattern`'s lines, use its `angle` setting (5.14+) instead of `rotation`. `rotation` turns the whole tile, so the lines break where tiles meet unless the tile is very large. `angle` draws the lines at that slant, so the small default tile repeats without seams, and it's faster.

`angle` turns the other way: `rotation: 45` looks like `angle: -45`.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45
}));
```

### Rotating rectangles

To turn rectangles into diamonds (or place them at any other angle than 0), set its `rotateShapes: true` in addition to `rotation`. It will rotate each individual rectangle rather than the whole pattern tile, which is faster.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1,
  rotation: 45,
  rotateShapes: true
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  fill: am5.color(0xffffff),
  fillOpacity: 1,
  rotation: 45,
  rotateShapes: true
}));
```

## Repetition

Normally, pattern repeats the tiles in all directions, until all of the target area is filled.

The setting `repetition` can be used to change that.

Available values are: `"repeat"` (default), `"repeat-x"`, `"repeat-y"`, and `"no-repeat"`.

> **Note:** Changing `repetition` may cause element not fully filled.

## Configuration

Each pattern type also has specific configuration settings.

For example, `gap` setting is available in all pattern types, and is used to set spacing between elements: lines, rectangles, or other shapes.

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45,
  gap: 10
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.LinePattern.new(root, {
  color: am5.color(0xffffff),
  angle: 45,
  gap: 10
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/line_pattern_400.png "`gap: 6` (default)")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_gap_3.png "`gap: 3`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/pattern_gap_20.png "`gap: 20`")

There are also type specific settings, e.g. `checkered` (default: `false`) for rectangle and circle patterns:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0xffffff),
  checkered: true
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.RectanglePattern.new(root, {
  color: am5.color(0xffffff),
  checkered: true
}));
```

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern_rotation_0.png "`checkered: false`")

![](https://docs.amcharts.com/v5/images/concepts/colors-gradients-and-patterns/patterns/rectangle_pattern_checkered.png "`checkered: true`")

For more configuration options, visit following class references:

* [`LinePattern` settings](https://docs.amcharts.com/v5/reference/linepattern/#settings)
* [`RectanglePattern` settings](https://docs.amcharts.com/v5/reference/linepattern/#settings)
* [`CirclePattern` settings](https://docs.amcharts.com/v5/reference/linepattern/#settings)
* [`PathPattern` settings](https://docs.amcharts.com/v5/reference/pathpattern/#settings)

## Examples

The below example uses `CirclePattern` and `LinePattern`:

Example: [Patterns](https://docs.amcharts.com/embeds/v5/patterns/)

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
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);

series1.data.setAll(data);

series1.columns.template.set(
  "fillPattern",
  am5.LinePattern.new(root, {
    color: am5.color(0xffffff),
    angle: 45,
    strokeWidth: 2
  })
);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

series2.columns.template.set(
  "fillPattern",
  am5.CirclePattern.new(root, {
    color: am5.color(0xffffff),
    checkered: true
  })
);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

And this one uses a `PathPattern` to use SVG paths as a fill pattern:

Example: [SVG path patterns](https://docs.amcharts.com/embeds/v5/svg-path-patterns/)

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
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);

series1.data.setAll(data);

var maleIcon =
  "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z";
var femaleIcon =
  "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z";

series1.columns.template.set(
  "fillPattern",
  am5.PathPattern.new(root, {
    color: am5.color(0xffffff),
    strokeWidth: 2,
    width: 50,
    height: 50,
    svgPath:
      "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z"
  })
);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

series2.columns.template.set(
  "fillPattern",
  am5.PathPattern.new(root, {
    color: am5.color(0xffffff),
    strokeWidth: 2,
    width: 50,
    height: 50,
    svgPath:
      "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z"
  })
);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

## Image patterns

### Creating an image pattern

We can also use any image (external or in-line) as a pattern using `PicturePattern`.

It requires its setting `src` to be set either to a URL of the image:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "/path/to/pattern.svg"
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "/path/to/pattern.svg"
}));
```

Or it can also contain a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) (in-line) info:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "data:image/svg+xml;base64,....."
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "data:image/svg+xml;base64,....."
}));
```

### Sizing and fitting

There are a few ways to size the pattern using `fit` setting, which accepts three values:

* `"image"` (default) - the pattern will automatically size itself using image's native dimensions.
* `"pattern"` - will size image using pattern's `width` and `height` settings.
* `"none"` - will size pattern tiles according to `width` and `height` settings, but will let the image use own dimensions. Using this option is risky since it may produce non-fitting tiles if image is larger than the tile.

The following code will make pattern use custom dimensions, effectively sizing the image:

TypeScript:

```ts
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "/path/to/pattern.svg",
  fit: "pattern",
  width: 100,
  height: 100
}));
```

JavaScript:

```js
columnSeries.columns.template.set("fillPattern", am5.PicturePattern.new(root, {
  src: "/path/to/pattern.svg",
  fit: "pattern",
  width: 100,
  height: 100
}));
```

Here's an example:

Example: [Image patterns](https://docs.amcharts.com/embeds/v5/image-patterns/)

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
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category"
  })
);

series1.data.setAll(data);

series1.columns.template.set(
  "fillPattern",
  am5.PicturePattern.new(root, {
    src: "https://docs.amcharts.com/assets/pattern.png",
    fit: "image"
  })
);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

series2.columns.template.set(
  "fillPattern",
  am5.PicturePattern.new(root, {
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZmlsbD0ibm9uZSIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIgaGVpZ2h0PSI0OCIgd2lkdGg9IjQ4Ii8+PHBhdGggZD0iTTYgOEgxMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTQgMTZIMTgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTE2IDZWMTAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTggMTRWMTgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTIyIDhIMjYiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTMwIDE2SDM0IiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0zMiA2VjEwIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0yNCAxNFYxOCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMzggOEg0MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNNDAgMTRWMTgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTYgMjRIMTAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTE0IDMySDE4IiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0xNiAyMlYyNiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNOCAzMFYzNCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjIgMjRIMjYiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTMwIDMySDM0IiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0zMiAyMlYyNiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMjQgMzBWMzQiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTM4IDI0SDQyIiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik00MCAzMFYzNCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNNiA0MEgxMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTYgMzhWNDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTIyIDQwSDI2IiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0zMiAzOFY0MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMzggNDBINDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+",
    fit: "pattern",
    width: 50,
    height: 50
  })
);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

## Grain patterns

Grain pattern is another special kind of pattern that can complement regular fills with overhead pixel noise to add that additional fuzzy look.

It works by applying a random assortment of semi-transparent dots over existing fills.

### Adding grain pattern

As with other patterns, we use `fillPattern` to add grain pattern:

TypeScript:

```ts
series.slices.template.setAll({
  fillPattern: am5.GrainPattern.new(root, {})
});
```

JavaScript:

```js
series.slices.template.setAll({
  fillPattern: am5.GrainPattern.new(root, {})
});
```

### Configuring noise pixels

There are a few configuration options we can use to tweak appearance of the noise pixels.

| Setting         | Value range | Default | Comment                                                                                                        |
| --------------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `size`          | `1` to X    | `1`     | Size of a grain in pixels.                                                                                     |
| `density`       | `0` to `1`  | `1`     | Density of pixels. The closer number to `1` the more dense the noise. `0` means no noise.                      |
| `minOpacity`    | `0` to `1`  | `0`     | Minimum opacity of a noise pixel.                                                                              |
| `maxOpacity`    | `0` to `1`  | `0.3`   | Maximum opacity of a noise pixel.                                                                              |
| `colors`        | N/A         |         | An array of `Color` objects to use for noise pixels. Will use `color` setting or black if `colors` is not set. |
| `horizontalGap` | `0` to X    |         | Horizontal gap between noise pixels measured in `size`.                                                        |
| `verticalGap`   | `0` to X    |         | Vertical gap between noise pixels measured in `size`.                                                          |

### Combining with gradients

We can also combine grain pattern with gradient fills as both `fillGradient` and `fillPattern` will be honored:

TypeScript:

```ts
series.slices.template.setAll({
  fillGradient: am5.RadialGradient.new(root, {
    stops: [
      { offset: 0.5 },
      { brighten: -0.5 }]
  }),
  fillPattern: am5.GrainPattern.new(root, {})
});
```

JavaScript:

```js
series.slices.template.setAll({
  fillGradient: am5.RadialGradient.new(root, {
    stops: [
      { offset: 0.5 },
      { brighten: -0.5 }]
  }),
  fillPattern: am5.GrainPattern.new(root, {})
});
```

Example: [Pie chart with gradient fill and grain pattern](https://docs.amcharts.com/embeds/v5/pie-chart-with-gradient-fill-and-grain-pattern/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout,
    innerRadius: am5.percent(50)
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 160000
  },
  {
    country: "United Kingdom",
    sales: 80000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

series.slices.template.setAll({
  fillGradient: am5.RadialGradient.new(root, {
    stops: [{ offset: 0.5 }, { brighten: -0.5 }]
  }),

  fillPattern: am5.GrainPattern.new(root, {})
});

series.data.setAll(data);
```

## Pattern sets

Pattern sets, similar to [color sets](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#color-sets), are collection patterns that can be used to auto-assign pattern fills to series elements, like slices, series, nodes, etc.

Pattern sets are created by instantiating a `PatternSet` class. It will have a predefined list of some distinctive patterns, which, upon need, can be overridden (see later in this section).

### XY chart

An `XYChart` can auto-assign `fillPattern` to each series added to it.

All we need to do is to set `patterns` setting with a value holding a reference to a `PatternSet` object:

TypeScript:

```ts
let chart = root.container.children.push(am5xy.XYChart.new(root, {
  patterns: am5.PatternSet.new(root, {})
}));
```

JavaScript:

```js
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  patterns: am5.PatternSet.new(root, {})
}));
```

### Pie chart

In a `PieChart` (or any other Percent chart type), instead of chart, we set `patterns` to its series, because we will need to assign a different pattern to each individual item (slice):

TypeScript:

```ts
let series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {})
}));
```

JavaScript:

```js
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {})
}));
```

### Hierarchy charts

Similarly, in Hierarchy charts (Force-directed, Treemap), we set `patterns` directly on series:

TypeScript:

```ts
let series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    patterns: am5.PatternSet.new(root, {})
  })
);
```

JavaScript:

```js
var series = container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    patterns: am5.PatternSet.new(root, {})
  })
);
```

### Flow charts

For a Flow chart (e.g. Sankey, Chord), we assign `patterns` to its [nodes template](https://docs.amcharts.com/v5/charts/flow-charts/sankey-diagram/#configuring-nodes):

TypeScript:

```ts
series.nodes.set("patterns", am5.PatternSet.new(root, {}));
```

JavaScript:

```js
series.nodes.set("patterns", am5.PatternSet.new(root, {}));
```

### Customizing colors

The default patterns from the set will use a light interface stroke color for their elements (lines, squares, etc.) and will have no fill, so that original fill of the target element is visible.

If you are using a dark theme, it will use its dark stroke interface color instead.

To override the default element color, we can use pattern set's `color` setting:

TypeScript:

```ts
let series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {
    color: am5.color(0x000000)
  })
}));
```

JavaScript:

```js
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {
    color: am5.color(0x000000)
  })
}));
```

### Custom pattern list

We can also override a default list of patterns with our own, by setting set's `patterns` with an array of `Pattern` objects.

TypeScript:

```ts
let series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {
    patterns: [
      am5.LinePattern.new(root, {
        color: am5.color(0xffffff),
        angle: 45,
        gap: 10
      }),
      am5.RectanglePattern.new(root, {
        color: am5.color(0xffffff),
        checkered: true
      })
    ]
  })
}));
```

JavaScript:

```js
var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "sales",
  categoryField: "country",
  patterns: am5.PatternSet.new(root, {
    patterns: [
      am5.LinePattern.new(root, {
        color: am5.color(0xffffff),
        angle: 45,
        gap: 10
      }),
      am5.RectanglePattern.new(root, {
        color: am5.color(0xffffff),
        checkered: true
      })
    ]
  })
}));
```

## Related tutorials

* [Using custom theme to apply patterns to pie chart slices](https://docs.amcharts.com/v5/tutorials/using-custom-theme-to-apply-patterns-to-pie-chart-slices/)
