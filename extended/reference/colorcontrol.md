---
title: "ColorControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/colorcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A control with a dropdown for picking a color and, with `useOpacity`, an opacity.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.ColorControl.new(root, { /* settings */ });
```

## Inheritance

Extends: StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IColorControlSettings` — get_api_reference shows it after this page
- Private settings: `IColorControlPrivate`
- Events: `IColorControlEvents`

## Methods

- `hide(): void` — Hides the control's button.
- `setColor(color: Color): void` — Sets the control's color and dispatches `selected`. Parameters: `color`: Color. _Since 5.9.0._
- `setOpacity(opacity: number): void` — Sets the control's opacity and dispatches `selectedOpacity`. Parameters: `opacity`: Opacity (`0` to `1`). _Since 5.9.0._

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("StockControl")`) for signatures and descriptions.

- _StockControl_: isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
