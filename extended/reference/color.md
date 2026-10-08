---
title: "Color"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/color/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A color. Every color setting takes a `Color` object, usually created with `am5.color()`, e.g. `am5.color(0xff0000)`.

Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/

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
