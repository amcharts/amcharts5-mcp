---
title: "PathPattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/pathpattern/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A pattern that repeats an SVG path as a motif on a grid.

Note: `rotation` rotates each motif around its own centre (the grid stays axis-aligned), so the pattern tiles seamlessly at any angle.

The tile is one grid cell, unless `width` and `height` are set: then that is the tile, as before 5.20.0.

_Since 5.2.33._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.PathPattern.new(root, { /* settings */ });
```

## Inheritance

Extends: Pattern → Entity → Settings

## Settings and related interfaces

- Settings: `IPathPatternSettings` — get_api_reference shows it after this page
- Private settings: `IPathPatternPrivate`

## Properties

Public properties (not settings):

- **canvas** (`HTMLCanvasElement`)
- **context** (`CanvasRenderingContext2D`)
