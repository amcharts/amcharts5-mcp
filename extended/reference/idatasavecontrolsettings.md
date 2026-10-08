---
title: "IDataSaveControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idatasavecontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.DataSaveControl` (see its page for the class)
TypeScript: `am5stock.IDataSaveControlSettings` (`import type { IDataSaveControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **autoSave** (`boolean`) — default `false` _(theme)_ — Saves the chart's drawings and indicators to the browser's local storage whenever they change, and restores them on the next load.
- **storageId** (`string`) — Key for the data in local storage. If not set, the page URL plus the ID of the chart's container element is used.

## Inherited settings with a different default on DataSaveControl

- **description** (`string`) — default `root.language.translateAny("Save drawings and indicators")` _(theme)_ — _from IStockControlSettings_ — What the control does, shown as the button's tooltip. Falls back to `name`.
- **fixedLabel** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Keeps the button's label and icon when an item is picked, instead of showing that item.
- **items** (`(string | IDropdownListItem)[]`) — default `[{ id: "autosave", form: "checkbox", label: root.language.translateAny("Auto-save drawings and indicators") }, { id: "save", label: root.language.translateAny("Save drawings &amp; indicators"), sub…` _(theme)_ — _from IDropdownListControlSettings_ — Items of the dropdown: strings, or objects with an `id` and a `label`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: currentItem, exclude, maxSearchItems, scrollable, searchable, searchCallback
- _IStockControlSettings_: active, align, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
