---
title: "IDropdownListControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idropdownlistcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.DropdownListControl` (see its page for the class)
TypeScript: `am5stock.IDropdownListControlSettings` (`import type { IDropdownListControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **currentItem** (`string | IDropdownListItem`) — Item (or its ID) shown as selected when the control is created. It is not updated when another item is picked.
- **fixedLabel** (`boolean`) — default `false` _(theme)_ — Keeps the button's label and icon when an item is picked, instead of showing that item.
- **items** (`(string | IDropdownListItem)[]`) — default `[]` _(code fallback)_ — Items of the dropdown: strings, or objects with an `id` and a `label`.
- **scrollable** (`boolean`) — default `false` _(code fallback)_ — Limits the list's height to the chart's height minus 100 pixels, scrolling the rest.
- **maxSearchItems** (`number`) — Most results of `searchCallback` to show; the rest are cut off with a note.
- **searchable** (`boolean`) — default `false` _(code fallback)_ — Shows a search field above the list. Typing filters the items or, with `searchCallback`, replaces them with its results.
- **searchCallback** (`(query: string) => IDropdownListItem[]`) — Returns the items to show for a search query.
- **exclude** (`string[]`) — IDs of items to leave out of the list. _Since 5.7.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, description, forceHidden, icon, name, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
