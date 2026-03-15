---
title: "DataProcessor"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/dataprocessor/"
scraped: "2026-03-15"
---

A tool that can process the data before it is being used in charts.

## Import

```javascript
// Import DataProcessor
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **colorFields** (`string[]`) — A list of fields in data that need to be converted to Color objects.
- **dateFields** (`string[]`) — A list of fields in data that need to be converted to tiemstamps.
- **dateFormat** (`undefined | string`) — Date format used for parsing string-based dates.
- **emptyAs** (`any`) — Replace empty values with this.
- **numericFields** (`string[]`) — A list of fields in data that need to be converted to numbers.
