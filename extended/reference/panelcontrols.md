---
title: "PanelControls"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/panelcontrols/"
scraped: "2026-03-15"
---

Creates a button set for StockChart panels (move up/down, close, etc.)

## Import

```javascript
// Import PanelControls
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **stockChart** (`StockChart`) — A target StockChart.
- **stockPanel** (`StockPanel`) — A target StockPanel.

## Properties

- **closeButton** (`Button`) — Default Button.new() A Button which closes the panel.
- **downButton** (`Button`) — Default Button.new() A Button which moves panel down.
- **expandButton** (`Button`) — Default Button.new() A Button which expands/collapses the panel.
- **upButton** (`Button`) — Default Button.new() A Button which moves panel up.
