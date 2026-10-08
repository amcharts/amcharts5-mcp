---
title: "IExportingMenuSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingmenusettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5plugins_exporting.ExportingMenu` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **align** (`"left" | "right"`) — default `"right"` _(class default)_ — Horizontal alignment of the menu.
- **valign** (`"top" | "bottom"`) — default `"top"` _(class default)_ — Vertical alignment of the menu.
- **container** (`HTMLElement`) — default `root._inner` _(class default)_ — Element in the document to place the menu in. If not set, the menu goes into the chart's own element.
- **items** (`IExportingMenuItem[]`) — default computed at runtime _(class default)_ — Items of the menu. By default, all image and data formats and print.
- **exporting** (`Exporting`) — The `Exporting` the menu exports with.
- **useDefaultCSS** (`boolean`) — default `true` _(class default)_ — Loads the menu's default CSS. Set to `false` to style the menu with your own CSS.
- **autoClose** (`boolean`) — default `true` _(class default)_ — Closes the menu when an export starts from it.
- **deactivateRoot** (`boolean`) — default `true` _(class default)_ — Disables interaction with the chart while the menu is open or the pointer is over it.
- **ariaLabel** (`string`) — ARIA label for the menu. _Since 5.14.4._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
