---
title: "Responsive charts"
source: "https://docs.amcharts.com/v5/concepts/responsive-charts/"
scraped: "2026-11-16"
---

> Two themes make charts adapt to their size: ResponsiveMax for every chart, Responsive for rules of your own.

amCharts 5 has two themes that make a chart adapt to the room it has.

| Theme                                           | Use it                                         | How it works                                                                                                                         |
| ----------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [`ResponsiveMax`](https://docs.amcharts.com/v5/concepts/responsive-max/) | In every chart. Apply it and you're done.      | Labels, legends and scrollbars fit to the room they have, at any size. Parts are hidden only as the last step. Since version 5.22.0. |
| [`Responsive`](https://docs.amcharts.com/v5/concepts/responsive/)        | To decide yourself what changes at which size. | Rules you write: when a condition is met, e.g. the chart is 400 px wide or less, it overrides settings of the elements you pick.     |

## ResponsiveMax: for every chart

Add it next to the `Animated` theme. No setup:

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

What it changes, and how to turn parts off: "[ResponsiveMax theme](https://docs.amcharts.com/v5/concepts/responsive-max/)".

## Responsive: your own rules

Start empty and add rules for exactly what should change:

JavaScript:

```js
const responsive = am5themes_Responsive.newEmpty(root);

responsive.addRule({
  name: "AxisRendererY",
  relevant: am5themes_Responsive.widthM,
  settings: {
    inside: true
  }
});

root.setThemes([
  am5themes_Animated.new(root),
  responsive
]);
```

TypeScript:

```ts
const responsive = am5themes_Responsive.newEmpty(root);

responsive.addRule({
  name: "AxisRendererY",
  relevant: am5themes_Responsive.widthM,
  settings: {
    inside: true
  }
});

root.setThemes([
  am5themes_Animated.new(root),
  responsive
]);
```

`Responsive.new()` instead of `newEmpty()` also adds its built-in rules, which hide labels, legends and other parts at fixed sizes.

Rules, conditions and breakpoints: "[Responsive theme](https://docs.amcharts.com/v5/concepts/responsive/)".

## Both together

`ResponsiveMax` takes rules of your own too, with the same `addRule()`. Use it as the base and add rules for what it doesn't cover.
