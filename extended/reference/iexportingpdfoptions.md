---
title: "IExportingPDFOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingpdfoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingImageOptions
All ancestors: IExportingImageOptions, IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **includeData** (`boolean`) — Adds a table of the `dataSource` data below the chart image.
- **imageFormat** (`"png" | "jpg"`) — default `"png"` — Format of the chart image in the PDF.
- **fontSize** (`number`) — default `14` — Font size of the title, the page URL and the data table.
- **align** (`"left" | "center" | "middle"`) — default `"left"` — Horizontal alignment of the chart image on the page: `"left"`, `"center"` or `"right"`.
- **addURL** (`boolean`) — default `true` — Adds the URL of the page the chart was exported from.
- **pageSize** (`pageSizes`) — default `"A4"` — Page size.
- **pageOrientation** (`"landscape" | "portrait"`) — default `"portrait"` — Page orientation.
- **pageMargins** (`number | number[]`) — default `30` — Page margins in points (1/72 inch): one number for all four edges, `[horizontal, vertical]`, or `[left, top, right, bottom]`.
- **font** (`IFont`) — Font of the PDF's text. The default font has only Latin and Cyrillic characters, so text in other scripts needs a font that has them. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-pdf/#Fonts
- **extraFonts** (`IFont[]`) — More fonts to register, for use by individual elements of the document, e.g. from a `pdfdocready` listener. Used only together with `font`. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/exporting-pdf/#Fonts

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingImageOptions")`) for types, defaults and descriptions.

- _IExportingImageOptions_: maintainPixelRatio, maxHeight, maxWidth, minHeight, minWidth, quality
- _IExportingFormatOptions_: disabled
