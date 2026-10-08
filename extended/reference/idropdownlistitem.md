---
title: "IDropdownListItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idropdownlistitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: `am5stock.IDropdownListItem` (`import type { IDropdownListItem } from "@amcharts/amcharts5/stock"`)

## Properties

- **id** (`string`) — ID of the item. `"separator"` draws a separator line instead.
- **label** (`string`) — Text of the item.
- **subLabel** (`string`) — Second line of text, also used as the item's tooltip.
- **className** (`string`) — Extra CSS class of the item.
- **icon** (`SVGElement`) — Icon shown before the label.
- **form** (`"checkbox" | "radio"`) — Adds a radio button or a checkbox to the item. Toggling it dispatches `changed`.
- **value** (`string`) — Value of the radio button or checkbox.
- **checked** (`boolean`) — Checks the radio button or checkbox at the start.
- **options** (`IDropdownListItem[]`)
- **disabled** (`boolean`) — Shows the item as disabled, so it can't be picked.
