---
title: "IExportingImageOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingimageoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **quality** (`number`) — Quality of the image, `0` to `1`: `1` by default, `0.8` for JPG. Only JPEG images use it.
- **maintainPixelRatio** (`boolean`) — default `false` — Exports the image at the chart's size in CSS pixels. When `false`, it is exported at the screen's resolution: larger on high-density screens. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/#Pixel_ratio
- **minWidth** (`number`) — Minimal width of exported image, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/#Sizing_exported_image
- **maxWidth** (`number`) — Maximal width of exported image, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/#Sizing_exported_image
- **minHeight** (`number`) — Minimal height of exported image, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/#Sizing_exported_image
- **maxHeight** (`number`) — Maximal height of exported image, in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-images/#Sizing_exported_image

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingFormatOptions")`) for types, defaults and descriptions.

- _IExportingFormatOptions_: disabled
