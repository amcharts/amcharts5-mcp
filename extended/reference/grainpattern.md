---
title: "GrainPattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/grainpattern/"
scraped: "2026-03-15"
---

Grain pattern.
 Allows to add grain (noise) effect to your Graphics objects.
 Note, grain pattern does not support fill and color setting.
Use colors setting to define colors of a grain pixels.
 Note, rotation setting is not supported by this pattern.

## Import

```javascript
// Import GrainPattern
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Pattern

> **Note:** This class also inherits all settings, properties, methods, and events from Pattern (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **colors** (`Array`) — Default [color(0x000000)] An array of colors to randomly use for pixels.
- **density** (`undefined | number`) — Default 1 Density of noise. Value range: 0 (no noise applied) to 1 (noise is applied to every pixel). The bigger the value, the higher chance that pixel will have another pixel painted over with random opacity from minOpacity to maxOpacity.
- **horizontalGap** (`undefined | number`) — Default 0 Horizontal gap between noise pixels measured in size.
- **maxOpacity** (`undefined | number`) — Default 0.3 Maximum opacity of a noise pixel.
- **minOpacity** (`undefined | number`) — Default 0 Minimum opacity of a noise pixel.
- **size** (`undefined | number`) — Default 1 Size of a grain in pixels.
- **verticalGap** (`undefined | number`) — Default 0 Vertical gap between noise pixels measured in size.

## Properties

- **canvas** (`HTMLCanvasElement`) — Default document.createElement("canvas")
- **context** (`CanvasRenderingContext2D`) — Default this.canvas.getContext("2d")!
