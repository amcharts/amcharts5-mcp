---
title: "IPicturePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipicturepatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IPatternSettings
All ancestors: IPatternSettings, IEntitySettings
Settings of: `am5.PicturePattern` (see its page for the class)
TypeScript: `am5.IPicturePatternSettings` (`import type { IPicturePatternSettings } from "@amcharts/amcharts5"`)

## Settings

- **src** (`string`) — A source URI of the image. Can be relative or absolute URL, or data-uri.
- **fit** (`"none" | "image" | "pattern"`) — default `"image"` — How pattern should be sized: • `"image"` (default) - pattern will be sized to actual image dimensions. • `"pattern"` - image will be sized to pattern dimensions. • `"none"` - image will be placed in the pattern, regardless of either dimensions.
- **centered** (`boolean`) — default `true` — Center images.
- **canvas** (`HTMLCanvasElement`)

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IPatternSettings")`) for types, defaults and descriptions.

- _IPatternSettings_: color, colorInherited, colorOpacity, fill, fillInherited, fillOpacity, height, repetition, rotation, strokeDasharray, strokeDashoffset, strokeWidth, width
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
