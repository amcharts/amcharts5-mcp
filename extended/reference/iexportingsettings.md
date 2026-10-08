---
title: "IExportingSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5plugins_exporting.Exporting` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **menu** (`ExportingMenu`) — The `ExportingMenu` that offers the formats to the user.
- **backgroundColor** (`Color`) — Background color of exported images. If not set, it is taken from the CSS background of the chart's element, or the nearest parent that has one; white if none does.
- **backgroundOpacity** (`number`) — default `1` — Opacity of the exported image's background: `0` (transparent) to `1` (opaque). JPEG has no transparency. _Since 5.2.34._
- **filePrefix** (`string`) — default `"chart"` _(class default)_ — Name of downloaded files, before the extension.
- **title** (`string`) — Title of the export: the heading of a PDF, the page title when printing and the sheet name in XLSX.
- **charset** (`string`) — default `"utf-8"` _(class default)_ — Charset of exported files.
- **dataFields** (`{ [index: string]: string; }`) — Fields to include in data exports, and their column names: keys are fields in the data, values the column names.
- **dataFieldsOrder** (`string[]`) — default `[]` _(code fallback)_ — Order of the fields in data exports.
- **numericFields** (`string[]`) — default `[]` _(class default)_ — Fields whose numbers are formatted with `numberFormat`.
- **numberFormat** (`string | Intl.NumberFormatOptions`) — Number format for the values in `numericFields`. If not set, they are exported as they are.
- **dateFields** (`string[]`) — default `[]` _(class default)_ — Fields whose numbers are timestamps, exported as dates.
- **dateFormat** (`string | Intl.DateTimeFormatOptions`) — Date format for dates in data exports. If not set, the root's `DateFormatter` format is used.
- **durationFields** (`string[]`) — default `[]` _(class default)_ — Fields whose numbers are durations, formatted with `durationFormat`. _Since 5.0.16._
- **durationFormat** (`string`) — Format for the values in `durationFields`. If not set, the root's `DurationFormatter` format is used. _Since 5.0.16._
- **durationUnit** (`TimeUnit`) — Time unit the values in `durationFields` are in. If not set, the root's `DurationFormatter` `baseUnit` is used. _Since 5.0.16._
- **extraImages** (`(Root | IExportingImageSource)[]`) — default `[]` _(class default)_ — Other charts to add around the main chart in image exports.
- **dataSource** (`any`) — default `[]` _(code fallback)_ — Data for data exports: an array of objects. Without it, the data formats are not offered. Docs: https://www.amcharts.com/docs/v5/concepts/exporting/#Exporting_data
- **pngOptions** (`IExportingImageOptions`) — default `{ quality: 1, maintainPixelRatio: false }` _(class default)_ — PNG format options.
- **jpgOptions** (`IExportingImageOptions`) — default `{ quality: 0.8, maintainPixelRatio: false }` _(class default)_ — JPEG format options.
- **svgOptions** (`IExportingSVGOptions`) — SVG format options. _Since 5.21.0._
- **canvasOptions** (`IExportingImageOptions`) — Options for `exportCanvas()`.
- **pdfOptions** (`IExportingPDFOptions`) — default `{ fontSize: 14, imageFormat: "png", align: "left", addURL: true }` _(class default)_ — PDF format options.
- **pdfdataOptions** (`IExportingDataOptions`) — default `{ emptyAs: "", addColumnNames: true }` _(class default)_ — Options for the PDF with a data table.
- **xlsxOptions** (`IExportingXLSXOptions`) — default `{ emptyAs: "", addColumnNames: true }` _(class default)_ — XLSX format options.
- **csvOptions** (`IExportingCSVOptions`) — default `{ separator: ",", addColumnNames: true, emptyAs: "", addBOM: true }` _(class default)_ — CSV format options.
- **jsonOptions** (`IExportingJSONOptions`) — default `{ indent: 2, renameFields: true }` _(class default)_ — JSON format options.
- **htmlOptions** (`IExportingHTMLOptions`) — default `{ emptyAs: "-", addColumnNames: true }` _(class default)_ — HTML format options.
- **printOptions** (`IExportingPrintOptions`) — default `{ quality: 1, maintainPixelRatio: false, delay: 500, printMethod: "iframe", imageFormat: "png" }` _(class default)_ — Print options.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
