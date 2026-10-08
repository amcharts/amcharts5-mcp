---
title: "SVGRenderer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/svgrenderer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Draws charts as a live SVG document instead of canvases.

```ts
const root = am5.Root.new("chartdiv", {
  renderer: am5.SVGRenderer
});
```

All layers are in one `<svg>` element. Hit testing is geometric (no hidden canvas); text is measured with an in-page canvas, so it wraps and truncates exactly as with `CanvasRenderer`. Image export paints the same scene with an offscreen `CanvasRenderer`.

Blend modes `DST_OVER`, `SRC_ATOP` and `XOR` are canvas-only: SVG draws them as `NORMAL`.

_Since 5.21.0._ Docs: https://www.amcharts.com/docs/v5/getting-started/root-element/#renderer

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: ArrayDisposer → DisposerClass
