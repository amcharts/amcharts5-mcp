---
title: "Treemap"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/treemap/"
scraped: "2026-03-15"
---

Treemap series.

## Import

```javascript
// Import Treemap
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: Hierarchy

> **Note:** This class also inherits all settings, properties, methods, and events from Hierarchy (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **layoutAlgorithm** (`"binary" | "squarify" | "slice" | "dice" | "sliceDice"`) — Default "squarify" An algorithm to use when laying out node rectangles. ...
- **nodePaddingBottom** (`undefined | number`) — Gap between nodes and bottomedge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingInner** (`undefined | number`) — Gap between nodes. In pixels. Click here
- **nodePaddingLeft** (`undefined | number`) — Gap between nodes and left edge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingOuter** (`undefined | number`) — Gap between nodes and outer edge of the chart. In pixels. Click here
- **nodePaddingRight** (`undefined | number`) — Gap between nodes and bottom edge. Will be ignored if nodePaddingOuter is set. Click here
- **nodePaddingTop** (`undefined | number`) — Gap between nodes and top edge. Will be ignored if nodePaddingOuter is set. Click here

## Properties

- **rectangleTemplate** (`Template`) — Default Template.new({ })
- **rectangles** (`ListTemplate`) — Default new ListTemplate<RoundedRectangle> A list of node rectangle elements in a Treemap chart.
