---
title: "Themes"
source: "https://www.amcharts.com/docs/v5/concepts/themes/"
scraped: "2026-03-15"
updated: "2026-08-05"
updatedFor: "@amcharts/amcharts5@5.20.1"
---

Themes can be used to apply a collection of settings to chart's elements easily, with a a single line of code.

## Loading

amCharts 5 comes with a few themes you can load and use. They are located in `/themes` directory, and can be loaded as a module or script file:

import am5themes\_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes\_Micro from "@amcharts/amcharts5/themes/Micro";

<script src="//cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="//cdn.amcharts.com/lib/5/themes/Micro.js"></script>

## Theme list

Theme name

Comment

`Animated`

Using will turn on animations on chart, including zoom, fading in and out, color cross-fades, etc.

`Dark`

A theme suitable for dark backgrounds.

`Dataviz`

A theme that adds alternative default colors.

`Frozen`

A "cold" color-oriented theme.

`Kelly`

A theme that uses highly-contrasting colors.

`Material`

A theme that uses [Material design](https://material.io/design) color palette.

`Micro`

A theme for creating "micro charts" - charts stripped down to a bare minimum (no labels, axes, etc.). Suitable creating charts with very minimal space requirements.

`Moonrise`

A theme that adds alternative default colors.

`Responsive`

A theme that can be used to enable responsive features of the chart - adapting settings based on available space. More info [here](https://www.amcharts.com/docs/v5/concepts/responsive/).

`Spirited`

A theme that adds alternative default colors.

## Themes added in 5.20.0

The list above is the pre-5.20 set. Version 5.20.0 added a large batch of palette themes, dark variants, and two parameterized themes. All live in `/themes` and load exactly like the others.

### New palette themes

Theme name

Comment

`Colorblind`

A color-blindness-safe palette based on the Okabe-Ito color set.

`Ember`

A warm, fire-oriented palette.

`Midnight`

A dark theme.

`Nord`

A palette based on the Nord color scheme.

`Pastel`

A soft, low-saturation palette.

`Patterns`

Uses pattern fills instead of flat colors — useful for print, monochrome output, and accessibility.

`Petroleum`

A deep blue-green palette.

`Savanna`

A warm, earthy palette.

### New dark variants

Dark counterparts were added for most palette themes: `ColorblindDark`, `DatavizDark`, `FrozenDark`, `KellyDark`, `MaterialDark`, `MoonriseDark`, `NordDark`, `PastelDark`, `PatternsDark`, `SpiritedDark`.

Each already carries dark background and interface colors, so you should NOT additionally apply the `Dark` theme when using one.

### Parameterized themes: `Monochrome` and `Adaptive`

These two themes generate their palette from colors you supply, using OKLCH so the result stays perceptually balanced (even lightness/chroma, evenly spread hues). Because a theme cannot take constructor parameters, they ship as **factory functions** — call them with `(root, settings)`. A `.new(root, settings)` alias also works.

Both are additive: they do not modify any built-in theme.

`Monochrome` — a single-hue lightness ramp:

```javascript
import am5themes_Monochrome from "@amcharts/amcharts5/themes/Monochrome";

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Monochrome(root, {
    color: 0x2c6e91,    // base color of the ramp; hex number, CSS string, or Color. Default: #2e7c9e (blue)
    accent: 0xff7f0e,   // optional: applied to the FIRST series only, so one series stands out
    count: 7,           // number of steps in the ramp. Default: 7
    dark: false         // true = dark background + interface colors, ramp runs light-to-mid. Default: false
  })
]);
```

`Adaptive` — a full palette generated from one or two base colors:

```javascript
import am5themes_Adaptive from "@amcharts/amcharts5/themes/Adaptive";

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Adaptive(root, {
    baseColor: 0x2c6e91,   // primary base color. The FIRST generated color is this color,
                           // so a brand color always appears in the chart.
                           // Default: green-to-yellow (#4b8e39 first, #ffdd00 last)
    baseColor2: 0xffdd00,  // optional: palette spans the two colors, interpolated in OKLCH,
                           // instead of fanning out from a single hue
    count: 10,             // number of series colors to generate. Default: 10
    dark: false            // true = faintly base-tinted dark background + matching interface colors
  })
]);
```

## Applying

Each chart can have multiple themes applied to it.

To apply theme(s) to a chart, we use `setThemes()` method of its [root element](https://www.amcharts.com/docs/v5/getting-started/#Root_element), supplying instances of the theme, created with their [`new()` method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax):

root.setThemes(\[
  am5themes\_Animated.new(root),
  am5themes\_Micro.new(root)
\]);

root.setThemes(\[
  am5themes\_Animated.new(root),
  am5themes\_Micro.new(root)
\]);

NOTE The order of the themes is important. If two themes set the same setting, the last theme's value will be used.

## Relation to settings

We can think of themes as collection of defaults.

They will not override the values of the [settings](https://www.amcharts.com/docs/v5/getting-started/#Settings), set by user code.

## Quick custom theme

All elements in the chart are loaded with default setting values. They come from a "default theme".

While we cannot modify default theme directly, we can create a quick theme that overrides certain rules from a default theme.

It works by instantiating an instance of `Theme` class, as well as adding custom rules to it.

const myTheme = am5.Theme.new(root);

myTheme.rule("Label").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

var myTheme = am5.Theme.new(root);

myTheme.rule("Label").setAll({
  fill: am5.color(0xFF0000),
  fontSize: "1.5em"
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

The above will force all labels to be red and sized at `1.5em`.

For more information on how to target elements, as well specify their setting values, refer to "[Rules](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/#Rules)" section of our "Creating themes" tutorial.

## Creating themes

The limitation of the above approach is that the quick theme cannot be reused across multiple charts.

If you need to create a full-fledged reusable theme, amCharts 5 provides a rally easy and powerful way to it.

Themes allow targeting elements via a variety of queries to set their settings, events, and adapters.

For information on how to create your own custom themes refer to the "[Creating themes](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/)" tutorial.

## Default themes

Each root element starts off with a "default theme", which is basically a collection of default setting values for chart elements.

Each chart type, like XY or Percent, also has own "default theme", which is applied to the chart element when it is created, and thus is inherited by all its descendants.

If for some reason, we are using chart elements outside the chart itself, e.g. series-specific markers on an external legend, we will also need to apply chart-specific default theme to the other root element.

let root = am5.Root.new("chartdiv");
let legendRoot = am5.Root.new("legenddiv");

root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

legendRoot.setThemes(\[
  am5themes\_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
\]);

var root = am5.Root.new("chartdiv");
var legendRoot = am5.Root.new("legenddiv");

root.setThemes(\[
  am5themes\_Animated.new(root)
\]);

legendRoot.setThemes(\[
  am5themes\_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
\]);

## Additional info

-   [Using "Animated" theme](https://www.amcharts.com/docs/v5/concepts/animations/#Animated_theme)
-   [Using "Responsive" theme](https://www.amcharts.com/docs/v5/concepts/responsive/)
