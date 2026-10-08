---
title: "IExportingMenuItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingmenuitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **type** (`"separator" | "format" | "custom"`) — Type of the item: • `"format"`: exports in `format` when clicked. • `"separator"`: a divider, with `label` as a heading if set. • `"custom"`: calls `callback` when clicked.
- **format** (`ExportingFormats`) — Format to export in, for a `"format"` item. `"print"` prints the chart.
- **exportType** (`ExportingTypes`) — Export type of the item: `"image"`, `"data"` or `"print"`. An item whose type is not available, such as `"data"` without data, is left out.
- **label** (`string`) — Text of the item.
- **sublabel** (`string`) — Smaller text after the label, such as `"Image"`.
- **callback** (`(menuItem?: any) => any`) — Function to call when a `"custom"` item is clicked.
- **callbackTarget** (`any`) — `this` inside `callback`; the menu if not set.
- **element** (`HTMLAnchorElement`) — The item's DOM element.
