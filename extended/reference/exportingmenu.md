---
title: "ExportingMenu"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/exportingmenu/"
scraped: "2026-03-15"
---

Displays a menu for Exporting.

## Import

```javascript
// Import ExportingMenu
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **align** (`"left" | "right"`) — Default "right" Horizontal alignment of the menu.
- **ariaLabel** (`undefined | string`) — ARIA label for the menu. @since 5.14.4
- **autoClose** (`undefined | false | true`) — Default true If set to true the menu will close automatically when export operation is initiated.
- **container** (`HTMLElement`) — A reference to an element in the document to place export menu in. If not set, will use root element's container.
- **deactivateRoot** (`undefined | false | true`) — Default true Menu will disable all interactions for the underlying chart when browsing the menu.
- **exporting** (`Exporting`) — A reference to related Exporting object.
- **items** (`IExportingMenuItem[]`) — A list of menu items.
- **useDefaultCSS** (`undefined | false | true`) — Default true If set to false the legend will not load default CSS.

## Properties

- **isOpen** (`boolean`) — Default false
