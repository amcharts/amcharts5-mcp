---
title: "IStockToolbarSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istocktoolbarsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5stock.StockToolbar` (see its page for the class)
TypeScript: `am5stock.IStockToolbarSettings` (`import type { IStockToolbarSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockChart** (`StockChart`) — The `StockChart` the toolbar is for.
- **container** (`HTMLElement`) — The HTML element the toolbar's buttons are placed in.
- **controls** (`StockControl[]`) — default `[]` _(code fallback)_ — Controls to show in the toolbar, in order.
- **useDefaultCSS** (`boolean`) — default `true` — Loads the toolbar's default CSS. Set to `false` to style it yourself.
- **deactivateRoot** (`boolean`) — Has no effect: the toolbar does not use it.
- **focusable** (`boolean`) — default `true` — Setting this to `true` will essentially enable accessibility for the toolbar items. E.g. buttons will be focusable using TAB key. Lists navigable using arrow keys, etc.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
