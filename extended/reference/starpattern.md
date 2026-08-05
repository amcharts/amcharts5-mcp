---
title: "StarPattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/starpattern/"
generatedFrom: "@amcharts/amcharts5@5.20.1"
---

Star pattern. Draws a grid of stars, used as a `fillPattern` or `strokePattern` on any element.

Added in 5.20.0.

## Import

```javascript
// Import StarPattern
import * as am5 from "@amcharts/amcharts5"
```

## Usage

```javascript
columnSeries.columns.template.set("fillPattern", am5.StarPattern.new(root, {
  color: am5.color(0xffffff),
  radius: 5,
  innerRadius: am5.percent(50),
  spikes: 5,
  gap: 6
}));
```

## Inheritance

Extends: Pattern

> **Note:** This class also inherits all settings, properties, methods, and events from Pattern (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **centered** (`undefined | false | true`) — Default true Center stars in their grid cell.
- **checkered** (`undefined | false | true`) — Default false If set to true, will place every second star, creating a checkered pattern.
- **gap** (`undefined | number`) — Default 6 Gap between stars, in pixels.
- **innerRadius** (`undefined | number | Percent`) — Default 50% Inner radius of the star. Either an absolute pixel value or a percent of radius.
- **radius** (`undefined | number`) — Default 5 Outer radius of the star, in pixels.
- **rotateShapes** (`undefined | false | true`) — Default false If set to true, rotation rotates each star around its own center while the grid/tile stays axis-aligned, instead of rotating the whole pattern. This tiles seamlessly (a small width/height is enough) and is much faster than rotating the whole pattern on large tiles.
- **spikes** (`undefined | number`) — Default 5 Number of spikes.

See `IStarPatternSettings` (`reference/istarpatternsettings`) for the full settings list including everything inherited from `IPatternSettings`.

## Notes

A star pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.
