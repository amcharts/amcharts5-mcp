---
title: "PictorialStackedSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pictorialstackedseries/"
scraped: "2026-03-15"
---

Creates a pictorial series for use in a SlicedChart.

## Import

```javascript
// Import PictorialStackedSeries
import * as am5percent from "@amcharts/amcharts5/percent"
```

## Inheritance

Extends: PyramidSeries

> **Note:** This class also inherits all settings, properties, methods, and events from PyramidSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **svgPath** (`undefined | string`) — An SVG path that will define the shape of the pictorial series. Click here for more info

## Properties

- **seriesGraphics** (`Graphics`) — Default this.slicesContainer.children.push(Graphics.new(this._root, { themeTags: ["pictorial", "background"], position: "absolute", x: p50, y: p50, centerX: p50, centerY: p50 }))
- **seriesMask** (`Graphics`) — Default Graphics.new(this._root, { position: "absolute", x: p50, y: p50, centerX: p50, centerY: p50 }) A Graphics element to used as a mask (shape) for the series. This element is read-only. To modify the mask/shape, use the svgPath setting.
