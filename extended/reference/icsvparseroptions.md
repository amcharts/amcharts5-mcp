---
title: "ICSVParserOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icsvparseroptions/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: `am5.ICSVParserOptions` (`import type { ICSVParserOptions } from "@amcharts/amcharts5"`)

## Options

- **delimiter** (`string`) — default `","` — Character that separates the columns.
- **reverse** (`boolean`) — Returns the rows in reverse order.
- **skipRows** (`number`) — default `0` — Number of rows to skip at the start.
- **skipEmpty** (`boolean`) — default `true` — Leaves out empty rows.
- **useColumnNames** (`boolean`) — default `false` — Uses the first row (after `skipRows`) as field names. Otherwise the fields are named `col0`, `col1`, and so on.
