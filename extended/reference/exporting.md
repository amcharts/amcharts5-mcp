---
title: "Exporting"
type: "class"
source: "https://docs.amcharts.com/v5/reference/exporting/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A plugin that exports the chart as an image, PDF or print, and its data as JSON, CSV, XLSX, HTML or a PDF table.

Docs: https://docs.amcharts.com/v5/concepts/exporting/

## Import

```js
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

am5plugins_exporting.Exporting.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IExportingSettings` — get_api_reference shows it after this page
- Private settings: `IExportingPrivate`
- Events: `IExportingEvents`

## Methods

- `download(format: ExportingFormats, customOptions?: IExportingFormatOptions): Promise<void>` — Exports the chart or its data in a format and downloads the file, named `filePrefix` plus the format's extension. Parameters: `format`: Format; `customOptions`: Format options, over the format's own options setting.
- `export(format: ExportingFormats, customOptions?: IExportingFormatOptions): Promise<string>` — Exports the chart or its data in a format, as a data URI. Parameters: `format`: Format; `customOptions`: Format options, over the format's own options setting. Returns: Promise of the data URI
- `exportCSV(customOptions?: IExportingCSVOptions): Promise<string>` — Returns the data as a CSV file in a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `exportCanvas(customOptions?: IExportingImageOptions): Promise<string>` — Returns the chart image as a PNG data URI, using `canvasOptions`. Parameters: `customOptions`: Image options. Returns: Promise
- `exportHTML(customOptions?: IExportingHTMLOptions): Promise<string>` — Returns the data as an HTML table in a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `exportImage(format: ExportingImageFormats, customOptions?: IExportingImageOptions): Promise<string>` — Returns the chart image as a data URI. Parameters: `format`: Image format; `customOptions`: Format options. Returns: Promise
- `exportJSON(customOptions?: IExportingJSONOptions): Promise<string>` — Returns the data as a JSON file in a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `exportPDF(customOptions?: IExportingPDFOptions): Promise<string>` — Returns a PDF of the chart image, with a data table if `includeData` is set, as a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `exportPDFData(customOptions?: IExportingDataOptions): Promise<string>` — Returns a PDF of the data as a table, without the chart image, as a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `exportSVG(customOptions?: IExportingSVGOptions): Promise<string>` — Returns the chart image as an SVG data URI, whichever renderer the chart uses. Parameters: `customOptions`: Format options. Returns: Promise _Since 5.21.0._
- `exportXLSX(customOptions?: IExportingXLSXOptions): Promise<string>` — Returns the data as an XLSX file in a data URI. Parameters: `customOptions`: Format options. Returns: Promise
- `getCSV(customOptions?: IExportingCSVOptions): Promise<string>` — Returns the data as CSV text. Parameters: `customOptions`: CSV options. Returns: Promise
- `getCanvas(options: IExportingImageOptions): Promise<HTMLCanvasElement>` — Returns a `<canvas>` element with an image of the chart and its `extraImages`. Parameters: `options`: Image options. Returns: Promise
- `getData(format: ExportingFormats, customOptions?: IExportingDataOptions, renameFields?: boolean): any` — Returns the data prepared for export: only the `dataFields`, if set, with values formatted per the format's options. Parameters: `format`: Format; `customOptions`: Format options; `renameFields`: Use the column names from `dataFields` as keys. Returns: Processed data
- `getHTML(customOptions?: IExportingHTMLOptions): Promise<string>` — Returns the data as the markup of an HTML `<table>`. Parameters: `customOptions`: HTML options. Returns: Promise
- `getJSON(customOptions?: IExportingJSONOptions): Promise<string>` — Returns the data as a JSON string. Parameters: `customOptions`: Format options. Returns: Promise
- `getPDF(customOptions?: IExportingPDFOptions, includeImage?: boolean, includeData?: boolean): Promise<string>` — Returns a PDF file, Base64-encoded. Parameters: `customOptions`: PDF options; `includeImage`: Include the chart image; `includeData`: Include the data table (also added with `includeData` in the options). Returns: Promise
- `getSVG(customOptions?: IExportingSVGOptions): Promise<string>` — Returns the chart image as SVG markup, with `extraImages` placed around it. Parameters: `customOptions`: Format options. Returns: Promise _Since 5.21.0._
- `getXLSX(customOptions?: IExportingXLSXOptions): Promise<string>` — Returns the data as an XLSX file, Base64-encoded. Parameters: `customOptions`: Format options. Returns: Promise
- `hasData(): boolean` — Checks whether `dataSource` is a non-empty array. Returns: Has data?
- `initiatePrint(data: string, customOptions?: IExportingPrintOptions, title?: string): void` — Prints an image, given as a data URI. Parameters: `data`: Data URI of the image; `customOptions`: Print options, over `printOptions`; `title`: Title for the printed page; the page's own title if not given.
- `print(customOptions?: IExportingPrintOptions): Promise<void>` — Prints the chart. Parameters: `customOptions`: Print options, over `printOptions`.
- `streamFile(uri: string, fileName: string, addBOM?: boolean): boolean` — Downloads a data URI as a file. Parameters: `uri`: Data URI with the file's content; `fileName`: File name; `addBOM`: Start the file with a byte order mark. Returns: `false` if the content could not be decoded
- `supportedExportTypes(): ExportingTypes[]` — Returns the export types available: `"image"` and `"print"`, and `"data"` when there is data and the browser can download files. Returns: Supported types
- `supportedFormats(): ExportingFormats[]` — Returns the formats that can be exported: all that are not `disabled`, but the data formats only when there is data and the browser can download files. Returns: Formats

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
