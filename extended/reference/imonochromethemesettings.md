---
title: "IMonochromeThemeSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imonochromethemesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.3"
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
- **interleave** (`boolean`) — default `false` — Takes the shades in an alternating order (1, 4, 2, 5, 3, 6), so series next to each other differ more. The `accent` stays first.
- **mapShade** (`boolean`) — default `false` — Fills map polygons with a mid shade of `color`, as light as a map's default land, instead of `color` itself.
- **keepContrast** (`number | boolean`) — default `false` — Keeps the shades, the `accent` and the primary buttons at a minimum contrast against the background: `true` for 3:1, or a ratio, e.g. `4.5`. The end of the ramp nearest the background moves away from it, and the other shades spread out evenly up to it.
- **repeatLightness** (`number | boolean`) — default `0.1` — Once every color has been used, each new round of colors is this much lighter (HSL lightness: `0.1` is 10%; a negative value makes it darker) instead of the same colors again. `true` is `0.1`; `false` or `0` repeats the colors as they are.
