---
title: "IExportingCSVOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingcsvoptions/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IExportingDataOptions

> **Note:** This class also inherits all settings, properties, methods, and events from IExportingDataOptions (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **addBOM** (`undefined | false | true`) — Default false Add BOM character to output file, so that it can be used with UTF-8 characters properly in Excel. @since 5.1.0
- **forceQuotes** (`undefined | false | true`) — Default false Force all values to be included in quotes, including numeric.
- **reverse** (`undefined | false | true`) — Default false Reverse order of the records in data.
- **separator** (`undefined | string`) — Default "," Column separator.
