---
title: "TrianglePattern"
type: "class"
source: "https://docs.amcharts.com/v5/reference/trianglepattern/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Triangle pattern.

Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.TrianglePattern.new(root, { /* settings */ });
```

## Inheritance

Extends: Pattern → Entity → Settings

## Settings and related interfaces

- Settings: `ITrianglePatternSettings` — get_api_reference shows it after this page
- Private settings: `ITrianglePatternPrivate`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll

## Notes

```javascript
columnSeries.columns.template.set("fillPattern", am5.TrianglePattern.new(root, {
  color: am5.color(0xffffff),
  maxWidth: 8,
  maxHeight: 8,
  gap: 6
}));
```

A triangle pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.
