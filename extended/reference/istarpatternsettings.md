---
title: "IStarPatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istarpatternsettings/"
generatedFrom: "@amcharts/amcharts5@5.20.1"
---

Settings for `StarPattern` (added in 5.20.0).

## Inheritance

Extends: IPatternSettings

> **Note:** This interface also inherits all settings from IPatternSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent interface name to see inherited members.

## Properties

- **centered** (`undefined | false | true`) — Default true Center stars in their grid cell.
- **checkered** (`undefined | false | true`) — Default false If set to true, will place every second star, creating a checkered pattern.
- **gap** (`undefined | number`) — Default 6 Gap between stars, in pixels.
- **innerRadius** (`undefined | number | Percent`) — Default 50% Inner radius of the star. Either an absolute pixel value or a percent of radius.
- **radius** (`undefined | number`) — Default 5 Outer radius of the star, in pixels.
- **rotateShapes** (`undefined | false | true`) — Default false If set to true, rotation rotates each star around its own center while the grid/tile stays axis-aligned, instead of rotating the whole pattern. This tiles seamlessly (a small width/height is enough) and is much faster than rotating the whole pattern on large tiles.
- **spikes** (`undefined | number`) — Default 5 Number of spikes.

### Inherited from IPatternSettings

- **color** (`Color`) — Color of the pattern shape.
- **colorOpacity** (`undefined | number`) — Opacity of the pattern shape.
- **fill** (`Color`) — Color to fill gaps between pattern shapes.
- **fillOpacity** (`undefined | number`) — Opacity of the fill for gaps between pattern shapes.
- **height** (`undefined | number`) — Height of the pattern tile, in pixels.
- **repetition** (`"repeat" | "repeat-x" | "repeat-y" | "no-repeat"`) — How pattern tiles are repeated when filling the area.
- **rotation** (`undefined | number`) — Default 0 Rotation of pattern in degrees. Supported values: -90 to 90. See also `rotateShapes`.
- **strokeDasharray** (`number[] | number`) — Stroke (border or line) dash settings.
- **strokeDashoffset** (`undefined | number`) — Stroke (border or line) dash offset.
- **strokeWidth** (`undefined | number`) — Default 1 Width of the pattern's line elements.
- **width** (`undefined | number`) — Width of the pattern tile, in pixels.
