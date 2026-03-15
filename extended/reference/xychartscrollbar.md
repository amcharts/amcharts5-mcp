---
title: "XYChartScrollbar"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/xychartscrollbar/"
scraped: "2026-03-15"
---

Creates a scrollbar with chart preview in it.

## Import

```javascript
// Import XYChartScrollbar
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Scrollbar

> **Note:** This class also inherits all settings, properties, methods, and events from Scrollbar (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **chart** (`XYChart`) — Default this.children.push(XYChart.new(this._root, { themeTags: ["chart"], interactive: false, interactiveChildren: false, panX: false, panY: false, wheelX: "none", wheelY: "none" })) An instance of an XYChart that is used to plot chart preview in scrollbar.
- **overlay** (`Graphics`) — Default this.children.push(Graphics.new(this._root, { themeTags: ["overlay"], interactive: false })) A graphics element that is displayed over inactive portion of the scrollbarpreview, to dim it down.
