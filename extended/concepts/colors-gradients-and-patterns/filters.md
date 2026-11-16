---
title: "Filters"
source: "https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/filters/"
scraped: "2026-11-16"
---

amCharts 5 allows applying various filters to its visual elements. This tutorial will explain how we use them.

## Compatibility

> **Important:** Filter functionality is not supported by Safari browsers - both desktop and mobile. This is not a bug, but rather a choice by Apple.

## Built-in filters

There's a number of settings that we can use to apply various visual effects to `Sprite` elements:

| Setting      | Value range  | Comment                                                                                |
| ------------ | ------------ | -------------------------------------------------------------------------------------- |
| `blur`       | `0` to X     | Applies blur effect.                                                                   |
| `brightness` | `0` to `1`   | Modifies "brightness" of the element.                                                  |
| `contrast`   | `0` to `1`   | Modifies contrast.                                                                     |
| `saturate`   | `0` to X     | Modifies color saturation: `0` - grayscale, `1` - no changes, `>1` - more saturated.   |
| `sepia`      | `0` to `1`   | Applies sepia filter: `0` (no changes) to `1` (complete sepia).                        |
| `invert`     | `0` to `1`   | Inverts colors: Range of values: `0` (no changes) to `1` (completely inverted colors). |
| `hue`        | `0` to `360` | Rotates HUE circle of colors.                                                          |

TypeScript:

```ts
series.slices.template.setAll({
  sepia: 1,
  brightness: 0.5
});
```

JavaScript:

```js
series.slices.template.setAll({
  sepia: 1,
  brightness: 0.5
});
```

## SVG filters

We can also use element's `filter` setting to set any [SVG filter](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter).

TypeScript:

```ts
series.slices.template.setAll({
  filter: "drop-shadow(16px 16px 20px blue) sepia(1)"
});
```

JavaScript:

```js
series.slices.template.setAll({
  filter: "drop-shadow(16px 16px 20px blue) sepia(1)"
});
```

## Example

Example: [Chart with SVG filters](https://docs.amcharts.com/embeds/v5/chart-with-svg-filters/). Its code: get_example(path: "examples/docs-demos/chart-with-svg-filters").
