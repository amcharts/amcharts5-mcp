---
title: "IMonochromeThemeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imonochromethemesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Options for `MonochromeTheme`.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Settings

- **color** (`string | number | Color`) — Color whose hue the series ramp is made of, as a hex number, a CSS string or a `Color`. It also colors the primary buttons. If not set, a blue `#2e7c9e` is used.
- **accent** (`string | number | Color`) — A color put before the ramp, so that the first series stands out. Accepts a hex number, a CSS string or a `Color`. With more series than colors, the colors repeat, accent included.
- **dark** (`boolean`) — default `false` — Makes a dark theme: dark interface colors, and a ramp from light to mid shades that shows on the dark background.
- **count** (`number`) — default `7` — Number of shades in the series ramp.
