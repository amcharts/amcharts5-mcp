---
title: "DataSaveControl"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/datasavecontrol/"
scraped: "2026-03-15"
---

A control that can be used to serialize indicators and drawings, save them to local storage, and restore as needed.

## Import

```javascript
// Import DataSaveControl
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: DropdownListControl

> **Note:** This class also inherits all settings, properties, methods, and events from DropdownListControl (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **autoSave** (`undefined | false | true`) — Default false If set to true, all changes to chart's drawings and indicators will be automatically saved to browser local storage and restored on next load.
- **storageId** (`undefined | string`) — A unique indentifier for local storage. Will try to use chart's container ID if not set. Consider setting it if you have multipl StockChart on the same page.
