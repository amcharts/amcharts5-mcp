---
title: "IExportingPrintOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingprintoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingImageOptions
All ancestors: IExportingImageOptions, IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **delay** (`number`) — default `500` — With `"iframe"` printing, how long in milliseconds to wait before opening the print dialog, so the image is ready. With `"css"`, how long the page stays hidden for printing.
- **printMethod** (`"css" | "iframe"`) — default `"iframe"` — How to print. If one doesn't work in your setup, try the other. • `"iframe"`: prints the image from a hidden `<iframe>`. • `"css"`: hides the rest of the page with CSS while it prints.
- **imageFormat** (`"png" | "jpg"`) — default `"png"` — Image format to print.

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingImageOptions")`) for types, defaults and descriptions.

- _IExportingImageOptions_: maintainPixelRatio, maxHeight, maxWidth, minHeight, minWidth, quality
- _IExportingFormatOptions_: disabled
