---
title: "IGradientStop"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igradientstop/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A color stop in a gradient.

Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **color** (`Color`) — Color.
- **offset** (`number`) — Where the color sits along the gradient, from `0` (start) to `1` (end). Stops without an offset are spaced evenly.
- **opacity** (`number`) — default `1` — Opacity of the color, from `0` (transparent) to `1` (opaque).
- **lighten** (`number`) — Lightens the color by this amount, from `-1` to `1`: `0.2` moves it 20% of the way to white. A negative value darkens it. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/#Brightness
- **brighten** (`number`) — Brightens the color by this amount, from `-1` to `1`, adding the same amount to each channel. A negative value dims it. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/#Brightness
- **colorInherited** (`boolean`) — _(internal)_
- **opacityInherited** (`boolean`) — _(internal)_
