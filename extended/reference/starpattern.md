---
title: "StarPattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/starpattern/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Star pattern.

Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.StarPattern.new(root, { /* settings */ });
```

## Inheritance

Extends: Pattern → Entity → Settings

## Settings and related interfaces

- Settings: `IStarPatternSettings` — get_api_reference shows it after this page
- Private settings: `IStarPatternPrivate`

## Notes

```javascript
columnSeries.columns.template.set("fillPattern", am5.StarPattern.new(root, {
  color: am5.color(0xffffff),
  radius: 5,
  innerRadius: am5.percent(50),
  spikes: 5,
  gap: 6
}));
```

A star pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.
