---
title: "ILinePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilinepatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.LinePattern` (see its page for the class)
TypeScript: `am5.ILinePatternSettings` (`import type { ILinePatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **gap** (`number`) — default `6` _(theme)_ — Gap between lines, in pixels.
- **angle** (`number`) — default `0` — Line drawing angle in degrees. For line patterns it's better than using rotation of the whole pattern, allowing smaller pattern sizes. _Since 5.14._

## Inherited settings with a different default on LinePattern

- **colorOpacity** (`number`) — default `1` _(theme)_ — _from IPatternSettings_ — Opacity of the pattern shape. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **height** (`number`) — default `49` _(theme)_ — _from IPatternSettings_ — Height of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **width** (`number`) — default `49` _(theme)_ — _from IPatternSettings_ — Width of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, fill, fillInherited, fillOpacity, repetition, rotation, strokeDasharray, strokeDashoffset, strokeWidth
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
