---
title: "ISeriesTypeControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iseriestypecontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.SeriesTypeControl` (see its page for the class)
TypeScript: `am5stock.ISeriesTypeControlSettings` (`import type { ISeriesTypeControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

_(none declared here — all inherited)_

## Inherited settings with a different default on SeriesTypeControl

- **currentItem** (`string | IDropdownListItem`) — default `"candlestick"` _(theme)_ — _from IDropdownListControlSettings_ — Item (or its ID) shown as selected when the control is created. It is not updated when another item is picked.
- **description** (`string`) — default `root.language.translateAny("Type")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.
- **items** (`(string | IDropdownListItem)[]`) — default computed at runtime _(theme)_ — _from IDropdownListControlSettings_ — Items of the dropdown: strings, or objects with an `id` and a `label`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: exclude, fixedLabel, maxSearchItems, scrollable, searchable, searchCallback
- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
