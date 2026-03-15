---
title: "StockControl"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/stockcontrol/"
scraped: "2026-03-15"
---

A base class for controls on StockToolbar.

## Import

```javascript
// Import StockControl
import * as am5stock from "@amcharts/amcharts5/stock"
```

## Inheritance

Extends: Entity
Extended by: ColorControl, DrawingToolControl, DropdownListControl, DropdownControl, IconControl, DrawingControl, DateRangeSelector, PeriodSelector, ResetControl

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **active** (`undefined | false | true`) — Default false Indicates if control is active.
- **align** (`"left" | "right"`) — Default "left" Alignment of the control in a toolbar.
- **description** (`undefined | string`) — Description of what the button does.
- **forceHidden** (`undefined | false | true`) — Force this control to always be invisible. @since 5.8.5 @defaul false
- **icon** (`HTMLElement | SVGElement | "none"`) — An element with control icon. If not set, each control will aytomatically create an icon.
- **name** (`undefined | string`) — Name of the control. Used for the label.
- **stockChart** (`StockChart`) — A StockChart the toolbar is for.
- **togglable** (`undefined | false | true`) — Default true If set to true, control can be toggle on and off by clicking on it.
