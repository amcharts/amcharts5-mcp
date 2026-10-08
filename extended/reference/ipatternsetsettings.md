---
title: "IPatternSetSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipatternsetsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.PatternSet` (see its page for the class)
TypeScript: `am5.IPatternSetSettings` (`import type { IPatternSetSettings } from "@amcharts/amcharts5"`)

## Settings

- **patterns** (`Pattern[]`) — default `[]` _(code fallback)_ — The patterns in the set. A built-in list of 16 patterns if not set.
- **step** (`number`) — default `1` _(theme)_ — How many positions `next()` moves each time: `2` returns every second pattern.
- **color** (`Color`) — default `root.interfaceColors.get("stroke")` _(theme)_ — Color of the built-in patterns, used when `patterns` is not set. Changing it after the set is created has no effect. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Colors
- **startIndex** (`number`) — default `0` — Index of the pattern the first `next()` returns, and `reset()` goes back to.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
