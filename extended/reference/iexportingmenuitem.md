---
title: "IExportingMenuItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingmenuitem/"
scraped: "2026-03-15"
---

Inheritance

## Properties

- **callback** (`undefined | ( menuItem: any) => any`) — If type is set to "custom", this needs to be set to a function.
- **callbackTarget** (`any`) — A target for callback function.
- **element** (`HTMLAnchorElement`) — A DOM element for the menu item. @readonly
- **exportType** (`ExportingTypes`) — Indicates export type: "image", "data", or "print".
- **format** (`ExportingFormats`) — If type is set to "format", clicking item will initiate export in that format.
- **label** (`undefined | string`) — Menu label.
- **sublabel** (`undefined | string`) — Additional information.

