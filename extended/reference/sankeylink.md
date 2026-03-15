---
title: "SankeyLink"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sankeylink/"
scraped: "2026-03-15"
---

Sources
SankeyLink can be used (imported) via one of the following packages.
// Import SankeyLink
import * as am5flow from "@amcharts/amcharts5/flow";

// Create SankeyLink
am5flow.SankeyLink.new(root, {
  // ... config if applicable
});

<!-- Load SankeyLink -->
<script src="flow.js"></script>

<script>
// Create SankeyLink
am5flow.SankeyLink.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import SankeyLink
import * as am5flow from "@amcharts/amcharts5/flow"
```

## Inheritance

Extends: FlowLink

> **Note:** This class also inherits all settings, properties, methods, and events from FlowLink (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **controlPointDistance** (`undefined | number`) — Default 0.2 A relative distance from node for link "elbow" (bend point). Click here for more info
- **fillStyle** (`"solid" | "gradient" | "source" | "target"`) — Default "gradient" Type of fill to use for links. Click here for more info
- **source** (`DataItem`) — Source node data item.
- **target** (`DataItem`) — Source node data item.

## Properties

- **series** (`Sankey | undefined`) — (no description)
