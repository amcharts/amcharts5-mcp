---
title: "IResetControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iresetcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.ResetControl` (see its page for the class)
TypeScript: `am5stock.IResetControlSettings` (`import type { IResetControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on ResetControl

- **description** (`string`) — default `root.language.translateAny("Reset")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.
- **togglable** (`boolean`) — default `false` _(theme)_ — _from IStockControlSettings_ — A click on the button toggles `active`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
