---
title: "Sunburst"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sunburst/"
scraped: "2026-03-15"
---

Builds a sunburst diagram.

## Import

```javascript
// Import Sunburst
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: Partition

> **Note:** This class also inherits all settings, properties, methods, and events from Partition (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **endAngle** (`undefined | number`) — Default 270 End angle of the series.
- **innerRadius** (`number | Percent`) — Default 0 Inner radius of the suburst pie. Setting to negative number will mean pixels from outer radius.
- **radius** (`number | Percent`) — Default 100% Outer radius of the sunburst pie.
- **startAngle** (`undefined | number`) — Default -90 Start angle of the series.

## Properties

- **labels** (`ListTemplate`) — Default new ListTemplate<RadialLabel> A list of label elements in a Hierarchy chart.
- **slices** (`ListTemplate`) — Default new ListTemplate<Slice> A list of node slice elements in a Sunburst chart.
