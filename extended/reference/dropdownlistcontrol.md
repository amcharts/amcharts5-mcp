---
title: "DropdownListControl"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/dropdownlistcontrol/"
scraped: "2026-03-15"
---

A generic control which creates a searchable list of items in a dropdown.
 Can be used in a StockToolbar.

## Import

```javascript
// Import DropdownListControl
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: StockControl
Extended by: IndicatorControl, SeriesTypeControl, IntervalControl, DataSaveControl, SettingsControl, ComparisonControl

> **Note:** This class also inherits all settings, properties, methods, and events from StockControl (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **currentItem** (`string | IDropdownListItem`) — Currently selected item.
- **exclude** (`string[]`) — An array of item IDs to now show in the list. @since 5.7.0
- **fixedLabel** (`undefined | false | true`) — Label does not change when item is selected in the list.
- **items** (`Array`) — A list of items in the dropdown.
- **maxSearchItems** (`undefined | number`) — Maximum search items to show.
- **scrollable** (`undefined | false | true`) — If set to true, the dropdown will fix the height to fit within chart's area, with scroll if the contents do not fit.
- **searchCallback** (`undefined | ( query: string) => IDropdownListItem[]`) — A callback function which returns a list of items based on a search query.
- **searchable** (`undefined | false | true`) — Is the list searchable? If true shows search field and calls searchCallback function for a list of items.
