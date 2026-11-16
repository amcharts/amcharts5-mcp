---
title: "Themes"
source: "https://docs.amcharts.com/v5/concepts/themes/"
scraped: "2026-11-16"
---

Themes can be used to apply a collection of settings to chart's elements easily, with a a single line of code.

## Loading

amCharts 5 comes with a few themes you can load and use. They are located in `/themes` directory, and can be loaded as a module or script file:

TypeScript:

```ts
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";
```

JavaScript:

```js
<script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="//cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
```

## Theme list

| Theme name       | Comment                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Adaptive`       | A configurable theme that generates a series palette (and, in dark mode, interface colors) from one or two base colors.                                                            |
| `Animated`       | Using will turn on animations on chart, including zoom, fading in and out, color cross-fades, etc.                                                                                 |
| `Colorblind`     | A color-vision-deficiency-safe palette based on the Okabe-Ito set, distinguishable under common forms of color blindness. Sets series colors only.                                 |
| `ColorblindDark` | Dark-background variant of the `Colorblind` theme.                                                                                                                                 |
| `Dark`           | A theme suitable for dark backgrounds.                                                                                                                                             |
| `Dataviz`        | A theme that adds alternative default colors.                                                                                                                                      |
| `DatavizDark`    | Dark-background variant of the `Dataviz` theme.                                                                                                                                    |
| `Ember`          | A warm dark theme on a near-black ground, with a palette biased toward ambers, oranges, and reds.                                                                                  |
| `Frozen`         | A "cold" color-oriented theme.                                                                                                                                                     |
| `FrozenDark`     | Dark-background variant of the `Frozen` theme.                                                                                                                                     |
| `Kelly`          | A theme that uses highly-contrasting colors.                                                                                                                                       |
| `KellyDark`      | Dark-background variant of the `Kelly` theme.                                                                                                                                      |
| `Material`       | A theme that uses [Material design](https://material.io/design) color palette.                                                                                                     |
| `MaterialDark`   | Dark-background variant of the `Material` theme.                                                                                                                                   |
| `Micro`          | A theme for creating "micro charts" - charts stripped down to a bare minimum (no labels, axes, etc.). Suitable creating charts with very minimal space requirements.               |
| `Midnight`       | A dark theme on a deep-navy ground, with a series palette tuned to read well on it.                                                                                                |
| `Monochrome`     | A configurable single-hue theme that builds the series palette from one base color, with an optional accent and a dark variant.                                                    |
| `Moonrise`       | A theme that adds alternative default colors.                                                                                                                                      |
| `MoonriseDark`   | Dark-background variant of the `Moonrise` theme.                                                                                                                                   |
| `Nord`           | A cool, desaturated, low-contrast theme based on the [Nord](https://www.nordtheme.com/) palette. Pairs with `NordDark`.                                                            |
| `NordDark`       | Dark variant of the `Nord` theme.                                                                                                                                                  |
| `Pastel`         | A soft, low-saturation light theme with a muted pastel series palette. Pairs with `PastelDark`.                                                                                    |
| `PastelDark`     | Dark variant of the `Pastel` theme.                                                                                                                                                |
| `Patterns`       | A theme that fills series with patterns (hatches, dots, stars, triangles, grids) instead of solid colors, so series stay distinguishable by shape alone.                           |
| `PatternsDark`   | Dark-background variant of the `Patterns` theme.                                                                                                                                   |
| `Petroleum`      | A restrained, near-monochrome dark theme: gold on a near-black ground, with a tight gold palette and a single green accent.                                                        |
| `Responsive`     | An older theme that hides parts of the chart at fixed sizes. For new charts, use `ResponsiveMax`. More info [here](https://docs.amcharts.com/v5/concepts/responsive/).                                      |
| `ResponsiveMax`  | Fits charts into small spaces: axis labels, pie labels, legends and scrollbars adapt to the room they have. Use it in every chart. More info [here](https://docs.amcharts.com/v5/concepts/responsive-max/). |
| `Savanna`        | A warm, editorial light theme: a cream/sepia ground with a muted palette of natural accents.                                                                                       |
| `Spirited`       | A theme that adds alternative default colors.                                                                                                                                      |
| `SpiritedDark`   | Dark-background variant of the `Spirited` theme.                                                                                                                                   |

NOTE The `*Dark` variants (`ColorblindDark`, `DatavizDark`, `FrozenDark`, `KellyDark`, `MaterialDark`, `MoonriseDark`, `NordDark`, `PastelDark`, `PatternsDark`, `SpiritedDark`) already carry dark background and interface colors: don't add the `Dark` theme as well.

## Applying

Each chart can have multiple themes applied to it. Start every chart with `Animated` and `ResponsiveMax`, and add color or dark themes after them.

To apply theme(s) to a chart, we use `setThemes()` method of its [root element](https://docs.amcharts.com/v5/getting-started/#root-element), supplying instances of the theme, created with their [`new()` method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax):

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

> **Note:** The order of the themes is important. If two themes set the same setting, the last theme's value will be used.

## Themes with settings

`Adaptive` and `Monochrome` build their colors from settings, passed to `new()` after the root:

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Adaptive.new(root, {
    baseColor: 0x2c6e91,
    interleave: true
  })
]);
```

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Adaptive.new(root, {
    baseColor: 0x2c6e91,
    interleave: true
  })
]);
```

Colors can be given as a hex number, a CSS string, or a `Color` object.

### Adaptive

Makes a whole series palette from one or two colors. With one, the colors share an even lightness and spread out over the color wheel; with two, they run as a gradient between them.

| Setting           | Default    | Comment                                                                                                                                                              |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseColor`       | `0x4b8e39` | The color the palette is built from, and its first color. It also colors the primary buttons, and in dark mode tints the interface colors.                           |
| `baseColor2`      |            | A second color: the palette runs as a gradient from `baseColor` to this one. Without `baseColor`, it is yellow (`0xffdd00`).                                         |
| `count`           | `10`       | Number of series colors.                                                                                                                                             |
| `dark`            | `false`    | A dark theme: dark background, and interface colors faintly tinted with the hue of `baseColor`.                                                                      |
| `interleave`      | `false`    | Takes the colors in an alternating order (1, 4, 2, 5, 3, 6), so neighbouring series differ more. Most useful with `baseColor2`.                                      |
| `mapShade`        | `false`    | Fills map polygons with a mid shade of `baseColor`, as light as a map's default land, instead of `baseColor` itself.                                                 |
| `keepContrast`    | `false`    | Darkens (in dark mode, lightens) colors with too little contrast against the background, keeping their hue: `true` for at least 3:1, or a ratio, e.g. `4.5`.         |
| `repeatLightness` | `0.1`      | Once every color has been used, each new round is this much lighter (`0.1` is 10%; a negative value makes it darker). `false` or `0` repeats the colors as they are. |

