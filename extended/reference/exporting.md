---
title: "Exporting"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/exporting/"
scraped: "2026-03-15"
---

A plugin that can be used to export chart snapshots and data.

## Import

```javascript
// Import Exporting
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **backgroundColor** (`Color`) — Export will try to determine background color based on the DOM styles. You can use this setting to explicitly specify background color for exported images.
- **backgroundOpacity** (`undefined | number`) — Opacity of the exported image background. 0 - fully transparent. 1 - fully opaque (default). NOTE: some image formats like JPEG do not support transparency. @since 5.2.34
- **canvasOptions** (`IExportingImageOptions`) — Canvas format options.
- **charset** (`undefined | string`) — Default "utf-8" Charset to use for export.
- **csvOptions** (`IExportingCSVOptions`) — CSV format options.
- **dataFields** (`undefined | object`) — Fields to include in data export. Key - field in data. Value - column name.
- **dataFieldsOrder** (`string[]`) — Specifies the order of fields to export in data.
- **dataSource** (`any`) — Data to export. Click here for more info
- **dateFields** (`string[]`) — Fields in data that have date/time value.
- **dateFormat** (`string | DateTimeFormatOptions`) — Use this date format on date values.
- **durationFields** (`string[]`) — Fields in data that need to be formatted as "duration" as per durationFormat. @since 5.0.16
- **durationFormat** (`undefined | string`) — Format to use when formatting values in durationFields. If not set, will use durationFormat as set in DurationFormatter of the root element. @since 5.0.16
- **durationUnit** (`TimeUnit`) — Time unit to assume duration values are in. If not set, will use baseUnit as set in DurationFormatter of the root element. @since 5.0.16
- **extraImages** (`Array`) — Include these images or other charts in image exports.
- **filePrefix** (`undefined | string`) — Default "chart" A string to prefix exported files with.
- **htmlOptions** (`IExportingHTMLOptions`) — HTML format options.
- **jpgOptions** (`IExportingImageOptions`) — JPEG format options.
- **jsonOptions** (`IExportingJSONOptions`) — JSON format options.
- **menu** (`ExportingMenu`) — A reference to ExportingMenu object.
- **numberFormat** (`string | NumberFormatOptions`) — Use this number format on numeric values.
- **numericFields** (`string[]`) — Fields in data that are numeric.
- **pdfOptions** (`IExportingPDFOptions`) — PDF format options.
- **pdfdataOptions** (`IExportingDataOptions`) — PDF with data table format options.
- **pngOptions** (`IExportingImageOptions`) — PNG format options.
- **printOptions** (`IExportingPrintOptions`) — Print options.
- **title** (`undefined | string`) — Chart title. Used for print, PDF and Excel exports.
