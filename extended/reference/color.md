---
title: "Color"
type: "class"
source: "https://docs.amcharts.com/v5/reference/color/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

A color. Every color setting takes a `Color` object, usually created with `am5.color()`, e.g. `am5.color(0xff0000)`.

Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **b** (`number`) — The blue channel, from `0` to `255`.
- **g** (`number`) — The green channel, from `0` to `255`.
- **hex** (`number`) — The color as a number, such as `0xff0000`.
- **r** (`number`) — The red channel, from `0` to `255`.

## Notes

The generator does not list class methods yet, so these are `Color`'s static helpers (from the 5.21.2 typings), called as `am5.Color.<name>(…)`:

- `fromHex(hex: number)`, `fromString(s: string)` (`"#ff0000"` / `"#f00"`), `fromRGB(r, g, b)`, `fromHSL(h, s, l)`, `fromCSS(s: string)` (`rgb()` / `rgba()`; alpha ignored, unreadable gives black), `fromAny(s: string | number | Color)` (throws for anything else) — make a `Color`. `am5.color(…)` is the usual shorthand.
- `interpolate(diff, from, to, mode?: "rgb" | "hsl")` — a color between two colors.
- `interpolateColors(position, colors, mode?)` — a color on a scale through any number of colors, spread evenly (`position` 0–1; with three colors `0.5` is the middle one), e.g. `[negative, warning, positive]` from `root.interfaceColors` for a bad-to-good scale. Added in 5.21.2.
- `lighten(color, percent)` — toward white (`-1`…`1`; negative darkens); `brighten(color, percent)` — adds the same amount to every channel; `saturate(color, percent)` — sets saturation (`0` grey … `1`).
- `alternative(color, lightAlternative?, darkAlternative?)` — whichever alternative contrasts more with `color` (default dark alternative black since 5.21.0).

## Function `am5.color()`

Returns a new `Color` from a hex number, or a CSS hex, `rgb()` or `rgba()` string (color names such as `"red"` are not accepted):

• `"#f00"` • `"#ff0000"` • `"rgb(255, 0, 0)"` • `"rgba(255, 0, 0, 1)"` • `0xff0000`

### Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.color(…);
```

### Signature

```ts
am5.color(input: number | string): Color
```

### Parameters

- **input** (`string | number`) — Input color

### Returns

`Color` — Color
