---
title: "SvgDocument"
type: "class"
source: "https://docs.amcharts.com/v5/reference/svgdocument/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Writes SVG markup and collects the `<defs>` it references.

`live` documents are drawn in the browser rather than exported: text is laid out when missing, and content that export leaves out is kept.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **blend** (`boolean`)
- **defs** (`SvgDefs`)
- **href** (`string`)
- **live** (`boolean`)
- **nonExportable** (`boolean`)
- **precision** (`number`)
- **resolution** (`number`)

## Methods

- `clip(mask: SceneGraphics): string`
- `color(kind: string, css: string): string` — A CSS color as a color plus a separate opacity, which more SVG consumers understand than `rgba()`.
- `cssFilter(filter: string, m: Matrix, bounds?: IBounds): string` — A CSS filter with canvas semantics: canvas measures filter lengths in device pixels, unaffected by the element's transform, while SVG measures them in the element's user space.
- `defsMarkup(): string` — `<defs>` content used by this document.
- `matrix(m: Matrix, crisp?: boolean): string`
- `n(value: number): string`
- `paint(kind: "fill" | "stroke", paint: GraphicsPaint): string` — `fill="..."` / `stroke="..."` attributes for a paint.
- `shadow(color: string, blur: number, offsetX: number, offsetY: number, m: Matrix, bounds?: IBounds, extra?: number): string | undefined` — A drop shadow with canvas semantics: offsets and blur are in device pixels, unaffected by the element's transform.
