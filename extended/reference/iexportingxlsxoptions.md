---
title: "IExportingXLSXOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingxlsxoptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IExportingDataOptions
All ancestors: IExportingDataOptions, IExportingFormatOptions
TypeScript: not exported by name from the package.

## Options

- **escapeFormulas** (`boolean`) — default `true` — Protects against spreadsheet formula injection: text values that start with `=`, `+`, `-`, `@`, a tab or a carriage return get a single quote in front, so they are read as plain text. _Since 5.19.0._

## Other inherited options

Names only — see the declaring interface's page (e.g. `get_api_reference("IExportingDataOptions")`) for types, defaults and descriptions.

- _IExportingDataOptions_: addColumnNames, emptyAs, pivot, useLocale, useTimestamps
- _IExportingFormatOptions_: disabled
