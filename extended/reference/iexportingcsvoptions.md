---
title: "IExportingCSVOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingcsvoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingDataOptions
All ancestors: IExportingDataOptions, IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **separator** (`string`) — default `","` — Column separator.
- **forceQuotes** (`boolean`) — default `false` — Quotes all values, numbers too.
- **reverse** (`boolean`) — default `false` — Exports the rows in reverse order.
- **addBOM** (`boolean`) — default `true` — Starts the file with a byte order mark, so that Excel reads its UTF-8 characters correctly. _Since 5.1.0._
- **escapeFormulas** (`boolean`) — default `true` — Protects against spreadsheet formula injection ("CSV injection"): text values that start with `=`, `+`, `-`, `@`, a tab or a carriage return get a single quote in front, so they are read as plain text. _Since 5.19.0._

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingDataOptions")`) for types, defaults and descriptions.

- _IExportingDataOptions_: addColumnNames, emptyAs, pivot, useLocale, useTimestamps
- _IExportingFormatOptions_: disabled
