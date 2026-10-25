---
title: "IExportingImageOptions"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iexportingimageoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

## Inheritance

Extends: IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **quality** (`number`) — Quality of the image, `0` to `1`: `1` by default, `0.8` for JPG. Only JPEG images use it.
- **maintainPixelRatio** (`boolean`) — default `false` — Exports the image at the chart's size in CSS pixels. When `false`, it is exported at the screen's resolution: larger on high-density screens. Docs: https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#pixel-ratio
- **minWidth** (`number`) — Minimal width of exported image, in pixels. Docs: https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#sizing-exported-image
- **maxWidth** (`number`) — Maximal width of exported image, in pixels. Docs: https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#sizing-exported-image
- **minHeight** (`number`) — Minimal height of exported image, in pixels. Docs: https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#sizing-exported-image
- **maxHeight** (`number`) — Maximal height of exported image, in pixels. Docs: https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#sizing-exported-image

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingFormatOptions")`) for types, defaults and descriptions.

- _IExportingFormatOptions_: disabled
