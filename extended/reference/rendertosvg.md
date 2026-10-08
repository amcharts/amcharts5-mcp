---
title: "renderToSVG"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A chart as an SVG document, whichever renderer draws it. Leaves out what image export leaves out: elements with `exportable: false` and pictures from other domains without CORS. Fully transparent elements, such as hit areas and a hidden logo, are left out too.

It is the chart as last drawn: changes made in the same tick appear once the chart has drawn them (e.g. call it from the Root's `frameended` event). Drawing the chart first may fire hover events for the pointer's position.

Pass an element, such as a series, to export just that element, where it sits on the chart.

```ts
const svg = am5.renderToSVG(root);
const pixels = am5.renderToSVG(pixelSeries.pixels);
```

_Since 5.21.0._ Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-svg/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.renderToSVG(…);
```

## Signature

```ts
am5.renderToSVG(target: Root | Sprite | IDisplayObject, options?: ISvgExportOptions): string
```

## Parameters

- **target** (`IDisplayObject | Sprite | Root`) — A `Root`, an element of a chart, or a display object (then `width` and `height` are needed)
- **options** (`ISvgExportOptions`, optional) — Size, precision, id prefix, title and background

## Returns

`string` — SVG markup
