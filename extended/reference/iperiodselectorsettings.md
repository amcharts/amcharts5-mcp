---
title: "IPeriodSelectorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iperiodselectorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.PeriodSelector` (see its page for the class)
TypeScript: `am5stock.IPeriodSelectorSettings` (`import type { IPeriodSelectorSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **periods** (`IPeriod[]`) — default `[{ timeUnit: "day", count: 5, name: "5" + root.language.translateAny("D") }, { timeUnit: "month", count: 1, name: "1" + root.language.translateAny("M") }, { timeUnit: "month", count: 3, name: "3" +…` _(theme)_ — Periods to show buttons for.
- **hideLongPeriods** (`boolean`) — default `false` — Hides the buttons of periods longer than the data. _Since 5.3.9._
- **zoomTo** (`"start" | "end"`) — default `"end"` — Which end of the data a period is measured from: `"end"` shows the latest data, `"start"` the earliest. _Since 5.5.0._ Docs: https://www.amcharts.com/docs/v5/charts/stock/toolbar/period-selector/#Zoom_anchor_point

## Inherited settings with a different default on PeriodSelector

- **description** (`string`) — default `root.language.translateAny("Period selector")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.
- **icon** (`HTMLElement | "none" | SVGElement`) — default `"none"` _(theme)_ — _from IStockControlSettings_ — Icon element of the button, or `"none"` for no icon. Each control has its own default icon.
- **togglable** (`boolean`) — default `false` _(theme)_ — _from IStockControlSettings_ — A click on the button toggles `active`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, forceHidden, name, stockChart, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
