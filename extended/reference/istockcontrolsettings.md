---
title: "IStockControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istockcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5stock.StockControl` (see its page for the class)
TypeScript: `am5stock.IStockControlSettings` (`import type { IStockControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockChart** (`StockChart`) — The `StockChart` the control acts on.
- **visible** (`boolean`) — default `true` _(theme)_ — Shows the control's button; `false` hides it.
- **forceHidden** (`boolean`) — default `false` — Keeps the control hidden, even when `show()` is called. _Since 5.8.5._
- **name** (`string`) — default `""` _(code fallback)_ — Label text of the control's button.
- **description** (`string`) — What the control does, shown as the button's tooltip. Falls back to `name`.
- **icon** (`HTMLElement | "none" | SVGElement`) — Icon element of the button, or `"none"` for no icon. Each control has its own default icon.
- **active** (`boolean`) — default `false` _(theme)_ — Turns the control on; its button shows as active.
- **togglable** (`boolean`) — default `true` — A click on the button toggles `active`.
- **align** (`"left" | "right"`) — default `"left"` — Side of the toolbar the control is placed on.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
