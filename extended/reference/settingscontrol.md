---
title: "SettingsControl"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/settingscontrol/"
scraped: "2026-03-15"
---

A control that is used to change type of the main series of the StockChart.

## Import

```javascript
// Import SettingsControl
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: DropdownListControl

> **Note:** This class also inherits all settings, properties, methods, and events from DropdownListControl (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **autoSave** (`undefined | false | true`) — Default false If set to true, all changes to chart's drawings and indicators will be automatically saved to browser local storage and restored on next load. @since 5.4.3
- **storageId** (`undefined | string`) — A unique indentifier for local storage. Will try to use chart's container ID if not set. Consider setting it if you have multipl StockChart on the same page. @since 5.4.3
