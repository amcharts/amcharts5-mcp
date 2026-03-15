---
title: "StepLineSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/steplineseries/"
scraped: "2026-03-15"
---

Used to plot stepped line and/or area series.

## Import

```javascript
// Import StepLineSeries
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: LineSeries

> **Note:** This class also inherits all settings, properties, methods, and events from LineSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **noRisers** (`undefined | false | true`) — Default false Disables vertical connecting lines for the steps. Click here for more info
- **stepWidth** (`Percent`) — Default 100% Width of the step in percent relative to the cell width. NOTE: setting this to less than 100% makes sense only when risers are disabled: noRisers: true Click here for more info
