---
title: "IGrainPatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igrainpatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.GrainPattern` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **size** (`number`) — default `1` _(theme)_ — Size of a grain in pixels.
- **density** (`number`) — default `1` _(theme)_ — Density of noise. Value range: `0` (no noise applied) to `1` (noise is applied to every pixel). The bigger the value, the higher chance that pixel will have another pixel painted over with random opacity from `minOpacity` to `maxOpacity`.
- **minOpacity** (`number`) — default `0` _(theme)_ — Minimum opacity of a noise pixel.
- **maxOpacity** (`number`) — default `0.2` _(theme)_ — Maximum opacity of a noise pixel.
- **colors** (`Color[]`) — default `[am5.Color.fromHex(0x000000)]` _(theme)_ — An array of colors to randomly use for pixels.
- **horizontalGap** (`number`) — default `0` _(theme)_ — Horizontal gap between noise pixels measured in `size`.
- **verticalGap** (`number`) — default `0` _(theme)_ — Vertical gap between noise pixels measured in `size`.

## Inherited settings with a different default on GrainPattern

- **height** (`number`) — default `200` _(theme)_ — _from IPatternSettings_ — Height of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns
- **width** (`number`) — default `200` _(theme)_ — _from IPatternSettings_ — Width of the pattern tile, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/#Sizing_patterns

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, repetition, rotation, strokeDasharray, strokeDashoffset, strokeWidth
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
