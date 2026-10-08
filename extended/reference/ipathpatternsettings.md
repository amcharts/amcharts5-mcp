---
title: "IPathPatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipathpatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.PathPattern` (see its page for the class)
TypeScript: `am5.IPathPatternSettings` (`import type { IPathPatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **svgPath** (`string`) — An SVG path to use as the pattern's motif. Docs: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- **gap** (`number`) — default `0` — Gap between motifs, in pixels.
- **maxWidth** (`number`) — The path is scaled (keeping its aspect ratio) to fit within `maxWidth` x `maxHeight` pixels. Without either, it keeps its own size.
- **maxHeight** (`number`) — The path is scaled (keeping its aspect ratio) to fit within `maxWidth` x `maxHeight` pixels. Without either, it keeps its own size.
- **checkered** (`boolean`) — default `false` — If set to `true`, will place every second motif, creating a checkered pattern.
- **centered** (`boolean`) — default `true` — Center motifs in their grid cell.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, height, repetition, rotation, strokeDasharray, strokeDashoffset, strokeWidth, width
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
