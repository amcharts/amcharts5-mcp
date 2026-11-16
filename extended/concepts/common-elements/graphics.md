---
title: "Graphics"
source: "https://docs.amcharts.com/v5/concepts/common-elements/graphics/"
scraped: "2026-11-16"
---

> Graphics is an element which can be used to draw shapes using vector information. This tutorial will explore how it can be used to draw anything on the chart and its elements.

`Graphics` is an element which can be used to draw shapes using vector information. This tutorial will explore how it can be used to draw anything on the chart and its elements.

## Creating

To create a graphics element, we will need to instantiate a `Graphics` object using its `new()` method.

By default, it would not display anything. For it to work, we will need to:

1. Set its `fill` and/or `stroke` settings to provide color.
2. Use drawing functions or an SVG path to define actual shape.

TypeScript:

```ts
am5.Graphics.new(root, {
  // config
});
```

JavaScript:

```js
am5.Picture.new(root, {
  // config
});
```

## Setting colors

Depending whether we will be drawing lines or filled shapes, we can set colors via graphics element's `stroke` and/or `fill` settings.

Let's say, we will be drawing a filled shape, which we want to have a red fill, with black outline (stroke):

TypeScript:

```ts
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000)
});
```

JavaScript:

```js
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000)
});
```

There are more drawing options we can set like opacities, line thickness, or even gradients and patterns. We'll get to those in the [Configuring](#configuring) section.

## Drawing shapes

There are two ways to draw shapes in a graphics element: either by providing a ready-made SVG path, or using drawing functions like `lineTo()`, `rectangle()`, etc.

Let's look at both now.

### Using SVG paths

[SVG path](https://svgwg.org/svg2-draft/paths.html#PathElement) is a standard way to define any shape in a vector format.

We can use some sort of editor to produce a path, or just grab one from an existing SVG image.

The following is an example of a path that draws a heart shape:

```html title="SVG"
M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0
```

To make graphics element use the path, we need to set it to its `svgPath` setting:

TypeScript:

```ts
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000),
  svgPath: "M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0"
});
```

JavaScript:

```js
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000),
  svgPath: "M45.418 10c-2.293-2.5-5.625-3.957-8.961-4.168h-.414c-4.168 0-7.918 2.086-10.418 5.418-2.293-4.375-6.668-7.082-11.457-7.082h-.211c-3.539 0-7.082 1.457-9.375 4.164-2.5 2.5-3.75 6.043-3.539 9.586C1.457 24.168 4.582 27.293 7.5 30c3.332 3.332 6.457 6.043 5.418 13.957 0 1.25.625 2.086 1.664 2.086.418 0 .625 0 1.25-.211C37.5 39.168 48.957 30.207 48.957 20.207V20c.211-3.957-1.039-7.293-3.539-10ZM14.582 44.793V43.75Zm0 0"
});
```

Example: [Using graphics elements](https://docs.amcharts.com/embeds/v5/using-graphics-elements/). Its code: get_example(path: "examples/docs-demos/using-graphics-elements").

### Custom draw functions

Another option is using low-level drawing functions, like `moveTo()`, `lineTo()`, `drawRect()`, `drawCircle()`, etc.

To use those, we need to assign a custom function to graphics element's [`draw` setting](https://docs.amcharts.com/v5/reference/graphics/#draw_setting).

The function will receive a "display object" (`SceneGraphics`), which will provide the drawing functions we mentioned earlier.

Let's draw a triangle:

TypeScript:

```ts
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000),
  draw: function(display) {
    display.moveTo(25, 0);
    display.lineTo(50, 50);
    display.lineTo(0, 50);
    display.lineTo(25, 0);
  }
});
```

JavaScript:

```js
am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  fill: am5.color(0x990000),
  draw: function(display) {
    display.moveTo(25, 0);
    display.lineTo(50, 50);
    display.lineTo(0, 50);
    display.lineTo(25, 0);
  }
});
```

For a full list of drawing methods, refer to the [`IGraphics` reference](https://docs.amcharts.com/v5/reference/igraphics/).

Example: [Using graphics elements](https://docs.amcharts.com/embeds/v5/using-graphics-elements-2/). Its code: get_example(path: "examples/docs-demos/using-graphics-elements-2").

#### The complete list of drawing functions

All number parameters are absolute pixel values.

| Method                                                         |
| -------------------------------------------------------------- |
| `arc(x, y, radius, startAngle, endAngle [, counterclockwise])` |
| `arcTo(x1, y1, x2, y2, radius)`                                |
| `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`                  |
| `drawCircle(x, y, radius)`                                     |
| `drawEllipse(x, y, radiusX, radiusY)`                          |
| `drawRect(x, y, width, height)`                                |
| `lineTo(x, y)`                                                 |
| `moveTo(x, y)`                                                 |
| `quadraticCurveTo(cpX, cpY, toX, toY)`                         |

## Configuring

There are more settings to graphics element than just `fill` and `stroke` (that specify fill and line colors respectively).

For example `fillOpacity` will control fill transparency.

> **More info:** For a complete list of available settings, check out [`Graphics` reference](https://docs.amcharts.com/v5/reference/graphics/#settings).

Here's another example, that uses `drawRect()` drawing method to draw a rotated semi-transparent rectangle:

TypeScript:

```ts
chart.children.push(am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  strokeWidth: 3,
  fill: am5.color(0x990000),
  fillOpacity: 0.5,
  rotation: 45,
  draw: function(display) {
    display.drawRect(0, 0, 50, 50)
  }
}));
```

JavaScript:

```js
chart.children.push(am5.Graphics.new(root, {
  stroke: am5.color(0x000000),
  strokeWidth: 3,
  fill: am5.color(0x990000),
  fillOpacity: 0.5,
  rotation: 45,
  draw: function(display) {
    display.drawRect(0, 0, 50, 50)
  }
}));
```

Example: [Using graphics elements](https://docs.amcharts.com/embeds/v5/using-graphics-elements-3/). Its code: get_example(path: "examples/docs-demos/using-graphics-elements-3").
