---
title: "ExportingMenu"
type: "class"
source: "https://docs.amcharts.com/v5/reference/exportingmenu/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

The export menu: an icon on the chart that opens a list of formats to export with `Exporting`.

Docs: https://docs.amcharts.com/v5/concepts/exporting/

## Import

```js
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

am5plugins_exporting.ExportingMenu.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IExportingMenuSettings` — get_api_reference shows it after this page
- Private settings: `IExportingMenuPrivate`
- Events: `IExportingMenuEvents`

## Properties

Public properties (not settings):

- **isOpen** (`boolean`) — Whether the menu is open.

## Methods

- `close(): void` — Closes the menu.
- `open(): void` — Opens the menu.
- `toggle(): void` — Opens the menu, or closes it if it is open.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
