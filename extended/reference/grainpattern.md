---
title: "GrainPattern"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/grainpattern/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Grain pattern.

Allows to add grain (noise) effect to your `Graphics` objects.

Note, grain pattern does not support `fill` and `color` setting. Use `colors` setting to define colors of a grain pixels.

Note, rotation setting is not supported by this pattern.

_Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Grain_patterns

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.GrainPattern.new(root, { /* settings */ });
```

## Inheritance

Extends: Pattern → Entity → Settings

## Settings and related interfaces

- Settings: `IGrainPatternSettings` — get_api_reference shows it after this page
- Private settings: `IGrainPatternPrivate`

## Properties

Public properties (not settings):

- **canvas** (`HTMLCanvasElement`)
- **context** (`CanvasRenderingContext2D`)
