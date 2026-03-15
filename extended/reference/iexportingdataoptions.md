---
title: "IExportingDataOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingdataoptions/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IExportingFormatOptions
Extended by: IExportingJSONOptions, IExportingCSVOptions, IExportingHTMLOptions, IExportingXLSXOptions

> **Note:** This class also inherits all settings, properties, methods, and events from IExportingFormatOptions (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **addColumnNames** (`undefined | false | true`) — Will add a line with column names in CSV/HTML/PDF tables.
- **emptyAs** (`undefined | string`) — Replace empty values with this string.
- **pivot** (`undefined | false | true`) — If set to true will pivot the able so that columns are horizontal.
- **useLocale** (`undefined | false | true`) — Default false Use client's locale when formatting dates.

