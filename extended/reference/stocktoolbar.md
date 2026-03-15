---
title: "StockToolbar"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stocktoolbar/"
scraped: "2026-03-15"
---

Builds a toolbar for StockChart.

## Import

```javascript
// Import StockToolbar
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **container** (`HTMLElement`) — A reference to an element in the document to place tools in.
- **controls** (`StockControl[]`) — A list of tools to show in toolbar.
- **deactivateRoot** (`undefined | false | true`) — Default true Menu will disable all interactions for the underlying chart when using tools.
- **focusable** (`undefined | false | true`) — Default false Setting this to true will essentially enable accessibility for the toolbar items. E.g. buttons will be focusable using TAB key. Lists navigable using arrow keys, etc.
- **stockChart** (`StockChart`) — A StockChart the toolbar is for.
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the toolbar will not load default CSS.
