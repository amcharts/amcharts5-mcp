---
title: "IOKLCH"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ioklch/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

OKLCH color helpers.

OKLCH describes a color by lightness, chroma and hue, derived from Björn Ottosson's OKLab. Unlike in HSL, equal steps of lightness or hue look equally different to the eye, which suits balanced palettes built from one color.

Ranges: • `l` (lightness): 0 (black) .. 1 (white) • `c` (chroma): 0 (gray) .. ~0.37 (most saturated sRGB) • `h` (hue): 0 .. 360 degrees

Docs: https://bottosson.github.io/posts/oklab/

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **l** (`number`) — Lightness, from `0` (black) to `1` (white).
- **c** (`number`) — Chroma, from `0` (gray) to about `0.37` (most saturated).
- **h** (`number`) — Hue, from `0` to `360` degrees.
