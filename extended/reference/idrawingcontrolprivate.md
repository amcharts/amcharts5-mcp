---
title: "IDrawingControlPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingcontrolprivate/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlPrivate
All ancestors: IStockControlPrivate, IEntityPrivate
TypeScript: `am5stock.IDrawingControlPrivate` (`import type { IDrawingControlPrivate } from "@amcharts/amcharts5/stock"`)

## Private settings

- **toolsContainer** (`HTMLDivElement`)
- **toolControl** (`DrawingToolControl`)
- **eraserControl** (`StockControl`)
- **selectControl** (`StockControl`) — The control that turns drawing selection on and off. _Since 5.9.1._
- **clearControl** (`StockControl`)
- **strokeControl** (`ColorControl`)
- **strokeWidthControl** (`DropdownListControl`)
- **strokeDasharrayControl** (`DropdownListControl`)
- **fillControl** (`ColorControl`)
- **extensionControl** (`StockControl`)
- **labelFillControl** (`ColorControl`)
- **labelFontSizeControl** (`DropdownListControl`)
- **labelFontFamilyControl** (`DropdownListControl`)
- **boldControl** (`StockControl`)
- **italicControl** (`StockControl`)
- **iconControl** (`IconControl`)
- **snapControl** (`StockControl`)
- **toolTemplates** (`{ [index: string]: Template<any>; }`)

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlPrivate")`) for types, defaults and descriptions.

- _IStockControlPrivate_: button, icon, label, toolbar
