---
title: "ISvgExportOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isvgexportoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Options for `renderToSVG`.

_Since 5.21.0._

## Inheritance

Extends: (none)
TypeScript: `am5.ISvgExportOptions` (`import type { ISvgExportOptions } from "@amcharts/amcharts5"`)

## Options

- **width** (`number`) — Width of the SVG in pixels. Defaults to the chart's width when a `Root` or an element of a chart is passed.
- **height** (`number`) — Height of the SVG in pixels. Defaults to the chart's height when a `Root` or an element of a chart is passed.
- **precision** (`number`) — default `3` — Decimal places for coordinates.
- **idPrefix** (`string`) — default `"am5-"` — Prefix for ids in `<defs>`; needed when several SVGs share a page.
- **title** (`string`) — Name of the image for screen readers, written as the SVG's `<title>`. Defaults to the chart's `ariaLabel` (`Root` setting), if it has one.
- **background** (`string`) — CSS color to fill the image with, behind the chart. Transparent if not set. _Since 5.21.0._
