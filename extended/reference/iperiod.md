---
title: "IPeriod"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iperiod/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: `am5stock.IPeriod` (`import type { IPeriod } from "@amcharts/amcharts5/stock"`)

## Properties

- **timeUnit** (`TimeUnit | "custom" | "ytd" | "max"`) — Time unit of the period, or `"ytd"` (year to date), `"max"` (all data) or `"custom"` (from `start` to `end`).
- **count** (`number`) — Number of `timeUnit`s in the period.
- **name** (`string`) — Label of the period's button.
- **start** (`Date`) — Start of a `"custom"` period; the start of the data if not set.
- **end** (`Date`) — End of a `"custom"` period; the end of the data if not set.
