---
title: "IComparisonControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/icomparisoncontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.ComparisonControl` (see its page for the class)
TypeScript: `am5stock.IComparisonControlSettings` (`import type { IComparisonControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **items** (`(string | IDropdownListItem)[]`) — default `[]` _(code fallback)_ — Items of the dropdown: strings, or objects with an `id` and a `label`.

## Inherited settings with a different default on ComparisonControl

- **fixedLabel** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Keeps the button's label and icon when an item is picked, instead of showing that item.
- **name** (`string`) — default `root.language.translateAny("Comparison")` _(theme)_ — _from IStockControlSettings_ — Label text of the control's button.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: currentItem, exclude, maxSearchItems, scrollable, searchable, searchCallback
- _IStockControlSettings_: active, align, description, forceHidden, icon, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
