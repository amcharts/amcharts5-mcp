---
title: "IRectanglePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irectanglepatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.RectanglePattern` (see its page for the class)
TypeScript: `am5.IRectanglePatternSettings` (`import type { IRectanglePatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **gap** (`number`) — default `6` _(theme)_ — Gap between rectangles, in pixels.
- **maxWidth** (`number`) — default `5` _(theme)_ — Maximum width of the rectangle, in pixels.
- **maxHeight** (`number`) — default `5` _(theme)_ — Maximum height of the rectangle, in pixels.
- **checkered** (`boolean`) — default `false` _(theme)_ — If set to `true`, will place every second rectangle, creating checkered pattern.
- **centered** (`boolean`) — default `true` _(theme)_ — Center rectangles.
- **rotateShapes** (`boolean`) — default `false` — If set to `true`, `rotation` rotates each rectangle around its own center while the grid/tile stays axis-aligned, instead of rotating the whole pattern. This tiles seamlessly (a small `width`/`height` is enough) and is much faster than rotating the whole pattern on large tiles.

## Inherited settings with a different default on RectanglePattern

- **height** (`number`) — default `48` _(theme)_ — _from IPatternSettings_ — Height of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **strokeWidth** (`number`) — default `0` _(theme)_ — _from IPatternSettings_ — Width of the pattern's line elements.
- **width** (`number`) — default `48` _(theme)_ — _from IPatternSettings_ — Width of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, repetition, rotation, strokeDasharray, strokeDashoffset
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
