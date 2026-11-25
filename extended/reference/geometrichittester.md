---
title: "GeometricHitTester"
type: "class"
source: "https://docs.amcharts.com/v5/reference/geometrichittester/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Answers "what is under this point" from geometry, the way the canvas renderer's ghost canvas does, without painting one.

Nodes are tested top-down in ghost paint order: layer 0 in tree order, then each positive layer in ascending order (negative layers are never on the ghost). A node counts only where the ghost would paint it: graphics when interactive, text only when explicitly interactive (by its layout box rather than glyph pixels), circular text per glyph, pictures by their opaque pixels. Masks clip as they clip the ghost.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `hit(root: SceneNode, defaultLayer: ILayer, point: IPoint): SceneNode | undefined`
- `invalidate(): void` — Call after every render: the scene may have changed.
