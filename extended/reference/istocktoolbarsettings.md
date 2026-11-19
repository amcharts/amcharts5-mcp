---
title: "IStockToolbarSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/istocktoolbarsettings/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
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
- **autoFit** (`boolean`) — default `false` — Folds the controls when they do not fit in one row, a step at a time: first the labels of Indicators, Draw, Comparison and the series type control, which keep their icons, then the period buttons, into one button that opens them as a list. Needs the default CSS. The ResponsiveMax theme turns it on. _Since 5.23.0._
- **deactivateRoot** (`boolean`) — Has no effect: the toolbar does not use it.
- **focusable** (`boolean`) — default `true` — Setting this to `true` will essentially enable accessibility for the toolbar items. E.g. buttons will be focusable using TAB key. Lists navigable using arrow keys, etc.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
