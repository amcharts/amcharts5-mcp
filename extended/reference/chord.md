---
title: "Chord"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/chord/"
scraped: "2026-03-15"
---

Regular chord series.

## Import

```javascript
// Import Chord
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: Flow
Extended by: ChordDirected, ChordNonRibbon

> **Note:** This class also inherits all settings, properties, methods, and events from Flow (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **nodeWidth** (`undefined | number`) — Default 10 The thickness of node strip in pixels.
- **padAngle** (`undefined | number`) — Default 1 Angle of a gap between each node, in degrees.
- **radius** (`number | Percent`) — Default 90% Radius of the diagram in percent or pixels. If set in percent, it will be relative to the whole area available for the series.
- **sort** (`"ascending" | "descending" | "none"`) — Default "descending" How to sort nodes by their value.
- **startAngle** (`undefined | number`) — Default 0 Starting angle in degrees.

## Properties

- **links** (`ListTemplate`) — Default new ListTemplate<ChordLink> List of link elements.
- **nodes** (`ChordNodes`) — Default ChordNodes.new() A series for all chord nodes.
