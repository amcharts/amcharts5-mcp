---
title: "Exporting to SVG"
source: "https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/"
scraped: "2026-11-16"
---

Charts can be exported as SVG: vector images that stay sharp at any size and can be edited in design tools. It works whether the chart is drawn on canvas or as SVG.

## Using exporting plugin

If the chart uses the [exporting plugin](https://docs.amcharts.com/v5/concepts/exporting/), its [export menu](https://docs.amcharts.com/v5/concepts/exporting/export-menu/) has an "SVG" item by default, next to PNG and JPG.

SVG export can also be started from code:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

// Download as file
exporting.download("svg");

// Get SVG markup
exporting.getSVG().then(function(svg) {
  console.log(svg);
});

// Get data URI
exporting.exportSVG().then(function(uri) {
  console.log(uri);
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

// Download as file
exporting.download("svg");

// Get SVG markup
exporting.getSVG().then(function(svg) {
  console.log(svg);
});

// Get data URI
exporting.exportSVG().then(function(uri) {
  console.log(uri);
});
```

The plugin's own settings apply as with other image formats: `backgroundColor` and `backgroundOpacity` fill the background, and `extraImages` places other charts around the main one.

SVG-specific options go into `svgOptions`. The only one is `precision`: the number of decimal places in coordinates (default: `3`). Fewer decimals make a smaller file.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  svgOptions: {
    precision: 1
  }
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  svgOptions: {
    precision: 1
  }
});
```

Example: [Exporting as SVG](https://docs.amcharts.com/embeds/v5/exporting-as-svg/). Its code: get_example(path: "examples/docs-demos/exporting-as-svg").

## Without plugin

The `am5.renderToSVG()` function, part of the core library, returns the chart as SVG markup:

TypeScript:

```ts
let svg = am5.renderToSVG(root);
```

JavaScript:

```js
var svg = am5.renderToSVG(root);
```

It takes an optional second parameter with options:

| Option       | Default            | Comment                                                                            |
| ------------ | ------------------ | ---------------------------------------------------------------------------------- |
| `width`      | Chart width        | Width of the SVG.                                                                  |
| `height`     | Chart height       | Height of the SVG.                                                                 |
| `precision`  | `3`                | Decimal places in coordinates.                                                     |
| `background` |                    | CSS color to fill the background with. Transparent if not set.                     |
| `title`      | Root's `ariaLabel` | Name of the image for screen readers.                                              |
| `idPrefix`   | `"am5-"`           | Prefix for internal ids. Use a different one for each SVG placed on the same page. |

TypeScript:

```ts
let svg = am5.renderToSVG(root, {
  background: "#ffffff",
  title: "Sales by region, 2026"
});
```

JavaScript:

```js
var svg = am5.renderToSVG(root, {
  background: "#ffffff",
  title: "Sales by region, 2026"
});
```

### Exporting a single element

Instead of the root, any element of a chart can be passed, such as a series or a legend. Only that element is exported, in the same place it sits on the chart.

TypeScript:

```ts
let legendSvg = am5.renderToSVG(legend);
```

JavaScript:

```js
var legendSvg = am5.renderToSVG(legend);
```

### Timing

`renderToSVG()` exports the chart as it was last drawn. Changes made just before calling it show up only after the chart has drawn them. To be sure they are included, wait for the next frame:

TypeScript:

```ts
series.set("fill", am5.color(0xff0000));

root.events.once("frameended", function() {
  let svg = am5.renderToSVG(root);
});
```

JavaScript:

```js
series.set("fill", am5.color(0xff0000));

root.events.once("frameended", function() {
  var svg = am5.renderToSVG(root);
});
```

## What gets exported

The same things are left out as in image export:

* Elements with `exportable: false`.
* Images from other domains whose server does not allow cross-origin access (CORS).

Fully transparent elements, which are invisible anyway, are left out too.

A few other things to keep in mind:

* **Text** stays as text, so it can be edited and searched. It is shown in the font set on the chart, so a computer that does not have that font will substitute another.
* **Pictures** are linked by their URL, not embedded. They show only where that URL can be reached.
* **Blend modes** `DST_OVER`, `SRC_ATOP` and `XOR` have no SVG equivalent, and are exported as normal.

> **Note:** In a [Pixel map series](https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/), each polygon's pixels are grouped and labeled with the polygon's `id` and name, so they are easy to find in a design tool.

## Accessibility

Screen readers read an exported SVG as a single image, rather than every label in it. The image is named by the `title` option, or by the root element's `ariaLabel` setting if no title is given.

If neither is set, the image has no name. Set one if the SVG will be shown on a page.
