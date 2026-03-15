---
title: "DateRangeSelector"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/daterangeselector/"
scraped: "2026-03-15"
---

Date range selector control for StockChart.

## Import

```javascript
// Import DateRangeSelector
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: StockControl

> **Note:** This class also inherits all settings, properties, methods, and events from StockControl (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **allowInput** (`undefined | false | true`) — Default true If set to false, typing into date fields will be disabled. Instead, user will be able to select a day using arrow keys. @since 5.12.3
- **dateFormat** (`undefined | string`) — Date format to use for date input fields. Will use global date format if not set.
- **disableWeekDays** (`number[]`) — Default [] Set to array of days to disable in date picker dropdowns, with Sunday starting at 0, Monday - 1, etc. @since 5.11.1
- **maxDate** (`Date | "auto" | null`) — Default "auto" Maximum date to allow for selection. Accepts either a Date object or "auto" (latest date available in chart). @since 5.3.7
- **minDate** (`Date | "auto" | null`) — Default "auto" Minimum date to allow for selection. Accepts either a Date object or "auto" (smallest date available in chart). @since 5.3.7
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the control will not load default CSS for Flatpickr component. This would mean it would be unstyled, and would require custom CSS present on the page. @since 5.2.4
