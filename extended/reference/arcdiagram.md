---
title: "ArcDiagram"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/arcdiagram/"
scraped: "2026-03-15"
---

Regular ArcDiagram series.

## Import

```javascript
// Import ArcDiagram
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: Flow

> **Note:** This class also inherits all settings, properties, methods, and events from Flow (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **animationDuration** (`undefined | number`) — Duration for all drill animations in milliseconds.
- **animationEasing** (`Easing`) — An easing function to use for drill animations.
- **minRadius** (`undefined | number`) — Default 5 Minimum radius of a nodes circle. Maximum radius is computed based on available space
- **orientation** (`"horizontal" | "vertical"`) — Default "horizontal" Orientation of the series. This setting can not be changed after the chart is initialized.
- **radiusKey** (`"sum" | "sumIncoming" | "sumOutgoing" | "none"`) — Default "sum" Defines Which value should be used when calculating circle radius. Use "none" if you want all circles to be the same. @martynas: gal cia reik naudot radiusField, biski no idea.

## Properties

- **links** (`ListTemplate`) — Default new ListTemplate<ArcDiagramLink> List of link elements.
- **nodes** (`ArcDiagramNodes`) — Default ArcDiagramNodes.new() A series for all ArcDiagram nodes.