### Monochrome

Series colors are an even ramp of shades of one color, from lighter to darker, with an optional accent first.

| Setting           | Default    | Comment                                                                                                                                      |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`           | `0x2e7c9e` | The color whose hue the shades are made of. It also colors the primary buttons.                                                              |
| `accent`          |            | A color put before the shades, so that the first series stands out.                                                                          |
| `count`           | `7`        | Number of shades.                                                                                                                            |
| `dark`            | `false`    | A dark theme: dark interface colors, and shades from light to mid that show on the dark background.                                          |
| `interleave`      | `false`    | Takes the shades in an alternating order (1, 4, 2, 5, 3, 6), so neighbouring series differ more. The `accent` stays first.                   |
| `mapShade`        | `false`    | Fills map polygons with a mid shade of `color`, as light as a map's default land, instead of `color` itself.                                 |
| `keepContrast`    | `false`    | Keeps the shades, the `accent` and the primary buttons at a minimum contrast against the background: `true` for 3:1, or a ratio, e.g. `4.5`. |
| `repeatLightness` | `0.1`      | As in `Adaptive`.                                                                                                                            |

> **Note:** `interleave`, `mapShade` and `keepContrast` are available since version 5.21.2, `repeatLightness` since 5.21.3.

NOTE With `keepContrast`, `Adaptive` moves `baseColor` and `baseColor2` themselves when they have too little contrast, so the first series color is then not exactly `baseColor`. In `Monochrome`, the end of the shades nearest the background moves, so the shades stay evenly spread.

## Repeated colors

Most themes have a fixed list of series colors. Once every color has been used, the list starts again, 10% lighter each round, so a chart with more series than colors does not show the same color twice. `Colorblind` and `Patterns` repeat their colors as they are.

To repeat the colors unchanged, set `repeatLightness` to `0` on the chart's colors (in `Adaptive` and `Monochrome`, use their `repeatLightness: false` setting):

TypeScript:

```ts
chart.get("colors").set("repeatLightness", 0);
```

JavaScript:

```js
chart.get("colors").set("repeatLightness", 0);
```

> **Note:** Since version 5.21.3. Before it, the colors repeated as they are.

## Relation to settings

We can think of themes as collection of defaults.

They will not override the values of the [settings](https://docs.amcharts.com/v5/getting-started/#settings), set by user code.

## Quick custom theme

All elements in the chart are loaded with default setting values. They come from a "default theme".

While we cannot modify default theme directly, we can create a quick theme that overrides certain rules from a default theme.

It works by instantiating an instance of `Theme` class, as well as adding custom rules to it.

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Label").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Label").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

The above will force all labels to be red and sized at `1.5em`.

For more information on how to target elements, as well specify their setting values, refer to "[Rules](https://docs.amcharts.com/v5/concepts/themes/creating-themes/#rules)" section of our "Creating themes" tutorial.

## Creating themes

The limitation of the above approach is that the quick theme cannot be reused across multiple charts.

If you need to create a full-fledged reusable theme, amCharts 5 provides a rally easy and powerful way to it.

Themes allow targeting elements via a variety of queries to set their settings, events, and adapters.

For information on how to create your own custom themes refer to the "[Creating themes](https://docs.amcharts.com/v5/concepts/themes/creating-themes/)" tutorial.

## Default themes

Each root element starts off with a "default theme", which is basically a collection of default setting values for chart elements.

Each chart type, like XY or Percent, also has own "default theme", which is applied to the chart element when it is created, and thus is inherited by all its descendants.

If for some reason, we are using chart elements outside the chart itself, e.g. series-specific markers on an external legend, we will also need to apply chart-specific default theme to the other root element.

TypeScript:

```ts
let root = am5.Root.new("chartdiv");
let legendRoot = am5.Root.new("legenddiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

legendRoot.setThemes([
  am5themes_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
]);
```

JavaScript:

```js
var root = am5.Root.new("chartdiv");
var legendRoot = am5.Root.new("legenddiv");

root.setThemes([
  am5themes_Animated.new(root)
]);

legendRoot.setThemes([
  am5themes_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
]);
```

## Additional info

* [Using "Animated" theme](https://docs.amcharts.com/v5/concepts/animations/#animated-theme)
* [ResponsiveMax theme](https://docs.amcharts.com/v5/concepts/responsive-max/)
* [Using "Responsive" theme](https://docs.amcharts.com/v5/concepts/responsive/)
