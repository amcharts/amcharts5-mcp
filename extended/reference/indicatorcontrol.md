---
title: "IndicatorControl"
type: "class"
source: "https://docs.amcharts.com/v5/reference/indicatorcontrol/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A `StockToolbar` control for adding indicators to a `StockChart`.

Docs: https://docs.amcharts.com/v5/charts/stock/toolbar/indicator-control/

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.IndicatorControl.new(root, { /* settings */ });
```

## Inheritance

Extends: DropdownListControl → StockControl → Entity → Settings

## Settings and related interfaces

- Settings: `IIndicatorControlSettings` — get_api_reference shows it after this page
- Private settings: `IIndicatorControlPrivate`
- Events: `IIndicatorControlEvents`

## Methods

- `addIndicator(indicatorId: Indicators): Indicator | undefined` — Creates an indicator, adds it to the chart and returns it. If it has editable settings and `autoOpenSettings`, opens its settings modal; canceling the modal removes the indicator again. Parameters: `indicatorId`: Indicator ID. Returns: Indicator, or `undefined` if it can't be added
- `clearIndicators(): void` — Removes all indicators from the stock chart. _Since 5.9.3._
- `serializeIndicators(output?: "object" | "string", indent?: string): Array<unknown> | string` — Serializes the chart's indicators into an array of objects (`output: "object"`) or into JSON (`"string"`, the default). Parameters: `output`: Output format; `indent`: Line indent in JSON. Returns: Serialized indicators _Since 5.3.0._ Docs: https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/
- `supportsIndicator(indicatorId: Indicators): boolean` — Returns `true` if the indicator can be added: those that need volume need the chart's `volumeSeries`. Parameters: `indicatorId`: Indicator ID. Returns: Supported?
- `unserializeIndicators(data: string | Array<any>): void` — Adds indicators to the chart from data made by `serializeIndicators()`. Parameters: `data`: Serialized data. _Since 5.3.0._ Docs: https://docs.amcharts.com/v5/charts/stock/serializing-indicators-annotations/

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DropdownListControl")`) for signatures and descriptions.

- _DropdownListControl_: getItemById, setItem, setItemById
- _StockControl_: hide, isAccessible, show
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
