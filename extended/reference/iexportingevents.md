---
title: "IExportingEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntityEvents
TypeScript: not exported by name from the package.

## Events

- **exportstarted** (`IExportEvent`) — An export started.
- **exportfinished** (`IExportEvent`) — An export was set off. It is dispatched before the result is ready, so to use the result, wait for the promise `export()` returns.
- **downloadstarted** (`IExportEvent & { fileName: string; }`) — A download was requested, before its file is generated.
- **printstarted** (`IExportEvent`) — Printing was requested, before the image to print is generated.
- **dataprocessed** (`IExportEvent & { data: any; }`) — The data for a data export is prepared. A listener can still change `data`.
- **workbookready** (`IExportEvent & { workbook: any; workbookOptions: any; xlsx: any; }`) — The XLSX workbook is prepared. A listener can still change it before it is written.
- **pdfdocready** (`IExportEvent & { doc: any; }`) — The PDF document definition is prepared. A listener can still change it before the PDF is made.
