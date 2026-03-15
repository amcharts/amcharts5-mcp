---
title: "FlowLink"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/flowlink/"
scraped: "2026-03-15"
---

A base class for a flow link.

## Import

```javascript
// Import FlowLink
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: Graphics
Extended by: ArcDiagramLink, ChordLink, SankeyLink

> **Note:** This class also inherits all settings, properties, methods, and events from Graphics (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **fillStyle** (`"solid" | "source" | "target" | "gradient" | "none"`) — Type of fill to use for links.
- **source** (`DataItem`) — Source node data item.
- **strokeStyle** (`"solid" | "source" | "target" | "gradient" | "none"`) — Type of outline to use for links.
- **target** (`DataItem`) — Source node data item.

## Properties

- **series** (`Flow | undefined`) — (no description)
