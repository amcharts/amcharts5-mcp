---
title: "ITrianglePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itrianglepatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.TrianglePattern` (see its page for the class)
TypeScript: `am5.ITrianglePatternSettings` (`import type { ITrianglePatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **gap** (`number`) — default `0` — Gap between triangles, in pixels.
- **maxWidth** (`number`) — default `8` — Width of the triangle, in pixels.
- **maxHeight** (`number`) — default `8` — Height of the triangle, in pixels.
- **checkered** (`boolean`) — default `false` — If set to `true`, will place every second triangle, creating a checkered pattern.
- **centered** (`boolean`) — default `true` — Center triangles in their grid cell.
- **rotateShapes** (`boolean`) — default `false` — If set to `true`, `rotation` rotates each triangle around its own center while the grid/tile stays axis-aligned, instead of rotating the whole pattern. This tiles seamlessly (a small `width`/`height` is enough) and is much faster than rotating the whole pattern on large tiles.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, height, repetition, rotation, strokeDasharray, strokeDashoffset, strokeWidth, width
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
