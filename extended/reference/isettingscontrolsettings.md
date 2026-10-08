---
title: "ISettingsControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isettingscontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.SettingsControl` (see its page for the class)
TypeScript: `am5stock.ISettingsControlSettings` (`import type { ISettingsControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **autoSave** (`boolean`) — default `false` — Saves the chart's drawings and indicators to the browser's local storage whenever they change, and restores them on the next load. Needs an `IndicatorControl` or a `DrawingControl` on the chart. _Since 5.4.3._
- **storageId** (`string`) — Key for the data in local storage. If not set, the page URL plus the ID of the chart's container element is used. _Since 5.4.3._

## Inherited settings with a different default on SettingsControl

- **description** (`string`) — default `root.language.translate("Settings")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.
- **fixedLabel** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Keeps the button's label and icon when an item is picked, instead of showing that item.
- **items** (`(string | IDropdownListItem)[]`) — default `[{ id: "fills", label: root.language.translateAny("X-axis fills"), className: "am5stock-list-info am5stock-list-heading" }, { form: "checkbox", id: "fills", label: root.language.translateAny("Fills…` _(theme)_ — _from IDropdownListControlSettings_ — Items of the dropdown: strings, or objects with an `id` and a `label`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: currentItem, exclude, maxSearchItems, scrollable, searchable, searchCallback
- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
