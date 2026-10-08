---
title: "IColorControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icolorcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.ColorControl` (see its page for the class)
TypeScript: `am5stock.IColorControlSettings` (`import type { IColorControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **colors** (`ColorSet`) — Colors to pick from. Without it, the default palette of `DropdownColors` is used.
- **useOpacity** (`boolean`) — default `true` _(theme)_ — Adds opacity choices, from `100%` to `0%`, below the colors.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, description, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
