---
title: "IDropdownListSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idropdownlistsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownSettings
All ancestors: IDropdownSettings, IEntitySettings
Settings of: `am5stock.DropdownList` (see its page for the class)
TypeScript: `am5stock.IDropdownListSettings` (`import type { IDropdownListSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **items** (`IDropdownListItem[]`) — default `[]` _(theme)_ — Items of the list.
- **maxSearchItems** (`number`) — default `10` _(theme)_ — Most results of `searchCallback` to show; the rest are cut off with a note.
- **searchable** (`boolean`) — default `true` _(theme)_ — Shows a search field above the list. Typing filters the items or, with `searchCallback`, replaces them with its results.
- **searchCallback** (`(query: string) => Promise<IDropdownListItem[]>`) — Returns the items to show for a search query.
- **exclude** (`string[]`) — default `[]` _(code fallback)_ — IDs of items to leave out of the list. _Since 5.7.0._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownSettings")`) for types, defaults and descriptions.

- _IDropdownSettings_: control, parent, scrollable
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
