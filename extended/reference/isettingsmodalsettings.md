---
title: "ISettingsModalSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isettingsmodalsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IModalSettings
All ancestors: IModalSettings, IEntitySettings
Settings of: `am5stock.SettingsModal` (see its page for the class)
TypeScript: `am5stock.ISettingsModalSettings` (`import type { ISettingsModalSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockChart** (`StockChart`) — The `StockChart` the modal belongs to.
- **showResetLink** (`boolean`) — default `true` — Shows a "Reset to default" link, which puts back the values the fields had when the modal was first opened for that indicator or series. _Since 5.9.0._
- **strokeWidths** (`number[]`) — default `[1, 2, 4, 10]` — Line widths to choose from when editing a line series. _Since 5.11.2._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IModalSettings")`) for types, defaults and descriptions.

- _IModalSettings_: ariaLabel, content, deactivateRoot
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
