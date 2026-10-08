---
title: "IDataSaveControlEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idatasavecontrolevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlEvents
All ancestors: IDropdownListControlEvents, IStockControlEvents, IEntityEvents
TypeScript: `am5stock.IDataSaveControlEvents` (`import type { IDataSaveControlEvents } from "@amcharts/amcharts5/stock"`)

## Events

- **saved** (`{ drawings: string; indicators: string; }`) — Drawings and indicators were saved to local storage. `drawings` and `indicators` hold them as JSON.
- **restored** (`{ drawings: string; indicators: string; }`) — Drawings and indicators were restored from local storage.
- **cleared** (`{}`) — The saved drawings and indicators were removed from local storage.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlEvents")`) for types, defaults and descriptions.

- _IDropdownListControlEvents_: selected
- _IStockControlEvents_: click
