---
title: "IColorSetSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolorsetsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.ColorSet` (see its page for the class)
TypeScript: `am5.IColorSetSettings` (`import type { IColorSetSettings } from "@amcharts/amcharts5"`)

## Settings

- **colors** (`Color[]`) — default `[am5.Color.fromHex(0x67b7dc)]` _(theme)_ — The colors in the set. Generated colors are added to this list.
- **step** (`number`) — default `1` _(theme)_ — How many positions `next()` moves each time: `2` returns every second color.
- **startIndex** (`number`) — default `0` _(theme)_ — Index of the color the first `next()` returns, and `reset()` goes back to.
- **reuse** (`boolean`) — default `false` _(theme)_ — Repeats the list from the start when it runs out, instead of generating new colors.
- **baseColor** (`Color`) — A base color to generate new colors from if `colors` is not set.
- **passOptions** (`IColorSetStepOptions`) — default `{ hue: 0.05, saturation: 0, lightness: 0 }` _(theme)_ — How the colors generated when the list runs out differ from the original list. Each time the list runs out, a new pass of colors is added, shifted by these amounts once more.
- **saturation** (`number`) — Saturation for every color the set returns, from `0` (grey) to `1`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
