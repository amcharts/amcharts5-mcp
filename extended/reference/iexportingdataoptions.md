---
title: "IExportingDataOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingdataoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **emptyAs** (`string`) — Text for empty values: `"-"` in HTML by default, an empty string in the other formats.
- **useTimestamps** (`boolean`) — default `false` — Exports dates as timestamps instead of formatted dates.
- **useLocale** (`boolean`) — default `false` — Formats dates in the browser's locale instead of with `dateFormat`.
- **pivot** (`boolean`) — Swaps rows and columns, so that each field is a row.
- **addColumnNames** (`boolean`) — default `true` — Adds the column names as the first row (or column, with `pivot`) in CSV, HTML, XLSX and PDF tables.

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingFormatOptions")`) for types, defaults and descriptions.

- _IExportingFormatOptions_: disabled
