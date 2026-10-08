---
title: "IDrawingToolControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingtoolcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.DrawingToolControl` (see its page for the class)
TypeScript: `am5stock.IDrawingToolControlSettings` (`import type { IDrawingToolControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **tools** (`DrawingTools[]`) — Drawing tools to list.
- **scrollable** (`boolean`) — default `false` _(code fallback)_ — Limits the list's height to the chart's height minus 100 pixels, scrolling the rest. _Since 5.9.5._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, description, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
