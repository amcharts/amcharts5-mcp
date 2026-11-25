---
title: "IconControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/iconcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A dropdown of icons for the icon drawing tool. Created by `DrawingControl`; not meant to be used on its own.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.IconControl.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IIconControlSettings` — get_api_reference shows it after this page
- Private settings: `IIconControlPrivate`
- Events: `IIconControlEvents`

## Methods

- `getIconByPath(path: string): IIcon | undefined` — Returns the icon with an SVG path from `icons`. Parameters: `path`: SVG path of the icon. Returns: Icon _Since 5.9.0._
- `setIcon(icon: IIcon): void` — Shows an icon on the button. Does not dispatch `selected`. Parameters: `icon`: Icon.
- `setIconByPath(path: string): void` — Selects an icon by its SVG path: shows it on the button and dispatches `selected`. Parameters: `path`: SVG path of the icon. _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
