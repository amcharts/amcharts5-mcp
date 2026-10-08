---
title: "IAdaptiveThemeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iadaptivethemesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Options for `AdaptiveTheme`.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Settings

- **baseColor** (`string | number | Color`) — The color the palette is built from, and its first color, as a hex number, a CSS string or a `Color`. It also colors the primary buttons, and in dark mode tints all interface colors. If not set, green `#4b8e39` is used, and `baseColor2` defaults to yellow `#ffdd00`.
- **baseColor2** (`string | number | Color`) — A second color: the palette then runs as a gradient from `baseColor` to this one, instead of spreading out over the color wheel.
- **count** (`number`) — default `10` — Number of series colors to make.
- **dark** (`boolean`) — default `false` — Makes a dark theme, with a dark background and interface colors faintly tinted with the hue of `baseColor`.
