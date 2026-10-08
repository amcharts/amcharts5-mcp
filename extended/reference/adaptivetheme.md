---
title: "AdaptiveTheme"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

"Adaptive": makes a whole series palette from one or two colors. With one, the other colors share an even lightness and spread out over the color wheel; with two, they run as a gradient between them. The first color is always `baseColor` itself, so a brand color appears in the chart.

It is a function rather than a class, so that it can take settings:

```ts
root.setThemes([
  am5themes_Adaptive(root, { baseColor: 0x2c6e91, dark: true })
]);
```

Docs: https://www.amcharts.com/docs/v5/concepts/themes/

## Import

```js
import am5themes_Adaptive from "@amcharts/amcharts5/themes/Adaptive";

am5themes_Adaptive(…);
```

## Signature

```ts
am5themes_Adaptive(root: Root, settings?: IAdaptiveThemeSettings): Theme
```

## Parameters

- **root** (`Root`)
- **settings** (`IAdaptiveThemeSettings`, optional)

## Returns

`Theme`
