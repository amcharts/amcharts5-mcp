---
title: "IAdaptiveThemeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iadaptivethemesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.2"
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
- **interleave** (`boolean`) — default `false` — Takes the colors in an alternating order (1, 4, 2, 5, 3, 6), so series next to each other differ more. Most useful with `baseColor2`, whose gradient puts similar colors side by side.
- **mapShade** (`boolean`) — default `false` — Fills map polygons with a mid shade of `baseColor`, as light as a map's default land, instead of `baseColor` itself.
- **keepContrast** (`number | boolean`) — default `false` — Lightens (in dark mode) or darkens colors that would have too little contrast with the background, keeping their hue: `true` for at least 3:1, or a ratio, e.g. `4.5`. Applies to the series colors, `baseColor` and `baseColor2` included, and the primary buttons.
