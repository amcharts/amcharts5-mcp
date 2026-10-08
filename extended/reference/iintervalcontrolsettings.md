---
title: "IIntervalControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iintervalcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.IntervalControl` (see its page for the class)
TypeScript: `am5stock.IIntervalControlSettings` (`import type { IIntervalControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **currentItem** (`string | IIntervalControlItem`) — default `"1 day"` _(theme)_ — Item (or its ID) shown as selected when the control is created. It is not updated when another item is picked.
- **items** (`(string | IIntervalControlItem)[]`) — default `[{ id: "1 minute", label: "1 " + root.language.translateAny("minute"), interval: { timeUnit: "minute", count: 1 } }, { id: "2 minute", label: "2 " + root.language.translateAny("minutes"), interval:…` _(theme)_ — Items of the dropdown: strings, or objects with an `id` and a `label`.

## Inherited settings with a different default on IntervalControl

- **description** (`string`) — default `root.language.translateAny("Period")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: exclude, fixedLabel, maxSearchItems, scrollable, searchable, searchCallback
- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
