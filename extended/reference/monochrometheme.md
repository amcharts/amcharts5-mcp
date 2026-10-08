---
title: "MonochromeTheme"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

"Monochrome": a single-hue theme. Its series colors are an even ramp of shades of one color, from lighter to darker, with an optional `accent` first.

It is a function rather than a class, so that it can take settings:

```ts
root.setThemes([
  am5themes_Monochrome(root, { color: 0x2c6e91, dark: true })
]);
```

With nothing set, the ramp is blue (`#2e7c9e`).

Docs: https://www.amcharts.com/docs/v5/concepts/themes/

## Import

```js
import am5themes_Monochrome from "@amcharts/amcharts5/themes/Monochrome";

am5themes_Monochrome(…);
```

## Signature

```ts
am5themes_Monochrome(root: Root, settings?: IMonochromeThemeSettings): Theme
```

## Parameters

- **root** (`Root`)
- **settings** (`IMonochromeThemeSettings`, optional)

## Returns

`Theme`
