---
title: "TrianglePattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/trianglepattern/"
generatedFrom: "@amcharts/amcharts5@5.20.1"
---

Triangle pattern. Draws a grid of triangles, used as a `fillPattern` or `strokePattern` on any element.

Added in 5.20.0.

## Import

```javascript
// Import TrianglePattern
import * as am5 from "@amcharts/amcharts5"
```

## Usage

```javascript
columnSeries.columns.template.set("fillPattern", am5.TrianglePattern.new(root, {
  color: am5.color(0xffffff),
  maxWidth: 8,
  maxHeight: 8,
  gap: 6
}));
```

## Inheritance

Extends: Pattern

> **Note:** This class also inherits all settings, properties, methods, and events from Pattern (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **centered** (`undefined | false | true`) — Default true Center triangles in their grid cell.
- **checkered** (`undefined | false | true`) — Default false If set to true, will place every second triangle, creating a checkered pattern.
- **gap** (`undefined | number`) — Default 6 Gap between triangles, in pixels.
- **maxHeight** (`undefined | number`) — Default 8 Height of the triangle, in pixels.
- **maxWidth** (`undefined | number`) — Default 8 Width of the triangle, in pixels.
- **rotateShapes** (`undefined | false | true`) — Default false If set to true, rotation rotates each triangle around its own center while the grid/tile stays axis-aligned, instead of rotating the whole pattern. This tiles seamlessly (a small width/height is enough) and is much faster than rotating the whole pattern on large tiles.

See `ITrianglePatternSettings` (`reference/itrianglepatternsettings`) for the full settings list including everything inherited from `IPatternSettings`.

## Notes

A triangle pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.
