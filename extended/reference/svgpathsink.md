---
title: "SvgPathSink"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/svgpathsink/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Traces path ops into SVG path data (`d`), with Canvas2D semantics: arcs of 2pi or more are full circles, an arc starts with a line from the current point, `arcTo` rounds the corner between two tangents, and `lineTo` / curves without a current point start a subpath.

Arc angles are normalized the way Chromium does it, so the result matches what `CanvasRenderingContext2D` draws.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **d** (`string`)
