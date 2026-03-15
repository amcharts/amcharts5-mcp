---
title: "DropdownList"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/dropdownlist/"
scraped: "2026-03-15"
---

A dropdown control for StockToolbar.

## Import

```javascript
// Import DropdownList
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Dropdown

> **Note:** This class also inherits all settings, properties, methods, and events from Dropdown (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **exclude** (`string[]`) — An array of item IDs to now show in the list. @since 5.7.0
- **items** (`IDropdownListItem[]`) — A list of items in the dropdown.
- **maxSearchItems** (`undefined | number`) — Maximum search items to show.
- **searchCallback** (`undefined | ( query: string) => Promise`) — A callback function which returns a list of items based on a search query.
- **searchable** (`undefined | false | true`) — Is the list searchable? If true shows search field and calls searchCallback function for a list of items.
