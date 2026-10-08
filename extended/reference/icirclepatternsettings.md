---
title: "ICirclePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icirclepatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.CirclePattern` (see its page for the class)
TypeScript: `am5.ICirclePatternSettings` (`import type { ICirclePatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **gap** (`number`) — default `5` _(theme)_ — Gap between circles, in pixels.
- **radius** (`number`) — default `3` _(theme)_ — Radius of the circles, in pixels.
- **checkered** (`boolean`) — default `false` _(theme)_ — If set to `true`, will place every second circle, creating checkered pattern.
- **centered** (`boolean`) — default `false` _(theme)_ — Center circles.

## Inherited settings with a different default on CirclePattern

- **height** (`number`) — default `45` _(theme)_ — _from IPatternSettings_ — Height of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **strokeWidth** (`number`) — default `0` _(theme)_ — _from IPatternSettings_ — Width of the pattern's line elements.
- **width** (`number`) — default `45` _(theme)_ — _from IPatternSettings_ — Width of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, repetition, rotation, strokeDasharray, strokeDashoffset
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
