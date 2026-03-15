---
title: "Sankey"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sankey/"
scraped: "2026-03-15"
---

Sankey series.

## Import

```javascript
// Import Sankey
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: Flow

> **Note:** This class also inherits all settings, properties, methods, and events from Flow (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **linkSort** (`null | ( a: SankeyLinkMinimal, b: SankeyLinkMinimal) => number | null`) — A custom function to use when sorting links. Use null to sort links exactly the way they are presented in data. @since 5.4.4
- **linkTension** (`undefined | number`) — Default 0.5 Tension setting of the link curve. Accepts values from 0 to 1. 1 will result in perfectly straight lines.
- **nodeAlign** (`"left" | "right" | "justify" | "center"`) — Default "left" Alignment of nodes.
- **orientation** (`"horizontal" | "vertical"`) — Default "horizontal" Orientation of the series.

## Properties

- **links** (`ListTemplate`) — Default new ListTemplate<SankeyLink> List of link elements.
- **nodes** (`SankeyNodes`) — Default SankeyNodes.new() A series representing sankey nodes.
