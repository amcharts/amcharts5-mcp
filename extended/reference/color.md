---
title: "Color"
type: "class"
source: "https://docs.amcharts.com/v5/reference/color/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
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

## Methods

- `toCSS(alpha?: number): string` — Returns the color as a CSS `rgba(r, g, b, a)` string. Parameters: `alpha`: Opacity, from `0` to `1`. Returns: CSS string
- `toCSSHex(): string` — Returns the color as a CSS hex string, such as `"#ff0000"`. Returns: CSS string
- `toHSL(alpha?: number): $utils.iHSL` — Returns the color's hue, saturation and lightness, each from `0` to `1`. Parameters: `alpha`: Opacity (not used). Returns: HSL info
- `toString(): string`

## Static methods

- `Color.alternative(color: Color, lightAlternative?: Color, darkAlternative?: Color): Color` — Returns `lightAlternative` or `darkAlternative`, whichever contrasts more with `color`: the dark one for a light color, the light one for a dark. Parameters: `color`: Reference color; `lightAlternative`: Light color; `darkAlternative`: Dark color. Returns: Alternative color
- `Color.brighten(color: Color, percent: number): Color` — Returns a new `Color` brightened by `percent`, from `-1` to `1`. Unlike `lighten()`, it adds the same amount to every channel. A negative value dims the color. Parameters: `color`: Source color; `percent`: Amount, from `-1` to `1`. Returns: New color
- `Color.fromAny(s: string | number | Color): Color` — Returns a new `Color` from a hex number, a hex, `rgb()` or `rgba()` string, or another `Color`. Throws an error for anything else. Parameters: `s`: Source. Returns: Color
- `Color.fromCSS(s: string): Color` — Returns a new `Color` from a CSS `rgb()` or `rgba()` string. The alpha part is ignored, and a string it can't read gives black. Parameters: `s`: CSS string. Returns: Color
- `Color.fromHSL(h: number, s: number, l: number): Color` — Returns a new `Color` from hue, saturation and lightness. Parameters: `h`: Hue, from `0` to `1`; `s`: Saturation, from `0` to `1`; `l`: Lightness, from `0` to `1`. Returns: Color object
- `Color.fromHex(hex: number): Color` — Returns a new `Color` from a hex number. Parameters: `hex`: Hex color. Returns: Color
- `Color.fromRGB(r: number, g: number, b: number): Color` — Returns a new `Color` from red, green and blue channels. Parameters: `r`: Red, from `0` to `255`; `g`: Green, from `0` to `255`; `b`: Blue, from `0` to `255`. Returns: Color
- `Color.fromString(s: string): Color` — Returns a new `Color` from a hex string, such as `"#ff0000"` or `"#f00"`. Parameters: `s`: Hex string. Returns: Color
- `Color.interpolate(diff: Time, from: Color, to: Color, mode?: "rgb" | "hsl"): Color` — Returns a color between `from` and `to`. Parameters: `diff`: Position between the two, from `0` (`from`) to `1` (`to`); `from`: Source color; `to`: Target color; `mode`: Mix the `"rgb"` channels or the `"hsl"` values. Returns: Color
- `Color.interpolateColors(position: number, colors: Array<Color>, mode?: "rgb" | "hsl"): Color` — Returns a color on a scale through `colors`, spread evenly: with three colors, `0.5` is the middle one. For example, from bad to good: `[negative, warning, positive]` from the interface colors. Parameters: `position`: Position on the scale, from `0` (the first color) to `1` (the last); `colors`: Colors, in order; `mode`: Mix the `"rgb"` channels or the `"hsl"` values. Returns: Color
- `Color.lighten(color: Color, percent: number): Color` — Returns a new `Color` lightened by `percent`, from `-1` to `1`: `0.2` moves each channel 20% of the way to white. A negative value darkens it toward black. Parameters: `color`: Source color; `percent`: Amount, from `-1` to `1`. Returns: New color
- `Color.saturate(color: Color, percent: number): Color` — Returns a new `Color` with its saturation set to `percent`, from `0` (grey) to `1`. The value replaces the color's saturation rather than adjusting it; `1` returns the color unchanged. Parameters: `color`: Source color; `percent`: Saturation, from `0` to `1`. Returns: New color

## Notes

`am5.color(…)` is the usual shorthand for these constructors. `fromAny()` throws for anything that is not a string, number or `Color`. `alternative()`'s default dark alternative is black.

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
