---
title: "HeatLegend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/heatlegend/"
scraped: "2026-03-15"
---

Heat legend.

## Import

```javascript
// Import HeatLegend
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **endColor** (`Color`) — Ending (highest value) color.
- **endOpacity** (`number`) — Default 1 Ending (lowest value) opacity. @since 5.14.0
- **endText** (`undefined | string`) — Text for end label.
- **endValue** (`undefined | number`) — End (highest) value.
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the heat legend. Click here for more info
- **startColor** (`Color`) — Starting (lowest value) color.
- **startOpacity** (`number`) — Default 1 Starting (lowest value) opacity. @since 5.14.0
- **startText** (`undefined | string`) — Text for start label.
- **startValue** (`undefined | number`) — Start (lowest) value.
- **stepCount** (`undefined | number`) — Default 1 Number of steps Click here for more info

## Properties

- **endLabel** (`Label`) — Default Label.new() An end Label.
- **labelContainer** (`Container`) — Default Container.new() A Container that all labels are placed in.
- **markerContainer** (`Container`) — Default Container.new() A Container that all markers are placed in.
- **markers** (`ListTemplate`) — Default new ListTemplate<RoundedRectangle> List of rectangle elements used for default legend markers.
- **startLabel** (`Label`) — Default Label.new() A start Label.
