---
title: "SvgPathSink"
type: "class"
source: "https://docs.amcharts.com/v5/reference/svgpathsink/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
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

## Methods

- `arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void`
- `arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void`
- `bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): void`
- `clear(): void`
- `closePath(): void`
- `ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void`
- `lineTo(x: number, y: number): void`
- `moveTo(x: number, y: number): void`
- `quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): void`
- `rect(x: number, y: number, width: number, height: number): void`
