---
title: "IPatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.Pattern` (see its page for the class)
TypeScript: `am5.IPatternSettings` (`import type { IPatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **rotation** (`number`) — default `0` _(theme)_ — Rotation of pattern in degrees. Supported values: -90 to 90. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Rotation
- **repetition** (`"repeat" | "repeat-x" | "repeat-y" | "no-repeat"`) — default `"repeat"` _(theme)_ — How pattern tiles are repeated when filling the area. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Repetition
- **width** (`number`) — default `50` _(theme)_ — Width of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **height** (`number`) — default `50` _(theme)_ — Height of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **color** (`Color`) — Color of the pattern shape. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **colorOpacity** (`number`) — Opacity of the pattern shape. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **strokeWidth** (`number`) — default `1` — Width of the pattern's line elements.
- **strokeDasharray** (`number | number[]`) — Stroke (border or line) dash settings. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Dashed_lines
- **strokeDashoffset** (`number`) — Stroke (border or line) dash offset. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Dashed_lines
- **fill** (`Color`) — Color to fill gaps between pattern shapes. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **fillOpacity** (`number`) — default `1` _(theme)_ — Opacity of the fill for gaps between pattern shapes. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **colorInherited** (`boolean`) — _(internal)_
- **fillInherited** (`boolean`) — _(internal)_

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
